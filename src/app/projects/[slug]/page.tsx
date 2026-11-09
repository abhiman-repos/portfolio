import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, repoLabel } from "@/data/site";
import ProjectArtwork, { projectArtworkCss } from "@/components/ProjectArtwork";
import BrandMark from "@/components/BrandMark";

type Params = { slug: string };

export function generateStaticParams() {
  return projects.map(({ slug }) => ({ slug }));
}

function usableExternalUrl(value?: string) {
  if (!value || value.includes("…") || value.includes("...")) return undefined;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? parsed.toString() : undefined;
  } catch {
    return undefined;
  }
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = projects.find((item) => item.slug === slug);
  return project
    ? { title: `${project.name} · Case study`, description: project.summary }
    : { title: "Project not found" };
}

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = projects.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const project = projects[index];
  const next = projects[(index + 1) % projects.length];
  const previous = projects[(index - 1 + projects.length) % projects.length];
  const liveUrl = usableExternalUrl(project.url);
  const sourceUrl = usableExternalUrl(project.repo);
  const story = project.caseStudy;
  const steps = story
    ? [
        { key: "S", label: "Situation", text: story.situation },
        { key: "T", label: "Task", text: story.task },
        { key: "A", label: "Action", text: story.action },
        { key: "R", label: "Result", text: story.result },
      ]
    : [];

  return (
    <main className="case-study">
      <style>{`${styles}${projectArtworkCss}`}</style>
      <Link href="/#work" className="case-study__back"><span aria-hidden="true">←</span> Back to selected work</Link>

      <header className="case-study__hero">
        <div className="case-study__eyebrow"><span /> PROJECT / CASE STUDY</div>
        <div className="case-study__hero-row">
          <div>
            {project.status && <p className="case-study__status">{project.status}</p>}
            <h1>{project.name}</h1>
            <p className="case-study__summary">{project.summary}</p>
          </div>
          <span className="case-study__hero-index">{String(index + 1).padStart(2, "0")}<i> / 0{projects.length}</i></span>
        </div>
      </header>

      <ProjectArtwork slug={project.slug} variant="detail" />

      <dl className="case-study__meta">
        {project.year && <div><dt>Timeline</dt><dd>{project.year}</dd></div>}
        {project.role && <div><dt>My role</dt><dd>{project.role}</dd></div>}
        <div className="case-study__meta-stack"><dt>Core stack</dt><dd>{project.stack.slice(0, 4).join(" · ")}</dd></div>
      </dl>

      {steps.length > 0 && (
        <section className="case-study__story" aria-labelledby="case-study-story-title">
          <div className="case-study__section-head">
            <p>THE WORK, IN CONTEXT</p>
            <h2 id="case-study-story-title">A problem, a plan, and what I built.</h2>
          </div>
          <ol className="case-study__steps">
            {steps.map((step, i) => (
              <li key={step.key} className={`case-study__step case-study__step--${step.key.toLowerCase()}`}>
                <span className="case-study__step-key">{step.key}<i>0{i + 1}</i></span>
                <div><p>{step.label}</p><h3>{step.text}</h3></div>
              </li>
            ))}
          </ol>
        </section>
      )}

      <section className="case-study__stack" aria-labelledby="case-study-stack-title">
        <div className="case-study__section-head">
          <p>TOOLS & SYSTEMS</p>
          <h2 id="case-study-stack-title">Built with intention.</h2>
        </div>
          <ul>{project.stack.map((tech) => <li key={tech}><BrandMark name={tech} /><span>{tech}</span></li>)}</ul>
      </section>

      {(liveUrl || sourceUrl) && <div className="case-study__actions">
        {liveUrl && <a href={liveUrl} target="_blank" rel="noreferrer" className="case-study__button">Visit live site <span>↗</span></a>}
        {sourceUrl && <a href={sourceUrl} target="_blank" rel="noreferrer" className="case-study__button case-study__button--quiet">View source on {repoLabel(sourceUrl)} <span>↗</span></a>}
      </div>}

      <nav className="case-study__next" aria-label="More project case studies">
        <Link href={`/projects/${previous.slug}`}><span>← Previous case study</span><strong>{previous.name}</strong></Link>
        <Link href={`/projects/${next.slug}`}><span>Next case study →</span><strong>{next.name}</strong></Link>
      </nav>
    </main>
  );
}

