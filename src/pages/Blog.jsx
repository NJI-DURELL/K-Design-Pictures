import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import Poster from '../components/ui/Poster'
import { POSTS } from '../data/content'
import { formatDate } from '../lib/utils'

export default function Blog() {
  const [feature, ...rest] = POSTS

  return (
    <>
      <Seo
        title="Journal"
        description="Behind-the-scenes stories, craft notes, and updates from the K-Design Pictures studio in Yaoundé."
        path="/blog"
      />
      <PageHero
        kicker="The journal"
        title="Notes from behind the lens"
        intro="How we make the work, what we learn on set, and the occasional update from the studio."
      />

      {/* Featured post */}
      <section className="shell py-12">
        <Link
          to={`/blog/${feature.slug}`}
          className="group grid overflow-hidden rounded-[2rem] glass transition-all duration-700 ease-cinema hover:border-gold-500/25 lg:grid-cols-2 reveal"
        >
          <Poster seed={feature.slug} alt={feature.title} className="aspect-video w-full lg:aspect-auto lg:h-full" />
          <div className="flex flex-col justify-center p-8 lg:p-12">
            <div className="flex items-center gap-3 text-2xs uppercase tracking-wide text-gold-400">
              <span>{feature.category}</span>
              <span className="text-mist-600">·</span>
              <span className="text-mist-500">{feature.readingTime}</span>
            </div>
            <h2 className="mt-4 font-display text-3xl font-semibold text-white">{feature.title}</h2>
            <p className="mt-4 leading-relaxed text-mist-400">{feature.excerpt}</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="text-sm text-mist-500">{formatDate(feature.date)}</span>
              <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-400">
                Read article
                <ArrowUpRight size={15} />
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Grid */}
      <section className="shell pb-28">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post, i) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="group flex flex-col overflow-hidden rounded-3xl glass transition-all duration-700 ease-cinema hover:-translate-y-1 hover:border-gold-500/25 reveal"
              data-reveal-delay={i * 80}
            >
              <Poster seed={post.slug} alt={post.title} className="aspect-[16/10] w-full" />
              <div className="flex flex-1 flex-col p-6">
                <div className="flex items-center gap-3 text-2xs uppercase tracking-wide text-gold-400">
                  <span>{post.category}</span>
                  <span className="text-mist-600">·</span>
                  <span className="text-mist-500">{post.readingTime}</span>
                </div>
                <h3 className="mt-3 font-display text-xl font-semibold text-white">{post.title}</h3>
                <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-mist-400">{post.excerpt}</p>
                <span className="mt-4 text-xs text-mist-600">{formatDate(post.date)}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
