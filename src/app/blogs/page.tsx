import Link from "next/link";
import { articles } from "@/data/blogs";

export const metadata = {
  title: "Notes on AI & product engineering · Abhiman",
  description: "Practical notes on RAG, voice systems, full-stack architecture, and reliable product engineering.",
};

export default function BlogsPage() {
  const [featured, ...rest] = articles;

  return (
    <main className="journal">
      <style>{styles}</style>
      <Link href="/#top" className="journal__back"><span>←</span> Portfolio</Link>
      <header className="journal__hero">
        <p className="journal__eyebrow"><i /> FIELD NOTES / 2025—26</p>
        <h1>Thinking through<br /><em>the build.</em></h1>
        <div className="journal__hero-bottom">
          <p>Notes from the work: engineering AI products, shaping full-stack systems, and making software hold up in the real world.</p>
          <span>{String(articles.length).padStart(2, "0")} ARTICLES<br />AI · FULL STACK · SYSTEMS</span>
        </div>
      </header>

      <section className="journal__featured" aria-labelledby="journal-featured-title">
        <div className="journal__feature-art" aria-hidden="true">
          <div className="journal__orb journal__orb--one" /><div className="journal__orb journal__orb--two" />
          <div className="journal__art-grid" /><span className="journal__art-label">FIELD NOTE / {featured.number}</span>
          <span className="journal__art-mark">R<span>AG</span></span>
          <span className="journal__art-caption">GROUNDED SYSTEMS<br />START WITH EVIDENCE</span>
        </div>
        <div className="journal__feature-copy">
          <p className="journal__category">{featured.topic} <span>·</span> {featured.readTime}</p>
          <h2 id="journal-featured-title"><Link href={`/blogs/${featured.slug}`}>{featured.title}</Link></h2>
          <p className="journal__summary">{featured.summary}</p>
          <Link href={`/blogs/${featured.slug}`} className="journal__read">Read the article <span>↗</span></Link>
        </div>
      </section>

      <section className="journal__archive" id="notes" aria-labelledby="journal-archive-title">
        <div className="journal__archive-head"><p>THE NOTEBOOK</p><h2 id="journal-archive-title">More from the work.</h2><span>01 — {String(articles.length - 1).padStart(2, "0")}</span></div>
        <div className="journal__list">
          {rest.map((article) => (
            <article className="journal__entry" key={article.slug}>
              <span className="journal__entry-number">{article.number}</span>
              <div className="journal__entry-copy">
                <p>{article.topic} <span>·</span> {article.readTime}</p>
                <h3><Link href={`/blogs/${article.slug}`}>{article.title}</Link></h3>
                <p className="journal__entry-summary">{article.summary}</p>
              </div>
              <Link href={`/blogs/${article.slug}`} className="journal__entry-arrow" aria-label={`Read ${article.title}`}>↗</Link>
            </article>
          ))}
        </div>
      </section>

      <footer className="journal__footer"><span>ABHIMAN VISHWAKARMA</span><Link href="/#contact">Have a problem worth solving? <b>Let’s talk ↗</b></Link></footer>
    </main>
  );
}

