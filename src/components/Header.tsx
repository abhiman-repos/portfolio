"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import TechText from "./TechText";

type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

const navItems: NavItem[] = [
  { label: "Updates", href: "/updates" },
  {
    label: "Blogs",
    href: "/blogs",
    children: [
      { label: "Latest posts", href: "/#blogs" },
      { label: "Archive", href: "/#blogs" },
      { label: "Notes", href: "/#blogs" },
    ],
  },
  {
    label: "Skills",
    href: "/#skills",
    children: [
      { label: "Frontend & Product", href: "/#skills" },
      { label: "Backend & APIs", href: "/#skills" },
      { label: "AI Engineering", href: "/#skills" },
      { label: "Infra & Delivery", href: "/#skills" },
    ],
  },
  {
    label: "Work",
    href: "/#work",
    children: [
      { label: "All projects", href: "/#work" },
      { label: "Case studies", href: "/#work" },
    ],
  },
  { label: "Contact", href: "/#contact" },
];

const MOBILE_BREAKPOINT = 768;

export default function Header() {
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  /* Auto-close the drawer when the viewport crosses to desktop.
     Prevents the "drawer stuck open + body scroll locked" bug. */
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${MOBILE_BREAKPOINT}px)`);
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setOpen(false);
        setExpanded(null);
      }
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  /* Scroll lock + ESC to close. Preserves original overflow value
     so it doesn't clobber other components that also lock scroll. */
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const close = () => {
    setOpen(false);
    setExpanded(null);
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: css }} />

      <header className="header">
        <div style={{ width: "80%", height: "40px", position: "relative" }}>
          <TechText
            text="Abhiman Vishwakarma"
            fontWeight={600}
            fontSize={50}
            reveal="letter"
            align="left"
            style={{ paddingLeft: "5%" }}
            dashLength={7}
            dashGap={6}
            specks={15}
            intro="none"
            introDuration={2}
            clickKick
            guides={false}
            fontFamily=""
            letterSpacing={-0.05}
            accentColor="currentColor"
            reach={200}
            softness={0.7}
            lineStyle="dashed"
            strokeWidth={1.5}
            speed={0.1}
            bounce={0.4}
            selection
            labels
            color="currentColor"
            draggable
            sweep
          />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: "2%",
              right: "-18%" /* Made symmetric with left */,
              height: "100%" /* Take full height to center vertically */,
              display: "flex",
              justifyContent:
                "space-between" /* Pushes burger left, nav right */,
              alignItems: "center",
              zIndex: 10,
            }}
          >
            <div className="header__right">
              <nav aria-label="Primary" className="header__nav">
                {navItems.map((item) => (
                  <Link
                    key={item.label}
                    className="header__link"
                    href={item.href}
                  >
                    <span className="header__link-text">{item.label}</span>
                  </Link>
                ))}
              </nav>

              <button
                type="button"
                className={`header__burger${open ? " is-open" : ""}`}
                onClick={() => setOpen((v) => !v)}
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                aria-controls="mobile-menu"
              >
                <span />
                <span />
                <span />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar — slides in from the right */}
      <div className={`drawer${open ? " is-open" : ""}`} aria-hidden={!open}>
        <div className="drawer__backdrop" onClick={close} />

        <aside
          id="mobile-menu"
          className="drawer__panel"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
        >
          <nav className="drawer__nav" aria-label="Mobile primary">
            {navItems.map((item, i) => (
              <div key={item.label} className="drawer__item">
                {item.children ? (
                  <>
                    <button
                      type="button"
                      className={`drawer__trigger${
                        expanded === item.label ? " is-open" : ""
                      }`}
                      onClick={() =>
                        setExpanded((p) =>
                          p === item.label ? null : item.label,
                        )
                      }
                      aria-expanded={expanded === item.label}
                    >
                      <span className="drawer__num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="drawer__label">{item.label}</span>
                      <span className="drawer__chevron" aria-hidden="true">
                        +
                      </span>
                    </button>

                    <div
                      className={`drawer__sub${
                        expanded === item.label ? " is-open" : ""
                      }`}
                    >
                      <div className="drawer__sub-inner">
                        {item.children.map((c) => (
                          <Link
                            key={c.label}
                            className="drawer__sublink"
                            href={c.href}
                            onClick={close}
                          >
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  <Link
                    className="drawer__link"
                    href={item.href}
                    onClick={close}
                  >
                    <span className="drawer__num">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="drawer__label">{item.label}</span>
                    <span className="drawer__arrow" aria-hidden="true">
                      ↗
                    </span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          <footer className="drawer__footer">
            <p>Available for work</p>
            <a href="mailto:you@example.com">Get in touch →</a>
          </footer>
        </aside>
      </div>
    </>
  );
}

const css = `
/* ═══════════════════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════════════════ */
.header {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 110;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem clamp(1rem, 3vw, 2rem);
  background: rgba(95, 95, 102, 0.07);
  backdrop-filter: blur(14px) saturate(150%);
  -webkit-backdrop-filter: blur(14px) saturate(150%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
}

.header__brand {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  font-weight: 700;
  font-size: 0.95rem;
  letter-spacing: -0.01em;
  color: #f5f5f7;
  text-decoration: none;
  white-space: nowrap;
}

.header__brand-mark {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
  box-shadow: 0 0 10px rgba(139, 92, 246, 0.55);
  flex-shrink: 0;
}

.header__right {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 0.15rem;
  padding: 0.25rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.025);
  border: 1px solid rgba(255, 255, 255, 0.06);
}

