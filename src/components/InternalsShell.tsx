import type { ReactNode } from "react";

/** Hex accent -> rgba() string, used to tint the internals UI per project. */
export function accentRgba(hex: string, alpha: number) {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return `rgba(56, 189, 248, ${alpha})`;
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

interface ConsolePanelProps {
  label: string;
  accent: string;
  children: ReactNode;
}

/** Quiet framed container that echoes the outer card without extra chrome. */
export function ConsolePanel({ label, accent, children }: ConsolePanelProps) {
  return (
    <section className="animate-internals-in relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#060b16]/75 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_18px_44px_-28px_rgba(0,0,0,0.95)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-dot-matrix opacity-40"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(560px circle at 92% -12%, ${accentRgba(accent, 0.13)}, transparent 62%)`,
        }}
      />
      <header className="relative border-b border-white/[0.07] px-4 py-3 sm:px-5">
        <span className="text-sm font-semibold text-slate-200">{label}</span>
      </header>
      <div className="relative p-4 sm:p-5">{children}</div>
    </section>
  );
}

interface SchematicFrameProps {
  accent: string;
  children: ReactNode;
}

/** Minimal viewport for an architecture SVG: texture and depth, no labels. */
export function SchematicFrame({ accent, children }: SchematicFrameProps) {
  return (
    <div className="animate-internals-in relative overflow-hidden rounded-xl border border-white/[0.09] bg-[#040710]/85 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.04),0_16px_36px_-24px_rgba(0,0,0,0.95)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-cyber-grid opacity-50"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(460px circle at 88% -8%, ${accentRgba(accent, 0.16)}, transparent 62%)`,
        }}
      />
      <div className="relative p-3 sm:p-4">{children}</div>
    </div>
  );
}
