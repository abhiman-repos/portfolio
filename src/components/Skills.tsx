import { skills } from "@/data/site";
import BuildReveal, { BuildFrame } from "./BuildReveal";
import BrandMark from "./BrandMark";
import ToolkitCrumple from "./ToolkitCrumple";

const featuredTools = [
  ["Python", "TypeScript"],
  ["React", "Next.js", "TypeScript"],
  ["Django"],
  ["Google Gemini API", "LangChain"],
  ["PostgreSQL", "Redis", "MongoDB Atlas"],
  ["Docker", "GitHub Actions (CI/CD)", "Vercel"],
];

export default function Skills() {
  return (
    <section id="skills" className="skills" aria-labelledby="skills-title">
      <style>{css}</style>

      <BuildReveal className="skills__build" label="toolkit">
        <div className="skills__header">
          <p className="skills__eyebrow">TOOLKIT<BuildPointer name="01 / label" action="type" /></p>
          <h2 id="skills-title" className="skills__title">
            What I use to build <span>.</span>
            <BuildPointer name="02 / headline" action="type" delay={120} />
          </h2>
          <p className="skills__intro">
            Building intelligent applications from AI models and data pipelines to
            reliable backend systems and user-interface products.
            <BuildPointer name="03 / copy" action="type" delay={220} />
          </p>
        </div>

        <ul className="skills__grid">
          {skills.map((group, i) => (
            <li key={group.title} className="skills__group">
              <BuildFrame />
              <BuildPointer
                name={`box ${String(i + 4).padStart(2, "0")}`}
                action="frame-type"
                target=".skills__group-title"
                delay={450 + i * 180}
              />
              <div className="skills__group-top">
                <span className="skills__index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="skills__group-title">{group.title}</h3>
              </div>

              <ul className="skills__logos" aria-label={`Featured tools: ${featuredTools[i].join(", ")}`}>
                {featuredTools[i].map((tool) => (
                  <li className="skills__logo-tile" key={tool}>
                    <span className="skills__logo-mark">
                      <BrandMark name={tool} color={tool === "Next.js" ? "#f5f5f7" : undefined} />
                    </span>
                    <span className="skills__logo-name">{tool}</span>
                  </li>
                ))}
              </ul>

              <p className="skills__focus">{group.focus}</p>

              <ul className="skills__items" aria-label={group.title}>
                {group.items.map((item) => (
                  <li key={item} className="skills__chip">
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </BuildReveal>
      <ToolkitCrumple />
    </section>
  );
}

function BuildPointer({
  name,
  action,
  target,
  delay = 0,
}: {
  name: string;
  action: "type" | "frame-type" | "frame";
  target?: string;
  delay?: number;
}) {
  return (
    <span
      className="build-pointer"
      data-build-action={action}
      data-build-target={target}
      data-build-delay={delay}
      aria-hidden="true"
    >
      <svg viewBox="0 0 24 32" focusable="false"><path d="M2 1.5 21.5 19 13 19.5l4.5 8.3-4 2.1-4.5-8.4-5.7 6.2z" /></svg>
      <b>{name}</b>
      <svg className="build-pointer__ring" viewBox="0 0 36 36" focusable="false"><circle cx="18" cy="18" r="15" fill="none" /></svg>
    </span>
  );
}

const css = `
  .build-reveal { position: relative; }
  .build-pointer { position: absolute; z-index: 5; top: 0; left: 0; display: flex; align-items: flex-start; gap: .25rem; opacity: 0; pointer-events: none; font: 600 .58rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; filter: drop-shadow(0 2px 5px #000); }
  .build-pointer svg { width: 23px; height: 31px; flex: 0 0 auto; overflow: visible; }
  .build-pointer { color: var(--cursor-color, #31c8ff); }
  .build-pointer > svg:not(.build-pointer__ring) path { fill: var(--cursor-color, #31c8ff); stroke: #101018; stroke-width: 1.7px; stroke-linejoin: round; }
  .build-pointer b { padding: .32rem .42rem; border-radius: 3px; background: var(--cursor-color, #31c8ff); color: #111; white-space: nowrap; font-weight: 750; }
  .build-pointer .build-pointer__ring { position: absolute; left: -7px; top: -7px; width: 36px; height: 36px; overflow: visible; opacity: 0; pointer-events: none; }
  .build-pointer__ring circle { stroke: var(--cursor-color, #31c8ff); stroke-width: 2.5px; stroke-dasharray: 95; stroke-dashoffset: 95; filter: drop-shadow(0 0 5px var(--cursor-color, #31c8ff)); transform: rotate(-90deg); transform-origin: 18px 18px; }
  .build-pointer[data-finishing="true"] > svg:not(.build-pointer__ring), .build-pointer[data-finishing="true"] b { opacity: 0; }
  .build-pointer[data-finishing="true"] .build-pointer__ring { animation: reveal-finish-ring .9s ease-out both; }
  .build-pointer[data-finishing="true"] .build-pointer__ring circle { animation: draw-finish-circle .85s ease-out both; }
  .build-frame { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
  .build-frame svg { display: block; width: 100%; height: 100%; overflow: visible; }
  .build-frame rect { fill: none; stroke: var(--build-color, rgba(123,164,255,.72)); stroke-width: 1.5px; vector-effect: non-scaling-stroke; stroke-dasharray: 1000; stroke-dashoffset: 1000; filter: drop-shadow(0 0 3px var(--build-color, transparent)); }
  .skills__eyebrow, .skills__title, .skills__intro { position: relative; }
  .skills__group { position: relative; opacity: 1; background: rgba(10,12,17,.78) !important; }
  .skills__build[data-build-ready="true"] .skills__group { border-color: transparent; }
  .skills__build[data-build-ready="true"][data-built="false"] .skills__group > :not(.build-pointer) { opacity: 0; }
  .skills__build[data-build-ready="true"] .skills__eyebrow,
  .skills__build[data-build-ready="true"] .skills__title,
  .skills__build[data-build-ready="true"] .skills__intro { opacity: 0; }
  .skills__group-title, .skills__focus, .skills__items, .skills__logos { opacity: 0; }
  .skills__eyebrow, .skills__title { width: fit-content; max-width: 100%; }
  .skills__group-top { position: relative; display: grid; grid-template-columns: auto 1fr auto; align-items: center; gap: .8rem; opacity: 0; }
  .skills__logos { display:grid; grid-template-columns:repeat(3,minmax(0,1fr)); gap:.55rem; padding:0; margin:.25rem 0 .1rem; list-style:none; perspective:700px; }
  .skills__logo-tile { position:relative; display:grid; justify-items:center; gap:.45rem; min-width:0; padding:.8rem .35rem .65rem; border:1px solid rgba(123,164,255,.2); border-radius:.75rem; background:linear-gradient(145deg,rgba(123,164,255,.09),rgba(255,255,255,.025) 55%,rgba(5,7,11,.82)); box-shadow:0 9px 0 -5px rgba(123,164,255,.28),0 15px 28px -19px rgba(123,164,255,.45),inset 0 1px rgba(255,255,255,.12); transform:rotateX(7deg) rotateY(-7deg); transition:transform .35s ease,border-color .35s ease,box-shadow .35s ease; }
  .skills__logo-tile:hover { transform:translateY(-4px) rotateX(0) rotateY(0); border-color:rgba(123,164,255,.55); box-shadow:0 12px 0 -6px rgba(123,164,255,.4),0 20px 32px -18px rgba(123,164,255,.55),inset 0 1px rgba(255,255,255,.18); }
  .skills__logo-mark { display:grid; place-items:center; width:2.65rem; height:2.65rem; border:1px solid rgba(190,211,255,.38); border-radius:.72rem; color:#e4edff; background:linear-gradient(145deg,#334765,#18253a 58%,#111821); box-shadow:0 5px 0 #0b111c,0 8px 14px rgba(0,0,0,.4),inset 0 1px rgba(255,255,255,.4); }
  .brand-mark { display:block; width:1.45rem; height:1.45rem; }
  .skills__logo-name { display:-webkit-box; width:100%; min-height:1.4rem; overflow:hidden; color:var(--fog,#9b9ea6); font:500 .57rem/1.2 var(--display,system-ui); text-align:center; -webkit-box-orient:vertical; -webkit-line-clamp:2; }
  .skills__group[data-frame-done="true"] .skills__group-top { opacity: 1; }
  .skills__group[data-details="true"] .skills__logos { animation: detail-build .6s ease .12s both; opacity: 1; }
  .skills__group[data-frame="true"] > .build-frame rect { animation: draw-svg-frame 3s linear both; }
  .skills__build [data-writing="true"] { animation: type-text var(--write-duration, 1400ms) steps(var(--write-steps, 32), end) both; opacity: 1; }
  .skills__group[data-details="true"] .skills__focus { animation: detail-build .55s ease both; }
  .skills__group[data-details="true"] .skills__items { animation: detail-build .65s ease .25s both; }
  @keyframes type-text { from { opacity: 0; clip-path: inset(0 100% 0 0); } to { opacity: 1; clip-path: inset(0); } }
  @keyframes detail-build { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes draw-svg-frame { to { stroke-dashoffset: 0; } }
  @keyframes reveal-finish-ring { 0% { opacity: 0; } 12% { opacity: 1; } 100% { opacity: 1; } }
  @keyframes draw-finish-circle { to { stroke-dashoffset: 0; } }
  .skills {
    padding: 6rem 1.5rem 2rem;
    max-width: 72rem;
    margin-inline: auto;
  }

  /* ── Header ─────────────────────────────────────────── */
  .skills__header { margin-bottom: 3rem; }

  .skills__eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    margin: 0 0 0.75rem;
  }

  .skills__title {
    font-size: clamp(1.75rem, 2.5vw, 2.25rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #f5f5f7;
    margin: 0 0 0.75rem;
  }
  .skills__title span { color: #8b5cf6; }

  .skills__intro {
    max-width: 34rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.55);
    margin: 0;
  }

  /* ── Grid ───────────────────────────────────────────── */
  .skills__grid {
    display: grid;
    gap: 1rem;
    grid-template-columns: 1fr;
    list-style: none;
    padding: 0;
    margin: 0;
  }
  @media (min-width: 640px) { .skills__grid { grid-template-columns: 1fr 1fr; } }

  /* ── Group card ─────────────────────────────────────── */
  .skills__group {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: 1.35rem 1.4rem 1.4rem;
    border-radius: 1rem;
    background: radial-gradient(100% 75% at 0% 0%, rgba(123,164,255,.09) 0%, transparent 70%),linear-gradient(145deg,rgba(255,255,255,.035),rgba(255,255,255,.012));
    border: 1px solid rgba(255, 255, 255, 0.09);
    box-shadow:inset 0 1px rgba(255,255,255,.04),0 20px 50px -40px rgba(123,164,255,.3);
    transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
  }
  .skills__group:hover {
    border-color: rgba(123,164,255,.32);
    background:radial-gradient(100% 75% at 0% 0%, rgba(123,164,255,.12) 0%, transparent 70%),linear-gradient(145deg,rgba(255,255,255,.045),rgba(255,255,255,.012));
    transform: translateY(-3px);
  }

  .skills__group-top {
    display: grid;
    grid-template-columns: auto 1fr auto;
    align-items: center;
    gap: 0.8rem;
  }

  .skills__index {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: rgba(165, 190, 240, 0.85);
  }

  .skills__group-title {
    margin: 0;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #f5f5f7;
  }

  .skills__focus {
    margin: 0;
    font-size: 0.82rem;
    line-height: 1.55;
    color: rgba(255, 255, 255, 0.55);
  }

  /* ── Chips ──────────────────────────────────────────── */
  .skills__items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    list-style: none;
    padding: 0.75rem 0 0;
    margin: auto 0 0;
    border-top: 1px solid rgba(255, 255, 255, 0.05);
  }

  .skills__chip {
    font-size: 0.7rem;
    font-weight: 500;
    padding: 0.24rem 0.6rem;
    border-radius: 6px;
    white-space: nowrap;
    color: rgba(226, 232, 240, 0.85);
    background: rgba(123,164,255,.07);
    border: 1px solid rgba(123,164,255,.16);
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
  }
  .skills__group:hover .skills__chip {
    background: rgba(123,164,255,.15);
    border-color: rgba(123,164,255,.32);
    color: #f5f5f7;
  }

  @media (prefers-reduced-motion: reduce) {
    .skills__group, .skills__chip, .skills__logo-tile { transition: none; }
    .skills__group, .skills__eyebrow, .skills__title, .skills__intro,
    .skills__group-title, .skills__focus, .skills__items, .skills__logos { opacity: 1; transform: none; clip-path: none; animation: none !important; }
    .build-pointer { display: none; }
    .build-frame rect { stroke-dashoffset: 0; }
    .skills__group:hover { transform: none; }
  }
`;
