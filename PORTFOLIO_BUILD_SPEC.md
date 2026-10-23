# Portfolio build specification

This document describes the current portfolio so another developer can recreate its structure and behavior. It is based on the checked-out source. URLs, project claims, and deployment state must be confirmed by the portfolio owner before publishing.

## 1. Product goal

Build a dark, editorial portfolio for Abhiman Vishwakarma, a computer science student focused on AI/data science and full-stack software. Visitors should be able to understand the candidate, scan practical skills, inspect project case studies, and contact him. The visual experience uses a scroll-scrubbed video but must retain a readable, usable experience when motion or video is unavailable.

Primary audiences: recruiters, hiring managers, engineers reviewing project depth, and collaborators. Primary actions: view work, open a project case study, reach the candidate by email, and open professional profiles.

## 2. Technology and local setup

- Next.js `16.4.1` App Router, React `19.3.0`, TypeScript, Tailwind CSS `4.3.3` (see `package.json` for exact dependency declarations).
- Fonts: Geist, Bricolage Grotesque (display), and Newsreader (body), loaded with `next/font/google` in `src/app/layout.tsx`.
- Lenis smooth scrolling, Lucide/Hugeicons packages, and custom CSS/React canvas effects.
- Node/npm: install dependencies with `npm install`, run locally with `npm run dev`, build with `npm run build`, serve a build with `npm run start`, lint with `npm run lint`.
- TypeScript strict mode and `@/*` alias mapped to `src/*` in `tsconfig.json`.

## 3. Routes and page structure

### `/`

Root layout in `src/app/layout.tsx`; home route in `src/app/page.tsx`. The page composes:

1. `Intro`: animated welcome dialog with identity/education/availability rows, progress indicator, and skip control.
2. `SmoothScroll`: initializes Lenis unless reduced motion is requested.
3. `Header`: fixed desktop navigation and responsive mobile drawer.
4. `ScrollVideoHero`: sticky video, chapter copy, scroll progress rail, and links to work/contact.
5. `Skills`: six groups of skills with descriptions and chips.
6. `Work`: four project cards generated from shared data.
7. `Contact`: email, copy-email button, social links, and copyright year.

The root page IDs are `top`, `skills`, `work`, and `contact`. Do not link to anchors that are not present.

### `/projects/[slug]`

Dynamic detail page at `src/app/projects/[slug]/page.tsx`. `generateStaticParams()` creates a page per project. Unknown slugs call `notFound()`. The route has project-specific title/description metadata, an “All work” return link, status/title/summary, year/role/stack metadata, overview, highlights, technology chips, optional live-site CTA, and previous/next navigation.

Current data slugs: `ai-voice-support`, `gocyn`, `rp-infrastructure-website`, `garage-pos`.

## 4. Visual system

- Near-black background (`#000` / `#08080a`) and warm off-white primary text; muted gray supporting text; blue/purple accents.
- Responsive spacing uses CSS `clamp()` and a shared page-padding token.
- Bricolage Grotesque for headings/display, Newsreader for body, Geist as sans utility.
- Cards use thin translucent borders, restrained gradients, rounded corners, and hover focus/spotlight treatment.
- Project detail pages use a narrow centered column, ambient gradient backdrop, metadata panel, highlight cards, stack chips, and prev/next links.
- Global styles and section/component styles currently live in `src/app/globals.css`, `src/components/intro.css`, and component-level CSS strings. A rebuild can preserve this organization or consolidate styles, but should keep tokens and responsive behavior consistent.

## 5. Content and data model

`src/data/site.ts` is the central content source. It exports:

- `site`: name, email, social links.
- `chapters`: scroll progress range, alignment, title, supporting text, heading flag, hold/action flags.
- `Project`: slug/name/summary/stack/status/overview/highlights/year/role/live URL/deployment/repository/images.
- `skills`: group title, focus description, and skill names.

`src/data/intro.ts` derives the intro name from `site` and contains greeting plus four info rows. Keep the identity consistent across both files. Prefer one source of truth for contact and availability.

### Project content requirements

