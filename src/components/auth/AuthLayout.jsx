import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Logo from '../brand/Logo'
import { useAuth } from '../../context/AuthContext'

/**
 * Split-screen auth shell: cinematic brand panel on the left, form on the right.
 */
export default function AuthLayout({ title, subtitle, children, footer }) {
  const { isSupabaseReady } = useAuth()

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Brand panel */}
      <aside className="relative hidden overflow-hidden lg:block">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(70% 60% at 30% 20%, rgba(212,175,55,0.12) 0%, transparent 60%), linear-gradient(160deg, #0F0F10 0%, #050505 100%)',
          }}
        />
        <div className="absolute inset-0 bg-grain opacity-[0.04] mix-blend-overlay" />
        <div className="relative flex h-full flex-col justify-between p-12">
          <Logo size={44} />
          <div>
            <p className="font-display text-4xl font-semibold leading-tight text-white text-balance">
              We turn stories into <span className="text-gold-sheen">powerful visual experiences</span>.
            </p>
            <p className="mt-5 max-w-md text-mist-400">
              Sign in to follow your projects, save work you love, and stay close to the studio.
            </p>
          </div>
          <p className="font-mono text-xs tracking-wide text-mist-600">
            K-Design Pictures SARL · Yaoundé · Cameroon
          </p>
        </div>
      </aside>

      {/* Form panel */}
      <main className="relative flex flex-col justify-center bg-ink-900 px-6 py-12 sm:px-12">
        <Link
          to="/"
          className="absolute left-6 top-6 inline-flex items-center gap-2 text-sm text-mist-400 transition hover:text-white sm:left-12 sm:top-10"
        >
          <ArrowLeft size={15} />
          Back to site
        </Link>

        <div className="mx-auto w-full max-w-sm">
          <div className="lg:hidden">
            <Logo size={40} />
          </div>
          <h1 className="mt-8 font-display text-3xl font-semibold text-white">{title}</h1>
          {subtitle && <p className="mt-2 text-mist-400">{subtitle}</p>}

          {!isSupabaseReady && (
            <div className="mt-6 rounded-xl border border-gold-500/25 bg-gold-500/[0.06] px-4 py-3 text-xs leading-relaxed text-gold-200">
              Demo mode. Add your Supabase keys to <span className="font-mono">.env</span> to enable
              real accounts. You can still preview the dashboards.
            </div>
          )}

          <div className="mt-8">{children}</div>

          {footer && <div className="mt-8 text-center text-sm text-mist-400">{footer}</div>}
        </div>
      </main>
    </div>
  )
}
