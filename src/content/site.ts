// Navigation, chapter numbers, headings and the short sentences that connect the chapters.

export const site = {
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Events', href: '#events' },
    { label: 'Contact', href: '#contact' },
  ],
  chapters: {
    /** The opening: name, short description and contact details. Its anchor is #contact. */
    opening: {
      number: '01',
      label: 'Say hello',
    },
    about: {
      number: '02',
      label: 'Meet me',
      title: 'About me',
      galleryLabel: 'A few photographs',
    },
    projects: {
      number: '03',
      label: 'What I build',
      title: 'Selected projects',
      intro: 'What I built, and which parts were mine.',
    },
    leadership: {
      number: '04',
      label: 'How I lead',
      title: 'Leadership and community',
      intro: "Alongside the degree, I've led and served in student organisations at Taylor's since 2023.",
      galleryLabel: 'Across these organisations',
    },
    events: {
      number: '05',
      label: 'What I deliver',
      title: 'Event highlights',
      intro: "One of those roles was project-managing Taylor's University's largest orientation event. This is what delivering it involved.",
      galleryLabel: 'Photos',
    },
  },
}
