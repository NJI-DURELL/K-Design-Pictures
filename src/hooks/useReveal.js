import { useEffect, useRef } from 'react'

/**
 * Reveals elements with the `.reveal` class as they enter the viewport.
 *
 * Robust to content that mounts AFTER the hook runs (lazy/Suspense pages) and
 * to route changes: it re-scans on every dependency change and watches the
 * container with a MutationObserver, so late-arriving `.reveal` nodes are still
 * observed. Without this, suspended page content can stay stuck at opacity 0.
 *
 * Pass the current pathname in `deps` so it re-initializes per page.
 */
export function useReveal(deps = []) {
  const ref = useRef(null)

  useEffect(() => {
    const root = ref.current
    if (!root) return

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const delay = entry.target.dataset.revealDelay
          if (delay) entry.target.style.transitionDelay = `${delay}ms`
          entry.target.classList.add('is-visible')
          io.unobserve(entry.target)
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    )

    // Observe every not-yet-handled .reveal element currently in the tree.
    const scan = () => {
      root.querySelectorAll('.reveal:not([data-revealed])').forEach((el) => {
        el.setAttribute('data-revealed', '')
        if (prefersReduced) el.classList.add('is-visible')
        else io.observe(el)
      })
    }

    scan()

    // Catch content that mounts later (e.g. when a lazy page chunk resolves).
    const mo = new MutationObserver(scan)
    mo.observe(root, { childList: true, subtree: true })

    return () => {
      io.disconnect()
      mo.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
