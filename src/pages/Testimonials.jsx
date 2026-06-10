import { Link } from 'react-router-dom'
import { Quote, ArrowRight } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import TestimonialCard from '../components/ui/TestimonialCard'
import StarRating from '../components/ui/StarRating'
import { TESTIMONIALS } from '../data/content'

export default function Testimonials() {
  const [feature, ...rest] = TESTIMONIALS

  return (
    <>
      <Seo
        title="Client Voices"
        description="What clients say about working with K-Design Pictures, from national brands to artists and families across Cameroon."
        path="/testimonials"
      />
      <PageHero
        kicker="In their words"
        title="The work speaks. So do the people behind it."
        intro="We are grateful for every brand, artist, and family who trusted us with their story. Here is what a few of them had to say."
      />

      {/* Featured quote */}
      <section className="shell py-12">
        <figure className="reveal relative overflow-hidden rounded-[2rem] glass glass-gold p-10 sm:p-16">
          <div className="pointer-events-none absolute inset-0 bg-radial-spot" />
          <Quote size={48} className="relative text-gold-500/40" />
          <blockquote className="relative mt-6 max-w-4xl font-display text-3xl font-medium leading-snug text-white sm:text-4xl">
            “{feature.quote}”
          </blockquote>
          <figcaption className="relative mt-8 flex items-center gap-4">
            <div>
              <p className="text-base font-medium text-white">{feature.name}</p>
              <p className="text-sm text-mist-500">
                {feature.role}
                {feature.company ? `, ${feature.company}` : ''}
              </p>
            </div>
            <span className="ml-auto">
              <StarRating rating={feature.rating} size={18} />
            </span>
          </figcaption>
        </figure>
      </section>

      {/* Grid */}
      <section className="shell pb-12">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((t, i) => (
            <div key={t.name} className="reveal" data-reveal-delay={i * 80}>
              <TestimonialCard item={t} />
            </div>
          ))}
        </div>
      </section>

      <section className="shell pb-28 pt-8 text-center">
        <h2 className="reveal mx-auto max-w-2xl text-fluid-title font-semibold text-white text-balance">
          We would love to add your story to this page
        </h2>
        <Link to="/contact" className="btn-primary mt-8">
          Start a project
          <ArrowRight size={17} />
        </Link>
      </section>
    </>
  )
}
