import { useEffect } from 'react'
import { useLenis } from './SmoothScroll'
import { SNAP_SCENES } from './settings'

/** Wide screens only: on phones scenes are often taller than the screen. */
const WIDE = '(min-width: 861px)'
/** How close you must stop to a scene's start before it settles there, as a share of the screen height. */
const RANGE = 0.22
/** How long scrolling must be still before settling, in milliseconds. */
const SETTLE_AFTER = 160

/**
 * Trial: when you stop scrolling close to the start of a scene or chapter, the page
 * gently settles onto it. It only acts after you have actually stopped, and only when
 * you are already close, so it never drags you far or past where you stopped.
 * Turned off with SNAP_SCENES in settings.ts, on phones, with reduced motion (Lenis is
 * off then), and while a [data-no-snap] element such as the pinned intro is on screen.
 */
export function SceneSnap() {
  const lenis = useLenis()

  useEffect(() => {
    if (!lenis || !SNAP_SCENES) return
    const media = window.matchMedia(WIDE)

    // Elements that switch snapping off while they are on screen.
    let blockers = 0
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) blockers += entry.isIntersecting ? 1 : -1
      blockers = Math.max(0, blockers)
    })
    document.querySelectorAll('[data-no-snap]').forEach((element) => observer.observe(element))

    // Scenes carry their own marker; the other chapters snap to their top edge,
    // where their heading already sits below the nav. Measured fresh each time.
    const points = () =>
      [
        ...document.querySelectorAll<HTMLElement>('[data-snap]'),
        ...document.querySelectorAll<HTMLElement>('main > section:not(.chapter--scenes)'),
      ].map((element) => Math.round(element.getBoundingClientRect().top + window.scrollY))

    let timer = 0
    const settle = () => {
      if (lenis.isScrolling) {
        timer = window.setTimeout(settle, SETTLE_AFTER)
        return
      }
      if (!media.matches || blockers > 0 || lenis.isStopped) return
      const here = lenis.scroll
      let nearest = Infinity
      for (const point of points()) if (Math.abs(point - here) < Math.abs(nearest - here)) nearest = point
      const distance = Math.abs(nearest - here)
      if (distance > 2 && distance <= window.innerHeight * RANGE) {
        lenis.scrollTo(nearest, { duration: 0.7, easing: (t) => 1 - Math.pow(1 - t, 3) })
      }
    }

    const onScroll = () => {
      window.clearTimeout(timer)
      timer = window.setTimeout(settle, SETTLE_AFTER)
    }
    lenis.on('scroll', onScroll)

    return () => {
      lenis.off('scroll', onScroll)
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [lenis])

  return null
}
