import { useEffect } from 'react'
import { X } from 'lucide-react'

/** Right-side slide-over used for create/edit forms across the admin. */
export default function Drawer({ open, onClose, title, children, footer }) {
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && onClose()
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="absolute inset-0 bg-ink-950/80 backdrop-blur-sm animate-[fade-up_0.3s_ease]" onClick={onClose} />
      <div className="absolute inset-y-0 right-0 flex w-full max-w-md flex-col bg-ink-850 shadow-card animate-fade-up">
        <header className="flex items-center justify-between border-b border-white/[0.06] px-6 py-5">
          <h2 className="font-display text-lg font-semibold text-white">{title}</h2>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-full glass" aria-label="Close">
            <X size={17} className="text-white" />
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
        {footer && <footer className="border-t border-white/[0.06] px-6 py-4">{footer}</footer>}
      </div>
    </div>
  )
}
