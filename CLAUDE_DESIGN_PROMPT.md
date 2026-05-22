# Claude Design — Seal Team Six Playbook

How to get a blow-away initial design out of Claude Design (claude.ai/design), then hand off to Claude Code.

## Why this setup matters
Claude Design's output is only as good as the first prompt + the assets you give it. A thin prompt produces the generic "I used one Claude prompt" look. A dense, role-driven brief + your real logo/photos in **High Fidelity** mode produces premium, on-brand work. Refine after the first generation with **inline comments** (cheaper than re-prompting — each full prompt eats into your weekly plan limit).

## Setup (do this before pasting the prompt)
1. Open your project in Claude Design (you already named it "SealTeamSix716").
2. Choose **High Fidelity** (NOT Wireframe).
3. Upload these as context, from `R:\Documents\Claude\Projects\SealTeamSix\images\`:
   - `seal-team-six-logo.jpg` (brand colors + mark)
   - `parking-lot-line-striping-night.jpg` (dramatic hero reference)
   - `luxury-home-driveway-sealcoating-1.jpg`
   - `residential-driveway-sealcoating-1.jpg`
   - `auto-shop-parking-lot-before.jpg` + `auto-shop-parking-lot-after.jpg` (before/after concept)
   - `commercial-parking-lot-striping-2.jpg` (bold yellow striping)
4. Paste the prompt below into the chat panel.
5. Answer its clarifying questions — that dialogue is where the quality comes from.
6. Refine with inline comments. If a comment doesn't get picked up, paste the same text into the chat (known bug).
7. When you love it: **Export → Handoff to Claude Code**, then we feed that bundle + `BUILD_BRIEF.md` to Claude Code for the real build (working 3D, the scripted Sarge chatbot, and GitHub Pages deploy).

## What Claude Design will and won't do
- WILL: produce a stunning high-fidelity visual design / layout (real HTML/React on a canvas), desktop + mobile, plus design tokens.
- WON'T (that's the Claude Code phase): real working Three.js 3D, the functioning scripted chatbot, Formspree wiring, and the live deploy.

## THE PROMPT (paste into Claude Design, High Fidelity)

You are a top 0.01%, award-winning web and brand designer (Awwwards Site of the Day caliber). Design a stunning, high-fidelity homepage — desktop and mobile — for Seal Team Six, an owner-operated asphalt sealcoating, crack-filling and line-striping company in Buffalo, NY (Western New York). This must NOT look like a generic contractor template. Commit fully to a bold "tactical-premium" art direction: rugged and high-end, a subtle special-ops nod (the name is Seal Team Six) without becoming a cartoon.

Brand system to use exactly:
- Colors: asphalt black #0B0B0D and #141417 (base), safety yellow #FFD200 (primary accent, from their logo), concrete grays #6B7076 and #9AA0A6, road-line white #F4F4F5; hi-vis green #C8FF00 only as a rare "fresh seal" glow.
- Type: bold condensed industrial display (Anton / Archivo Black / Oswald) for headlines; clean grotesk (Inter / Sora) for body. Big, confident type scale.
- Motifs: asphalt grain texture, painted road-line dashes and stencil arrows as section dividers, hazard-stripe accents, faint HUD/targeting grid for a tactical feel. Cinematic depth and contrast.

Design these homepage sections as one scrolling page:
1. Sticky nav: logo left; links Services, Our Work, Why Us, Service Area, Contact; a "Call 716-907-8259" link and a yellow "Free Estimate" button.
2. Cinematic hero with a strong sense of 3D depth: headline "BUFFALO'S DRIVEWAYS, LOCKED DOWN.", subhead "Sealcoating · Crack Filling · Line Striping — residential & commercial, done mission-tight.", two CTAs, and a dramatic freshly-sealed-asphalt visual.
3. Trust bar: Locally owned · Since 2022 · Free Estimates · Residential + Commercial · ADA Striping.
4. Services grid: Sealcoating, Crack Filling, Line Striping (incl. ADA), Hot Asphalt / Patching, Concrete (via partner), Winter Snow Plowing & Salting.
5. Before/after comparison slider.
6. Photo gallery of finished work.
7. Why Seal Team Six (differentiators).
8. Service area (Buffalo + WNY suburbs like Clarence).
9. Contact: phone, email, and a lead-capture form.
10. Footer.
Also include a floating "Ask Sarge" chat launcher in the bottom-right — Sarge is the mascot, a cartoon harbor seal in a safety-yellow hi-vis vest and helmet holding a sealcoat wand.

Use the logo and job photos I've uploaded as the visual source of truth (real colors, real work). Audience: WNY homeowners (including luxury estates), commercial property managers, and schools. Ask me any clarifying questions first, then generate the desktop homepage, a mobile version, and the design tokens. Don't expand to other pages until I confirm.
