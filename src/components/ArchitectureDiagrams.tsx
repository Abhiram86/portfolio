import type { ProjectItem } from "../data";

function LedgerDiagram() {
  return (
    <svg
      viewBox="0 0 680 185"
      className="w-full h-auto"
      role="img"
      aria-label="Ledger Engine single-CTE transaction and reconciliation architecture"
    >
      <defs>
        <marker
          id="arrow-violet"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#a78bfa" />
        </marker>
      </defs>

      {/* Nodes */}
      <g>
        <rect x="12" y="28" width="136" height="62" rx="8" fill="#101526" stroke="#8b5cf6" strokeOpacity="0.5" />
        <text x="80" y="54" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Go API Process</text>
        <text x="80" y="72" textAnchor="middle" fill="#94a3b8" fontSize="10">Idempotency-Key Gate</text>

        <rect x="184" y="20" width="176" height="78" rx="8" fill="#13192e" stroke="#a78bfa" strokeOpacity="0.65" />
        <text x="272" y="45" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Single-CTE SQL Tx</text>
        <text x="272" y="63" textAnchor="middle" fill="#c4b5fd" fontSize="10">Ordered Lock + Balance Check</text>
        <text x="272" y="79" textAnchor="middle" fill="#94a3b8" fontSize="10">Postings + Debit/Credit</text>

        <rect x="396" y="28" width="132" height="62" rx="8" fill="#101526" stroke="#38bdf8" strokeOpacity="0.5" />
        <text x="462" y="54" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Postgres WAL</text>
        <text x="462" y="72" textAnchor="middle" fill="#7dd3fc" fontSize="10">sync_commit=on (6.5ms)</text>

        <rect x="556" y="28" width="112" height="62" rx="8" fill="#101526" stroke="#10b981" strokeOpacity="0.5" />
        <text x="612" y="54" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">5s Reconcile</text>
        <text x="612" y="72" textAnchor="middle" fill="#6ee7b7" fontSize="10">postings.seq delta</text>
      </g>

      {/* Arrows */}
      <line x1="148" y1="59" x2="180" y2="59" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arrow-violet)" />
      <line x1="360" y1="59" x2="392" y2="59" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arrow-violet)" />
      <line x1="528" y1="59" x2="552" y2="59" stroke="#a78bfa" strokeWidth="1.5" markerEnd="url(#arrow-violet)" />

      {/* Bottom Pool & Safety strip */}
      <rect x="12" y="122" width="656" height="46" rx="8" fill="#0b101d" stroke="#ffffff" strokeOpacity="0.08" />
      <text x="340" y="149" textAnchor="middle" fill="#cbd5e1" fontSize="11">
        36-conn pool · 3,778 req/s @ 54ms p95 · 340 MB RAM · 0 overdrafts · 0 deadlocks · 0 duplicate debits
      </text>
    </svg>
  );
}

function ErrandDiagram() {
  return (
    <svg
      viewBox="0 0 680 205"
      className="w-full h-auto"
      role="img"
      aria-label="Errand on-device Android AI agent architecture"
    >
      <defs>
        <marker
          id="arrow-sky"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#38bdf8" />
        </marker>
      </defs>

      <rect x="12" y="20" width="144" height="62" rx="8" fill="#0f172a" stroke="#38bdf8" strokeOpacity="0.55" />
      <text x="84" y="46" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Flutter Chat UI</text>
      <text x="84" y="64" textAnchor="middle" fill="#94a3b8" fontSize="10">Streaming deltas &amp; media</text>

      <rect x="192" y="20" width="166" height="62" rx="8" fill="#0f172a" stroke="#38bdf8" strokeOpacity="0.7" />
      <text x="275" y="46" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">72-Turn Agent Loop</text>
      <text x="275" y="64" textAnchor="middle" fill="#7dd3fc" fontSize="10">Token budget + compaction</text>

      <rect x="394" y="20" width="134" height="62" rx="8" fill="#0f172a" stroke="#818cf8" strokeOpacity="0.5" />
      <text x="461" y="46" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">LLM Stream API</text>
      <text x="461" y="64" textAnchor="middle" fill="#94a3b8" fontSize="10">OpenRouter / Custom</text>

      <rect x="556" y="20" width="112" height="62" rx="8" fill="#0f172a" stroke="#10b981" strokeOpacity="0.5" />
      <text x="612" y="46" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Drift SQLite</text>
      <text x="612" y="64" textAnchor="middle" fill="#6ee7b7" fontSize="10">AES-256-GCM keys</text>

      <line x1="156" y1="51" x2="188" y2="51" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow-sky)" />
      <line x1="358" y1="51" x2="390" y2="51" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow-sky)" />
      <line x1="275" y1="82" x2="275" y2="114" stroke="#38bdf8" strokeWidth="1.5" markerEnd="url(#arrow-sky)" />

      {/* Tool Registry Row */}
      <rect x="12" y="118" width="656" height="68" rx="8" fill="#0b1120" stroke="#ffffff" strokeOpacity="0.09" />
      <text x="28" y="140" fill="#7dd3fc" fontSize="11" fontWeight="600">On-Device Tool Registry</text>
      <text x="28" y="160" fill="#cbd5e1" fontSize="10.5">
        17 Android Intents (Kotlin)  ·  Sandboxed Bash + Safety Gates  ·  PDF/Office Reader  ·  In-App Browser DOM  ·  WorkManager Scheduler
      </text>
      <text x="28" y="176" fill="#94a3b8" fontSize="10">
        No Accessibility Service declared · Tool outputs &gt;6K chars cached on disk with head/tail slices
      </text>
    </svg>
  );
}

