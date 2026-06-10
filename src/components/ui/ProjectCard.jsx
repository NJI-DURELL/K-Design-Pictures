import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import Poster from './Poster'

export default function ProjectCard({ project, className = '' }) {
  return (
    <Link
      to={`/portfolio/${project.slug}`}
      className={`group relative block overflow-hidden rounded-3xl glass transition-all duration-700 ease-cinema hover:-translate-y-1 hover:border-gold-500/30 hover:shadow-card-hover ${className}`}
    >
      <Poster
        src={project.cover}
        seed={project.slug}
        alt={project.title}
        className="aspect-[4/3] w-full"
      />

      {/* circular gold action button, reference-style */}
      <span className="absolute right-4 top-4 grid h-11 w-11 translate-y-1 place-items-center rounded-full bg-gold-500 text-ink-900 opacity-0 transition-all duration-500 ease-cinema group-hover:translate-y-0 group-hover:opacity-100">
        <ArrowUpRight size={18} />
      </span>

      <div className="absolute inset-x-0 bottom-0 p-6">
        <span className="text-2xs font-medium uppercase tracking-wide text-gold-400">
          {project.category} · {project.year}
        </span>
        <h3 className="mt-2 font-display text-xl font-semibold text-white">{project.title}</h3>
        <p className="mt-1.5 line-clamp-2 text-sm text-mist-400">{project.summary}</p>
      </div>
    </Link>
  )
}
