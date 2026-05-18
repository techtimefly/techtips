import { categories, tips } from '../data/tips';
import type { CategoryId } from '../data/tips';

export type Filter = CategoryId | 'all';

interface FilterOption {
  id: Filter;
  label: string;
  count: number;
  color: string;
}

const OPTIONS: FilterOption[] = [
  { id: 'all', label: 'All tips', count: tips.length, color: '#a48dff' },
  ...categories.map((c) => ({
    id: c.id as Filter,
    label: c.short,
    count: tips.filter((t) => t.category === c.id).length,
    color: c.color,
  })),
];

interface Props {
  active: Filter;
  onChange: (f: Filter) => void;
}

export function CategoryFilter({ active, onChange }: Props) {
  return (
    <div
      className="flex flex-wrap gap-2.5"
      role="group"
      aria-label="Filter tips by category"
    >
      {OPTIONS.map((o) => {
        const isActive = active === o.id;
        return (
          <button
            key={o.id}
            type="button"
            onClick={() => onChange(o.id)}
            aria-pressed={isActive}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
              isActive
                ? 'border-transparent text-bg'
                : 'border-border text-ink-muted hover:border-ink-muted hover:text-ink'
            }`}
            style={isActive ? { backgroundColor: o.color } : undefined}
          >
            <span
              className="h-2 w-2 rounded-full"
              style={{
                backgroundColor: isActive ? 'rgba(9,10,18,0.55)' : o.color,
              }}
              aria-hidden="true"
            />
            {o.label}
            <span className={isActive ? 'opacity-65' : 'opacity-55'}>{o.count}</span>
          </button>
        );
      })}
    </div>
  );
}
