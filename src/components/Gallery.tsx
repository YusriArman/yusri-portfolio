import { useRef } from 'react'
import type { Image } from '../content/types'
import { MissingBlock } from './Missing'
import './Gallery.css'

/** A horizontal strip of photos: swipe on touch, Tab through on keyboard, or use the buttons. */
export function Gallery({ items, title }: { items: Image[]; title: string }) {
  const track = useRef<HTMLUListElement>(null)

  const scrollBy = (direction: 1 | -1) => {
    const el = track.current
    if (!el) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    el.scrollBy({ left: direction * el.clientWidth * 0.8, behavior: reduced ? 'auto' : 'smooth' })
  }

  const hasItems = items.length > 0

  return (
    <div className="gallery">
      <div className="gallery__bar">
        <p className="gallery__label">Photos</p>
        {hasItems && (
          <div className="gallery__controls">
            <button type="button" className="gallery__button" onClick={() => scrollBy(-1)} aria-label="Scroll photos left">
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="M12.5 4 6.5 10l6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button type="button" className="gallery__button" onClick={() => scrollBy(1)} aria-label="Scroll photos right">
              <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true"><path d="m7.5 4 6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        )}
      </div>

      <ul className="gallery__track" ref={track} aria-label={`Photos from ${title}`}>
        {hasItems
          ? items.map((photo, i) => (
              <li className="gallery__item" key={photo.src}>
                <a className="media gallery__media" href={photo.src} target="_blank" rel="noreferrer" aria-label={`Open photo ${i + 1} of ${items.length}: ${photo.alt}`}>
                  <img src={photo.src} alt={photo.alt} loading="lazy" />
                </a>
                {photo.caption && <p className="gallery__caption">{photo.caption}</p>}
              </li>
            ))
          : [1, 2, 3].map((n) => (
              <li className="gallery__item" key={n}>
                <MissingBlock what={`gallery photo ${n}`} aspect="4 / 3" />
              </li>
            ))}
      </ul>
    </div>
  )
}
