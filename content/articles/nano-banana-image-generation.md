---
title: AI image generation with Nano Banana — a practical guide
summary: How to get the most out of Higgsfield's character-focused model, from first prompt to polished result.
cover: /assets/tips/ai-prompt.webp
date: 2026-05-18
order: 3
---

Most AI image generators are built as general-purpose tools. Nano Banana is different. Higgsfield designed it specifically for character and cartoon work — the kind of expressive, stylised output that general models struggle to nail. If you've ever had a photorealistic model produce a stiff, uncanny anime character, you'll understand immediately why a specialist model matters.

This guide walks through how Nano Banana works, when to reach for it over other tools, and the prompting patterns that consistently produce strong results.

## What Nano Banana is actually good at

Nano Banana excels at three things: expressive character poses, stylised illustration aesthetics, and maintaining visual consistency when you provide a reference image.

It handles a wide range of art styles — anime, cartoon, comic book, flat vector, painterly illustration — without the heavy-handed look that comes from forcing a photorealistic model into a style it wasn't trained on. The model understands character *feeling*: a character can look excited, wary, defeated, or playful in a way that reads immediately rather than requiring you to describe facial muscle positions.

Reference-driven generation is where it really pulls ahead. Feed it a character sketch or an existing image and it preserves the identity across poses, outfits, and scene changes far more reliably than a general model would.

## Nano Banana 2 vs Nano Banana Pro

There are two tiers. Start with **Nano Banana 2** — it's the right choice for most character work and produces excellent results quickly. Move up to **Nano Banana Pro** for harder briefs: complex scenes with multiple characters, highly specific stylistic constraints, or cases where the standard model is consistently missing something important.

Pro isn't always better for every prompt. On simple character portraits, the two models often produce comparable results. Save Pro for the cases that genuinely need it.

## Writing prompts for Nano Banana

Character prompts follow a different structure than landscape or photorealistic prompts. These patterns work consistently well.

### Lead with character identity, not setting

Instead of: "A forest at dusk with a figure standing in it"

Write: "A young adventurer in a worn leather jacket, determined expression, standing at the edge of a glowing forest"

The character comes first. Setting is context, not the subject.

### Be specific about style register

Nano Banana supports a broad range of styles, but it performs best when you're explicit. Vague instructions like "anime style" produce generic results. Try instead:

- "studio Ghibli watercolour illustration"
- "90s cel-shaded cartoon, bold outlines"
- "flat vector art, limited colour palette"
- "comic book ink wash, dynamic perspective"

The more precisely you name the aesthetic tradition, the closer the model gets on the first attempt.

### Describe emotion and pose together

The model reads pose and expression as a unit. Rather than listing them separately, write them as a single description:

- "leaning back with arms crossed, smirking with quiet confidence"
- "mid-sprint, hair flying, eyes wide with surprise"
- "curled up on a window ledge, gazing out, contemplative"

This gives the model a coherent physical and emotional state to work from rather than two separate instructions it needs to reconcile.

### Use a reference image for character consistency

If you're generating a character across multiple images — different scenes, outfit variations, different expressions — pass a reference image. Nano Banana's image-to-image mode treats the reference as the character's identity anchor, and subsequent generations hold the face and body proportions far more tightly than trying to re-describe the same character in text every time.

With the Higgsfield CLI:

```bash
higgsfield generate create nano_banana_2 \
  --prompt "same character, now wearing a winter coat, snowy street backdrop, cheerful expression" \
  --image ./my-character-ref.png \
  --wait
```

The `--image` flag accepts a local file path or a previously uploaded asset UUID. The CLI handles the upload automatically.

## Negative prompting

Nano Banana supports negative prompts. Use them to suppress common failure modes:

- **Anatomy issues:** "extra fingers, fused hands, distorted limbs"
- **Style contamination:** "photorealistic, 3D render, photograph" (when you want illustration)
- **Generic results:** "generic, stock art, watermark, low quality"

Keep negative prompts focused. A list of fifty terms rarely helps more than eight well-chosen ones.

## When to step up to Nano Banana Pro

Switch to Pro when:

- A brief involves more than two characters in a single scene
- You need very tight stylistic consistency with a specific reference that the standard model keeps drifting away from
- The composition is complex — layered foreground and background elements, unusual camera angles
- You're producing commercial or print-quality output where detail and coherence matter at full resolution

For quick ideation, character sketching, and single-character portraits, Nano Banana 2 is faster and produces excellent results without the extra cost.

## A realistic workflow

1. **Write a draft prompt** using the structure above — character first, style second, mood and pose third.
2. **Run two or three generations** with Nano Banana 2 to explore the direction.
3. **Pick the best result** and save its seed number.
4. **Refine from there** — tweak one element at a time. Change the lighting, adjust the expression, shift the colour palette.
5. **Lock in a reference** once you have a character you like. Use that image as the `--image` input for all subsequent scene variations.
6. **Move to Pro** only if the standard model consistently fails on a specific aspect of a hard brief.

The biggest mistake people make with AI image generation is treating every generation as a fresh start. Building a reference library and iterating from known-good results is what separates consistent output from a random lottery.

## Practical example prompt

Here's a full prompt that performs well with Nano Banana:

> "A teenage mechanic in oil-stained overalls, short braided hair, holding a glowing wrench, looking up with a cautious but curious expression. Studio Ghibli watercolour style, warm amber workshop lighting, detailed background with scattered tools and engine parts, soft painted textures."

Run that against Nano Banana 2 and you'll have a strong starting point within seconds. From there, the iteration workflow above takes it the rest of the way.

Nano Banana isn't magic — no model is — but it's the right tool for character-driven creative work, and understanding how it thinks about prompts is the difference between fighting it and working with it.
