"use client";

import dynamic from "next/dynamic";

const LifeWorld = dynamic(() => import("../../components/LifeWorld"), { ssr: false });

export default function GamePage() {
  return <main className="game-shell"><LifeWorld /></main>;
}
