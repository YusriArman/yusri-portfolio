// Navigation, chapter numbers, headings and the short sentences that connect the chapters.

export const site = {
  /** The journey's opening words, filled in one word at a time as you scroll past the opening.
   *  Placeholder wording: rewrite these in your own voice. Each string is one line. */
  journey: {
    intro: [
      "Hi, I'm Yusri.",
      "I'm a Computer Science student who likes building things and bringing people together.",
      "This is where I've been so far.",
    ],
  },
  /** The lines typed out on the boot screen the first time the site opens. */
  boot: ['[Connecting to the star stream…]', '[Loading chapter 01 of 05]', '[Welcome, reader.]'],
  nav: [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Leadership', href: '#leadership' },
    { label: 'Events', href: '#events' },
    { label: 'Contact', href: '#contact' },
  ],
  /** Each chapter's small label reads as a stop on the journey. Placeholder wording to rewrite in your own voice. */
  chapters: {
    /** The opening: name, short description and contact details. Its anchor is #contact. */
    opening: {
      number: '01',
      label: 'Where it starts',
    },
    about: {
      number: '02',
      label: 'Who I am',
      title: 'About me',
      galleryLabel: 'A few photographs',
    },
    projects: {
      number: '03',
      label: "What I've built",
      title: 'Selected projects',
      intro: 'What I built, and which parts were mine.',
    },
    leadership: {
      number: '04',
      label: "Who I've led with",
      title: 'Leadership and community',
      intro: "Alongside the degree, I've led and served in student organisations at Taylor's since 2023.",
      galleryLabel: 'Across these organisations',
    },
    events: {
      number: '05',
      label: 'Nights to remember',
      title: 'Event highlights',
      intro: "One of those roles was project-managing Taylor's University's largest orientation event. This is what delivering it involved.",
      galleryLabel: 'Photos',
    },
  },
}
