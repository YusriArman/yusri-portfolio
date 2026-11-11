// Who you are and how to reach you. Edit the strings; keep the keys.

export const profile = {
  fullName: 'Muhammad Yusri Bin Arman',
  /** The two lines of the oversized hero name. */
  heroName: ['Yusri', 'Arman'],
  shortName: 'Yusri Arman',

  /** Hero paragraph. */
  intro:
    "Final-year Computer Science student at Taylor's University, specialising in AI and Data Science. I build and deploy web and AI-powered tools, and I've led the student teams and events that used them.",

  lookingFor: 'Open to internships in Computer Science, Data Science and AI.',
  /** e.g. "Available from June 2027." Set to null to leave it out. */
  availability: null as string | null,

  portrait: {
    src: '/images/profile/yusri-arman.jpg',
    alt: 'Portrait of Yusri Arman in a dark suit against a grey background',
    /** Optional: which part to keep in view if the portrait is cropped, e.g. 'center top'. */
    position: undefined as string | undefined,
  },

  /** About section. */
  about: [
    "I'm completing a Bachelor of Computer Science at Taylor's University after the American Degree Transfer Program there. Alongside the degree I've held leadership roles in student bodies, which is where most of my experience in sponsorship negotiation, project management and stakeholder engagement comes from.",
  ],
  education: [
    { title: 'Bachelor of Computer Science', place: "Taylor's University", period: '2024 to 2027', note: 'CGPA 3.57' },
    { title: 'American Degree Transfer Program', place: "Taylor's University", period: '2023 to 2024' },
  ],
  skills: [
    { group: 'Programming', items: ['C++', 'Java', 'TypeScript', 'React', 'Tailwind CSS', 'Supabase'] },
    { group: 'Working with people', items: ['Project management', 'Sponsorship negotiation', 'Public speaking', 'Social media marketing'] },
    { group: 'Tools and languages', items: ['MS Office', 'Outlook', 'Canva', 'English', 'Malay'] },
  ],

  email: 'yusri.armantan@gmail.com',
  links: [
    { label: 'GitHub', href: 'https://github.com/YusriArman' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/yusri-arman-6896622b5' },
  ],
  /** Path to a public-safe résumé PDF inside /public/resume, or null to hide the link.
      Example: '/resume/yusri-arman-resume.pdf' */
  resume: null as string | null,
}
