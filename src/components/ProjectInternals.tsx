import { useState } from "react";
import type { ProjectItem } from "../data";
import ArchitectureDiagram from "./ArchitectureDiagrams";

interface SpecRow {
  label: string;
  value: string;
  detail: string;
}

const PROJECT_SPECS: Record<string, { title: string; rows: SpecRow[] }> = {
  "ledger-engine": {
    title: "pg_stat_activity Wait Events & Contention Analysis (150 VUs)",
    rows: [
      {
        label: "LWLock:WALWrite (15–24 waiters)",
        value: "6.45 ms mean fsync",
        detail: "16.4 commits/flush across ~115 flushes/s with synchronous_commit=on (1,762 B/tx)",
      },
      {
        label: "Lock:transactionid (7–14 waiters)",
        value: "12.24 ms -> 2.70 ms",
        detail: "Expanding 120 -> 1,000 accounts cut mean transfer exec 4.5x with zero code changes",
      },
      {
        label: "5s Checkpoint Reconcile",
        value: "331 ms -> 0.9 ms",
        detail: "Incremental postings.seq audit + atomic.Pointer lock-free reads (stale > 10s)",
      },
      {
        label: "Idempotency Conflict Gate",
        value: "SQLSTATE 23505 -> 200",
        detail: "UNIQUE(idempotency_key) serializes colliding retries; 422 on mismatched request_hash",
      },
    ],
  },
  errand: {
    title: "Safety Tiers, Context Budgeting & Native Isolation",
    rows: [
      {
        label: "ShellSafetyCheck (3-Tier)",
        value: "Safe · Confirm · Blocked",
        detail: "Recursive parse across $(), backticks, wrappers; blocks /system, /sdcard roots, su, dd",
      },
      {
        label: "ContextBudget & Spill",
        value: "128K ctx · >6K spill",
        detail: "Pre/mid-step compaction summarizes older turns; >6K char outputs write atomically to .part",
      },
      {
        label: "SecretStore Encryption",
        value: "AES-256-GCM",
        detail: "32-byte random key stored in errand.key outside 7-table v10 Drift SQLite database",
      },
      {
        label: "Lite Build & Scheduler",
        value: "No AccessibilityService",
        detail: "omits screen/a11y permissions; uses AlarmManager exact + JobScheduler + SHA-256 OTA",
      },
    ],
  },
  datarover: {
    title: "Hybrid Tool Split & Browser Storage Mechanics",
    rows: [
      {
        label: "Python <-> DuckDB Bridge",
        value: "duckdb_bridge.sql()",
        detail: "Pyodide v0.26.4 worker posts SQL requests via main thread into DuckDB-WASM worker",
      },
      {
        label: "Plot Capture & Context Trim",
        value: "Supabase plots bucket",
        detail: "Matplotlib PNGs strip base64 out of LLM tool history and upload via signed URLs",
      },
      {
        label: "IndexedDB & Grid Cache",
        value: "DataRoverCache v1",
        detail: "Parquet Uint8Array buffers cached per workspaceId; AgGridReact previews 2,000 rows",
      },
      {
        label: "Neon + Drizzle Schema",
        value: "5 PostgreSQL tables",
        detail: "users, workspaces, conversations, messages (tool_calls jsonb), agent_insights",
      },
    ],
  },
  transnet: {
    title: "Wire Framing, Android Locks & FFI Boundary",
    rows: [
      {
        label: "UDP Discovery (:9090)",
        value: "TRANSNET/1 OFFER/ACCEPT",
        detail: "Broadcasts 255.255.255.255 every 1s (20s window); Kotlin holds WifiManager.MulticastLock",
      },
      {
        label: "TCP Framing (:8080)",
        value: "32 KiB raw chunks",
        detail: "<numFiles>\\n followed by <name><|sep|><bytes>\\n headers and io.ReadFull payload",
      },
      {
        label: "Skip Stream Alignment",
        value: "os.Remove + TCP drain",
        detail: "Deleting .part on skip drains remaining bytes from bufio.Reader to keep next header aligned",
      },
      {
        label: "gomobile String ABI",
        value: "50ms Go / 200ms JS poll",
        detail: "gobind skips Go value structs, so progress crosses JNI as <|sep|> delimited strings",
      },
    ],
  },
  echotune: {
    title: "Local XDG Stores & Sub-3% CPU Mechanics",
    rows: [
      {
        label: "Out-of-Process Decode",
        value: "mpv --no-video",
        detail: "Zero video decode; 30s / 50MB demux cache controlled via $XDG_RUNTIME_DIR/echotune.sock",
      },
      {
        label: "O(1) Opus Lookup",
        value: "Downloads.Songs[id]",
        detail: "Verifies ~/Music/echotune/<id> via os.Stat and skips yt-dlp resolution completely",
      },
      {
        label: "Event-Driven UI",
        value: "1 Hz tea.Tick",
        detail: "Bubbletea v2 blocks on KeyMsg, <-Done, and 1s IPC time-pos polls without spin loops",
      },
      {
        label: "Cache & Cleanup",
        value: "100 LRU + orphan sweep",
        detail: "Lazy-loaded cache.json & history.json; sweepPartialDownloads() prunes incomplete dirs",
      },
    ],
  },
};

