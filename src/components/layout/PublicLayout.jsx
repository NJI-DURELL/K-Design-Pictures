import { Outlet, useLocation } from 'react-router-dom'
import { useEffect, Suspense } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import WhatsAppButton from './WhatsAppButton'
import Loader from '../ui/Loader'
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
      {/* keyed so reveal observer re-initializes per page; inner Suspense keeps
          the navbar/footer mounted while a page chunk loads */}
      <main key={location.pathname} ref={revealRef} className="flex-1">
        <Suspense fallback={<Loader full={false} />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
