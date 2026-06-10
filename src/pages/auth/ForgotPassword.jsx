import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, MailCheck } from 'lucide-react'
import Seo from '../../components/seo/Seo'
import AuthLayout from '../../components/auth/AuthLayout'
import { useAuth } from '../../context/AuthContext'

export default function ForgotPassword() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const { error } = await resetPassword(email)
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setSent(true)
  }

  return (
    <>
      <Seo title="Reset password" noindex path="/forgot-password" />
      <AuthLayout
        title="Reset your password"
        subtitle="Enter your email and we will send you a secure reset link."
        footer={
          <Link to="/login" className="font-medium text-gold-400 hover:text-gold-300">
            Back to sign in
          </Link>
        }
      >
        {sent ? (
          <div className="rounded-2xl glass p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500 text-ink-900">
              <MailCheck size={24} />
            </span>
            <h2 className="mt-5 font-display text-xl text-white">Link sent</h2>
            <p className="mt-2 text-sm text-mist-400">
              If an account exists for {email}, a reset link is on its way.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="field-label">Email</span>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="field"
                placeholder="you@email.com"
              />
            </label>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Sending...' : 'Send reset link'}
              <ArrowRight size={16} />
            </button>
          </form>
        )}
      </AuthLayout>
    </>
  )
}
