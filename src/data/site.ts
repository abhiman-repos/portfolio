// All copy lives here. Edit freely: nothing else in the app hardcodes text.

export const site = {
  name: "Abhiman Vishwakarma",
  email: "sr.abhiman@gmail.com", // TODO: replace with your real email
  links: [
    { label: "GitHub", href: "https://github.com/abhiman-repos" }, // TODO
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abhiiman" }, // TODO
  ],
};

export type Chapter = {
  id: string;
  /** scroll progress (0–1) where the chapter fades in / out */
  start: number;
  end: number;
  side: "left" | "right";
  title: string;
  body?: string;
  /** primary heading level: the first chapter is the page's <h1> */
  h1?: boolean;
  /** stays visible once it arrives (used for the last chapter) */
  hold?: boolean;
  actions?: boolean;
};

export const chapters: Chapter[] = [
  {
    id: "intro",
    start: 0,
    end: 0.2,
    side: "left",
    title: "Abhiman",
    body: "Computer science student. I am passionate about building intelligent applications that solve real-world problems.",
    h1: true,
  },
  {
    id: "study",
    start: 0.24,
    end: 0.46,
    side: "right",
    title: "Studying AI and data science.",
    body: "B.Tech in Computer Science Engineering, specializing in AI and Data Science. I build and deploy AI-powered products, from voice agents and Full-stack web platforms.",
  },
  {
    id: "family",
    start: 0.5,
    end: 0.74,
    side: "left",
    title: "Driven by problems worth solving.",
    body: "I am passionate about exploring unfamiliar challenges, breaking down complex problems, and engineering practical solutions.",
  },
  {
    id: "cta",
    start: 0.8,
    end: 1,
    side: "right",
    title: "Let's build something.",
    body: "Open to internships and collaborations.",
    hold: true,
    actions: true,
  },
];

export type ProjectImage = {
  /** file inside /public, e.g. "/projects/ai-voice-support/dashboard.png" */
  src: string;
  alt: string;
  caption?: string;
  kind: "screen" | "architecture" | "uml" | "workflow";
  width?: number;
  height?: number;
};

export type ProjectHighlight = {
  title: string;
  body: string;
};

export type Project = {
  slug: string;
  name: string;
  summary: string;
  stack: string[];

  /** small pill above the H1 on the slug page, e.g. "In production" */
  status?: string;

  /** 2 short paragraphs shown on the slug page, in order */
  overview?: string[];

  /** 2–3 deep, specific points — what YOU built, not what the tech is */
  highlights?: ProjectHighlight[];

  year?: string;
  /** e.g. "Solo", "Founding engineer", "Team of 3 (backend)" */
  role?: string;

  /** live URL — used by the slug page's "Visit live site" button */
  url?: string;

  /** shown on the card as "Live on <platform>" */
  deploy?: { platform: string; url: string };

  /** full repo URL — shown on the card as "Code on GitHub" */
  repo?: string;

  images?: ProjectImage[];
};

export function repoLabel(url: string) {
  if (url.includes("github.com")) return "GitHub";
  if (url.includes("gitlab.com")) return "GitLab";
  if (url.includes("bitbucket.org")) return "Bitbucket";
  return "source";
}

/* ═══════════════════════════════════════════════════════════════════
   DATA — edit the TODOs marked with ▸ FILL ME

   Rule of thumb for good copy:
     • overview  → WHY it exists, and what was actually hard
     • highlight → a decision YOU made, with a consequence
     • summary   → one sentence a recruiter can skim in 2 seconds
   ═══════════════════════════════════════════════════════════════════ */