Each project should include: accurate status and year, actual role/team, concise user problem, specific personal contributions, real stack, working demo/source links if public, and evidence-backed outcomes. Images use public-root paths (for example `/projects/<slug>/screen.png`) and meaningful alt text. Add those image files to `public/projects/<slug>/` and render them in the case-study page. Never add placeholder links or invented claims.

## 6. Static assets and behavior

- Current hero media: `public/video/portfolio-scrub.mp4` (15,367,300 bytes) and `public/video/poster.jpg` (127,005 bytes).
- `src/lib/videoStore.ts` starts a one-time fetch, tracks progress, converts the full video to a Blob URL, and shares it with the intro and hero. On failure, the hero uses the direct public URL.
- `ScrollVideoHero` maps scroll progress to video time and chapter visibility. It uses a poster while the video loads and attempts to prime seeking for iOS.
- `next.config.ts` sets one-year immutable cache headers for `/video/*` in production only.
- `SmoothScroll` skips Lenis when reduced motion is enabled.
- `Intro` stores session dismissal in `sessionStorage` and has a maximum wait timeout and skip button.

For a robust rebuild, keep the content and primary actions available before media loads; use a static, accessible fallback for reduced motion and video failure. Avoid requiring a full large-file download before someone can read the portfolio.

## 7. Navigation map

Expected functional links:

- Brand/home → `/`
- Skills → `/#skills`
- Work → `/#work`
- Contact → `/#contact`
- Project card → `/projects/<slug>`
- Project detail back link → `/#work`
- Project detail previous/next → adjacent project detail routes
- Email → `mailto:<verified email>`
- Social profiles → verified external profile URLs

The current header also contains Updates/Blogs links without matching pages and a placeholder mobile email; remove or implement them before shipping.

## 8. Metadata and deployment

Global metadata currently sets a site title and description. Project pages derive a title and description. For a production release, set the real canonical domain (`metadataBase`), social preview image/metadata, and any needed sitemap/robots configuration. Use the hosting platform’s documented Next.js deployment flow and verify the deployed route paths, asset caching, and media size. No deployment provider/domain should be assumed based on source alone.

## 9. Accessibility and quality requirements

- Semantic landmarks and a coherent heading order; one meaningful page-level `h1`.
- Text alternative for the animated brand; every image has meaningful alt text or is decorative.
- Keyboard operability, visible focus, correct dialog focus management, and useful skip behavior.
- Reduced-motion experience removes scroll scrubbing and long entrance animation, not just easing.
- Contrast is checked on final rendered colors; copy-email failures are announced visibly.
- All navigation and outbound links work on desktop/mobile; unavailable routes are not advertised.
- Project claims and links are checked against actual evidence.
- Responsive review includes narrow mobile, tablet, and desktop, plus slow network/video failure.

## 10. Rebuild checklist

1. Confirm the candidate’s role target, profile URLs, email, education, availability, and resume.
2. Confirm each project’s status, role, team, dates, stack, share permissions, and evidence.
3. Scaffold the Next.js App Router project and implement root metadata/fonts/global tokens.
4. Build the page sections and working navigation before adding animation.
5. Create typed portfolio/project/skill content and the dynamic project route.
6. Add optimized local assets and complete project case studies.
7. Add optional motion/video with reduced-motion and media-failure fallbacks.
8. Verify every internal/external link, route, keyboard flow, mobile layout, and production metadata.
9. Run the repository’s build/lint workflows and review the deployed site before sharing it.

## 11. Current source map

```text
src/app/layout.tsx                   root layout, fonts, global metadata
src/app/page.tsx                     home page composition
src/app/globals.css                  design tokens and global styling
src/app/projects/[slug]/page.tsx     dynamic project case study
src/components/Intro.tsx             welcome overlay
src/components/Header.tsx            desktop/mobile navigation
src/components/ScrollVideoHero.tsx   scroll-linked video narrative
src/components/Skills.tsx            skill groups
src/components/Work.tsx              project cards
src/components/Contact.tsx           contact and social links
src/components/SmoothScroll.tsx      Lenis setup
src/lib/videoStore.ts                shared media download state
src/data/site.ts                     identity, chapters, projects, skills
src/data/intro.ts                    welcome screen copy
public/video/                        hero MP4 and poster image
```
