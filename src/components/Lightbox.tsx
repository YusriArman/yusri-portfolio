import { useEffect, useRef } from 'react'
import type { KeyboardEvent, MouseEvent, TouchEvent } from 'react'
import type { Image } from '../content/types'
import './Lightbox.css'

type LightboxProps = {
  items: Image[]
  /** Which photo is open, or null when closed. */
  index: number | null
  title: string
  onIndexChange: (index: number) => void
  onClose: () => void
}

/**
 * Enlarged photo viewer shown over the page.
 * Close: the Close button, Escape, or a click outside the photo.
 * Move: the previous/next buttons, the left/right arrow keys, or a swipe.
 */
export function Lightbox({ items, index, title, onIndexChange, onClose }: LightboxProps) {
  const dialog = useRef<HTMLDialogElement>(null)
  const touchStartX = useRef<number | null>(null)
  const isOpen = index !== null

  useEffect(() => {
    const el = dialog.current
    if (!el) return
    if (isOpen && !el.open) el.showModal()
    else if (!isOpen && el.open) el.close()
  }, [isOpen])

  const step = (direction: 1 | -1) => {
    if (index === null) return
    onIndexChange((index + direction + items.length) % items.length)
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

  const onClick = (event: MouseEvent) => {
    // A click anywhere except the photo or the controls closes the viewer.
    if (!(event.target as HTMLElement).closest('[data-keep-open]')) onClose()
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
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={onClick}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {photo && index !== null && (
        <div className="lightbox__inner">
          <div className="lightbox__bar" data-keep-open>
            <p className="lightbox__count" aria-live="polite">
              Photo {index + 1} of {items.length}
            </p>
            <button type="button" className="lightbox__close" onClick={onClose}>
              Close
            </button>
          </div>

          <figure className="lightbox__figure">
            <img className="lightbox__img" src={photo.src} alt={photo.alt} data-keep-open />
          </figure>

          <div className="lightbox__controls" data-keep-open>
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
