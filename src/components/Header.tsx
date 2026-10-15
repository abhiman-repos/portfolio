import { site } from "@/data/site";

export default function Header() {
  return (
    <header className="header">
      <a className="header__brand" href="#top" aria-label={`${site.name}, back to top`}>
        {site.name}
      </a>
      <nav aria-label="Primary" className="header__nav">
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </nav>
    </header>
  );
}