const styles = `
  .journal { --journal-accent:var(--signal,#7ba4ff); width:min(100% - 2.5rem,70rem); margin:0 auto; padding:5.5rem 0 3rem; color:var(--bone,#ecebe7); }
  .journal__back { display:inline-flex; align-items:center; gap:.6rem; color:var(--fog,#9b9ea6); font:500 .8rem/1.2 var(--display,system-ui); }.journal__back span { color:var(--journal-accent); }
  .journal__hero { padding:5rem 0 2.4rem; border-bottom:1px solid var(--line,rgba(255,255,255,.14)); }
  .journal__eyebrow,.journal__category { color:var(--journal-accent); font:600 .65rem/1.4 var(--display,system-ui); letter-spacing:.15em; text-transform:uppercase; }
  .journal__eyebrow { display:flex; align-items:center; gap:.65rem; }.journal__eyebrow i { width:.42rem; height:.42rem; border-radius:50%; background:var(--journal-accent); box-shadow:0 0 14px var(--journal-accent); }
  .journal__hero h1 { margin-top:1.2rem; font-size:clamp(3.6rem,10vw,8rem); line-height:.89; letter-spacing:-.075em; }.journal__hero h1 em { color:var(--journal-accent); font-weight:500; }
  .journal__hero-bottom { display:flex; justify-content:space-between; align-items:end; gap:2rem; margin-top:2rem; }.journal__hero-bottom>p { max-width:34rem; color:var(--fog,#9b9ea6); font:400 1.05rem/1.65 var(--serif,Georgia); }.journal__hero-bottom>span { flex:none; color:var(--fog,#9b9ea6); font:600 .6rem/1.8 var(--display,system-ui); letter-spacing:.13em; text-align:right; }
  .journal__featured { display:grid; grid-template-columns:1fr 1fr; min-height:23rem; margin-top:2rem; border:1px solid rgba(255,255,255,.11); border-radius:1.1rem; overflow:hidden; background:linear-gradient(110deg,rgba(255,255,255,.035),rgba(255,255,255,.012)); }
  .journal__feature-art { position:relative; min-height:22rem; overflow:hidden; background:radial-gradient(70% 80% at 72% 48%,rgba(123,164,255,.2),transparent 70%),linear-gradient(145deg,#101722,#07090d 76%); }
  .journal__art-grid { position:absolute; inset:0; opacity:.18; background-image:linear-gradient(rgba(123,164,255,.17) 1px,transparent 1px),linear-gradient(90deg,rgba(123,164,255,.17) 1px,transparent 1px); background-size:32px 32px; mask-image:linear-gradient(120deg,transparent,#000 50%,transparent); }
  .journal__orb { position:absolute; border-radius:50%; border:1px solid rgba(176,203,255,.55); box-shadow:inset -14px -18px 35px rgba(0,0,0,.8),inset 9px 9px 24px rgba(123,164,255,.28),0 0 60px rgba(123,164,255,.18); transform:rotateX(65deg) rotateZ(-22deg); }
  .journal__orb--one { width:12rem; height:12rem; left:calc(50% - 6rem); top:calc(50% - 6rem); background:radial-gradient(circle at 32% 26%,#b5ccff 0,#526c9f 8%,#18263c 36%,#090d14 72%); }
  .journal__orb--two { width:15rem; height:5rem; left:calc(50% - 7.5rem); top:calc(50% - 2.5rem); border-color:rgba(123,164,255,.35); transform:rotateX(72deg) rotateZ(24deg); }
  .journal__art-label,.journal__art-caption { position:absolute; z-index:1; color:rgba(219,231,255,.65); font:600 .58rem/1.6 var(--display,system-ui); letter-spacing:.16em; }.journal__art-label { top:1.2rem; left:1.3rem; }.journal__art-caption { right:1.25rem; bottom:1.2rem; text-align:right; }
  .journal__art-mark { position:absolute; z-index:2; left:50%; top:50%; color:#e9f0ff; font:600 2.4rem/1 var(--display,system-ui); letter-spacing:-.1em; transform:translate(-50%,-50%); text-shadow:0 3px 20px rgba(123,164,255,.7); }.journal__art-mark span { color:#9dbaff; font-size:1.4rem; }
  .journal__feature-copy { display:flex; flex-direction:column; align-items:flex-start; justify-content:center; padding:clamp(1.5rem,4vw,3rem); }.journal__category { font-size:.58rem; }.journal__category span { color:var(--fog,#9b9ea6); }
  .journal__feature-copy h2 { max-width:14ch; margin-top:1.1rem; font-size:clamp(1.8rem,3.4vw,3rem); line-height:1.05; letter-spacing:-.055em; }.journal__feature-copy h2 a:hover { color:var(--journal-accent); }
  .journal__summary { max-width:33rem; margin-top:.9rem; color:var(--fog,#9b9ea6); font:400 .95rem/1.65 var(--serif,Georgia); }
  .journal__read { display:inline-flex; gap:1.2rem; align-items:center; margin-top:1.6rem; padding-bottom:.4rem; border-bottom:1px solid rgba(123,164,255,.5); color:var(--bone,#ecebe7); font:600 .78rem/1.3 var(--display,system-ui); }.journal__read span { color:var(--journal-accent); transition:transform .2s ease; }.journal__read:hover span { transform:translate(3px,-3px); }
  .journal__archive { margin-top:5rem; }.journal__archive-head { position:relative; margin-bottom:.8rem; }.journal__archive-head>p { color:var(--journal-accent); font:600 .62rem/1.3 var(--display,system-ui); letter-spacing:.16em; }.journal__archive-head h2 { margin-top:.65rem; font-size:clamp(1.7rem,3vw,2.4rem); letter-spacing:-.045em; }.journal__archive-head>span { position:absolute; right:0; bottom:.25rem; color:var(--fog,#9b9ea6); font:500 .65rem/1 var(--display,system-ui); letter-spacing:.12em; }
  .journal__entry { display:grid; grid-template-columns:3.5rem 1fr 2rem; gap:1rem; align-items:center; padding:1.55rem .2rem; border-top:1px solid var(--line,rgba(255,255,255,.14)); }.journal__entry-number { align-self:start; padding-top:.1rem; color:rgba(123,164,255,.8); font:500 .8rem/1 var(--display,system-ui); }.journal__entry-copy>p:first-child { color:var(--fog,#9b9ea6); font:600 .57rem/1.3 var(--display,system-ui); letter-spacing:.11em; }.journal__entry-copy>p:first-child span { color:var(--journal-accent); }.journal__entry-copy h3 { margin-top:.45rem; font-size:clamp(1.15rem,2vw,1.55rem); line-height:1.2; letter-spacing:-.035em; }.journal__entry-copy h3 a:hover { color:var(--journal-accent); }.journal__entry-summary { max-width:47rem; margin-top:.4rem; color:var(--fog,#9b9ea6); font:400 .86rem/1.55 var(--serif,Georgia); }.journal__entry-arrow { display:grid; place-items:center; width:2rem; height:2rem; border:1px solid rgba(123,164,255,.28); border-radius:50%; color:var(--journal-accent); transition:background .2s ease,transform .2s ease; }.journal__entry-arrow:hover { background:rgba(123,164,255,.12); transform:translate(2px,-2px); }
  .journal__footer { display:flex; justify-content:space-between; gap:1rem; margin-top:4rem; padding-top:1.2rem; border-top:1px solid var(--line,rgba(255,255,255,.14)); color:var(--fog,#9b9ea6); font:600 .61rem/1.5 var(--display,system-ui); letter-spacing:.1em; }.journal__footer a { text-align:right; letter-spacing:0; }.journal__footer b { color:var(--bone,#ecebe7); font-weight:600; }
  @media(max-width:700px) { .journal { width:min(100% - 2rem,70rem); padding-top:5rem; }.journal__hero { padding-top:4rem; }.journal__hero-bottom { align-items:start; flex-direction:column; gap:1rem; }.journal__hero-bottom>span { text-align:left; }.journal__featured { grid-template-columns:1fr; }.journal__feature-art { min-height:17rem; }.journal__feature-copy { min-height:17rem; }.journal__archive { margin-top:3.5rem; }.journal__entry { grid-template-columns:2rem 1fr 1.8rem; gap:.65rem; }.journal__entry-summary { font-size:.8rem; }.journal__footer { flex-direction:column; }.journal__footer a { text-align:left; } }
  @media(prefers-reduced-motion:reduce) { .journal__read span,.journal__entry-arrow { transition:none; } }
`;
