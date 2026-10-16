import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/data/site";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.name} · Case study`,
    description: project.summary,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const index = projects.findIndex((p) => p.slug === slug);
  if (index === -1) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const prev = projects[(index - 1 + projects.length) % projects.length];

  return (
    <article className="slug">
      <style>{css}</style>

      <Link href="/#work" className="slug__back">
        <span className="slug__back-arrow" aria-hidden="true">←</span>
        All work
      </Link>

      <header className="slug__hero">
        {project.status && (
          <p className="slug__status">
            <span className="slug__status-dot" aria-hidden="true" />
            {project.status}
          </p>
        )}
        <h1 className="slug__title">{project.name}</h1>
        <p className="slug__summary">{project.summary}</p>
      </header>

      <dl className="slug__meta">
        {project.year && (
          <div className="slug__meta-cell">
            <dt className="slug__meta-label">Year</dt>
            <dd className="slug__meta-value">{project.year}</dd>
          </div>
        )}
        {project.role && (
          <div className="slug__meta-cell">
            <dt className="slug__meta-label">Role</dt>
            <dd className="slug__meta-value">{project.role}</dd>
          </div>
        )}
        <div className="slug__meta-cell slug__meta-cell--wide">
          <dt className="slug__meta-label">Stack</dt>
          <dd className="slug__meta-value">
            {project.stack.slice(0, 3).join(" · ")}
          </dd>
        </div>
      </dl>

      {project.overview && project.overview.length > 0 && (
        <section className="slug__overview">
          {project.overview.map((para, i) => (
            <p key={i} className="slug__para">{para}</p>
          ))}
        </section>
      )}

      {project.highlights && project.highlights.length > 0 && (
        <section className="slug__section">
          <h2 className="slug__section-title">What made it interesting</h2>
          <ul className="slug__highlights">
            {project.highlights.map((h, i) => (
              <li key={h.title} className="slug__highlight">
                <span className="slug__highlight-index" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="slug__highlight-title">{h.title}</h3>
                  <p className="slug__highlight-body">{h.body}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="slug__section">
        <h2 className="slug__section-title">Stack</h2>
        <ul className="slug__chips">
          {project.stack.map((tech) => (
            <li key={tech} className="slug__chip">{tech}</li>
          ))}
        </ul>
      </section>

      {project.url && (
        <div className="slug__cta-wrap">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="slug__cta"
          >
            <span>Visit live site</span>
            <span className="slug__cta-icon" aria-hidden="true">↗</span>
          </a>
        </div>
      )}

      <nav className="slug__nav" aria-label="Project navigation">
        <Link href={`/projects/${prev.slug}`} className="slug__nav-card">
          <span className="slug__nav-label">← Previous</span>
          <p className="slug__nav-name">{prev.name}</p>
        </Link>
        <Link
          href={`/projects/${next.slug}`}
          className="slug__nav-card slug__nav-card--next"
        >
          <span className="slug__nav-label">Next →</span>
          <p className="slug__nav-name">{next.name}</p>
        </Link>
      </nav>
    </article>
  );
}

const css = `
  /* ═══════════════════════════════════════════════════════════
     SHELL + AMBIENT BACKGROUND
     ═══════════════════════════════════════════════════════════ */
  .slug {
    position: relative;
    max-width: 52rem;
    margin-inline: auto;
    padding: 6.5rem 1.5rem 8rem;
    color: #f5f5f7;
    isolation: isolate;
  }
  .slug::before {
    content: "";
    position: fixed;
    inset: 0;
    z-index: -1;
    pointer-events: none;
    background:
      radial-gradient(70% 55% at 12% 10%, rgba(99,102,241,0.22) 0%, transparent 60%),
      radial-gradient(55% 45% at 92% 15%, rgba(168,85,247,0.20) 0%, transparent 60%),
      radial-gradient(45% 35% at 50% 92%, rgba(56,189,248,0.12) 0%, transparent 60%),
      #08080a;
  }

  /* ═══════════════════════════════════════════════════════════
     BACK BUTTON
     ═══════════════════════════════════════════════════════════ */
  .slug__back {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.5rem 1rem 0.5rem 0.75rem;
    border-radius: 999px;
    font-size: 0.8rem;
    font-weight: 500;
    letter-spacing: 0.02em;
    color: rgba(255,255,255,0.55);
    background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    text-decoration: none;
    transition: all 0.3s cubic-bezier(0.16,1,0.3,1);
  }
  .slug__back:hover {
    color: #fff;
    background: rgba(255,255,255,0.09);
    border-color: rgba(255,255,255,0.14);
    transform: translateY(-1px);
  }
  .slug__back-arrow { transition: transform 0.3s cubic-bezier(0.16,1,0.3,1); }
  .slug__back:hover .slug__back-arrow { transform: translateX(-3px); }

  /* ═══════════════════════════════════════════════════════════
     HERO
     ═══════════════════════════════════════════════════════════ */
  .slug__hero { margin-top: 2.75rem; }

  .slug__status {
    display: inline-flex;
    align-items: center;
    gap: 0.55rem;
    padding: 0.38rem 0.85rem;
    border-radius: 999px;
    background: rgba(16,185,129,0.08);
    border: 1px solid rgba(16,185,129,0.18);
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #6ee7b7;
    margin: 0 0 1.25rem;
  }
  .slug__status-dot {
    width: 6px; height: 6px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 0 3px rgba(16,185,129,0.15);
    animation: slug-pulse 2.4s ease-in-out infinite;
  }
  @keyframes slug-pulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(16,185,129,0.15); }
    50%      { box-shadow: 0 0 0 6px rgba(16,185,129,0.07); }
  }

  .slug__title {
    margin: 0;
    font-size: clamp(2.6rem, 6vw, 4rem);
    font-weight: 720;
    letter-spacing: -0.04em;
    line-height: 0.98;
    background: linear-gradient(180deg, #ffffff 0%, #a8a8b3 100%);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    word-wrap: break-word;
    overflow-wrap: anywhere;
  }

  .slug__summary {
    margin: 1.4rem 0 0;
    max-width: 42rem;
    font-size: clamp(1.05rem, 1.5vw, 1.2rem);
    line-height: 1.7;
    letter-spacing: -0.01em;
    color: rgba(255,255,255,0.58);
  }

  /* ═══════════════════════════════════════════════════════════
     META — glass block
     ═══════════════════════════════════════════════════════════ */
  .slug__meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1px;
    margin: 3rem 0 0;
    background: rgba(255,255,255,0.08);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 24px;
    overflow: hidden;
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }
  @media (min-width: 640px) {
    .slug__meta { grid-template-columns: 1fr 1fr 1fr; }
    .slug__meta-cell--wide { grid-column: auto; }
  }

  .slug__meta-cell {
    background: rgba(18,18,22,0.85);
    padding: 1.25rem 1.5rem;
    min-width: 0;
  }
  .slug__meta-cell--wide { grid-column: span 2; }

  .slug__meta-label {
    font-size: 0.66rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.32);
    margin: 0;
    font-weight: 600;
  }
  .slug__meta-value {
    margin: 0.5rem 0 0;
    font-size: 0.92rem;
    font-weight: 550;
    color: #f5f5f7;
    letter-spacing: -0.01em;
    word-break: break-word;
  }

  /* ═══════════════════════════════════════════════════════════
     OVERVIEW
     ═══════════════════════════════════════════════════════════ */
  .slug__overview {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin-top: 3.75rem;
  }
  .slug__para {
    margin: 0;
    font-size: 1.05rem;
    line-height: 1.85;
    color: rgba(255,255,255,0.72);
    letter-spacing: -0.01em;
  }
  .slug__para:first-child {
    font-size: 1.15rem;
    color: rgba(255,255,255,0.85);
    line-height: 1.75;
  }

  /* ═══════════════════════════════════════════════════════════
     SECTION HEADERS
     ═══════════════════════════════════════════════════════════ */
  .slug__section { margin-top: 5rem; }

  .slug__section-title {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 0.68rem;
    font-weight: 600;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.32);
    margin: 0 0 1.75rem;
  }
  .slug__section-title::after {
    content: "";
    height: 1px;
    flex: 1;
    background: linear-gradient(90deg, rgba(255,255,255,0.12), transparent);
  }

  /* ═══════════════════════════════════════════════════════════
     HIGHLIGHTS
     ═══════════════════════════════════════════════════════════ */
  .slug__highlights {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  .slug__highlight {
    position: relative;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1.35rem;
    padding: 1.6rem;
    border-radius: 20px;
    background: linear-gradient(180deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%);
    border: 1px solid rgba(255,255,255,0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: all 0.5s cubic-bezier(0.16,1,0.3,1);
    overflow: hidden;
    isolation: isolate;
  }
  .slug__highlight::before {
    content: "";
    position: absolute;
    inset: 0;
    opacity: 0;
    pointer-events: none;
    background: radial-gradient(500px circle at 0% 0%, rgba(99,102,241,0.12), transparent 60%);
    transition: opacity 0.5s ease;
    z-index: -1;
  }
  .slug__highlight:hover {
    transform: translateY(-2px);
    border-color: rgba(139,92,246,0.38);
    background: linear-gradient(180deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 100%);
    box-shadow: 0 20px 50px -22px rgba(99,102,241,0.5);
  }
  .slug__highlight:hover::before { opacity: 1; }

  .slug__highlight-index {
    width: 2.3rem;
    height: 2.3rem;
    display: grid;
    place-items: center;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: #fff;
    font-size: 0.72rem;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    box-shadow:
      0 8px 20px -8px rgba(99,102,241,0.7),
      inset 0 1px 0 rgba(255,255,255,0.2);
    flex-shrink: 0;
  }

  .slug__highlight-title {
    margin: 0;
    font-size: 1.02rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #f5f5f7;
    line-height: 1.35;
  }

  .slug__highlight-body {
    margin: 0.55rem 0 0;
    font-size: 0.9rem;
    line-height: 1.7;
    color: rgba(255,255,255,0.62);
    letter-spacing: -0.005em;
  }

  /* ═══════════════════════════════════════════════════════════
     STACK CHIPS
     ═══════════════════════════════════════════════════════════ */
  .slug__chips {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .slug__chip {
    display: inline-flex;
    align-items: center;
    padding: 0.42rem 0.9rem;
    border-radius: 999px;
    font-size: 0.78rem;
    font-weight: 500;
    letter-spacing: -0.005em;
    color: rgba(226,232,240,0.9);
    background: rgba(99,102,241,0.09);
    border: 1px solid rgba(99,102,241,0.2);
    white-space: nowrap;
    transition: background 0.3s ease, border-color 0.3s ease, color 0.3s ease;
  }
  .slug__chip:hover {
    background: rgba(99,102,241,0.18);
    border-color: rgba(139,92,246,0.4);
    color: #ffffff;
  }

  /* ═══════════════════════════════════════════════════════════
     LIVE CTA
     ═══════════════════════════════════════════════════════════ */
  .slug__cta-wrap { margin-top: 3rem; }

  .slug__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    padding: 0.85rem 1.4rem;
    border-radius: 999px;
    font-size: 0.88rem;
    font-weight: 600;
    letter-spacing: -0.005em;
    color: #ffffff;
    text-decoration: none;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    box-shadow:
      0 12px 32px -12px rgba(99,102,241,0.65),
      inset 0 1px 0 rgba(255,255,255,0.2);
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1), box-shadow 0.3s ease;
  }
  .slug__cta:hover {
    transform: translateY(-2px);
    box-shadow:
      0 20px 45px -14px rgba(139,92,246,0.75),
      inset 0 1px 0 rgba(255,255,255,0.25);
  }
  .slug__cta-icon {
    transition: transform 0.3s cubic-bezier(0.16,1,0.3,1);
    display: inline-block;
  }
  .slug__cta:hover .slug__cta-icon { transform: translate(3px, -3px); }

  /* ═══════════════════════════════════════════════════════════
     PREV / NEXT
     ═══════════════════════════════════════════════════════════ */
  .slug__nav {
    display: grid;
    gap: 0.85rem;
    margin-top: 6rem;
    padding-top: 2.5rem;
    border-top: 1px solid rgba(255,255,255,0.08);
  }
  @media (min-width: 640px) {
    .slug__nav { grid-template-columns: 1fr 1fr; }
  }

  .slug__nav-card {
    display: block;
    padding: 1.25rem 1.4rem;
    border-radius: 18px;
    border: 1px solid rgba(255,255,255,0.08);
    background: linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
    text-decoration: none;
    color: inherit;
    transition: all 0.4s cubic-bezier(0.16,1,0.3,1);
    min-width: 0;
  }
  .slug__nav-card:hover {
    border-color: rgba(139,92,246,0.4);
    background: linear-gradient(180deg, rgba(99,102,241,0.08) 0%, rgba(139,92,246,0.04) 100%);
    transform: translateY(-2px);
    box-shadow: 0 20px 45px -20px rgba(99,102,241,0.5);
  }
  .slug__nav-card--next { text-align: right; }

  .slug__nav-label {
    display: block;
    font-size: 0.65rem;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.35);
  }

  .slug__nav-name {
    margin: 0.55rem 0 0;
    font-size: 1rem;
    font-weight: 600;
    letter-spacing: -0.01em;
    color: #f5f5f7;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  /* ═══════════════════════════════════════════════════════════
     MOBILE POLISH
     ═══════════════════════════════════════════════════════════ */
  @media (max-width: 640px) {
    .slug { padding: 5.5rem 1.15rem 6rem; }
    .slug__title { line-height: 1.02; }
    .slug__highlight { padding: 1.35rem 1.25rem; gap: 1rem; }
    .slug__highlight-index { width: 2rem; height: 2rem; font-size: 0.68rem; }
    .slug__section { margin-top: 3.75rem; }
    .slug__nav { margin-top: 4.5rem; }
    .slug__cta { width: 100%; justify-content: center; }
    .slug__cta-wrap { display: block; }
  }

  /* ═══════════════════════════════════════════════════════════
     REDUCED MOTION
     ═══════════════════════════════════════════════════════════ */
  @media (prefers-reduced-motion: reduce) {
    .slug__back,
    .slug__back-arrow,
    .slug__highlight,
    .slug__chip,
    .slug__cta,
    .slug__cta-icon,
    .slug__nav-card {
      transition: none !important;
    }
    .slug__status-dot { animation: none; }
    .slug__highlight:hover,
    .slug__cta:hover,
    .slug__nav-card:hover,
    .slug__back:hover { transform: none; }
  }
`;