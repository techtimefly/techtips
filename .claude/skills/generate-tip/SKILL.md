---
name: generate-tip
description: Generate one high-quality, web-researched tech tip for the TechTips site and deliver it as a draft pull request for review. Use when asked to "generate a tip", "make a tip", "create today's tip", "daily tip", or when run from the daily schedule.
---

# Generate Tip

Produce **exactly one** high-quality, genuinely useful tech tip for the TechTips
site and deliver it as a **draft pull request** for human review. Never publish
directly — the human is the quality gate.

Run from the repo root (the `3dwebsite` project).

## Quality rubric

A tip must clear **all** of these, or it isn't worth shipping:

- **Valuable** — saves the reader real time, money, or risk. Not trivia, not obvious.
- **Actionable** — doable in 3–5 concrete steps, roughly 1–15 minutes.
- **Broad** — most readers, on common devices, can use it.
- **Accurate & current** — correct for today's software; setting paths and key combos verified.
- **Distinct** — not already a published tip, an open draft, an article, or a rejected idea.
- **On-voice** — fits one of the four categories and the site's tone: concise, plain-English, imperative steps, em-dashes (—), self-contained.

If nothing clears the bar, still ship the strongest candidate but say so plainly
in the PR body — never inflate a weak tip.

## Pipeline

### 1. Survey what already exists
- Read every `content/tips/*.md` (titles + categories) and `content/articles/*.md`.
- Read `scripts/tip-ideas-log.md` — the full history of proposed and rejected ideas.
- Count tips per category (`phone`, `security`, `wifi`, `shortcuts`). Bias the new
  tip toward an underrepresented category.

### 2. Ideate — web-grounded
Brainstorm **at least 5** candidate tips. Ground them in current reality with web
search — use the **brave-search** MCP (`brave_web_search`, `brave_news_search`),
the **firecrawl-search** skill, or `WebSearch`. Look for:
- Recent OS / app / browser features and changed settings.
- Current scam patterns and security advisories.
- Genuinely common "how do I…" questions.

Each candidate: a one-line concept + target category. Discard anything already covered.

### 3. Score & select
Rank every candidate against the rubric. Pick the single best one.

### 4. Verify the facts
Web-search to confirm the chosen tip's steps are accurate for current software —
exact setting names, menu paths, key combinations. Capture 1–3 source URLs.

### 5. Write the tip
Create `content/tips/<slug>.md` — `<slug>` is short kebab-case from the title:

```md
---
title: <short headline, ~3-6 words>
category: <phone | security | wifi | shortcuts>
summary: <one-line hook — the payoff in a sentence>
effort: <e.g. "2 min">
draft: true
order: 99
generated: <YYYY-MM-DD>
sources:
  - <url>
---

- <step 1 — imperative, concrete, self-contained>
- <step 2>
- <step 3>
- <step 4>
```

Rules:
- `draft: true` is **mandatory** — it keeps the tip off the live site until a human publishes it.
- `category` must be exactly one of the four, or the build fails.
- 3–5 body bullets, one step per line. Read a couple of existing tips first and match their voice.
- `order: 99` so drafts sort after the curated published tips.
- `generated` = today's date; `sources` = the URLs you verified against.

### 6. Self-critique
Re-check the draft against the rubric, the voice, and the frontmatter rules above
(the `content-markdown` build plugin rejects a missing field, an unknown category,
or zero steps). Revise once. Confirm it is genuinely not a duplicate.

### 7. Open the PR, then log it on `main`

The tip ships on its own branch (tip file only). The ideas log is updated
**on `main`** — so the next run's dedup memory is always current, even for
tips that are still pending review or get rejected.

```bash
git checkout main && git pull --ff-only
git checkout -b tip/<slug>                 # if the branch exists, suffix with the date
# write content/tips/<slug>.md  — the tip file ONLY
git add content/tips/<slug>.md
git commit -m "Draft tip: <title>"
git push -u origin tip/<slug>
gh pr create --title "Draft tip: <title>" --body "<body, see template>"

git checkout main
# append to scripts/tip-ideas-log.md: a Tips-table row (date, title, category,
# status `draft`, PR link) plus the runner-up ideas under "Runner-up ideas"
git add scripts/tip-ideas-log.md
git commit -m "Log tip idea: <title>"
git push origin main
```

If `gh` is unavailable or not authenticated, push the branch and output the
PR-creation URL that `git push` prints, instead of running `gh pr create`.

**PR body template:**
```
A draft tip for review — generated <date>.

**<title>**  ·  <category>  ·  <effort>

Why it's valuable: <one or two sentences>

Rubric: valuable / actionable / broad / accurate / distinct / on-voice — all met.
Confidence: <high | medium — explain if not high>

Sources:
- <url>

Runner-up ideas considered: <short list>

---
To publish: delete the `draft: true` line in the file, then merge.
To bank it as a draft for later: merge as-is (stays off the live site).
To reject: close this PR.
After publishing, optionally add a custom image — see scripts/ASSETS.md.
```

## Rules

- Produce **exactly one** tip per run.
- Never publish — every tip ships as `draft: true` behind a PR.
- Leave the repo checked out on `main` when finished.
