import type { ProjectItem } from "../data";

function LedgerDiagram() {
  return (
    <svg
      viewBox="0 0 740 310"
      className="w-full h-auto"
      role="img"
      aria-label="Ledger Engine dual-path CTE transaction, WAL sync, and 5s incremental reconciliation architecture"
    >
      <defs>
        <marker id="ar-v" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#a78bfa" />
        </marker>
        <marker id="ar-c" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
        </marker>
        <marker id="ar-g" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
        </marker>
      </defs>

      {/* Plane backgrounds */}
      <rect x="8" y="8" width="724" height="172" rx="10" fill="#0b1020" stroke="#8b5cf6" strokeOpacity="0.22" />
      <text x="22" y="28" fill="#c4b5fd" fontSize="10.5" fontWeight="600">WRITE PATH · 1 IMPLICIT ROUND-TRIP (READ COMMITTED)</text>

      <rect x="8" y="194" width="724" height="108" rx="10" fill="#09121e" stroke="#10b981" strokeOpacity="0.22" />
      <text x="22" y="214" fill="#6ee7b7" fontSize="10.5" fontWeight="600">ASYNC RECONCILE &amp; LOCK-FREE READ PATH (5s TICKER + atomic.Pointer)</text>

      {/* Write Path Nodes */}
      <rect x="22" y="46" width="138" height="114" rx="8" fill="#12182d" stroke="#8b5cf6" strokeOpacity="0.55" />
      <text x="91" y="69" textAnchor="middle" fill="#f8fafc" fontSize="11.5" fontWeight="600">Go API (36 Conns)</text>
      <text x="91" y="88" textAnchor="middle" fill="#cbd5e1" fontSize="10">Idempotency-Key</text>
      <text x="91" y="104" textAnchor="middle" fill="#94a3b8" fontSize="9.5">23505 -&gt; lookupTx</text>
      <text x="91" y="120" textAnchor="middle" fill="#94a3b8" fontSize="9.5">200 Replay / 422 Hash</text>
      <text x="91" y="142" textAnchor="middle" fill="#a78bfa" fontSize="9.5">0.75 core · 41 MB RSS</text>

      {/* 5-CTE Single SQL Tx */}
      <rect x="190" y="40" width="340" height="126" rx="8" fill="#141a33" stroke="#a78bfa" strokeOpacity="0.7" />
      <text x="360" y="60" textAnchor="middle" fill="#f8fafc" fontSize="11.5" fontWeight="600">Single-CTE Transfer Transaction</text>

      <rect x="204" y="70" width="96" height="40" rx="5" fill="#0c1122" stroke="#8b5cf6" strokeOpacity="0.4" />
      <text x="252" y="87" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontWeight="600">1. locked</text>
      <text x="252" y="101" textAnchor="middle" fill="#94a3b8" fontSize="8.5">ORDER BY id ASC</text>

      <rect x="312" y="70" width="96" height="40" rx="5" fill="#0c1122" stroke="#8b5cf6" strokeOpacity="0.4" />
      <text x="360" y="87" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontWeight="600">2. checks</text>
      <text x="360" y="101" textAnchor="middle" fill="#94a3b8" fontSize="8.5">currency + funds</text>

      <rect x="420" y="70" width="96" height="40" rx="5" fill="#0c1122" stroke="#8b5cf6" strokeOpacity="0.4" />
      <text x="468" y="87" textAnchor="middle" fill="#e2e8f0" fontSize="9.5" fontWeight="600">3. header</text>
      <text x="468" y="101" textAnchor="middle" fill="#94a3b8" fontSize="8.5">POSTED tx row</text>

      <rect x="242" y="118" width="118" height="36" rx="5" fill="#0c1122" stroke="#38bdf8" strokeOpacity="0.4" />
      <text x="301" y="134" textAnchor="middle" fill="#7dd3fc" fontSize="9.5" fontWeight="600">4. legs (postings)</text>
      <text x="301" y="147" textAnchor="middle" fill="#94a3b8" fontSize="8.5">DEBIT + CREDIT + seq</text>

      <rect x="372" y="118" width="132" height="36" rx="5" fill="#0c1122" stroke="#38bdf8" strokeOpacity="0.4" />
      <text x="438" y="134" textAnchor="middle" fill="#7dd3fc" fontSize="9.5" fontWeight="600">5. balances update</text>
      <text x="438" y="147" textAnchor="middle" fill="#94a3b8" fontSize="8.5">chk_valid_balance 409</text>

      {/* Postgres WAL */}
      <rect x="560" y="46" width="156" height="114" rx="8" fill="#10182b" stroke="#38bdf8" strokeOpacity="0.6" />
      <text x="638" y="70" textAnchor="middle" fill="#f8fafc" fontSize="11.5" fontWeight="600">PostgreSQL WAL</text>
      <text x="638" y="89" textAnchor="middle" fill="#7dd3fc" fontSize="10">synchronous_commit=on</text>
      <text x="638" y="106" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">6.45 ms mean fsync</text>
      <text x="638" y="122" textAnchor="middle" fill="#94a3b8" fontSize="9.5">16.4 commits / flush</text>
      <text x="638" y="142" textAnchor="middle" fill="#38bdf8" fontSize="9.5">3,778 req/s · 54 ms p95</text>

      {/* Write arrows */}
      <line x1="160" y1="103" x2="186" y2="103" stroke="#a78bfa" strokeWidth="1.6" markerEnd="url(#ar-v)" />
      <line x1="530" y1="103" x2="556" y2="103" stroke="#38bdf8" strokeWidth="1.6" markerEnd="url(#ar-c)" />

      {/* Reconcile Path */}
      <rect x="22" y="226" width="176" height="62" rx="8" fill="#0d1726" stroke="#10b981" strokeOpacity="0.5" />
      <text x="110" y="249" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">GET /v1/admin/reconcile</text>
      <text x="110" y="266" textAnchor="middle" fill="#6ee7b7" fontSize="9.5">Lock-free atomic.Pointer</text>
      <text x="110" y="279" textAnchor="middle" fill="#94a3b8" fontSize="9">0.9ms avg · stale &gt;10s</text>

      <rect x="234" y="226" width="234" height="62" rx="8" fill="#0d1726" stroke="#10b981" strokeOpacity="0.55" />
      <text x="351" y="248" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">5s Ticker Checkpoint Audit</text>
      <text x="351" y="265" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">SELECT ... FROM postings WHERE seq &gt; last_seq</text>
      <text x="351" y="279" textAnchor="middle" fill="#94a3b8" fontSize="9">global_net == 0 &amp;&amp; expected == balance</text>

      <rect x="504" y="226" width="212" height="62" rx="8" fill="#0d1726" stroke="#10b981" strokeOpacity="0.45" />
      <text x="610" y="248" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">reconcile_checkpoint</text>
      <text x="610" y="265" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">Singleton FOR UPDATE + per-acct</text>
      <text x="610" y="279" textAnchor="middle" fill="#6ee7b7" fontSize="9">331ms -&gt; 0.9ms endpoint</text>

      <line x1="234" y1="257" x2="202" y2="257" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#ar-g)" />
      <line x1="468" y1="257" x2="500" y2="257" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#ar-g)" />
      <path d="M 351 166 L 351 222" stroke="#38bdf8" strokeWidth="1.3" strokeDasharray="4 3" markerEnd="url(#ar-c)" />
    </svg>
  );
}

