"use client";

import { useState } from "react";
import { backgroundData, defaultCharacter, traitOptions, type Background, type Character, type TraitId } from "../src/game/types";

const skinTones = ["deep", "dark", "brown", "light-brown"];
const hairs = ["low-cut", "fade", "dreads", "braids", "afro"];
const outfits = ["street", "smart", "native", "casual"];
const districts = ["Yaba", "Surulere", "Ikeja", "Mushin"] as const;
const money = (n: number) => new Intl.NumberFormat("en-NG").format(n);

export default function Home() {
  const [character, setCharacter] = useState<Character>(defaultCharacter);
  const [step, setStep] = useState(1);
  const [saved, setSaved] = useState(false);
  const bg = backgroundData[character.background];

  const setBackground = (background: Background) => setCharacter({ ...character, background, money: backgroundData[background].money });
  const toggleTrait = (trait: TraitId) => setCharacter((c) => c.traits.includes(trait) ? { ...c, traits: c.traits.filter((t) => t !== trait) } : c.traits.length < 3 ? { ...c, traits: [...c.traits, trait] } : c);
  const saveCharacter = () => { localStorage.setItem("life-character", JSON.stringify({ ...character, money: bg.money })); setSaved(true); };

  return <main className="creator-shell">
    <header className="creator-top"><div><span>LIFE: OPEN WORLD</span><h1>Create your Lagos life.</h1></div><b>STEP {step} / 4</b></header>
    <section className="creator-layout">
      <aside className={`character-preview skin-${character.skinTone}`}><div className="avatar"><div className={`hair ${character.hair}`} /><div className="face"><i/><i/></div><div className={`shirt ${character.outfit}`} /></div><small>YOUR SIM</small><h2>{character.name || "Unnamed"}</h2><p>{bg.name} · {character.district}</p><div className="cash"><small>STARTING CASH</small><strong>₦{money(bg.money)}</strong></div></aside>
      <section className="creator-form">
        {step === 1 && <><div className="heading"><b>01</b><div><h2>Identity & appearance</h2><p>Start with the basics.</p></div></div><label>Name<input value={character.name} maxLength={24} onChange={e => setCharacter({ ...character, name: e.target.value })}/></label><div className="three"><label>Age<input type="number" min="18" max="80" value={character.age} onChange={e => setCharacter({ ...character, age: Number(e.target.value) })}/></label><label>Gender<select value={character.gender} onChange={e => setCharacter({ ...character, gender: e.target.value as Character["gender"] })}><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></label><label>District<select value={character.district} onChange={e => setCharacter({ ...character, district: e.target.value as Character["district"] })}>{districts.map(d => <option key={d}>{d}</option>)}</select></label></div><Choice title="Skin tone" values={skinTones} current={character.skinTone} onChange={v => setCharacter({ ...character, skinTone: v })}/><Choice title="Hair" values={hairs} current={character.hair} onChange={v => setCharacter({ ...character, hair: v })}/><Choice title="Outfit" values={outfits} current={character.outfit} onChange={v => setCharacter({ ...character, outfit: v })}/></>}
        {step === 2 && <><div className="heading"><b>02</b><div><h2>Choose your background</h2><p>Your starting life changes with this choice.</p></div></div><div className="backgrounds">{(Object.keys(backgroundData) as Background[]).map(id => { const item = backgroundData[id]; return <button key={id} className={character.background === id ? "background selected" : "background"} onClick={() => setBackground(id)}><strong>{item.name}</strong><span>{item.description}</span><em>₦{money(item.money)} · {item.home} · Rep {item.reputation}</em></button> })}</div><div className="info">Nepo gives comfort and connections. Lapo starts tougher, but opens a different hustle path.</div></>}
        {step === 3 && <><div className="heading"><b>03</b><div><h2>Pick your traits</h2><p>Choose up to 3 traits.</p></div></div><div className="traits">{traitOptions.map(t => <button key={t.id} className={character.traits.includes(t.id) ? "trait selected" : "trait"} onClick={() => toggleTrait(t.id)}><strong>{t.name}</strong><span>{t.description}</span></button>)}</div><p className="counter">{character.traits.length} / 3 selected</p></>}
        {step === 4 && <><div className="heading"><b>04</b><div><h2>Your life starts here.</h2><p>Review your character before entering Mainland.</p></div></div><div className="summary">{[["Name", character.name],["Background", bg.name],["Home", bg.home],["Starting cash", `₦${money(bg.money)}`],["District", character.district],["Traits", character.traits.join(", ")]].map(([a,b]) => <div key={a}><small>{a}</small><strong>{b}</strong></div>)}</div>{saved && <div className="success">✓ Character saved locally. Ready for the 3D Mainland.</div>}</>}
        <div className="actions"><button disabled={step === 1} onClick={() => setStep(step - 1)}>Back</button>{step < 4 ? <button className="primary" onClick={() => setStep(step + 1)}>Continue →</button> : <button className="primary" onClick={saveCharacter}>Enter Lagos →</button>}</div>
      </section>
    </section>
  </main>;
}

function Choice({ title, values, current, onChange }: { title: string; values: string[]; current: string; onChange: (value: string) => void }) { return <div className="choice"><small>{title}</small><div>{values.map(v => <button className={current === v ? "selected" : ""} onClick={() => onChange(v)} key={v}>{v.replace("-", " ")}</button>)}</div></div>; }
