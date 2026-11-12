import { motion, useReducedMotion } from 'motion/react'
import { profile } from '../content/profile'
import { site } from '../content/site'
import { RollingLink } from '../motion/RollingLink'
import { DURATION, EASE_OUT } from '../motion/settings'
import './Hero.css'

// The name enters one letter at a time; the description and contact details follow.
const name = { hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } } }
const letter = { hidden: { y: '108%' }, show: { y: '0%', transition: { duration: 0.8, ease: EASE_OUT } } }

/**
 * Chapter 01, the opening: who you are, then how to reach you straight away.
 * Its anchor is #contact, so every "contact" link on the page lands here.
 */
export function Hero() {
  // With reduced motion everything in the opening is simply there from the start.
  const reduced = useReducedMotion()
  const chapter = site.chapters.opening
  const mailto = `mailto:${profile.email}`

  return (
    <section className="hero" id="contact" aria-labelledby="hero-name">
      <div className="container">
        <motion.p className="chapter-mark hero__mark" initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: DURATION.base }}>
          <span className="chapter-mark__number">{chapter.number}</span>
          {chapter.label}
        </motion.p>

        <motion.h1 className="hero__name" id="hero-name" aria-label={profile.fullName} initial={reduced ? false : 'hidden'} animate="show" variants={name}>
          {profile.heroName.map((line) => (
            <span className="hero__line" key={line} aria-hidden="true">
              {[...line].map((char, i) => (
                <motion.span className="hero__letter" key={i} variants={letter}>
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <div className="hero__row">
          <motion.div
            className="hero__intro"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT, delay: 0.5 }}
          >
            <p className="hero__lede">{profile.intro}</p>
            <p className="hero__invite">
              {profile.invitation}
              {profile.availability && ` ${profile.availability}`}
            </p>
            <div className="hero__actions">
              <a className="button" href={mailto}>
                Get in touch
              </a>
              <a className="text-link" href="#about">
                Learn about me <span aria-hidden="true">↓</span>
              </a>
            </div>
          </motion.div>

          <motion.div
            className="hero__contact"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT, delay: 0.6 }}
          >
            <p className="hero__contact-label">Email</p>
            <a className="hero__email" href={mailto}>
              {profile.email}
            </a>
            <ul className="hero__links">
              {profile.links.map((link) => (
                <li key={link.href}>
                  <RollingLink className="roll--underlined" href={link.href} label={link.label} external />
                </li>
              ))}
              {profile.resume && (
                <li>
                  <RollingLink className="roll--underlined" href={profile.resume} label="Résumé (PDF)" external />
                </li>
              )}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
