# Claude Code Build Prompt — Seal Team Six

Paste the block below into Claude Code (with this project folder open). It builds the production site + the Sarge chatbot and deploys to GitHub Pages.

---

You are a top-0.01%, award-winning web designer and front-end engineer building the production website for **Seal Team Six — Sealcoating & Striping** (Buffalo, NY). This is a flagship "blow them away" build for the company's owners — NOT a boilerplate contractor template. Work carefully and verify your work.

## Step 0 — Orient, then STOP for my approval (do this first)
1. Read `CLAUDE.md`, `BUILD_BRIEF.md`, and `sarge-knowledge-base.md` in full.
2. Look at every image in `/images/` and study the approved design comp in `/design/` (especially `design/tokens.jsx`, `design/styles.css`, `design/desktop-1/2/3.jsx`, `design/mobile.jsx`, `design/sarge.jsx`). That comp is the visual source of truth — match it.
3. Sync the repo before adding anything: run `git fetch origin` then `git checkout -B main origin/main` (origin/main has an auto README to reconcile).
4. Then present your build plan, the file structure you'll create, your 3D hero approach, and any questions — and **WAIT for my explicit "go" before writing code.** Give me commands one at a time; I'm a novice coder, so explain plainly.

## What to build
A clean, hand-built **static** site (HTML / CSS / vanilla JS — no framework build step) with `index.html` at the repo root and assets in `/css`, `/js`, `/assets`, and the existing `/images`. Faithfully rebuild the approved `/design/` comp: sticky nav, cinematic hero, trust bar, services, before/after slider, gallery, why-us, service area, contact, footer. Mirror the tokens in `design/tokens.jsx` + `design/styles.css` exactly.

**Standards (non-negotiable):** Three.js 3D hero from CDN with graceful + `prefers-reduced-motion` fallback; Lighthouse 90+ all four categories (compress/resize photos, generate WebP, lazy-load); WCAG 2.1 AA (semantic HTML, alt text, keyboard, visible focus); full SEO (title/meta, Open Graph/Twitter, LocalBusiness + Service JSON-LD, sitemap.xml, robots.txt, favicon from the logo).

**Mascot images** are final and in `/images/`: `Mascot_V2.png` → hero, `Mascot_V3.png` → chat launcher, `Mascot_V1.png` (already transparent) → "Free Estimate" CTAs, `Mascot_V4.png` → footer / form-success. **Chroma-key the solid green out of V2/V3/V4** and save transparent PNGs (e.g. with ImageMagick) before using them. Do NOT draw an SVG seal.

## The "Ask Sarge" chatbot (the centerpiece)
- **Launcher:** floating button, bottom-right, using `Mascot_V3.png`. It appears after a **~2–3 second delay** with a small **speech-bubble** nudge ("Ask me anything about your driveway!"). Clicking opens the chat panel; respects reduced-motion.
- **Persona:** Sarge — a drill-sergeant who's **fun but genuinely clear and helpful** (light "Listen up — here's the deal" flavor, never rude, always actually answers).
- **Brains (100% static, no backend, no API keys):** Build the knowledge base from `sarge-knowledge-base.md` — parse it into a JS data structure `{id, category, question, keywords[], answer, routeToForm}` and **expand it to be genuinely complete (aim for 150+ entries with natural phrasing variants)** so it feels real when the owners test it. Use **Fuse.js (from CDN)** for typo-tolerant fuzzy matching (threshold ~0.3, weight question/keywords highest). Show **suggested-question chips** to guide users, and a friendly fallback ("I didn't catch that — here's what I can help with…" + chips + the estimate form) when nothing matches well.
- **Pricing rule (critical):** the bot must **never state an exact dollar price.** Any pricing/quote/booking question gives the helpful "here's what affects it" answer, then routes the user to the estimate form (entries tagged `[ROUTE TO ESTIMATE FORM]`).
- **Estimate form → email via Formspree:** a clean form (name, phone, email, service, property type, approx size, location/ZIP, timeline, notes) that submits with `fetch` POST to `https://formspree.io/f/FORMSPREE_FORM_ID` with header `Accept: application/json`, shows a success state using `Mascot_V4.png` ("Mission accepted — the crew will reach out within 24 hours"), and handles errors by falling back to phone/email. Put `FORMSPREE_FORM_ID` as one clearly-labeled constant for me to fill in. Do NOT hardcode any secret — the Formspree ID is the only external value and it's public-safe.
- Persist chat state in `localStorage`. Make the panel fully responsive (near full-screen on mobile), keyboard-accessible, with an ARIA live region.
- Flag the `[VERIFY W/ OWNER]` answers (insurance, warranty, payment) so I can confirm/edit them.

## Deploy
After I approve and you've built it: replace the placeholder README with a short real one, then `git add .` → `git commit` → `git push -u origin main`. It deploys to **https://sealteamsix716.github.io** (user repo, serves `main` root). Remind me it can take ~1 minute, and give me the exact commands one at a time.

## Verify before calling it done
Take screenshots (desktop + mobile), test the chatbot with several real questions **including a price question** (confirm it routes to the form, never quotes a number), confirm the form posts, and run/Report Lighthouse. If you can't verify something, say so — don't claim it works.

## Guardrails
Write complete files top to bottom (no snippets). Never commit secrets. Keep `index.html` at root. Match the approved design — don't free-style a different look. Ask me before any destructive change.
