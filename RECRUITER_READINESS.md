# Recruiter readiness review

Reviewed: 22 October 2026. This is a source-code and content review of the checked-out portfolio, not a live-browser, accessibility-audit, or Google hiring evaluation. No portfolio can establish that Google will reject or accept a candidate; this document flags issues that could reduce trust, make work hard to verify, or prevent a reviewer from understanding the candidate quickly.

## Executive read

The visual direction is distinctive and the site has a useful structure: identity, skills, project cards, and project detail routes. The biggest risks are not the visual design. They are broken or placeholder contact/project links, unsupported high-impact claims, missing case-study evidence, and navigation pointing to pages/anchors that do not exist. Fix those before polishing animation.

## High-priority blockers

### 1. Placeholder URLs are rendered as real calls to action

- `src/data/site.ts` sets the AI Voice Support live and AWS deployment URLs to `https://…`. The case-study route renders `project.url` as a live-site button, and the project card advertises its deployment platform. A reviewer who clicks these gets a broken destination; it also makes the project look unfinished.
- The same file marks the email and social profiles as TODOs. The email has a TODO comment despite being a syntactically plausible address; verify ownership and deliverability. Confirm the exact GitHub and LinkedIn URLs and that they point to the intended public profiles.
- `src/components/Header.tsx` includes `mailto:you@example.com`, an obvious template placeholder.

**Fix:** replace every destination with a verified URL, or omit the corresponding CTA/status/platform until a real destination exists. Search the repository for `TODO`, `…`, `example.com`, and temporary URLs before publishing.

### 2. Project pages make claims without visible proof

`src/data/site.ts` describes tenant isolation “verified by a dedicated leak test” on every commit, sub-second turn-taking, warm transfers, measurable SEO enquiry growth, and near-perfect Core Web Vitals. These are strong, testable claims. The project pages currently show prose and stack chips, but do not render the supplied `images`, `repo`, or `deploy.url` fields. The referenced project screenshots/diagrams are also absent from `public/` (only the video and starter SVGs are present).

**Fix:** for each claim, add a link or artifact that lets a reviewer validate it: public source/demo where safe, redacted screenshots, architecture diagram, test/CI output, benchmark method and result, or analytics with dates and baseline. If evidence cannot be shared, rewrite the claim to match what can be substantiated. Do not invent metrics or imply production usage that did not happen.

### 3. Navigation advertises unavailable content

`src/components/Header.tsx` links “Updates” to `/updates` and “Blogs” to `/blogs`; no such route exists in `src/app/`. The blog submenu points to `/#blogs`, but no `blogs` section exists on the homepage. This sends reviewers to dead ends and makes the site appear incomplete.

**Fix:** remove those menu entries until the routes/content exist, or implement the pages and real anchors. Test every desktop/mobile navigation item and project URL on the deployed site.

### 4. Some project descriptions read like unverified product marketing

Examples include “In production,” “Founding engineer,” “without a schema migration,” “lifted organic enquiries noticeably,” and “near-perfect Core Web Vitals.” The text does not identify collaborators, exact personal contribution, dates of measured results, or the basis for these outcomes. This can trigger skepticism, especially when the links and artifacts are missing.

**Fix:** clearly state team size, your own work, what shipped, what is still a prototype, and what evidence supports outcomes. Replace vague result language (“noticeably,” “near-perfect”) with a measured result plus timeframe and method, or remove the outcome claim.

## Important improvements

### 5. The candidate story is broad and inconsistent

The hero says “Computer science student” and “AI and data science”; the contact section says open to full-time AI Engineering and Full-Stack roles; the intro says open to internships. The site lists a very broad tool set without experience levels or examples, and some project stacks differ from the listed skills. A recruiter may have trouble identifying the intended role and level.

**Fix:** choose the current target (for example, software engineering internship, AI engineering internship, or new-grad role) and make the headline, availability, and project ordering consistent. Make the strongest skills visible through project evidence instead of listing every technology equally.

### 6. Case studies need implementation detail and outcomes

Project detail pages show overview paragraphs, highlights, stack, and previous/next links. They do not currently render project images, source-code links, deployment links beyond `url`, or a clear “problem → your contribution → tradeoffs → result” narrative. Garage POS has no repository or live/demo link in its data; Gocyn and RP Infrastructure also lack repository links.

**Fix:** add, when shareable: a demo, repository/readme, screenshots with captions, architecture or data model, role and team, constraints, key implementation decisions, testing approach, what failed/changed, and a truthful outcome. For confidential work, provide a sanitized walkthrough and explain the restriction.

### 7. Identity and recruiter basics are incomplete

There is no resume/CV link, education institution or graduation date, experience timeline, or location/time-zone context beyond Satna in the intro. The page does not state work authorization or relocation preference (only add these if relevant and accurate). There is no clear way to download a concise candidate profile.

**Fix:** add a current, accessible PDF resume; school, degree, expected graduation date, relevant experience, and truthful location/availability. Keep private details off the public site unless needed.

### 8. Search/social preview metadata is minimal

`src/app/layout.tsx` has a title and description but no canonical base URL, Open Graph/Twitter card metadata, or preview image. Per-project metadata is generated, which is a good starting point, but inherits no site URL or social image configuration.

