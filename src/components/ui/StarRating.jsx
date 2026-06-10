import { Star } from 'lucide-react'

export default function StarRating({ rating = 5, size = 16 }) {
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={size}
          className={i < rating ? 'fill-gold-500 text-gold-500' : 'text-ink-500'}
          strokeWidth={1.5}
        />
      ))}
    </div>
  )
}
