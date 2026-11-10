// Photo planning mode: local preview only.
//
// Shows labelled placeholders where photographs will go, at the size they will
// appear. Everything exported from this file turns into a no-op in the
// production build (`npm run build`), so none of it reaches the published site.

import { useSyncExternalStore } from 'react'
import type { ReactElement } from 'react'
import slots from '../../photo-slots.config.json'

export type SlotKind = keyof typeof slots

type PhotoSlotProps = {
  kind: SlotKind
  /** Shown after the label, e.g. the project title. */
  name?: string
  /** Shown after the label for numbered slots, e.g. gallery photo 2. */
  number?: number
  /** Folder under photo-originals/ where the original file goes. */
  folder: string
  className?: string
}

const STORAGE_KEY = 'photo-planning'
let on = import.meta.env.DEV && localStorage.getItem(STORAGE_KEY) !== 'off'
const listeners = new Set<() => void>()

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function toggle() {
  on = !on
  localStorage.setItem(STORAGE_KEY, on ? 'on' : 'off')
  listeners.forEach((listener) => listener())
}

function usePhotoPlanningDev() {
  return useSyncExternalStore(subscribe, () => on)
}

function PhotoSlotDev({ kind, name, number, folder, className = '' }: PhotoSlotProps) {
  const spec = slots[kind]
  const label = `${spec.label}${number ? ` ${number}` : ''}${name ? `: ${name}` : ''}`
  return (
    <div className={`photo-slot ${className}`} role="note" style={{ aspectRatio: spec.ratio }}>
      <p className="photo-slot__label">{label}</p>
      <p className="photo-slot__spec">
        {spec.shape}, {spec.min}
      </p>
      <p className="photo-slot__path">
        Original goes in <code>photo-originals/{folder}/</code>
      </p>
    </div>
  )
}

function SlotBadgeDev({ kind }: { kind: SlotKind }) {
  const spec = slots[kind]
  return (
    <span className="slot-badge" role="note">
      <strong>{spec.label}</strong>
      <span>
        {spec.shape}, {spec.min}
      </span>
    </span>
  )
}

function PhotoPlanningToggleDev() {
  const planning = usePhotoPlanningDev()
  return (
    <button type="button" className="photo-planning-toggle" aria-pressed={planning} onClick={toggle}>
      Photo slots: {planning ? 'shown' : 'hidden'}
    </button>
  )
}

/** True while planning mode is on. Always false on the published site. */
export const usePhotoPlanning: () => boolean = import.meta.env.DEV ? usePhotoPlanningDev : () => false

/** A labelled placeholder for a photograph that has not been supplied. */
export const PhotoSlot: (props: PhotoSlotProps) => ReactElement | null = import.meta.env.DEV ? PhotoSlotDev : () => null

/** A small label laid over a photograph that is already in place. */
export const SlotBadge: (props: { kind: SlotKind }) => ReactElement | null = import.meta.env.DEV ? SlotBadgeDev : () => null

/** The on/off button in the corner of the local preview. */
export const PhotoPlanningToggle: () => ReactElement | null = import.meta.env.DEV ? PhotoPlanningToggleDev : () => null
