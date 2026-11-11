import { motion } from 'motion/react'
import { EASE_OUT } from './settings'

type RollingLinkProps = {
  href: string
  label: string
  className?: string
  /** Open in a new tab. */
  external?: boolean
}

const outgoing = { rest: { y: '0%' }, active: { y: '-100%' } }
const incoming = { rest: { y: '100%' }, active: { y: '0%' } }

/**
 * A link whose label rolls up, letter by letter, on hover or keyboard focus.
 * Screen readers get the plain label. Touch users get an ordinary link.
 */
export function RollingLink({ href, label, className = '', external = false }: RollingLinkProps) {
  const target = external ? { target: '_blank', rel: 'noreferrer' } : {}
  return (
    <motion.a className={`roll ${className}`} href={href} aria-label={label} {...target} initial="rest" animate="rest" whileHover="active" whileFocus="active">
      <span className="roll__window" aria-hidden="true">
        {[...label].map((char, i) => {
          const transition = { duration: 0.35, ease: EASE_OUT, delay: i * 0.012 }
          return (
            <span className="roll__cell" key={i}>
              <motion.span className="roll__char" variants={outgoing} transition={transition}>
                {char}
              </motion.span>
              <motion.span className="roll__char roll__char--next" variants={incoming} transition={transition}>
                {char}
              </motion.span>
            </span>
          )
        })}
      </span>
    </motion.a>
  )
}
