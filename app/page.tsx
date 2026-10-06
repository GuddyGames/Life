const districts = [
  ['Yaba', 'Tech, students and startups', '💻'],
  ['Surulere', 'Football, music and nightlife', '🎤'],
  ['Ikeja', 'Business, offices and airport', '🏢'],
  ['Mushin', 'Markets, community and street life', '🛍️'],
];

const jobs = [
  ['Delivery Rider', 'Move food around Mainland', '₦3,500 / shift'],
  ['POS Agent', 'Serve customers and grow trust', '₦4,000 / shift'],
  ['Content Creator', 'Build an audience and chase trends', '₦2,000–₦8,000'],
];

export default function Home() {
  return (
    <main>
      <nav><strong>LIFE<span>.</span></strong><div><a>Home</a><a>City</a><a>Jobs</a><a>Character</a></div><button>Save</button></nav>
      <section className="hero">
        <div><small>LIFE: OPEN WORLD · FOUNDATION v0.1</small><h1>Your life.<br/>In Lagos.</h1><p>Create your character, find your hustle, build relationships and turn a small beginning into a legendary life.</p><button className="primary">Start Life</button><button>Explore Mainland</button></div>
        <aside><small>CURRENT SIM</small><h2>Goodness</h2><p>Lapo · Beginner Hustler</p><div className="avatar">🧑🏾‍💻</div><div className="stats"><b>₦15,000<small>Cash</small></b><b>8<small>Reputation</small></b></div></aside>
      </section>
      <section><header><h2>Daily Needs</h2><span>Day 1 · 08:00</span></header><div className="needs">{['🍛 Hunger','⚡ Energy','🚿 Hygiene','🎮 Fun','🗣️ Social','💵 Money'].map((x,i)=><article key={x}><b>{x}</b><i><em style={{width:`${88-i*9}%`}}/></i></article>)}</div></section>
      <section><header><h2>Mainland</h2><span>Your starting district</span></header><div className="grid">{districts.map(([name,desc,icon])=><article className="tile" key={name}><big>{icon}</big><h3>{name}</h3><p>{desc}</p></article>)}</div></section>
      <section><header><h2>Starter Hustles</h2><span>Choose your first income</span></header><div className="grid jobs">{jobs.map(([name,desc,pay])=><article className="job" key={name}><small>STARTER</small><h3>{name}</h3><p>{desc}</p><strong>{pay}</strong><button className="primary">Take Job</button></article>)}</div></section>
    </main>
  );
}
