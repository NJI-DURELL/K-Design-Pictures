import { Link } from 'react-router-dom'
import { Target, Eye, Heart, ShieldCheck, Sparkles, Users, ArrowRight } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import SectionHeading from '../components/ui/SectionHeading'
import Avatar from '../components/ui/Avatar'
import Counter from '../components/ui/Counter'
import Poster from '../components/ui/Poster'
import { TEAM } from '../data/content'
import { STATS } from '../data/site'

const VALUES = [
  { icon: Heart, title: 'People first', text: 'The story belongs to the people in it. We protect that, on set and in the edit.' },
  { icon: ShieldCheck, title: 'Earned trust', text: 'We say what we will do, then do it. Most of our work comes from word of mouth.' },
  { icon: Sparkles, title: 'Craft over noise', text: 'We would rather make one film that lasts than ten that are forgotten by Friday.' },
  { icon: Users, title: 'One team', text: 'The same people you meet are the ones who shoot, cut, and deliver your project.' },
]

export default function About() {
  return (
    <>
      <Seo
        title="About the Studio"
        description="K-Design Pictures is a creative audiovisual studio in Yaoundé, Cameroon, built on patience, craft, and respect for the people in front of the lens."
        path="/about"
      />
      <PageHero
        kicker="About the studio"
        title="A creative studio that treats every story like it matters"
        intro="Directors, producers, and editors based in Yaoundé."
      />

      {/* Mission / Vision */}
      <section className="shell py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { icon: Target, label: 'Mission', text: 'To turn real stories into films and designs that move people, made with the eye of a designer and the polish of cinema.' },
            { icon: Eye, label: 'Vision', text: 'To be the studio Cameroonian artists, brands, and families trust first when the work has to be exceptional.' },
          ].map((b) => (
            <div key={b.label} className="rounded-3xl glass p-9 reveal">
              <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-ink-800 text-gold-400">
                <b.icon size={22} strokeWidth={1.5} />
              </span>
              <h3 className="mt-6 font-display text-2xl font-semibold text-white">{b.label}</h3>
              <p className="mt-3 text-base leading-relaxed text-mist-400">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Director */}
      <section className="shell py-20">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1fr]">
          <div className="reveal">
            <Poster
              src="/media/dr-ndoumbe.webp"
              alt="Dr Ndoumbe, founder and director of K-Design Pictures"
              sizes="(max-width: 1024px) 92vw, 40vw"
              priority
              className="aspect-[4/5] w-full overflow-hidden rounded-[2rem]"
            />
          </div>
          <div className="reveal" data-reveal-delay="100">
            <span className="kicker">The director</span>
            <h2 className="mt-5 text-fluid-title font-semibold text-white">Dr Ndoumbe</h2>
            <p className="mt-2 text-gold-400">Founder, Director & Motion Designer</p>
            <p className="mt-6 max-w-md text-base leading-relaxed text-mist-400">
              Directs the films and designs the motion. The eye behind the studio.
            </p>
            <p className="mt-8 border-l-2 border-gold-500/50 pl-5 font-display text-lg italic text-mist-200">
              Une approche qualitative de vos productions.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/[0.06] py-16">
        <div className="shell grid grid-cols-2 gap-8 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="text-center reveal">
              <p className="font-display text-4xl font-semibold text-gold-sheen">
                <Counter value={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-sm text-mist-500">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="shell py-24">
        <SectionHeading align="center" kicker="What we stand for" title="The values behind the work" />
        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((v) => (
            <div key={v.title} className="rounded-3xl glass p-7 reveal">
              <v.icon size={24} className="text-gold-400" strokeWidth={1.5} />
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-mist-400">{v.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="shell py-12 pb-28">
        <SectionHeading kicker="The people" title="Who you will actually work with" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m) => (
            <div key={m.name} className="group rounded-3xl glass p-7 text-center transition-all duration-700 ease-cinema hover:-translate-y-1 hover:border-gold-500/25 reveal">
              <div className="mx-auto">
                <Avatar name={m.name} src={m.photo} size={96} className="mx-auto" />
              </div>
              <h3 className="mt-5 font-display text-lg font-semibold text-white">{m.name}</h3>
              <p className="text-xs uppercase tracking-wide text-gold-500">{m.role}</p>
              <p className="mt-3 text-sm leading-relaxed text-mist-400">{m.bio}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center reveal">
          <Link to="/contact" className="btn-primary">
            Work with us
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </>
  )
}
