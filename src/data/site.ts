// All copy lives here. Edit freely: nothing else in the app hardcodes text.

export const site = {
  name: "Abhii",
  email: "hello@example.com", // TODO: replace with your real email
  links: [
    { label: "GitHub", href: "https://github.com/" }, // TODO
    { label: "LinkedIn", href: "https://www.linkedin.com/" }, // TODO
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
    title: "Abhii",
    body: "Computer science student. I build AI products people can actually use.",
    h1: true,
  },
  {
    id: "study",
    start: 0.24,
    end: 0.46,
    side: "right",
    title: "Studying AI and data science.",
    body: "B.Tech in Computer Science Engineering, specializing in AI and Data Science. I learn by shipping: voice agents, desktop tools, web platforms.",
  },
  {
    id: "family",
    start: 0.5,
    end: 0.74,
    side: "left",
    title: "Raised around job sites.",
    body: "My family's company, RP Infrastructure, builds homes and commercial projects across Uttar Pradesh and Madhya Pradesh. I build its software too.",
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

export type Project = {
  name: string;
  summary: string;
  tags: string[];
  url?: string;
};

export const projects: Project[] = [
  {
    name: "AI voice support platform",
    summary:
      "Answers customer calls for small and mid-size vendors, using each vendor's own product documents.",
    tags: ["Gemini", "RAG", "pgvector", "Django", "SIP"],
  },
  {
    name: "Android Webcam",
    summary: "Turns an Android phone into a virtual webcam on your desktop.",
    tags: ["Tauri", "Rust", "ADB", "MJPEG", "RTSP"],
  },
  {
    name: "Gocyn",
    summary:
      "Internship and mentorship platform, now growing into a full learning management system.",
    tags: ["Web platform", "LMS"],
  },
  {
    name: "Certificate builder",
    summary: "A drag-and-drop designer mentors use to make and issue certificates.",
    tags: ["Web app", "Drag and drop"],
  },
  {
    name: "RP Infrastructure website",
    summary:
      "Marketing site for a construction company working across two states.",
    tags: ["Next.js", "TypeScript", "SEO"],
  },
  {
    name: "Garage POS",
    summary: "Barcode billing and point of sale for automotive workshops.",
    tags: ["POS", "Barcode billing"],
  },
];
