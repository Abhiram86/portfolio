import { useRef, useMemo, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface FluidCanvas3DProps {
  colorTint?: string; // Optional dynamic color shift
}

// Custom GLSL shaders for organic liquid wave simulation
const fluidVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  // 2D Simplex-like noise helper
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0
                        0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)
                       -0.577350269189626,  // -1.0 + 2.0 * C.x
                        0.024390243902439); // 1.0 / 41.0
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
          + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  void main() {
    vUv = uv;
    vec3 pos = position;

    // Organic harmonic wave propagation
    float t = uTime * 0.28;
    float wave1 = snoise(vec2(pos.x * 0.18 + t * 0.4, pos.y * 0.18 - t * 0.3)) * 0.75;
    float wave2 = snoise(vec2(pos.x * 0.42 - t * 0.6, pos.y * 0.38 + t * 0.5)) * 0.32;
    float wave3 = sin(pos.x * 0.6 + t * 1.2) * cos(pos.y * 0.5 + t * 0.9) * 0.18;

    // Fluid cursor displacement (distance-based radial ripple)
    vec2 worldXY = pos.xy;
    float distToMouse = length(worldXY - uMouse * 4.5);
    float mouseRipple = sin(distToMouse * 3.5 - uTime * 3.0) * exp(-distToMouse * 0.45) * 0.35;

    float totalElevation = wave1 + wave2 + wave3 + mouseRipple;
    pos.z += totalElevation;
    vElevation = totalElevation;

    // Calculate approximate normal for smooth lighting
    float dX = snoise(vec2((pos.x + 0.05) * 0.2 + t * 0.4, pos.y * 0.2)) - wave1;
    float dY = snoise(vec2(pos.x * 0.2, (pos.y + 0.05) * 0.2 + t * 0.4)) - wave1;
    vNormal = normalize(vec3(-dX, -dY, 1.0));

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fluidFragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vElevation;
  varying vec3 vNormal;

  void main() {
    // Deep liquid azure palette
    vec3 deepVoid = vec3(0.012, 0.024, 0.055);       // Midnight ocean abyss
    vec3 midnightBlue = vec3(0.035, 0.09, 0.24);      // Deep royal navy
    vec3 oceanBlue = vec3(0.08, 0.28, 0.65);          // Oceanic blue swell
    vec3 crestCyan = vec3(0.24, 0.62, 0.96);          // Luminous crest
    vec3 foamSheen = vec3(0.65, 0.88, 1.00);          // Moon specular glint

    // Height gradient
    float h = smoothstep(-0.8, 0.95, vElevation);
    vec3 col = mix(deepVoid, midnightBlue, smoothstep(0.0, 0.35, h));
    col = mix(col, oceanBlue, smoothstep(0.35, 0.7, h));
    col = mix(col, crestCyan, smoothstep(0.7, 0.92, h));
    col = mix(col, foamSheen, smoothstep(0.92, 1.0, h) * 0.7);

    // Fresnel rim sheen (viewer angle)
    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float fresnel = pow(1.0 - max(dot(vNormal, viewDir), 0.0), 3.0);
    col += vec3(0.15, 0.4, 0.85) * fresnel * 0.6;

    // Edge radial vignette: fade out smoothly towards viewport borders
    vec2 centerOffset = vUv - vec2(0.5);
    float vignette = 1.0 - smoothstep(0.25, 0.72, length(centerOffset));
    col *= vignette;

    gl_FragColor = vec4(col, vignette * 0.92);
  }
`;

// Subtle drifting cosmic embers
function AtmosphericEmbers() {
  const pointsRef = useRef<THREE.Points>(null!);
  const count = 350;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
    }
    return pos;
  }, []);


  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    pointsRef.current.rotation.y = t * 0.012;
    pointsRef.current.position.y = Math.sin(t * 0.1) * 0.2;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.035}
        color="#7dd3fc"
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Fluid ocean wave mesh

function FluidAzureMesh({ mouseTarget }: { mouseTarget: React.MutableRefObject<{ x: number; y: number }> }) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const mouseLerp = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    if (!matRef.current) return;

    // Smooth inertia lerp for cursor coordinates
    mouseLerp.current.x = THREE.MathUtils.lerp(
      mouseLerp.current.x,
      mouseTarget.current.x,
      delta * 2.5
    );
    mouseLerp.current.y = THREE.MathUtils.lerp(
      mouseLerp.current.y,
      mouseTarget.current.y,
      delta * 2.5
    );

    matRef.current.uniforms.uTime.value = state.clock.getElapsedTime();
    matRef.current.uniforms.uMouse.value.set(
      mouseLerp.current.x,
      mouseLerp.current.y
    );
  });

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
    }),
    []
  );

  return (
    <mesh
      ref={meshRef}
      rotation={[-Math.PI / 2.8, 0, 0]}
      position={[0, -1.8, -1]}
    >
      <planeGeometry args={[18, 14, 160, 120]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={fluidVertexShader}
        fragmentShader={fluidFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        wireframe={false}
      />
    </mesh>
  );
}

export default function FluidCanvas3D({}: FluidCanvas3DProps) {
  const mouseTarget = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseTarget.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return (
    <div
      className="fixed pointer-events-none z-0 overflow-hidden bg-[#030712]"
      style={{
        top: "-20px",
        left: 0,
        width: "100%",
        height: "calc(100lvh + 100px)",
        minHeight: "calc(100vh + 100px)",
        transform: "translate3d(0, 0, 0)",
        WebkitTransform: "translate3d(0, 0, 0)",
        willChange: "transform",
      }}
    >
      <Canvas
        resize={{ scroll: false, debounce: { scroll: 50, resize: 100 } }}
        camera={{ position: [0, 0, 6.5], fov: 50 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: false,
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={["#030712"]} />
        <fog attach="fog" args={["#030712", 4.5, 9.5]} />
        <ambientLight intensity={0.4} />
        <AtmosphericEmbers />
        <FluidAzureMesh mouseTarget={mouseTarget} />
      </Canvas>
    </div>
  );
}

