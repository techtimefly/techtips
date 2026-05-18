import { motion } from 'framer-motion';
import { Artwork } from './Artwork';
import { useTilt } from '../hooks/useTilt';
import { categoryMap } from '../data/tips';
import type { Tip } from '../data/tips';

interface Props {
  tip: Tip;
  index: number;
  onOpen: (tip: Tip) => void;
}

export function TipCard({ tip, index, onOpen }: Props) {
  const cat = categoryMap[tip.category];
  const tilt = useTilt<HTMLButtonElement>({ max: 8 });

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 26 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.94 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
    >
      <button
        ref={tilt.ref}
        onPointerMove={tilt.onPointerMove}
        onPointerLeave={tilt.onPointerLeave}
        onClick={() => onOpen(tip)}
        className="group relative flex h-full w-full flex-col overflow-hidden rounded-2xl panel text-left transition-[border-color] duration-300 will-change-transform hover:border-accent-soft"
      >
        {/* Higgsfield category artwork */}
        <div className="relative">
          <Artwork
            src={tip.image ?? cat.art}
            color={cat.color}
            alt=""
            className="aspect-[16/10] w-full"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/15 to-transparent" />
          <span
            className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-bg/75 px-2.5 py-1 text-xs font-medium backdrop-blur"
            style={{ color: cat.color }}
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: cat.color }}
            />
            {cat.short}
          </span>
          <span className="absolute right-4 top-4 rounded-full bg-bg/75 px-2.5 py-1 text-xs text-ink-muted backdrop-blur">
            {tip.effort}
          </span>
          {tip.draft && (
            <span
              className="absolute bottom-4 left-4 rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ backgroundColor: '#fbbf24', color: '#0b0d17' }}
            >
              Draft
            </span>
          )}
        </div>

        {/* Body */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="font-display text-lg font-semibold leading-snug">
            {tip.title}
          </h3>
          <p className="mt-1.5 flex-1 text-sm leading-relaxed text-ink-muted">
            {tip.summary}
          </p>
          <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            View steps
            <span
              className="transition-transform duration-200 group-hover:translate-x-1"
              style={{ color: cat.color }}
            >
              →
            </span>
          </span>
        </div>

        {/* Pointer glare (driven by useTilt CSS vars) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 transition-opacity duration-200"
          style={{
            opacity: 'var(--glo, 0)',
            background:
              'radial-gradient(20rem 20rem at var(--glx,50%) var(--gly,50%), rgba(255,255,255,0.16), transparent 60%)',
          }}
        />
      </button>
    </motion.div>
  );
}
