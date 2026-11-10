import { site } from '../content/site'
import './Missing.css'

/** A visible placeholder frame for an image that has not been supplied yet. */
export function MissingBlock({ what, aspect = '16 / 9', className = '' }: { what: string; aspect?: string; className?: string }) {
  if (!site.showMissing) return null
  return (
    <div role="note" className={`missing-block ${className}`} style={{ aspectRatio: aspect }}>
      <span>Missing: {what}</span>
    </div>
  )
}

/** An inline highlighted note for a fact that has not been supplied yet. */
export function MissingInline({ what }: { what: string }) {
  if (!site.showMissing) return null
  return <mark className="missing-inline">Missing: {what}</mark>
}

/** A list of outstanding items for one project or event. */
export function MissingList({ items }: { items?: string[] }) {
  if (!site.showMissing || !items || items.length === 0) return null
  return (
    <ul className="missing-list" aria-label="Missing content">
      {items.map((item) => (
        <li key={item}>Missing: {item}</li>
      ))}
    </ul>
  )
}
