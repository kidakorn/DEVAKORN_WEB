"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AnimatedShape() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15;
      meshRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2}>
      {/* Outer Wireframe Icosahedron */}
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[2.2, 0]} />
        <meshStandardMaterial 
          color="#C8102E" 
          wireframe 
          emissive="#C8102E" 
          emissiveIntensity={0.8} 
        />
      </mesh>
      
      {/* Inner Distorted Liquid Core */}
      <mesh>
        <sphereGeometry args={[1.4, 64, 64]} />
        <MeshDistortMaterial 
          color="#1a1d2e" 
          emissive="#C8102E"
          emissiveIntensity={0.2}
          envMapIntensity={1} 
          clearcoat={1} 
          clearcoatRoughness={0.1} 
          metalness={0.9}
          roughness={0.1}
          distort={0.4} 
          speed={3} 
        />
      </mesh>
    </Float>
  );
}

export default function Hero3DScene() {
  return (
    <div className="w-full h-full absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
      <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#ffffff" />
        <pointLight position={[-10, -10, -5]} color="#EF233C" intensity={5} />
        <AnimatedShape />
      </Canvas>
    </div>
  );
}
