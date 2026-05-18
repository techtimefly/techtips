import { Artwork } from './Artwork';
import { categories, tips } from '../data/tips';
import type { CategoryId } from '../data/tips';

interface Props {
  /** Selecting a category sets the filter on the tip grid below. */
  onSelect: (id: CategoryId) => void;
}

export function CategoryCards({ onSelect }: Props) {
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {categories.map((c) => {
        const count = tips.filter((t) => t.category === c.id).length;
        return (
          <a
            key={c.id}
            href="#tips"
            onClick={() => onSelect(c.id)}
            className="group flex flex-col overflow-hidden rounded-2xl panel transition-transform duration-300 hover:-translate-y-1.5"
          >
            <Artwork
              src={c.art}
              color={c.color}
              alt={`${c.label} illustration`}
              className="aspect-[4/3] w-full"
              eager
            />
            <div className="flex flex-1 flex-col p-5">
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: c.color }}
                  aria-hidden="true"
                />
                <h3 className="font-display text-lg font-semibold">{c.label}</h3>
              </div>
              <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">
                {c.blurb}
              </p>
              <span
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium"
                style={{ color: c.color }}
              >
                {count} tips
                <span className="transition-transform duration-200 group-hover:translate-x-1">
                  →
                </span>
              </span>
            </div>
          </a>
        );
      })}
    </div>
  );
}
