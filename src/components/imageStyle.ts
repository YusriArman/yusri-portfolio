import type { CSSProperties } from 'react'
import type { Image } from '../content/types'

/** Inline style for an image, from its optional `fit`, `background` and `position` settings. */
export function imageStyle(image: Image): CSSProperties | undefined {
  if (image.fit === 'contain') return { objectFit: 'contain', padding: '12%', background: image.background }
  if (image.position) return { objectPosition: image.position }
  return undefined
}
