# TechTips — a 3D-accented tech-tips website

A small, fast website that delivers bite-sized, jargon-free tech tips (phone,
security, Wi-Fi, productivity) in a polished 3D-accented layout: a live WebGL
hero scene, pointer-tilt tip cards, category filtering, and a step-by-step
detail modal.

## Stack

- **Vite + React 19 + TypeScript** — static single-page app
- **React Three Fiber** + **drei** — the WebGL hero scene (low-poly shapes)
- **Tailwind CSS v4** — styling and design tokens
- **framer-motion** — modal, filter and reveal animations
- **Higgsfield (GPT Image 2)** — all artwork (hero background + category icons)

The 3D split is deliberate: the hero is genuine WebGL, while tip cards are DOM
elements with a CSS-3D pointer tilt — keeping text crisp, accessible and cheap
on mobile. Everything degrades gracefully (`prefers-reduced-motion` skips the
canvas and tilt; missing images fall back to color-tinted gradients).

## Commands

```bash
npm install      # install dependencies
npm run dev      # dev server  → http://localhost:5173
npm run build    # typecheck + production build → dist/
npm run preview  # serve the production build
```

## Structure

```
src/
  data/tips.ts          # all tip content + categories (edit here to add tips)
  components/           # Nav, Hero, HeroScene, CategoryCards, CategoryFilter,
                        # TipGrid, TipCard, TipModal, Artwork, Footer, Logo
  hooks/                # useTilt, useReducedMotion
public/assets/          # Higgsfield-generated artwork (hero + 4 category icons)
scripts/ASSETS.md       # prompts + pipeline for regenerating artwork
```

## Editing content

All tips live in `src/data/tips.ts` — add an entry to the `tips` array (id,
category, title, summary, effort, steps). No other changes needed.

## Artwork

Generated with the Higgsfield CLI and converted to `.webp`. To regenerate or
add images, see [`scripts/ASSETS.md`](scripts/ASSETS.md).

## Deployment

`npm run build` produces a static `dist/` — deploy to Vercel, Netlify or GitHub
Pages. No backend required.
