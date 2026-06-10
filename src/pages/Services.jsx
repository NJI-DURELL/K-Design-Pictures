import { Link } from 'react-router-dom'
import { ArrowRight, Check, MessageSquare, Pencil, Clapperboard, Send } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import { SERVICES } from '../data/content'

const PROCESS = [
  { icon: MessageSquare, title: 'Conversation', text: 'We listen first. What is the goal, the audience, the feeling you want to leave behind.' },
  { icon: Pencil, title: 'Concept', text: 'We shape the idea and the look, then agree on a plan before anyone touches a camera.' },
  { icon: Clapperboard, title: 'Production', text: 'A calm, organised set. We cover what matters and protect the moments that count.' },
  { icon: Send, title: 'Delivery', text: 'Edit, grade, sound, and finish. You review, we refine, you receive files ready to use.' },
]

export default function Services() {
  return (
    <>
      <Seo
        title="Services"
        description="Corporate films, event coverage, music videos, photography, documentary production, video editing, creative direction, and commercial production in Cameroon."
        path="/services"
      />
      <PageHero
        kicker="Services"
        title="Everything you need to make something worth watching"
        intro="Eight ways we help brands, artists, and people tell their story on screen. One team carries it from idea to final file."
      />

      {/* Service detail list */}
      <section className="shell space-y-6 py-16">
        {SERVICES.map((s, i) => {
          const Icon = s.icon
          return (
            <div
              key={s.slug}
              className="group grid gap-6 rounded-[1.75rem] glass p-8 transition-all duration-700 ease-cinema hover:border-gold-500/25 md:grid-cols-[auto_1fr_auto] md:items-center md:gap-10 md:p-10 reveal"
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-sm text-mist-600">{String(i + 1).padStart(2, '0')}</span>
                <span className="grid h-16 w-16 place-items-center rounded-2xl border border-white/10 bg-ink-800 text-gold-400 transition-colors group-hover:border-gold-500/40">
                  <Icon size={28} strokeWidth={1.5} />
                </span>
              </div>

              <div>
                <h3 className="font-display text-2xl font-semibold text-white">{s.title}</h3>
                <p className="mt-2 max-w-2xl text-base leading-relaxed text-mist-400">
                  {s.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
                  {s.features.map((f) => (
                    <span key={f} className="flex items-center gap-2 text-sm text-mist-500">
                      <Check size={14} className="text-gold-500" />
                      {f}
                    </span>
                  ))}
                </div>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 self-start rounded-full border border-white/15 px-5 py-2.5 text-sm text-white transition-all hover:border-gold-500/60 hover:bg-white/[0.03] md:self-center"
              >
                Enquire
                <ArrowRight size={15} />
              </Link>
            </div>
          )
        })}
      </section>

      {/* Process */}
      <section className="shell py-24">
        <SectionHeading
          align="center"
          kicker="How we work"
          title="A simple process, run with discipline"
          intro="No mystery, no chaos. Four clear stages, and you know where things stand at every one."
        />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {PROCESS.map((p, i) => (
            <div key={p.title} className="relative rounded-3xl glass p-7 reveal" data-reveal-delay={i * 80}>
              <span className="absolute right-6 top-6 font-display text-4xl font-semibold text-white/[0.06]">
                {i + 1}
              </span>
              <p.icon size={24} className="text-gold-400" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-400">{p.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="shell pb-28">
        <div className="reveal relative overflow-hidden rounded-[2rem] glass glass-gold px-8 py-16 text-center">
          <div className="pointer-events-none absolute inset-0 bg-radial-spot" />
          <h2 className="relative mx-auto max-w-2xl text-fluid-title font-semibold text-white text-balance">
            Not sure which service you need? Start with a conversation.
          </h2>
          <Link to="/contact" className="btn-primary relative mt-8">
            Talk to us
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  )
}
