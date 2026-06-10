import { useOutletContext, Link } from 'react-router-dom'
import { Bookmark, Bell, Film, ArrowUpRight } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'

export default function Profile() {
  const { displayName, email } = useOutletContext()

  const stats = [
    { icon: Bookmark, label: 'Saved projects', value: 3, to: '/dashboard/saved' },
    { icon: Bell, label: 'Notifications', value: 2, to: '/dashboard/notifications' },
    { icon: Film, label: 'New work this month', value: 4, to: '/portfolio' },
  ]

  return (
    <div className="space-y-6">
      {/* Greeting */}
      <section className="overflow-hidden rounded-[1.75rem] glass p-8">
        <p className="text-sm text-mist-500">{greeting()},</p>
        <h1 className="mt-1 font-display text-3xl font-semibold text-white">{displayName}</h1>
        <p className="mt-2 max-w-lg text-mist-400">
          Welcome to your space. Track the projects you love and stay close to what the studio is
          making.
        </p>
      </section>

      {/* Quick stats */}
      <section className="grid gap-5 sm:grid-cols-3">
        {stats.map((s) => (
          <Link
            key={s.label}
            to={s.to}
            className="group rounded-3xl glass p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold-500/25"
          >
            <div className="flex items-center justify-between">
              <span className="grid h-11 w-11 place-items-center rounded-xl border border-white/10 bg-ink-800 text-gold-400">
                <s.icon size={20} strokeWidth={1.6} />
              </span>
              <ArrowUpRight size={16} className="text-mist-600 transition group-hover:text-gold-400" />
            </div>
            <p className="mt-5 font-display text-3xl font-semibold text-white">{s.value}</p>
            <p className="text-sm text-mist-500">{s.label}</p>
          </Link>
        ))}
      </section>

      {/* Account details */}
      <section className="rounded-[1.75rem] glass p-8">
        <h2 className="font-display text-lg font-semibold text-white">Account details</h2>
        <div className="mt-6 flex flex-col gap-6 sm:flex-row sm:items-center">
          <Avatar name={displayName} size={80} />
          <div className="grid flex-1 gap-4 sm:grid-cols-2">
            <Detail label="Full name" value={displayName} />
            <Detail label="Email" value={email || 'Not set in demo mode'} />
            <Detail label="Member since" value={new Date().getFullYear()} />
            <Detail label="Plan" value="Client access" />
          </div>
        </div>
        <Link to="/dashboard/security" className="btn-ghost mt-8 inline-flex">
          Manage account
        </Link>
      </section>
    </div>
  )
}

function Detail({ label, value }) {
  return (
    <div className="rounded-xl border border-white/[0.06] bg-ink-850/50 px-4 py-3">
      <p className="text-2xs uppercase tracking-wide text-mist-600">{label}</p>
      <p className="mt-1 truncate text-sm text-white">{value}</p>
    </div>
  )
}

function greeting() {
  const h = new Date().getHours()
  if (h < 12) return 'Good morning'
  if (h < 18) return 'Good afternoon'
  return 'Good evening'
}
