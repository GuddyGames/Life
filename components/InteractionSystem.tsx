"use client";

import { useEffect, useState } from "react";

export type InteractionTarget = {
  id: string;
  name: string;
  type: "npc" | "shop" | "home";
  description: string;
  action: string;
};

export default function InteractionSystem({ target }: { target: InteractionTarget | null }) {
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [target?.id]);
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key.toLowerCase() === "e" && target) setOpen((value) => !value);
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [target]);

  if (!target) return null;

  return <div className="interaction-ui">
    {!open ? <div className="interaction-prompt"><b>E</b><span>Interact with {target.name}</span></div> : <div className="interaction-card">
      <small>{target.type.toUpperCase()}</small>
      <h3>{target.name}</h3>
      <p>{target.description}</p>
      <button onClick={() => setOpen(false)}>{target.action}</button>
      <button className="secondary" onClick={() => setOpen(false)}>Close</button>
    </div>}
  </div>;
}
