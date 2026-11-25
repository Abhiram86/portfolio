import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Single-pass 2D Simplex noise returning vec3(value, d/dx, d/dy)
// Eliminates 3x finite-difference vertex evaluations per vertex
const fluidVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  vec3 snoiseD(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    vec3 m2 = m * m;
    vec3 m4 = m2 * m2;

    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;

    vec3 norm = 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
    vec2 g0 = vec2(a0.x, h.x) * norm.x;
    vec2 g1 = vec2(a0.y, h.y) * norm.y;
    vec2 g2 = vec2(a0.z, h.z) * norm.z;

    vec3 d = vec3(dot(g0, x0), dot(g1, x12.xy), dot(g2, x12.zw));
    float val = 130.0 * dot(m4, d);

    vec3 dm = -8.0 * m2 * m * d;
    vec2 grad = 130.0 * (
      m4.x * g0 + dm.x * x0 +
      m4.y * g1 + dm.y * x12.xy +
      m4.z * g2 + dm.z * x12.zw
    );
    return vec3(val, grad);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;
    float t = uTime * 0.25;

    vec3 n1 = snoiseD(vec2(pos.x * 0.19 + t * 0.4, pos.y * 0.19 - t * 0.3));
    vec3 n2 = snoiseD(vec2(pos.x * 0.44 - t * 0.55, pos.y * 0.40 + t * 0.45));

    float sx = sin(pos.x * 0.55 + t * 1.1);
    float cx = cos(pos.x * 0.55 + t * 1.1);
    float cy = cos(pos.y * 0.48 + t * 0.85);
    float sy = sin(pos.y * 0.48 + t * 0.85);

    float w1 = n1.x * 0.78;
    float w2 = n2.x * 0.34;
    float w3 = sx * cy * 0.18;

    vec2 diff = pos.xy - uMouse * 4.8;
    float d = length(diff) + 0.0001;
    float phase = d * 3.6 - uTime * 3.2;
    float env = exp(-d * 0.42);
    float ripple = sin(phase) * env * 0.40;
    float dRippleDd = (3.6 * cos(phase) - 0.42 * sin(phase)) * env * 0.40;

    vec2 grad =
      n1.yz * (0.19 * 0.78) +
      vec2(n2.y * 0.44, n2.z * 0.40) * 0.34 +
      vec2(0.55 * cx * cy, -0.48 * sx * sy) * 0.18 +
      (diff / d) * dRippleDd;

    float elev = w1 + w2 + w3 + ripple;
    vNormal = normalize(vec3(-grad.x, -grad.y, 1.0));
    pos.z += elev;
    vElevation = elev;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fluidFragmentShader = `
  uniform vec3 uAccent;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  void main() {
    vec3 deepVoid = vec3(0.014, 0.018, 0.036);
    vec3 shadowTone = mix(vec3(0.025, 0.055, 0.14), uAccent * 0.24, 0.65);
    vec3 midTone = mix(vec3(0.05, 0.15, 0.36), uAccent * 0.62, 0.78);
    vec3 crestTone = mix(uAccent * 0.95, vec3(0.75, 0.92, 1.0), 0.25);

    float h = smoothstep(-0.85, 0.95, vElevation);
    vec3 col = mix(deepVoid, shadowTone, smoothstep(0.0, 0.35, h));
    col = mix(col, midTone, smoothstep(0.35, 0.72, h));
    col = mix(col, crestTone, smoothstep(0.72, 1.0, h) * 0.85);

    vec3 lightDir = normalize(vec3(uMouse.x * 2.2, uMouse.y * 2.2 + 1.2, 2.4));
    vec3 viewDir = normalize(vec3(0.0, 0.2, 1.0));
    vec3 halfDir = normalize(lightDir + viewDir);
    float spec = pow(max(dot(vNormal, halfDir), 0.0), 26.0);
    col += mix(uAccent, vec3(0.85, 0.95, 1.0), 0.55) * spec * 0.52;

    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
    col += uAccent * fresnel * 0.32;

    float dist = length(vUv - vec2(0.5));
    float vignette = 1.0 - smoothstep(0.24, 0.72, dist);
    col *= vignette;

    gl_FragColor = vec4(col, vignette * 0.92);
  }
`;

function ScrollWaveMesh({
  mouseTarget,
  scrollRef,
  accentHex,
  segments,
}: {
  mouseTarget: React.MutableRefObject<{ x: number; y: number }>;
  scrollRef: React.MutableRefObject<number>;
  accentHex: string;
  segments: [number, number];
}) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const mouseLerp = useRef({ x: 0, y: 0 });
  const targetColor = useMemo(() => new THREE.Color(accentHex), [accentHex]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uAccent: { value: new THREE.Color("#3b82f6") },
    }),
    []
  );

  useFrame((state, delta) => {
    if (!matRef.current || !meshRef.current) return;
    mouseLerp.current.x = THREE.MathUtils.lerp(
      mouseLerp.current.x,
      mouseTarget.current.x,
      delta * 2.8
    );
    mouseLerp.current.y = THREE.MathUtils.lerp(
      mouseLerp.current.y,
      mouseTarget.current.y,
      delta * 2.8
    );

    matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    matRef.current.uniforms.uMouse.value.set(
      mouseLerp.current.x,
      mouseLerp.current.y
    );
    matRef.current.uniforms.uAccent.value.lerp(targetColor, delta * 2.4);

    meshRef.current.rotation.x = -Math.PI / 2.85 + scrollRef.current * 0.22;
    meshRef.current.position.y = -1.75 + scrollRef.current * 0.45;
  });

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.85, 0, 0]}
      position={[0, -1.75, -1]}
    >
      <planeGeometry args={[18, 14, segments[0], segments[1]]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={fluidVertexShader}
        fragmentShader={fluidFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

export default function ScrollFluid3D({
  accentHex = "#3b82f6",
}: {
  accentHex?: string;
}) {
  const mouseTarget = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const [paused, setPaused] = useState(
    () => typeof document !== "undefined" && document.hidden
  );

  const isMobile =
    typeof window !== "undefined" &&
    (window.innerWidth < 768 ||
      window.matchMedia("(pointer: coarse)").matches);
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const segments: [number, number] = isMobile ? [68, 52] : [108, 82];

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseTarget.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    const onScroll = () => {
      const max = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollRef.current = window.scrollY / max;
    };
    const onVisibility = () => {
      setPaused(document.hidden);
    };

    onScroll();
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  if (prefersReduced) {
    return (
      <div
        className="fixed inset-0 z-0 pointer-events-none bg-[#04060c]"
        style={{
          backgroundImage: `radial-gradient(circle at 60% 70%, ${accentHex}22 0%, transparent 62%)`,
        }}
      />
    );
  }

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-[#04060c]">
      <Canvas
        frameloop={paused ? "never" : "always"}
        camera={{ position: [0, 0, 6.4], fov: 48 }}
        dpr={isMobile ? 1 : [1, 1.35]}
        gl={{
          antialias: false,
          powerPreference: "high-performance",
          alpha: false,
        }}
      >
        <color attach="background" args={["#04060c"]} />
        <fog attach="fog" args={["#04060c", 4.8, 9.8]} />
        <ScrollWaveMesh
          mouseTarget={mouseTarget}
          scrollRef={scrollRef}
          accentHex={accentHex}
          segments={segments}
        />
      </Canvas>
    </div>
  );
}
