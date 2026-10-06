"use client";

import { useEffect, useState } from "react";

export default function DayNightCycle() {
  const [hour, setHour] = useState(8);
  useEffect(() => {
    const timer = window.setInterval(() => setHour(value => (value + 0.08) % 24), 5000);
    return () => window.clearInterval(timer);
  }, []);
  const night = hour >= 19 || hour < 6;
  return <div className={`time-cycle ${night ? "night" : "day"}`}><span>{night ? "🌙" : "☀️"}</span> {String(Math.floor(hour)).padStart(2,"0")}:{String(Math.floor((hour % 1) * 60)).padStart(2,"0")}</div>;
}
