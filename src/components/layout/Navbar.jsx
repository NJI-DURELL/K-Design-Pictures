import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import {
  Menu,
  X,
  Bell,
  LayoutDashboard,
  Bookmark,
  Shield,
  LogOut,
  ChevronRight,
} from 'lucide-react'
import Logo from '../brand/Logo'
import Avatar from '../ui/Avatar'
import { useAuth } from '../../context/AuthContext'
import { cn } from '../../lib/utils'

const LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/portfolio', label: 'Work' },
  { to: '/testimonials', label: 'Voices' },
  { to: '/blog', label: 'Journal' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const { user, displayName, isAdmin, signOut } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const onClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setMenuOpen(false)
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-cinema',
        scrolled ? 'py-3' : 'py-5'
      )}
    >
      <div className="shell">
        <nav
          className={cn(
            'flex items-center justify-between rounded-full px-4 py-2.5 transition-all duration-500 ease-cinema sm:px-5',
            scrolled
              ? 'glass shadow-card'
              : 'border border-transparent bg-transparent'
          )}
        >
          <Logo size={38} />

          {/* Center pill nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    cn(
                      'rounded-full px-4 py-2 text-sm tracking-wide transition-all duration-300',
                      isActive
                        ? 'bg-white/[0.06] text-white'
                        : 'text-mist-400 hover:text-white'
                    )
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Right cluster */}
          <div className="flex items-center gap-2.5">
            <Link to="/contact" className="hidden btn-primary !px-5 !py-2.5 text-sm sm:inline-flex">
              Start a project
            </Link>

            {user ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setMenuOpen((v) => !v)}
                  className="flex items-center rounded-full ring-1 ring-white/10 transition hover:ring-gold-500/50"
                  aria-label="Account menu"
                  aria-expanded={menuOpen}
                >
                  <Avatar name={displayName} size={40} />
                </button>

                {menuOpen && (
                  <div className="absolute right-0 mt-3 w-64 origin-top-right animate-fade-up rounded-2xl glass p-2 shadow-card">
                    <div className="flex items-center gap-3 px-3 py-3">
                      <Avatar name={displayName} size={42} />
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-white">{displayName}</p>
                        <p className="truncate text-xs text-mist-500">
                          {isAdmin ? 'Administrator' : 'Member'}
                        </p>
                      </div>
                    </div>
                    <div className="hairline my-1" />
                    <MenuItem to={isAdmin ? '/admin' : '/dashboard'} icon={LayoutDashboard}>
                      {isAdmin ? 'Admin console' : 'Dashboard'}
                    </MenuItem>
                    <MenuItem to="/dashboard/saved" icon={Bookmark}>
                      Saved projects
                    </MenuItem>
                    <MenuItem to="/dashboard/notifications" icon={Bell}>
                      Notifications
                    </MenuItem>
                    <MenuItem to="/dashboard/security" icon={Shield}>
                      Security
                    </MenuItem>
                    <div className="hairline my-1" />
                    <button
                      onClick={handleSignOut}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-mist-300 transition hover:bg-white/[0.04] hover:text-white"
                    >
                      <LogOut size={16} className="text-gold-500" />
                      Log out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="hidden rounded-full px-4 py-2 text-sm text-mist-300 transition hover:text-white sm:block"
              >
                Sign in
              </Link>
            )}

            <button
              onClick={() => setMobileOpen(true)}
              className="grid h-10 w-10 place-items-center rounded-full glass lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={18} className="text-white" />
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute inset-y-0 right-0 flex w-[86%] max-w-sm flex-col bg-ink-850 p-6 shadow-card animate-fade-up">
            <div className="flex items-center justify-between">
              <Logo size={36} />
              <button
                onClick={() => setMobileOpen(false)}
                className="grid h-10 w-10 place-items-center rounded-full glass"
                aria-label="Close menu"
              >
                <X size={18} className="text-white" />
              </button>
            </div>
            <ul className="mt-10 flex flex-col gap-1">
              {[...LINKS, { to: '/contact', label: 'Contact' }].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    end={link.end}
                    className={({ isActive }) =>
                      cn(
                        'flex items-center justify-between rounded-2xl px-4 py-4 text-lg font-display transition',
                        isActive ? 'bg-white/[0.05] text-white' : 'text-mist-300 hover:text-white'
                      )
                    }
                  >
                    {link.label}
                    <ChevronRight size={18} className="text-gold-500/70" />
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <Link to="/contact" className="btn-primary w-full">
                Start a project
              </Link>
              {!user && (
                <Link to="/login" className="btn-ghost w-full">
                  Sign in
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

function MenuItem({ to, icon: Icon, children }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-mist-300 transition hover:bg-white/[0.04] hover:text-white"
    >
      <Icon size={16} className="text-gold-500" />
      {children}
    </Link>
  )
}
