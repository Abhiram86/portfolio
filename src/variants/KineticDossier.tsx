import { useEffect, useState } from "react";
import ScrollFluid3D from "../components/ScrollFluid3D";
import ResumeModal from "../components/ResumeModal";
import ArchitectureDiagram from "../components/ArchitectureDiagrams";
import DitherCard from "../components/DitherCard";
import { PORTFOLIO_DATA, type ProjectItem } from "../data";
import { GithubIcon, LinkedinIcon } from "../components/Icons";
import {
  ArrowUpRight,
  BookOpen,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  FileText,
  Mail,
} from "lucide-react";

const SKILL_LABELS: Record<string, string> = {
  languages: "Languages",
  backend_db: "Backend & Databases",
  frontend_mobile: "Frontend & Mobile",
  systems_ai: "Systems, DevOps & AI",
};

function KineticProjectCard({
  project,
  index,
  defaultOpen = false,
  isDominant = false,
}: {
  project: ProjectItem;
  index: number;
  defaultOpen?: boolean;
  isDominant?: boolean;
}) {
  const [expanded, setExpanded] = useState(defaultOpen);

  return (
    <DitherCard
      id={`project-${project.id}`}
      dataAccentColor={project.accentColor || "#3b82f6"}
      accentColor={project.accentColor || "#38bdf8"}
      isDominant={isDominant}
      ambientDither
      cellSize={5}
      className="p-6 sm:p-9"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">
        {/* Left Index Column */}
        <div className="lg:col-span-2 flex lg:flex-col items-baseline lg:items-start justify-between gap-2">
          <span
            className="font-display text-4xl sm:text-5xl font-bold transition-colors duration-300"
            style={{
              color: isDominant
                ? project.accentColor || "#38bdf8"
                : "rgba(255,255,255,0.22)",
            }}
          >
            0{index + 1}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {project.date}
          </span>
        </div>

        {/* Right Content Column */}
        <div className="lg:col-span-10 space-y-6">
          {/* Header Row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
            <div className="space-y-1.5">
              <div className="text-xs font-medium text-sky-400">
                {project.domain}
              </div>
              <h3 className="font-display text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {project.name}
                {project.subtitle && (
                  <span className="text-slate-400 font-normal text-lg sm:text-xl ml-2.5">
                    — {project.subtitle}
                  </span>
                )}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              {project.links.map((l) => (
                <a
                  key={l.url}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white/[0.06] hover:bg-blue-600 text-xs font-medium text-white border border-white/[0.1] transition-colors"
                >
                  <span>{l.label}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Highlight Metric Callout */}
          {project.highlightMetric && (
            <div className="rounded-lg bg-white/[0.03] border border-white/[0.07] px-4 py-2.5 text-xs sm:text-sm font-medium text-slate-200 w-fit">
              {project.highlightMetric}
            </div>
          )}

          {/* Narrative Points */}
          <div className="space-y-3 text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            {project.points.map((pt, i) => (
              <p key={i}>{pt}</p>
            ))}
          </div>

          {/* Tech Stack & Internals Trigger Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2 border-t border-white/[0.07]">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs px-2.5 py-1 rounded-md bg-white/[0.04] border border-white/[0.07] text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>

            <button
              onClick={() => setExpanded((v) => !v)}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-sky-300 hover:text-white transition-colors shrink-0 w-fit"
            >
              {expanded ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
              <span>
                {expanded
                  ? "Hide architecture & demo"
                  : project.media
                    ? "View demo, architecture & internals"
                    : "View architecture & internals"}
              </span>
            </button>
          </div>

          {/* Expandable Internals & Lazy Media */}
          {expanded && (
            <div className="p-5 sm:p-6 rounded-xl bg-[#040710]/90 border border-white/[0.09] space-y-6">
              {project.media ? (
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
                        : "lg:col-span-6"
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
                        ? "space-y-5 min-w-0"
                        : "lg:col-span-6 space-y-5 min-w-0"
                    }
                  >
                    <div className="space-y-2.5">
                      <div className="text-xs font-medium text-slate-300">
                        System architecture
                      </div>
                      <ArchitectureDiagram diagramId={project.diagramId} />
                    </div>

                    {project.invariants && (
                      <div className="space-y-2">
                        <div className="text-xs font-medium text-slate-300">
                          Verified properties
                        </div>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {project.invariants.map((inv) => (
                            <li key={inv} className="flex items-start gap-2">
                              <span className="text-emerald-400">✓</span>
                              <span>{inv}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="space-y-5">
                  <div className="space-y-2.5">
                    <div className="text-xs font-medium text-slate-300">
                      System architecture
                    </div>
                    <ArchitectureDiagram diagramId={project.diagramId} />
                  </div>

                  {project.invariants && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {project.invariants.map((inv) => (
                        <div
                          key={inv}
                          className="flex items-start gap-2 text-xs text-slate-300 bg-white/[0.02] border border-white/[0.06] rounded-lg px-3 py-2"
                        >
                          <span className="text-emerald-400 shrink-0">✓</span>
                          <span>{inv}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Benchmark Progression (Ledger Engine) */}
              {project.benchmarks && (
                <div className="pt-5 border-t border-white/[0.08]">
                  <div className="text-xs font-medium text-slate-300 mb-3">
                    k6 Load Progression (1,120 accounts, synchronous_commit=on)
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="text-slate-400 border-b border-white/[0.08]">
                          <th className="py-2 pr-4 font-medium">Stage</th>
                          <th className="py-2 pr-4 font-medium">Change</th>
                          <th className="py-2 pr-4 text-right font-medium">
                            Throughput
                          </th>
                          <th className="py-2 pr-4 text-right font-medium">
                            p95
                          </th>
                          <th className="py-2 text-right font-medium">RAM</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.05] font-mono">
                        {project.benchmarks.map((row) => (
                          <tr key={row.stage} className="text-slate-200">
                            <td className="py-2.5 pr-4 font-sans font-semibold text-white">
                              {row.stage}
                            </td>
                            <td className="py-2.5 pr-4 font-sans text-slate-400">
                              {row.change}
                            </td>
                            <td className="py-2.5 pr-4 text-right text-sky-300">
                              {row.rps.toLocaleString()} req/s
                            </td>
                            <td className="py-2.5 pr-4 text-right">
                              {row.p95Ms} ms
                            </td>
                            <td className="py-2.5 text-right text-slate-400">
                              {row.memoryMb} MB
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Rejected Tradeoffs */}
              {project.rejectedTradeoffs && (
                <div className="pt-5 border-t border-white/[0.08]">
                  <div className="text-xs font-medium text-slate-300 mb-3">
                    Benchmarked and rejected
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.rejectedTradeoffs.map((rt) => (
                      <div
                        key={rt.option}
                        className="p-3.5 rounded-lg bg-white/[0.03] border border-white/[0.06] text-xs space-y-1"
                      >
                        <div className="font-semibold text-white">
                          {rt.option}
                        </div>
                        <div className="text-slate-400 leading-relaxed">
                          {rt.outcome}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </DitherCard>
  );
}

export default function KineticDossier() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [accentHex, setAccentHex] = useState("#3b82f6");
  const [dominantId, setDominantId] = useState("top");

  const flagshipIds = [
    "ledger-engine",
    "errand",
    "datarover",
    "transnet",
    "echotune",
  ];
  const flagships = flagshipIds
    .map((id) => PORTFOLIO_DATA.projects.find((p) => p.id === id))
    .filter((p): p is ProjectItem => Boolean(p));
  const secondary = PORTFOLIO_DATA.projects.filter(
    (p) => !flagshipIds.includes(p.id)
  );

  // Track which container occupies the largest visible area in the viewport
  // so touchpad/keyboard scrolling drives the 3D liquid color cleanly
  useEffect(() => {
    let rafId = 0;

    const updateDominantAccent = () => {
      rafId = 0;
      const sections = document.querySelectorAll<HTMLElement>("[data-accent-color]");
      const vh = window.innerHeight;
      let bestColor = "#3b82f6";
      let bestId = "top";
      let bestScore = -1;

      sections.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const visibleTop = Math.max(0, rect.top);
        const visibleBottom = Math.min(vh, rect.bottom);
        const visibleHeight = Math.max(0, visibleBottom - visibleTop);

        if (visibleHeight > bestScore) {
          bestScore = visibleHeight;
          bestColor = el.dataset.accentColor || "#3b82f6";
          bestId = el.id || "";
        }
      });

      setAccentHex((prev) => (prev === bestColor ? prev : bestColor));
      setDominantId((prev) => (prev === bestId ? prev : bestId));
    };

    const scheduleUpdate = () => {
      if (!rafId) {
        rafId = window.requestAnimationFrame(updateDominantAccent);
      }
    };

    updateDominantAccent();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate, { passive: true });

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="relative min-h-screen bg-[#04060c] text-slate-100 font-sans antialiased">
      <ScrollFluid3D accentHex={accentHex} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8">
        {/* Clean Editorial Header */}
        <header className="py-6 flex items-center justify-between border-b border-white/[0.08] gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <a
              href="#top"
              className="font-display font-bold text-lg text-white tracking-tight truncate"
            >
              {PORTFOLIO_DATA.name}
            </a>
            <span className="hidden sm:inline text-xs text-slate-400">
              IIIT Naya Raipur
            </span>
          </div>

          <nav className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-medium text-slate-300">
            <a href="#experience" className="hover:text-white hidden sm:inline">
              Experience
            </a>
            <a href="#work" className="hover:text-white">
              Projects
            </a>
            <a href="#research" className="hover:text-white hidden sm:inline">
              Research
            </a>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
          </nav>
        </header>

        {/* Hero */}
        <section
          id="top"
          data-accent-color="#3b82f6"
          className="pt-16 pb-16 sm:pt-24 sm:pb-24 space-y-12"
        >
          <div className="space-y-6">
            <div className="text-xs sm:text-sm text-slate-400 font-medium">
              <span className="text-sky-400">{PORTFOLIO_DATA.availability}</span>
              <span className="mx-2 text-slate-600">·</span>
              <span>{PORTFOLIO_DATA.location}</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.05] max-w-4xl">
              Full-stack &amp; systems engineer shipping verified speed.
            </h1>

            <p className="text-base sm:text-xl text-slate-300 max-w-2xl leading-relaxed">
              Built a 3,778 req/s ACID financial ledger in Go and Postgres, shipped zero-root Android AI agents and P2P transfer runtimes, and cut production search latency by 70%.
            </p>
          </div>

          {/* 4 Dithered Proof Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PORTFOLIO_DATA.signals.map((sig) => (
              <DitherCard
                key={sig.label}
                accentColor="#38bdf8"
                ambientDither
                cellSize={4}
                className="p-5 sm:p-6"
              >
                <div className="space-y-2">
                  <div className="font-display text-2xl sm:text-3xl font-bold text-white">
                    {sig.value}
                  </div>
                  <div className="text-xs font-semibold text-sky-400">
                    {sig.label}
                  </div>
                  <div className="text-xs text-slate-400 leading-relaxed">
                    {sig.detail}
                  </div>
                </div>
              </DitherCard>
            ))}
          </div>

          {/* Primary Actions */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setIsResumeOpen(true)}
              className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium inline-flex items-center gap-2 shadow-[0_0_25px_rgba(37,99,235,0.35)] transition-colors"
            >
              <FileText className="w-4 h-4" />
              <span>View Resume PDF</span>
            </button>

            <button
              onClick={handleCopyEmail}
              className="px-4 py-3 rounded-lg bg-[#081020]/90 hover:bg-[#0f1c36] border border-white/[0.12] text-sm text-slate-200 inline-flex items-center gap-2.5 transition-colors"
            >
              <Mail className="w-4 h-4 text-sky-400" />
              <span>{PORTFOLIO_DATA.email}</span>
              {copiedEmail ? (
                <Check className="w-4 h-4 text-emerald-400" />
              ) : (
                <Copy className="w-4 h-4 text-slate-400" />
              )}
            </button>

            <a
              href={PORTFOLIO_DATA.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-[#081020]/90 hover:bg-[#0f1c36] border border-white/[0.12] text-slate-200 hover:text-white transition-colors"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-[#081020]/90 hover:bg-[#0f1c36] border border-white/[0.12] text-slate-200 hover:text-white transition-colors"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a
              href={PORTFOLIO_DATA.leetcode}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-lg bg-[#081020]/90 hover:bg-[#0f1c36] border border-white/[0.12] text-slate-200 hover:text-white transition-colors"
              title="LeetCode"
            >
              <Code2 className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Industry Experience */}
        <section
          id="experience"
          data-accent-color="#2563eb"
          className="py-16 space-y-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Industry Experience
            </h2>
            <span className="text-sm text-slate-400">
              8 months production internships
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {PORTFOLIO_DATA.experience.map((exp) => (
              <DitherCard
                key={exp.company}
                accentColor="#3b82f6"
                cellSize={4}
                className="p-6 sm:p-8"
              >
                <div className="space-y-5">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-display text-2xl font-bold text-white">
                        {exp.company}
                      </h3>
                      <div className="text-sm text-sky-300 font-medium mt-1">
                        {exp.role} · {exp.location}
                      </div>
                    </div>
                    <span className="text-xs text-slate-400 font-medium shrink-0 pt-1">
                      {exp.date}
                    </span>
                  </div>

                  {exp.metrics && (
                    <div className="rounded-lg bg-white/[0.03] border border-white/[0.07] px-3.5 py-2.5 text-xs font-medium text-slate-200">
                      {exp.metrics.join(" · ")}
                    </div>
                  )}

                  <ul className="space-y-3 text-sm text-slate-300 leading-relaxed">
                    {exp.points.map((pt, i) => (
                      <li key={i} className="flex items-start gap-2.5">
                        <span className="text-sky-400 mt-1 text-xs shrink-0">
                          •
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </DitherCard>
            ))}
          </div>
        </section>

        {/* Flagship Systems */}
        <section id="work" className="py-16 space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-white tracking-tight">
              Selected Projects
            </h2>
            <span className="text-sm text-slate-400">
              5 flagship systems with architecture &amp; demos
            </span>
          </div>

          <div className="space-y-7">
            {flagships.map((proj, idx) => (
              <KineticProjectCard
                key={proj.id}
                project={proj}
                index={idx}
                defaultOpen={idx === 0}
                isDominant={dominantId === `project-${proj.id}`}
              />
            ))}
          </div>

          {/* Secondary Projects in Dithered Grid */}
          <div
            data-accent-color="#3b82f6"
            className="pt-10 space-y-6"
          >
            <h3 className="font-display text-2xl font-bold text-white">
              More Systems &amp; Applications
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {secondary.map((p) => (
                <DitherCard
                  key={p.id}
                  accentColor="#60a5fa"
                  cellSize={4}
                  className="p-6"
                >
                  <div className="flex flex-col justify-between gap-5 h-full">
                    <div className="space-y-2.5">
                      <div className="flex items-baseline justify-between gap-2">
                        <h4 className="font-display text-lg font-bold text-white">
                          {p.name}
                        </h4>
                        <span className="text-xs text-slate-400 shrink-0">
                          {p.date}
                        </span>
                      </div>
                      <div className="text-xs font-medium text-sky-400">
                        {p.domain}
                      </div>
                      <p className="text-sm text-slate-300 leading-relaxed">
                        {p.points[0]}
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-4 border-t border-white/[0.06]">
                      <span className="text-xs text-slate-400 truncate">
                        {p.tags.slice(0, 3).join(" · ")}
                      </span>
                      <div className="flex items-center gap-3 shrink-0">
                        {p.links.map((l) => (
                          <a
                            key={l.url}
                            href={l.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-sky-300 hover:text-white transition-colors"
                          >
                            <span>{l.label}</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </DitherCard>
              ))}
            </div>
          </div>
        </section>

        {/* Research, Skills & Education */}
        <section
          id="research"
          data-accent-color="#2563eb"
          className="py-16 grid grid-cols-1 lg:grid-cols-12 gap-6"
        >
          <DitherCard
            accentColor="#3b82f6"
            cellSize={4}
            className="lg:col-span-6 p-6 sm:p-8"
          >
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-white">
                Research, Open Source &amp; Honors
              </h2>

              <div className="divide-y divide-white/[0.07]">
                {PORTFOLIO_DATA.achievements.map((a) => (
                  <div
                    key={a.title}
                    className="py-4 first:pt-0 last:pb-0 space-y-1.5"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="font-semibold text-white text-sm">
                        {a.title}
                      </h3>
                      {a.badge && (
                        <span className="text-xs text-sky-300 font-medium shrink-0">
                          {a.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed">
                      {a.desc}
                    </p>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-5 pt-2 border-t border-white/[0.07] text-xs font-medium">
                <a
                  href={PORTFOLIO_DATA.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-300 hover:text-white"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Google Scholar</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.leetcode}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sky-300 hover:text-white"
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>LeetCode (350+)</span>
                </a>
              </div>
            </div>
          </DitherCard>

          <DitherCard
            accentColor="#3b82f6"
            cellSize={4}
            className="lg:col-span-6 p-6 sm:p-8"
          >
            <div className="space-y-6">
              <h2 className="font-display text-2xl font-bold text-white">
                Technical Skills &amp; Education
              </h2>

              <div className="space-y-4">
                {Object.entries(PORTFOLIO_DATA.skills).map(([k, list]) => (
                  <div key={k} className="space-y-1">
                    <div className="text-xs font-semibold text-sky-400">
                      {SKILL_LABELS[k] ?? k}
                    </div>
                    <div className="text-sm text-slate-200 leading-relaxed">
                      {list.join(" · ")}
                    </div>
                  </div>
                ))}

                <div className="pt-5 border-t border-white/[0.08] space-y-1.5">
                  <div className="font-semibold text-white text-sm">
                    {PORTFOLIO_DATA.education[0].institution} —{" "}
                    {PORTFOLIO_DATA.education[0].degree}
                  </div>
                  <div className="text-xs text-sky-300">
                    {PORTFOLIO_DATA.education[0].date} ·{" "}
                    {PORTFOLIO_DATA.education[0].score}
                  </div>
                  {PORTFOLIO_DATA.education[0].coursework && (
                    <div className="text-xs text-slate-400 pt-1 leading-relaxed">
                      {PORTFOLIO_DATA.education[0].coursework.join(" · ")}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </DitherCard>
        </section>

        {/* Footer */}
        <footer className="py-10 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.name}
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${PORTFOLIO_DATA.email}`}
              className="hover:text-white transition-colors"
            >
              {PORTFOLIO_DATA.email}
            </a>
            <span>{PORTFOLIO_DATA.location}</span>
          </div>
        </footer>
      </div>

      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />
    </div>
  );
}
