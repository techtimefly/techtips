import { AnimatePresence, motion } from 'framer-motion';
import { TipCard } from './TipCard';
import type { Tip } from '../data/tips';

interface Props {
  tips: Tip[];
  onOpen: (tip: Tip) => void;
}

export function TipGrid({ tips, onOpen }: Props) {
  return (
    <motion.div
      layout
      className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      <AnimatePresence mode="popLayout">
        {tips.map((tip, i) => (
          <TipCard key={tip.id} tip={tip} index={i} onOpen={onOpen} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
}
