// Shapes for the content files. You rarely need to edit this file;
// edit profile.ts, projects.ts, leadership.ts, events.ts and site.ts instead.

export type Link = {
  label: string
  href: string
}

export type Image = {
  /** Path under /public, e.g. "/images/projects/elysium/preview.jpg". */
  src: string
  /** Describe the image for screen readers. */
  alt: string
  caption?: string
  /** "cover" fills the frame (default). "contain" shows the whole image, e.g. a logo. */
  fit?: 'cover' | 'contain'
  /** Background colour behind a "contain" image. */
  background?: string
}

export type Project = {
  /** Lowercase, hyphens only. Also the image folder name under /public/images/projects/. */
  slug: string
  title: string
  /** One line: where and when it was built, with whom. */
  context: string
  /** What it does. One or two sentences. */
  summary: string
  /** What you personally did. One or two short items. */
  contribution: string[]
  /** Why it mattered. One sentence. Leave out if you have nothing verified to say. */
  impact?: string
  /** Secondary technical detail, shown inside an expandable "More technical detail" block. */
  details?: string[]
  tech: string[]
  /** Preview image, or null to show a typographic tile instead. */
  image: Image | null
  links: Link[]
}

export type Role = {
  title: string
  /** e.g. "2024 to 2025" */
  period: string
  /** One or two substantive contributions. */
  contributions: string[]
  /** Set on exactly one role to show it first, large. */
  featured?: boolean
  /** Optional pointer to more detail elsewhere on the page, e.g. { label: 'See the event', href: '#events' }. */
  link?: Link
}

export type Organisation = {
  name: string
  roles: Role[]
}

export type Event = {
  /** Lowercase, hyphens only. Also the photo folder name under /public/images/events/. */
  slug: string
  title: string
  organisation: string
  role: string
  period: string
  /** One sentence on what the event was. */
  summary: string
  /** What you personally did. */
  contributions: string[]
  /** What happened as a result. Real facts only. */
  outcomes: string[]
  /** Optional pointer, e.g. to the project the event ran on. */
  link?: Link
  /** Large landscape photo, or null to leave it out. */
  featuredPhoto: Image | null
  /** Zero or more photos. The strip is hidden when empty. */
  gallery: Image[]
}
