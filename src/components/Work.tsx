import { projects } from "@/data/site";

export default function Work() {
  return (
    <section id="work" className="work" aria-labelledby="work-title">
      <h2 id="work-title" className="section-title">
        Selected work
      </h2>
      <ul className="work__list">
        {projects.map((p) => {
          const inner = (
            <>
              <h3 className="work__name">{p.name}</h3>
              <p className="work__summary">{p.summary}</p>
              <p className="work__tags">{p.tags.join(", ")}</p>
            </>
          );
          return (
            <li key={p.name}>
              {p.url ? (
                <a className="work__row work__row--link" href={p.url}>
                  {inner}
                </a>
              ) : (
                <div className="work__row">{inner}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
