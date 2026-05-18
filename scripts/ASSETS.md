# Higgsfield Asset Pipeline

All site artwork is generated with the **Higgsfield** CLI (`higgsfield`) using the
**GPT Image 2** model, then converted to `.webp` and placed under `public/assets/`.

| Asset | File | Aspect | Used by |
|-------|------|--------|---------|
| Hero background | `public/assets/hero/hero.webp` | 16:9 | `Hero.tsx` |
| Phone & Storage | `public/assets/tips/phone.webp` | 1:1 | category card + tip cards |
| Security & Privacy | `public/assets/tips/security.webp` | 1:1 | category card + tip cards |
| Wi-Fi & Internet | `public/assets/tips/wifi.webp` | 1:1 | category card + tip cards |
| Shortcuts & Productivity | `public/assets/tips/shortcuts.webp` | 1:1 | category card + tip cards |

## Regenerating

```bash
higgsfield account status            # confirm auth + credits
higgsfield generate create gpt_image_2 \
  --aspect_ratio 16:9 --resolution 2k --quality high --wait --json \
  --prompt "<prompt from below>"
```

Then download the returned URL and convert:

```bash
ffmpeg -i raw.png -quality 82 public/assets/hero/hero.webp
```

## Prompts

**Hero** (16:9) — Dark cinematic abstract technology background. Deep navy
near-black void. Soft glowing low-poly geometric shapes — icosahedron, torus,
octahedron, tetrahedron — floating with depth of field. Violet and teal accent
glow. Subtle gradient lighting, premium, minimal, modern. Generous empty negative
space. No text, no words, no letters.

**Category icons** (1:1) — share this base: *Flat isometric 3D illustration,
single centered object on a dark navy background. Soft studio lighting, clean
minimal premium tech aesthetic, generous padding around the subject. No text, no
words.* — with the per-category subject + accent:

- **phone** — a modern smartphone with a glowing storage cleanup spark · emerald-green glow
- **security** — a protective shield with a keyhole and a small padlock · rose-red glow
- **wifi** — a Wi-Fi router emitting concentric signal waves · sky-blue glow
- **shortcuts** — a computer keyboard with one glowing highlighted key · amber-yellow glow

## Notes

- Accent colors mirror the category theme colors in `src/index.css` / `src/data/tips.ts`.
- The UI degrades gracefully: `Artwork.tsx` shows a color-tinted gradient if any
  image is missing, so the site never looks broken before assets exist.
- Optional upgrades (more credits): a looping hero video (Seedance 2.0) or 10
  per-tip illustrations instead of 4 category icons.