**Fix:** set `metadataBase` to the real production domain and provide accurate Open Graph/Twitter titles, descriptions, and a preview image. Add sitemap/robots metadata if the site should be indexed. Never publish a guessed canonical domain.

## UX, accessibility, and reliability risks

### 9. The intro blocks the portfolio while loading

`src/components/Intro.tsx` renders a modal welcome screen and locks page scrolling until the video download finishes or the 15-second timeout fires; there is a skip button. This delays access to the portfolio on slow connections. The dialog does not show explicit focus placement/trapping or focus restoration in the inspected code. Reduced-motion users get a shorter delay, but still encounter the intro.

**Fix:** make the portfolio immediately readable and keep the intro optional/non-blocking. If retaining a modal, implement and verify keyboard focus management, Escape behavior, screen-reader announcement, skip behavior, and restoration. Do not require a large video download to reach contact or work.

### 10. The hero fetches and buffers a 15.4 MB video up front

`src/lib/videoStore.ts` downloads the whole MP4 into memory as Blob parts before the hero uses it. `ScrollVideoHero` also uses `preload="auto"` and continuously runs a requestAnimationFrame loop. The file is 15,367,300 bytes. On mobile or metered connections this can add delay, memory pressure, and battery use.

**Fix:** measure on throttled mobile networks; consider a smaller/optimized video, defer loading until needed, avoid retaining redundant copies, stop animation work when offscreen, and provide a static image/text path when video is unavailable. Keep the narrative and navigation usable without JavaScript/video.

### 11. Reduced-motion support is partial

The hero detects `prefers-reduced-motion` and removes easing, but still ties the text/video to a 500 viewport-height scroll journey. The intro remains a modal. Several other areas have CSS overrides, which is a good base, but the full experience needs a manual reduced-motion review.

**Fix:** for reduced motion, remove the scroll scrub and reveal the same content as a normal static hero; make the welcome animation skippable or omit it.

### 12. Heading semantics and accessibility need verification

Both the welcome overlay (`Intro.tsx`) and the scroll hero (`ScrollVideoHero.tsx`) render an `h1` in the initial page markup. The header logo is a canvas/effect component with no obvious textual link in the inspected JSX. Important information is also visually revealed across a scroll-linked video sequence.

**Fix:** use one clear page-level `h1`, provide a real text home link/name, ensure all copy is present in a sensible reading order, test keyboard-only navigation and a screen reader, and verify contrast at actual rendered sizes. Run an automated accessibility scan, then manually check the motion and focus behavior.

### 13. Some contact/status language may be misleading

`src/components/Contact.tsx` says “Available for new opportunities” and “open to full-time AI Engineering and Full-Stack roles,” while the welcome content says “Open to Internships.” The copy button depends on Clipboard API and reports failures only to the console. The status may be stale.

**Fix:** align availability with reality, add a visible copy failure fallback/status, and verify email delivery.

## Project-by-project evidence checklist

Do not publish claims in this table unless the owner confirms them.

| Project                   | Current gaps to resolve                                                                                                                 | Evidence to add                                                                                                                                                      |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AI voice support platform | Placeholder live/AWS URLs; production/founding-engineer claim; no public repo or screenshots available in `public/`                     | Confirm status, role/team and tenant model; real demo or sanitized recording; architecture; tests/CI link; latency definition and benchmark; safe source/readme link |
| Gocyn                     | No repo link; “Growing” and present-tense claims; architecture/schema image missing                                                     | Confirm current product state and personal contribution; accessible demo; screenshots; schema/model explanation; what changed since 2024                             |
| RP Infrastructure website | Two different deployment URLs (`rp-infrastructure.in` and `infrastructure.in`); SEO and performance impact claims lack figures/evidence | Confirm canonical live domain; permission to showcase; analytics baseline/timeframe; Core Web Vitals report; screenshots and source link if shareable                |
| Garage POS                | No live/demo or repo link; “GST-compliant” and offline/printing claims lack proof                                                       | Confirm actual field use and compatibility; short demo; test evidence; offline/sync behavior; repo/readme and scope of personal work                                 |

## Recommended order of work

1. Replace/verify email, GitHub, LinkedIn, every live/demo/deploy URL, and the mobile menu contact link. Remove broken Updates/Blogs navigation.
2. Verify each project’s status, role, team, dates, stack, and every performance/business/security claim. Remove anything you cannot support.
3. Add working project evidence and media; update the project detail template to display those fields. Do not add fabricated screenshots or metrics.
4. Pick one target role and align the hero, internship/full-time availability, project ordering, skills, and resume.
5. Add resume and education/experience basics; complete production metadata and social preview.
6. Review loading performance, keyboard/focus, reduced motion, mobile layout, and every destination on the deployed site.

## Evidence pack to prepare

For each featured project, collect: one-sentence problem, users/context, your role and team, dates/status, 2–3 decisions you personally made, one hard tradeoff, test/measurement method, truthful outcome, public links, and 2–4 shareable artifacts. Ask permission before publishing employer/client data, customer information, or screenshots containing secrets.
