# Seal Team Six — Sealcoating & Striping

Production website for **Seal Team Six**, owner-operated asphalt sealcoating, crack-filling, and line-striping in Buffalo, NY (Western New York).

🌐 **Live:** https://sealteamsix716.github.io
📞 **716-907-8259** · ✉️ Seal.Team.Six.Snow@gmail.com · [Facebook](https://www.facebook.com/SealTeamSix.716)

## What's in here

- **`index.html`** — the single-page site, served from repo root by GitHub Pages.
- **`/css/styles.css`** — production stylesheet (asphalt-black + safety-yellow tactical-premium design system).
- **`/js/`** — vanilla JS modules:
  - `main.js` — nav, before/after slider, gallery + lightbox, contact form, scrollspy
  - `hero3d.js` — Three.js cinematic hero scene (lazy-loaded; falls back to a static image on mobile, reduced-motion, or no-WebGL)
  - `sarge.js` — "Ask Sarge" chatbot logic (Fuse.js fuzzy match, pricing-guard regex, Formspree submit, localStorage persistence)
  - `knowledge-base.js` — Sarge's 160+ Q&A entries (see "Owner verification" below)
- **`/images/`** — original photos + optimized WebP variants at 1600w and 800w, plus the four chroma-keyed mascot PNGs.
- **`/assets/`** — favicons + Open Graph image.
- **`/design/`** — the approved Claude Design comp (visual source of truth, not served).
- **`/scripts/`** — Python utilities used during the build (chroma-key, image optimization, favicon generation). Not used at runtime.

## Deploy

Pure static — GitHub Pages serves `main` root. No build step.

```bash
git add .
git commit -m "Update site"
git push
```

Live within ~1 minute. Hard-refresh to clear cache (Ctrl/Cmd + Shift + R).

## Owner verification ([VERIFY W/ OWNER])

Dan — these chatbot answers use cautious placeholder wording. Please confirm/edit before promoting heavily:

- **Insurance & licensing** — `kb-155` in `js/knowledge-base.js`
- **Warranty / guarantee** — `kb-153`, `kb-154`
- **Payment methods / deposit / financing** — `kb-160`, `kb-161`, `kb-162`

Edit the `answer:` field on those entries and commit.

## Testimonials

The six testimonials in the "Why Us" section are realistic-looking placeholders, clearly marked in the HTML source with a comment. Replace with real reviews when you have them.

## Formspree

Estimate form posts to `https://formspree.io/f/mgoqkqqd`. Both the in-page contact form and the in-chat Sarge form use this single endpoint.

## Image credits

All photos owned by Seal Team Six. Mascot artwork generated for STS and chroma-keyed for transparent use.