function ErrandDiagram() {
  return (
    <svg
      viewBox="0 0 740 315"
      className="w-full h-auto"
      role="img"
      aria-label="Errand 72-turn on-device Android AI agent runtime, tool split, and encrypted persistence"
    >
      <defs>
        <marker id="ar-sky" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
        </marker>
      </defs>

      {/* Top Runtime Plane */}
      <rect x="8" y="8" width="724" height="100" rx="10" fill="#091324" stroke="#0ea5e9" strokeOpacity="0.28" />
      <text x="22" y="27" fill="#7dd3fc" fontSize="10.5" fontWeight="600">CONTROL &amp; STREAMING PLANE</text>

      <rect x="22" y="38" width="154" height="58" rx="7" fill="#0f1b33" stroke="#38bdf8" strokeOpacity="0.5" />
      <text x="99" y="59" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">Flutter Chat UI</text>
      <text x="99" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">60ms flush + healMarkdown</text>
      <text x="99" y="88" textAnchor="middle" fill="#94a3b8" fontSize="9">CoalescingWriter (600ms)</text>

      <rect x="206" y="38" width="214" height="58" rx="7" fill="#101f3a" stroke="#38bdf8" strokeOpacity="0.7" />
      <text x="313" y="58" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">72-Turn AgentLoop</text>
      <text x="313" y="74" textAnchor="middle" fill="#7dd3fc" fontSize="9.5">25 tools/turn · 30 MiB media cap</text>
      <text x="313" y="88" textAnchor="middle" fill="#94a3b8" fontSize="9">ContextBudget (128K -&gt; auto-compact)</text>

      <rect x="450" y="38" width="128" height="58" rx="7" fill="#0f1b33" stroke="#818cf8" strokeOpacity="0.5" />
      <text x="514" y="59" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">LlmClient SSE</text>
      <text x="514" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">30s inactivity watch</text>
      <text x="514" y="88" textAnchor="middle" fill="#94a3b8" fontSize="9">CancelToken socket abort</text>

      <rect x="594" y="38" width="124" height="58" rx="7" fill="#0f1b33" stroke="#38bdf8" strokeOpacity="0.45" />
      <text x="656" y="59" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">Output Spill</text>
      <text x="656" y="75" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">&gt;6K chars -&gt; .part</text>
      <text x="656" y="88" textAnchor="middle" fill="#94a3b8" fontSize="9">512 KB cap · 10m TTL</text>

      <line x1="176" y1="67" x2="202" y2="67" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#ar-sky)" />
      <line x1="420" y1="67" x2="446" y2="67" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#ar-sky)" />
      <line x1="313" y1="96" x2="313" y2="122" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#ar-sky)" />

      {/* Middle Tool Split */}
      <rect x="8" y="124" width="300" height="106" rx="10" fill="#091523" stroke="#10b981" strokeOpacity="0.28" />
      <text x="22" y="143" fill="#6ee7b7" fontSize="10.5" fontWeight="600">PARALLEL STATELESS (Future.wait)</text>
      <text x="22" y="164" fill="#e2e8f0" fontSize="10">• read: PDF (PdfBox) + OpenXML 64 MB LRU</text>
      <text x="22" y="182" fill="#cbd5e1" fontSize="10">• websearch: Tavily API (1.2K snippet cap)</text>
      <text x="22" y="200" fill="#cbd5e1" fontSize="10">• webfetch: SSRF DNS guard + Readability</text>
      <text x="22" y="217" fill="#94a3b8" fontSize="9.5">• memory: lexical + Levenshtein&lt;=1</text>

      <rect x="322" y="124" width="410" height="106" rx="10" fill="#0d1324" stroke="#38bdf8" strokeOpacity="0.32" />
      <text x="336" y="143" fill="#7dd3fc" fontSize="10.5" fontWeight="600">SEQUENTIAL STATEFUL (350ms settle + fail-fast)</text>
      <text x="336" y="164" fill="#e2e8f0" fontSize="10">• bash: 3-tier ShellSafetyCheck (Safe / Confirm / Blocked)</text>
      <text x="336" y="182" fill="#cbd5e1" fontSize="10">• intent: 6 actions + 17 settings + BAL-safe PendingIntent</text>
      <text x="336" y="200" fill="#cbd5e1" fontSize="10">• browser: InAppWebView DOM ref snapshot (eN) + OAuth UA</text>
      <text x="336" y="217" fill="#94a3b8" fontSize="9.5">• schedule_task: AlarmManager exact + JobScheduler fallback</text>

      {/* Bottom Persistence & Isolation */}
      <rect x="8" y="242" width="724" height="64" rx="10" fill="#07101c" stroke="#ffffff" strokeOpacity="0.1" />
      <text x="22" y="263" fill="#f8fafc" fontSize="10.5" fontWeight="600">LOCAL PERSISTENCE &amp; SECURITY BOUNDARIES</text>
      <text x="22" y="282" fill="#cbd5e1" fontSize="10">
        ErrandDatabase (7 Drift/SQLite tables, v10)  ·  SecretStore AES-256-GCM (32B key outside SQLite)  ·  Lite Build: No AccessibilityService
      </text>
      <text x="22" y="297" fill="#94a3b8" fontSize="9.5">
        Headless TaskExecutionService spawns isolated FlutterEngine with TaskCheckpoint (max 2 resumes) &amp; SHA-256 OTA APK guard
      </text>
    </svg>
  );
}

