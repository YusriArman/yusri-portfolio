import type { ReactNode } from 'react'
import './Scene.css'

type SceneProps = {
  children: ReactNode
  className?: string
  /** Used by the snap trial later, and handy for linking to one scene. */
  id?: string
  /** Accessible name when the scene has no heading of its own. */
  label?: string
}

/**
 * One screen of a chapter, holding one idea. It is at least as tall as the screen and
 * centres its content below the nav, so the whole idea is in view at once.
 * On narrow screens it may grow taller than the screen rather than cut anything off.
 */
export function Scene({ children, className = '', id, label }: SceneProps) {
  return (
    <div className={`scene ${className}`} id={id} role={label ? 'group' : undefined} aria-label={label}>
      {/* Where snapping lines up: placed so the content lands just below the nav. */}
      <span className="scene__snap" data-snap aria-hidden="true" />
      <div className="container scene__inner">{children}</div>
    </div>
  )
}
