import LifeWorld from "../../components/LifeWorld";

export default function WorldPage() {
  return (
    <main className="world-page">
      <div className="world-header">
        <div><span className="eyebrow">LIFE: OPEN WORLD</span><h1>Mainland — Day 1</h1><p>Yaba prototype district · Your first playable street</p></div>
        <div className="world-stats"><b>₦15,000<small>Cash</small></b><b>88%<small>Energy</small></b><b>50<small>Street Cred</small></b></div>
      </div>
      <LifeWorld />
      <div className="world-tip">Tap your character to move forward · World foundation v0.2</div>
    </main>
  );
}
