import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { profile } from '../content/profile'
import { site } from '../content/site'
import { EASE_OUT } from '../motion/settings'
import './BootSplash.css'

const SEEN_KEY = 'portfolio-booted'

/**
 * Whether to show the boot screen: once per browser session, not when the visitor
 * opened a link to a section, and never for people who ask for reduced motion.
 */
export function shouldBoot() {
  try {
    if (sessionStorage.getItem(SEEN_KEY)) return false
  } catch {
    // Storage can be blocked; then simply show it.
  }
  if (location.hash) return false
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** How long the splash holds before lifting, in milliseconds. */
const HOLD = 2100
/** The curtain's lift. */
const LIFT = 0.9

/**
 * The game-style splash on first visit: the name rises, a progress line fills and
 * system lines type out beneath it, then the whole screen lifts like a curtain.
 * The page renders underneath the whole time. Any click, key or scroll skips ahead,
 * and it removes itself after a few seconds whatever happens.
 */
export function BootSplash({ onLift, onDone }: { onLift: () => void; onDone: () => void }) {
  const [lifting, setLifting] = useState(false)

  useEffect(() => {
    try {
      sessionStorage.setItem(SEEN_KEY, '1')
    } catch {
      // Ignore: it will just show again next time.
    }
    const lift = () => setLifting(true)
    const timer = window.setTimeout(lift, HOLD)
    // The safety net: never leave the page covered.
    const failsafe = window.setTimeout(onDone, HOLD + 1500)
    const skip = () => lift()
    window.addEventListener('pointerdown', skip)
    window.addEventListener('keydown', skip)
    window.addEventListener('wheel', skip, { passive: true })
    window.addEventListener('touchmove', skip, { passive: true })
    return () => {
      window.clearTimeout(timer)
      window.clearTimeout(failsafe)
      window.removeEventListener('pointerdown', skip)
      window.removeEventListener('keydown', skip)
      window.removeEventListener('wheel', skip)
      window.removeEventListener('touchmove', skip)
    }
  }, [onDone])

  useEffect(() => {
    if (lifting) onLift()
  }, [lifting, onLift])

  return (
    <motion.div
      className="boot"
      aria-hidden="true"
      initial={{ clipPath: 'inset(0% 0% 0% 0%)' }}
      animate={lifting ? { clipPath: 'inset(0% 0% 100% 0%)' } : undefined}
      transition={{ duration: LIFT, ease: EASE_OUT }}
      onAnimationComplete={() => lifting && onDone()}
    >
      <div className="boot__inner">
        <div className="boot__mask">
          <motion.p
            className="boot__name"
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1, ease: EASE_OUT }}
          >
            {profile.heroName.join(" ")}
          </motion.p>
        </div>
        <div className="boot__track">
          <span className="boot__fill" />
        </div>
        <div className="boot__lines">
          {site.boot.map((line, i) => (
            <p className="boot__line" key={line} style={{ animationDelay: `${0.35 + i * 0.5}s`, ['--chars' as string]: line.length }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </motion.div>
  )
}