/* ── Carpet-fold link (desktop only) ───────────────────── */
.header__link {
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 0.55rem 0.95rem;
  border-radius: 999px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.83rem;
  font-weight: 500;
  letter-spacing: 0.005em;
  text-decoration: none;
  overflow: hidden;
  isolation: isolate;
  transition: color 0.35s ease;
}

.header__link::before {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(120deg, #8b5cf6 0%, #6366f1 100%);
  transform-origin: left center;
  transform: scaleX(0) skewY(-12deg);
  transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1);
  z-index: -2;
}

.header__link::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(120deg, #6366f1 0%, #38bdf8 100%);
  transform-origin: left center;
  transform: scaleX(0) skewY(-12deg);
  transition: transform 0.5s cubic-bezier(0.65, 0, 0.35, 1) 0.08s;
  z-index: -1;
}

.header__link-text {
  position: relative;
  z-index: 1;
  transition: transform 0.4s cubic-bezier(0.65, 0, 0.35, 1);
}

.header__link:hover,
.header__link:focus-visible {
  color: #ffffff;
  outline: none;
}

.header__link:hover::before,
.header__link:hover::after,
.header__link:focus-visible::before,
.header__link:focus-visible::after {
  transform: scaleX(1) skewY(0deg);
}

.header__link:hover .header__link-text,
.header__link:focus-visible .header__link-text {
  transform: translateY(-1px);
}

/* ── Burger ─────────────────────────────────────────────── */
.header__burger {
  display: none;
  position: relative;
  width: 42px;
  height: 42px;
  padding: 0;
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  cursor: pointer;
  transition: background 0.25s ease, border-color 0.25s ease;
  -webkit-tap-highlight-color: transparent;
}
.header__burger:hover {
  background: rgba(99, 102, 241, 0.1);
  border-color: rgba(139, 92, 246, 0.35);
}

.header__burger span {
  position: absolute;
  left: 50%;
  top: 50%;
  height: 1.5px;
  background: #f5f5f7;
  border-radius: 2px;
  transform-origin: center;
  transition:
    transform 0.45s cubic-bezier(0.65, 0, 0.35, 1),
    width 0.35s cubic-bezier(0.65, 0, 0.35, 1),
    opacity 0.2s ease;
}
.header__burger span:nth-child(1) {
  width: 18px;
  transform: translate(-50%, calc(-50% - 6px));
}
.header__burger span:nth-child(2) {
  width: 12px;
  transform: translate(-50%, -50%);
}
.header__burger span:nth-child(3) {
  width: 16px;
  transform: translate(-50%, calc(-50% + 6px));
}

.header__burger.is-open span:nth-child(1) {
  width: 18px;
  transform: translate(-50%, -50%) rotate(45deg);
}
.header__burger.is-open span:nth-child(2) {
  width: 0;
  opacity: 0;
  transform: translate(-50%, -50%);
}
.header__burger.is-open span:nth-child(3) {
  width: 18px;
  transform: translate(-50%, -50%) rotate(-45deg);
}

/* ═══════════════════════════════════════════════════════════
   DRAWER — matches the black portfolio theme
   ═══════════════════════════════════════════════════════════ */
.drawer {
  position: fixed;
  inset: 0;
  z-index: 100;
  pointer-events: none;
  visibility: hidden;
  /* Hide visibility AFTER the slide-out finishes on close */
  transition: visibility 0s linear 0.65s;
}
.drawer.is-open {
  pointer-events: auto;
  visibility: visible;
  /* Show visibility IMMEDIATELY on open */
  transition: visibility 0s linear 0s;
}

.drawer.is-open .drawer__backdrop { opacity: 1; }
.drawer.is-open .drawer__panel    { transform: translateX(0); }

.drawer__backdrop {
  position: absolute;
  inset: 0;
  background: rgba(5, 5, 10, 0.6);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  opacity: 0;
  transition: opacity 0.45s ease;
}

