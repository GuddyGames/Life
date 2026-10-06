"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function ThirdPersonController({ position, onMove, mobileInput }: { position: THREE.Vector3; onMove: (next: THREE.Vector3) => void; mobileInput?: { x: number; z: number } }) {
  const keys = useRef<Record<string, boolean>>({});
  const input = useRef({ x: 0, z: 0 });

  useEffect(() => {
    const down = (event: KeyboardEvent) => { keys.current[event.key.toLowerCase()] = true; };
    const up = (event: KeyboardEvent) => { keys.current[event.key.toLowerCase()] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  useEffect(() => { input.current = mobileInput ?? { x: 0, z: 0 }; }, [mobileInput]);

  useFrame((_, delta) => {
    const keyboardX = Number(keys.current.d || keys.current.arrowright) - Number(keys.current.a || keys.current.arrowleft);
    const keyboardZ = Number(keys.current.s || keys.current.arrowdown) - Number(keys.current.w || keys.current.arrowup);
    const x = keyboardX || input.current.x;
    const z = keyboardZ || input.current.z;
    if (!x && !z) return;
    const next = position.clone();
    const direction = new THREE.Vector3(x, 0, z).normalize();
    next.addScaledVector(direction, Math.min(delta * 5, 0.12));
    next.x = THREE.MathUtils.clamp(next.x, -17, 17);
    next.z = THREE.MathUtils.clamp(next.z, -18, 18);
    onMove(next);
  });

  return null;
}
