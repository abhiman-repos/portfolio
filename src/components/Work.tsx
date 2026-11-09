import Link from "next/link";
import { projects } from "@/data/site";
import SpotlightCard from "./SpotlightCard";
import BuildReveal, { BuildFrame } from "./BuildReveal";
import ProjectArtwork, { projectArtworkCss } from "./ProjectArtwork";
import BrandMark, { getTechnologyBrand } from "./BrandMark";

export default function Work() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <style>{`${css}${projectArtworkCss}`}</style>

      <BuildReveal className="work__build" label="projects">
        <div className="work__header">
          <p className="work__eyebrow">WHAT I HAVE BUILT<BuildPointer name="01 / label" action="type" /></p>
          <h2 id="work-title" className="section-title">
            Projects <span>.</span>
            <BuildPointer name="02 / headline" action="type" delay={120} />
          </h2>
          <p className="work__intro">
            Products I’ve designed and built—from grounded AI systems to full-stack tools made for real workflows.
            <BuildPointer name="03 / copy" action="type" delay={220} />
          </p>
        </div>

        <div className="work__grid">
        {projects.map((project, index) => {
          const brandStack = project.stack.filter((tech) => getTechnologyBrand(tech)).slice(0, 3);
          const otherStack = project.stack.filter((tech) => !brandStack.includes(tech)).slice(0, 3);
          return (
          <SpotlightCard
            key={project.slug}
            className={`work__card work__card--${index + 1}`}
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
              <BuildFrame />
              <BuildPointer
                name={`box ${String(index + 4).padStart(2, "0")}`}
                action="frame-type"
                target=".work__name"
                delay={450 + index * 180}
              />
              <ProjectArtwork slug={project.slug} />
              {/* Top row */}
              <div className="work__top">
                <span className="work__index">
                  PROJECT / {String(index + 1).padStart(2, "0")}
                </span>
                <div className="work__top-right">
                  {project.status && <span className="work__status"><i />{project.status}</span>}
                  <span className="work__arrow" aria-hidden="true">↗</span>
                </div>
              </div>

              {/* Title */}
              <h3 className="work__name">{project.name}</h3>
              <p className="work__byline">{project.role}{project.year ? ` · ${project.year}` : ""}</p>
              <p className="work__summary">{project.summary}</p>

              {/* Stack */}
              <div className="work__stack-build">
                <BuildFrame />
                {index === 0 && <BuildPointer name="08 / stack" action="frame" delay={1050} />}
                <ul className="work__brand-tools" aria-label="Main technology logos">
                  {brandStack.map((tech) => (
                    <li className="work__brand-tool" key={tech} title={tech}>
                      <BrandMark name={tech} />
                      <span>{tech}</span>
                    </li>
                  ))}
                </ul>
                <ul className="work__chips" aria-label="Additional technology stack">
                  {otherStack.map((tech) => (
                    <li key={tech} className="work__chip">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Deploy */}
              {project.deploy && (
                <p className="work__deploy">
                  <span className="work__dot" aria-hidden="true" />
                  Deployed on {project.deploy.platform}
                </p>
              )}

              {/* CTA */}
              <div className="work__footer">
                <BuildFrame />
                {index === 1 && <BuildPointer name="09 / details" action="frame" delay={1350} />}
                <span className="work__cta">Read the case study</span>
              </div>
            </Link>
          </SpotlightCard>
          );
        })}
        </div>
      </BuildReveal>
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
  .work__build .build-pointer { position: absolute; z-index: 5; top: 0; left: 0; display: flex; align-items: flex-start; gap: .25rem; opacity: 0; pointer-events: none; font: 600 .58rem/1 ui-monospace, SFMono-Regular, Menlo, monospace; filter: drop-shadow(0 2px 5px #000); }
  .work__build .build-pointer svg { width: 23px; height: 31px; flex: 0 0 auto; overflow: visible; }
  .work__build .build-pointer { color: var(--cursor-color, #31c8ff); }
  .work__build .build-pointer > svg:not(.build-pointer__ring) path { fill: var(--cursor-color, #31c8ff); stroke: #101018; stroke-width: 1.7px; stroke-linejoin: round; }
  .work__build .build-pointer b { padding: .32rem .42rem; border-radius: 3px; background: var(--cursor-color, #31c8ff); color: #111; white-space: nowrap; font-weight: 750; }
  .work__build .build-pointer .build-pointer__ring { position: absolute; left: -7px; top: -7px; width: 36px; height: 36px; overflow: visible; opacity: 0; pointer-events: none; }
  .work__build .build-pointer__ring circle { stroke: var(--cursor-color, #31c8ff); stroke-width: 2.5px; stroke-dasharray: 95; stroke-dashoffset: 95; filter: drop-shadow(0 0 5px var(--cursor-color, #31c8ff)); transform: rotate(-90deg); transform-origin: 18px 18px; }
  .work__build .build-pointer[data-finishing="true"] > svg:not(.build-pointer__ring), .work__build .build-pointer[data-finishing="true"] b { opacity: 0; }
  .work__build .build-pointer[data-finishing="true"] .build-pointer__ring { animation: reveal-finish-ring .9s ease-out both; }
  .work__build .build-pointer[data-finishing="true"] .build-pointer__ring circle { animation: draw-finish-circle .85s ease-out both; }
  .work__build .build-frame { position: absolute; inset: 0; z-index: 1; pointer-events: none; }
  .work__build .build-frame svg { display: block; width: 100%; height: 100%; overflow: visible; }
  .work__build .build-frame rect { fill: none; stroke: var(--build-color, rgba(165,180,252,.65)); stroke-width: 1.5px; vector-effect: non-scaling-stroke; stroke-dasharray: 1000; stroke-dashoffset: 1000; filter: drop-shadow(0 0 3px var(--build-color, transparent)); }
  .work__build .work__eyebrow, .work__build .section-title { position: relative; width: fit-content; max-width: 100%; }
  .work__build .work__intro { position: relative; }
  .work__build .work__card { position: relative; background: #111 !important; }
  .work__build[data-build-ready="true"] .work__card { border-color: transparent !important; }
  .work__build .work__link { position: relative; }
  .work__build .work__stack-build, .work__build .work__footer { position: relative; }
  .work__build .work__stack-build .build-frame { inset: -5px; }
  .work__build[data-build-ready="true"] .work__eyebrow,
  .work__build[data-build-ready="true"] .section-title,
  .work__build[data-build-ready="true"] .work__intro { opacity: 0; }
  .work__build[data-build-ready="true"] .work__top,
  .work__build[data-build-ready="true"] .work__name,
  .work__build[data-build-ready="true"] .work__chips,
  .work__build[data-build-ready="true"] .work__deploy,
  .work__build[data-build-ready="true"] .work__cta { opacity: 0; }
  .work__build[data-build-ready="true"][data-built="false"] .work__card .work__link > :not(.build-pointer) { opacity: 0; }
  .work__build .work__grid { position: relative; }
  .work__build [data-writing="true"] { animation: type-text var(--write-duration, 1400ms) steps(var(--write-steps, 32), end) both; opacity: 1; }
  .work__build .work__link[data-frame="true"] > .build-frame rect,
  .work__build .work__stack-build[data-frame="true"] > .build-frame rect,
  .work__build .work__footer[data-frame="true"] > .build-frame rect { animation: draw-svg-frame 3s linear both; }
  .work__build .work__link[data-frame-done="true"] .work__top { animation: detail-build .45s ease both; opacity: 1; }
  .work__build .work__link[data-details="true"] .work__chips,
  .work__build .work__link[data-details="true"] .work__footer .work__cta { animation: detail-build .55s ease both; opacity: 1; }
  .work__build .work__link[data-details="true"] .work__deploy { animation: detail-build .5s ease both; opacity: 1; }
  .work__build .work__stack-build[data-details="true"] .work__chips { animation: detail-build .55s ease both; opacity: 1; position: relative; z-index: 2; }
  .work__build .work__footer[data-details="true"] .work__cta { animation: detail-build .5s ease both; opacity: 1; position: relative; z-index: 2; }
  @keyframes type-text { from { opacity: 0; clip-path: inset(0 100% 0 0); } to { opacity: 1; clip-path: inset(0); } }
  @keyframes detail-build { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
  @keyframes draw-svg-frame { to { stroke-dashoffset: 0; } }
  @keyframes reveal-finish-ring { 0% { opacity: 0; } 12% { opacity: 1; } 100% { opacity: 1; } }
  @keyframes draw-finish-circle { to { stroke-dashoffset: 0; } }
  .work {
    padding: 6rem 1.5rem;
    max-width: 72rem;
    margin-inline: auto;
  }

  .work__card {
  border-radius: 16px !important;
  overflow: hidden;
  }
  .work__link { gap: .8rem; padding: 1.1rem; }
  .work__top { margin-top: .1rem; }
  .work__top-right { display:flex; align-items:center; gap:.75rem; }
  .work__status { display:inline-flex; align-items:center; gap:.4rem; color:rgba(200,218,255,.74); font:600 .56rem/1.2 var(--display,system-ui); letter-spacing:.1em; text-transform:uppercase; }
  .work__status i { width:.35rem; height:.35rem; border-radius:50%; background:var(--signal,#7ba4ff); box-shadow:0 0 10px var(--signal,#7ba4ff); }
  .work__name { margin-top: .1rem; font-size: clamp(1.2rem,2vw,1.55rem); letter-spacing: -.035em; }
  .work__byline { color:rgba(123,164,255,.84); font:600 .63rem/1.3 var(--display,system-ui); letter-spacing:.04em; }
  .work__summary { max-width: 42rem; color: rgba(236,235,231,.58); font: 400 .91rem/1.55 var(--serif,Georgia); }
  .work__chips { gap: .4rem; }
  .work__brand-tools { display:flex; flex-wrap:wrap; align-items:center; gap:.55rem; padding:0; margin:.15rem 0 0; list-style:none; }
  .work__brand-tool { display:inline-flex; align-items:center; gap:.4rem; padding:.34rem .56rem; border:1px solid rgba(255,255,255,.1); border-radius:999px; color:rgba(236,235,231,.78); background:rgba(255,255,255,.035); font:500 .62rem/1.2 var(--display,system-ui); }
  .work__brand-tool .brand-mark { width:1rem; height:1rem; flex:none; }
  .work__build[data-build-ready="true"] .work__byline,.work__build[data-build-ready="true"] .work__brand-tools { opacity:0; }
  .work__chip { padding: .28rem .62rem; border-radius: 999px; color: rgba(220,231,251,.84); background: rgba(123,164,255,.07); border-color: rgba(123,164,255,.2); }
  .work__link:hover .work__chip { background: rgba(123,164,255,.14); border-color: rgba(123,164,255,.35); }
  .work__build[data-build-ready="true"] .work__summary { opacity: 0; }
  .work__build .work__link[data-frame-done="true"] .work__summary,.work__build .work__link[data-frame-done="true"] .work__byline { animation: detail-build .5s ease both; opacity: 1; }
  .work__build .work__link[data-details="true"] .work__brand-tools,.work__build .work__stack-build[data-details="true"] .work__brand-tools { animation: detail-build .55s ease .12s both; opacity: 1; }
  .work__deploy { color: #c2d5ff; font-family: var(--display,system-ui); }
  .work__dot,.work__dot::before,.work__dot::after { background: var(--signal,#7ba4ff); border-color: var(--signal,#7ba4ff); }
  .work__footer { margin-top: auto; padding-top: .9rem; border-color: rgba(255,255,255,.1); }
  .work__cta { color: rgba(236,235,231,.64); font:600 .72rem/1.3 var(--display,system-ui); letter-spacing:.01em; }
  .work__link:hover .work__cta,.work__link:hover .work__arrow { color: var(--signal,#7ba4ff); }

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
    .work__build .work__eyebrow, .work__build .section-title, .work__build .work__intro, .work__build .work__card,
    .work__build .work__top, .work__build .work__name, .work__build .work__chips,
    .work__build .work__deploy, .work__build .work__cta { opacity: 1; transform: none; clip-path: none; animation: none !important; border-color: rgba(255,255,255,.09) !important; }
    .work__build .work__card .work__link > :not(.build-pointer) { opacity: 1; animation: none !important; }
    .work__build .build-pointer { display: none; }
    .work__build .build-frame rect { stroke-dashoffset: 0; }
    .work__arrow, .work__chip, .work__cta { transition: none; }
    .work__dot { animation: none; }
    .work__link:hover .work__arrow { transform: none; }
  }
`;
