// Navigation, chapter numbers, headings and the short sentences that connect the chapters.

export const site = {
  nav: [
    { label: 'Projects', href: '#projects' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Events', href: '#events' },
    { label: 'About', href: '#about' },
    { label: 'Contact', href: '#contact' },
  ],
  chapters: {
    intro: {
      number: '01',
      label: 'Meet me',
      galleryLabel: 'A few photographs',
    },
    projects: {
      number: '02',
      label: 'What I build',
      title: 'Selected projects',
      intro: 'What I built, and which parts were mine.',
    },
    leadership: {
      number: '03',
      label: 'How I lead',
      title: 'Leadership and community',
      intro: "Alongside the degree, I've led and served in student organisations at Taylor's since 2023.",
      galleryLabel: 'Across these organisations',
    },
    events: {
      number: '04',
      label: 'What I deliver',
      title: 'Event highlights',
      intro: "One of those roles was project-managing Taylor's University's largest orientation event. This is what delivering it involved.",
      galleryLabel: 'Photos',
    },
    closing: {
      number: '05',
      label: "Let's talk",
      aboutTitle: 'About',
      contactTitle: 'Get in touch',
      contactIntro: "If you're hiring interns in Computer Science, Data Science or AI, I'd like to hear from you.",
    },
  },
}
