import { useLayoutEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ArrowRight, Play, ArrowDown } from 'lucide-react'
import Seo from '../components/seo/Seo'
import SectionHeading from '../components/ui/SectionHeading'
import ServiceCard from '../components/ui/ServiceCard'
import ProjectCard from '../components/ui/ProjectCard'
import TestimonialCard from '../components/ui/TestimonialCard'
import Counter from '../components/ui/Counter'
import Poster from '../components/ui/Poster'
import { SERVICES, PROJECTS, TESTIMONIALS } from '../data/content'
import { STATS } from '../data/site'

const CLIENTS = ['Zaflex', 'Wyllyam Feval', 'Kate', 'Kryx Matik', 'Brotherhood', 'Family Street']

export default function Home() {
  const heroRef = useRef(null)

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.from('.hero-kicker', { y: 20, opacity: 0, duration: 0.8 })
        .from(
          '.hero-line',
          { yPercent: 110, opacity: 0, duration: 1.1, stagger: 0.12, ease: 'expo.out' },
          '-=0.4'
        )
        .from('.hero-sub', { y: 24, opacity: 0, duration: 0.9 }, '-=0.7')
        .from('.hero-cta', { y: 20, opacity: 0, duration: 0.7, stagger: 0.1 }, '-=0.6')
        .from('.hero-meta', { opacity: 0, duration: 1 }, '-=0.4')
    }, heroRef)
    return () => ctx.revert()
  }, [])

  const featured = PROJECTS.filter((p) => p.featured)

  return (
    <>
      <Seo
        title="Cinematic Audiovisual Production in Yaoundé"
        description="K-Design Pictures turns real stories into cinema. Corporate films, events, music videos, photography, and documentaries produced in Yaoundé, Cameroon."
        path="/"
      />

      {/* ============================ HERO ============================ */}
      <section ref={heroRef} className="relative flex min-h-screen items-center overflow-hidden">
        {/* Background: drop a real reel into /public/hero.mp4 and uncomment the video */}
        {/* <video autoPlay muted loop playsInline poster="/hero-poster.jpg" className="absolute inset-0 h-full w-full object-cover">
          <source src="/hero.mp4" type="video/mp4" />
        </video> */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 55% at 50% 0%, rgba(212,175,55,0.10) 0%, transparent 60%), radial-gradient(60% 60% at 80% 90%, rgba(212,175,55,0.06) 0%, transparent 55%), linear-gradient(160deg, #0F0F10 0%, #050505 100%)',
          }}
        />
        <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay" />
        <div className="pointer-events-none absolute inset-0 bg-fade-ink" />

        <div className="shell relative z-10 pt-28">
          <span className="hero-kicker kicker">Audiovisual Production Studio · Yaoundé</span>

          <h1 className="mt-8 max-w-5xl text-fluid-hero font-semibold text-white">
            <span className="block overflow-hidden">
              <span className="hero-line block">We turn stories into</span>
            </span>
            <span className="block overflow-hidden">
              <span className="hero-line block">
                powerful <span className="text-gold-sheen">visual experiences</span>
              </span>
            </span>
          </h1>

          <p className="hero-sub mt-8 max-w-xl text-lg leading-relaxed text-mist-300">
            A film studio built on patience, craft, and respect for the people in front of the lens.
            We make work that earns attention and holds it.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/portfolio" className="hero-cta btn-primary">
              View our work
              <ArrowRight size={17} />
            </Link>
            <Link to="/contact" className="hero-cta btn-ghost">
              <Play size={15} className="fill-current" />
              Start a project
            </Link>
          </div>

          <div className="hero-meta mt-20 grid max-w-3xl grid-cols-2 gap-8 border-t border-white/[0.07] pt-8 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-3xl font-semibold text-white">
                  <Counter value={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-1 text-xs text-mist-500">{s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/15 p-1.5">
            <span className="h-2 w-1 rounded-full bg-gold-500 animate-scroll-hint" />
          </span>
        </div>
      </section>

      {/* ========================= CLIENT STRIP ====================== */}
      <section className="border-y border-white/[0.06] py-8">
        <div className="shell flex flex-wrap items-center justify-center gap-x-12 gap-y-4">
          <span className="text-2xs uppercase tracking-brand text-mist-600">Trusted by</span>
          {CLIENTS.map((c) => (
            <span key={c} className="font-display text-lg text-mist-500 transition-colors hover:text-mist-300">
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* ========================== SERVICES ========================= */}
      <section className="shell py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="What we do"
            title="Full-service production, end to end"
            intro="From the first idea to the final grade, one team carries your project the whole way."
          />
          <Link to="/services" className="link-reveal hidden text-sm font-medium text-gold-400 sm:block">
            All services
          </Link>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.slice(0, 8).map((s, i) => (
            <ServiceCard key={s.slug} service={s} index={i} />
          ))}
        </div>
      </section>

      {/* ====================== FEATURED PROJECTS ==================== */}
      <section className="shell py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            kicker="Selected work"
            title="Films people remember"
            intro="A few recent projects that show how we think and what we deliver."
          />
          <Link to="/portfolio" className="link-reveal hidden text-sm font-medium text-gold-400 sm:block">
            View full portfolio
          </Link>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {featured.map((p, i) => (
            <div key={p.slug} className="reveal" data-reveal-delay={i * 90}>
              <ProjectCard project={p} />
            </div>
          ))}
        </div>
      </section>

      {/* ========================== STORY ============================ */}
      <section className="shell py-28">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="reveal">
            <span className="kicker">Our story</span>
            <h2 className="mt-5 text-fluid-title font-semibold text-white text-balance">
              Nine years of learning to wait for the moment
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-mist-400">
              <p>
                K-Design Pictures started with one camera and a refusal to make work that looks like
                everyone else. We grew up shooting documentaries, where you cannot fake a moment and
                you cannot rush trust.
              </p>
              <p>
                That patience now shapes everything we touch, whether it is a national bank brand
                film or a wedding that two families will watch for the rest of their lives. We treat
                every project like it matters, because to someone, it always does.
              </p>
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gold-400 hover:text-gold-300">
              Read our full story
              <ArrowRight size={16} />
            </Link>
          </div>

          <div className="reveal grid grid-cols-2 gap-4" data-reveal-delay="120">
            <div className="space-y-4">
              <Poster src="/media/studio-bts.webp" seed="story-a" alt="On a K-Design studio set" className="aspect-[3/4] overflow-hidden rounded-3xl" />
              <Poster src="/media/aerial-operator.webp" seed="story-b" alt="K-Design drone operator on location" className="aspect-square overflow-hidden rounded-3xl" />
            </div>
            <div className="space-y-4 pt-10">
              <Poster src="/media/studio-set.webp" seed="story-c" alt="Lighting a studio shoot" className="aspect-square overflow-hidden rounded-3xl" />
              <Poster src="/media/zaflex-jalousie.webp" seed="story-d" alt="Cover art produced by K-Design" className="aspect-[3/4] overflow-hidden rounded-3xl" />
            </div>
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================= */}
      <section className="shell py-28">
        <SectionHeading
          align="center"
          kicker="In their words"
          title="The work speaks, and so do our clients"
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.slice(0, 3).map((t, i) => (
            <div key={t.name} className="reveal" data-reveal-delay={i * 90}>
              <TestimonialCard item={t} />
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link to="/testimonials" className="link-reveal text-sm font-medium text-gold-400">
            Read more client stories
          </Link>
        </div>
      </section>

      {/* ============================ CTA ============================ */}
      <section className="shell pb-12 pt-16">
        <div className="reveal relative overflow-hidden rounded-[2rem] glass glass-gold px-8 py-20 text-center sm:px-16">
          <div className="pointer-events-none absolute inset-0 bg-radial-spot" />
          <div className="relative">
            <span className="kicker justify-center">Let us make something</span>
            <h2 className="mx-auto mt-6 max-w-3xl text-fluid-display font-semibold text-white text-balance">
              Tell us the story. We will find the way to tell it.
            </h2>
            <p className="mx-auto mt-6 max-w-xl text-mist-400">
              Whether you have a full brief or a rough idea, the first conversation is free and
              always worth it.
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-primary">
                Start a project
                <ArrowRight size={17} />
              </Link>
              <Link to="/portfolio" className="btn-ghost">
                See the work first
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
