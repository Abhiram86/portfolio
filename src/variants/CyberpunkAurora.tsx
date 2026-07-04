import { useRef, useMemo, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";
import { PORTFOLIO_DATA } from "../data";

/* ─── Aurora Sky ─── */
const skyVert = `varying vec2 vUv; void main() { vUv = uv; gl_Position = vec4(position, 1.0); }`;

const skyFrag = `
precision highp float;
uniform float uTime;
varying vec2 vUv;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.54531);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*noise(p);p*=2.03;a*=.5;}return v;}
void main(){
  vec2 uv=vUv; float t=uTime*.18;
  vec3 col=vec3(.018,0.,.04);
  col+=vec3(0.,.83,.67)*fbm(vec2(uv.x*2.+t*.45,uv.y*1.5-t*.75))*.7;
  col+=vec3(.75,.52,.99)*fbm(vec2(uv.x*3.-t*.3,uv.y*2.+t*.45))*.55;
  col+=vec3(.96,.45,.71)*fbm(vec2(uv.x*1.5+t*.75,uv.y*2.5-t*.25))*.45;
  col+=vec3(.22,.82,1.)*fbm(vec2(uv.x+t*.6,uv.y-t*.45))*.35;
  float s=noise(uv*55.+t)*noise(uv*88.-t*.1);
  col+=vec3(.8,.9,1.)*smoothstep(.94,.997,s)*.55;
  col*=1.-smoothstep(.35,.75,length(uv-.5))*.45;
  gl_FragColor=vec4(col,1.);
}`;

/* ─── Cyber Grid ─── */
const gridVert = `varying vec2 vUv; void main() { vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`;
const gridFrag = `
precision highp float;
uniform float uTime;
varying vec2 vUv;
float grid(vec2 p,float l){vec2 g=abs(fract(p*l-.5)-.5)/fwidth(p*l);return 1.-min(min(g.x,g.y),1.);}
void main(){
  vec2 uv=vUv; uv.y+=uTime*.18;
  float g=grid(uv,35.)*.35, g2=grid(uv,8.)*.12;
  float vig=1.-smoothstep(.2,.75,length(vUv-.5))*.7;
  vec3 col=vec3(.02,0.,.05);
  col+=vec3(0.,.83,.67)*g*.55; col+=vec3(.22,.82,1.)*g2*.4;
  col*=vig;
  gl_FragColor=vec4(col,.92);
}`;

/* ─── 3D Components ─── */
function AuroraSky() {
  const ref = useRef<THREE.ShaderMaterial>(null!);
  useFrame((s) => {
    if (ref.current) ref.current.uniforms.uTime.value = s.clock.elapsedTime;
  });
  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={ref}
        vertexShader={skyVert}
        fragmentShader={skyFrag}
        uniforms={{ uTime: { value: 0 } }}
      />
    </mesh>
  );
}

function CyberGrid() {
  const ref = useRef<THREE.ShaderMaterial>(null!);
  useFrame((s) => {
    if (ref.current) ref.current.uniforms.uTime.value = s.clock.elapsedTime;
  });
  return (
    <mesh rotation={[-Math.PI / 2.5, 0, 0]} position={[0, -2.5, 0]}>
      <planeGeometry args={[20, 20]} />
      <shaderMaterial
        ref={ref}
        vertexShader={gridVert}
        fragmentShader={gridFrag}
        uniforms={{ uTime: { value: 0 } }}
        transparent
      />
    </mesh>
  );
}

function FloatingAuroraCubes() {
  const g = useRef<THREE.Group>(null!);
  useFrame((s) => {
    if (g.current) g.current.rotation.y = s.clock.elapsedTime * 0.04;
  });
  const cubes = useMemo(
    () =>
      Array.from({ length: 15 }).map((_, i) => ({
        pos: [
          (Math.random() - 0.5) * 14,
          (Math.random() - 0.5) * 7,
          (Math.random() - 0.5) * 9 - 4,
        ] as [number, number, number],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [
          number,
          number,
          number,
        ],
        s: 0.12 + Math.random() * 0.35,
        c: ["#00d4aa", "#c084fc", "#f472b6", "#38bdf8", "#a855f7"][i % 5],
      })),
    [],
  );
  return (
    <group ref={g}>
      {cubes.map((c, i) => (
        <Float key={i} speed={2} rotationIntensity={0.5} floatIntensity={1}>
          <mesh position={c.pos} rotation={c.rot} scale={c.s}>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial
              color={c.c}
              wireframe
              transparent
              opacity={0.25}
            />
          </mesh>
        </Float>
      ))}
    </group>
  );
}