function DataRoverDiagram() {
  return (
    <svg
      viewBox="0 0 740 285"
      className="w-full h-auto"
      role="img"
      aria-label="DataRover dual-plane browser DuckDB-WASM and Pyodide bridge with Neon Postgres and Supabase storage"
    >
      <defs>
        <marker id="ar-em" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
        </marker>
        <marker id="ar-bl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#60a5fa" />
        </marker>
      </defs>

      {/* Left: Client Compute Plane */}
      <rect x="8" y="8" width="430" height="268" rx="10" fill="#081619" stroke="#10b981" strokeOpacity="0.32" />
      <text x="22" y="29" fill="#6ee7b7" fontSize="10.5" fontWeight="600">CLIENT BROWSER COMPUTE PLANE (ZERO SERVER COMPUTE)</text>

      <rect x="22" y="44" width="180" height="62" rx="7" fill="#0c1f24" stroke="#10b981" strokeOpacity="0.55" />
      <text x="112" y="66" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">DuckDB-WASM Worker</text>
      <text x="112" y="82" textAnchor="middle" fill="#a7f3d0" fontSize="9.5">read_parquet(workspace)</text>
      <text x="112" y="96" textAnchor="middle" fill="#94a3b8" fontSize="9">Mutation confirmation toast</text>

      <rect x="242" y="44" width="182" height="62" rx="7" fill="#0c1f24" stroke="#38bdf8" strokeOpacity="0.55" />
      <text x="333" y="66" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">Pyodide v0.26.4 Worker</text>
      <text x="333" y="82" textAnchor="middle" fill="#7dd3fc" fontSize="9.5">np, pd, scipy, sklearn, plt</text>
      <text x="333" y="96" textAnchor="middle" fill="#94a3b8" fontSize="9">60s guard · capture_all_plots()</text>

      {/* Bridge */}
      <line x1="238" y1="75" x2="206" y2="75" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#ar-em)" />
      <text x="222" y="67" textAnchor="middle" fill="#6ee7b7" fontSize="8.5">sql()</text>

      <rect x="22" y="128" width="180" height="58" rx="7" fill="#0b1a20" stroke="#10b981" strokeOpacity="0.4" />
      <text x="112" y="150" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">IndexedDB Cache</text>
      <text x="112" y="166" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">DataRoverCache (parquetFiles)</text>
      <text x="112" y="179" textAnchor="middle" fill="#94a3b8" fontSize="9">AgGridReact (2,000-row view)</text>

      <rect x="242" y="128" width="182" height="58" rx="7" fill="#0b1a20" stroke="#38bdf8" strokeOpacity="0.4" />
      <text x="333" y="150" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">useChatStream (50-Step)</text>
      <text x="333" y="166" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">Client exec + Zustand stores</text>
      <text x="333" y="179" textAnchor="middle" fill="#94a3b8" fontSize="9">Strips base64 PNG from context</text>

      <line x1="112" y1="128" x2="112" y2="110" stroke="#34d399" strokeWidth="1.4" markerEnd="url(#ar-em)" />
      <line x1="333" y1="128" x2="333" y2="110" stroke="#34d399" strokeWidth="1.4" markerEnd="url(#ar-em)" />

      <rect x="22" y="204" width="402" height="56" rx="7" fill="#081418" stroke="#ffffff" strokeOpacity="0.08" />
      <text x="223" y="226" textAnchor="middle" fill="#cbd5e1" fontSize="10" fontWeight="600">duckdb_bridge: Worker -&gt; Main Thread -&gt; DuckDB Worker</text>
      <text x="223" y="244" textAnchor="middle" fill="#94a3b8" fontSize="9.5">Python awaits DuckDB SQL directly in browser memory; notebook + insights saved per workspace</text>

      {/* Right: Server & Storage Plane */}
      <rect x="454" y="8" width="278" height="268" rx="10" fill="#0b1122" stroke="#60a5fa" strokeOpacity="0.3" />
      <text x="468" y="29" fill="#93c5fd" fontSize="10.5" fontWeight="600">SERVER &amp; STORAGE PLANE</text>

      <rect x="468" y="44" width="250" height="68" rx="7" fill="#101930" stroke="#60a5fa" strokeOpacity="0.5" />
      <text x="593" y="66" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">TanStack Start + AI SDK</text>
      <text x="593" y="83" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">generalChatStream NDJSON (ctx 30)</text>
      <text x="593" y="98" textAnchor="middle" fill="#94a3b8" fontSize="9">Server tools: search_web, fetch_url</text>

      <rect x="468" y="128" width="250" height="64" rx="7" fill="#101930" stroke="#818cf8" strokeOpacity="0.5" />
      <text x="593" y="150" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">Neon PostgreSQL (Drizzle)</text>
      <text x="593" y="167" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">5 tables: users, workspaces,</text>
      <text x="593" y="181" textAnchor="middle" fill="#94a3b8" fontSize="9">conversations, messages, agent_insights</text>

      <rect x="468" y="206" width="250" height="54" rx="7" fill="#101930" stroke="#10b981" strokeOpacity="0.45" />
      <text x="593" y="227" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">Supabase Storage</text>
      <text x="593" y="244" textAnchor="middle" fill="#6ee7b7" fontSize="9.5">datafiles (Parquet) + plots (PNG)</text>

      <line x1="424" y1="157" x2="464" y2="82" stroke="#60a5fa" strokeWidth="1.5" markerEnd="url(#ar-bl)" />
      <line x1="424" y1="168" x2="464" y2="232" stroke="#34d399" strokeWidth="1.3" strokeDasharray="4 3" markerEnd="url(#ar-em)" />
    </svg>
  );
}

