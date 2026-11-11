import type { ReactNode } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { DURATION, EASE_OUT, IN_VIEW_ONCE } from './settings'

type RevealProps = {
  children: ReactNode
  className?: string
  /** Corner radius of the thing being revealed, in pixels. */
  radius?: number
  /** Seconds to wait before starting. */
  delay?: number
  /** Play on page load instead of waiting until it scrolls into view. */
  immediate?: boolean
}

/**
 * Image reveal: the frame opens upward like a curtain while its contents settle
 * from slightly enlarged. Plays once. With reduced motion it is a plain fade.
 */
export function Reveal({ children, className = '', radius = 28, delay = 0, immediate = false }: RevealProps) {
  const reduced = useReducedMotion()

  const frame = reduced
    ? {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: DURATION.quick, delay } },
      }
    : {
        hidden: { clipPath: `inset(100% 0% 0% 0% round ${radius}px)` },
        show: {
          clipPath: `inset(0% 0% 0% 0% round ${radius}px)`,
          transition: { duration: DURATION.slow, ease: EASE_OUT, delay },
          // Remove the clip afterwards so focus rings are not cut off.
          transitionEnd: { clipPath: 'none' },
        },
      }

  const contents = reduced
    ? { hidden: {}, show: {} }
    : {
        hidden: { scale: 1.14 },
        show: { scale: 1, transition: { duration: DURATION.slow * 1.3, ease: EASE_OUT, delay } },
      }

  const trigger = immediate ? { animate: 'show' } : { whileInView: 'show', viewport: IN_VIEW_ONCE }

  // The outer element is what gets watched for entering the view. It must stay
  // unclipped, because a fully clipped element never counts as "in view".
  return (
    <motion.div className={`reveal ${className}`} initial="hidden" {...trigger}>
      <motion.div className="reveal__frame" variants={frame}>
        <motion.div className="reveal__inner" variants={contents}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
