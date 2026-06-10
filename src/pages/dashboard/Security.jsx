import { useState } from 'react'
import { KeyRound, Mail, Check } from 'lucide-react'
import PasswordInput from '../../components/ui/PasswordInput'
import { useAuth } from '../../context/AuthContext'

export default function Security() {
  const { email, updatePassword, updateEmail, isSupabaseReady } = useAuth()

  return (
    <div className="space-y-6">
      <section className="rounded-[1.75rem] glass p-8">
        <h1 className="font-display text-2xl font-semibold text-white">Security</h1>
        <p className="mt-2 text-mist-400">Manage how you sign in and keep your account safe.</p>
      </section>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Change password */}
        <SecurityCard
          icon={KeyRound}
          title="Change password"
          desc="Use at least six characters with a mix you do not use elsewhere."
        >
          <PasswordForm onSubmit={updatePassword} disabled={!isSupabaseReady} />
        </SecurityCard>

        {/* Update email */}
        <SecurityCard icon={Mail} title="Update email" desc={`Current: ${email || 'demo mode'}`}>
          <EmailForm onSubmit={updateEmail} disabled={!isSupabaseReady} />
        </SecurityCard>
      </div>

      {!isSupabaseReady && (
        <p className="text-center text-xs text-mist-600">
          Connect Supabase to enable live account changes.
        </p>
      )}
    </div>
  )
}

function SecurityCard({ icon: Icon, title, desc, children }) {
  return (
    <section className="rounded-[1.75rem] glass p-8">
      <span className="grid h-12 w-12 place-items-center rounded-2xl border border-white/10 bg-ink-800 text-gold-400">
        <Icon size={22} strokeWidth={1.5} />
      </span>
      <h2 className="mt-5 font-display text-lg font-semibold text-white">{title}</h2>
      <p className="mt-1 text-sm text-mist-500">{desc}</p>
      <div className="mt-6">{children}</div>
    </section>
  )
}

function PasswordForm({ onSubmit, disabled }) {
  const [pw, setPw] = useState('')
  const [confirm, setConfirm] = useState('')
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    if (pw !== confirm) return setMsg('Passwords do not match.')
    const { error } = (await onSubmit(pw)) || {}
    setMsg(error ? error.message : 'Password updated.')
    if (!error) {
      setPw('')
      setConfirm('')
    }
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <PasswordInput value={pw} onChange={(e) => setPw(e.target.value)} placeholder="New password" minLength={6} required />
      <PasswordInput value={confirm} onChange={(e) => setConfirm(e.target.value)} placeholder="Confirm new password" minLength={6} required />
      <button type="submit" disabled={disabled} className="btn-primary w-full">
        Update password
      </button>
      {msg && <Msg text={msg} />}
    </form>
  )
}

function EmailForm({ onSubmit, disabled }) {
  const [email, setEmail] = useState('')
  const [msg, setMsg] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    setMsg('')
    const { error } = (await onSubmit(email)) || {}
    setMsg(error ? error.message : 'Check your inbox to confirm the new email.')
    if (!error) setEmail('')
  }

  return (
    <form onSubmit={submit} className="space-y-4">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="new@email.com"
        className="field"
        required
      />
      <button type="submit" disabled={disabled} className="btn-primary w-full">
        Update email
      </button>
      {msg && <Msg text={msg} />}
    </form>
  )
}

function Msg({ text }) {
  return (
    <p className="flex items-center gap-2 text-sm text-gold-400">
      <Check size={15} />
      {text}
    </p>
  )
}
