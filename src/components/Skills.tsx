import { skills } from "@/data/site";

export default function Skills() {
  return (
    <section id="skills" className="skills" aria-labelledby="skills-title">
      <style>{css}</style>

      <div className="skills__header">
        <p className="skills__eyebrow">TOOLKIT</p>
        <h2 id="skills-title" className="skills__title">
          What I use to build <span>.</span>
        </h2>
        <p className="skills__intro">
          Building intelligent applications from AI models and data pipelines to
          reliable backend systems and user-interface products.
        </p>
      </div>

      <ul className="skills__grid">
        {skills.map((group, i) => (
          <li key={group.title} className="skills__group">
            <div className="skills__group-top">
              <span className="skills__index" aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="skills__group-title">{group.title}</h3>
            </div>

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
    </section>
  );
}

const css = `
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
  @media (min-width: 640px) {
    .skills__grid { grid-template-columns: 1fr 1fr; }
  }
  @media (min-width: 1024px) {
    .skills__grid { grid-template-columns: 1fr 1fr 1fr; }
  }

  /* ── Group card ─────────────────────────────────────── */
  .skills__group {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    padding: 1.35rem 1.4rem 1.4rem;
    border-radius: 18px;
    background:
      radial-gradient(120% 90% at 0% 0%, rgba(99, 102, 241, 0.07) 0%, transparent 60%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.025) 0%, rgba(255, 255, 255, 0.01) 100%);
    border: 1px solid rgba(255, 255, 255, 0.07);
    transition: border-color 0.3s ease, background 0.3s ease, transform 0.3s ease;
  }
  .skills__group:hover {
    border-color: rgba(139, 92, 246, 0.35);
    background:
      radial-gradient(120% 90% at 0% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 60%),
      linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.012) 100%);
    transform: translateY(-2px);
  }

  .skills__group-top {
    display: flex;
    align-items: baseline;
    gap: 0.75rem;
  }

  .skills__index {
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.1em;
    font-variant-numeric: tabular-nums;
    color: rgba(165, 180, 252, 0.75);
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
    background: rgba(99, 102, 241, 0.08);
    border: 1px solid rgba(99, 102, 241, 0.16);
    transition: background 0.25s ease, border-color 0.25s ease, color 0.25s ease;
  }
  .skills__group:hover .skills__chip {
    background: rgba(99, 102, 241, 0.14);
    border-color: rgba(139, 92, 246, 0.3);
    color: #f5f5f7;
  }

  @media (prefers-reduced-motion: reduce) {
    .skills__group, .skills__chip { transition: none; }
    .skills__group:hover { transform: none; }
  }
`;