function TransNetDiagram() {
  return (
    <svg
      viewBox="0 0 740 315"
      className="w-full h-auto"
      role="img"
      aria-label="TransNet 4-layer FFI bridge, UDP/TCP wire protocol, and .part atomic file lifecycle"
    >
      <defs>
        <marker id="ar-in" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#818cf8" />
        </marker>
        <marker id="ar-tg" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
        </marker>
      </defs>

      {/* Left: FFI & Pull Bridge */}
      <rect x="8" y="8" width="320" height="298" rx="10" fill="#0d1122" stroke="#6366f1" strokeOpacity="0.3" />
      <text x="22" y="29" fill="#a5b4fc" fontSize="10.5" fontWeight="600">CROSS-LANGUAGE FFI &amp; PULL TELEMETRY</text>

      <rect x="24" y="46" width="288" height="54" rx="7" fill="#131932" stroke="#818cf8" strokeOpacity="0.5" />
      <text x="168" y="67" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">Expo React Native UI</text>
      <text x="168" y="84" textAnchor="middle" fill="#cbd5e1" fontSize="9.5">200ms setInterval poll -&gt; Reanimated bars</text>

      <rect x="24" y="122" width="288" height="68" rx="7" fill="#131932" stroke="#818cf8" strokeOpacity="0.55" />
      <text x="168" y="143" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">Kotlin Expo Modules Bridge</text>
      <text x="168" y="160" textAnchor="middle" fill="#c7d2fe" fontSize="9.5">WifiManager.MulticastLock (UDP broadcast)</text>
      <text x="168" y="175" textAnchor="middle" fill="#94a3b8" fontSize="9">content:// cache copy + FileProvider URIs</text>

      <rect x="24" y="214" width="288" height="74" rx="7" fill="#111b33" stroke="#38bdf8" strokeOpacity="0.55" />
      <text x="168" y="235" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">Go Engine (gomobile AAR)</text>
      <text x="168" y="252" textAnchor="middle" fill="#7dd3fc" fontSize="9.5">50ms throttled sync.RWMutex progress</text>
      <text x="168" y="268" textAnchor="middle" fill="#94a3b8" fontSize="9">&lt;|sep|&gt; string ABI (gobind skips Go structs)</text>

      <line x1="168" y1="100" x2="168" y2="118" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#ar-in)" />
      <line x1="168" y1="190" x2="168" y2="210" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#ar-in)" />

      {/* Right: Wire Protocol & .part State Machine */}
      <rect x="344" y="8" width="388" height="148" rx="10" fill="#0b1322" stroke="#38bdf8" strokeOpacity="0.28" />
      <text x="358" y="29" fill="#7dd3fc" fontSize="10.5" fontWeight="600">WIRE PROTOCOL (UDP :9090 -&gt; TCP :8080)</text>

      <rect x="358" y="44" width="168" height="96" rx="7" fill="#101a2e" stroke="#818cf8" strokeOpacity="0.45" />
      <text x="442" y="64" textAnchor="middle" fill="#f8fafc" fontSize="10.5" fontWeight="600">1. UDP Discovery</text>
      <text x="442" y="81" textAnchor="middle" fill="#c7d2fe" fontSize="9.5">TRANSNET/1\nOFFER</text>
      <text x="442" y="97" textAnchor="middle" fill="#cbd5e1" fontSize="9">255.255.255.255:9090 (1s)</text>
      <text x="442" y="113" textAnchor="middle" fill="#94a3b8" fontSize="9">Filter self UUID (.transnet-id)</text>
      <text x="442" y="128" textAnchor="middle" fill="#7dd3fc" fontSize="9">Unicast ACCEPT -&gt; peer</text>

      <rect x="546" y="44" width="172" height="96" rx="7" fill="#101a2e" stroke="#38bdf8" strokeOpacity="0.55" />
      <text x="632" y="64" textAnchor="middle" fill="#f8fafc" fontSize="10.5" fontWeight="600">2. TCP Stream (:8080)</text>
      <text x="632" y="81" textAnchor="middle" fill="#7dd3fc" fontSize="9.5">&lt;numFiles&gt;\n manifest</text>
      <text x="632" y="97" textAnchor="middle" fill="#cbd5e1" fontSize="9">&lt;name&gt;&lt;|sep|&gt;&lt;bytes&gt;\n</text>
      <text x="632" y="113" textAnchor="middle" fill="#94a3b8" fontSize="9">32 KiB chunks · io.ReadFull</text>
      <text x="632" y="128" textAnchor="middle" fill="#cbd5e1" fontSize="9">10 dial retries · 5m deadline</text>

      <line x1="526" y1="92" x2="542" y2="92" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#ar-in)" />

      {/* Atomic .part State Machine */}
      <rect x="344" y="170" width="388" height="136" rx="10" fill="#09151d" stroke="#10b981" strokeOpacity="0.28" />
      <text x="358" y="191" fill="#6ee7b7" fontSize="10.5" fontWeight="600">3. ATOMIC .part RECEIVE LIFECYCLE</text>

      <rect x="358" y="206" width="136" height="44" rx="6" fill="#0f2027" stroke="#38bdf8" strokeOpacity="0.45" />
      <text x="426" y="226" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="600">Write &lt;file&gt;.part</text>
      <text x="426" y="240" textAnchor="middle" fill="#94a3b8" fontSize="8.5">Downloads/TransNet</text>

      <rect x="526" y="204" width="190" height="38" rx="6" fill="#0e2620" stroke="#10b981" strokeOpacity="0.6" />
      <text x="621" y="221" textAnchor="middle" fill="#6ee7b7" fontSize="10" fontWeight="600">Success -&gt; os.Rename</text>
      <text x="621" y="234" textAnchor="middle" fill="#cbd5e1" fontSize="8.5">Atomic promotion to final file</text>

      <rect x="526" y="252" width="190" height="42" rx="6" fill="#21121c" stroke="#f43f5e" strokeOpacity="0.45" />
      <text x="621" y="269" textAnchor="middle" fill="#fda4af" fontSize="10" fontWeight="600">Cancel / Skip -&gt; os.Remove</text>
      <text x="621" y="283" textAnchor="middle" fill="#cbd5e1" fontSize="8.5">Skip drains TCP bytes for next file</text>

      <line x1="494" y1="223" x2="522" y2="223" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#ar-tg)" />
      <line x1="494" y1="238" x2="522" y2="269" stroke="#f43f5e" strokeWidth="1.3" strokeDasharray="3 3" />
    </svg>
  );
}

