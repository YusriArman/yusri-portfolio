import { useLayoutEffect, useRef, useState } from 'react'
import type { KeyboardEvent, MouseEvent, SyntheticEvent, TouchEvent } from 'react'
import { AnimatePresence, animate, motion, useReducedMotion } from 'motion/react'
import type { Image } from '../content/types'
import { EASE_OUT } from '../motion/settings'
import './Lightbox.css'

type LightboxProps = {
  items: Image[]
  /** Which photo is open, or null when closed. */
  index: number | null
  title: string
  /** The thumbnail for a photo, so the viewer can grow from it and shrink back to it. */
  getThumb: (index: number) => HTMLElement | null
  onIndexChange: (index: number) => void
  onClose: () => void
}

const FRAME_RADIUS = 12
const OPEN_CLIP = `inset(0px 0px 0px 0px round ${FRAME_RADIUS}px)`

/**
 * Where the enlarged photo has to sit to cover a thumbnail exactly: an offset, a scale,
 * and a clip that trims it to the thumbnail's shape.
 */
function coverThumb(frame: HTMLElement, thumb: HTMLElement | null) {
  if (!thumb) return null
  const f = frame.getBoundingClientRect()
  const t = thumb.getBoundingClientRect()
  if (!f.width || !f.height || !t.width || !t.height) return null
  const scale = Math.max(t.width / f.width, t.height / f.height)
  const trimX = Math.max(0, (f.width - t.width / scale) / 2)
  const trimY = Math.max(0, (f.height - t.height / scale) / 2)
  return {
    x: t.left + t.width / 2 - (f.left + f.width / 2),
    y: t.top + t.height / 2 - (f.top + f.height / 2),
    scale,
    clipPath: `inset(${trimY}px ${trimX}px ${trimY}px ${trimX}px round ${20 / scale}px)`,
  }
}

const slide = {
  enter: (direction: number) => ({ opacity: 0, x: direction * 48 }),
  center: { opacity: 1, x: 0 },
  exit: (direction: number) => ({ opacity: 0, x: direction * -48 }),
}

/**
 * Enlarged photo viewer shown over the page. The whole photograph is always shown.
 * It grows out of the thumbnail and shrinks back into it.
 * Close: the Close button, Escape, or a click outside the photo.
 * Move: the previous/next buttons, the left/right arrow keys, or a swipe.
 */
export function Lightbox({ items, index, title, getThumb, onIndexChange, onClose }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const touchStartX = useRef<number | null>(null)
  const closing = useRef(false)
  const [direction, setDirection] = useState(0)
  const reduced = useReducedMotion()
  const isOpen = index !== null

  const chrome = () => Array.from(dialog.current?.querySelectorAll<HTMLElement>('[data-chrome]') ?? [])

  const playOpen = async (openedAt: number) => {
    const box = frame.current
    if (!box) return
    animate(chrome(), { opacity: [0, 1] }, { duration: 0.3 })
    if (reduced) return

    box.style.opacity = '0'
    try {
      await box.querySelector('img')?.decode()
    } catch {
      // The photo could not be decoded yet; fall back to a plain fade below.
    }
    const from = coverThumb(box, getThumb(openedAt))
    box.style.opacity = '1'
    if (from) {
      animate(
        box,
        { x: [from.x, 0], y: [from.y, 0], scale: [from.scale, 1], clipPath: [from.clipPath, OPEN_CLIP] },
        { duration: 0.5, ease: EASE_OUT },
      )
    } else {
      animate(box, { opacity: [0, 1] }, { duration: 0.3 })
    }
  }

  const requestClose = async () => {
    if (closing.current) return
    closing.current = true
    const box = frame.current
    if (!reduced && box && index !== null) {
      animate(chrome(), { opacity: 0 }, { duration: 0.25 })
      const to = coverThumb(box, getThumb(index))
      if (to) await animate(box, to, { duration: 0.4, ease: EASE_OUT })
      else await animate(box, { opacity: 0 }, { duration: 0.2 })
    }
    onClose()
  }

  useLayoutEffect(() => {
    const el = dialog.current
    if (!el) return
    if (index !== null && !el.open) {
      closing.current = false
      el.showModal()
      void playOpen(index)
    } else if (index === null && el.open) {
      el.close()
    }
    // Runs only when the viewer opens or closes, not on every photo change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  const step = (by: 1 | -1) => {
    if (index === null || items.length < 2) return
    setDirection(by)
    onIndexChange((index + by + items.length) % items.length)
  }

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      step(1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      step(-1)
    }
  }

  // Escape: play the closing animation instead of vanishing.
  const onCancel = (event: SyntheticEvent) => {
    event.preventDefault()
    void requestClose()
  }

  const onClick = (event: MouseEvent) => {
    // A click anywhere except the photo or the controls closes the viewer.
    if (!(event.target as HTMLElement).closest('[data-keep-open]')) void requestClose()
  }

  const onTouchStart = (event: TouchEvent) => {
    touchStartX.current = event.touches[0].clientX
  }

  const onTouchEnd = (event: TouchEvent) => {
    if (touchStartX.current === null) return
    const distance = event.changedTouches[0].clientX - touchStartX.current
    touchStartX.current = null
    if (Math.abs(distance) > 50) step(distance < 0 ? 1 : -1)
  }

  const photo = index !== null ? items[index] : null
  const many = items.length > 1

  return (
    <dialog
      ref={dialog}
      className="lightbox"
      aria-label={`Photos from ${title}`}
      onCancel={onCancel}
      onClose={() => {
        if (index !== null) onClose()
      }}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {photo && index !== null && (
        <div className="lightbox__inner">
          <div className="lightbox__scrim" data-chrome />

          <div className="lightbox__bar" data-chrome data-keep-open>
            <p className="lightbox__count" aria-live="polite">
              Photo {index + 1} of {items.length}
            </p>
            <button type="button" className="lightbox__close" onClick={() => void requestClose()}>
              Close
            </button>
          </div>

          <figure className="lightbox__figure">
            <div className="lightbox__frame" ref={frame}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.img
                  key={photo.src}
                  className="lightbox__img"
                  src={photo.src}
                  alt={photo.alt}
                  draggable={false}
                  data-keep-open
                  custom={direction}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                />
              </AnimatePresence>
            </div>
          </figure>

          <div className="lightbox__controls" data-chrome data-keep-open>
            {many && (
              <button type="button" className="lightbox__nav" onClick={() => step(-1)} aria-label="Previous photo">
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
            <p className="lightbox__caption">{photo.caption}</p>
            {many && (
              <button type="button" className="lightbox__nav" onClick={() => step(1)} aria-label="Next photo">
                <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="m7.5 4 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            )}
          </div>
        </div>
      )}
    </dialog>
  )
}
