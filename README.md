# Abhiman Vishwakarma — Portfolio

Personal portfolio built with Next.js App Router, React, TypeScript, and Tailwind CSS 4. The site presents an animated introduction, skills, project case studies, and contact links.

## Start here

```bash
npm install
npm run dev
```

Open `http://localhost:3000`. Run `npm run build` to create a production build and `npm run start` to serve it. Run `npm run lint` for ESLint.

## Project documentation

- [Recruiter readiness review](docs/RECRUITER_READINESS.md): evidence-based risks, prioritized fixes, and a portfolio content checklist.
- [Portfolio rebuild specification](docs/PORTFOLIO_BUILD_SPEC.md): the routes, design, data model, assets, behavior, and setup needed to recreate this portfolio.

## Where to edit content

- `src/data/site.ts`: identity links, homepage chapters, skills, and project case-study data.
- `src/data/intro.ts`: welcome-screen details.
- `src/app/layout.tsx`: site-wide metadata and fonts.
- `src/components/`: homepage sections and interactions.
- `src/app/projects/[slug]/page.tsx`: project detail route.
- `public/`: static video and image files.

Before publishing, follow the blockers and evidence checks in `docs/RECRUITER_READINESS.md`. The current project data contains placeholder URLs and claims that must be verified or replaced.

## Stack

Next.js 16, React 19, TypeScript, Tailwind CSS 4, Lenis, and Lucide/Hugeicons packages. See `package.json` for exact versions.
