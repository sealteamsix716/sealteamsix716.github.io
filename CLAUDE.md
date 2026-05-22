# CLAUDE.md — Seal Team Six Website

Project context for Claude Code. Read this in full at the start of every session in this repo.

## What this is
Marketing website for **Seal Team Six — Sealcoating & Striping**, an owner-operated asphalt sealcoating, crack-filling, and line-striping company in **Buffalo, NY** (Western New York). In business since 2022. This is a flagship, best-in-class build. The bar is "absolutely blow them away" — NOT a boilerplate contractor template.

## Live deploy (already wired up)
- Host: **GitHub Pages**, user repo `sealteamsix716/sealteamsix716.github.io` → serves from the `main` branch **root**.
- Live URL: **https://sealteamsix716.github.io**
- Git remote is already set via SSH alias: `git@github-sealteamsix716:sealteamsix716/sealteamsix716.github.io.git`
- This local folder **is** the repo (already `git init`'d on `main`).
- `origin/main` currently holds only an auto-generated `README.md`. **Reconcile it first:** `git fetch origin` then `git checkout -B main origin/main` BEFORE adding new files — otherwise the push will be rejected.
- `index.html` MUST live at the repo root for Pages to serve it. Keep assets at root level: `/images`, `/css`, `/js`, `/assets`.

## Approved design — build to match this
The approved look is the Claude Design comp in `/design/`. Study it before building and mirror it:
- `design/tokens.jsx` + `design/styles.css` — approved design system (colors, type scale, spacing, shadows). Reuse these token values exactly in the production CSS.
- `design/desktop-1.jsx` (Nav · Hero · TrustBar), `design/desktop-2.jsx` (Services · Before/After · Gallery), `design/desktop-3.jsx` (WhyUs · ServiceArea · Contact · Footer) — approved desktop layout + copy.
- `design/mobile.jsx` — approved mobile layout.
- `design/sarge.jsx` — reference for the chat launcher/panel structure (rebuild in vanilla JS).
`/design/` is the visual source of truth. The production site is a clean, hand-built static rebuild of that comp — NOT the Babel-in-browser React files shipped as-is.

## Tech constraints (non-negotiable)
- Pure **static** site: HTML / CSS / vanilla JS. No back end. No build step that breaks GitHub Pages (no bundler output buried where Pages can't see it). If you use any tooling, the final committed output must be plain static files at root.
- **3D** via Three.js from CDN. Must degrade gracefully and respect `prefers-reduced-motion`.
- Performance budget: **Lighthouse 90+** in all four categories. Compress/resize the source photos (they're large), generate WebP, lazy-load below the fold.
- Accessibility: **WCAG 2.1 AA** — semantic HTML, alt text on every image, keyboard navigation, visible focus, reduced-motion fallbacks.
- SEO: complete `<title>`/meta, Open Graph + Twitter cards, **LocalBusiness + Service JSON-LD**, `sitemap.xml`, `robots.txt`, favicon from the logo. Target local keywords: "driveway sealcoating Buffalo NY", "asphalt sealcoating WNY", "line striping Buffalo", "parking lot striping", "crack filling".

## Brand
- Vibe: **TACTICAL-PREMIUM** — rugged AND high-end. Lean into the special-ops "Seal Team Six" name without becoming a cartoon.
- Colors: asphalt black `#0B0B0D` / `#141417`, **safety yellow `#FFD200`** (primary accent, straight from the logo), concrete grays `#6B7076`/`#9AA0A6`, road-line white `#F4F4F5`. Optional hi-vis green glow `#C8FF00` used sparingly for "fresh seal."
- Type: bold industrial/condensed display (Anton, Archivo Black, or Oswald; a stencil face used sparingly for accents) + clean grotesk body (Inter, Sora, or Manrope).
- Motifs: asphalt grain texture, painted road lines/stencils, hazard stripes, subtle HUD/targeting elements.

## Services (real)
Sealcoating, crack filling, line striping (including **ADA** stalls), hot asphalt / patching, concrete (via partner Xquisit Concrete LLC). Winter: snow plowing, salting, sidewalks & walkways. Customers span residential driveways, luxury/estate homes, commercial lots, storefronts, and schools. Service area: Buffalo + WNY suburbs (e.g., Clarence).

## Real contact info (put on the site)
- Phone: **716-907-8259** (use `tel:` and a click-to-text option)
- Email: **Seal.Team.Six.Snow@gmail.com**
- Facebook: facebook.com/SealTeamSix.716
- Lead capture → email via **Formspree** (free). Use a clear placeholder `FORMSPREE_FORM_ID` constant; Dan will paste the real ID.

## Mascot — FINALIZED (use these real images; do NOT draw an SVG seal)
**"Sarge the Seal"** — a bold, muscular cartoon harbor-seal drill sergeant in a safety-yellow hi-vis vest + tan campaign hat, holding a dripping sealcoat squeegee. Four approved poses are in `/images/`, each mapped to a spot on the site:
- `Mascot_V1.png` — bust, pointing at viewer. **Already transparent — ready to use.** → **CTAs / "Free Estimate" buttons.**
- `Mascot_V2.png` — full body, pointing, full uniform. Green-screen bg. → **hero section.**
- `Mascot_V3.png` — bust, thumbs-up + wink. Green-screen bg. → **floating chatbot launcher button.**
- `Mascot_V4.png` — bust, salute. Green-screen bg. → **footer / "mission accepted" after form submit.**
Knock the solid green out of V2/V3/V4 (chroma-key to transparent PNG) before use. Do NOT generate an SVG seal — these images ARE the brand mascot.

## Chatbot ("Ask Sarge")
Floating launcher (bottom-right, uses `Mascot_V3.png`); appears after a ~2–3s delay with a small speech-bubble nudge ("Ask me anything about your driveway!"). Opens a chat panel hosted by Sarge (drill-sergeant persona — fun but genuinely helpful). It answers customer questions from a **large built-in knowledge base** (sealcoating, crack filling, striping/ADA, asphalt patching, concrete, prep, curing, timing/weather, residential vs commercial, winter, service area, warranty, scheduling, etc.) via client-side matching — **fully static, no API keys, no backend.** **Never quotes an exact price:** any pricing/booking question gives a helpful non-price answer (the factors involved) and routes to a **Formspree estimate form** (placeholder `FORMSPREE_FORM_ID`) that emails the lead to the company. Full spec lives in the Claude Code build prompt. `localStorage` may persist chat state.

## Image library
All in `/images`, descriptively named (full inventory + descriptions in `BUILD_BRIEF.md`). Matched before/after pairs: `auto-shop-parking-lot-{before,after}`, `country-driveway-sealcoating-{before,after}`, `residential-garage-driveway-{before,after}`, `parking-lot-striping-{before,after}` (last pair is tentative — verify visually). Strong hero candidates: `parking-lot-line-striping-night.jpg` (dramatic), the three `luxury-home-driveway-sealcoating-*.jpg`, `residential-driveway-sealcoating-1.jpg`. Logo: `seal-team-six-logo.jpg`.

## Guardrails (Dan's working rules)
- **Clarification gate:** before writing any code, read this file + `BUILD_BRIEF.md`, view every image in `/images`, then present your proposed plan/structure and any questions, and **WAIT for Dan's explicit "go."** Do not start building unprompted.
- **Sync first:** reconcile `origin/main` before adding files (see Live deploy above).
- Write **complete files**, top to bottom — never partial snippets.
- **Never commit secrets/keys.** The Formspree form ID is public-safe; nothing else sensitive belongs in the repo.
- Dan is a novice in code, expert in business/marketing — explain technical choices plainly, one step at a time, and tell him exactly what to run.
- After deploy, remind Dan it can take ~1 minute for Pages to go live, and give him the exact commands.
