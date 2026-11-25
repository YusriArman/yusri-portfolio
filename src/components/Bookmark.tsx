import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { quotes } from '../content/quotes'
import { DURATION, EASE_OUT } from '../motion/settings'
import './Bookmark.css'

/** Remembers, for this visit only, that the bookmark has been pulled once. */
const PULLED_KEY = 'bookmark-pulled'

function wasPulled() {
  try {
    return sessionStorage.getItem(PULLED_KEY) === '1'
  } catch {
    return false
  }
}

/** A random quote index, never the same as the one just shown. */
function nextIndex(previous: number | null) {
  if (quotes.length < 2) return 0
  let index = previous
  while (index === previous) index = Math.floor(Math.random() * quotes.length)
  return index as number
}

/**
 * A ribbon bookmark hanging from the top of a chapter. Pull it (click, or Enter/Space)
 * and a card slides down with a random line from a favourite book. Pull again to put it
 * back; the next pull draws a different line. Escape also puts it back.
 */
export function Bookmark() {
  const [index, setIndex] = useState<number | null>(null)
  const [open, setOpen] = useState(false)
  const [pulled, setPulled] = useState(wasPulled)
  const reduced = useReducedMotion()
  const cardId = useId()
  const button = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        button.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  if (quotes.length === 0) return null

  const toggle = () => {
    if (!open) setIndex((previous) => nextIndex(previous))
    setOpen(!open)
    if (!pulled) {
      setPulled(true)
      try {
        sessionStorage.setItem(PULLED_KEY, '1')
      } catch {
        // Private browsing can block storage; the arrow then just returns next visit.
      }
    }
  }

  const quote = index === null ? null : quotes[index]

  return (
    <div className="bookmark">
      {/* A small hand-drawn "pull me" hint, shown until the first pull of the visit. */}
      <AnimatePresence>
        {!pulled && (
          <motion.div
            className="bookmark__hint"
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.6, duration: DURATION.base } }}
            exit={{ opacity: 0, transition: { duration: DURATION.quick } }}
          >
            <span className="bookmark__hint-text">pull me</span>
            <svg className="bookmark__hint-arrow" width="58" height="40" viewBox="0 0 58 40">
              <path d="M3 6c6 18 16 26 30 24 7-1 10-6 7-10s-9-1-7 5c2 5 9 8 21 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M47 25l8 6-9 4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        ref={button}
        type="button"
        className="bookmark__ribbon"
        data-open={open}
        aria-expanded={open}
        aria-controls={cardId}
        onClick={toggle}
      >
        <span className="sr-only">{open ? 'Put the bookmark back' : 'Pull a bookmark quote'}</span>
      </button>

      <div id={cardId} className="bookmark__slot" aria-live="polite">
        <AnimatePresence>
          {open && quote && (
            <motion.figure
              key={index}
              className="bookmark__card"
              initial={reduced ? { opacity: 0 } : { opacity: 0, y: -24, rotate: -2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, y: -16 }}
              transition={{ duration: DURATION.base, ease: EASE_OUT, delay: reduced ? 0 : 0.15 }}
            >
              <blockquote className="bookmark__quote">{quote.text}</blockquote>
              <figcaption className="bookmark__source">
                {quote.character ? `${quote.character}, ` : ''}
                <cite>{quote.book}</cite>
              </figcaption>
            </motion.figure>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
