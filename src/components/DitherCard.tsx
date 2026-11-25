import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";

// Classic 8x8 Bayer ordered dithering threshold matrix (0..63)
const BAYER_8X8 = new Uint8Array([
  0, 48, 12, 60, 3, 51, 15, 63,
  32, 16, 44, 28, 35, 19, 47, 31,
  8, 56, 4, 52, 11, 59, 7, 55,
  40, 24, 36, 20, 43, 27, 39, 23,
  2, 50, 14, 62, 1, 49, 13, 61,
  34, 18, 46, 30, 33, 17, 45, 29,
  10, 58, 6, 54, 9, 57, 5, 53,
  42, 26, 38, 22, 41, 25, 37, 21,
]);

function parseHexRgb(hex: string): [number, number, number] {
  const clean = hex.replace("#", "");
  const full =
    clean.length === 3
      ? clean
          .split("")
          .map((c) => c + c)
          .join("")
      : clean;
  const n = parseInt(full, 16);
  if (Number.isNaN(n)) return [56, 189, 248];
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

interface DitherCardProps {
  children: ReactNode;
  accentColor?: string;
  className?: string;
  id?: string;
  dataAccentColor?: string;
  isDominant?: boolean;
  ambientDither?: boolean;
  cellSize?: number;
}

export default function DitherCard({
  children,
  accentColor = "#38bdf8",
  className = "",
  id,
  dataAccentColor,
  isDominant = false,
  ambientDither = false,
  cellSize = 4,
}: DitherCardProps) {
  const cardRef = useRef<HTMLDivElement>(null!);
  const canvasRef = useRef<HTMLCanvasElement>(null!);
  const borderRef = useRef<HTMLDivElement>(null!);
  const [hovered, setHovered] = useState(false);

  // Store dynamic flags in refs so changing scroll dominance never reallocates ImageData
  const isDominantRef = useRef(isDominant);
  const isVisibleRef = useRef(true);

  const stateRef = useRef({
    mx: 0.78,
    my: 0.25,
    targetMx: 0.78,
    targetMy: 0.25,
    hoverAlpha: 0,
    targetHover: 0,
    pulseX: 0.5,
    pulseY: 0.5,
    pulseAge: 99,
  });

  useEffect(() => {
    isDominantRef.current = isDominant;
    if (isDominant) {
      cardRef.current?.dispatchEvent(new Event("dither-wake"));
    }
  }, [isDominant]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const card = cardRef.current;
    if (!canvas || !card) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    const [r, g, b] = parseHexRgb(accentColor);
    // Crisp luminous step (25% lift) for vivid, readable Bayer stair-stepping
    const hiR = Math.round(r * 0.75 + 255 * 0.25);
    const hiG = Math.round(g * 0.75 + 255 * 0.25);
    const hiB = Math.round(b * 0.75 + 255 * 0.25);

    let cols = 1;
    let rows = 1;
    let imgData: ImageData | null = null;
    let rafId = 0;
    let time = 0;

    const resize = () => {
      const rect = card.getBoundingClientRect();
      cols = Math.max(8, Math.ceil(rect.width / cellSize));
      rows = Math.max(8, Math.ceil(rect.height / cellSize));
      canvas.width = cols;
      canvas.height = rows;
      imgData = ctx.createImageData(cols, rows);
    };

    const renderFrame = (dt: number) => {
      if (!imgData) return false;
      time += dt;

      const s = stateRef.current;
      s.mx += (s.targetMx - s.mx) * Math.min(1, dt * 10);
      s.my += (s.targetMy - s.my) * Math.min(1, dt * 10);
      s.hoverAlpha += (s.targetHover - s.hoverAlpha) * Math.min(1, dt * 7);
      s.pulseAge += dt;

      const dominant = isDominantRef.current;
      const data = imgData.data;
      const px = s.mx * cols;
      const py = s.my * rows;
      const pulseCx = s.pulseX * cols;
      const pulseCy = s.pulseY * rows;
      const pulseActive = s.pulseAge < 1.35;
      const pulseRadius = s.pulseAge * Math.max(cols, rows) * 1.15;

      const baseBoost = dominant ? 0.52 : ambientDither ? 0.36 : 0.0;
      const spotStrength = s.hoverAlpha * 0.68;
      const spotRadius = Math.max(20, cols * 0.22);

      for (let y = 0; y < rows; y++) {
        const yNorm = y / rows;
        const bayerRow = (y & 7) << 3;
        const dySpot = y - py;
        const dyPulse = y - pulseCy;

        for (let x = 0; x < cols; x++) {
          const xNorm = x / cols;

          let energy = 0;
          if (baseBoost > 0) {
            const cornerBias = xNorm * 0.74 + (1 - yNorm) * 0.34;
            const wave =
              0.42 +
              0.58 *
                (0.5 +
                  0.5 *
                    Math.sin(x * 0.09 + y * 0.06 - time * 1.1) *
                    Math.cos(x * 0.05 - y * 0.08 + time * 0.7));
            energy += Math.pow(cornerBias, 1.55) * wave * baseBoost;
          }

          if (spotStrength > 0.005) {
            const dx = x - px;
            const dist = Math.sqrt(dx * dx + dySpot * dySpot);
            if (dist < spotRadius * 1.55) {
              const norm = dist / spotRadius;
              const ring = Math.exp(-Math.pow((norm - 0.6) / 0.34, 2));
              const centerCore = Math.exp(-(norm * norm) * 2.4) * 0.16;
              energy += (ring + centerCore) * spotStrength;
            }
          }

          if (pulseActive) {
            const dxP = x - pulseCx;
            const dist = Math.sqrt(dxP * dxP + dyPulse * dyPulse);
            const band = Math.abs(dist - pulseRadius);
            if (band < 12) {
              const fade = Math.max(0, 1 - s.pulseAge / 1.35);
              energy += (1 - band / 12) * fade * 0.68;
            }
          }

          if (energy > 0.76) energy = 0.76;

          const idx = (y * cols + x) * 4;
          if (energy <= 0.025) {
            data[idx + 3] = 0;
            continue;
          }

          const threshold = (BAYER_8X8[bayerRow + (x & 7)] + 0.5) / 64;
          if (energy > threshold) {
            const isPeak = energy > threshold + 0.24;
            data[idx] = isPeak ? hiR : r;
            data[idx + 1] = isPeak ? hiG : g;
            data[idx + 2] = isPeak ? hiB : b;
            data[idx + 3] = isPeak ? 148 : 94;
          } else {
            data[idx + 3] = 0;
          }
        }
      }

      ctx.putImageData(imgData, 0, 0);

      // Pause completely when off-screen, reduced-motion, or idle coarse touchscreen
      if (prefersReduced || !isVisibleRef.current) return false;
      if (isCoarsePointer && !pulseActive) return false;

      return (
        dominant ||
        ambientDither ||
        s.targetHover > 0 ||
        s.hoverAlpha > 0.01 ||
        pulseActive
      );
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (!rafId && isVisibleRef.current) {
        renderFrame(0);
      }
    });
    ro.observe(card);

    let last = performance.now();
    const loop = (now: number) => {
      const s = stateRef.current;
      const isInteractive =
        s.targetHover > 0 || s.hoverAlpha > 0.01 || s.pulseAge < 1.35;
      // Run 60fps during active hover/pulse, throttle slow ambient wave to ~22fps
      const minInterval = isInteractive ? 15 : 44;
      const elapsedMs = now - last;

      if (elapsedMs < minInterval) {
        if (isVisibleRef.current) {
          rafId = window.requestAnimationFrame(loop);
        } else {
          rafId = 0;
        }
        return;
      }

      const dt = Math.min(0.08, elapsedMs / 1000);
      last = now;
      const keepGoing = renderFrame(dt);
      if (keepGoing) {
        rafId = window.requestAnimationFrame(loop);
      } else {
        rafId = 0;
      }
    };

    const startLoop = () => {
      if (!rafId && isVisibleRef.current && !prefersReduced) {
        last = performance.now();
        rafId = window.requestAnimationFrame(loop);
      }
    };

    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry) return;
        isVisibleRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          if (renderFrame(0.016)) {
            startLoop();
          }
        } else if (rafId) {
          window.cancelAnimationFrame(rafId);
          rafId = 0;
        }
      },
      { rootMargin: "120px 0px" }
    );
    io.observe(card);

    const onWake = () => startLoop();
    card.addEventListener("dither-wake", onWake);

    return () => {
      if (rafId) window.cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      card.removeEventListener("dither-wake", onWake);
    };
  }, [accentColor, ambientDither, cellSize]);

  const updateBorder = (nx: number, ny: number, visible: boolean) => {
    if (!borderRef.current) return;
    const [r, g, b] = parseHexRgb(accentColor);
    borderRef.current.style.opacity = visible ? "1" : isDominant ? "0.45" : "0";
    borderRef.current.style.background = `radial-gradient(380px circle at ${(nx * 100).toFixed(1)}% ${(ny * 100).toFixed(1)}%, rgba(${r}, ${g}, ${b}, 0.55), transparent 68%)`;
  };

  const wake = () => {
    cardRef.current?.dispatchEvent(new Event("dither-wake"));
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch") return;
    setHovered(true);
    stateRef.current.targetHover = 1;
    wake();
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType === "touch" || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const nx = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const ny = Math.max(0, Math.min(1, (e.clientY - rect.top) / rect.height));

    stateRef.current.targetMx = nx;
    stateRef.current.targetMy = ny;
    stateRef.current.targetHover = 1;
    updateBorder(nx, ny, true);
    wake();
  };

  const handlePointerLeave = () => {
    setHovered(false);
    stateRef.current.targetHover = 0;
    updateBorder(0.75, 0.25, false);
    wake();
  };

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    stateRef.current.pulseX = Math.max(
      0,
      Math.min(1, (e.clientX - rect.left) / rect.width)
    );
    stateRef.current.pulseY = Math.max(
      0,
      Math.min(1, (e.clientY - rect.top) / rect.height)
    );
    stateRef.current.pulseAge = 0;
    wake();
  };

  return (
    <div
      ref={cardRef}
      id={id}
      data-accent-color={dataAccentColor}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
      className={`relative rounded-2xl bg-[#070c18]/92 md:bg-[#070c18]/86 md:backdrop-blur-sm border transition-colors duration-300 overflow-hidden shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06),0_18px_50px_rgba(0,0,0,0.45)] ${
        isDominant || hovered
          ? "border-white/[0.18]"
          : "border-white/[0.08]"
      } ${className}`}
    >
      {/* Crisp pixelated 8x8 Bayer ordered dither overlay */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{ imageRendering: "pixelated" }}
        className="pointer-events-none absolute inset-0 w-full h-full"
      />

      {/* Directional readability scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(6, 10, 20, 0.72) 0%, rgba(6, 10, 20, 0.44) 55%, rgba(6, 10, 20, 0.06) 100%)",
        }}
      />

      {/* Thin cursor-tracked border highlight */}
      <div
        ref={borderRef}
        aria-hidden="true"
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "1px",
        }}
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300"
      />

      <div
        className="relative z-10"
        style={{ textShadow: "0 1px 8px rgba(4, 6, 12, 0.78)" }}
      >
        {children}
      </div>
    </div>
  );
}