function LedgerTelemetryCharts({ project }: { project: ProjectItem }) {
  if (!project.benchmarks) return null;
  const maxRps = Math.max(...project.benchmarks.map((b) => b.rps), 5075);

  const stages = [
    ...project.benchmarks,
    {
      stage: "Peak Config Study",
      change: "1,000 accounts, 90 connections",
      rps: 5075,
      p95Ms: 45,
      memoryMb: 550,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <span className="font-medium text-slate-200">
            k6 Throughput &amp; p95 Tail Latency Progression
          </span>
          <span className="font-mono text-sky-300">
            Target: &gt;3,000 req/s · &lt;1 GB RAM
          </span>
        </div>

        <div className="space-y-2.5">
          {stages.map((row) => {
            const widthPct = Math.round((row.rps / maxRps) * 100);
            const isFair = row.stage === "Fair Account Set";
            return (
              <div
                key={row.stage}
                className="p-3 rounded-lg bg-[#050811]/90 border border-white/[0.06] space-y-2"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-white">
                      {row.stage}
                    </span>
                    <span className="text-slate-400 ml-2">{row.change}</span>
                  </div>
                  <div className="flex items-center gap-3 font-mono">
                    <span
                      className={
                        isFair ? "text-violet-300 font-semibold" : "text-sky-300"
                      }
                    >
                      {row.rps.toLocaleString()} req/s
                    </span>
                    <span className="text-slate-300">{row.p95Ms} ms p95</span>
                    <span className="text-slate-500 hidden sm:inline">
                      {row.memoryMb} MB
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      isFair
                        ? "bg-gradient-to-r from-violet-500 to-sky-400"
                        : "bg-sky-500/70"
                    }`}
                    style={{ width: `${widthPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {project.rejectedTradeoffs && (
        <div className="pt-4 border-t border-white/[0.07] space-y-3">
          <div className="text-xs font-medium text-slate-200">
            Benchmarked and rejected experiments
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.rejectedTradeoffs.map((rt) => (
              <div
                key={rt.option}
                className="p-3 rounded-lg bg-[#050811]/90 border border-white/[0.06] text-xs space-y-1"
              >
                <div className="font-semibold text-white">{rt.option}</div>
                <div className="text-slate-400 leading-relaxed">
                  {rt.outcome}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function ProjectInternals({
  project,
}: {
  project: ProjectItem;
}) {
  const hasBenchmarks = Boolean(project.benchmarks?.length);
  const hasMedia = Boolean(project.media);
  const specs = PROJECT_SPECS[project.id];

  type TabId = "topology" | "benchmarks" | "demo" | "specs";
  const defaultTab: TabId = hasBenchmarks
    ? "benchmarks"
    : hasMedia
      ? "demo"
      : "topology";
  const [tab, setTab] = useState<TabId>(defaultTab);

  const tabs: { id: TabId; label: string }[] = [
    ...(hasBenchmarks
      ? [{ id: "benchmarks" as const, label: "Benchmarks & Tradeoffs" }]
      : []),
    ...(hasMedia ? [{ id: "demo" as const, label: "Demo & Topology" }] : []),
    {
      id: "topology" as const,
      label: hasMedia ? "Full Architecture" : "Architecture & Protocol",
    },
    ...(specs ? [{ id: "specs" as const, label: "Source Internals" }] : []),
  ];

  return (
    <div className="pt-5 border-t border-white/[0.08] space-y-5">
      {/* Clean Underline Tab Switcher */}
      <div className="flex flex-wrap items-center gap-5 border-b border-white/[0.08]">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`pb-2.5 text-xs font-medium border-b-2 transition-colors -mb-px ${
                active
                  ? "border-sky-400 text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Benchmarks View (Ledger Engine) */}
      {tab === "benchmarks" && <LedgerTelemetryCharts project={project} />}

      {/* Combined Demo + Architecture View */}
      {tab === "demo" && project.media && (
        <div
          className={`grid grid-cols-1 gap-6 items-start ${
            project.media.aspect === "portrait"
              ? "lg:grid-cols-[240px_minmax(0,1fr)]"
              : "lg:grid-cols-12"
          }`}
        >
          <div
            className={
              project.media.aspect === "portrait"
                ? "mx-auto lg:mx-0 w-full max-w-[240px]"
                : "lg:col-span-5"
            }
          >
            <div className="overflow-hidden rounded-lg border border-white/[0.1] bg-black">
              {project.media.type === "video" ? (
                <video
                  src={project.media.src}
                  poster={project.media.poster}
                  autoPlay
                  loop
                  muted
                  playsInline
                  controls
                  preload="none"
                  className="w-full h-auto block"
                />
              ) : (
                <img
                  src={project.media.src}
                  alt={project.media.caption}
                  loading="lazy"
                  className="w-full h-auto block"
                />
              )}
            </div>
            <p className="text-xs text-slate-400 mt-2.5 leading-relaxed">
              {project.media.caption}
            </p>
          </div>

          <div
            className={
              project.media.aspect === "portrait"
                ? "space-y-4 min-w-0"
                : "lg:col-span-7 space-y-4 min-w-0"
            }
          >
            <ArchitectureDiagram diagramId={project.diagramId} />
            {project.invariants && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {project.invariants.map((inv) => (
                  <div
                    key={inv}
                    className="flex items-start gap-2 text-xs text-slate-300 bg-[#050811]/90 border border-white/[0.06] rounded-lg px-3 py-2"
                  >
                    <span className="text-emerald-400 shrink-0">✓</span>
                    <span>{inv}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Full Architecture Topology View */}
      {tab === "topology" && (
        <div className="space-y-4">
          <ArchitectureDiagram diagramId={project.diagramId} />
          {project.invariants && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {project.invariants.map((inv) => (
                <div
                  key={inv}
                  className="flex items-start gap-2 text-xs text-slate-300 bg-[#050811]/90 border border-white/[0.06] rounded-lg px-3.5 py-2.5"
                >
                  <span className="text-emerald-400 shrink-0">✓</span>
                  <span>{inv}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Deep Source Internals Spec Grid */}
      {tab === "specs" && specs && (
        <div className="space-y-3">
          <div className="text-xs font-medium text-slate-200">
            {specs.title}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {specs.rows.map((row) => (
              <div
                key={row.label}
                className="p-3.5 rounded-lg bg-[#050811]/90 border border-white/[0.06] space-y-1.5"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="text-xs font-semibold text-white">
                    {row.label}
                  </span>
                  <span className="font-mono text-[11px] text-sky-300 shrink-0">
                    {row.value}
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {row.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
