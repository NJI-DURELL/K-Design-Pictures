import { useState } from 'react'
import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LogOut, Menu, X, ArrowUpRight, Search } from 'lucide-react'
import Logo from '../brand/Logo'
import Avatar from '../ui/Avatar'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/utils'

/**
 * Shared dashboard chrome: frosted sidebar with pill active states (the
 * reference UI language) plus a top bar. Reused by the user and admin areas.
 */
export default function DashboardShell({ nav, label = 'Dashboard', accent }) {
  const { displayName, email, isAdmin, signOut } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const SideNav = (
    <nav className="flex h-full flex-col">
      <div className="px-2">
        <Logo size={38} />
      </div>

      <p className="mt-10 px-4 text-2xs font-medium uppercase tracking-brand text-mist-600">
        {label}
      </p>
      <ul className="mt-3 space-y-1">
        {nav.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              end={item.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  'flex items-center gap-3 rounded-2xl px-4 py-3 text-sm transition-all duration-300',
                  isActive
                    ? 'bg-white/[0.06] text-white shadow-inset-hair'
                    : 'text-mist-400 hover:bg-white/[0.03] hover:text-white'
                )
              }
            >
              <item.icon size={18} className="text-gold-500" strokeWidth={1.6} />
              {item.label}
              {item.badge ? (
                <span className="ml-auto rounded-full bg-gold-500 px-2 py-0.5 text-2xs font-semibold text-ink-900">
                  {item.badge}
                </span>
              ) : null}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="mt-auto space-y-2">
        <NavLink
          to="/"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm text-mist-400 transition hover:bg-white/[0.03] hover:text-white"
        >
          <ArrowUpRight size={18} className="text-gold-500" />
          View live site
        </NavLink>
        <button
          onClick={handleSignOut}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm text-mist-400 transition hover:bg-white/[0.03] hover:text-white"
        >
          <LogOut size={18} className="text-gold-500" />
          Log out
        </button>
      </div>
    </nav>
  )

  return (
    <div className="min-h-screen bg-ink-950">
      {/* ambient glow */}
      <div className="pointer-events-none fixed inset-0 bg-radial-spot opacity-60" />

      <div className="relative mx-auto flex max-w-[1500px] gap-6 p-4 lg:p-6">
        {/* Desktop sidebar */}
        <aside className="sticky top-6 hidden h-[calc(100vh-3rem)] w-64 shrink-0 rounded-[1.75rem] glass p-5 lg:flex">
          {SideNav}
        </aside>

        {/* Mobile drawer */}
        {open && (
          <div className="fixed inset-0 z-50 lg:hidden">
            <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm" onClick={() => setOpen(false)} />
            <aside className="absolute inset-y-0 left-0 w-72 bg-ink-850 p-5">
              <button onClick={() => setOpen(false)} className="absolute right-4 top-4 text-mist-400">
                <X size={20} />
              </button>
              {SideNav}
            </aside>
          </div>
        )}

        {/* Main */}
        <div className="min-w-0 flex-1">
          {/* Top bar */}
          <header className="flex items-center justify-between gap-4 rounded-[1.5rem] glass px-4 py-3 sm:px-6">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setOpen(true)}
                className="grid h-10 w-10 place-items-center rounded-full glass lg:hidden"
                aria-label="Open menu"
              >
                <Menu size={18} className="text-white" />
              </button>
              <div className="relative hidden sm:block">
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-mist-600" />
                <input
                  placeholder="Search"
                  className="w-56 rounded-full border border-white/10 bg-ink-850/60 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-mist-600 focus:border-gold-500/50 focus:outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden text-right sm:block">
                <p className="text-sm font-medium text-white">{displayName}</p>
                <p className="text-2xs text-mist-500">{isAdmin ? 'Administrator' : 'Member'}</p>
              </div>
              <Avatar name={displayName} size={42} />
            </div>
          </header>

          <main className="mt-6">
            <Outlet context={{ displayName, email, isAdmin }} />
          </main>
        </div>
      </div>
    </div>
  )
}
