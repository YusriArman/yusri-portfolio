import { useRef } from 'react'
import type { ReactNode } from 'react'
import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from 'motion/react'

/**
 * Expanding photograph: as it scrolls into view the frame widens from an inset
 * window to full size and its contents settle. It follows ordinary scrolling
 * (nothing is pinned or intercepted) and only ever expands, so scrolling back
 * up does not replay it. With reduced motion it is shown at full size.
 */
export function ScrollExpand({ children, className = '', radius = 28 }: { children: ReactNode; className?: string; radius?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  // 0 when the top edge reaches the bottom of the screen, 1 when it is 30% from the top.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] })
  const furthest = useMotionValue(0)
  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    if (value > furthest.get()) furthest.set(value)
  })

  const clipPath = useTransform(furthest, [0, 1], [`inset(9% 12% 9% 12% round ${radius}px)`, `inset(0% 0% 0% 0% round ${radius}px)`])
  const scale = useTransform(furthest, [0, 1], [1.16, 1])

  return (
    <motion.div ref={ref} className={`scroll-expand ${className}`} style={reduced ? undefined : { clipPath }}>
      <motion.div className="scroll-expand__inner" style={reduced ? undefined : { scale }}>
        {children}
      </motion.div>
    </motion.div>
  )
}
