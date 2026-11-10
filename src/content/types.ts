// Shapes for the content files. You rarely need to edit this file;
// edit profile.ts, projects.ts, events.ts and site.ts instead.

export type Link = {
  label: string
  href: string
  /** Optional short note shown next to the link, e.g. "currently offline". */
  note?: string
}

export type Image = {
  /** Path under /public, e.g. "/images/projects/elysium/home.png". */
  src: string
  /** Describe the image for screen readers. */
  alt: string
  caption?: string
  /** "cover" fills the frame (default). "contain" shows the whole image, e.g. a logo. */
  fit?: 'cover' | 'contain'
  /** Background behind a "contain" image. */
  background?: string
}

export type Project = {
  /** Used in the URL hash and for image folder names. Lowercase, hyphens only. */
  slug: string
  title: string
  /** One line of context: where and when it was built, with whom. */
  context: string
  /** One or two sentences on what it is. */
  summary: string
  /** What you personally did. One sentence per item. */
  contribution: string[]
  tech: string[]
  /** Preview image, or null while it is missing. */
  image: Image | null
  links: Link[]
  /** Facts you still need to add. Shown as visible "Missing" notes during development. */
  missing?: string[]
}

export type Event = {
  slug: string
  title: string
  organisation: string
  role: string
  period: string
  summary: string
  /** What you personally did. */
  contributions: string[]
  /** What happened as a result. Real numbers only. */
  outcomes: string[]
  featuredPhoto: Image | null
  gallery: Image[]
  missing?: string[]
}
