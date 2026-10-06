"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";
import * as THREE from "three";

function Player() {
  const ref = useRef<THREE.Mesh>(null);
  const [position, setPosition] = useState<[number, number, number]>([0, 1, 4]);

  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.15;
  });

  return (
    <mesh ref={ref} position={position} onClick={() => setPosition(([x, y, z]) => [x, y, z - 1])}>
      <capsuleGeometry args={[0.45, 1, 8, 16]} />
      <meshStandardMaterial color="#2563eb" />
    </mesh>
  );
}

function Building({ position, scale, color }: { position: [number, number, number]; scale: [number, number, number]; color: string }) {
  return <mesh position={position} scale={scale} castShadow><boxGeometry /><meshStandardMaterial color={color} /></mesh>;
}

function Palm({ position }: { position: [number, number, number] }) {
  return <group position={position}>
    <mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.12, 0.18, 2.4, 8]} /><meshStandardMaterial color="#6b4f35" /></mesh>
    <mesh position={[0, 2.45, 0]}><sphereGeometry args={[0.65, 8, 8]} /><meshStandardMaterial color="#16803c" /></mesh>
  </group>;
}

function World() {
  return <>
    <ambientLight intensity={1.5} />
    <directionalLight position={[5, 10, 5]} intensity={2} castShadow />
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#24352d" /></mesh>
    <mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6, 40]} /><meshStandardMaterial color="#252b31" /></mesh>
    <mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.12, 40]} /><meshStandardMaterial color="#f5c542" /></mesh>
    <Building position={[-7, 2, -5]} scale={[3, 4, 3]} color="#b66b3f" />
    <Building position={[7, 2.5, -7]} scale={[3.5, 5, 2.8]} color="#526b7d" />
    <Building position={[-7, 1.5, 5]} scale={[3, 3, 2.5]} color="#d3a35d" />
    <Building position={[7, 1.8, 5]} scale={[3, 3.6, 3]} color="#7b4f66" />
    <Palm position={[-4, 0, -1]} /><Palm position={[4, 0, 2]} /><Palm position={[-4, 0, 8]} />
    <Player />
  </>;
}

export default function LifeWorld() {
  return <div className="world-canvas"><Canvas camera={{ position: [9, 8, 11], fov: 48 }} shadows><World /></Canvas></div>;
}
