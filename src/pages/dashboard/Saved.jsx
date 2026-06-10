import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bookmark } from 'lucide-react'
import ProjectCard from '../../components/ui/ProjectCard'
import { PROJECTS } from '../../data/content'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

export default function Saved() {
  const { user } = useAuth()
  // Demo fallback: show a few featured projects as "saved".
  const [slugs, setSlugs] = useState(PROJECTS.filter((p) => p.featured).map((p) => p.slug))

  useEffect(() => {
    if (supabase && user) {
      supabase
        .from('saved_projects')
        .select('project_slug')
        .eq('user_id', user.id)
        .then(({ data }) => {
          if (data) setSlugs(data.map((r) => r.project_slug))
        })
    }
  }, [user])

  const saved = PROJECTS.filter((p) => slugs.includes(p.slug))

  return (
    <div className="space-y-6">
      <section className="rounded-[1.75rem] glass p-8">
        <h1 className="font-display text-2xl font-semibold text-white">Saved projects</h1>
        <p className="mt-2 text-mist-400">The work you bookmarked, kept in one place.</p>
      </section>

      {saved.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {saved.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      ) : (
        <div className="rounded-[1.75rem] glass py-20 text-center">
          <Bookmark size={32} className="mx-auto text-gold-500/50" />
          <p className="mt-4 font-display text-xl text-white">Nothing saved yet</p>
          <p className="mt-2 text-mist-500">Browse the portfolio and save work you love.</p>
          <Link to="/portfolio" className="btn-primary mt-6">
            Explore the work
          </Link>
        </div>
      )}
    </div>
  )
}
