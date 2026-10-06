"use client";

import { useEffect, useRef } from "react";

export default function MobileJoystick({ onMove }: { onMove: (x: number, z: number) => void }) {
  const active = useRef(false);
  const center = useRef({ x: 0, y: 0 });
  const knob = useRef<HTMLDivElement>(null);

  const update = (clientX: number, clientY: number) => {
    const dx = clientX - center.current.x;
    const dy = clientY - center.current.y;
    const length = Math.hypot(dx, dy);
    const radius = 48;
    const scale = length > radius ? radius / length : 1;
    const x = dx * scale;
    const y = dy * scale;
    if (knob.current) knob.current.style.transform = `translate(${x}px, ${y}px)`;
    onMove(x / radius, y / radius);
  };

  const end = () => {
    active.current = false;
    if (knob.current) knob.current.style.transform = "translate(0, 0)";
    onMove(0, 0);
  };

  useEffect(() => () => end(), []);

  return <div className="mobile-joystick" onPointerDown={(e) => { active.current = true; center.current = { x: e.clientX, y: e.clientY }; e.currentTarget.setPointerCapture(e.pointerId); update(e.clientX, e.clientY); }} onPointerMove={(e) => { if (active.current) update(e.clientX, e.clientY); }} onPointerUp={end} onPointerCancel={end} onPointerLeave={(e) => { if (active.current && e.buttons === 0) end(); }}><div className="joystick-knob" ref={knob} /></div>;
}
