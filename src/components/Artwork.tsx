import { useEffect, useRef, useState } from 'react';

interface ArtworkProps {
  /** Image path (Higgsfield-generated artwork) */
  src: string;
  /** Category accent color, used for the gradient fallback + tint */
  color: string;
  className?: string;
  alt?: string;
  /** Load immediately instead of lazily — use for above-the-fold images */
  eager?: boolean;
}

/**
 * Renders artwork over a color-tinted gradient. The gradient always shows, so
 * the layout looks intentional before the image loads or if it fails.
 */
export function Artwork({
  src,
  color,
  className = '',
  alt = '',
  eager = false,
}: ArtworkProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // A cached image often finishes loading before React wires up `onLoad`,
  // which would otherwise leave it stuck at opacity 0. Check `complete` on
  // mount (and whenever the src changes) so cached images show instantly.
  useEffect(() => {
    const img = imgRef.current;
    setLoaded(Boolean(img?.complete && img.naturalWidth > 0));
  }, [src]);

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        backgroundImage:
          `radial-gradient(120% 130% at 28% 0%, ${color}59, transparent 62%), ` +
          `linear-gradient(155deg, ${color}26, #0b0d17 78%)`,
      }}
    >
      {!failed && (
        <img
          ref={imgRef}
          src={src}
          alt={alt}
          loading={eager ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
