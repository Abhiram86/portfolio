import { useState } from "react";
import FluidCanvas3D from "../components/FluidCanvas3D";
import ResumeModal from "../components/ResumeModal";
import { PORTFOLIO_DATA } from "../data";
import { GithubIcon, LinkedinIcon } from "../components/Icons";
import {
  ArrowUpRight,
  Copy,
  Check,
  FileText,
  BookOpen,
  Mail,
  ExternalLink,
} from "lucide-react";

export default function MidnightAzure() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  // Top 4 flagship projects presented with 100% equal hierarchy and balance
  const flagshipProjects = [
    PORTFOLIO_DATA.projects.find((p) => p.id === "errand") || PORTFOLIO_DATA.projects[0],
    PORTFOLIO_DATA.projects.find((p) => p.id === "transnet") || PORTFOLIO_DATA.projects[1],
    PORTFOLIO_DATA.projects.find((p) => p.id === "datarover") || PORTFOLIO_DATA.projects[3],
    PORTFOLIO_DATA.projects.find((p) => p.id === "echotune") || PORTFOLIO_DATA.projects[2],
  ];

  const secondaryProjects = PORTFOLIO_DATA.projects.filter(
    (p) => !["errand", "transnet", "datarover", "echotune"].includes(p.id)
  );

  return (
    <div className="relative min-h-screen supports-[min-height:100dvh]:min-h-[100dvh] w-full overflow-x-clip bg-[#030712] text-slate-100 font-sans selection:bg-blue-600/30 selection:text-blue-200 antialiased">
      {/* 3D Organic Fluid Azure Background (pure morphed waves, no floating planets) */}
      <FluidCanvas3D />

      {/* Main Content Container with Mobile-Safe Padding */}
      <div className="relative z-10 flex flex-col min-h-screen supports-[min-height:100dvh]:min-h-[100dvh] max-w-5xl mx-auto px-4 sm:px-8 lg:px-10 overflow-x-clip">
        {/* Minimal Swiss Header */}
        <header className="py-5 sm:py-8 flex items-center justify-between border-b border-white/[0.08] gap-3">
          <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
            <a
              href="#top"
              className="text-sm sm:text-base font-semibold tracking-tight text-white hover:text-blue-300 transition-colors truncate"
            >
              {PORTFOLIO_DATA.name}
            </a>
            <span className="text-slate-600 hidden xs:inline">/</span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline truncate">
              IIIT Naya Raipur
            </span>
          </div>

          <nav className="flex items-center space-x-3.5 sm:space-x-6 text-xs text-slate-300 font-medium shrink-0">
            <a href="#work" className="hover:text-white transition-colors">
              Work
            </a>
            <a
              href="#disciplines"
              className="hover:text-white transition-colors hidden sm:inline"
            >
              Disciplines
            </a>
            <a
              href="#experience"
              className="hover:text-white transition-colors hidden sm:inline"
            >
              Experience
            </a>
            <a
              href="#research"
              className="hover:text-white transition-colors hidden sm:inline"
            >
              Research
            </a>
            <button
              onClick={() => setIsResumeOpen(true)}
              className="flex items-center space-x-1 text-blue-300 hover:text-blue-200 transition-colors"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </button>
            <a
              href="#contact"
              className="text-slate-300 hover:text-white transition-colors"
            >
              Contact
            </a>
          </nav>
        </header>

        {/* Editorial Hero Section */}
        <section id="top" className="pt-20 pb-16 sm:pt-32 sm:pb-28">
          {/* Subtle typography status line */}
          <div className="text-xs text-slate-400 mb-6 flex flex-wrap items-center gap-x-2.5 gap-y-1 font-medium">
            <span className="text-blue-400 font-semibold tracking-wide">
              Fall 26/27 Available
            </span>
            <span className="text-slate-600">—</span>
            <span>Software Engineer based in Raipur, India</span>
          </div>

          {/* Headline with subtle depth shadow */}
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-white leading-[1.14] sm:leading-[1.08] max-w-3xl mb-6 sm:mb-8 subtle-title-shadow">
            Building resilient systems, low-level runtimes, and local-first AI.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-slate-300 font-normal leading-relaxed max-w-2xl mb-10 sm:mb-12 subtle-text-shadow">
            I’m a software engineer focused on distributed protocols, WebAssembly data engines, and on-device agent execution. Passionate about software that operates with speed, architectural purity, and minimal memory overhead.
          </p>

          {/* Quick Actions (Full width on mobile, inline on desktop) */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-xs font-medium w-full sm:w-auto">
            <a
              href="#work"
              className="w-full sm:w-auto px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium shadow-[0_0_25px_rgba(37,99,235,0.35)] transition-all flex items-center justify-center space-x-1.5 text-center"
            >
              <span>View Selected Work</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>

            {/* Email copy button with rich backdrop blur & solid frosted base */}
            <button
              onClick={handleCopyEmail}
              className="w-full sm:w-auto px-4 py-3 rounded-lg bg-[#07132e]/90 hover:bg-[#0c204e] text-slate-100 hover:text-white border border-white/[0.15] backdrop-blur-md transform-gpu shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all flex items-center justify-center space-x-2.5 font-medium max-w-full overflow-hidden text-center"
            >
              <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span className="truncate">{PORTFOLIO_DATA.email}</span>
              {copiedEmail ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              )}
            </button>
          </div>
        </section>

        {/* Selected Work (Classy Editorial Index — No boxed cards) */}
        <section id="work" className="py-16 sm:py-20 border-t border-white/[0.08]">
          <div className="flex items-baseline justify-between mb-10 sm:mb-16">
            <div>
              <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold block mb-1">
                Index
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight subtle-title-shadow">
                Selected Engineering Work
              </h2>
            </div>
            <span className="text-xs text-slate-500 font-medium hidden sm:inline">
              4 Flagship Systems
            </span>
          </div>

          {/* Top 4 Equal Flagship Projects */}
          <div className="divide-y divide-white/[0.08]">
            {flagshipProjects.map((project, idx) => (
              <article
                key={project.id}
                className="py-10 sm:py-12 first:pt-0 last:pb-0 group transition-colors duration-200"
              >
                {/* Meta row */}
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 mb-3 sm:mb-4 gap-2 font-medium">
                  <div className="flex items-center space-x-2.5 sm:space-x-3">
                    <span className="text-blue-400 font-bold text-sm">
                      0{idx + 1}
                    </span>
                    <span>/</span>
                    <span className="text-slate-300 font-semibold">
                      {project.domain}
                    </span>
                    {project.date && (
                      <>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <span className="hidden sm:inline">{project.date}</span>
                      </>
                    )}
                  </div>

                  {project.highlightMetric && (
                    <span className="text-blue-300 font-medium text-xs">
                      {project.highlightMetric}
                    </span>
                  )}
                </div>

                {/* Title & Action Link */}
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2.5 sm:gap-4 mb-4">
                  <h3 className="text-xl sm:text-3xl font-semibold text-white tracking-tight group-hover:text-blue-300 transition-colors subtle-title-shadow">
                    {project.name}
                  </h3>

                  <div className="flex flex-wrap items-center gap-3 shrink-0 pt-1 sm:pt-0">
                    {project.links.map((link, lIdx) => (
                      <a
                        key={lIdx}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-medium text-blue-400 hover:text-white transition-colors"
                      >
                        <span>{link.label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ))}
                  </div>
                </div>

                {/* Engineering Breakdown */}
                <div className="space-y-2 mb-5 sm:mb-6 text-slate-300 text-sm sm:text-base leading-relaxed max-w-3xl subtle-text-shadow">
                  {project.points.map((pt, pIdx) => (
                    <p key={pIdx}>• {pt}</p>
                  ))}
                </div>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-2.5 py-0.5 rounded-md bg-white/[0.04] text-slate-300 border border-white/[0.08]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>

          {/* Additional Systems (Clean Minimal Table — No cards) */}
          <div className="mt-16 sm:mt-20 pt-12 sm:pt-16 border-t border-white/[0.08]">
            <h3 className="text-xs text-slate-400 uppercase tracking-widest font-semibold mb-6 sm:mb-8">
              Additional Modules & Repositories
            </h3>

            <div className="divide-y divide-white/[0.06]">
              {secondaryProjects.map((p) => (
                <div
                  key={p.id}
                  className="py-4 sm:py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3 group"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline space-x-2">
                      <h4 className="text-sm sm:text-base font-medium text-white group-hover:text-blue-300 transition-colors truncate">
                        {p.name}
                      </h4>
                      {p.domain && (
                        <span className="text-[11px] text-slate-500 font-medium hidden md:inline shrink-0">
                          [{p.domain}]
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2 sm:line-clamp-1 max-w-2xl subtle-text-shadow">
                      {p.points[0]}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end space-x-3 shrink-0 pt-1 sm:pt-0">
                    <div className="flex items-center space-x-1.5 overflow-hidden">
                      {p.tags.slice(0, 2).map((t) => (
                        <span
                          key={t}
                          className="text-[10px] sm:text-[11px] font-medium text-slate-400 px-2 py-0.5 rounded bg-white/[0.03]"
                        >
                          #{t}
                        </span>
                      ))}
                    </div>

                    {p.links.length > 0 && (
                      <a
                        href={p.links[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center space-x-1 text-xs font-medium text-blue-400 hover:text-white transition-colors shrink-0"
                      >
                        <span>{p.links[0].label}</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Engineering Disciplines (Clean Editorial Grid — No cards) */}
        <section id="disciplines" className="py-16 sm:py-20 border-t border-white/[0.08]">
          <div className="mb-10 sm:mb-14">
            <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold block mb-1">
              Capabilities
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight subtle-title-shadow">
              Engineering Disciplines
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14">
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white subtle-title-shadow">
                Systems & Low-Level Runtimes
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed subtle-text-shadow">
                Writing native, memory-efficient code with C++ and Go. Compiling engines to WebAssembly (WASM) and bridging Go runtimes into Android via gomobile and Kotlin.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["C++", "Go", "WebAssembly (WASM)", "Python", "TypeScript", "Concurrency"].map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium text-slate-400"
                  >
                    • {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white subtle-title-shadow">
                Distributed Networks & Protocols
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed subtle-text-shadow">
                Designing zero-infrastructure peer-to-peer transport over UDP broadcast and TCP streaming. Real-time bi-directional messaging with WebSockets and cryptographic signing schemas.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["UDP Broadcast", "TCP Streaming", "P2P Protocols", "WebSockets", "Cryptographic Signatures"].map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium text-slate-400"
                  >
                    • {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white subtle-title-shadow">
                Data Engines & In-Memory Compute
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed subtle-text-shadow">
                Executing client-side vectorized queries using DuckDB and Pyodide inside the browser. Designing local-first persistence models with Drift and SQLite.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["DuckDB", "Pyodide WASM", "High-Performance Computing", "SQLite / Drift", "Data Structures"].map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium text-slate-400"
                  >
                    • {s}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-white subtle-title-shadow">
                Client Platforms & Interfaces
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed subtle-text-shadow">
                From keyboard-driven Terminal User Interfaces (TUI in Bubbletea) consuming &lt;3% CPU to reactive web applications in React, Next.js, and Three.js / WebGL.
              </p>
              <div className="flex flex-wrap gap-2 pt-1">
                {["Bubbletea (Go TUI)", "React.js", "Next.js", "React Native", "Tailwind CSS", "Three.js"].map((s) => (
                  <span
                    key={s}
                    className="text-xs font-medium text-slate-400"
                  >
                    • {s}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Timeline (Clean Hairlines — No cards) */}
        <section id="experience" className="py-16 sm:py-20 border-t border-white/[0.08]">
          <div className="mb-10 sm:mb-14">
            <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold block mb-1">
              Career
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight subtle-title-shadow">
              Industry Experience
            </h2>
          </div>

          <div className="space-y-10 sm:space-y-12">
            {PORTFOLIO_DATA.experience.map((exp, idx) => (
              <div
                key={idx}
                className="pb-8 sm:pb-10 border-b border-white/[0.08] last:border-b-0 space-y-3 sm:space-y-4"
              >
                <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                  <h3 className="text-lg sm:text-xl font-semibold text-white subtle-title-shadow">
                    {exp.role} <span className="text-slate-400 font-normal">at</span> {exp.company}
                  </h3>
                  <span className="text-xs text-slate-400 font-medium">
                    {exp.date}
                  </span>
                </div>

                <div className="space-y-2 text-sm text-slate-300 leading-relaxed max-w-3xl subtle-text-shadow">
                  {exp.points.map((pt, pIdx) => (
                    <p key={pIdx}>• {pt}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Research & Education (Editorial 2-Column — No cards) */}
        <section id="research" className="py-16 sm:py-20 border-t border-white/[0.08]">
          <div className="mb-10 sm:mb-14">
            <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold block mb-1">
              Academia
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-white tracking-tight subtle-title-shadow">
              Research & Academic Honors
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-14">
            {/* Peer-Reviewed Publications */}
            <div className="space-y-4">
              <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold block">
                PEER-REVIEWED RESEARCH
              </span>
              <h3 className="text-xl font-semibold text-white subtle-title-shadow">
                Published in IJRSI Journal
              </h3>
              <p className="text-sm text-slate-300 leading-relaxed subtle-text-shadow">
                Authored and published 2 peer-reviewed research papers in the *International Journal of Research and Scientific Innovation (IJRSI)*, focusing on architectural analysis and problem validation.
              </p>
              <div className="pt-2">
                <a
                  href={PORTFOLIO_DATA.scholar}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-1.5 text-xs font-medium text-blue-300 hover:text-white transition-colors"
                >
                  <span>View Google Scholar Profile</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* University & National Competitive Exam Ranks (Clean, no percentiles) */}
            <div className="space-y-6">
              <div>
                <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold block mb-1">
                  DEGREE
                </span>
                <h4 className="text-xl font-semibold text-white subtle-title-shadow">
                  IIIT Naya Raipur
                </h4>
                <p className="text-sm text-slate-300 mt-1 subtle-text-shadow">
                  B.Tech in Computer Science & Engineering (Expected 2027) • CGPA 7.9
                </p>
              </div>

              <div className="pt-4 border-t border-white/[0.06]">
                <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold block mb-3">
                  COMPETITIVE EXAMINATIONS
                </span>
                <div className="space-y-2.5 text-sm text-slate-300">
                  <div className="flex items-center justify-between">
                    <span>JEE Advance</span>
                    <span className="text-white font-semibold">AIR 11,802</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>JEE Mains</span>
                    <span className="text-white font-semibold">AIR 24,545</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 sm:py-24 border-t border-white/[0.08]">
          <div className="max-w-2xl">
            <span className="text-xs text-blue-400 uppercase tracking-widest font-semibold block mb-2">
              Get in Touch
            </span>
            <h2 className="text-3xl sm:text-5xl font-semibold text-white tracking-tight mb-6 subtle-title-shadow">
              Let’s build something enduring.
            </h2>
            <p className="text-base text-slate-300 leading-relaxed mb-8 subtle-text-shadow">
              Whether you’re working on high-throughput systems, distributed protocols, or cutting-edge client platforms, I’m always open to discussing compelling technical problems.
            </p>

            {/* Email copy bar (full width on mobile, inline on desktop) */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-10 w-full sm:w-auto">
              <a
                href={`mailto:${PORTFOLIO_DATA.email}?subject=Hello%20Abhiram`}
                className="w-full sm:w-auto px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-[0_0_30px_rgba(37,99,235,0.4)] text-center justify-center flex items-center"
              >
                Send Email
              </a>

              {/* Email copy button with rich backdrop blur & solid frosted base */}
              <button
                onClick={handleCopyEmail}
                className="w-full sm:w-auto px-5 py-3 rounded-lg bg-[#07132e]/90 hover:bg-[#0c204e] text-slate-100 hover:text-white border border-white/[0.15] backdrop-blur-md transform-gpu shadow-[0_4px_24px_rgba(0,0,0,0.5)] transition-all flex items-center justify-center space-x-2.5 text-sm font-medium max-w-full overflow-hidden text-center"
              >
                <span className="truncate">{PORTFOLIO_DATA.email}</span>
                {copiedEmail ? (
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-400 shrink-0" />
                )}
              </button>
            </div>

            {/* Direct Channel Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm text-slate-400 font-medium pt-8 border-t border-white/[0.06]">
              <a
                href={PORTFOLIO_DATA.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center space-x-1.5"
              >
                <GithubIcon className="w-4 h-4" />
                <span>GitHub</span>
              </a>

              <a
                href={PORTFOLIO_DATA.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center space-x-1.5"
              >
                <LinkedinIcon className="w-4 h-4" />
                <span>LinkedIn</span>
              </a>

              <a
                href={PORTFOLIO_DATA.scholar}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors flex items-center space-x-1.5"
              >
                <BookOpen className="w-4 h-4" />
                <span>Google Scholar</span>
              </a>

              <button
                onClick={() => setIsResumeOpen(true)}
                className="hover:text-white transition-colors flex items-center space-x-1.5"
              >
                <FileText className="w-4 h-4" />
                <span>Resume</span>
              </button>
            </div>
          </div>
        </section>

        {/* Minimal Footer with mobile safe area clearance */}
        <footer
          className="pt-8 pb-12 sm:pb-8 border-t border-white/[0.06] text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-4 font-medium"
          style={{ paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom, 2.5rem))' }}
        >
          <div>
            © {new Date().getFullYear()} {PORTFOLIO_DATA.name}
          </div>
          <div>
            {PORTFOLIO_DATA.location}
          </div>
        </footer>
      </div>

      {/* Resume Dossier Modal */}
      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
      />
    </div>
  );
}
