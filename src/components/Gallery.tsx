import { useEffect, useRef, useState } from 'react'
import type { Image } from '../content/types'
import { PhotoSlot, usePhotoPlanning } from '../dev/photoPlanning'
import type { SlotKind } from '../dev/photoPlanning'
import { imageStyle } from './imageStyle'
import { Lightbox } from './Lightbox'
import './Gallery.css'

type GalleryProps = {
  /** Photographs, shown in this order. */
  items: Image[]
  /** Short visible label above the strip. */
  label: string
  /** Completes the screen-reader label "Photos from ...". */
  title: string
  /** "compact" shows smaller photographs. */
  size?: 'regular' | 'compact'
  /** Where the placeholders point while photographs are missing (local preview only). */
  slot: { kind: SlotKind; folder: string; count: number }
}

/**
 * The one photo gallery used across the site: the introduction, leadership and each event.
 *
 * A horizontal strip that always shows part of the next photograph. Browse by swiping,
 * scrolling sideways, the arrow buttons, or the Tab key. Selecting a photograph enlarges
 * it within the page. It never moves on its own.
 */
export function Gallery({ items, label, title, size = 'regular', slot }: GalleryProps) {
  const track = useRef<HTMLUListElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const planning = usePhotoPlanning()

  const thumb = (index: number) => track.current?.querySelectorAll<HTMLElement>('.gallery__media')[index] ?? null

  const scrollBy = (direction: 1 | -1) => {
    const el = track.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth' })
  }

  // Keep the strip on the photograph being viewed, so closing returns to the right place.
  useEffect(() => {
    if (openIndex === null) return
    const el = thumb(openIndex)
    const strip = track.current
    if (!el || !strip) return
    const photo = el.getBoundingClientRect()
    const bounds = strip.getBoundingClientRect()
    if (photo.left < bounds.left || photo.right > bounds.right) {
      strip.scrollBy({ left: photo.left - bounds.left, behavior: 'auto' })
    }
  }, [openIndex])

  const showSlots = items.length === 0 && planning
  if (items.length === 0 && !showSlots) return null

  return (
    <div className={`gallery gallery--${size}`}>
      <div className="gallery__bar">
        <p className="gallery__label">{label}</p>
        <div className="gallery__controls">
          <button type="button" className="gallery__button" onClick={() => scrollBy(-1)} aria-label="Scroll photos left">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
          <button type="button" className="gallery__button" onClick={() => scrollBy(1)} aria-label="Scroll photos right">
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="m7.5 4 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>
        </div>
      </div>

      <ul className="gallery__track" ref={track} aria-label={`Photos from ${title}`}>
        {showSlots
          ? Array.from({ length: slot.count }, (_, i) => (
              <li className="gallery__item" key={i}>
                <PhotoSlot kind={slot.kind} number={i + 1} folder={slot.folder} />
              </li>
            ))
          : items.map((photo, i) => (
              <li className="gallery__item" key={photo.src}>
                <button
                  type="button"
                  className="media gallery__media"
                  onClick={() => setOpenIndex(i)}
                  aria-label={`Enlarge photo ${i + 1} of ${items.length}: ${photo.alt}`}
                >
                  <img src={photo.src} alt="" loading="lazy" style={imageStyle(photo)} />
                </button>
                {photo.caption && <p className="gallery__caption">{photo.caption}</p>}
              </li>
            ))}
      </ul>

      {items.length > 0 && (
        <Lightbox
          items={items}
          index={openIndex}
          title={title}
          getThumb={thumb}
          onIndexChange={setOpenIndex}
          onClose={() => setOpenIndex(null)}
        />
      )}
    </div>
  )
}
