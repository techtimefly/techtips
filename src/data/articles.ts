/**
 * Long-form articles, authored as markdown in `content/articles/*.md`.
 * The `content-markdown` Vite plugin (see vite.config.ts) parses each file's
 * frontmatter and renders its body to HTML at build time.
 */

export interface Article {
  slug: string;
  title: string;
  /** One-line hook — used on the index card and as the meta description */
  summary: string;
  /** Optional hero image path under public/ */
  cover: string | null;
  /** Optional ISO date (YYYY-MM-DD) */
  date: string | null;
  /** Estimated reading time in minutes */
  readingTime: number;
  /** Rendered HTML of the markdown body */
  html: string;
}

interface RawArticle extends Article {
  /** Sort position in the article index */
  order: number;
}

const articleModules = import.meta.glob<{ default: RawArticle }>(
  '/content/articles/*.md',
  { eager: true },
);

export const articles: Article[] = Object.values(articleModules)
  .map((mod) => mod.default)
  .sort((a, b) => a.order - b.order)
  .map((raw): Article => ({
    slug: raw.slug,
    title: raw.title,
    summary: raw.summary,
    cover: raw.cover,
    date: raw.date,
    readingTime: raw.readingTime,
    html: raw.html,
  }));

export const articleMap: Record<string, Article> = Object.fromEntries(
  articles.map((a) => [a.slug, a]),
);

/** Formats an ISO date (YYYY-MM-DD) as e.g. "May 12, 2026". */
export function formatArticleDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  // Format in UTC — an ISO date string parses as UTC midnight, so a
  // local-timezone format would shift it to the previous day.
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
