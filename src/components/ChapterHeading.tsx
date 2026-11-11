import { motion } from 'motion/react'
import { DURATION, EASE_OUT, IN_VIEW_ONCE } from '../motion/settings'

type ChapterHeadingProps = {
  /** e.g. "02" */
  number: string
  /** Short story label next to the number, e.g. "What I build". */
  label: string
  title: string
  intro?: string
  /** id for the heading, so the section can be labelled by it. */
  id: string
}

const group = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } }
const fade = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: DURATION.base, ease: EASE_OUT } } }
const rise = { hidden: { y: '105%' }, show: { y: '0%', transition: { duration: DURATION.slow, ease: EASE_OUT } } }

/** Chapter number, strong heading and one connecting sentence. Enters once when scrolled into view. */
export function ChapterHeading({ number, label, title, intro, id }: ChapterHeadingProps) {
  return (
    <motion.div className="section__head" initial="hidden" whileInView="show" viewport={IN_VIEW_ONCE} variants={group}>
      <motion.p className="chapter-mark" variants={fade}>
        <span className="chapter-mark__number">{number}</span>
        {label}
      </motion.p>
      <h2 className="section__title" id={id}>
        <span className="mask">
          <motion.span className="mask__inner" variants={rise}>
            {title}
          </motion.span>
        </span>
      </h2>
      {intro && (
        <motion.p className="section__intro" variants={fade}>
          {intro}
        </motion.p>
      )}
    </motion.div>
  )
}
