import Link from "next/link";
import { site } from "@/data/site";

export default function Header() {
  return (
    <header className="header">
      <Link className="header__brand" href="/" aria-label={`${site.name}, home`}>
        {site.name}
      </Link>
      <nav aria-label="Primary" className="header__nav">
        <Link href="/#work">Work</Link>
        <Link href="/#contact">Contact</Link>
      </nav>
    </header>
  );
}
