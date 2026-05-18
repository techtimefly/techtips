import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Logo } from './Logo';

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
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
          <a
            href="/#tips"
            className="ml-1 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition-transform hover:scale-[1.04]"
          >
            Browse tips
          </a>
        </div>
      </nav>
    </header>
  );
}
