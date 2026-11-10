import { useRef, useState } from 'react'
import type { Image } from '../content/types'
import { PhotoSlot, usePhotoPlanning } from '../dev/photoPlanning'
import { imageStyle } from './imageStyle'
import { Lightbox } from './Lightbox'
import './Gallery.css'

/**
 * A horizontal strip of photos. Swipe on touch, Tab through on keyboard, or use the
 * arrow buttons. Selecting a photo enlarges it within the page.
 */
export function Gallery({ items, title, slug }: { items: Image[]; title: string; slug: string }) {
  const track = useRef<HTMLUListElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const planning = usePhotoPlanning()

  const scrollBy = (direction: 1 | -1) => {
    const el = track.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth' })
  }

  const showSlots = items.length === 0 && planning
  if (items.length === 0 && !showSlots) return null

  return (
    <div className="gallery">
      <div className="gallery__bar">
        <p className="gallery__label">Photos</p>
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
          ? [1, 2, 3, 4].map((n) => (
              <li className="gallery__item" key={n}>
                <PhotoSlot kind="eventGallery" number={n} folder={`events/${slug}/gallery`} />
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
        <Lightbox items={items} index={openIndex} title={title} onIndexChange={setOpenIndex} onClose={() => setOpenIndex(null)} />
      )}
    </div>
  )
}
