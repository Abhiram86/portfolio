import { useRef } from 'react'
import type { ComponentRef, ReactNode } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, MeshDistortMaterial, Sphere, Float, OrbitControls, Sparkles, Torus } from '@react-three/drei'
import * as THREE from 'three'
import { PORTFOLIO_DATA } from '../data'

const panelClass =
  'space-y-6 bg-black/65 backdrop-blur-2xl backdrop-saturate-150 p-8 border border-white/15 shadow-2xl shadow-cyan-950/20 ring-1 ring-white/5 transition-colors duration-500'

const innerCardClass =
  'border border-white/10 bg-black/25 backdrop-blur-xl backdrop-saturate-150 p-5 shadow-lg shadow-black/20 transition-colors'

type DistortMaterial = ComponentRef<typeof MeshDistortMaterial>

function SectionTitle({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <h2 className={`text-3xl font-black uppercase tracking-widest border-b border-white/30 pb-4 ${className}`}>
      {children}
    </h2>
  )
}

function InteractiveBlob() {
  const materialRef = useRef<DistortMaterial>(null!)
  const ringRef = useRef<THREE.Group>(null!)
  
  useFrame((state) => {
    if (materialRef.current) {
      // Create a pulsating distortion effect based on time
      materialRef.current.distort = 0.32 + Math.sin(state.clock.elapsedTime * 1.7) * 0.16
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.22
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.38
    }
  })

  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={2}>
      <Sphere args={[2.15, 64, 64]}>
        <MeshDistortMaterial
          ref={materialRef}
          color="#b8f7ff"
          emissive="#0b5a7a"
          emissiveIntensity={0.75}
          metalness={1}
          roughness={0.005}
          clearcoat={1}
          clearcoatRoughness={0.01}
          envMapIntensity={5}
          transparent
          opacity={0.9}
        />
      </Sphere>

      <Sphere args={[2.24, 64, 64]}>
        <MeshDistortMaterial
          color="#ffd1f4"
          emissive="#c00073"
          emissiveIntensity={0.85}
          metalness={1}
          roughness={0.01}
          clearcoat={1}
          clearcoatRoughness={0.02}
          envMapIntensity={5.5}
          transparent
          opacity={0.34}
        />
      </Sphere>

      <group ref={ringRef}>
        <Torus args={[2.9, 0.025, 12, 160]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#00ffff" emissive="#00ffff" emissiveIntensity={2.2} metalness={0.6} roughness={0.12} />
        </Torus>
        <Torus args={[3.25, 0.018, 12, 160]} rotation={[0.7, 0.5, 0.2]}>
          <meshStandardMaterial color="#ff4fd8" emissive="#ff4fd8" emissiveIntensity={1.8} metalness={0.6} roughness={0.12} />
        </Torus>
      </group>

      <Sparkles count={130} scale={6.4} size={2.8} speed={0.45} color="#e0fbff" opacity={0.75} />
    </Float>
  )
}

