import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';
import { SearchModal } from './SearchModal';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen((v) => !v);
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
          scrolled
            ? 'border-b border-border bg-bg/85 backdrop-blur-md'
            : 'border-b border-transparent'
        }`}
      >
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
          <Link
            to="/"
            className="flex items-center gap-2.5 font-display text-lg font-bold tracking-tight"
          >
            <Logo className="h-8 w-8" />
            <span>
              Tech<span className="text-accent-soft">Tips</span>
            </span>
          </Link>

          <div className="flex items-center gap-1">
            <div className="hidden items-center sm:flex">
              {/* Section links use absolute /#hash so they work from any route */}
              <a
                href="/#categories"
                className="rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Categories
              </a>
              <a
                href="/#tips"
                className="rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Tips
              </a>
              <Link
                to="/articles"
                className="rounded-lg px-3 py-2 text-sm text-ink-muted transition-colors hover:text-ink"
              >
                Guides
              </Link>
            </div>

            {/* Search trigger */}
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              aria-label="Search"
              className="flex items-center gap-2 rounded-lg border border-border bg-surface/60 px-3 py-1.5 text-sm text-ink-muted transition-colors hover:border-border hover:text-ink ml-1"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="M20 20l-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span className="hidden sm:inline">Search</span>
              <kbd className="hidden rounded border border-border px-1 py-px text-[10px] leading-none sm:inline">
                ⌘K
              </kbd>
            </button>

            <a
              href="/#tips"
              className="ml-1 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.04]"
            >
              Browse tips
            </a>
          </div>
        </nav>
      </header>

      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
