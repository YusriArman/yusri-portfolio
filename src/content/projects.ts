// Projects shown in the Projects section, in this order.
// To add one: copy an entry, change every field, and put its preview image in
// /public/images/projects/<slug>/preview.jpg (4:3, at least 1600 x 1200 px).

import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'elysium',
    title: 'Elysium ticketing platform',
    context: "Taylor's University Orientation Party 2026, built with a student team.",
    summary:
      'Ticket registration and collection-slot booking for incoming freshmen. Students are verified against a university whitelist, book a physical ticket pickup slot, and join a waitlist once the 1,500 main passes are taken.',
    contribution: [
      'Built front-end features in React and TypeScript, including live capacity tracking and a real-time announcement feed on Supabase.',
      'Deployed and maintained the site on Vercel through the registration period.',
    ],
    impact: "It carried the registration rush for the university's largest orientation event, serving over 140 GB of traffic.",
    details: [
      'Front end in React, TypeScript, Vite and Tailwind CSS. I also built the merchandise, prize and sponsor showcase pages.',
      'Backend by the team on Supabase (PostgreSQL) with row-level security and RPC functions. Slot bookings use row-level locks so a slot cannot be overbooked.',
      'Collection-day flow: each physical ticket ID is bound to a verified student ID, and gate check-in flags any ticket scanned twice.',
      'Load-tested by the team with Grafana k6 before registration opened.',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Supabase', 'Vercel'],
    image: {
      src: '/images/projects/elysium/elysium-logo.png',
      alt: 'Elysium: Orientation Party 2026 logo',
      fit: 'contain',
      background: '#0e2a6b',
    },
    links: [{ label: 'Source on GitHub', href: 'https://github.com/YusriArman/op-26' }],
  },
  {
    slug: 'moneytalks',
    title: 'MoneyTalks',
    context: 'Cursor Hackathon 2025, built with a team of four.',
    summary:
      'An AI-powered personal finance prototype that analyses spending habits and automates budgeting. Users log transactions and trigger payments by voice.',
    contribution: [
      'Collaborated in a team of four to build the prototype, including AI expense categorisation and real-time spending insights.',
    ],
    details: [
      'Voice-control features for logging transactions and executing payments hands-free.',
      'AI categorisation of expenses, generating real-time insights to support budgeting decisions.',
    ],
    tech: [],
    image: null,
    links: [],
  },
]
