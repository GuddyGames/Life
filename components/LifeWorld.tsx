"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import ThirdPersonController from "./ThirdPersonController";
import WorldNPCs from "./WorldNPCs";
import InteractionSystem, { type InteractionTarget } from "./InteractionSystem";
import JobSystem from "./JobSystem";
import MobileJoystick from "./MobileJoystick";

function Player({ position }: { position: THREE.Vector3 }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((_, delta) => { if (ref.current) ref.current.position.lerp(position, Math.min(delta * 14, 1)); });
  return <group ref={ref} position={position}><mesh castShadow><capsuleGeometry args={[0.4, 0.9, 8, 16]} /><meshStandardMaterial color="#2563eb" /></mesh><mesh position={[0, 0.72, 0]} castShadow><sphereGeometry args={[0.28, 16, 16]} /><meshStandardMaterial color="#70412b" /></mesh></group>;
}
function Building({ position, scale, color }: { position: [number, number, number]; scale: [number, number, number]; color: string }) { return <mesh position={position} scale={scale} castShadow><boxGeometry /><meshStandardMaterial color={color} /></mesh>; }
function Palm({ position }: { position: [number, number, number] }) { return <group position={position}><mesh position={[0, 1.2, 0]}><cylinderGeometry args={[0.12, 0.18, 2.4, 8]} /><meshStandardMaterial color="#6b4f35" /></mesh><mesh position={[0, 2.45, 0]}><sphereGeometry args={[0.65, 8, 8]} /><meshStandardMaterial color="#16803c" /></mesh></group>; }
function CameraFollow({ target }: { target: THREE.Vector3 }) { const targetRef = useRef(target.clone()); useFrame(({ camera }, delta) => { targetRef.current.lerp(target, Math.min(delta * 10, 1)); const desired = new THREE.Vector3(targetRef.current.x + 7, 6.5, targetRef.current.z + 9); camera.position.lerp(desired, Math.min(delta * 4, 1)); camera.lookAt(targetRef.current.x, 1, targetRef.current.z); }); return null; }

const targets: Array<InteractionTarget & { position: [number, number, number] }> = [
  { id: "vendor", name: "Mama Titi", type: "npc", description: "A food vendor serving hot jollof rice and akara near the Yaba bus stop.", action: "Talk", position: [-3, 0, 2] },
  { id: "tech", name: "Yaba Tech Hub", type: "shop", description: "Phones, repairs and small electronics. A good place to build your Tech skill.", action: "Enter shop", position: [7, 0, -7] },
  { id: "room", name: "Your Room", type: "home", description: "A small starter room. Rest here to restore Energy later.", action: "Enter home", position: [-7, 0, 5] },
];

function World({ playerPosition, setPlayerPosition, mobileInput }: { playerPosition: THREE.Vector3; setPlayerPosition: (value: THREE.Vector3) => void; mobileInput: { x: number; z: number } }) {
  return <><ambientLight intensity={1.5} /><directionalLight position={[5, 10, 5]} intensity={2} castShadow /><mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[40, 40]} /><meshStandardMaterial color="#24352d" /></mesh><mesh position={[0, 0.03, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[6, 40]} /><meshStandardMaterial color="#252b31" /></mesh><mesh position={[0, 0.04, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[0.12, 40]} /><meshStandardMaterial color="#f5c542" /></mesh><Building position={[-7, 2, -5]} scale={[3, 4, 3]} color="#b66b3f" /><Building position={[7, 2.5, -7]} scale={[3.5, 5, 2.8]} color="#526b7d" /><Building position={[-7, 1.5, 5]} scale={[3, 3, 2.5]} color="#d3a35d" /><Building position={[7, 1.8, 5]} scale={[3, 3.6, 3]} color="#7b4f66" /><Palm position={[-4, 0, -1]} /><Palm position={[4, 0, 2]} /><Palm position={[-4, 0, 8]} /><WorldNPCs /><Player position={playerPosition} /><ThirdPersonController position={playerPosition} onMove={setPlayerPosition} mobileInput={mobileInput} /><CameraFollow target={playerPosition} /></>;
}

export default function LifeWorld() {
  const [playerPosition, setPlayerPosition] = useState(() => new THREE.Vector3(0, 1, 4));
  const [characterName, setCharacterName] = useState("Goodness");
  const [money, setMoney] = useState(15000);
  const [target, setTarget] = useState<InteractionTarget | null>(null);
  const [showJobs, setShowJobs] = useState(false);
  const [mobileInput, setMobileInput] = useState({ x: 0, z: 0 });
  useEffect(() => { try { const saved = localStorage.getItem("life-character"); if (saved) { const data = JSON.parse(saved); setCharacterName(data.name || "Goodness"); setMoney(data.money || 15000); } } catch {} }, []);
  useEffect(() => { const nearest = targets.map(item => ({ item, distance: playerPosition.distanceTo(new THREE.Vector3(...item.position)) })).sort((a,b) => a.distance-b.distance)[0]; setTarget(nearest && nearest.distance < 3 ? nearest.item : null); }, [playerPosition]);
  return <div className="world-canvas"><div className="world-hud"><strong>{characterName}</strong><span>Yaba · Day 1 · 08:00</span><b>₦{money.toLocaleString("en-NG")}</b><small className="desktop-help">WASD / Arrow keys · E to interact</small></div><Canvas camera={{ position: [7, 6.5, 13], fov: 50 }} shadows><World playerPosition={playerPosition} setPlayerPosition={setPlayerPosition} mobileInput={mobileInput} /></Canvas><InteractionSystem target={target} /><MobileJoystick onMove={(x, z) => setMobileInput({ x, z })} /><button className="mobile-action" onClick={() => window.dispatchEvent(new KeyboardEvent("keydown", { key: "e" }))}>E</button><button className="jobs-toggle" onClick={() => setShowJobs(v => !v)}>💼 Hustles</button>{showJobs && <JobSystem money={money} onEarn={amount => setMoney(v => { const next = v + amount; try { const saved = localStorage.getItem("life-character"); if (saved) localStorage.setItem("life-character", JSON.stringify({ ...JSON.parse(saved), money: next })); } catch {} return next; })} />}</div>;
}
