// Projects shown in the Projects section, in this order.
// To add one: copy an entry, change every field, and put its images in
// /public/images/projects/<slug>/.

import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'elysium',
    title: 'Elysium ticketing platform',
    context: "Built with a team of four for Taylor's University Orientation Party 2026.",
    summary:
      'Whitelist-verified ticket registration and collection-slot booking for incoming freshmen, covering 1,500 ticket collection slots and a 500-person waitlist.',
    contribution: [
      'Developed front-end features in React, TypeScript and Tailwind CSS, including live capacity tracking and a real-time announcement feed powered by Supabase.',
      'Built the merchandise, prize and sponsor showcase pages.',
      'Deployed and maintained the site on Vercel, which served over 140 GB of traffic during the registration period.',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    image: {
      src: '/images/projects/elysium/elysium-logo.png',
      alt: 'Elysium: Orientation Party 2026 logo',
      fit: 'contain',
      background: '#0E2A6B',
    },
    links: [
      { label: 'Source on GitHub', href: 'https://github.com/YusriArman/op-26' },
      { label: 'Live site', href: 'https://op-26-olive.vercel.app', note: 'currently offline' },
    ],
    missing: [
      'Screenshots of the live platform (home, slot picker, announcement feed, binding, gate check)',
      'Confirm waitlist size: CV says 500, README says 200 in one place',
    ],
  },
  {
    slug: 'moneytalks',
    title: 'MoneyTalks',
    context: 'Built with a team of four at the Cursor Hackathon 2025.',
    summary:
      'An AI-powered personal finance prototype that analyses spending habits and automates budgeting, with voice control for logging transactions and executing payments hands-free.',
    contribution: [
      'Collaborated on an AI pipeline that categorises expenses and generates real-time insights.',
    ],
    tech: [],
    image: null,
    links: [],
    missing: [
      'Your specific contribution (which parts you built)',
      'Technologies used',
      'Repository or demo link',
      'Screenshots or a short demo video',
    ],
  },
]
