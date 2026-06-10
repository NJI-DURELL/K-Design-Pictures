import { Link } from 'react-router-dom'
import { Film, Quote, Newspaper, MessageSquare, ArrowUpRight, TrendingUp } from 'lucide-react'
import { useOutletContext } from 'react-router-dom'
import { PROJECTS, TESTIMONIALS, POSTS } from '../../data/content'

export default function Overview() {
  const { displayName } = useOutletContext()

  const metrics = [
    { icon: Film, label: 'Projects', value: PROJECTS.length, trend: '+3 this month', to: '/admin/projects' },
    { icon: Quote, label: 'Testimonials', value: TESTIMONIALS.length, trend: '+2 this month', to: '/admin/testimonials' },
    { icon: Newspaper, label: 'Journal posts', value: POSTS.length, trend: '+1 this week', to: '/admin/blog' },
    { icon: MessageSquare, label: 'New enquiries', value: 7, trend: '+7 this week', to: '/admin/projects' },
  ]

  const recent = PROJECTS.slice(0, 4)

  return (
    <div className="space-y-6">
      <section className="overflow-hidden rounded-[1.75rem] glass p-8">
        <p className="text-sm text-mist-500">Welcome back,</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-white">{displayName}</h1>
        <p className="mt-2 max-w-lg text-mist-400">
          Here is what is happening across the studio. Manage everything the public site shows from
          one place.
        </p>
      </section>

      {/* Metrics */}
      <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <Link
            key={m.label}
            to={m.to}
            className="group rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/25"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-ink-800 text-gold-400">
                <m.icon size={20} strokeWidth={1.6} />
              </span>
              <ArrowUpRight size={16} className="text-mist-600 transition group-hover:text-gold-400" />
            </div>
            <p className="mt-5 font-display text-3xl font-semibold text-white">{m.value}</p>
            <p className="text-sm text-mist-500">{m.label}</p>
            <p className="mt-3 inline-flex items-center gap-1 text-2xs text-gold-400">
              <TrendingUp size={12} />
              {m.trend}
            </p>
          </Link>
        ))}
      </section>

      {/* Recent projects + quick actions */}
      <section className="grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="rounded-[1.75rem] glass p-7">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold text-white">Recent projects</h2>
            <Link to="/admin/projects" className="link-reveal text-sm text-gold-400">
              Manage
            </Link>
          </div>
          <ul className="mt-5 divide-y divide-white/[0.05]">
            {recent.map((p) => (
              <li key={p.slug} className="flex items-center gap-4 py-3.5">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-ink-800 font-mono text-xs text-gold-400">
                  {p.year}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-white">{p.title}</p>
                  <p className="truncate text-xs text-mist-500">{p.client} · {p.category}</p>
                </div>
                <span className="rounded-full bg-gold-500/10 px-3 py-1 text-2xs text-gold-300">
                  {p.featured ? 'Featured' : 'Live'}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[1.75rem] glass p-7">
          <h2 className="font-display text-lg font-semibold text-white">Quick actions</h2>
          <div className="mt-5 grid gap-3">
            {[
              { to: '/admin/projects', label: 'Add a project', icon: Film },
              { to: '/admin/blog', label: 'Write a journal post', icon: Newspaper },
              { to: '/admin/testimonials', label: 'Add a testimonial', icon: Quote },
              { to: '/admin/media', label: 'Upload media', icon: ArrowUpRight },
            ].map((a) => (
              <Link
                key={a.label}
                to={a.to}
                className="flex items-center gap-3 rounded-2xl border border-white/[0.07] px-4 py-3.5 text-sm text-white transition hover:border-gold-500/30 hover:bg-white/[0.03]"
              >
                <a.icon size={17} className="text-gold-500" />
                {a.label}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
