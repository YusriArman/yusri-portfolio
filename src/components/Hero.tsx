import { motion, useReducedMotion } from 'motion/react'
import { introGallery } from '../content/galleries'
import { profile } from '../content/profile'
import { site } from '../content/site'
import { SlotBadge, usePhotoPlanning } from '../dev/photoPlanning'
import { Reveal } from '../motion/Reveal'
import { DURATION, EASE_OUT } from '../motion/settings'
import { Gallery } from './Gallery'
import './Hero.css'

// The name enters one letter at a time; the introduction and portrait follow.
const name = { hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } } }
const letter = { hidden: { y: '108%' }, show: { y: '0%', transition: { duration: 0.8, ease: EASE_OUT } } }

export function Hero() {
  const planning = usePhotoPlanning()
  // With reduced motion everything in the introduction is simply there from the start.
  const reduced = useReducedMotion()
  const chapter = site.chapters.intro
  const showGallery = introGallery.length > 0 || planning

  return (
    <section className="hero" id="top" aria-labelledby="hero-name">
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
            <p className="hero__looking">
              {profile.lookingFor}
              {profile.availability && ` ${profile.availability}`}
            </p>
            <div className="hero__actions">
              <a className="button" href="#contact">
                Get in touch
              </a>
              <a className="text-link" href="#projects">
                See projects
              </a>
            </div>
          </motion.div>

          <Reveal className="hero__portrait-wrap" immediate delay={reduced ? 0 : 0.45}>
            <figure className="hero__portrait media">
              <img
                src={profile.portrait.src}
                alt={profile.portrait.alt}
                width={759}
                height={1065}
                fetchPriority="high"
                style={profile.portrait.position ? { objectPosition: profile.portrait.position } : undefined}
              />
              {planning && <SlotBadge kind="portrait" />}
            </figure>
          </Reveal>
        </div>

        {showGallery && (
          <motion.div
            className="hero__gallery"
            initial={reduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: DURATION.base, ease: EASE_OUT, delay: 0.8 }}
          >
            <Gallery
              items={introGallery}
              label={chapter.galleryLabel}
              title="the introduction"
              size="compact"
              slot={{ kind: 'introGallery', folder: 'introduction-gallery', count: 5 }}
            />
          </motion.div>
        )}
      </div>
    </section>
  )
}