function DataRoverDiagram() {
  return (
    <svg
      viewBox="0 0 680 175"
      className="w-full h-auto"
      role="img"
      aria-label="DataRover zero-server WebAssembly analytics pipeline"
    >
      <defs>
        <marker
          id="arrow-emerald"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#34d399" />
        </marker>
      </defs>

      <rect x="12" y="26" width="144" height="64" rx="8" fill="#0c191a" stroke="#10b981" strokeOpacity="0.5" />
      <text x="84" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">CSV / Excel / Parquet</text>
      <text x="84" y="71" textAnchor="middle" fill="#6ee7b7" fontSize="10">Client memory only</text>

      <rect x="188" y="26" width="152" height="64" rx="8" fill="#0c191a" stroke="#10b981" strokeOpacity="0.7" />
      <text x="264" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">DuckDB-WASM</text>
      <text x="264" y="71" textAnchor="middle" fill="#a7f3d0" fontSize="10">Vectorized in-tab SQL</text>

      <rect x="372" y="26" width="144" height="64" rx="8" fill="#0c191a" stroke="#38bdf8" strokeOpacity="0.5" />
      <text x="444" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Pyodide Sandbox</text>
      <text x="444" y="71" textAnchor="middle" fill="#7dd3fc" fontSize="10">Browser Python runtime</text>

      <rect x="548" y="26" width="120" height="64" rx="8" fill="#0c191a" stroke="#818cf8" strokeOpacity="0.5" />
      <text x="608" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Vercel AI SDK</text>
      <text x="608" y="71" textAnchor="middle" fill="#94a3b8" fontSize="10">Drizzle + Neon sync</text>

      <line x1="156" y1="58" x2="184" y2="58" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />
      <line x1="340" y1="58" x2="368" y2="58" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />
      <line x1="516" y1="58" x2="544" y2="58" stroke="#34d399" strokeWidth="1.5" markerEnd="url(#arrow-emerald)" />

      <rect x="12" y="114" width="656" height="42" rx="8" fill="#0a1214" stroke="#ffffff" strokeOpacity="0.08" />
      <text x="340" y="139" textAnchor="middle" fill="#cbd5e1" fontSize="11">
        Zero backend compute cost · Schema-aware AI writes &amp; executes SQL/Python locally · Persisted workspaces
      </text>
    </svg>
  );
}

