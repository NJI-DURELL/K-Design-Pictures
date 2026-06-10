import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import Seo from '../../components/seo/Seo'
import AuthLayout from '../../components/auth/AuthLayout'
import PasswordInput from '../../components/ui/PasswordInput'
import { useAuth } from '../../context/AuthContext'

export default function ResetPassword() {
  const { updatePassword } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    const { error } = await updatePassword(password)
    setLoading(false)
    if (error) {
      setError(error.message)
      return
    }
    setDone(true)
    setTimeout(() => navigate('/login'), 1600)
  }

  return (
    <>
      <Seo title="Set new password" noindex path="/reset-password" />
      <AuthLayout title="Set a new password" subtitle="Choose a strong password you have not used before.">
        {done ? (
          <div className="rounded-2xl glass p-8 text-center">
            <span className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-gold-500 text-ink-900">
              <Check size={26} />
            </span>
            <h2 className="mt-5 font-display text-xl text-white">Password updated</h2>
            <p className="mt-2 text-sm text-mist-400">Redirecting you to sign in.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            <label className="block">
              <span className="field-label">New password</span>
              <PasswordInput value={password} onChange={(e) => setPassword(e.target.value)} minLength={6} required />
            </label>
            <label className="block">
              <span className="field-label">Confirm password</span>
              <PasswordInput value={confirm} onChange={(e) => setConfirm(e.target.value)} minLength={6} required />
            </label>
            {error && <p className="text-sm text-red-400">{error}</p>}
            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Updating...' : 'Update password'}
              <ArrowRight size={16} />
            </button>
            <Link to="/login" className="block text-center text-sm text-mist-400 hover:text-white">
              Back to sign in
            </Link>
          </form>
        )}
      </AuthLayout>
    </>
  )
}
