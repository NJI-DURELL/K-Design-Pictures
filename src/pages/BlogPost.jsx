import { useParams, Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Seo from '../components/seo/Seo'
import Poster from '../components/ui/Poster'
import { getPost, POSTS } from '../data/content'
import { formatDate } from '../lib/utils'

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPost(slug)

  if (!post) {
    return (
      <div className="shell flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl text-white">Article not found</h1>
        <Link to="/blog" className="btn-primary mt-8">
          Back to the journal
        </Link>
      </div>
    )
  }

  const more = POSTS.filter((p) => p.slug !== slug).slice(0, 2)

  return (
    <>
      <Seo title={post.title} description={post.excerpt} path={`/blog/${slug}`} type="article" />

      <article className="pt-40">
        <div className="shell max-w-3xl">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-mist-400 transition hover:text-white">
            <ArrowLeft size={15} />
            The journal
          </Link>
          <div className="mt-8 flex items-center gap-3 text-2xs uppercase tracking-wide text-gold-400">
            <span>{post.category}</span>
            <span className="text-mist-600">·</span>
            <span className="text-mist-500">{post.readingTime}</span>
            <span className="text-mist-600">·</span>
            <span className="text-mist-500">{formatDate(post.date)}</span>
          </div>
          <h1 className="mt-5 text-fluid-title font-semibold text-white text-balance">{post.title}</h1>
        </div>

        <div className="shell mt-10 max-w-4xl">
          <Poster seed={post.slug} alt={post.title} className="aspect-video w-full rounded-[2rem]" />
        </div>

        <div className="shell mt-12 max-w-3xl">
          <p className="text-xl leading-relaxed text-mist-200">{post.excerpt}</p>
          <div className="mt-6 space-y-5 text-base leading-relaxed text-mist-400">
            <p>{post.body}</p>
            <p>
              This article is part of our studio journal. We share the thinking behind our films so
              the people we work with know exactly what they are paying for, and why it looks the way
              it does.
            </p>
          </div>
        </div>
      </article>

      {/* More */}
      <section className="shell mt-24 max-w-3xl pb-28">
        <h2 className="font-display text-2xl font-semibold text-white">Keep reading</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {more.map((p) => (
            <Link
              key={p.slug}
              to={`/blog/${p.slug}`}
              className="group rounded-3xl glass p-6 transition hover:border-gold-500/25"
            >
              <span className="text-2xs uppercase tracking-wide text-gold-400">{p.category}</span>
              <h3 className="mt-2 font-display text-lg font-semibold text-white">{p.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-mist-400">{p.excerpt}</p>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