function TransNetDiagram() {
  return (
    <svg
      viewBox="0 0 680 175"
      className="w-full h-auto"
      role="img"
      aria-label="TransNet Go gomobile and Kotlin Expo P2P transfer stack"
    >
      <defs>
        <marker
          id="arrow-indigo"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#818cf8" />
        </marker>
      </defs>

      <rect x="12" y="26" width="144" height="64" rx="8" fill="#101326" stroke="#818cf8" strokeOpacity="0.55" />
      <text x="84" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Expo React Native</text>
      <text x="84" y="71" textAnchor="middle" fill="#94a3b8" fontSize="10">Progress, cancel, skip</text>

      <rect x="188" y="26" width="148" height="64" rx="8" fill="#101326" stroke="#818cf8" strokeOpacity="0.65" />
      <text x="262" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Kotlin Expo Bridge</text>
      <text x="262" y="71" textAnchor="middle" fill="#c7d2fe" fontSize="10">Permissions &amp; file URIs</text>

      <rect x="368" y="26" width="148" height="64" rx="8" fill="#101326" stroke="#38bdf8" strokeOpacity="0.6" />
      <text x="442" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Go Transfer Core</text>
      <text x="442" y="71" textAnchor="middle" fill="#7dd3fc" fontSize="10">gomobile Android AAR</text>

      <rect x="548" y="26" width="120" height="64" rx="8" fill="#101326" stroke="#10b981" strokeOpacity="0.55" />
      <text x="608" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">UDP + TCP</text>
      <text x="608" y="71" textAnchor="middle" fill="#6ee7b7" fontSize="10">Atomic .part writes</text>

      <line x1="156" y1="58" x2="184" y2="58" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
      <line x1="336" y1="58" x2="364" y2="58" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />
      <line x1="516" y1="58" x2="544" y2="58" stroke="#818cf8" strokeWidth="1.5" markerEnd="url(#arrow-indigo)" />

      <rect x="12" y="114" width="656" height="42" rx="8" fill="#0c0f1d" stroke="#ffffff" strokeOpacity="0.08" />
      <text x="340" y="139" textAnchor="middle" fill="#cbd5e1" fontSize="11">
        UDP LAN broadcast discovery → Peer accept → TCP byte stream to .part temp file → Atomic rename on success
      </text>
    </svg>
  );
}

function EchoTuneDiagram() {
  return (
    <svg
      viewBox="0 0 680 175"
      className="w-full h-auto"
      role="img"
      aria-label="EchoTune Bubbletea TUI and PlaybackSession pipeline"
    >
      <defs>
        <marker
          id="arrow-teal"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#2dd4bf" />
        </marker>
      </defs>

      <rect x="12" y="26" width="144" height="64" rx="8" fill="#0b181a" stroke="#14b8a6" strokeOpacity="0.55" />
      <text x="84" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">Bubbletea TUI</text>
      <text x="84" y="71" textAnchor="middle" fill="#94a3b8" fontSize="10">Elm state + keybinds</text>

      <rect x="188" y="26" width="152" height="64" rx="8" fill="#0b181a" stroke="#14b8a6" strokeOpacity="0.7" />
      <text x="264" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">PlaybackSession</text>
      <text x="264" y="71" textAnchor="middle" fill="#5eead4" fontSize="10">Unified queue &amp; history</text>

      <rect x="372" y="26" width="144" height="64" rx="8" fill="#0b181a" stroke="#38bdf8" strokeOpacity="0.5" />
      <text x="444" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">O(1) Local Opus</text>
      <text x="444" y="71" textAnchor="middle" fill="#7dd3fc" fontSize="10">Cache hit vs stream</text>

      <rect x="548" y="26" width="120" height="64" rx="8" fill="#0b181a" stroke="#14b8a6" strokeOpacity="0.55" />
      <text x="608" y="53" textAnchor="middle" fill="#f8fafc" fontSize="12" fontWeight="600">mpv + yt-dlp</text>
      <text x="608" y="71" textAnchor="middle" fill="#5eead4" fontSize="10">Audio-only (&lt;3% CPU)</text>

      <line x1="156" y1="58" x2="184" y2="58" stroke="#2dd4bf" strokeWidth="1.5" markerEnd="url(#arrow-teal)" />
      <line x1="340" y1="58" x2="368" y2="58" stroke="#2dd4bf" strokeWidth="1.5" markerEnd="url(#arrow-teal)" />
      <line x1="516" y1="58" x2="544" y2="58" stroke="#2dd4bf" strokeWidth="1.5" markerEnd="url(#arrow-teal)" />

      <rect x="12" y="114" width="656" height="42" rx="8" fill="#091315" stroke="#ffffff" strokeOpacity="0.08" />
      <text x="340" y="139" textAnchor="middle" fill="#cbd5e1" fontSize="11">
        Concurrent search cache · Background Opus downloads · Playlist &amp; history persistence without browser overhead
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
    <div className="rounded-lg bg-[#050812]/90 border border-white/[0.08] p-3 sm:p-4">
      {diagramId === "ledger" && <LedgerDiagram />}
      {diagramId === "errand" && <ErrandDiagram />}
      {diagramId === "datarover" && <DataRoverDiagram />}
      {diagramId === "transnet" && <TransNetDiagram />}
      {diagramId === "echotune" && <EchoTuneDiagram />}
    </div>
  );
}
