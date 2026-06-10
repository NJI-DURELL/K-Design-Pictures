import { useEffect, useRef } from 'react'

/**
 * Reveals elements with the `.reveal` class as they enter the viewport.
 * Attach the returned ref to a container; every `.reveal` descendant animates
 * in once, with an optional stagger via `data-reveal-delay` (ms).
 */
export function useReveal({ threshold = 0.16, once = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const targets = root.matches?.('.reveal')
      ? [root, ...root.querySelectorAll('.reveal')]
      : [...root.querySelectorAll('.reveal')]

    if (!targets.length) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      targets.forEach((el) => el.classList.add('is-visible'))
      return
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.revealDelay
            if (delay) entry.target.style.transitionDelay = `${delay}ms`
            entry.target.classList.add('is-visible')
            if (once) io.unobserve(entry.target)
          } else if (!once) {
            entry.target.classList.remove('is-visible')
          }
        })
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    )

    targets.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [threshold, once])

  return ref
}