export default function ThreeJsShaderTwo() {
  return (
    <div className="relative min-h-screen bg-black text-white font-sans overflow-x-hidden">
      
      {/* 3D Canvas Background */}
      <div className="fixed inset-0 z-0 opacity-50 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 6] }}>
          <ambientLight intensity={0.8} />
          <directionalLight position={[4, 3, 5]} intensity={5} color="#ffffff" />
          <pointLight position={[-4, -2, 4]} intensity={7} color="#00ffff" />
          <pointLight position={[4, 3, 3]} intensity={6} color="#ff4fd8" />
          <pointLight position={[0, -4, 2]} intensity={4.5} color="#ffffff" />
          <Environment preset="studio" />
          <InteractiveBlob />
          <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </div>

      {/* Overlay Content */}
      <div className="relative z-10 min-h-screen flex flex-col py-20">
         <div className="px-6 md:px-12 lg:px-20 w-full max-w-[1400px] mx-auto">
            
            {/* Massive Hero Text */}
            <div className="mix-blend-difference pointer-events-none mb-32">
              <h1 className="text-[15vw] md:text-[12rem] leading-[0.8] font-black uppercase italic tracking-tighter text-white">
                {PORTFOLIO_DATA.name.split(' ')[0]}<br/>
                {PORTFOLIO_DATA.name.split(' ')[1]}
              </h1>
              <p className="text-xl md:text-4xl font-bold mt-6 text-[#00ffff] uppercase tracking-[0.3em]">
                {PORTFOLIO_DATA.title}
              </p>
            </div>
            
            {/* Bento Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-white pb-20">
               
               {/* Experience */}
               <div className={`${panelClass} hover:border-[#ff0055]/70 xl:col-span-2`}>
                  <SectionTitle className="text-[#ff0055]">Experience</SectionTitle>
                 <div className="space-y-8">
                   {PORTFOLIO_DATA.experience.map((exp, i) => (
                      <div key={i} className="group min-w-0">
                         <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-2 gap-2">
                           <h3 className="text-2xl font-bold group-hover:text-white transition-colors text-gray-200" title={exp.company}>{exp.company}</h3>
                           <span className="w-fit max-w-full text-xs font-mono text-[#00ffff] border border-[#00ffff]/30 px-2 py-1" title={exp.date}>
                             {exp.date}
                           </span>
                         </div>
                         <p className="text-sm font-mono text-[#ff0055] mb-4 uppercase" title={exp.role}>{exp.role}</p>
                         <ul className="space-y-2">
                           {exp.points.map((pt, j) => (
                             <li key={j} className="text-sm text-gray-400 leading-relaxed font-medium">
                               <span className="text-[#ff0055] mr-2">/</span>{pt}
                             </li>
                           ))}
                         </ul>
                      </div>
                   ))}
                 </div>
               </div>

               {/* Connect */}
                <div className={`${panelClass} hover:border-[#00ffff]/70 flex flex-col`}>
                  <SectionTitle className="text-[#00ffff]">Connect</SectionTitle>
                 <div className="flex flex-col gap-6 text-xl font-mono font-bold flex-grow justify-center">
                    <a href={PORTFOLIO_DATA.github} className="hover:text-white text-gray-400 transition-colors uppercase flex justify-between items-center group">
                      <span>GitHub</span> <span className="text-[#ff0055] group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                    <a href={PORTFOLIO_DATA.linkedin} className="hover:text-white text-gray-400 transition-colors uppercase flex justify-between items-center group">
                      <span>LinkedIn</span> <span className="text-[#00ffff] group-hover:translate-x-2 transition-transform">→</span>
                    </a>
                    <a href={`mailto:${PORTFOLIO_DATA.email}`} className="text-sm hover:text-white text-gray-400 transition-colors break-all mt-4 pt-4 border-t border-white/10">
                      {PORTFOLIO_DATA.email}
                    </a>
                    <p className="text-sm text-gray-400">{PORTFOLIO_DATA.phone}</p>
                    <p className="text-sm text-gray-400">{PORTFOLIO_DATA.location}</p>
                 </div>
               </div>

               {/* Skills */}
                <div className={`${panelClass} hover:border-white/60 xl:col-span-3`}>
                  <SectionTitle>Skills Matrix</SectionTitle>
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                   {Object.entries(PORTFOLIO_DATA.skills).map(([cat, skills]) => (
                     <div key={cat}>
                       <h3 className="font-mono text-[#00ffff] uppercase text-sm mb-4 tracking-widest">[{cat.replace('_', ' ')}]</h3>
                       <div className="flex flex-wrap gap-2">
                         {skills.map(skill => (
                           <span key={skill} className="bg-white/5 text-gray-300 border border-white/10 px-3 py-1.5 text-sm font-medium hover:bg-white hover:text-black transition-colors cursor-default">
                             {skill}
                           </span>
                         ))}
                       </div>
                     </div>
                   ))}
                 </div>
               </div>

               {/* Projects */}
                <div className={`${panelClass} hover:border-[#ff0055]/70 xl:col-span-2`}>
                  <SectionTitle className="text-[#ff0055]">System Architecture</SectionTitle>
                 <div className="grid md:grid-cols-2 gap-6">
                   {PORTFOLIO_DATA.projects.map((proj, i) => (
                       <div key={i} className={`group min-w-0 ${innerCardClass} hover:border-[#ff0055]/50 hover:bg-black/35 flex flex-col`}>
                         <div className="mb-3">
                           <h3 className="text-xl font-bold group-hover:text-white text-gray-200 transition-colors uppercase truncate" title={proj.name}>
                             {proj.name}
                           </h3>
                         </div>
                         <p className="text-sm text-gray-400 mb-4 flex-grow">{proj.points[0]}</p>
                         <div className="flex flex-wrap gap-2 mt-auto pt-4 border-t border-white/5">
                           {proj.tags.map(tag => (
                              <span key={tag} title={tag} className="max-w-full text-[10px] font-mono text-cyan-100 bg-cyan-500/10 border border-cyan-300/20 px-2 py-1 uppercase tracking-wider truncate">
                               {tag}
                             </span>
                           ))}
                         </div>
                         <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-white/5">
                           {proj.links.map((l, j) => (
                              <a key={j} href={l.url} title={`${proj.name} ${l.label}`} className="max-w-full text-xs font-mono text-[#00ffff] hover:text-black hover:bg-[#00ffff] border border-[#00ffff]/30 px-2 py-1 uppercase transition-colors truncate">
                               {l.label} ↗
                             </a>
                           ))}
                         </div>
                      </div>
                   ))}
                 </div>
               </div>

               {/* Education & Accolades */}
                <div className={`${panelClass} hover:border-[#00ffff]/70 flex flex-col`}>
                  <SectionTitle className="text-[#00ffff]">Records</SectionTitle>
                 
                 <div className="flex-grow space-y-8">
                   <div>
                     <h3 className="font-mono text-[#ff0055] uppercase text-sm mb-4 tracking-widest">[EDUCATION]</h3>
                     <div className="space-y-6">
                       {PORTFOLIO_DATA.education.map((edu, i) => (
                          <div key={i} className="border-l-2 border-white/20 bg-black/25 p-4 pl-5 backdrop-blur-xl backdrop-saturate-150 shadow-lg shadow-black/20">
                            <h4 className="font-bold text-gray-200 text-lg leading-tight truncate" title={edu.institution}>{edu.institution}</h4>
                            <p className="text-sm text-gray-400 mt-1 truncate" title={edu.degree}>{edu.degree}</p>
                            <p className="text-xs font-mono text-[#00ffff] mt-2 truncate" title={`${edu.date} // ${edu.score}`}>{edu.date} // {edu.score}</p>
                         </div>
                       ))}
                     </div>
                   </div>

                   <div>
                     <h3 className="font-mono text-[#ff0055] uppercase text-sm mb-4 tracking-widest">[ACCOLADES]</h3>
                     <ul className="space-y-4">
                       {PORTFOLIO_DATA.achievements.map((ach, i) => (
                         <li key={i} className="text-sm text-gray-400">
                           <strong className="text-white block mb-1">{ach.title}</strong>
                           {ach.desc}
                         </li>
                       ))}
                     </ul>
                   </div>
                 </div>
               </div>

            </div>
         </div>
      </div>
    </div>
  )
}