export const projects: Project[] = [
  {
    slug: "ai-voice-support",
    name: "AI voice support platform",
    summary:
      "Answers customer calls for small and mid-size vendors, using each vendor's own product documents.",
    status: "In production",
    year: "2025",
    role: "Founding engineer",
    stack: [
      "Gemini",
      "RAG",
      "pgvector",
      "Django",
      "DRF",
      "PostgreSQL",
      "Redis",
      "Celery",
      "SIP trunking",
    ],
    
    overview: [
      "Small vendors lose orders because nobody picks up the phone. This platform gives them a voice agent that answers every call, understands the caller's question, and replies using only that vendor's own product documents — so answers stay accurate, on-brand and auditable.",
      "The hard parts were never the model. They were retrieval quality over noisy phone audio, keeping every tenant's data strictly isolated in a shared pipeline, and hitting sub-second turn-taking so the caller doesn't feel like they're talking to a bot.",
    ],
    highlights: [
      {
        title: "Per-tenant RAG with strict isolation",
        body: "Each vendor's docs are chunked, embedded and stored in an isolated pgvector namespace. Retrieval never crosses tenant boundaries — verified by a dedicated leak test that runs on every commit.",
      },
      {
        title: "Sub-second turn-taking with barge-in",
        body: "Streaming STT → retrieval → LLM → TTS over SIP, with barge-in detection so callers can interrupt mid-sentence without the agent talking over them.",
      },
      {
        title: "Graceful fallback to a human",
        body: "When retrieval confidence drops below a threshold, the call warm-transfers to a human with the transcript and a short summary already on their screen.",
      },
    ],

    url: "https://…",
    deploy: { platform: "AWS", url: "https://…" },
    repo: "https://github.com/abhiman-repos/AI-Voice-Support-Platform.git",
    images: [
      {
        kind: "screen",
        src: "/projects/ai-voice-support/dashboard.png",
        alt: "Live call dashboard",
        caption: "Live call dashboard",
      },
      {
        kind: "architecture",
        src: "/projects/ai-voice-support/architecture.png",
        alt: "System architecture",
        caption: "Call → answer pipeline",
      },
      {
        kind: "workflow",
        src: "/projects/ai-voice-support/workflow.png",
        alt: "Fallback workflow",
      },
    ],
  },

  {
    slug: "gocyn",
    name: "Gocyn",
    summary:
      "Internship and mentorship platform, now growing into a full learning management system.",
    status: "Growing",
    year: "2024 — present",
    role: "Full-stack developer",
    stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Tailwind"],

    
    overview: [
      "Gocyn started as a way to match students with internships and mentors. It has since grown into a full LMS: cohorts, assignments, progress tracking and mentor feedback in one place.",
      "The interesting constraint was designing the data model so a simple internship listing could evolve into structured courses without a rewrite.",
    ],
    highlights: [
      {
        title: "One content model, two shapes",
        body: "A single content entity backs both one-off internship posts and multi-week mentored programmes — so the product could grow without a schema migration.",
      },
      {
        title: "Mentor workflows, not admin panels",
        body: "Review queues, feedback threads and progress dashboards designed around how mentors actually work, not around what was easy to render.",
      },
    ],
    url: "https://gocyn.com",
    deploy: { platform: "Vercel", url: "https://gocyn.com" },
    images: [
      {
        kind: "screen",
        src: "/projects/gocyn/dashboard.png",
        alt: "Mentor dashboard",
      },
      { kind: "uml", src: "/projects/gocyn/schema.png", alt: "Data model" },
    ],
  },

  {
    slug: "rp-infrastructure-website",
    name: "RP Infrastructure website",
    summary:
      "Marketing site for a construction company working across two states.",
    status: "Live",
    year: "2024",
    role: "Designer & developer",
    stack: ["Next.js", "TypeScript", "Tailwind", "SEO", "Vercel"],
    overview: [
      "A fast, credible marketing site for a construction firm that needed to look established online. The focus was on project galleries, clear service pages, and getting found locally across two different states.",
      "Built with static generation and structured data so every project page loads instantly and indexes properly, even on slow mobile connections on-site.",
    ],
    highlights: [
      {
        title: "Local SEO for two states",
        body: "Location and service schema, per-state landing pages and clean metadata lifted organic enquiries noticeably within the first quarter.",
      },
      {
        title: "Performance first",
        body: "Static rendering, optimised imagery and near-perfect Core Web Vitals on mobile — measured, not assumed.",
      },
    ],
    url: "https://rp-infrastructure.in",
    deploy: { platform: "Vercel", url: "https://infrastructure.in" },
    images: [
      {
        kind: "screen",
        src: "/projects/rp-infrastructure-website/home.png",
        alt: "Homepage",
      },
    ],
  },

  {
    slug: "garage-pos",
    name: "Garage POS",
    summary: "Barcode billing and point of sale for automotive workshops.",
    status: "Shipped",
    year: "2023",
    role: "Full-stack developer",
    stack: ["React", "Node.js", "SQLite", "IndexedDB", "Thermal printing"],
    overview: [
      "Workshops were writing job cards by hand and losing track of parts. This POS lets them scan a barcode, build an invoice in seconds, and keep parts and labour in one record.",
      "Designed to survive a real garage: runs on a cheap laptop, keeps working when the internet drops, and prints to a thermal printer without a browser dialog.",
    ],
    highlights: [
      {
        title: "Offline-first",
        body: "Sales queue locally in IndexedDB and sync when connectivity returns, so a dropped connection never stops a job.",
      },
      {
        title: "Scan to invoice",
        body: "Scan a part, auto-apply pricing and tax, and print a GST-compliant invoice in a single flow — no screen-hopping.",
      },
    ],
    images: [
      {
        kind: "screen",
        src: "/projects/garage-pos/pos.png",
        alt: "POS screen",
      },
    ],
  },
];
