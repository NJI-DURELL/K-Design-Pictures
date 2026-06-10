import { initials as toInitials, seedHue } from '../../lib/utils'

/**
 * Initials avatar — no stock profile icons anywhere in the product.
 * Durell Njie -> DN, on a deterministic dark/gold gradient seeded by name.
 */
export default function Avatar({ name = '', src = null, size = 40, className = '' }) {
  const text = toInitials(name)
  const hue = seedHue(name || text)
  const style = {
    width: size,
    height: size,
    fontSize: Math.round(size * 0.36),
    background: src
      ? undefined
      : `radial-gradient(120% 120% at 30% 20%, hsl(${hue} 18% 20%) 0%, #0A0A0A 75%)`,
  }

  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full ring-1 ring-gold-500/40 ${className}`}
      style={style}
      aria-hidden={false}
      title={name}
    >
      {src ? (
        <img src={src} alt={name} className="h-full w-full object-cover" />
      ) : (
        <span className="font-display font-semibold tracking-wide text-gold-300">{text}</span>
      )}
    </span>
  )
}
