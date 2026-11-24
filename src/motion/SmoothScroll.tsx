import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

const LenisContext = createContext<Lenis | null>(null)

/** The smooth scroller, or null when it is off (reduced motion, or before it starts). */
export const useLenis = () => useContext(LenisContext)

/** Clicked links glide over a set time, with the site's quick-start, soft-landing ease. */
const glide = { duration: 1.1, easing: (t: number) => 1 - Math.pow(1 - t, 4) }

/**
 * Smooth, gliding scrolling for the whole page (Lenis). It only smooths the wheel and
 * trackpad: the page still scrolls natively, so the scrollbar, keyboard, touch and
 * Motion's scroll animations all keep working. Off for people who ask for reduced motion.
 * Section links (#about, #top) glide to their target instead of jumping.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const instance = new Lenis({
      // Wheel and trackpad: the page follows your hand closely and settles fast.
      // (A fixed duration here restarts on every trackpad event and makes the page
      // keep coasting after you stop, which felt like over-scrolling.)
      lerp: 0.14,
      autoRaf: true,
    })
    setLenis(instance)

    // Section links glide there, landing below the nav like before.
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey) return
      const link = (event.target as Element).closest<HTMLAnchorElement>('a[href^="#"]')
      if (!link) return
      const hash = link.getAttribute('href')!
      if (hash === '#top' || hash === '#') {
        event.preventDefault()
        instance.scrollTo(0, glide)
        history.pushState(null, '', location.pathname + location.search)
        return
      }
      const target = document.getElementById(decodeURIComponent(hash.slice(1)))
      if (!target) return
      event.preventDefault()
      // Lenis already honours scroll-padding-top in base.css, so it lands below the nav.
      instance.scrollTo(target, glide)
      history.pushState(null, '', hash)
    }
    document.addEventListener('click', onClick)

    return () => {
      document.removeEventListener('click', onClick)
      instance.destroy()
      setLenis(null)
    }
  }, [])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}
