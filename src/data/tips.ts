/**
 * All site content is authored as markdown and parsed at build time by the
 * `content-markdown` Vite plugin (see vite.config.ts):
 *   - categories → content/categories/*.md
 *   - tips       → content/tips/*.md
 * Open the `content/` folder as an Obsidian vault to edit — see the README.
 */

/** A category id — the basename of a content/categories/*.md file. */
export type CategoryId = string;

export interface CategoryMeta {
  id: CategoryId;
  /** Full display name */
  label: string;
  /** Short label for compact pills */
  short: string;
  /** Accent color (hex) */
  color: string;
  /** One-line description for the category card */
  blurb: string;
  /** Path to the category illustration under public/ */
  art: string;
}

export interface Tip {
  id: string;
  category: CategoryId;
  /** Short headline shown on the card */
  title: string;
  /** One-line hook shown on the card */
  summary: string;
  /** Roughly how long the tip takes to apply */
  effort: string;
  /** Full step-by-step detail shown in the modal */
  steps: string[];
}

interface RawCategory extends CategoryMeta {
  /** Sort position among the category cards / filter pills */
  order: number;
}

interface RawTip extends Tip {
  /** Sort position within the tip grid */
  order: number;
}

const categoryModules = import.meta.glob<{ default: RawCategory }>(
  '/content/categories/*.md',
  { eager: true },
);

export const categories: CategoryMeta[] = Object.values(categoryModules)
  .map((mod) => mod.default)
  .sort((a, b) => a.order - b.order)
  .map((raw): CategoryMeta => ({
    id: raw.id,
    label: raw.label,
    short: raw.short,
    color: raw.color,
    blurb: raw.blurb,
    art: raw.art,
  }));

export const categoryMap: Record<string, CategoryMeta> = Object.fromEntries(
  categories.map((c) => [c.id, c]),
);

const tipModules = import.meta.glob<{ default: RawTip }>('/content/tips/*.md', {
  eager: true,
});

export const tips: Tip[] = Object.values(tipModules)
  .map((mod) => mod.default)
  .sort((a, b) => a.order - b.order)
  .map((raw): Tip => ({
    id: raw.id,
    category: raw.category,
    title: raw.title,
    summary: raw.summary,
    effort: raw.effort,
    steps: raw.steps,
  }));
