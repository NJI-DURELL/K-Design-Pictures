import { Quote } from 'lucide-react'
import Avatar from './Avatar'
import StarRating from './StarRating'

export default function TestimonialCard({ item, className = '' }) {
  return (
    <figure
      className={`flex h-full flex-col rounded-3xl glass p-8 transition-all duration-700 ease-cinema hover:border-gold-500/25 ${className}`}
    >
      <div className="flex items-center justify-between">
        <Quote size={28} className="text-gold-500/40" />
        <StarRating rating={item.rating} />
      </div>
      <blockquote className="mt-6 flex-1 text-lg leading-relaxed text-mist-200">
        {item.quote}
      </blockquote>
      <figcaption className="mt-8 flex items-center gap-3 border-t border-white/[0.06] pt-6">
        <Avatar name={item.name} size={44} />
        <div>
          <p className="text-sm font-medium text-white">{item.name}</p>
          <p className="text-xs text-mist-500">
            {item.role}
            {item.company ? `, ${item.company}` : ''}
          </p>
        </div>
      </figcaption>
    </figure>
  )
}
