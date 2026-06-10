import { useMemo, useState } from 'react'
import { Search, X } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import ProjectCard from '../components/ui/ProjectCard'
import { PROJECTS, CATEGORIES } from '../data/content'
import { cn } from '../lib/utils'

export default function Portfolio() {
  const [active, setActive] = useState('All')
  const [query, setQuery] = useState('')

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return PROJECTS.filter((p) => {
      const inCat = active === 'All' || p.category === active
      const inQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q)
      return inCat && inQuery
    })
  }, [active, query])

  return (
    <>
      <Seo
        title="Portfolio"
        description="Selected corporate films, events, music videos, photography, and documentaries produced by K-Design Pictures in Cameroon."
        path="/portfolio"
      />
      <PageHero
        kicker="Selected work"
        title="The work"
        intro="Filter, search, explore."
      />

      {/* Controls */}
      <section className="shell sticky top-20 z-30 py-6">
        <div className="flex flex-col gap-4 rounded-full glass px-4 py-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-1.5">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => setActive(c)}
                className={cn(
                  'rounded-full px-4 py-2 text-sm transition-all duration-300',
                  active === c
                    ? 'bg-gold-500 text-ink-900'
                    : 'text-mist-400 hover:bg-white/[0.05] hover:text-white'
                )}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative lg:w-72">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-600" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects"
              className="w-full rounded-full border border-white/10 bg-ink-850/80 py-2.5 pl-10 pr-9 text-sm text-white placeholder:text-mist-600 focus:border-gold-500/60 focus:outline-none"
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-mist-500 hover:text-white"
                aria-label="Clear search"
              >
                <X size={15} />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="shell pb-28 pt-6">
        {results.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((p, i) => (
              <ProjectCard
                key={p.slug}
                project={p}
                className={i % 5 === 0 ? 'sm:col-span-2 lg:col-span-2' : ''}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-3xl glass py-24 text-center">
            <p className="font-display text-2xl text-white">No projects match that yet</p>
            <p className="mt-2 text-mist-500">Try another category or clear your search.</p>
            <button
              onClick={() => {
                setActive('All')
                setQuery('')
              }}
              className="btn-ghost mt-6"
            >
              Reset filters
            </button>
          </div>
        )}
      </section>
    </>
  )
}
