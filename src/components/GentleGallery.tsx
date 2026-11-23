import { useEffect, useId, useRef, useState, type PointerEvent } from 'react'
import { motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from 'motion/react'
import type { Image } from '../content/types'
import { Lightbox } from './Lightbox'
import { imageStyle } from './imageStyle'
import './Gallery.css'
import './GentleGallery.css'

type Props = { items: Image[]; label: string; title: string; size?: 'regular' | 'compact'; treatment?: 'curved' | 'flat' }

function Photo({ photo, index, progress, selected, flat, onSelect }: {
  photo: Image; index: number; progress: MotionValue<number>; selected: boolean; flat: boolean; onSelect: () => void
}) {
  const reduced = useReducedMotion()
  const rotate = useTransform(progress, value => flat ? 0 : Math.max(-1, Math.min(1, index - value)) * 3)
  const scale = useTransform(progress, value => 1 - Math.min(1, Math.abs(index - value)) * (flat ? 0 : 0.06))
  const y = useTransform(progress, value => Math.min(1, Math.abs(index - value)) * (flat ? 0 : 12))
  return <li className="gentle-gallery__item" style={{ zIndex: selected ? 2 : 1 }}>
    <motion.div style={reduced ? undefined : { rotate, scale, y }}>
      <button type="button" className="gentle-gallery__photo" data-selected={selected}
        aria-label={`${selected ? 'Enlarge' : 'Select'} photo ${index + 1}: ${photo.alt}`}
        aria-current={selected ? 'true' : undefined} onClick={onSelect}>
        <img src={photo.src} alt="" loading="lazy" draggable={false} style={imageStyle(photo)} />
      </button>
    </motion.div>
  </li>
}

/** Native touch scrolling, with a shallow visual curve; no duplicated slides or autoplay. */
export function GentleGallery({ items, label, title, size = 'regular', treatment = 'curved' }: Props) {
  const track = useRef<HTMLUListElement>(null)
  const [selected, setSelected] = useState(0)
  const [open, setOpen] = useState<number | null>(null)
  const progress = useMotionValue(0)
  const reduced = useReducedMotion()
  const labelId = useId()
  const drag = useRef<{ x: number; y: number; left: number; moved: boolean } | null>(null)
  const suppressClick = useRef(false)
  const current = Math.min(selected, Math.max(0, items.length - 1))
  const thumb = (i: number) => track.current?.querySelectorAll<HTMLButtonElement>('.gentle-gallery__photo')[i] ?? null
  const move = (i: number, instant = false, focus = false) => {
    const el = track.current
    const index = Math.max(0, Math.min(items.length - 1, i))
    const item = el?.children[index] as HTMLElement | undefined
    if (!el || !item) return
    el.scrollTo({ left: item.offsetLeft - (el.clientWidth - item.offsetWidth) / 2, behavior: instant || reduced ? 'instant' : 'smooth' })
    if (focus) thumb(index)?.focus({ preventScroll: true })
  }

  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => {
      const first = el.children[0] as HTMLElement | undefined
      const second = el.children[1] as HTMLElement | undefined
      const stride = first && second ? second.offsetLeft - first.offsetLeft : 1
      const value = el.scrollLeft / stride
      progress.set(value)
      setSelected(Math.max(0, Math.min(items.length - 1, Math.round(value))))
    }
    const observer = new ResizeObserver(update)
    observer.observe(el)
    el.addEventListener('scroll', update, { passive: true })
    update()
    return () => { observer.disconnect(); el.removeEventListener('scroll', update) }
  }, [items.length, progress])

  const pointerMove = (event: PointerEvent<HTMLUListElement>) => {
    const start = drag.current
    if (!start) return
    const dx = event.clientX - start.x
    if (!start.moved && Math.abs(dx) > 6 && Math.abs(dx) > Math.abs(event.clientY - start.y)) {
      start.moved = true
      event.currentTarget.setPointerCapture(event.pointerId)
      event.currentTarget.dataset.dragging = 'true'
      suppressClick.current = true
    }
    if (start.moved) event.currentTarget.scrollLeft = start.left - dx
  }
  const endDrag = () => {
    const moved = drag.current?.moved
    drag.current = null
    if (track.current) delete track.current.dataset.dragging
    if (moved) move(Math.round(progress.get()))
  }

  if (!items.length) return null
  return <section className={`gentle-gallery gentle-gallery--${size}`} aria-labelledby={labelId} aria-roledescription="carousel">
    <p id={labelId} className="gallery__label">{label}</p>
    <ul ref={track} className="gentle-gallery__track" aria-label={`Photos from ${title}`}
      onKeyDown={event => {
        const target = event.key === 'ArrowRight' ? current + 1 : event.key === 'ArrowLeft' ? current - 1 : event.key === 'Home' ? 0 : event.key === 'End' ? items.length - 1 : null
        if (target !== null) { event.preventDefault(); move(target, false, true) }
      }}
      onPointerDown={event => {
        suppressClick.current = false
        if (event.pointerType === 'mouse' && event.button === 0) drag.current = { x: event.clientX, y: event.clientY, left: event.currentTarget.scrollLeft, moved: false }
      }} onPointerMove={pointerMove} onPointerUp={endDrag} onPointerCancel={endDrag}
      onClickCapture={event => { if (suppressClick.current && event.detail !== 0) { event.preventDefault(); event.stopPropagation(); suppressClick.current = false } }}>
      {items.map((photo, index) => <Photo key={photo.src} photo={photo} index={index} progress={progress}
        flat={treatment === 'flat'} selected={current === index} onSelect={() => {
          if (index === current && Math.abs(progress.get() - index) < 0.03) setOpen(index)
          else move(index)
        }} />)}
    </ul>
    <div className="gentle-gallery__footer">
      <p className="gallery__caption" aria-live="polite" aria-atomic="true">{items[current]?.caption}</p>
      <div className="gallery__controls">
        {items.length > 1 && <button className="gallery__button" type="button" disabled={current === 0} onClick={() => move(current - 1)} aria-label="Previous photo">←</button>}
        <span className="gentle-gallery__count" aria-live="polite">{current + 1} / {items.length}</span>
        {items.length > 1 && <button className="gallery__button" type="button" disabled={current === items.length - 1} onClick={() => move(current + 1)} aria-label="Next photo">→</button>}
      </div>
    </div>
    <Lightbox items={items} index={open} title={title} getThumb={thumb}
      onIndexChange={index => { move(index, true); setOpen(index) }} onClose={() => setOpen(null)} />
  </section>
}
