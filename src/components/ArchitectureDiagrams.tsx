import type { ProjectItem } from "../data";
import { SchematicFrame } from "./InternalsShell";

const C = {
  violet: "#a78bfa",
  sky: "#7dd3fc",
  blue: "#38bdf8",
  green: "#6ee7b7",
  indigo: "#a5b4fc",
  teal: "#5eead4",
  rose: "#fb7185",
};

function Lane({
  x,
  y,
  w,
  h,
  label,
  color,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
  color: string;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="12"
        fill="#070d19"
        stroke={color}
        strokeOpacity="0.2"
      />
      <text
        x={x + 18}
        y={y + 23}
        fill={color}
        fontSize="11"
        fontWeight="600"
        letterSpacing="1"
      >
        {label}
      </text>
      <line
        x1={x + 18}
        y1={y + 32}
        x2={x + w - 18}
        y2={y + 32}
        stroke={color}
        strokeOpacity="0.16"
      />
    </g>
  );
}

function Node({
  x,
  y,
  w,
  h,
  title,
  lines = [],
  color = C.blue,
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  title: string;
  lines?: string[];
  color?: string;
}) {
  const compact = h <= 110;
  const firstLine = compact ? 46 : 49;
  const lineGap = compact ? 15 : 17;
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        rx="10"
        fill="#0b1424"
        stroke={color}
        strokeOpacity="0.34"
      />
      <rect
        x={x}
        y={y + 12}
        width="3"
        height={h - 24}
        rx="1.5"
        fill={color}
        fillOpacity="0.8"
      />
      <text x={x + 16} y={y + 27} fill="#f8fafc" fontSize="13.5" fontWeight="600">
        {title}
      </text>
      {lines.map((line, i) => (
        <text
          key={i}
          x={x + 16}
          y={y + firstLine + i * lineGap}
          fill={i === 0 ? "#cbd5e1" : "#94a3b8"}
          fontSize="11.5"
        >
          {line}
        </text>
      ))}
    </g>
  );
}

function Arrow({
  x1,
  y1,
  x2,
  y2,
  color = C.blue,
  dashed = false,
}: {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  color?: string;
  dashed?: boolean;
}) {
  const angle = Math.atan2(y2 - y1, x2 - x1);
  const a1 = angle + Math.PI - 0.45;
  const a2 = angle + Math.PI + 0.45;
  const head = 6;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke={color}
        strokeWidth="1.6"
        strokeDasharray={dashed ? "5 4" : undefined}
      />
      <path
        d={`M ${x2} ${y2} L ${(x2 + head * Math.cos(a1)).toFixed(1)} ${(y2 + head * Math.sin(a1)).toFixed(1)} L ${(x2 + head * Math.cos(a2)).toFixed(1)} ${(y2 + head * Math.sin(a2)).toFixed(1)} Z`}
        fill={color}
      />
    </g>
  );
}

function Route({
  points,
  color,
}: {
  points: [number, number][];
  color: string;
}) {
  const d = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"} ${x} ${y}`)
    .join(" ");
  const [ax, ay] = points[points.length - 2];
  const [bx, by] = points[points.length - 1];
  const angle = Math.atan2(by - ay, bx - ax);
  const a1 = angle + Math.PI - 0.45;
  const a2 = angle + Math.PI + 0.45;
  const head = 6;
  return (
    <g>
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth="1.4"
        strokeDasharray="5 4"
      />
      <path
        d={`M ${bx} ${by} L ${(bx + head * Math.cos(a1)).toFixed(1)} ${(by + head * Math.sin(a1)).toFixed(1)} L ${(bx + head * Math.cos(a2)).toFixed(1)} ${(by + head * Math.sin(a2)).toFixed(1)} Z`}
        fill={color}
      />
    </g>
  );
}

function Note({
  x,
  y,
  color = "#cbd5e1",
  size = 11.5,
  children,
}: {
  x: number;
  y: number;
  color?: string;
  size?: number;
  children: string;
}) {
  return (
    <text x={x} y={y} fill={color} fontSize={size}>
      {children}
    </text>
  );
}

