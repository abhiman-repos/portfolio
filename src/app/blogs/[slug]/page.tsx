import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/blogs";

type Params = { slug: string };

export function generateStaticParams() {
  return articles.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return article
    ? { title: `${article.title} · Abhiman`, description: article.summary }
    : { title: "Note not found · Abhiman" };
}

export default async function BlogArticlePage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const index = articles.findIndex((item) => item.slug === slug);
  if (index < 0) notFound();

  const article = articles[index];
  const next = articles[(index + 1) % articles.length];

  return (
    <main className="article-page">
      <style>{styles}</style>
      <Link href="/blogs" className="article-page__back"><span>←</span> All field notes</Link>
      <header className="article-page__hero">
        <p className="article-page__eyebrow"><i /> {article.topic}</p>
        <h1>{article.title}</h1>
        <p className="article-page__dek">{article.summary}</p>
        <div className="article-page__byline">
          <span className="article-page__avatar">A</span>
          <span><b>Abhiman Vishwakarma</b><small>AI & full-stack engineering</small></span>
          <span className="article-page__readtime">{article.readTime}</span>
        </div>
      </header>

      <div className={`article-page__visual article-page__visual--${index + 1}`} aria-hidden="true">
        <div className="article-page__visual-grid" /><div className="article-page__visual-core"><span>{article.number}</span></div>
        <p>{article.topic}<br /><small>FIELD NOTES / ABHIMAN</small></p>
      </div>

      <div className="article-page__layout">
        <aside className="article-page__toc" aria-label="In this article">
          <p>IN THIS NOTE</p>
          {article.sections.map((section, i) => <a key={section.heading} href={`#note-${i + 1}`}>{String(i + 1).padStart(2, "0")} <span>{section.heading}</span></a>)}
          <a href="#key-takeaway">↳ <span>Key takeaway</span></a>
        </aside>
        <article className="article-page__body">
          <p className="article-page__intro">{article.intro}</p>
          {article.sections.map((section, i) => (
            <section className="article-page__section" id={`note-${i + 1}`} key={section.heading}>
              <p className="article-page__section-number">{String(i + 1).padStart(2, "0")} / FIELD NOTE</p>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.points && <ul>{section.points.map((point) => <li key={point}>{point}</li>)}</ul>}
              {section.note && <blockquote><span>ENGINEERING NOTE</span>{section.note}</blockquote>}
            </section>
          ))}
          <aside className="article-page__takeaway" id="key-takeaway">
            <p>THE TAKEAWAY</p><h2>{article.takeaway}</h2>
          </aside>
        </article>
      </div>

      <footer className="article-page__footer">
        <Link href="/blogs">← Back to all notes</Link>
        <Link href={`/blogs/${next.slug}`}><span>UP NEXT · {next.topic}</span><b>{next.title} ↗</b></Link>
      </footer>
    </main>
  );
}

