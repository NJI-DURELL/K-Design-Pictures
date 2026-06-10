import { MessageCircle } from 'lucide-react'
import { CONTACT } from '../../data/site'

export default function WhatsAppButton() {
  return (
    <a
      href={CONTACT.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      className="group fixed bottom-6 right-6 z-40 flex items-center gap-3 rounded-full glass px-4 py-3 shadow-card transition-all duration-500 ease-cinema hover:border-gold-500/60 hover:shadow-gold-glow"
    >
      <span className="grid h-9 w-9 place-items-center rounded-full bg-gold-500 text-ink-900">
        <MessageCircle size={18} />
      </span>
      <span className="hidden max-w-0 overflow-hidden whitespace-nowrap text-sm font-medium text-white transition-all duration-500 group-hover:max-w-[140px] sm:block">
        Chat with us
      </span>
    </a>
  )
}