function AuroraParticles() {
  const N = 300;
  const mesh = useRef<THREE.InstancedMesh>(null!);
  const pos = useMemo(() => {
    const p = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = Math.random() * 14 - 5;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10 - 5;
    }
    return p;
  }, []);
  const spd = useMemo(() => {
    const s = new Float32Array(N);
    for (let i = 0; i < N; i++) s[i] = 0.5 + Math.random() * 1.5;
    return s;
  }, []);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  useFrame((s) => {
    if (!mesh.current) return;
    const t = s.clock.elapsedTime;
    for (let i = 0; i < N; i++) {
      const y = ((pos[i * 3 + 1] - t * spd[i] * 0.25) % 14) - 5;
      dummy.position.set(pos[i * 3], y, pos[i * 3 + 2]);
      dummy.scale.setScalar(0.02 + Math.random() * 0.03);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, N]}>
      <sphereGeometry args={[1, 4, 4]} />
      <meshBasicMaterial color="#00d4aa" transparent opacity={0.55} />
    </instancedMesh>
  );
}

/* ─── UI ─── */
function GlitchText({
  text,
  className = "",
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`relative block ${className}`}>
      <span
        className="relative z-10"
        style={{ textShadow: "0 0 12px rgba(255,255,255,0.25)" }}
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 -ml-0.5 text-cyan-400 opacity-70 animate-pulse"
        style={{
          clipPath: "inset(0 0 50% 0)",
          textShadow: "0 0 8px rgba(56,189,248,0.5)",
        }}
      >
        {text}
      </span>
      <span
        className="absolute top-0 left-0 ml-0.5 text-fuchsia-400 opacity-70 animate-pulse"
        style={{
          clipPath: "inset(50% 0 0 0)",
          animationDelay: "0.1s",
          textShadow: "0 0 8px rgba(244,114,182,0.5)",
        }}
      >
        {text}
      </span>
    </div>
  );
}

function SectionTitle({
  children,
  color = "#00d4aa",
}: {
  children: ReactNode;
  color?: string;
}) {
  return (
    <h2
      className="text-2xl font-black uppercase tracking-widest mb-6 font-mono"
      style={{ color, textShadow: `0 0 10px ${color}66` }}
    >
      &gt; {children}
    </h2>
  );
}

const card =
  "bg-[#0a0015]/65 backdrop-blur-md border border-white/[0.08] p-6 shadow-[0_0_30px_rgba(0,212,170,0.06),inset_0_1px_0_0_rgba(255,255,255,0.06)] hover:border-white/[0.15] hover:bg-[#0a0015]/80 hover:shadow-[0_0_45px_rgba(0,212,170,0.1),inset_0_1px_0_0_rgba(255,255,255,0.1)] transition-all duration-500 rounded-lg";
const tag =
  "text-[10px] font-mono border border-white/20 text-white/85 px-2 py-0.5 uppercase tracking-wider bg-black/40 hover:bg-white/10 transition-colors";

