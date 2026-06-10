import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import Seo from '../components/seo/Seo'
import { Monogram } from '../components/brand/Logo'

export default function NotFound() {
  return (
    <>
      <Seo title="Page not found" noindex path="/404" />
      <div className="relative grid min-h-screen place-items-center overflow-hidden bg-ink-900 px-6">
        <div className="pointer-events-none absolute inset-0 bg-radial-spot" />
        <div className="relative text-center">
          <Monogram size={64} className="mx-auto" />
          <p className="mt-10 font-display text-[clamp(5rem,18vw,11rem)] font-semibold leading-none text-gold-sheen">
            404
          </p>
          <h1 className="mt-4 font-display text-2xl font-semibold text-white">
            This scene did not make the final cut
          </h1>
          <p className="mx-auto mt-3 max-w-md text-mist-400">
            The page you are looking for moved or never existed. Let us get you back to the story.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-4">
            <Link to="/" className="btn-primary">
              <Home size={16} />
              Back home
            </Link>
            <Link to="/portfolio" className="btn-ghost">
              <ArrowLeft size={16} />
              View the work
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}
