import { Link } from 'react-router-dom'

/**
 * KD monogram — the single source of truth for the brand mark.
 * `variant="mark"` renders just the monogram; `variant="full"` adds the wordmark.
 */
export function Monogram({ size = 40, className = '' }) {
  const id = 'kd-' + Math.random().toString(36).slice(2, 8)
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      className={className}
      role="img"
      aria-label="K-Design Pictures"
    >
      <defs>
        <linearGradient id={id} x1="20" y1="18" x2="82" y2="86" gradientUnits="userSpaceOnUse">
          <stop stopColor="#F4E9C1" />
          <stop offset="0.45" stopColor="#D4AF37" />
          <stop offset="1" stopColor="#8F7220" />
        </linearGradient>
      </defs>
      <rect x="2" y="2" width="96" height="96" rx="22" fill="#0A0A0A" />
      <rect
        x="2.75"
        y="2.75"
        width="94.5"
        height="94.5"
        rx="21.25"
        stroke={`url(#${id})`}
        strokeOpacity="0.55"
        strokeWidth="1.5"
      />
      <g
        stroke={`url(#${id})`}
        strokeWidth="6.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        <path d="M30 28 V72" />
        <path d="M30 50 L48 28" />
        <path d="M30 50 L48 72" />
        <path d="M58 28 V72" />
        <path d="M58 28 C74 28 80 38 80 50 C80 62 74 72 58 72" />
      </g>
    </svg>
  )
}

export default function Logo({ variant = 'full', size = 40, to = '/', className = '' }) {
  const content = (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <Monogram size={size} />
      {variant === 'full' && (
        <span className="flex flex-col leading-none">
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            K-DESIGN
          </span>
          <span className="font-display text-[0.62rem] font-normal tracking-[0.34em] text-gold-500">
            PICTURES
          </span>
        </span>
      )}
    </span>
  )

  if (to === null) return content

  return (
    <Link to={to} aria-label="K-Design Pictures, home" className="group">
      {content}
    </Link>
  )
}
