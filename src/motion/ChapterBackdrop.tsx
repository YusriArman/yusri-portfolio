import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'

/** How far in from each side a panel starts, as a percentage of its width. Keep it below the page gutter. */
const INSET = { full: 4, soft: 2.5 }

/**
 * The coloured panel behind a chapter. It starts slightly narrower than the page and
 * opens to full width as the chapter scrolls into view. Only this empty layer is
 * clipped, so the chapter's text, layout and focus rings are never affected.
 * It only ever opens. With reduced motion it is full width from the start.
 *
 * `soft` starts closer to full width. The strongly coloured chapters use it, so their
 * entrance matches the quieter chapters rather than overpowering them.
 */
export function ChapterBackdrop({ soft = false }: { soft?: boolean }) {
  const inset = soft ? INSET.soft : INSET.full
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // 0 when the chapter's top edge reaches the bottom of the screen, 1 when it is 60% from the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.6'] })
  // The furthest point reached so far, so scrolling back up never closes the panel.
  const furthest = useRef(0)

  const clipPath = useTransform(scrollYProgress, (value) => {
    furthest.current = Math.max(furthest.current, value)
    const side = (1 - furthest.current) * inset
    return `inset(0% ${side}% 0% ${side}% round var(--radius-chapter) var(--radius-chapter) 0 0)`
  })

  return <motion.div ref={ref} className="chapter__backdrop" aria-hidden="true" style={reduced ? undefined : { clipPath }} />
}
