import { useState } from "react";
import type { ProjectItem } from "../data";
import ArchitectureDiagram from "./ArchitectureDiagrams";
import { ConsolePanel, accentRgba } from "./InternalsShell";
import { Check } from "lucide-react";

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

function LedgerTelemetryCharts({
  project,
  accent,
}: {
  project: ProjectItem;
  accent: string;
}) {
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
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <span className="text-sm font-semibold text-slate-200">
          k6 Throughput &amp; p95 Tail Latency Progression
        </span>
        <span className="font-mono text-[11px] text-slate-400">
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
              className="relative overflow-hidden rounded-lg border border-white/[0.07] bg-[#080e1b]/70 px-3.5 py-3"
            >
              <span
                aria-hidden="true"
                className="absolute inset-y-0 left-0 w-[2px]"
                style={{
                  background: isFair ? accent : accentRgba(accent, 0.35),
                }}
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2">
                <div>
                  <span className="text-sm font-semibold text-white">
                    {row.stage}
                  </span>
                  <span className="ml-2 text-xs text-slate-400">
                    {row.change}
                  </span>
                </div>
                <div className="flex items-center gap-3 font-mono text-xs tabular-nums">
                  <span
                    className="font-semibold"
                    style={{ color: isFair ? accent : "#7dd3fc" }}
                  >
                    {row.rps.toLocaleString()} req/s
                  </span>
                  <span className="text-slate-300">{row.p95Ms} ms p95</span>
                  <span className="hidden text-slate-500 sm:inline">
                    {row.memoryMb} MB
                  </span>
                </div>
              </div>
              <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${widthPct}%`,
                    background: isFair
                      ? `linear-gradient(90deg, ${accentRgba(accent, 0.55)}, ${accent})`
                      : accentRgba(accent, 0.5),
                    boxShadow: `0 0 12px ${accentRgba(accent, isFair ? 0.5 : 0.25)}`,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {project.rejectedTradeoffs && (
        <div className="space-y-3 border-t border-white/[0.07] pt-4">
          <span className="text-xs font-semibold text-slate-300">
            Benchmarked and rejected experiments
          </span>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {project.rejectedTradeoffs.map((rt) => (
              <div
                key={rt.option}
                className="rounded-lg border border-white/[0.07] bg-white/[0.015] p-3.5"
              >
                <div className="text-xs font-semibold text-slate-200">
                  {rt.option}
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-slate-400">
                  {rt.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function InvariantList({ items }: { items?: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="divide-y divide-white/[0.06] rounded-lg border border-white/[0.07] bg-white/[0.015] px-3.5">
      {items.map((inv) => (
        <div key={inv} className="flex items-start gap-2.5 py-2.5">
          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
          <span className="text-xs leading-relaxed text-slate-300">{inv}</span>
        </div>
      ))}
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
  const accent = project.accentColor || "#38bdf8";

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
    ...(hasMedia ? [{ id: "demo" as const, label: "Demo" }] : []),
    {
      id: "topology" as const,
      label: hasMedia ? "Full Architecture" : "Architecture & Protocol",
    },
    ...(specs ? [{ id: "specs" as const, label: "Source Internals" }] : []),
  ];

  return (
    <div className="space-y-5 border-t border-white/[0.08] pt-5">
      {/* Underline tab switcher */}
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-white/[0.08]">
        {tabs.map((t) => {
          const active = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`-mb-px border-b-2 pb-3 text-sm font-medium transition-colors ${
                active
                  ? "text-white"
                  : "border-transparent text-slate-400 hover:text-slate-200"
              }`}
              style={active ? { borderColor: accent } : undefined}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Benchmarks View (Ledger Engine) */}
      {tab === "benchmarks" && (
        <ConsolePanel label="Benchmarks & Tradeoffs" accent={accent}>
          <LedgerTelemetryCharts project={project} accent={accent} />
        </ConsolePanel>
      )}

      {/* Demo View (media only — the flow chart lives in its own tab) */}
      {tab === "demo" && project.media && (
        <ConsolePanel label="Demo" accent={accent}>
          <figure
            className={
              project.media.aspect === "portrait"
                ? "mx-auto w-full max-w-[280px]"
                : "w-full"
            }
          >
            <div className="relative overflow-hidden rounded-lg border border-white/[0.12] bg-black shadow-[0_14px_34px_-16px_rgba(0,0,0,0.95)]">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 z-10 rounded-lg ring-1 ring-inset ring-white/[0.05]"
              />
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
                  className="block h-auto w-full"
                />
              ) : (
                <img
                  src={project.media.src}
                  alt={project.media.caption}
                  loading="lazy"
                  className="block h-auto w-full"
                />
              )}
            </div>
            <figcaption className="mt-3 text-xs leading-relaxed text-slate-400">
              {project.media.caption}
            </figcaption>
          </figure>
        </ConsolePanel>
      )}

      {/* Full Architecture Topology View */}
      {tab === "topology" && (
        <ConsolePanel
          label={hasMedia ? "Full Architecture" : "Architecture & Protocol"}
          accent={accent}
        >
          <div className="space-y-4">
            <ArchitectureDiagram
              diagramId={project.diagramId}
              accentColor={accent}
            />
            <InvariantList items={project.invariants} />
          </div>
        </ConsolePanel>
      )}

      {/* Deep Source Internals Spec Grid */}
      {tab === "specs" && specs && (
        <ConsolePanel label="Source Internals" accent={accent}>
          <div className="space-y-4">
            <p className="text-sm font-semibold text-slate-200">{specs.title}</p>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {specs.rows.map((row) => (
                <div
                  key={row.label}
                  className="rounded-lg border border-white/[0.07] bg-[#080e1b]/70 p-3.5"
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <span className="text-xs font-semibold text-white">
                      {row.label}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400">
                      {row.value}
                    </span>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-400">
                    {row.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ConsolePanel>
      )}
    </div>
  );
}
