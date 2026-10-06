"use client";

import { useState } from "react";

const jobs = [
  { id: "delivery", name: "Delivery Rider", description: "Deliver a package across Yaba.", reward: 3500, skill: "Driving" },
  { id: "pos", name: "POS Agent", description: "Help a customer with a quick cash-out.", reward: 4000, skill: "Charisma" },
  { id: "creator", name: "Content Creator", description: "Film a short street video and post it.", reward: 2500, skill: "Charisma" },
];

export default function JobSystem({ money, onEarn, onStartDelivery }: { money: number; onEarn: (amount: number) => void; onStartDelivery?: () => boolean }) {
  const [active, setActive] = useState<string | null>(null);
  const [message, setMessage] = useState("Choose a starter hustle.");

  const start = (id: string) => {
    const job = jobs.find((item) => item.id === id);
    if (!job) return;
    if (job.id === "delivery" && onStartDelivery) {
      const started = onStartDelivery();
      if (!started) return;
      setActive(id);
      setMessage("Delivery started. Reach the marked destination to earn ₦3,500.");
      return;
    }
    setActive(id);
    setMessage(`${job.name} started. Complete the activity to earn ₦${job.reward.toLocaleString("en-NG")}.`);
    window.setTimeout(() => {
      onEarn(job.reward);
      setActive(null);
      setMessage(`Job complete. You earned ₦${job.reward.toLocaleString("en-NG")}.`);
    }, 1400);
  };

  return <div className="job-panel">
    <div className="job-panel-head"><div><small>STARTER HUSTLES</small><h2>Make money in Yaba</h2></div><strong>₦{money.toLocaleString("en-NG")}</strong></div>
    <p>{message}</p>
    <div className="job-grid">{jobs.map(job => <button key={job.id} disabled={active !== null} onClick={() => start(job.id)}><b>{job.name}</b><span>{job.description}</span><em>+₦{job.reward.toLocaleString("en-NG")} · {job.skill}</em></button>)}</div>
  </div>;
}
