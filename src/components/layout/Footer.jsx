import { Link } from 'react-router-dom'
import { MapPin, Mail, Phone, ArrowUpRight, Instagram, Youtube, Facebook } from 'lucide-react'
import Logo from '../brand/Logo'
import { CONTACT } from '../../data/site'

const COLUMNS = [
  {
    title: 'Studio',
    links: [
      { to: '/about', label: 'About' },
      { to: '/services', label: 'Services' },
      { to: '/portfolio', label: 'Work' },
      { to: '/testimonials', label: 'Voices' },
    ],
  },
  {
    title: 'More',
    links: [
      { to: '/blog', label: 'Journal' },
      { to: '/contact', label: 'Contact' },
      { to: '/login', label: 'Client area' },
    ],
  },
]

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="relative mt-32 overflow-hidden border-t border-white/[0.06] bg-ink-950">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gold-line opacity-40" />
      <div className="shell py-20">
        <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div>
            <Logo size={44} />
            <p className="mt-6 max-w-xs text-sm leading-relaxed text-mist-400">
              An audiovisual production studio turning real stories into cinema. Based in Soa,
              Yaoundé, working across Cameroon and beyond.
            </p>
            <div className="mt-6 flex gap-3">
              {[
                { icon: Instagram, href: CONTACT.instagram, label: 'Instagram' },
                { icon: Youtube, href: CONTACT.youtube, label: 'YouTube' },
                { icon: Facebook, href: CONTACT.facebook, label: 'Facebook' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full glass transition hover:border-gold-500/50 hover:text-gold-400"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-2xs font-medium uppercase tracking-brand text-gold-500">
                {col.title}
              </h4>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.to}>
                    <Link to={link.to} className="link-reveal text-sm">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Contact */}
          <div>
            <h4 className="text-2xs font-medium uppercase tracking-brand text-gold-500">Contact</h4>
            <ul className="mt-5 space-y-4 text-sm text-mist-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-500" />
                <span>Soa, Yaoundé, Centre, Cameroon</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold-500" />
                <a href={`tel:${CONTACT.phone}`} className="link-reveal">
                  {CONTACT.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold-500" />
                <a href={`mailto:${CONTACT.email}`} className="link-reveal">
                  {CONTACT.email}
                </a>
              </li>
            </ul>
            <a
              href={CONTACT.whatsapp}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-gold-400 transition hover:text-gold-300"
            >
              Message us on WhatsApp
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>

        <div className="hairline mt-16" />
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-xs text-mist-600 sm:flex-row">
          <p>© {year} K-Design Pictures SARL. All rights reserved.</p>
          <p className="font-mono tracking-wide">Crafted in Yaoundé · Cameroon</p>
        </div>
      </div>
    </footer>
  )
}
