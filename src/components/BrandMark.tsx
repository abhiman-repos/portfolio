import type { CSSProperties } from "react";
import {
  siDocker,
  siDjango,
  siGithub,
  siGithubactions,
  siGooglegemini,
  siLangchain,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPrisma,
  siPython,
  siReact,
  siRedis,
  siSqlite,
  siTailwindcss,
  siTypescript,
  siVercel,
  type SimpleIcon,
} from "simple-icons";

const brandByTechnology: Record<string, SimpleIcon> = {
  Python: siPython,
  TypeScript: siTypescript,
  React: siReact,
  "Next.js": siNextdotjs,
  Django: siDjango,
  "Django REST Framework": siDjango,
  "Google Gemini API": siGooglegemini,
  Gemini: siGooglegemini,
  LangChain: siLangchain,
  PostgreSQL: siPostgresql,
  pgvector: siPostgresql,
  Redis: siRedis,
  "MongoDB Atlas": siMongodb,
  Docker: siDocker,
  "Git / GitHub": siGithub,
  "GitHub Actions (CI/CD)": siGithubactions,
  Vercel: siVercel,
  Prisma: siPrisma,
  Tailwind: siTailwindcss,
  "Tailwind CSS": siTailwindcss,
  "Node.js": siNodedotjs,
  SQLite: siSqlite,
};

export function getTechnologyBrand(name: string) {
  return brandByTechnology[name];
}

export default function BrandMark({
  name,
  className = "",
  color,
}: {
  name: string;
  className?: string;
  color?: string;
}) {
  const brand = getTechnologyBrand(name);
  if (!brand) return null;

  const style = { color: color ?? (brand.hex === "000000" ? "#f5f5f7" : `#${brand.hex}`) } as CSSProperties;
  return (
    <svg
      className={`brand-mark ${className}`}
      viewBox="0 0 24 24"
      role="img"
      aria-label={`${brand.title} logo`}
      style={style}
      focusable="false"
    >
      <path fill="currentColor" d={brand.path} />
    </svg>
  );
}
