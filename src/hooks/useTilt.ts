import { useCallback, useRef } from 'react';
import type { PointerEvent, RefObject } from 'react';
import { useReducedMotion } from './useReducedMotion';

interface TiltOptions {
  /** Maximum rotation in degrees on each axis */
  max?: number;
  /** Scale applied while hovering */
  scale?: number;
}

interface TiltBindings<T extends HTMLElement> {
  ref: RefObject<T | null>;
  onPointerMove: (e: PointerEvent<T>) => void;
  onPointerLeave: () => void;
}

/**
 * Pointer-driven 3D tilt. Returns a ref + handlers to spread onto an element.
 * No-ops for touch input and when the user prefers reduced motion.
 * Also writes `--glx` / `--gly` / `--glo` CSS vars for an optional glare layer.
 */
export function useTilt<T extends HTMLElement = HTMLElement>({
  max = 9,
  scale = 1.025,
}: TiltOptions = {}): TiltBindings<T> {
  const ref = useRef<T>(null);
  const raf = useRef<number | null>(null);
  const reduced = useReducedMotion();

  const onPointerMove = useCallback(
    (e: PointerEvent<T>) => {
      const el = ref.current;
      if (!el || reduced || e.pointerType === 'touch') return;

      const rect = el.getBoundingClientRect();
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;

      if (raf.current !== null) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        const rotateY = (px - 0.5) * max * 2;
        const rotateX = (0.5 - py) * max * 2;
        el.style.transform =
          `perspective(950px) rotateX(${rotateX.toFixed(2)}deg) ` +
          `rotateY(${rotateY.toFixed(2)}deg) scale(${scale})`;
        el.style.setProperty('--glx', `${(px * 100).toFixed(1)}%`);
        el.style.setProperty('--gly', `${(py * 100).toFixed(1)}%`);
        el.style.setProperty('--glo', '1');
      });
    },
    [reduced, max, scale],
  );

  const onPointerLeave = useCallback(() => {
    if (raf.current !== null) cancelAnimationFrame(raf.current);
    const el = ref.current;
    if (!el) return;
    el.style.transform = '';
    el.style.setProperty('--glo', '0');
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}
