import { Logo } from './Logo';
import { categories, tips } from '../data/tips';

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-soft">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5 font-display text-lg font-bold">
              <Logo className="h-8 w-8" />
              <span>
                Tech<span className="text-accent-soft">Tips</span>
              </span>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted">
              {tips.length} bite-sized tech tips across {categories.length}{' '}
              everyday categories — no jargon, no fluff.
            </p>
          </div>

          <nav aria-label="Categories" className="flex flex-col gap-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-ink-muted">
              Categories
            </span>
            {categories.map((c) => (
              <a
                key={c.id}
                href="#categories"
                className="flex items-center gap-2 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: c.color }}
                  aria-hidden="true"
                />
                {c.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col gap-1.5 border-t border-border pt-6 text-xs text-ink-muted sm:flex-row sm:justify-between">
          <p>Built with React Three Fiber, Vite & Higgsfield-generated artwork.</p>
          <p>© {new Date().getFullYear()} TechTips — a demo project.</p>
        </div>
      </div>
    </footer>
  );
}
