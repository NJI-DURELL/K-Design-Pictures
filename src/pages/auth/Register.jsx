import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Seo from '../../components/seo/Seo'
import AuthLayout from '../../components/auth/AuthLayout'
import PasswordInput from '../../components/ui/PasswordInput'
import { useAuth } from '../../context/AuthContext'

export default function Register() {
  const { signUp, isSupabaseReady } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ fullName: '', email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!isSupabaseReady) {
      navigate('/dashboard')
      return
    }

    setLoading(true)
    const { error } = await signUp(form)
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setDone(true)
  }

  return (
    <>
      <Seo title="Create account" noindex path="/register" />
      <AuthLayout
        title="Create your account"
        subtitle="Save projects you love and follow your work with the studio."
        footer={
          <>
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-gold-400 hover:text-gold-300">
              Sign in
            </Link>
          </>
        }
      >
        {done ? (
          <div className="rounded-2xl glass p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500 text-ink-900">
              <Check size={26} />
            </span>
            <h2 className="mt-5 font-display text-xl text-white">Check your inbox</h2>
            <p className="mt-2 text-sm text-mist-400">
              We sent a confirmation link to {form.email}. Confirm it to activate your account.
            </p>
            <Link to="/login" className="btn-ghost mt-6 w-full">
              Back to sign in
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="field-label">Full name</span>
              <input required value={form.fullName} onChange={update('fullName')} className="field" placeholder="Durell Njie" />
            </label>
            <label className="block">
              <span className="field-label">Email</span>
              <input required type="email" value={form.email} onChange={update('email')} className="field" placeholder="you@email.com" />
            </label>
            <label className="block">
              <span className="field-label">Password</span>
              <PasswordInput value={form.password} onChange={update('password')} minLength={6} required />
              <span className="mt-2 block text-xs text-mist-600">At least 6 characters.</span>
            </label>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Creating account...' : 'Create account'}
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </AuthLayout>
    </>
  )
}
