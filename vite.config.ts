import { defineConfig } from 'vite';
import type { Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import matter from 'gray-matter';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const HEX = /^#[0-9a-fA-F]{3,8}$/;

/** Slug from a markdown file path: drops the dir, `.md`, and any `NN-` prefix. */
function slugOf(id: string): string {
  return id
    .split('/')
    .pop()!
    .replace(/\.md$/, '')
    .replace(/^\d+[-_]/, '');
}

/** Category ids = the basenames of content/categories/*.md */
function listCategoryIds(root: string): string[] {
  try {
    return readdirSync(join(root, 'content/categories'))
      .filter((f) => f.endsWith('.md'))
      .map((f) => f.replace(/\.md$/, ''));
  } catch {
    return [];
  }
}

/**
 * Compiles `content/tips/*.md` and `content/categories/*.md` into modules at
 * build time. YAML frontmatter becomes the fields; a tip's body list becomes
 * its steps. Tip categories are validated against the category files, so a
 * malformed file — or a typo'd category — fails the build with a clear message.
 */
function contentMarkdown(): Plugin {
  let root = process.cwd();
  return {
    name: 'content-markdown',
    enforce: 'pre',
    configResolved(config) {
      root = config.root;
    },
    transform(code, id) {
      const isTip = /\/content\/tips\/[^/]+\.md$/.test(id);
      const isCategory = /\/content\/categories\/[^/]+\.md$/.test(id);
      if (!isTip && !isCategory) return null;

      const { data, content } = matter(code);

      if (isCategory) {
        for (const field of ['label', 'short', 'color', 'blurb', 'art']) {
          if (data[field] == null || data[field] === '') {
            this.error(`missing frontmatter field "${field}"`);
          }
        }
        if (!HEX.test(String(data.color))) {
          this.error(
            `color "${data.color}" is not a hex value — ` +
              `quote it in YAML, e.g. color: "#34d399"`,
          );
        }
        const category = {
          id: slugOf(id),
          label: data.label,
          short: data.short,
          color: data.color,
          blurb: data.blurb,
          art: data.art,
          order: typeof data.order === 'number' ? data.order : 999,
        };
        return { code: `export default ${JSON.stringify(category)};`, map: null };
      }

      // Tip
      for (const field of ['title', 'category', 'summary', 'effort']) {
        if (data[field] == null || data[field] === '') {
          this.error(`missing frontmatter field "${field}"`);
        }
      }
      const categoryIds = listCategoryIds(root);
      if (!categoryIds.includes(data.category)) {
        this.error(
          `unknown category "${data.category}" — expected one of ` +
            (categoryIds.join(', ') || '(no files in content/categories)'),
        );
      }
      const steps = content
        .split('\n')
        .map((line) => line.trim())
        .filter((line) => /^(?:[-*+]|\d+\.)\s+/.test(line))
        .map((line) => line.replace(/^(?:[-*+]|\d+\.)\s+/, '').trim());
      if (steps.length === 0) {
        this.error('no steps found — add a markdown list to the file body');
      }

      const tip = {
        id: slugOf(id),
        title: data.title,
        category: data.category,
        summary: data.summary,
        effort: String(data.effort),
        order: typeof data.order === 'number' ? data.order : 999,
        steps,
      };
      return { code: `export default ${JSON.stringify(tip)};`, map: null };
    },
  };
}

export default defineConfig({
  plugins: [contentMarkdown(), react(), tailwindcss()],
  // host: true binds to 0.0.0.0 so the site is reachable from other
  // devices on the LAN, not just localhost.
  server: { host: true, port: 5173 },
  preview: { host: true, port: 4173 },
  build: {
    // three.js is intentionally code-split into the lazy HeroScene chunk,
    // so the >500 kB default warning isn't actionable here.
    chunkSizeWarningLimit: 900,
  },
});
