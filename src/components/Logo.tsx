export function Logo({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7c5cff" />
          <stop offset="1" stopColor="#2bd6c4" />
        </linearGradient>
      </defs>
      <rect width="64" height="64" rx="16" fill="url(#logo-grad)" />
      <path
        d="M32 14 L46 32 L32 50 L18 32 Z"
        fill="none"
        stroke="#fff"
        strokeWidth="4"
        strokeLinejoin="round"
      />
      <circle cx="32" cy="32" r="5" fill="#fff" />
    </svg>
  );
}