function LedgerDiagram() {
  return (
    <svg
      viewBox="0 0 900 430"
      className="w-full h-auto"
      role="img"
      aria-label="Ledger Engine write path, single-CTE transaction, WAL sync and asynchronous reconciliation"
    >
      <Lane
        x={10}
        y={10}
        w={880}
        h={210}
        label="WRITE PATH · 1 implicit round-trip (READ COMMITTED)"
        color={C.violet}
      />
      <Node
        x={28}
        y={48}
        w={210}
        h={152}
        title="Go API · 36 conns"
        color={C.violet}
        lines={[
          "Idempotency-Key guard",
          "23505 → lookupTx",
          "200 replay / 422 hash",
          "0.75 core · 41 MB RSS",
        ]}
      />
      <Node
        x={280}
        y={48}
        w={330}
        h={152}
        title="Single-CTE transfer tx"
        color={C.violet}
        lines={[
          "1   locked · ORDER BY id ASC",
          "2   checks · currency + funds",
          "3   header · POSTED row",
          "4   legs · DEBIT/CREDIT + seq",
          "5   balances · chk_valid 409",
        ]}
      />
      <Node
        x={652}
        y={48}
        w={220}
        h={152}
        title="PostgreSQL WAL"
        color={C.blue}
        lines={[
          "synchronous_commit=on",
          "6.45 ms mean fsync",
          "16.4 commits / flush",
          "3,778 req/s · 54 ms p95",
        ]}
      />
      <Arrow x1={238} y1={124} x2={278} y2={124} color={C.violet} />
      <Arrow x1={610} y1={124} x2={650} y2={124} color={C.blue} />

      <Lane
        x={10}
        y={230}
        w={880}
        h={190}
        label="ASYNC RECONCILE · 5s ticker + atomic.Pointer"
        color={C.green}
      />
      <Node
        x={28}
        y={272}
        w={250}
        h={126}
        title="GET /v1/admin/reconcile"
        color={C.green}
        lines={[
          "Lock-free atomic.Pointer",
          "0.9 ms avg · stale > 10s",
          "No lock sweep on reads",
        ]}
      />
      <Node
        x={326}
        y={272}
        w={270}
        h={126}
        title="5s checkpoint audit"
        color={C.green}
        lines={[
          "SELECT … WHERE seq > last_seq",
          "global_net == 0",
          "expected == balance",
        ]}
      />
      <Node
        x={648}
        y={272}
        w={224}
        h={126}
        title="reconcile_checkpoint"
        color={C.green}
        lines={["Singleton FOR UPDATE", "331 ms → 0.9 ms endpoint"]}
      />
      <Arrow x1={278} y1={335} x2={324} y2={335} color={C.green} />
      <Arrow x1={596} y1={335} x2={646} y2={335} color={C.green} />
      <Arrow
        x1={445}
        y1={200}
        x2={445}
        y2={270}
        color={C.blue}
        dashed
      />
      <Note x={452} y={240} color={C.sky} size={9.5}>
        postings.seq
      </Note>
    </svg>
  );
}

