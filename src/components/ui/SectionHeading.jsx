import { cn } from '../../lib/utils'

export default function SectionHeading({
  kicker,
  title,
  intro,
  align = 'left',
  className = '',
}) {
  return (
    <div
      className={cn(
        'max-w-2xl reveal',
        align === 'center' && 'mx-auto text-center',
        className
      )}
    >
      {kicker && <span className={cn('kicker', align === 'center' && 'justify-center')}>{kicker}</span>}
      <h2 className="mt-5 text-fluid-title font-semibold text-balance text-white">{title}</h2>
      {intro && <p className="mt-5 text-base leading-relaxed text-mist-400">{intro}</p>}
    </div>
  )
}
