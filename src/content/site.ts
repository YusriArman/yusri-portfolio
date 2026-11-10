// Navigation and section headings.

export const site = {
  nav: [
    { label: 'Projects', href: '#projects' },
    { label: 'Events', href: '#events' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  sections: {
    projects: {
      title: 'Selected projects',
      intro: 'What I built, and which parts were mine.',
    },
    events: {
      title: 'Events I have led',
      intro: 'Student-led events where I ran the team, the sponsors or the night itself.',
    },
  },
  /** Show orange "Missing" notes for content that is not filled in yet. Set to false before publishing. */
  showMissing: true,
}
