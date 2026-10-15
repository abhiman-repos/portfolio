import { site } from "@/data/site";

export default function Contact() {
  return (
    <footer id="contact" className="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="section-title">
        Let s Collect
      </h2>
      <a className="contact__email" href={`mailto:${site.email}`}>
        {site.email}
      </a>
      <ul className="contact__links">
        {site.links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noreferrer">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
      <p className="contact__fine">© {new Date().getFullYear()} {site.name}</p>
    </footer>
  );
}
