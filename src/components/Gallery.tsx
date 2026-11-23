import type { Image } from '../content/types'
import { PhotoSlot, usePhotoPlanning } from '../dev/photoPlanning'
import type { SlotKind } from '../dev/photoPlanning'
import { GentleGallery } from './GentleGallery'
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


/** Shared gallery entry point; empty development slots remain available for photo planning. */
export function Gallery({ items, label, title, size = 'regular', slot }: GalleryProps) {
  const planning = usePhotoPlanning()
  if (items.length > 0) {
    return <GentleGallery items={items} label={label} title={title} size={size} />
  }
  if (!planning) return null
  return (
    <div className={`gallery gallery--${size}`}>
      <p className="gallery__label">{label}</p>
      <ul className="gallery__track" aria-label={`Photo planning slots for ${title}`}>
        {Array.from({ length: slot.count }, (_, i) => (
          <li className="gallery__item" key={i}>
            <PhotoSlot kind={slot.kind} number={i + 1} folder={slot.folder} />
          </li>
        ))}
      </ul>
    </div>
  )
}
