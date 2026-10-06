"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

export default function ThirdPersonController({ position, onMove }: { position: THREE.Vector3; onMove: (next: THREE.Vector3) => void }) {
  const keys = useRef<Record<string, boolean>>({});

  useEffect(() => {
    const down = (event: KeyboardEvent) => { keys.current[event.key.toLowerCase()] = true; };
    const up = (event: KeyboardEvent) => { keys.current[event.key.toLowerCase()] = false; };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => { window.removeEventListener("keydown", down); window.removeEventListener("keyup", up); };
  }, []);

  useFrame((_, delta) => {
    const x = Number(keys.current.d || keys.current.arrowright) - Number(keys.current.a || keys.current.arrowleft);
    const z = Number(keys.current.s || keys.current.arrowdown) - Number(keys.current.w || keys.current.arrowup);
    if (!x && !z) return;
    const next = position.clone();
    const direction = new THREE.Vector3(x, 0, z).normalize();
    next.addScaledVector(direction, Math.min(delta * 5, 0.12));
    next.x = THREE.MathUtils.clamp(next.x, -2.2, 2.2);
    next.z = THREE.MathUtils.clamp(next.z, -15, 15);
    onMove(next);
  });

  return null;
}
