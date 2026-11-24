import { useEffect, useId, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { quotes } from '../content/quotes'
import { DURATION, EASE_OUT } from '../motion/settings'
import './Bookmark.css'

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
  }

  const quote = index === null ? null : quotes[index]

  return (
    <div className="bookmark">
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
