import { useMemo, useState } from 'react';
import { Nav } from './components/Nav';
import { Hero } from './components/Hero';
import { CategoryCards } from './components/CategoryCards';
import { CategoryFilter } from './components/CategoryFilter';
import type { Filter } from './components/CategoryFilter';
import { TipGrid } from './components/TipGrid';
import { TipModal } from './components/TipModal';
import { Footer } from './components/Footer';
import { tips } from './data/tips';
import type { Tip } from './data/tips';

export default function App() {
  const [filter, setFilter] = useState<Filter>('all');
  const [selected, setSelected] = useState<Tip | null>(null);

  const visible = useMemo(
    () => (filter === 'all' ? tips : tips.filter((t) => t.category === filter)),
    [filter],
  );

  return (
    <>
      <Nav />
      <main>
        <Hero />

        <section
          id="categories"
          className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:py-28"
        >
          <p className="text-sm font-semibold uppercase tracking-wider text-teal">
            Browse
          </p>
          <h2 className="mt-2 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Pick a corner of tech
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">
            Four everyday areas, each with hand-picked tips. Choose one to jump
            straight to its cards below.
          </p>
          <div className="mt-10">
            <CategoryCards onSelect={setFilter} />
          </div>
        </section>

        <section id="tips" className="mx-auto max-w-6xl scroll-mt-24 px-5 pb-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-teal">
            The tips
          </p>
          <h2 className="mt-2 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            Browse the full list
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-ink-muted">
            Filter by category, then tap any card for a short, step-by-step
            walkthrough.
          </p>
          <div className="mt-7">
            <CategoryFilter active={filter} onChange={setFilter} />
          </div>
          <TipGrid tips={visible} onOpen={setSelected} />
        </section>
      </main>
      <Footer />
      <TipModal tip={selected} onClose={() => setSelected(null)} />
    </>
  );
}
