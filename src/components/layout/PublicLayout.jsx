import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import { useReveal } from '../../hooks/useReveal'

export default function PublicLayout() {
  const location = useLocation()
  const revealRef = useReveal()

  // Scroll to top on route change.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [location.pathname])

  return (
    <div className="relative flex min-h-screen flex-col bg-ink-900">
      <Navbar />
      {/* keyed so reveal observer re-initializes per page */}
      <main key={location.pathname} ref={revealRef} className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
