"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Icosahedron, MeshDistortMaterial, Stars } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";
import MagicRings from "./MagicRings";


// function Blob() {
//   const ref = useRef<Mesh>(null);
//   useFrame((state) => {
//     if (!ref.current) return;
//     ref.current.rotation.x = state.clock.getElapsedTime() * 0.15;
//     ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
//   });
//   return (
//     <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
//       <Icosahedron ref={ref} args={[1.6, 4]}>
//         <MeshDistortMaterial
//           color="#c026d3"
//           emissive="#7c3aed"
//           emissiveIntensity={0.4}
//           distort={0.5}
//           speed={2}
//           roughness={0.1}
//           metalness={0.8}
//         />
//       </Icosahedron>
//     </Float>
//   );
// }

export function HeroScene() {
  return (
    <div className="relative w-full h-full">
      <div className="absolute inset-0 z-0 flex items-center justify-center">
        <div className="w-[1920px] h-[1080px] shrink-0">
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 2]}>
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#06b6d4" />
            <pointLight position={[-10, -10, -5]} intensity={1.2} color="#c026d3" />
            <Stars radius={50} depth={50} count={2000} factor={4} fade speed={1} />
          </Canvas>
        </div>
      </div>
      <div className="absolute inset-0 z-10 pointer-events-none flex items-center justify-center">
        <div className="w-[1920px] h-[1080px] shrink-0">
          <MagicRings
            color="#A855F7"
            colorTwo="#6366F1"
            ringCount={6}
            speed={1}
            attenuation={15}
            lineThickness={1}
            baseRadius={0.35}
            radiusStep={0.1}
            scaleRate={0.1}
            opacity={0.5}
            blur={5}
            noiseAmount={0.1}
            rotation={0}
            ringGap={1.5}
            fadeIn={0.7}
            fadeOut={0.5}
            followMouse={false}
            mouseInfluence={0.2}
            hoverScale={1.2}
            parallax={0.05}
            clickBurst={false}
          />
        </div>
      </div>
    </div>
  );
}
