"use client";

import { useState } from "react";
import { site } from "@/data/site";

// SVG Icons
const Icons = {
  Gmail: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
  ),
  LinkedIn: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
  ),
  GitHub: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
  ),
  Twitter: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4l11.733 16h4.267l-11.733 -16z"/><path d="M4 20l6.768 -6.768m2.46 -2.46l6.772 -6.772"/></svg>
  ),
  Copy: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
  )
};

// Helper to get the right icon
const getIcon = (label: string) => {
  const l = label.toLowerCase();
  if (l.includes("github")) return <Icons.GitHub />;
  if (l.includes("linkedin")) return <Icons.LinkedIn />;
  if (l.includes("twitter") || l.includes("x")) return <Icons.Twitter />;
  if (l.includes("email") || l.includes("gmail") || l.includes("mail")) return <Icons.Gmail />;
  return null;
};

export default function Contact() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent mailto from opening if clicking the copy button
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email", err);
    }
  };

  return (
    <footer id="contact" className="contact" aria-labelledby="contact-title">
      <style>{css}</style>

      <div className="contact__content">
        {/* Status badge */}
        <div className="contact__status">
          <span className="contact__status-dot" />
          Available for new opportunities
        </div>

        <h2 id="contact-title" className="contact__title">
          Let&apos;s build something <span>intelligent</span>.
        </h2>
        
        <p className="contact__intro">
          I&apos;m currently open to full-time AI Engineering and Full-Stack roles. 
          Whether you&apos;re scaling models, building robust backends, or crafting 
          premium interfaces, I would love to hear from you.
        </p>

        {/* Email Block with Copy functionality */}
        <div className="contact__email-wrap">
          <a 
            className="contact__email" 
            href={`mailto:${site.email}`}
            aria-label={`Email ${site.name} at ${site.email}`}
          >
            <Icons.Gmail />
            <span>{site.email}</span>
          </a>
          <button 
            onClick={handleCopy} 
            className={`contact__copy ${copied ? "is-copied" : ""}`}
            aria-label="Copy email to clipboard"
          >
            {copied ? <Icons.Check /> : <Icons.Copy />}
            <span>{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>

        {/* Social Links */}
        <ul className="contact__links" aria-label="Social and professional links">
          {site.links.map((link) => (
            <li key={link.label}>
              <a 
                href={link.href} 
                target="_blank" 
                rel="noopener noreferrer"
                className="contact__social-link"
                title={link.label}
              >
                {getIcon(link.label)}
                <span className="sr-only">{link.label}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>

      <p className="contact__fine">
        © {new Date().getFullYear()} {site.name}. All rights reserved.
      </p>
    </footer>
  );
}

const css = `
  .contact {
    padding: 8rem 1.5rem 3rem;
    max-width: 60rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .contact__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 42rem;
  }

  /* Status Badge */
  .contact__status {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.4rem 1rem;
    border-radius: 0px; /* Matching your sharp aesthetic */
    background: rgba(16, 185, 129, 0.08);
    border: 1px solid rgba(16, 185, 129, 0.2);
    color: #6ee7b7;
    font-size: 0.75rem;
    font-weight: 500;
    letter-spacing: 0.05em;
    text-transform: uppercase;
    margin-bottom: 2rem;
  }

  .contact__status-dot {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background: radial-gradient(circle at 50% 50%, #a7f3d0 0%, #10b981 55%, #059669 100%);
  box-shadow:
    0 0 0 1px rgba(16, 185, 129, 0.35),
    0 0 8px 1px rgba(16, 185, 129, 0.55),
    0 0 16px 2px rgba(16, 185, 129, 0.25);
}

/* Ring 1 — primary pulse */
.contact__status-dot::before,
.contact__status-dot::after {
  content: "";
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid #10b981;
  opacity: 0;
  pointer-events: none;
}

.contact__status-dot::before {
  animation: work-ripple 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
}

/* Ring 2 — delayed for depth */
.contact__status-dot::after {
  animation: work-ripple 2.2s cubic-bezier(0.22, 0.61, 0.36, 1) infinite;
  animation-delay: 1.1s;
}

@keyframes work-ripple {
  0% {
    transform: scale(1);
    opacity: 0.9;
    border-width: 2px;
  }
  70% {
    opacity: 0.15;
    border-width: 1px;
  }
  100% {
    transform: scale(3.5);
    opacity: 0;
    border-width: 0.5px;
  }
}

  /* Typography */
  .contact__title {
    font-size: clamp(2rem, 4vw, 3rem);
    font-weight: 600;
    letter-spacing: -0.03em;
    color: #f5f5f7;
    margin: 0 0 1.25rem;
    line-height: 1.1;
  }
  .contact__title span {
    color: #8b5cf6; /* Purple accent */
  }

  .contact__intro {
    font-size: 1.05rem;
    line-height: 1.6;
    color: rgba(255, 255, 255, 0.55);
    margin: 0 0 3rem;
  }

  /* Email Block */
  .contact__email-wrap {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    width: 100%;
    margin-bottom: 3rem;
  }

  @media (min-width: 640px) {
    .contact__email-wrap {
      flex-direction: row;
      justify-content: center;
    }
  }

  .contact__email {
    display: inline-flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.5rem;
    font-size: 1.1rem;
    font-weight: 500;
    color: #f5f5f7;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.08);
    text-decoration: none;
    transition: all 0.3s ease;
    width: 100%;
    justify-content: center;
  }

  .contact__email svg {
    width: 20px;
    height: 20px;
    color: rgba(255, 255, 255, 0.6);
    transition: color 0.3s ease;
  }

  .contact__email:hover {
    background: rgba(255, 255, 255, 0.06);
    border-color: rgba(139, 92, 246, 0.4);
  }
  
  .contact__email:hover svg {
    color: #a5b4fc;
  }

  .contact__copy {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 1rem 1.25rem;
    font-size: 0.9rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 0.6);
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.05);
    cursor: pointer;
    transition: all 0.3s ease;
    font-family: inherit;
    width: 100%;
    justify-content: center;
  }

  @media (min-width: 640px) {
    .contact__email { width: auto; }
    .contact__copy { width: auto; }
  }

  .contact__copy svg {
    width: 16px;
    height: 16px;
  }

  .contact__copy:hover {
    background: rgba(255, 255, 255, 0.05);
    color: #f5f5f7;
  }

  .contact__copy.is-copied {
    color: #10b981;
    border-color: rgba(16, 185, 129, 0.3);
    background: rgba(16, 185, 129, 0.05);
  }

  /* Social Icons */
  .contact__links {
    display: flex;
    gap: 1rem;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .contact__social-link {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    color: rgba(255, 255, 255, 0.5);
    background: rgba(255, 255, 255, 0.02);
    border: 1px solid rgba(255, 255, 255, 0.06);
    transition: all 0.3s ease;
  }

  .contact__social-link svg {
    width: 20px;
    height: 20px;
    transition: transform 0.3s ease;
  }

  .contact__social-link:hover {
    color: #f5f5f7;
    background: rgba(139, 92, 246, 0.1);
    border-color: rgba(139, 92, 246, 0.3);
    transform: translateY(-2px);
  }

  .contact__social-link:hover svg {
    transform: scale(1.1);
  }

  /* Footer text */
  .contact__fine {
    margin-top: 6rem;
    font-size: 0.75rem;
    color: rgba(255, 255, 255, 0.3);
    letter-spacing: 0.02em;
  }

  /* Accessibility utility */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    .contact__status-dot { animation: none; }
    .contact__email, .contact__copy, .contact__social-link, .contact__social-link svg {
      transition: none;
    }
    .contact__social-link:hover { transform: none; }
  }
`;