const styles = `
  .case-study { --case-accent: var(--signal, #7ba4ff); position: relative; isolation: isolate; width: min(100% - 2.5rem, 65rem); margin: 0 auto; padding: 6.5rem 0 7rem; color: var(--bone, #ecebe7); }
  .case-study::before { content:""; position:fixed; inset:0; z-index:-1; pointer-events:none; background:radial-gradient(70% 55% at 85% 8%, rgba(123,164,255,.13), transparent 62%), radial-gradient(55% 50% at 8% 65%, rgba(123,164,255,.06), transparent 65%), #000; }
  .case-study__back { display:inline-flex; align-items:center; gap:.65rem; color:var(--fog,#9b9ea6); font:500 .82rem/1.2 var(--display,system-ui); transition:color .2s ease; }
  .case-study__back:hover { color:var(--bone,#ecebe7); }
  .case-study__back span { color:var(--case-accent); font-size:1.1rem; }
  .case-study__hero { margin-top:4.5rem; padding-bottom:2.5rem; border-bottom:1px solid var(--line,rgba(255,255,255,.14)); }
  .case-study__eyebrow,.case-study__section-head>p { display:flex; align-items:center; gap:.65rem; color:var(--case-accent); font:600 .68rem/1.3 var(--display,system-ui); letter-spacing:.17em; text-transform:uppercase; }
  .case-study__eyebrow span { width:.45rem; height:.45rem; border-radius:50%; background:var(--case-accent); box-shadow:0 0 18px var(--case-accent); }
  .case-study__hero-row { display:flex; align-items:end; justify-content:space-between; gap:2rem; margin-top:1.7rem; }
  .case-study__hero h1 { max-width:14ch; font-size:clamp(2.8rem,7vw,5.7rem); line-height:.98; letter-spacing:-.065em; }
  .case-study__status { width:max-content; margin:0 0 1.2rem; padding:.35rem .65rem; border:1px solid rgba(123,164,255,.24); border-radius:999px; color:#b9ceff; font:600 .65rem/1.2 var(--display,system-ui); letter-spacing:.08em; text-transform:uppercase; }
  .case-study__summary { max-width:42rem; margin-top:1.3rem; color:var(--fog,#9b9ea6); font:400 clamp(1.02rem,2vw,1.25rem)/1.65 var(--serif,Georgia); }
  .case-study__hero-index { flex:none; color:var(--bone,#ecebe7); font:500 clamp(2.5rem,5vw,4rem)/1 var(--display,system-ui); letter-spacing:-.07em; }
  .case-study__hero-index i { color:var(--fog,#9b9ea6); font-size:.85rem; font-style:normal; letter-spacing:0; }
  .case-study__meta { display:grid; grid-template-columns:1fr 1fr 2fr; margin-top:1.5rem; border:1px solid var(--line,rgba(255,255,255,.14)); border-radius:1.1rem; overflow:hidden; background:rgba(255,255,255,.025); }
  .case-study__meta>div { padding:1.15rem 1.3rem; border-right:1px solid var(--line,rgba(255,255,255,.14)); }
  .case-study__meta>div:last-child { border:0; }
  .case-study__meta dt { color:var(--fog,#9b9ea6); font:600 .63rem/1.2 var(--display,system-ui); letter-spacing:.14em; text-transform:uppercase; }
  .case-study__meta dd { margin-top:.55rem; color:var(--bone,#ecebe7); font:500 .9rem/1.4 var(--display,system-ui); }
  .case-study__story,.case-study__stack { margin-top:5rem; }
  .case-study__section-head { margin-bottom:1.55rem; }
  .case-study__section-head>p { margin-bottom:.75rem; color:var(--fog,#9b9ea6); }
  .case-study__section-head h2 { max-width:24ch; font-size:clamp(1.6rem,3vw,2.25rem); line-height:1.12; letter-spacing:-.045em; }
  .case-study__steps { display:grid; grid-template-columns:1fr 1fr; gap:.75rem; padding:0; list-style:none; counter-reset:case; }
  .case-study__step { position:relative; display:grid; grid-template-columns:3.6rem 1fr; gap:1.1rem; min-height:12rem; padding:1.5rem; border:1px solid rgba(255,255,255,.1); border-radius:1rem; background:linear-gradient(145deg,rgba(255,255,255,.055),rgba(255,255,255,.018)); overflow:hidden; }
  .case-study__step::after { content:""; position:absolute; right:-3.5rem; top:-4rem; width:10rem; aspect-ratio:1; border-radius:50%; background:radial-gradient(circle,rgba(123,164,255,.12),transparent 70%); pointer-events:none; }
  .case-study__step-key { display:grid; align-content:start; gap:.4rem; color:var(--case-accent); font:600 2.1rem/1 var(--display,system-ui); letter-spacing:-.08em; }
  .case-study__step-key i { font-size:.58rem; font-style:normal; letter-spacing:.12em; color:var(--fog,#9b9ea6); }
  .case-study__step>div>p { margin:0 0 .7rem; color:var(--fog,#9b9ea6); font:600 .68rem/1.2 var(--display,system-ui); letter-spacing:.15em; text-transform:uppercase; }
  .case-study__step h3 { max-width:48ch; color:var(--bone,#ecebe7); font:400 .95rem/1.7 var(--serif,Georgia); letter-spacing:0; }
  .case-study__step--r { border-color:rgba(123,164,255,.32); background:linear-gradient(145deg,rgba(123,164,255,.13),rgba(255,255,255,.025)); }
  .case-study__stack ul { display:flex; flex-wrap:wrap; gap:.55rem; padding:0; list-style:none; }
  .case-study__stack li { display:inline-flex; align-items:center; gap:.5rem; padding:.5rem .8rem; border:1px solid rgba(123,164,255,.22); border-radius:999px; color:#cbd8f3; background:rgba(123,164,255,.07); font:500 .78rem/1.2 var(--display,system-ui); }
  .case-study__stack li .brand-mark { width:1rem; height:1rem; flex:none; }
  .case-study__actions { display:flex; flex-wrap:wrap; gap:.7rem; margin-top:2.5rem; }
  .case-study__button { display:inline-flex; align-items:center; gap:.8rem; padding:.85rem 1.15rem; border:1px solid var(--case-accent); border-radius:999px; color:#05070c; background:var(--case-accent); font:600 .82rem/1 var(--display,system-ui); transition:transform .2s ease,background .2s ease; }
  .case-study__button:hover { transform:translateY(-2px); background:#a9c3ff; }
  .case-study__button--quiet { color:var(--bone,#ecebe7); background:rgba(255,255,255,.04); border-color:var(--line,rgba(255,255,255,.14)); }
  .case-study__button--quiet:hover { background:rgba(123,164,255,.1); }
  .case-study__next { display:grid; grid-template-columns:1fr 1fr; gap:1rem; margin-top:5rem; padding-top:1.2rem; border-top:1px solid var(--line,rgba(255,255,255,.14)); }
  .case-study__next a { display:grid; gap:.6rem; padding:1rem 0; }
  .case-study__next a:last-child { text-align:right; }
  .case-study__next span { color:var(--fog,#9b9ea6); font:600 .63rem/1.2 var(--display,system-ui); letter-spacing:.12em; text-transform:uppercase; }
  .case-study__next strong { color:var(--bone,#ecebe7); font:500 1rem/1.3 var(--display,system-ui); }
  .case-study__next a:hover strong { color:var(--case-accent); }
  @media(max-width:680px) { .case-study { width:min(100% - 2rem,65rem); padding-top:5.5rem; } .case-study__hero { margin-top:3.5rem; } .case-study__hero-row { align-items:start; } .case-study__hero-index { font-size:2rem; } .case-study__meta { grid-template-columns:1fr 1fr; } .case-study__meta>div:nth-child(2) { border-right:0; } .case-study__meta>div:last-child { grid-column:1/-1; border-top:1px solid var(--line,rgba(255,255,255,.14)); } .case-study__steps { grid-template-columns:1fr; } .case-study__step { min-height:unset; } .case-study__story,.case-study__stack { margin-top:3.5rem; } }
  @media(prefers-reduced-motion:reduce) { .case-study__back,.case-study__button { transition:none; } .case-study__button:hover { transform:none; } }
`;