export default function CyberpunkAurora() {
  const [showResume, setShowResume] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <div className="relative min-h-screen bg-[#050011] text-white/90 font-mono overflow-x-hidden selection:bg-fuchsia-500 selection:text-white">
      {/* 3D */}{" "}
      <div className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 6], fov: 65 }}>
          <AuroraSky />
          <CyberGrid />
          <FloatingAuroraCubes />
          <AuroraParticles />
        </Canvas>
      </div>
      {/* Scanlines */}{" "}
      <div
        className="fixed inset-0 z-[5] pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.15) 2px,rgba(0,0,0,0.15) 4px)",
          opacity: 0.22,
        }}
      />
      {/* Chromatic edge */}{" "}
      <div
        className="fixed inset-0 z-[6] pointer-events-none mix-blend-screen opacity-[0.03]"
        style={{
          boxShadow:
            "inset 0 0 200px rgba(0,212,170,0.3), inset 0 0 100px rgba(196,132,252,0.2)",
        }}
      />
      {/* Content */}{" "}
      <div className="relative z-10 min-h-screen flex flex-col">
        <header
          className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? "bg-[#050011]/80 backdrop-blur-xl border-b border-white/10" : ""}`}
        >
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div
              className="text-cyan-400 font-bold text-lg tracking-widest"
              style={{ textShadow: "0 0 10px rgba(56,189,248,0.4)" }}
            >
              &lt;/&gt; {PORTFOLIO_DATA.name.split(" ")[0]}
            </div>
            {/*<div className="text-xs text-white/30 font-mono">v3.0.0 // AURORA_PROTOCOL</div>*/}
          </div>
        </header>

        <div className="flex-1 max-w-7xl mx-auto px-6 py-20 w-full">
          {/* Hero */}{" "}
          <section className="mb-28">
            <div
              className="flex items-center gap-2 text-fuchsia-400/80 text-sm mb-4 font-mono"
              style={{ textShadow: "0 0 6px rgba(244,114,182,0.35)" }}
            >
              <span className="animate-pulse">●</span> user@aurora:~$ init
              --profile --neon
            </div>
            <GlitchText
              text={PORTFOLIO_DATA.name}
              className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-white mb-5"
            />
            <div
              className="text-lg md:text-2xl font-bold uppercase tracking-[0.25em] mb-8"
              style={{
                color: "#00d4aa",
                textShadow:
                  "0 0 18px rgba(0,212,170,0.55), 0 4px 12px rgba(0,0,0,0.7)",
              }}
            >
              {PORTFOLIO_DATA.title}
            </div>
            <div className="flex flex-wrap gap-3 text-sm">
              <span className={tag}>{PORTFOLIO_DATA.location}</span>
              <span className={tag}>{PORTFOLIO_DATA.phone}</span>
              <span className={`${tag} break-all`}>{PORTFOLIO_DATA.email}</span>
            </div>
          </section>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 text-white/90">
            <div className={`${card} lg:col-span-2`}>
              <SectionTitle color="#c084fc">Experience</SectionTitle>
              <div className="space-y-8">
                {PORTFOLIO_DATA.experience.map((e, i) => (
                  <div key={i} className="group">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                        {e.company}
                      </h3>
                      <span className="text-xs text-fuchsia-300 border border-fuchsia-500/30 px-2 py-0.5 w-fit font-mono">
                        {e.date}
                      </span>
                    </div>
                    <p className="text-sm text-fuchsia-300 mb-3 uppercase tracking-wider">
                      {e.role}
                    </p>
                    <ul className="space-y-2">
                      {e.points.map((p, j) => (
                        <li
                          key={j}
                          className="text-sm text-white/70 leading-relaxed pl-4 border-l border-white/10"
                        >
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${card} flex flex-col`}>
              <SectionTitle color="#38bdf8">Connect</SectionTitle>
              <div className="flex flex-col gap-3 flex-grow justify-center">
                {[
                  { l: "GitHub", u: PORTFOLIO_DATA.github, c: "#00d4aa" },
                  { l: "LinkedIn", u: PORTFOLIO_DATA.linkedin, c: "#38bdf8" },
                  {
                    l: "Google Scholar",
                    u: PORTFOLIO_DATA.scholar,
                    c: "#f472b6",
                  },
                ].map((l) => (
                  <a
                    key={l.l}
                    href={l.u}
                    className="flex justify-between items-center group p-3 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all"
                  >
                    <span style={{ color: l.c }} className="font-medium">
                      {l.l}
                    </span>
                    <span className="text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all">
                      →
                    </span>
                  </a>
                ))}
              </div>
            </div>

