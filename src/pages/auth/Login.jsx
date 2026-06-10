import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Seo from '../../components/seo/Seo'
import AuthLayout from '../../components/auth/AuthLayout'
import PasswordInput from '../../components/ui/PasswordInput'
import { useAuth } from '../../context/AuthContext'
import { supabase } from '../../lib/supabase'

export default function Login() {
  const { signIn, isSupabaseReady } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!isSupabaseReady) {
      navigate('/dashboard')
      return
    }

    setLoading(true)
    const { data, error } = await signIn(form)
    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    // Role-based routing from a single login: admins -> /admin, users -> /dashboard.
    let role = 'user'
    if (supabase && data?.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single()
      role = profile?.role ?? 'user'
    }
    const from = location.state?.from
    navigate(role === 'admin' ? '/admin' : from || '/dashboard', { replace: true })
  }

  return (
    <>
      <Seo title="Sign in" noindex path="/login" />
      <AuthLayout
        title="Welcome back"
        subtitle="Sign in to your K-Design account."
        footer={
          <>
            New here?{' '}
            <Link to="/register" className="font-medium text-gold-400 hover:text-gold-300">
              Create an account
            </Link>
          </>
        }
      >
        <form onSubmit={handleSubmit} className="space-y-5">
          <label className="block">
            <span className="field-label">Email</span>
            <input
              required
              type="email"
              value={form.email}
              onChange={update('email')}
              className="field"
              placeholder="you@email.com"
            />
          </label>
          <label className="block">
            <div className="flex items-center justify-between">
              <span className="field-label">Password</span>
              <Link to="/forgot-password" className="mb-2 text-xs text-gold-400 hover:text-gold-300">
                Forgot password?
              </Link>
            </div>
            <PasswordInput value={form.password} onChange={update('password')} required />
          </label>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? 'Signing in...' : 'Sign in'}
            <ArrowRight size={16} />
          </button>
        </form>
      </AuthLayout>
    </>
  )
}
