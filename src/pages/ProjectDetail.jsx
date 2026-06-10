import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { ArrowLeft, ArrowRight, Bookmark, Calendar, User, Layers } from 'lucide-react'
import Seo from '../components/seo/Seo'
import Poster from '../components/ui/Poster'
import VideoEmbed from '../components/ui/VideoEmbed'
import ProjectCard from '../components/ui/ProjectCard'
import { getProject, getRelatedProjects } from '../data/content'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabase'

export default function ProjectDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const project = getProject(slug)
  const { user } = useAuth()
  const [saved, setSaved] = useState(false)
  const [savedNote, setSavedNote] = useState('')

  if (!project) {
    return (
      <div className="shell flex min-h-[70vh] flex-col items-center justify-center text-center">
        <h1 className="font-display text-4xl text-white">Project not found</h1>
        <p className="mt-3 text-mist-500">This project may have moved or been unpublished.</p>
        <Link to="/portfolio" className="btn-primary mt-8">
          Back to portfolio
        </Link>
      </div>
    )
  }

  const related = getRelatedProjects(slug)
  const hasVideo = Boolean(project.video)

  const handleSave = async () => {
    if (!user) {
      setSavedNote('Sign in to save projects to your dashboard.')
      setTimeout(() => navigate('/login', { state: { from: `/portfolio/${slug}` } }), 900)
      return
    }
    setSaved((v) => !v)
    if (supabase) {
      if (!saved) {
        await supabase.from('saved_projects').insert({ user_id: user.id, project_slug: slug })
      } else {
        await supabase.from('saved_projects').delete().match({ user_id: user.id, project_slug: slug })
      }
    }
  }

  return (
    <>
      <Seo
        title={project.title}
        description={project.summary}
        path={`/portfolio/${slug}`}
        type="article"
      />

      {/* Hero banner */}
      <section className="relative h-[72vh] min-h-[520px] w-full overflow-hidden">
        <Poster src={project.cover} seed={project.slug} alt={project.title} className="h-full w-full" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-ink-900/30" />
        <div className="shell absolute inset-x-0 bottom-0 pb-14">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-mist-300 transition hover:text-white"
          >
            <ArrowLeft size={15} />
            All work
          </Link>
          <span className="mt-6 block text-2xs font-medium uppercase tracking-brand text-gold-400">
            {project.category}
          </span>
          <h1 className="mt-3 max-w-4xl text-fluid-display font-semibold text-white text-balance">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="shell grid gap-14 py-16 lg:grid-cols-[1fr_320px]">
        <div>
          <p className="text-xl leading-relaxed text-mist-200">{project.summary}</p>
          <div className="mt-8 space-y-5 text-base leading-relaxed text-mist-400">
            <p>{project.description}</p>
          </div>

          {/* Video */}
          {hasVideo && (
            <div className="mt-12 overflow-hidden rounded-3xl glass">
              <VideoEmbed url={project.video} title={project.title} seed={`${project.slug}-video`} />
            </div>
          )}

          {/* Gallery */}
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3">
            {project.gallery.map((g, i) => (
              <Poster
                key={i}
                src={g}
                seed={`${project.slug}-${i}`}
                alt={`${project.title} still ${i + 1}`}
                className={`overflow-hidden rounded-2xl ${i % 3 === 0 ? 'col-span-2 aspect-video md:col-span-1' : 'aspect-square'}`}
              />
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="lg:sticky lg:top-28 lg:h-fit">
          <div className="rounded-3xl glass p-7">
            <dl className="space-y-5">
              <Meta icon={User} label="Client" value={project.client} />
              <Meta icon={Calendar} label="Year" value={project.year} />
              <Meta icon={Layers} label="Services" value={project.services.join(', ')} />
            </dl>
            <button
              onClick={handleSave}
              className={`mt-7 flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all duration-500 ${
                saved
                  ? 'bg-gold-500 text-ink-900'
                  : 'border border-white/15 text-white hover:border-gold-500/60'
              }`}
            >
              <Bookmark size={16} className={saved ? 'fill-current' : ''} />
              {saved ? 'Saved' : 'Save project'}
            </button>
            {savedNote && <p className="mt-3 text-center text-xs text-gold-400">{savedNote}</p>}
            <Link to="/contact" className="btn-primary mt-3 w-full">
              Start a similar project
            </Link>
          </div>
        </aside>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="shell pb-28 pt-8">
          <div className="flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-white">Related work</h2>
            <Link to="/portfolio" className="link-reveal text-sm text-gold-400">
              View all
            </Link>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </section>
      )}
    </>
  )
}

function Meta({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <Icon size={16} className="mt-0.5 shrink-0 text-gold-500" />
      <div>
        <dt className="text-2xs uppercase tracking-wide text-mist-600">{label}</dt>
        <dd className="mt-0.5 text-sm text-white">{value}</dd>
      </div>
    </div>
  )
}
