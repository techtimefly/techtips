import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Fuse from 'fuse.js';
import { tips, categories } from '../data/tips';
import type { Tip, CategoryMeta } from '../data/tips';
import { articles } from '../data/articles';
import type { Article } from '../data/articles';

type ResultItem =
  | { kind: 'tip'; tip: Tip }
  | { kind: 'article'; article: Article }
  | { kind: 'category'; category: CategoryMeta };

interface Props {
  open: boolean;
  onClose: () => void;
}

const tipFuse = new Fuse(tips, {
  keys: ['title', 'summary', 'category'],
  threshold: 0.35,
  includeScore: true,
});

const articleFuse = new Fuse(articles, {
  keys: ['title', 'summary'],
  threshold: 0.35,
  includeScore: true,
});

const categoryFuse = new Fuse(categories, {
  keys: ['label', 'blurb'],
  threshold: 0.35,
  includeScore: true,
});

function buildResults(query: string): ResultItem[] {
  const q = query.trim();
  if (!q) return [];

  const tipResults = tipFuse.search(q).map((r): ResultItem => ({ kind: 'tip', tip: r.item }));
  const articleResults = articleFuse
    .search(q)
    .map((r): ResultItem => ({ kind: 'article', article: r.item }));
  const categoryResults = categoryFuse
    .search(q)
    .map((r): ResultItem => ({ kind: 'category', category: r.item }));

  return [...tipResults, ...articleResults, ...categoryResults].slice(0, 8);
}

function ResultRow({
  item,
  active,
  onClick,
}: {
  item: ResultItem;
  active: boolean;
  onClick: () => void;
}) {
  const ref = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (active) ref.current?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  let icon: React.ReactNode;
  let label: string;
  let sub: string;
  let accent: string | undefined;

  if (item.kind === 'tip') {
    icon = (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2a7 7 0 0 1 4 12.74V17a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2.26A7 7 0 0 1 12 2Z"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path d="M9 21h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
      </svg>
    );
    label = item.tip.title;
    sub = item.tip.summary;
  } else if (item.kind === 'article') {
    icon = (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M7 8h10M7 12h10M7 16h6"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
    label = item.article.title;
    sub = item.article.summary;
  } else {
    icon = (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M4 6h16M4 12h16M4 18h7"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    );
    label = item.category.label;
    sub = item.category.blurb;
    accent = item.category.color;
  }

  return (
    <button
      ref={ref}
      type="button"
      onClick={onClick}
      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors ${
        active ? 'bg-surface-2' : 'hover:bg-surface-2/60'
      }`}
    >
      <span
        className="mt-0.5 shrink-0 text-ink-muted"
        style={accent ? { color: accent } : undefined}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm font-medium leading-snug">{label}</span>
        <span className="block truncate text-xs leading-snug text-ink-muted">{sub}</span>
      </span>
      <span className="mt-0.5 shrink-0 text-[10px] font-medium uppercase tracking-wider text-ink-muted/60">
        {item.kind === 'tip' ? 'Tip' : item.kind === 'article' ? 'Guide' : 'Category'}
      </span>
    </button>
  );
}

export function SearchModal({ open, onClose }: Props) {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const results = useMemo(() => buildResults(query), [query]);

  useEffect(() => {
    if (open) {
      setQuery('');
      setCursor(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setCursor((c) => Math.min(c + 1, results.length - 1));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setCursor((c) => Math.max(c - 1, 0));
      } else if (e.key === 'Enter' && results.length > 0) {
        e.preventDefault();
        select(results[cursor]);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, results, cursor]);

  function select(item: ResultItem) {
    onClose();
    if (item.kind === 'tip') {
      navigate(`/?tip=${item.tip.id}`);
    } else if (item.kind === 'article') {
      navigate(`/articles/${item.article.slug}`);
    } else {
      navigate(`/?cat=${item.category.id}#tips`);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[200] flex items-start justify-center pt-[12vh] px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-label="Search"
            aria-modal="true"
            initial={{ y: -12, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -8, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative w-full max-w-lg overflow-hidden rounded-2xl panel"
          >
            {/* Input row */}
            <div className="flex items-center gap-3 border-b border-border px-4 py-3.5">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                className="shrink-0 text-ink-muted"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path
                  d="M20 20l-3-3"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <input
                ref={inputRef}
                type="text"
                placeholder="Search tips, guides, categories…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                className="min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-muted/60 outline-none"
              />
              <kbd className="hidden shrink-0 rounded border border-border px-1.5 py-0.5 text-[10px] text-ink-muted sm:block">
                ESC
              </kbd>
            </div>

            {/* Results */}
            {results.length > 0 && (
              <div className="max-h-72 overflow-y-auto py-1.5">
                {results.map((item, i) => {
                  const key =
                    item.kind === 'tip'
                      ? `tip-${item.tip.id}`
                      : item.kind === 'article'
                        ? `article-${item.article.slug}`
                        : `cat-${item.category.id}`;
                  return (
                    <ResultRow
                      key={key}
                      item={item}
                      active={i === cursor}
                      onClick={() => select(item)}
                    />
                  );
                })}
              </div>
            )}

            {/* Empty state */}
            {query.trim() && results.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-ink-muted">
                No results for &ldquo;{query}&rdquo;
              </div>
            )}

            {/* Idle prompt */}
            {!query.trim() && (
              <div className="px-4 py-6 text-center text-xs text-ink-muted/70">
                Type to search tips, guides, and categories
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
