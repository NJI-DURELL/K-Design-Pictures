import { useState } from 'react'
import { Bell, Film, MessageSquare, Megaphone, Check } from 'lucide-react'
import { cn } from '../../lib/utils'

const SEED = [
  {
    id: 1,
    icon: Film,
    title: 'New project published',
    body: 'Horizon Bank, A Year in Motion is now live in the portfolio.',
    time: '2 hours ago',
    read: false,
  },
  {
    id: 2,
    icon: MessageSquare,
    title: 'The studio replied',
    body: 'Thanks for your enquiry. We will be in touch within one working day.',
    time: 'Yesterday',
    read: false,
  },
  {
    id: 3,
    icon: Megaphone,
    title: 'New journal entry',
    body: 'What it really takes to shoot a music video in one take.',
    time: '3 days ago',
    read: true,
  },
]

export default function Notifications() {
  const [items, setItems] = useState(SEED)
  const unread = items.filter((i) => !i.read).length

  const markAll = () => setItems((arr) => arr.map((i) => ({ ...i, read: true })))
  const toggle = (id) =>
    setItems((arr) => arr.map((i) => (i.id === id ? { ...i, read: true } : i)))

  return (
    <div className="space-y-6">
      <section className="flex items-center justify-between rounded-[1.75rem] glass p-8">
        <div>
          <h1 className="font-display text-2xl font-semibold text-white">Notifications</h1>
          <p className="mt-2 text-mist-400">
            {unread > 0 ? `You have ${unread} unread` : 'You are all caught up'}.
          </p>
        </div>
        {unread > 0 && (
          <button onClick={markAll} className="btn-ghost !py-2.5 text-sm">
            <Check size={15} />
            Mark all read
          </button>
        )}
      </section>

      <section className="space-y-3">
        {items.map((n) => (
          <button
            key={n.id}
            onClick={() => toggle(n.id)}
            className={cn(
              'flex w-full items-start gap-4 rounded-2xl glass p-5 text-left transition-all duration-300 hover:border-gold-500/20',
              !n.read && 'border-gold-500/20'
            )}
          >
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-white/10 bg-ink-800 text-gold-400">
              <n.icon size={19} strokeWidth={1.6} />
            </span>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="font-medium text-white">{n.title}</p>
                {!n.read && <span className="h-2 w-2 rounded-full bg-gold-500" />}
              </div>
              <p className="mt-1 text-sm text-mist-400">{n.body}</p>
              <p className="mt-2 text-2xs text-mist-600">{n.time}</p>
            </div>
          </button>
        ))}
      </section>
    </div>
  )
}
