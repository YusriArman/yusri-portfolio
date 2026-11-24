import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { site } from '../content/site'
import './IntroScroll.css'

/** One word that goes from faint to full as the scroll passes its slot. */
function Word({ word, progress, start, end }: { word: string; progress: MotionValue<number>; start: number; end: number }) {
  const opacity = useTransform(progress, [start, end], [0.14, 1])
  return (
    <motion.span className="intro-scroll__word" style={{ opacity }}>
      {word}{' '}
    </motion.span>
  )
}

/**
 * "Hi, I'm Yusri": a tall section whose screen-sized panel stays in place (CSS sticky)
 * while you scroll, and the words fill in one by one. Nothing is intercepted: the page
 * scrolls normally underneath. Screen readers get the plain sentences once.
 * With reduced motion the sentences are simply shown, on a single screen.
 */
export function IntroScroll() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const lines = site.journey.intro
  // 0 when the panel pins at the top, 1 when it is about to scroll away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  const words = lines.map((line) => line.split(' '))
  const total = words.reduce((sum, line) => sum + line.length, 0)
  let index = 0
  // Words fill between 5% and 85% of the way through, leaving a pause at each end.
  const slot = (i: number) => 0.05 + (i / total) * 0.8

  return (
    <section ref={ref} className={`intro-scroll${reduced ? ' intro-scroll--still' : ''}`} aria-label="Introduction" data-no-snap>
      <div className="intro-scroll__panel">
        <div className="container">
          <p className="sr-only">{lines.join(' ')}</p>
          <div className="intro-scroll__text" aria-hidden="true">
            {words.map((line, l) => (
              <span className={`intro-scroll__line${l === 0 ? ' intro-scroll__line--hello' : ''}`} key={l}>
                {line.map((word) => {
                  const i = index++
                  return reduced ? (
                    <span className="intro-scroll__word" key={i}>
                      {word}{' '}
                    </span>
                  ) : (
                    <Word key={i} word={word} progress={scrollYProgress} start={slot(i)} end={slot(i + 1)} />
                  )
                })}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
