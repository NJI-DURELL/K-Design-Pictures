import { ArrowUpRight } from 'lucide-react'

export default function ServiceCard({ service, index }) {
  const Icon = service.icon
  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-3xl glass p-7 transition-all duration-700 ease-cinema hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-card-hover reveal">
      {/* ambient glow on hover */}
      <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold-500/10 opacity-0 blur-2xl transition-opacity duration-700 group-hover:opacity-100" />

      <div className="flex items-center justify-between">
        <span className="grid h-14 w-14 place-items-center rounded-2xl border border-white/10 bg-ink-800 text-gold-400 transition-colors duration-500 group-hover:border-gold-500/40 group-hover:text-gold-300">
          <Icon size={24} strokeWidth={1.5} />
        </span>
        {index != null && (
          <span className="font-mono text-xs text-mist-600">
            {String(index + 1).padStart(2, '0')}
          </span>
        )}
      </div>

      <h3 className="mt-7 font-display text-xl font-semibold text-white">{service.title}</h3>
      <p className="mt-3 text-sm leading-relaxed text-mist-400">{service.summary}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {service.features.slice(0, 3).map((f) => (
          <span
            key={f}
            className="rounded-full border border-white/[0.07] px-3 py-1 text-2xs text-mist-500"
          >
            {f}
          </span>
        ))}
      </div>

      <span className="mt-7 inline-flex items-center gap-1.5 text-sm font-medium text-gold-400 opacity-0 transition-all duration-500 group-hover:opacity-100">
        Learn more
        <ArrowUpRight size={15} />
      </span>
    </div>
  )
}
