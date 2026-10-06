"use client";

import { useMemo, useState } from "react";

const npcs = [
  { name: "Tunde", role: "Danfo Driver", x: -1.2, z: -4.5 },
  { name: "Amaka", role: "Food Vendor", x: 1.1, z: 2.8 },
  { name: "Chinedu", role: "Phone Technician", x: -0.8, z: 7 },
];

export default function WorldNPCs() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = useMemo(() => npcs.find((npc) => npc.name === selected), [selected]);

  return <>
    {npcs.map((npc) => <group key={npc.name} position={[npc.x, 0.75, npc.z]} onClick={() => setSelected(npc.name)}>
      <mesh><capsuleGeometry args={[0.28, 0.7, 6, 10]} /><meshStandardMaterial color="#f97316" /></mesh>
      <mesh position={[0, 0.75, 0]}><sphereGeometry args={[0.28, 12, 12]} /><meshStandardMaterial color="#70412b" /></mesh>
    </group>)}
    {active && <HtmlFallback text={`${active.name} · ${active.role}`} />}
  </>;
}

function HtmlFallback({ text }: { text: string }) {
  return <mesh position={[0, 0, 0]} visible={false} userData={{ label: text }} />;
}
