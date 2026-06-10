import { useEffect, useState } from 'react'
import { Shield, User } from 'lucide-react'
import Avatar from '../../components/ui/Avatar'
import { cn, formatDate } from '../../lib/utils'
import { supabase, isSupabaseReady } from '../../lib/supabase'

const DEMO_USERS = [
  { id: '1', full_name: 'Dr Ndoumbe', email: 'dr.ndoumbe@gmail.com', role: 'admin', created_at: '2024-09-02' },
  { id: '2', full_name: 'Aline Foudjet', email: 'aline@horizonbank.cm', role: 'user', created_at: '2025-01-14' },
  { id: '3', full_name: 'Patrick Mbarga', email: 'patrick@atlascoffee.cm', role: 'user', created_at: '2025-02-20' },
  { id: '4', full_name: 'Clarisse Eyenga', email: 'clarisse@sahelsounds.com', role: 'user', created_at: '2025-03-11' },
  { id: '5', full_name: 'Jean-Paul Ndongo', email: 'jp@terrevivante.org', role: 'user', created_at: '2025-04-08' },
]

export default function AdminUsers() {
  const [users, setUsers] = useState(DEMO_USERS)

  useEffect(() => {
    if (isSupabaseReady && supabase) {
      supabase
        .from('profiles')
        .select('id, full_name, role, created_at')
        .then(({ data }) => {
          if (data?.length) setUsers(data.map((u) => ({ ...u, email: u.email ?? '' })))
        })
    }
  }, [])

  const setRole = async (id, role) => {
    setUsers((arr) => arr.map((u) => (u.id === id ? { ...u, role } : u)))
    if (isSupabaseReady && supabase) {
      await supabase.from('profiles').update({ role }).eq('id', id)
    }
  }

  return (
    <div className="space-y-6">
      <section className="rounded-[1.75rem] glass p-8">
        <h1 className="font-display text-2xl font-semibold text-white">Users</h1>
        <p className="mt-2 text-mist-400">
          View registered accounts and manage who has administrator access.
        </p>
      </section>

      <section className="rounded-[1.75rem] glass p-4 sm:p-6">
        <ul className="divide-y divide-white/[0.05]">
          {users.map((u) => (
            <li key={u.id} className="flex flex-wrap items-center gap-4 py-4">
              <Avatar name={u.full_name} size={44} />
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium text-white">{u.full_name || 'Unnamed'}</p>
                <p className="truncate text-xs text-mist-500">{u.email}</p>
              </div>
              <span className="hidden text-xs text-mist-500 sm:block">
                Joined {formatDate(u.created_at)}
              </span>
              <div className="flex items-center gap-1 rounded-full border border-white/10 p-1">
                <RoleButton active={u.role === 'user'} onClick={() => setRole(u.id, 'user')} icon={User}>
                  User
                </RoleButton>
                <RoleButton active={u.role === 'admin'} onClick={() => setRole(u.id, 'admin')} icon={Shield}>
                  Admin
                </RoleButton>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

function RoleButton({ active, onClick, icon: Icon, children }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs transition',
        active ? 'bg-gold-500 text-ink-900' : 'text-mist-400 hover:text-white'
      )}
    >
      <Icon size={13} />
      {children}
    </button>
  )
}
