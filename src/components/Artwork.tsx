import { useState } from 'react';

interface ArtworkProps {
  /** Image path (Higgsfield-generated artwork) */
  src: string;
  /** Category accent color, used for the gradient fallback + tint */
  color: string;
  className?: string;
  alt?: string;
}

/**
 * Renders category artwork over a color-tinted gradient. The gradient always
 * shows, so the layout looks intentional even before assets are generated or
 * if an image fails to load.
 */
export function Artwork({ src, color, className = '', alt = '' }: ArtworkProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

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
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-opacity duration-700 ${
            loaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}
    </div>
  );
}
