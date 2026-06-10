import { seedHue } from '../../lib/utils'

/**
 * Cinematic placeholder poster. Renders a real image when `src` is provided,
 * otherwise a deterministic dark gradient with a subtle film frame so the
 * layout always looks intentional. Drop a real photo URL into a project's
 * `image` field (or wire Supabase Storage) and it takes over automatically.
 */
export default function Poster({
  src,
  alt = '',
  seed = '',
  className = '',
  sizes = '(max-width: 768px) 92vw, 33vw',
  priority = false,
  children,
}) {
  const hue = seedHue(seed || alt)

  if (src) {
    // For our optimized /media/*.webp assets, serve a 640px file to small
    // screens and the 1200px master to larger ones.
    const isMedia = /^\/media\/[^/]+\.webp$/.test(src)
    const srcSet = isMedia ? `${src.replace('.webp', '-640.webp')} 640w, ${src} 1200w` : undefined

    return (
      <div className={`relative overflow-hidden ${className}`}>
        <img
          src={src}
          srcSet={srcSet}
          sizes={srcSet ? sizes : undefined}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-[1.2s] ease-cinema group-hover:scale-105"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/70 via-transparent to-transparent" />
        {children}
      </div>
    )
  }

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `
          radial-gradient(80% 60% at 20% 10%, hsl(${hue} 22% 16%) 0%, transparent 60%),
          radial-gradient(70% 70% at 90% 90%, hsl(${(hue + 40) % 360} 24% 12%) 0%, transparent 55%),
          linear-gradient(140deg, #0F0F10 0%, #050505 100%)
        `,
      }}
    >
      <div className="absolute inset-0 bg-grain opacity-[0.05] mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-950/60 via-transparent to-transparent" />
      <div className="pointer-events-none absolute inset-3 rounded-[inherit] border border-white/[0.04]" />
      {children}
    </div>
  )
}
