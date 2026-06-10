import { useState } from 'react'
import { MapPin, Mail, Phone, MessageCircle, Send, Check, Instagram, Youtube, Facebook } from 'lucide-react'
import Seo from '../components/seo/Seo'
import PageHero from '../components/ui/PageHero'
import { CONTACT } from '../data/site'
import { SERVICES } from '../data/content'
import { supabase } from '../lib/supabase'

const BUDGETS = ['Under 500k FCFA', '500k – 1.5M FCFA', '1.5M – 5M FCFA', '5M+ FCFA', 'Not sure yet']

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: '',
  })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const update = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      if (supabase) {
        const { error } = await supabase.from('contact_messages').insert([form])
        if (error) throw error
      } else {
        // Fallback when backend is not wired yet: hand off to WhatsApp.
        const text = encodeURIComponent(
          `New enquiry from ${form.name}\nService: ${form.service}\nBudget: ${form.budget}\n\n${form.message}`
        )
        window.open(`${CONTACT.whatsapp}?text=${text}`, '_blank')
      }
      setStatus('sent')
      setForm({ name: '', email: '', phone: '', service: '', budget: '', message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <>
      <Seo
        title="Contact"
        description="Start a project with K-Design Pictures. Reach the studio in Soa, Yaoundé by form, phone, email, or WhatsApp."
        path="/contact"
      />
      <PageHero
        kicker="Get in touch"
        title="Tell us what you want to make"
        intro="Share a few details and we will come back within one working day. Prefer to talk? WhatsApp is the fastest way to reach us."
      />

      <section className="shell grid gap-12 py-12 pb-28 lg:grid-cols-[1fr_400px]">
        {/* Form */}
        <form onSubmit={handleSubmit} className="rounded-[2rem] glass p-8 sm:p-10">
          <div className="grid gap-6 sm:grid-cols-2">
            <Field label="Your name">
              <input required value={form.name} onChange={update('name')} className="field" placeholder="Your name" />
            </Field>
            <Field label="Email">
              <input required type="email" value={form.email} onChange={update('email')} className="field" placeholder="[EMAIL_ADDRESS]" />
            </Field>
            <Field label="Phone">
              <input value={form.phone} onChange={update('phone')} className="field" placeholder="+237 ..." />
            </Field>
            <Field label="Service needed">
              <select required value={form.service} onChange={update('service')} className="field">
                <option value="" disabled>Select a service</option>
                {SERVICES.map((s) => (
                  <option key={s.slug} value={s.title}>{s.title}</option>
                ))}
              </select>
            </Field>
            <div className="sm:col-span-2">
              <Field label="Budget">
                <div className="flex flex-wrap gap-2">
                  {BUDGETS.map((b) => (
                    <button
                      type="button"
                      key={b}
                      onClick={() => setForm((f) => ({ ...f, budget: b }))}
                      className={`rounded-full border px-4 py-2 text-sm transition ${form.budget === b
                        ? 'border-gold-500 bg-gold-500/10 text-gold-300'
                        : 'border-white/10 text-mist-400 hover:border-white/25'
                        }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </Field>
            </div>
            <div className="sm:col-span-2">
              <Field label="Tell us about the project">
                <textarea required rows={5} value={form.message} onChange={update('message')} className="field resize-none" placeholder="What are you making, when, and where?" />
              </Field>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button type="submit" disabled={status === 'sending'} className="btn-primary">
              {status === 'sent' ? (
                <>
                  <Check size={17} />
                  Sent
                </>
              ) : (
                <>
                  {status === 'sending' ? 'Sending...' : 'Send enquiry'}
                  <Send size={16} />
                </>
              )}
            </button>
            <a href={CONTACT.whatsapp} target="_blank" rel="noreferrer" className="btn-ghost">
              <MessageCircle size={16} />
              WhatsApp instead
            </a>
          </div>
          {status === 'sent' && (
            <p className="mt-4 text-sm text-gold-400">Thank you. We will be in touch within one working day.</p>
          )}
          {status === 'error' && (
            <p className="mt-4 text-sm text-red-400">Something went wrong. Please try WhatsApp or email.</p>
          )}
        </form>

        {/* Details */}
        <aside className="space-y-4">
          <div className="rounded-3xl glass p-7">
            <h3 className="font-display text-lg font-semibold text-white">Studio</h3>
            <ul className="mt-5 space-y-4 text-sm text-mist-400">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="mt-0.5 shrink-0 text-gold-500" />
                <a href={CONTACT.mapsUrl} target="_blank" rel="noreferrer" className="link-reveal">
                  {CONTACT.address}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="mt-0.5 shrink-0 text-gold-500" />
                <a href={`tel:${CONTACT.phone}`} className="link-reveal">{CONTACT.phoneDisplay}</a>
              </li>
              <li className="flex items-start gap-3">
                <Mail size={16} className="mt-0.5 shrink-0 text-gold-500" />
                <a href={`mailto:${CONTACT.email}`} className="link-reveal">{CONTACT.email}</a>
              </li>
            </ul>
          </div>

          <div className="rounded-3xl glass p-7">
            <h3 className="font-display text-lg font-semibold text-white">Follow the work</h3>
            <div className="mt-5 flex gap-3">
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
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/10 text-mist-300 transition hover:border-gold-500/50 hover:text-gold-400"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <a
            href={CONTACT.mapsUrl}
            target="_blank"
            rel="noreferrer"
            className="block overflow-hidden rounded-3xl glass"
          >
            <div
              className="flex aspect-video items-end p-5"
              style={{
                background:
                  'radial-gradient(70% 70% at 30% 20%, hsl(45 20% 16%) 0%, transparent 60%), linear-gradient(150deg, #121214 0%, #060606 100%)',
              }}
            >
              <span className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm text-white">
                <MapPin size={15} className="text-gold-500" />
                Open in Google Maps
              </span>
            </div>
          </a>
        </aside>
      </section>
    </>
  )
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {children}
    </label>
  )
}