function ErrandDiagram() {
  return (
    <svg
      viewBox="0 0 900 440"
      className="w-full h-auto"
      role="img"
      aria-label="Errand agent runtime, tool split, encrypted persistence and native isolation"
    >
      <Lane
        x={10}
        y={10}
        w={880}
        h={156}
        label="CONTROL & STREAMING PLANE"
        color={C.blue}
      />
      <Node
        x={28}
        y={48}
        w={200}
        h={92}
        title="Flutter Chat UI"
        lines={["60 ms flush · healMarkdown", "CoalescingWriter 600 ms"]}
      />
      <Node
        x={260}
        y={48}
        w={230}
        h={92}
        title="72-turn AgentLoop"
        lines={["25 tools/turn · 30 MiB cap", "ContextBudget 128K → compact"]}
      />
      <Node
        x={522}
        y={48}
        w={160}
        h={92}
        title="LlmClient SSE"
        lines={["30 s inactivity watch", "CancelToken abort"]}
      />
      <Node
        x={714}
        y={48}
        w={158}
        h={92}
        title="Output spill"
        lines={[">6K chars → .part", "512 KB · 10 m TTL"]}
      />
      <Arrow x1={228} y1={94} x2={258} y2={94} />
      <Arrow x1={490} y1={94} x2={520} y2={94} />
      <Arrow x1={682} y1={94} x2={712} y2={94} />

      <Lane
        x={10}
        y={176}
        w={880}
        h={154}
        label="TOOL SPLIT"
        color={C.green}
      />
      <Node
        x={28}
        y={214}
        w={404}
        h={100}
        title="Parallel · stateless (Future.wait)"
        color={C.green}
        lines={[
          "read       PDF (PdfBox) + OpenXML 64 MB LRU",
          "websearch  Tavily API · 1.2K snippet cap",
          "webfetch   SSRF DNS guard + Readability",
          "memory     lexical + Levenshtein ≤ 1",
        ]}
      />
      <Node
        x={462}
        y={214}
        w={410}
        h={100}
        title="Sequential · stateful (350 ms settle)"
        lines={[
          "bash      3-tier ShellSafetyCheck",
          "intent    6 actions + 17 settings",
          "browser   DOM snapshot + OAuth UA",
          "schedule  AlarmManager + JobScheduler",
        ]}
      />
      <Arrow x1={340} y1={140} x2={230} y2={212} dashed />
      <Arrow x1={410} y1={140} x2={667} y2={212} dashed />

      <Lane
        x={10}
        y={340}
        w={880}
        h={90}
        label="LOCAL PERSISTENCE & SECURITY BOUNDARIES"
        color="#ffffff"
      />
      <Note x={28} y={390} size={11}>
        ErrandDatabase · 7 Drift/SQLite tables (v10) · SecretStore AES-256-GCM
        (key outside SQLite) · Lite build: no AccessibilityService
      </Note>
      <Note x={28} y={412} color="#94a3b8" size={10.5}>
        Headless TaskExecutionService · isolated FlutterEngine · TaskCheckpoint
        (max 2 resumes) · SHA-256 OTA guard
      </Note>
    </svg>
  );
}

function DataRoverDiagram() {
  return (
    <svg
      viewBox="0 0 900 420"
      className="w-full h-auto"
      role="img"
      aria-label="DataRover client browser compute plane, DuckDB and Pyodide bridge, server and storage plane"
    >
      <Lane
        x={10}
        y={10}
        w={520}
        h={400}
        label="CLIENT BROWSER · ZERO SERVER COMPUTE"
        color={C.green}
      />
      <Node
        x={28}
        y={48}
        w={210}
        h={96}
        title="DuckDB-WASM worker"
        color={C.green}
        lines={["read_parquet(workspace)", "Mutation toast"]}
      />
      <Node
        x={286}
        y={48}
        w={226}
        h={96}
        title="Pyodide v0.26.4 worker"
        lines={["np · pd · scipy · sklearn", "60 s guard · capture plots"]}
      />
      <Arrow x1={238} y1={84} x2={284} y2={84} color={C.green} />
      <Arrow x1={284} y1={112} x2={238} y2={112} color={C.blue} dashed />
      <Note x={251} y={76} color={C.green} size={9}>
        sql()
      </Note>

      <Node
        x={28}
        y={168}
        w={210}
        h={96}
        title="IndexedDB cache"
        color={C.green}
        lines={["DataRoverCache v1", "Parquet · 2,000-row grid"]}
      />
      <Node
        x={286}
        y={168}
        w={226}
        h={96}
        title="useChatStream (50 steps)"
        lines={["Client exec · Zustand", "Strips base64 PNG from ctx"]}
      />
      <Arrow x1={133} y1={144} x2={133} y2={166} color={C.green} />
      <Arrow x1={399} y1={144} x2={399} y2={166} color={C.green} />

      <Node
        x={28}
        y={288}
        w={484}
        h={104}
        title="duckdb_bridge"
        color={C.green}
        lines={[
          "Worker → main thread → DuckDB worker",
          "Python awaits DuckDB SQL in browser memory",
          "Notebook + insights saved per workspace",
        ]}
      />
      <Arrow x1={133} y1={264} x2={133} y2={286} color={C.green} />
      <Arrow x1={399} y1={264} x2={399} y2={286} color={C.green} />

      <Lane
        x={546}
        y={10}
        w={344}
        h={400}
        label="SERVER & STORAGE"
        color="#93c5fd"
      />
      <Node
        x={564}
        y={48}
        w={310}
        h={104}
        title="TanStack Start + AI SDK"
        color="#60a5fa"
        lines={[
          "generalChatStream NDJSON (ctx 30)",
          "Server tools: search_web, fetch_url",
        ]}
      />
      <Node
        x={564}
        y={174}
        w={310}
        h={96}
        title="Neon PostgreSQL (Drizzle)"
        color="#a5b4fc"
        lines={[
          "5 tables: users, workspaces,",
          "conversations, messages, insights",
        ]}
      />
      <Node
        x={564}
        y={292}
        w={310}
        h={96}
        title="Supabase Storage"
        color={C.green}
        lines={["datafiles (Parquet) + plots (PNG)"]}
      />
      <Arrow x1={512} y1={100} x2={562} y2={100} color="#60a5fa" />
      <Arrow x1={512} y1={340} x2={562} y2={340} color={C.green} dashed />
    </svg>
  );
}

