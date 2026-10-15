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

      {/* Back */}
      <Link href="/#work" className="slug__back">
        <span className="slug__back-arrow" aria-hidden="true">←</span>
        All work
      </Link>

      {/* Hero */}
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

      {/* Meta */}
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

      {/* Overview */}
      {project.overview && project.overview.length > 0 && (
        <section className="slug__overview">
          {project.overview.map((para, i) => (
            <p key={i} className="slug__para">{para}</p>
          ))}
        </section>
      )}

      {/* Highlights */}
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

      {/* Stack */}
      <section className="slug__section">
        <h2 className="slug__section-title">Stack</h2>
        <ul className="slug__chips">
          {project.stack.map((tech) => (
            <li key={tech} className="slug__chip">{tech}</li>
          ))}
        </ul>
      </section>

      {/* Live link */}
      {project.url && (
        <div className="slug__cta-wrap">
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="slug__cta"
          >
            Visit live site
            <span aria-hidden>↗</span>
          </a>
        </div>
      )}

      {/* Prev / Next */}
      <nav className="slug__nav">
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
  .slug {
    max-width: 48rem;
    margin-inline: auto;
    padding: 6rem 1.5rem 8rem;
    color: #f5f5f7;
  }

  /* ── Back ─────────────────────────────────────────────── */
  .slug__back {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.85rem;
    color: rgba(255, 255, 255, 0.5);
    text-decoration: none;
    transition: color 0.25s ease;
  }
  .slug__back:hover { color: #f5f5f7; }

  .slug__back-arrow {
    display: inline-block;
    transition: transform 0.25s ease;
  }
  .slug__back:hover .slug__back-arrow {
    transform: translateX(-3px);
  }

  /* ── Hero ─────────────────────────────────────────────── */
  .slug__hero { margin-top: 2.5rem; }

  .slug__status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #6ee7b7;
    margin: 0 0 1rem;
  }

  .slug__status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #10b981;
    box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
    animation: slug-pulse 2.4s ease-in-out infinite;
  }

  @keyframes slug-pulse {
    0%, 100% { box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15); }
    50%      { box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.08); }
  }

  .slug__title {
    margin: 0;
    font-size: clamp(2rem, 4.5vw, 2.75rem);
    font-weight: 600;
    letter-spacing: -0.02em;
    line-height: 1.1;
    background: linear-gradient(180deg, #ffffff 0%, #b8b8c0 100%);
    -webkit-background-clip: text;
            background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  .slug__summary {
    margin: 1.25rem 0 0;
    max-width: 40rem;
    font-size: 1.05rem;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.6);
  }

  /* ── Meta ─────────────────────────────────────────────── */
  .slug__meta {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin: 2.5rem 0 0;
    padding: 1.5rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  }
  @media (min-width: 640px) {
    .slug__meta { grid-template-columns: 1fr 1fr 1fr; }
    .slug__meta-cell--wide { grid-column: auto; }
  }
  .slug__meta-cell--wide { grid-column: span 2; }

  .slug__meta-label {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin: 0;
  }

  .slug__meta-value {
    margin: 0.4rem 0 0;
    font-size: 0.9rem;
    font-weight: 500;
    color: #f5f5f7;
  }

  /* ── Overview ─────────────────────────────────────────── */
  .slug__overview {
    display: flex;
    flex-direction: column;
    gap: 1.15rem;
    margin-top: 3.5rem;
  }

  .slug__para {
    margin: 0;
    font-size: 1rem;
    line-height: 1.7;
    color: rgba(255, 255, 255, 0.72);
  }

  /* ── Section ──────────────────────────────────────────── */
  .slug__section { margin-top: 4rem; }

  .slug__section-title {
    font-size: 0.7rem;
    font-weight: 500;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
    margin: 0 0 1.5rem;
  }

  /* ── Highlights ───────────────────────────────────────── */
  .slug__highlights {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 0.85rem;
  }

  .slug__highlight {
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 1rem;
    padding: 1.25rem 1.35rem;
    border-radius: 16px;
    background:
      linear-gradient(180deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%);
    border: 1px solid rgba(255, 255, 255, 0.07);
    transition: border-color 0.3s ease, background 0.3s ease;
  }
  @media (min-width: 640px) {
    .slug__highlight { gap: 1.5rem; padding: 1.5rem 1.6rem; }
  }
  .slug__highlight:hover {
    border-color: rgba(139, 92, 246, 0.35);
    background:
      linear-gradient(180deg, rgba(99, 102, 241, 0.06) 0%, rgba(139, 92, 246, 0.03) 100%);
  }

  .slug__highlight-index {
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    color: #ffffff;
    font-size: 0.7rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    box-shadow: 0 4px 14px -4px rgba(99, 102, 241, 0.6);
  }

  .slug__highlight-title {
    margin: 0;
    font-size: 0.98rem;
    font-weight: 600;
    letter-spacing: -0.005em;
    color: #f5f5f7;
  }

  .slug__highlight-body {
    margin: 0.5rem 0 0;
    font-size: 0.88rem;
    line-height: 1.65;
    color: rgba(255, 255, 255, 0.6);
  }

  /* ── Chips ────────────────────────────────────────────── */
  .slug__chips {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .slug__chip {
    font-size: 0.72rem;
    font-weight: 500;
    padding: 0.28rem 0.7rem;
    border-radius: 999px;
    color: rgba(226, 232, 240, 0.9);
    background: rgba(99, 102, 241, 0.1);
    border: 1px solid rgba(99, 102, 241, 0.2);
    white-space: nowrap;
  }

  /* ── Live CTA ─────────────────────────────────────────── */
  .slug__cta-wrap { margin-top: 3rem; }

  .slug__cta {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.7rem 1.25rem;
    border-radius: 999px;
    font-size: 0.85rem;
    font-weight: 500;
    color: #ffffff;
    text-decoration: none;
    background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
    box-shadow: 0 10px 30px -12px rgba(99, 102, 241, 0.6);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .slug__cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 16px 40px -12px rgba(139, 92, 246, 0.7);
  }

  /* ── Prev / Next ──────────────────────────────────────── */
  .slug__nav {
    display: grid;
    gap: 0.85rem;
    margin-top: 5rem;
    padding-top: 2rem;
    border-top: 1px solid rgba(255, 255, 255, 0.08);
  }
  @media (min-width: 640px) {
    .slug__nav { grid-template-columns: 1fr 1fr; }
  }

  .slug__nav-card {
    display: block;
    padding: 1.1rem 1.25rem;
    border-radius: 16px;
    border: 1px solid rgba(255, 255, 255, 0.08);
    background: rgba(255, 255, 255, 0.02);
    text-decoration: none;
    color: inherit;
    transition: border-color 0.3s ease, background 0.3s ease;
  }
  .slug__nav-card:hover {
    border-color: rgba(139, 92, 246, 0.4);
    background: rgba(99, 102, 241, 0.05);
  }
  .slug__nav-card--next { text-align: right; }

  .slug__nav-label {
    font-size: 0.68rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.4);
  }

  .slug__nav-name {
    margin: 0.4rem 0 0;
    font-size: 0.95rem;
    font-weight: 500;
    color: #f5f5f7;
  }

  /* ── Reduced motion ───────────────────────────────────── */
  @media (prefers-reduced-motion: reduce) {
    .slug__back-arrow, .slug__cta, .slug__highlight, .slug__nav-card { transition: none; }
    .slug__cta:hover { transform: none; }
    .slug__status-dot { animation: none; }
  }
`;