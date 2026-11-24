import { useEffect, useState } from 'react'

/**
 * Which section the visitor is reading, and how far through it they are (0 to 1).
 * A section counts as current once its top passes a third of the way down the screen.
 * Adapted from the OL yearbook's hook of the same name.
 */
export function useActiveSection(ids: string[]) {
  const [state, setState] = useState({ id: ids[0], progress: 0 })

  useEffect(() => {
    let frame = 0

    const measure = () => {
      frame = 0
      const line = window.innerHeight / 3
      let current = ids[0]
      for (const id of ids) {
        const element = document.getElementById(id)
        if (element && element.getBoundingClientRect().top <= line) current = id
      }
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2
      const id = atBottom ? ids[ids.length - 1] : current

      const box = document.getElementById(id)?.getBoundingClientRect()
      const progress = atBottom ? 1 : box ? Math.min(1, Math.max(0, (line - box.top) / box.height)) : 0

      // Only re-render when something visible changes.
      setState((previous) =>
        previous.id === id && Math.abs(previous.progress - progress) < 0.005 ? previous : { id, progress },
      )
    }

    // Measure at most once per frame, however many scroll events arrive.
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure)
    }

    measure()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [ids])

  return state
}
