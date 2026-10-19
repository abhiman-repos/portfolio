import Link from "next/link";
import { projects } from "@/data/site";
import SpotlightCard from "./SpotlightCard";

export default function Work() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <style>{css}</style>

      <div className="work__header">
        <p className="work__eyebrow">WHAT I HAVE BUILT</p>
        <h2 id="work-title" className="section-title">
          Projects <span>.</span>
        </h2>
        <p className="work__intro">
          A collection of ideas turned into practical products
          through AI engineering and full-stack development.
        </p>
      </div>

      <div className="work__grid">
        {projects.map((project, index) => (
          <SpotlightCard
            key={project.slug}
            className="work__card"
            theme="dark"
            spotlightColor="#d1c6c6"
            intensity={0.25}
            spotlightSize={140}
            softness={0.7}
            shape="circle"
            borderGlow={0.6}
            proximity={80}
            smoothing={0.3}
            grain={0}
            ambient={false}
            flare
          >
            <Link
              href={`/projects/${project.slug}`}
              className="work__link"
              aria-label={`${project.name} — view case study`}
            >
              {/* Top row */}
              <div className="work__top">
                <span className="work__index">
                  PROJECT / {String(index + 1).padStart(2, "0")}
                </span>
                <span className="work__arrow" aria-hidden="true">
                  ↗
                </span>
              </div>

              {/* Title */}
              <h3 className="work__name">{project.name}</h3>

              {/* Stack */}
              <ul className="work__chips" aria-label="Tech stack">
                {project.stack.map((tech) => (
                  <li key={tech} className="work__chip">
                    {tech}
                  </li>
                ))}
              </ul>

              {/* Deploy */}
              {project.deploy && (
                <p className="work__deploy">
                  <span className="work__dot" aria-hidden="true" />
                  Deployed on {project.deploy.platform}
                </p>
              )}

              {/* CTA */}
              <div className="work__footer">
                <span className="work__cta">Explore Deep about this project</span>
              </div>
            </Link>
          </SpotlightCard>
        ))}
      </div>
    </section>
  );
}

const css = `
  .work {
    padding: 6rem 1.5rem;
    max-width: 72rem;
    margin-inline: auto;
  }

  .work__card {
  border-radius: 5px !important;
  overflow: hidden;
  }

  .work__header {
    margin-bottom: 3rem;
  }

  .work__eyebrow {
    font-size: 0.7rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.5);
    margin: 0 0 0.75rem;
  }

  .section-title {
    font-size: clamp(1.75rem, 2.5vw, 2.25rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    color: #f5f5f7;
    margin: 0 0 0.75rem;
  }
  .section-title span { color: #8b5cf6; }

  .work__intro {
    max-width: 34rem;
    font-size: 0.95rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.42);
    margin: 0;
  }

  .work__grid {
    display: grid;
    gap: 1.25rem;
    grid-template-columns: 1fr;
  }
  @media (min-width: 900px) {
    .work__grid { grid-template-columns: 1fr 1fr; }
  }

  /* Card body link */
  .work__link {
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
    height: 100%;
    padding: 1.25rem;
    color: inherit;
    text-decoration: none;
  }

  .work__top {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .work__index {
    font-size: 0.68rem;
    letter-spacing: 0.12em;
    font-variant-numeric: tabular-nums;
    color: rgba(255, 255, 255, 0.45);
  }

  .work__arrow {
    font-size: 0.95rem;
    color: rgba(255, 255, 255, 0.4);
    transition: transform 0.3s ease, color 0.3s ease;
  }
  .work__link:hover .work__arrow {
    transform: translate(2px, -2px);
    color: #a5b4fc;
  }

  .work__name {
    margin: 0;
    font-size: 1.2rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #f5f5f7;
  }

  /* Stack chips */
  .work__chips {
    display: flex;
    flex-wrap: wrap;
    gap: 0.35rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .work__chip {
    font-size: 0.68rem;
    font-weight: 500;
    padding: 0.22rem 0.55rem;
    border-radius: 6px;
    color: rgba(226, 232, 240, 0.85);
    background: rgba(99, 102, 241, 0.08);
    border: 1px solid rgba(99, 102, 241, 0.18);
    white-space: nowrap;
    transition: background 0.3s ease, border-color 0.3s ease;
  }
  .work__link:hover .work__chip {
    background: rgba(99, 102, 241, 0.14);
    border-color: rgba(139, 92, 246, 0.32);
  }

  /* Deploy badge */
.work__deploy {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  margin: 0.15rem 0 0;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.01em;
  color: #6ee7b7;
}

/* Solid core + two expanding rings */
.work__dot {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, #a7f3d0 0%, #10b981 55%, #059669 100%);
  box-shadow:
    0 0 0 1px rgba(16, 185, 129, 0.35),
    0 0 8px 1px rgba(16, 185, 129, 0.55),
    0 0 16px 2px rgba(16, 185, 129, 0.25);
}

/* Ring 1 — primary pulse */
.work__dot::before,
.work__dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid #10b981;
  opacity: 0;
  pointer-events: none;
}

.work__dot::before {
  animation: work-ripple 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
}

/* Ring 2 — delayed for depth */
.work__dot::after {
  animation: work-ripple 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
  animation-delay: 1.1s;
}

@keyframes work-ripple {
  0% {
    transform: scale(1);
    opacity: 0.9;
    border-width: 2px;
  }
  70% {
    opacity: 0.15;
    border-width: 1px;
  }
  100% {
    transform: scale(3.5);
    opacity: 0;
    border-width: 0.5px;
  }
}

/* Breathing glow on the core itself */
@keyframes work-breathe {
  0%, 100% {
    box-shadow:
      0 0 0 1px rgba(16, 185, 129, 0.35),
      0 0 8px 1px rgba(16, 185, 129, 0.55),
      0 0 16px 2px rgba(16, 185, 129, 0.25);
  }
  50% {
    box-shadow:
      0 0 0 1px rgba(16, 185, 129, 0.5),
      0 0 12px 2px rgba(16, 185, 129, 0.7),
      0 0 22px 4px rgba(16, 185, 129, 0.35);
  }
}

.work__dot {
  animation: work-breathe 2.2s ease-in-out infinite;
}

@media (prefers-reduced-motion: reduce) {
  .work__dot,
  .work__dot::before,
  .work__dot::after {
    animation: none;
  }
  .work__dot {
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
  }
}

  /* Footer */
  .work__footer {
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.06);
  }

  .work__cta {
    font-size: 0.75rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.5);
    transition: color 0.3s ease;
  }
  .work__link:hover .work__cta { color: #a5b4fc; }

  @media (prefers-reduced-motion: reduce) {
    .work__arrow, .work__chip, .work__cta { transition: none; }
    .work__dot { animation: none; }
    .work__link:hover .work__arrow { transform: none; }
  }
`;