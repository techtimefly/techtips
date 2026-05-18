import { Suspense, lazy, useState } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { categories, tips } from '../data/tips';

// Code-split the three.js bundle — it only loads after first paint.
const HeroScene = lazy(() => import('./HeroScene'));

const STATS = [
  { value: `${tips.length}`, label: 'quick tips' },
  { value: `${categories.length}`, label: 'categories' },
  { value: '~1 min', label: 'per tip' },
];

export function Hero() {
  const reduced = useReducedMotion();
  const [heroLoaded, setHeroLoaded] = useState(false);

  return (
    <section
      id="top"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      {/* Base gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-bg-soft via-bg to-bg" />

      {/* Higgsfield hero artwork (gracefully absent until generated) */}
      <img
        src="/assets/hero/hero.webp"
        alt=""
        aria-hidden="true"
        onLoad={() => setHeroLoaded(true)}
        className={`absolute inset-0 z-10 h-full w-full object-cover transition-opacity duration-1000 ${
          heroLoaded ? 'opacity-45' : 'opacity-0'
        }`}
      />

      {/* WebGL scene — skipped entirely when the user prefers reduced motion */}
      {!reduced && (
        <div className="absolute inset-0 z-20" aria-hidden="true">
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </div>
      )}

      {/* Legibility scrim */}
      <div className="pointer-events-none absolute inset-0 z-30 bg-[radial-gradient(75%_60%_at_50%_40%,transparent,rgba(9,10,18,0.72))]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-40 bg-gradient-to-b from-transparent to-bg" />

      {/* Content */}
      <div className="pointer-events-none relative z-40 mx-auto w-full max-w-6xl px-5 py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs font-medium text-ink-muted backdrop-blur">
          <span className="h-1.5 w-1.5 rounded-full bg-teal" />
          Tech, minus the jargon
        </span>

        <h1 className="mt-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
          Simple tech tips,{' '}
          <span className="text-gradient">beautifully explained.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
          Quick, plain-English fixes for the everyday tech you actually use — your
          phone, your Wi-Fi, your passwords. Each one reads in about a minute.
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#tips"
            className="pointer-events-auto rounded-xl bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-accent/25 transition-transform hover:scale-[1.04]"
          >
            Browse all tips
          </a>
          <a
            href="#categories"
            className="pointer-events-auto rounded-xl border border-border bg-surface/70 px-6 py-3.5 text-sm font-semibold text-ink backdrop-blur transition-colors hover:border-accent-soft"
          >
            Pick a category
          </a>
        </div>

        <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
          {STATS.map((s) => (
            <div key={s.label} className="flex flex-col">
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-2xl font-bold text-ink">{s.value}</dd>
              <dd className="text-xs uppercase tracking-wider text-ink-muted">
                {s.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Scroll cue */}
      <a
        href="#categories"
        aria-label="Scroll to categories"
        className="pointer-events-auto absolute bottom-6 left-1/2 z-40 -translate-x-1/2 text-ink-muted transition-colors hover:text-ink"
      >
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          className="animate-bounce"
          aria-hidden="true"
        >
          <path
            d="M6 9l6 6 6-6"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </a>
    </section>
  );
}