function EchoTuneDiagram() {
  return (
    <svg
      viewBox="0 0 740 275"
      className="w-full h-auto"
      role="img"
      aria-label="EchoTune 4-goroutine Bubbletea v2 TUI, O(1) Opus cache lookup, and mpv Unix socket IPC architecture"
    >
      <defs>
        <marker id="ar-tl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2dd4bf" />
        </marker>
      </defs>

      {/* Top Row: Event-Driven TUI & Goroutines */}
      <rect x="8" y="8" width="724" height="148" rx="10" fill="#091619" stroke="#14b8a6" strokeOpacity="0.3" />
      <text x="22" y="28" fill="#5eead4" fontSize="10.5" fontWeight="600">EVENT-DRIVEN 1 Hz BUBBLETEA v2 RUNTIME (4 COORDINATED GOROUTINES)</text>

      <rect x="22" y="44" width="166" height="96" rx="7" fill="#0d1e22" stroke="#14b8a6" strokeOpacity="0.6" />
      <text x="105" y="65" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">Bubbletea Elm TUI</text>
      <text x="105" y="83" textAnchor="middle" fill="#5eead4" fontSize="9.5">1 Hz tea.Tick (no spin)</text>
      <text x="105" y="99" textAnchor="middle" fill="#cbd5e1" fontSize="9">KeyMsg + progressMsg</text>
      <text x="105" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">normalMode / inputMode</text>
      <text x="105" y="129" textAnchor="middle" fill="#94a3b8" fontSize="8.5">&lt;3% CPU utilization</text>

      <rect x="220" y="44" width="176" height="96" rx="7" fill="#0d1e22" stroke="#38bdf8" strokeOpacity="0.5" />
      <text x="308" y="65" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">PlaybackSession</text>
      <text x="308" y="83" textAnchor="middle" fill="#7dd3fc" fontSize="9.5">Queue + 3x retry (500ms)</text>
      <text x="308" y="99" textAnchor="middle" fill="#cbd5e1" fontSize="9">G1: mpv Wait() reaper</text>
      <text x="308" y="115" textAnchor="middle" fill="#cbd5e1" fontSize="9">G2: &lt;-Done watcher</text>
      <text x="308" y="129" textAnchor="middle" fill="#cbd5e1" fontSize="9">G3: 1 Hz IPC get_property</text>

      <rect x="428" y="44" width="144" height="96" rx="7" fill="#0c1c22" stroke="#14b8a6" strokeOpacity="0.55" />
      <text x="500" y="65" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">Out-of-Process mpv</text>
      <text x="500" y="83" textAnchor="middle" fill="#5eead4" fontSize="9.5">--no-video decode</text>
      <text x="500" y="99" textAnchor="middle" fill="#cbd5e1" fontSize="9">Unix socket JSON IPC</text>
      <text x="500" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">30s / 50MB demux cache</text>
      <text x="500" y="129" textAnchor="middle" fill="#94a3b8" fontSize="8.5">10ms waitForSocket dial</text>

      <rect x="596" y="44" width="122" height="96" rx="7" fill="#0c1c22" stroke="#818cf8" strokeOpacity="0.45" />
      <text x="657" y="65" textAnchor="middle" fill="#f8fafc" fontSize="11" fontWeight="600">G4: Opus DL</text>
      <text x="657" y="83" textAnchor="middle" fill="#c7d2fe" fontSize="9.5">yt-dlp -x opus</text>
      <text x="657" y="99" textAnchor="middle" fill="#cbd5e1" fontSize="9">Embed JPG cover</text>
      <text x="657" y="115" textAnchor="middle" fill="#94a3b8" fontSize="9">Atomic downloads.json</text>
      <text x="657" y="129" textAnchor="middle" fill="#94a3b8" fontSize="8.5">--no-progress</text>

      <line x1="188" y1="92" x2="216" y2="92" stroke="#2dd4bf" strokeWidth="1.5" markerEnd="url(#ar-tl)" />
      <line x1="396" y1="92" x2="424" y2="92" stroke="#2dd4bf" strokeWidth="1.5" markerEnd="url(#ar-tl)" />
      <line x1="105" y1="140" x2="105" y2="174" stroke="#2dd4bf" strokeWidth="1.4" strokeDasharray="3 3" markerEnd="url(#ar-tl)" />

      {/* Bottom Row: Lazy O(1) Local Storage */}
      <rect x="8" y="176" width="724" height="90" rx="10" fill="#071215" stroke="#ffffff" strokeOpacity="0.09" />
      <text x="22" y="197" fill="#f8fafc" fontSize="10.5" fontWeight="600">LAZY JSON STORES &amp; O(1) LOCAL OPUS RESOLUTION</text>
      <text x="22" y="218" fill="#5eead4" fontSize="10">
        1. Cache.Songs[query] (100-entry LRU) -&gt; skips yt-dlp NDJSON search  |  2. Downloads.Songs[songID] + os.Stat -&gt; plays ~/Music/echotune/&lt;id&gt;.opus
      </text>
      <text x="22" y="238" fill="#cbd5e1" fontSize="9.5">
        sweepPartialDownloads() cleans orphaned dirs on mount · history.json (100 FIFO) · per-playlist JSON files · lazy-loaded once per command
      </text>
    </svg>
  );
}

export default function ArchitectureDiagram({
  diagramId,
}: {
  diagramId?: ProjectItem["diagramId"];
}) {
  if (!diagramId) return null;

  return (
    <div className="rounded-lg bg-[#040710]/90 border border-white/[0.07] p-2.5 sm:p-3.5">
      {diagramId === "ledger" && <LedgerDiagram />}
      {diagramId === "errand" && <ErrandDiagram />}
      {diagramId === "datarover" && <DataRoverDiagram />}
      {diagramId === "transnet" && <TransNetDiagram />}
      {diagramId === "echotune" && <EchoTuneDiagram />}
    </div>
  );
}
