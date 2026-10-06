"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

const vehicles = [
  { color: "#f4c542", lane: -1.15, speed: 2.4, start: -18 },
  { color: "#16a34a", lane: 1.15, speed: -1.8, start: 14 },
  { color: "#2563eb", lane: -1.7, speed: 1.4, start: -7 },
];

function Car({ color, lane, speed, start }: (typeof vehicles)[number]) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    if (!ref.current) return;
    ref.current.position.z += speed * delta;
    if (ref.current.position.z > 20) ref.current.position.z = -20;
    if (ref.current.position.z < -20) ref.current.position.z = 20;
  });
  return <group ref={ref} position={[lane, 0.35, start]}>
    <mesh castShadow><boxGeometry args={[0.8, 0.45, 1.8]} /><meshStandardMaterial color={color} /></mesh>
    <mesh position={[0, 0.27, 0]}><boxGeometry args={[0.65, 0.25, 0.75]} /><meshStandardMaterial color="#b9d9e8" /></mesh>
    <mesh position={[-0.42, -0.22, -0.55]}><cylinderGeometry args={[0.12, 0.12, 0.12, 10]} /><meshStandardMaterial color="#111" /></mesh>
    <mesh position={[0.42, -0.22, -0.55]}><cylinderGeometry args={[0.12, 0.12, 0.12, 10]} /><meshStandardMaterial color="#111" /></mesh>
  </group>;
}

export default function WorldTraffic() { return <>{vehicles.map((vehicle, index) => <Car key={index} {...vehicle} />)}</>; }