.drawer__panel {
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: min(88vw, 400px);
  padding: 5.5rem 1.5rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  overflow-y: auto;
  overscroll-behavior: contain;

  /* Same near-black + subtle indigo/violet blooms as the cards
     and the slug page. Keeps the whole site visually consistent. */
  background:
    radial-gradient(120% 60% at 100% 0%, rgba(99, 102, 241, 0.12) 0%, transparent 55%),
    radial-gradient(120% 60% at 0% 100%, rgba(139, 92, 246, 0.08) 0%, transparent 55%),
    linear-gradient(180deg, #121216 0%, #0a0a0b 100%);

  border-left: 1px solid rgba(255, 255, 255, 0.07);
  transform: translateX(100%);
  transition: transform 0.65s cubic-bezier(0.65, 0, 0.35, 1);
  box-shadow: -30px 0 80px -30px rgba(0, 0, 0, 0.85);
  will-change: transform;
}

/* ── Drawer nav ────────────────────────────────────────── */
.drawer__nav {
  display: flex;
  flex-direction: column;
  flex: 1;
}

.drawer__item {
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.drawer__trigger,
.drawer__link {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  width: 100%;
  padding: 1.15rem 0.25rem;
  background: transparent;
  border: none;
  color: #f5f5f7;
  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 500;
  letter-spacing: -0.005em;
  text-align: left;
  text-decoration: none;
  cursor: pointer;
  transition:
    color 0.25s ease,
    padding-left 0.35s cubic-bezier(0.65, 0, 0.35, 1);
  -webkit-tap-highlight-color: transparent;
}
.drawer__trigger:hover,
.drawer__link:hover,
.drawer__trigger:focus-visible,
.drawer__link:focus-visible {
  color: #a5b4fc;
  padding-left: 0.6rem;
  outline: none;
}

.drawer__num {
  font-size: 0.7rem;
  font-weight: 500;
  letter-spacing: 0.1em;
  font-variant-numeric: tabular-nums;
  color: rgba(165, 180, 252, 0.6);
  flex-shrink: 0;
}

.drawer__label { flex: 1; }

.drawer__chevron {
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  border-radius: 50%;
  font-size: 1rem;
  line-height: 1;
  color: rgba(255, 255, 255, 0.65);
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  transition:
    transform 0.4s cubic-bezier(0.65, 0, 0.35, 1),
    background 0.25s ease,
    color 0.25s ease,
    border-color 0.25s ease;
}
.drawer__trigger.is-open .drawer__chevron {
  transform: rotate(45deg);
  background: rgba(99, 102, 241, 0.2);
  border-color: rgba(139, 92, 246, 0.4);
  color: #a5b4fc;
}

.drawer__arrow {
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.35);
  transition: transform 0.3s ease, color 0.3s ease;
  flex-shrink: 0;
}
.drawer__link:hover .drawer__arrow {
  transform: translate(2px, -2px);
  color: #a5b4fc;
}

/* ── Sub-options (smooth expand) ───────────────────────── */
.drawer__sub {
  display: grid;
  grid-template-rows: 0fr;
  overflow: hidden;
  transition: grid-template-rows 0.45s cubic-bezier(0.65, 0, 0.35, 1);
}
.drawer__sub.is-open { grid-template-rows: 1fr; }

.drawer__sub-inner {
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding-bottom: 0.8rem;
}

.drawer__sublink {
  position: relative;
  display: block;
  padding: 0.65rem 0.75rem 0.65rem 2.2rem;
  font-size: 0.92rem;
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  border-radius: 10px;
  transition:
    color 0.25s ease,
    background 0.25s ease,
    padding-left 0.3s cubic-bezier(0.65, 0, 0.35, 1);
}

.drawer__sublink::before {
  content: "";
  position: absolute;
  left: 1.2rem;
  top: 50%;
  width: 6px;
  height: 1px;
  background: rgba(139, 92, 246, 0.5);
  transform: translateY(-50%);
  transition: width 0.3s ease, background 0.3s ease;
}

.drawer__sublink:hover,
.drawer__sublink:focus-visible {
  color: #ffffff;
  background: rgba(99, 102, 241, 0.1);
  padding-left: 2.5rem;
  outline: none;
}
.drawer__sublink:hover::before,
.drawer__sublink:focus-visible::before {
  width: 14px;
  background: #a5b4fc;
}

/* ── Drawer footer ─────────────────────────────────────── */
.drawer__footer {
  margin-top: auto;
  padding-top: 1.25rem;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
}

.drawer__footer p {
  margin: 0 0 0.4rem;
  font-size: 0.7rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.4);
}

.drawer__footer a {
  color: #a5b4fc;
  font-size: 0.9rem;
  text-decoration: none;
  transition: color 0.25s ease;
}
.drawer__footer a:hover { color: #c4b5fd; }

/* ═══════════════════════════════════════════════════════════
   RESPONSIVE
   ═══════════════════════════════════════════════════════════ */
@media (max-width: 767px) {
  .header__nav { display: none; }
  .header__burger { display: block; }
  .drawer__panel {
    width: 100vw;
    border-left: 0;
  }
}

/* ═══════════════════════════════════════════════════════════
   REDUCED MOTION
   ═══════════════════════════════════════════════════════════ */
@media (prefers-reduced-motion: reduce) {
  .header__link::before,
  .header__link::after,
  .header__link-text,
  .header__burger span,
  .drawer__backdrop,
  .drawer__panel,
  .drawer__chevron,
  .drawer__sub,
  .drawer__sublink,
  .drawer__arrow {
    transition: none !important;
  }
  .header__link:hover .header__link-text { transform: none; }
}
`;
