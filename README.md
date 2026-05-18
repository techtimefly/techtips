# TechTips — a 3D-accented tech-tips website

A small, fast website that delivers bite-sized, jargon-free tech tips (phone,
security, Wi-Fi, productivity) in a polished 3D-accented layout: a live WebGL
hero scene, pointer-tilt tip cards, category filtering, and a step-by-step
detail modal. Longer how-tos live in a separate **Guides** section as full,
statically pre-rendered article pages.

## Stack

- **Vite + React 19 + TypeScript**
- **vite-react-ssg + react-router** — routing; every page is statically
  pre-rendered to HTML at build time, so the site is fully crawlable
- **React Three Fiber** + **drei** — the WebGL hero scene (low-poly shapes)
- **Tailwind CSS v4** (+ typography plugin) — styling and article prose
- **marked** — renders article markdown to HTML at build time
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
npm run build    # typecheck, build, and pre-render every route → dist/
npm run preview  # serve the built (pre-rendered) site
```

## Structure

```
content/
  categories/           # category definitions — one markdown file each
  tips/                 # quick tips — one markdown file per tip
  articles/             # long-form guides — one markdown file per article
src/
  routes.tsx            # route table: /, /articles, /articles/:slug
  data/                 # build-time markdown loaders (tips, categories, articles)
  pages/                # Home, ArticlesIndex, ArticlePage, NotFound
  components/           # Nav, Hero, HeroScene, Layout, TipCard, TipModal, …
  hooks/                # useTilt, useReducedMotion
public/assets/          # Higgsfield-generated artwork (hero + category icons)
scripts/ASSETS.md       # prompts + pipeline for regenerating artwork
```

## Editing content

All content is markdown under `content/` — **open that folder as an Obsidian
vault** (or edit with any text editor). There are three kinds of file.

### Tips — `content/tips/*.md`

```md
---
title: Free up storage fast
category: phone
summary: Reclaim gigabytes without deleting a single photo.
effort: 5 min
order: 1
---

- Open Settings → Storage to see what is taking up space.
- Clear app caches to reclaim hundreds of MB.
```

Frontmatter holds the card fields; each body bullet becomes one step in the
detail modal (one step per line). `category` must match a category file's name,
and `order` sorts the grid. The filename (minus any `NN-` prefix) is the id.

### Categories — `content/categories/*.md`

```md
---
label: Phone & Storage
short: Phone
color: "#34d399"
blurb: Free up space, save battery, and find things faster.
art: /assets/tips/phone.webp
order: 1
---
```

The filename (`phone.md`) is the category id that tips reference. **Quote hex
colors** — `color: "#34d399"` — an unquoted `#` is a YAML comment and the build
will reject it. A brand-new category also needs an artwork image at the `art`
path (see `scripts/ASSETS.md` to generate one).

### Articles — `content/articles/*.md`

```md
---
title: Set up a password manager the right way
summary: A step-by-step guide to unique, generated passwords.
cover: /assets/tips/security.webp
date: 2026-05-12
order: 1
---

The full markdown body — headings, lists, **bold**, links, images, blockquotes.
```

Unlike a tip, the whole body is rendered to HTML (via `marked`) and shown as a
full page at `/articles/<filename>`. `cover` and `date` are optional; `order`
sorts the Guides index; reading time is computed automatically. Each article is
statically pre-rendered, so it's crawlable and shareable.

### All three

- **Add** = add a file; **remove** = delete the file.
- A build-time Vite plugin (`content-markdown` in `vite.config.ts`) parses and
  validates everything — a missing field, bad color, unknown category, or empty
  body **fails the build** with a message naming the file. Keep
  `npm run dev` running while editing for instant feedback.
- With the *Obsidian Git* community plugin, edits can auto-commit and push, and
  your deploy host (Vercel/Netlify) rebuilds automatically — edit content, and
  it's live in under a minute.

## Artwork

Generated with the Higgsfield CLI and converted to `.webp`. To regenerate or
add images, see [`scripts/ASSETS.md`](scripts/ASSETS.md).

## Deployment

`npm run build` type-checks, builds, and pre-renders every route — the home
page, the Guides index, and each article — to static HTML in `dist/`. Deploy it
to Vercel, Netlify or GitHub Pages. No backend required, and every page ships as
crawlable HTML with its own `<title>` and meta tags.