const styles = `
  .article-page { --article-accent:var(--signal,#7ba4ff); width:min(100% - 2.5rem,70rem); margin:0 auto; padding:5.5rem 0 5rem; color:var(--bone,#ecebe7); }
  .article-page__back { display:inline-flex; align-items:center; gap:.6rem; color:var(--fog,#9b9ea6); font:500 .8rem/1.2 var(--display,system-ui); }.article-page__back span { color:var(--article-accent); }
  .article-page__hero { max-width:57rem; margin:4rem auto 0; text-align:center; }.article-page__eyebrow { display:flex; justify-content:center; align-items:center; gap:.6rem; color:var(--article-accent); font:600 .63rem/1.3 var(--display,system-ui); letter-spacing:.16em; text-transform:uppercase; }.article-page__eyebrow i { width:.4rem; height:.4rem; border-radius:50%; background:var(--article-accent); box-shadow:0 0 12px var(--article-accent); }
  .article-page__hero h1 { max-width:18ch; margin:1.15rem auto 0; font-size:clamp(2.8rem,7vw,5.8rem); line-height:.98; letter-spacing:-.067em; }.article-page__dek { max-width:42rem; margin:1.15rem auto 0; color:var(--fog,#9b9ea6); font:400 clamp(1rem,2vw,1.22rem)/1.6 var(--serif,Georgia); }
  .article-page__byline { display:flex; align-items:center; gap:.7rem; width:max-content; margin:1.8rem auto 0; text-align:left; }.article-page__avatar { display:grid; place-items:center; width:2.45rem; height:2.45rem; border:1px solid rgba(123,164,255,.42); border-radius:50%; color:#d7e4ff; background:linear-gradient(145deg,#314766,#111923); box-shadow:0 6px 16px rgba(0,0,0,.35); font:600 .85rem var(--display,system-ui); }.article-page__byline>span:nth-child(2) { display:grid; gap:.18rem; }.article-page__byline b { color:var(--bone,#ecebe7); font:600 .73rem/1.2 var(--display,system-ui); }.article-page__byline small { color:var(--fog,#9b9ea6); font:400 .66rem/1.2 var(--display,system-ui); }.article-page__readtime { margin-left:.6rem; padding-left:1rem; border-left:1px solid var(--line,rgba(255,255,255,.14)); color:var(--fog,#9b9ea6); font:600 .58rem/1.2 var(--display,system-ui); letter-spacing:.1em; }
  .article-page__visual { position:relative; display:grid; place-items:center; height:clamp(13rem,28vw,23rem); margin:3rem 0 4rem; overflow:hidden; border:1px solid rgba(255,255,255,.1); border-radius:1.1rem; background:radial-gradient(55% 100% at 50% 50%,rgba(123,164,255,.18),transparent 75%),linear-gradient(135deg,#0d121b,#050609); }.article-page__visual-grid { position:absolute; inset:0; opacity:.22; background-image:linear-gradient(rgba(123,164,255,.2) 1px,transparent 1px),linear-gradient(90deg,rgba(123,164,255,.2) 1px,transparent 1px); background-size:36px 36px; mask-image:radial-gradient(ellipse,#000,transparent 78%); }
  .article-page__visual-core { position:relative; display:grid; place-items:center; width:clamp(7rem,18vw,12rem); aspect-ratio:1; border:1px solid rgba(174,200,255,.6); border-radius:2.1rem; color:#e4edff; background:radial-gradient(circle at 28% 20%,#607eaf,#1b2b43 48%,#080c12 78%); box-shadow:inset -16px -20px 35px rgba(0,0,0,.75),inset 8px 8px 22px rgba(177,204,255,.25),0 35px 85px rgba(0,0,0,.6),0 0 50px rgba(123,164,255,.18); transform:perspective(700px) rotateX(16deg) rotateY(-22deg) rotateZ(-8deg); }.article-page__visual-core::before,.article-page__visual-core::after { content:""; position:absolute; inset:-.65rem; border:1px solid rgba(123,164,255,.26); border-radius:2.3rem; transform:translateZ(-12px); }.article-page__visual-core::after { inset:-1.3rem; opacity:.45; transform:translateZ(-25px); }.article-page__visual-core span { font:500 clamp(2rem,5vw,3.5rem)/1 var(--display,system-ui); letter-spacing:-.08em; text-shadow:0 0 25px rgba(123,164,255,.8); }
  .article-page__visual>p { position:absolute; right:1.3rem; bottom:1rem; color:#bbceef; font:600 .57rem/1.8 var(--display,system-ui); letter-spacing:.13em; text-align:right; }.article-page__visual>p small { color:var(--fog,#9b9ea6); font-size:.52rem; }.article-page__visual--2 { background:radial-gradient(55% 100% at 50% 50%,rgba(123,164,255,.13),transparent 75%),linear-gradient(135deg,#101720,#050609); }.article-page__visual--3 .article-page__visual-core { border-radius:50%; }.article-page__visual--4 .article-page__visual-core { border-radius:1rem; transform:perspective(700px) rotateX(24deg) rotateY(28deg) rotateZ(8deg); }
  .article-page__layout { display:grid; grid-template-columns:13rem minmax(0,40rem); justify-content:space-between; gap:3rem; }.article-page__toc { position:sticky; top:2rem; align-self:start; display:grid; gap:.4rem; max-height:calc(100vh - 4rem); overflow:auto; }.article-page__toc>p { margin-bottom:.55rem; color:var(--fog,#9b9ea6); font:600 .58rem/1.2 var(--display,system-ui); letter-spacing:.15em; }.article-page__toc a { display:grid; grid-template-columns:1.6rem 1fr; gap:.5rem; padding:.45rem 0; color:rgba(236,235,231,.56); font:500 .62rem/1.4 var(--display,system-ui); }.article-page__toc a:hover { color:var(--article-accent); }.article-page__toc a span { font-weight:400; }
  .article-page__body { min-width:0; }.article-page__intro { padding-bottom:2rem; border-bottom:1px solid var(--line,rgba(255,255,255,.14)); color:var(--bone,#ecebe7); font:400 1.16rem/1.8 var(--serif,Georgia); }.article-page__section { scroll-margin-top:2rem; padding-top:2.4rem; }.article-page__section-number { margin-bottom:.75rem; color:var(--article-accent); font:600 .58rem/1.2 var(--display,system-ui); letter-spacing:.14em; }.article-page__section h2 { margin-bottom:.8rem; font-size:clamp(1.5rem,3vw,2rem); line-height:1.14; letter-spacing:-.04em; }.article-page__section>p:not(.article-page__section-number) { margin-top:.8rem; color:rgba(236,235,231,.75); font:400 .98rem/1.85 var(--serif,Georgia); }.article-page__section ul { display:grid; gap:.6rem; margin:1rem 0 0; padding:0; list-style:none; }.article-page__section li { position:relative; padding-left:1.25rem; color:rgba(236,235,231,.75); font:400 .93rem/1.65 var(--serif,Georgia); }.article-page__section li::before { content:""; position:absolute; left:0; top:.65em; width:.4rem; height:.4rem; border-radius:50%; background:var(--article-accent); box-shadow:0 0 10px rgba(123,164,255,.5); }.article-page__section blockquote { display:grid; gap:.55rem; margin:1.2rem 0 0; padding:1.1rem 1.2rem; border-left:2px solid var(--article-accent); color:#d5e1f8; background:rgba(123,164,255,.07); font:400 .9rem/1.7 var(--serif,Georgia); }.article-page__section blockquote span { color:var(--article-accent); font:600 .56rem/1.2 var(--display,system-ui); letter-spacing:.14em; }
  .article-page__takeaway { scroll-margin-top:2rem; margin-top:3rem; padding:1.5rem; border:1px solid rgba(123,164,255,.3); border-radius:1rem; background:linear-gradient(135deg,rgba(123,164,255,.12),rgba(255,255,255,.025)); }.article-page__takeaway>p { color:var(--article-accent); font:600 .59rem/1.2 var(--display,system-ui); letter-spacing:.15em; }.article-page__takeaway h2 { margin-top:.8rem; font:500 1.2rem/1.55 var(--serif,Georgia); letter-spacing:0; }
  .article-page__footer { display:flex; justify-content:space-between; gap:1.5rem; margin-top:4rem; padding-top:1.3rem; border-top:1px solid var(--line,rgba(255,255,255,.14)); }.article-page__footer>a { display:grid; align-content:start; gap:.4rem; color:var(--fog,#9b9ea6); font:500 .72rem/1.4 var(--display,system-ui); }.article-page__footer>a:last-child { max-width:22rem; text-align:right; }.article-page__footer span { color:var(--article-accent); font:600 .56rem/1.3 var(--display,system-ui); letter-spacing:.12em; }.article-page__footer b { color:var(--bone,#ecebe7); font-weight:500; }.article-page__footer a:hover b,.article-page__footer>a:first-child:hover { color:var(--article-accent); }
  @media(max-width:760px) { .article-page { width:min(100% - 2rem,70rem); padding-top:5rem; }.article-page__hero { margin-top:3rem; }.article-page__visual { margin:2.4rem 0 3rem; }.article-page__layout { grid-template-columns:1fr; gap:2.2rem; }.article-page__toc { position:relative; top:auto; grid-template-columns:1fr 1fr; max-height:none; padding:1rem; border:1px solid rgba(255,255,255,.1); border-radius:.8rem; background:rgba(255,255,255,.025); }.article-page__toc>p { grid-column:1/-1; }.article-page__toc a { grid-template-columns:1.2rem 1fr; font-size:.59rem; }.article-page__intro { font-size:1.05rem; } }
  @media(max-width:480px) { .article-page__byline { width:100%; justify-content:center; }.article-page__readtime { margin-left:auto; }.article-page__toc { grid-template-columns:1fr; }.article-page__footer { flex-direction:column; }.article-page__footer>a:last-child { text-align:left; } }
  @media(prefers-reduced-motion:reduce) { .article-page__toc a,.article-page__footer a { transition:none; } }
`;
