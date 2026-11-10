// Who you are and how to reach you. Edit the strings; keep the keys.

export const profile = {
  fullName: 'Muhammad Yusri Bin Arman',
  /** The two lines of the oversized hero name. */
  heroName: ['Yusri', 'Arman'],
  shortName: 'Yusri Arman',
  title: 'Computer Science student specialising in AI and Data Science',
  university: "Taylor's University",

  intro:
    "Final-year Computer Science student at Taylor's University, specialising in AI and Data Science. I build and deploy web and AI-powered tools, and I've led the student teams and events that used them.",

  lookingFor: 'Open to internships in Computer Science, Data Science and AI.',
  /** e.g. "Available from June 2027." Set to null while unknown. */
  availability: null as string | null,
  /** e.g. "Based in Kuala Lumpur, Malaysia." Set to null while unknown. */
  location: null as string | null,

  portrait: {
    src: '/images/profile/yusri-arman.jpg',
    alt: 'Portrait of Yusri Arman in a dark suit against a grey background',
  },

  email: 'yusri.armantan@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/YusriArman' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yusri-arman-6896622b5' },
  ],

  /** Path to a public-safe résumé PDF in /public/resume, or null while missing. */
  resume: null as string | null,
}