function TransNetDiagram() {
  return (
    <svg
      viewBox="0 0 900 440"
      className="w-full h-auto"
      role="img"
      aria-label="TransNet FFI bridge, UDP discovery, TCP framing and atomic .part receive lifecycle"
    >
      <Lane
        x={10}
        y={10}
        w={330}
        h={420}
        label="FFI & PULL TELEMETRY"
        color={C.indigo}
      />
      <Node
        x={26}
        y={48}
        w={298}
        h={88}
        title="Expo React Native UI"
        color={C.indigo}
        lines={["200 ms poll → Reanimated bars"]}
      />
      <Node
        x={26}
        y={158}
        w={298}
        h={104}
        title="Kotlin Expo Modules"
        color={C.indigo}
        lines={[
          "WifiManager.MulticastLock",
          "content:// cache + FileProvider URIs",
        ]}
      />
      <Node
        x={26}
        y={284}
        w={298}
        h={118}
        title="Go engine (gomobile AAR)"
        color={C.blue}
        lines={[
          "50 ms RWMutex progress",
          "<|sep|> string ABI (gobind)",
          "skips Go value structs",
        ]}
      />
      <Arrow x1={175} y1={136} x2={175} y2={156} color={C.indigo} />
      <Arrow x1={175} y1={262} x2={175} y2={282} color={C.indigo} />

      <Lane
        x={356}
        y={10}
        w={534}
        h={208}
        label="WIRE PROTOCOL · UDP :9090 → TCP :8080"
        color={C.blue}
      />
      <Node
        x={372}
        y={48}
        w={240}
        h={148}
        title="1 · UDP discovery"
        color={C.indigo}
        lines={[
          "TRANSNET/1 OFFER / ACCEPT",
          "255.255.255.255:9090 · 1 s",
          "20 s window · filter self UUID",
          "Unicast ACCEPT → peer",
        ]}
      />
      <Node
        x={636}
        y={48}
        w={238}
        h={148}
        title="2 · TCP stream (:8080)"
        color={C.blue}
        lines={[
          "<numFiles> + LF manifest",
          "<name><|sep|><bytes> + LF",
          "32 KiB chunks · io.ReadFull",
          "10 retries · 5 m deadline",
        ]}
      />
      <Arrow x1={612} y1={122} x2={634} y2={122} color={C.indigo} />

      <Lane
        x={356}
        y={228}
        w={534}
        h={202}
        label="ATOMIC .part RECEIVE LIFECYCLE"
        color={C.green}
      />
      <Node
        x={372}
        y={268}
        w={200}
        h={104}
        title="Write <file>.part"
        color={C.blue}
        lines={["Downloads/TransNet", "atomic stream"]}
      />
      <Node
        x={596}
        y={256}
        w={278}
        h={70}
        title="Success → os.Rename"
        color={C.green}
        lines={["Atomic promotion to final file"]}
      />
      <Node
        x={596}
        y={338}
        w={278}
        h={70}
        title="Cancel / skip → os.Remove"
        color={C.rose}
        lines={["Skip drains TCP bytes"]}
      />
      <Arrow x1={572} y1={292} x2={594} y2={291} color={C.green} />
      <Arrow x1={572} y1={344} x2={594} y2={373} color={C.rose} dashed />
    </svg>
  );
}