<div className={`${card} lg:col-span-3`}>
  <SectionTitle color="#00d4aa">Skills Matrix</SectionTitle>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    {Object.entries(PORTFOLIO_DATA.skills).map(([k, s]) => (
      <div key={k} className="relative group">
        {/* Aurora glow line under category */}
        <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-teal-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        <h3 className="text-sm font-bold uppercase tracking-widest mb-4 font-mono relative">
          <span className="bg-gradient-to-r from-teal-300 via-purple-300 to-pink-300 bg-clip-text text-transparent">
            [{k.replace("_", " ")}]
          </span>
        </h3>

        <div className="flex flex-wrap gap-2">
          {s.map((sk) => (
            <span
              key={sk}
              className="group/skill relative text-[11px] font-mono border border-white/15 text-white/80 px-2.5 py-1 uppercase tracking-wider bg-black/30 hover:bg-white/10 transition-all duration-300 cursor-default"
            >
              {/* Aurora shimmer on hover */}
              <span className="absolute inset-0 rounded-sm opacity-0 group-hover/skill:opacity-100 transition-opacity duration-300"
                style={{
                  background: "linear-gradient(135deg, rgba(0,212,170,0.15), rgba(196,132,252,0.15), rgba(244,114,182,0.15))",
                  boxShadow: "inset 0 0 12px rgba(0,212,170,0.2)"
                }}
              />
              <span className="relative z-10 group-hover/skill:text-white transition-colors duration-300"
                style={{
                  textShadow: "0 0 8px rgba(0,212,170,0.4)"
                }}
              >
                {sk}
              </span>
            </span>
          ))}
        </div>
      </div>
    ))}
  </div>
</div>

            <div className={`${card} lg:col-span-2`}>
              <SectionTitle color="#f472b6">System Architecture</SectionTitle>
              <div className="grid md:grid-cols-2 gap-4">
                {PORTFOLIO_DATA.projects.map((p, i) => (
                  <div
                    key={i}
                    className="group border border-white/5 bg-white/[.03] p-4 hover:border-fuchsia-500/30 hover:bg-white/[.06] transition-all duration-300"
                  >
                    <h3 className="text-lg font-bold text-white mb-2 group-hover:text-fuchsia-300 transition-colors">
                      {p.name}
                    </h3>
                    <p className="text-sm text-white/60 mb-3 line-clamp-2">
                      {p.points[0]}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {p.tags.map((t) => (
                        <span
                          key={t}
                          className="text-[10px] text-cyan-300/80 border border-cyan-500/20 px-2 py-0.5 uppercase"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.links.map((l, j) => (
                        <a
                          key={j}
                          href={l.url}
                          className="text-xs text-cyan-300/90 hover:text-black hover:bg-cyan-400 border border-cyan-500/30 px-2 py-0.5 transition-colors"
                        >
                          {l.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={`${card} flex flex-col`}>
              <SectionTitle color="#38bdf8">Records</SectionTitle>
              <div className="flex-grow space-y-8">
                <div>
                  <h3 className="text-fuchsia-300/80 uppercase text-xs mb-4 tracking-widest font-mono">
                    [EDUCATION]
                  </h3>
                  <div className="space-y-4">
                    {PORTFOLIO_DATA.education.map((e, i) => (
                      <div key={i} className="border-l-2 border-white/10 pl-4">
                        <h4 className="font-medium text-white text-sm">
                          {e.institution}
                        </h4>
                        <p className="text-xs text-white/50 mt-1">{e.degree}</p>
                        <p className="text-xs text-cyan-300/80 mt-1 font-mono">
                          {e.date} // {e.score}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="text-fuchsia-300/80 uppercase text-xs mb-4 tracking-widest font-mono">
                    [ACCOLADES]
                  </h3>
                  <ul className="space-y-3">
                    {PORTFOLIO_DATA.achievements.map((a, i) => (
                      <li key={i} className="text-sm text-white/60">
                        <strong className="text-white block mb-1">
                          {a.title}
                        </strong>
                        {a.desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className={`${card} lg:col-span-3`}>
              <div className="flex items-center justify-between mb-4">
                <SectionTitle color="#ffffff">Resume</SectionTitle>
                <button
                  onClick={() => setShowResume((v) => !v)}
                  className="text-xs font-mono text-cyan-400 border border-cyan-500/30 px-3 py-1.5 uppercase hover:bg-cyan-400 hover:text-black transition-colors"
                >
                  {showResume ? "Close" : "View Resume"}
                </button>
              </div>
              {showResume && (
                <div className="w-full h-[80vh] bg-white/95 rounded overflow-hidden border border-white/10">
                  <iframe
                    src="/resume.html"
                    width="100%"
                    height="100%"
                    className="border-none"
                    title="Resume"
                  />
                </div>
              )}
            </div>
          </div>
          <footer className="mt-20 pt-8 border-t border-white/10 text-center text-xs text-white/30">
            Protocol active. Aurora signature detected. //{" "}
            {new Date().getFullYear()}
          </footer>
        </div>
      </div>
    </div>
  );
}
