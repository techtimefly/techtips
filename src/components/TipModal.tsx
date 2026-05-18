import { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Artwork } from './Artwork';
import { categoryMap } from '../data/tips';
import type { Tip } from '../data/tips';

interface Props {
  tip: Tip | null;
  onClose: () => void;
}

export function TipModal({ tip, onClose }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!tip) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [tip, onClose]);

  const cat = tip ? categoryMap[tip.category] : null;

  return (
    <AnimatePresence>
      {tip && cat && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="absolute inset-0 bg-bg/80 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="tip-modal-title"
            initial={{ y: 48, opacity: 0, scale: 0.97 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 280, damping: 28 }}
            className="relative flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl panel sm:rounded-3xl"
          >
            <div className="relative shrink-0">
              <Artwork
                src={tip.image ?? cat.art}
                color={cat.color}
                alt=""
                className="aspect-[16/7] w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-surface to-transparent" />
              <button
                ref={closeRef}
                type="button"
                onClick={onClose}
                aria-label="Close tip"
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-bg/75 text-ink-muted backdrop-blur transition-colors hover:text-ink"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M6 6l12 12M18 6L6 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <span
                  className="inline-flex items-center gap-1.5 text-sm font-medium"
                  style={{ color: cat.color }}
                >
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: cat.color }}
                  />
                  {cat.label}
                </span>
                <span className="text-sm text-ink-muted">· about {tip.effort}</span>
              </div>

              <h2
                id="tip-modal-title"
                className="mt-2 font-display text-2xl font-bold leading-tight"
              >
                {tip.title}
              </h2>
              <p className="mt-2 leading-relaxed text-ink-muted">{tip.summary}</p>

              <ol className="mt-6 space-y-3.5">
                {tip.steps.map((step, i) => (
                  <li key={i} className="flex gap-3.5">
                    <span
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-semibold"
                      style={{ backgroundColor: `${cat.color}22`, color: cat.color }}
                    >
                      {i + 1}
                    </span>
                    <p className="pt-0.5 text-sm leading-relaxed text-ink/90">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="shrink-0 border-t border-border px-6 py-4 text-xs text-ink-muted">
              That's it — one small change, done.
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