function EchoTuneDiagram() {
  return (
    <svg
      viewBox="0 0 900 400"
      className="w-full h-auto"
      role="img"
      aria-label="EchoTune event-driven Bubbletea runtime, mpv IPC, Opus download and local JSON stores"
    >
      <Lane
        x={10}
        y={10}
        w={880}
        h={212}
        label="EVENT-DRIVEN 1 Hz BUBBLETEA v2 · 4 GOROUTINES"
        color={C.teal}
      />
      <Node
        x={28}
        y={48}
        w={190}
        h={148}
        title="Bubbletea Elm TUI"
        color={C.teal}
        lines={[
          "1 Hz tea.Tick · no spin",
          "KeyMsg + progressMsg",
          "normal / input mode",
          "<3% CPU",
        ]}
      />
      <Node
        x={242}
        y={48}
        w={190}
        h={148}
        title="PlaybackSession"
        color={C.blue}
        lines={[
          "Queue · 3× retry",
          "G1 mpv Wait() reaper",
          "G2 <-Done watcher",
          "G3 1 Hz IPC poll",
        ]}
      />
      <Node
        x={456}
        y={48}
        w={190}
        h={148}
        title="Out-of-process mpv"
        color={C.teal}
        lines={[
          "--no-video decode",
          "Unix socket JSON IPC",
          "30 s / 50 MB cache",
          "10 ms socket dial",
        ]}
      />
      <Node
        x={670}
        y={48}
        w={202}
        h={148}
        title="G4 · Opus download"
        color={C.indigo}
        lines={[
          "yt-dlp -x opus",
          "embed JPG cover",
          "atomic downloads.json",
          "--no-progress",
        ]}
      />
      <Arrow x1={218} y1={122} x2={240} y2={122} color={C.teal} />
      <Arrow x1={432} y1={122} x2={454} y2={122} color={C.teal} />
      <Route
        points={[
          [123, 196],
          [123, 210],
          [771, 210],
          [771, 196],
        ]}
        color={C.indigo}
      />

      <Lane
        x={10}
        y={232}
        w={880}
        h={158}
        label="LAZY JSON STORES & O(1) OPUS RESOLUTION"
        color="#ffffff"
      />
      <Note x={28} y={288} color={C.teal}>
        1    Cache.Songs[query] · 100-entry LRU → skips yt-dlp NDJSON search
      </Note>
      <Note x={28} y={316} color={C.teal}>
        2    Downloads.Songs[id] + os.Stat → plays ~/Music/echotune/&lt;id&gt;.opus
      </Note>
      <Note x={28} y={344} color="#cbd5e1">
        3    sweepPartialDownloads() prunes orphans · history.json (100 FIFO)
      </Note>
      <Note x={28} y={370} color="#94a3b8" size={11}>
        Per-playlist JSON files · lazy-loaded once per command
      </Note>
    </svg>
  );
}

export default function ArchitectureDiagram({
  diagramId,
  accentColor = "#38bdf8",
}: {
  diagramId?: ProjectItem["diagramId"];
  accentColor?: string;
}) {
  if (!diagramId) return null;

  return (
    <SchematicFrame accent={accentColor}>
      {diagramId === "ledger" && <LedgerDiagram />}
      {diagramId === "errand" && <ErrandDiagram />}
      {diagramId === "datarover" && <DataRoverDiagram />}
      {diagramId === "transnet" && <TransNetDiagram />}
      {diagramId === "echotune" && <EchoTuneDiagram />}
    </SchematicFrame>
  );
}
