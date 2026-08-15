"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sparkles } from "@react-three/drei";
import type { Mesh } from "three";

// The site's one signature 3D element (brief: "exactly one"). Deliberately
// minimal — a single low-poly icosahedron (12 vertices) plus a sparse
// particle field via drei's <Sparkles>, both cheap to render. Mounted only
// when useCanRender3D() says yes (see HeroSection.tsx), and dpr is capped
// below so it never asks for more pixels than this scene needs.
function RotatingShape() {
  const meshRef = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += delta * 0.08;
    meshRef.current.rotation.y += delta * 0.12;
  });

  return (
    <mesh ref={meshRef}>
      <icosahedronGeometry args={[1.5, 0]} />
      <meshStandardMaterial
        color="#3B62FC"
        wireframe
        emissive="#6384FF"
        emissiveIntensity={0.4}
        transparent
        opacity={0.55}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
      camera={{ position: [0, 0, 5], fov: 45 }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[3, 2, 4]} intensity={40} color="#6384FF" />
      <RotatingShape />
      <Sparkles count={70} scale={4.5} size={1.6} speed={0.25} color="#818CF8" opacity={0.5} />
    </Canvas>
  );
}
