// Projects shown in the Projects section, in this order.
// To add one: copy an entry and change every field.
//
// Screenshots: put the original file in photo-originals/projects/<slug>/ and run
// `npm run photos`. It writes an optimised copy to /public/images/projects/<slug>/preview.jpg.
// Then set:  image: { src: '/images/projects/<slug>/preview.jpg', alt: 'Describe the screenshot' },
//
// Each card shows: summary, the problem (optional), what you did, the outcome (optional).
// Leave `problem` or `outcome` out when you have nothing verified to say.

import type { Project } from './types'

export const projects: Project[] = [
  {
    slug: 'elysium',
    title: 'Elysium ticketing platform',
    context: "Taylor's University Orientation Party 2026, built with a student team.",
    summary: 'Ticket registration and collection-slot booking for incoming freshmen.',
    problem:
      'Registration opens to a rush of freshmen for 1,500 main passes. The platform had to hold that cap, admit only students on the university whitelist, and stop duplicate tickets.',
    contribution: [
      'Built front-end features in React and TypeScript, including live capacity tracking and a real-time announcement feed on Supabase.',
      'Deployed and maintained the site on Vercel through the registration period.',
    ],
    outcome: "It carried registration for the university's largest orientation event and served over 140 GB of traffic.",
    details: [
      'Flow: a student is verified against the whitelist, books a physical ticket pickup slot, and joins a waitlist once the main passes are taken.',
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
      background: '#0a1517',
    },
    links: [{ label: 'Source on GitHub', href: 'https://github.com/YusriArman/op-26' }],
  },
  {
    slug: 'local-notes-companion',
    title: 'Local Notes Companion',
    context: 'Personal project, 2026.',
    summary:
      'Search, connect and pull tasks out of an Obsidian vault, with a language model that runs entirely on my own computer.',
    problem:
      'I wanted to ask questions of my own notes without sending them to a cloud AI service, and get answers I could check against the source.',
    contribution: [
      'Built the whole app: a Python and FastAPI backend, a React and TypeScript front end, and local models served through Ollama.',
      'Answers come only from the notes, each claim tied to the passage it came from, and the model declines when the notes do not contain the answer.',
    ],
    details: [
      'Search by exact words (SQLite FTS5), by meaning (local embeddings) or both, combined with reciprocal rank fusion.',
      'Everything lives in one SQLite file. Rescans hash each note, so only edited, new or deleted notes are processed again.',
      'Shows links, backlinks, broken links and similar notes that are not linked yet.',
      'Finds every checkbox in the vault, plus tasks the model spots in the writing, which wait for me to accept or reject them.',
      'The vault is only ever read. Backend and UI tests run against a stand-in model, with a separate evaluation against the real one.',
    ],
    tech: ['Python', 'FastAPI', 'SQLite', 'Ollama', 'React', 'TypeScript'],
    image: null,
    links: [{ label: 'Source on GitHub', href: 'https://github.com/YusriArman/personal-ai-database' }],
  },
  {
    slug: 'club-treasury',
    title: 'Club Treasury Tracker',
    context: "Taylor's Agents of Tech, where I'm treasurer. In progress, 2026.",
    summary:
      "A web app for tracking a student club's money: member claims, reimbursements, event spending and the club's university-held funds.",
    problem: "Spreadsheets weren't keeping track of the club's money reliably.",
    contribution: [
      'Designing and building it in PHP and Laravel, starting from the ledger rules that keep the numbers trustworthy.',
      'The database foundation, accounts and money movements, is done. Expenses, claims and the dashboard are next.',
    ],
    details: [
      'Money is stored as whole sen (RM 84.40 is 8440), never as decimals, so totals never drift.',
      'Balances are never stored. A balance is always the sum of the movements on an account.',
      'Posted entries are never edited. A mistake is corrected with a reversing entry, so there is always an audit trail.',
      "Spending and money movement are separate records, so repaying a member's claim never counts the same expense twice.",
      'Tested with PHPUnit against MySQL, with static analysis from PHPStan (Larastan) and formatting by Pint.',
    ],
    tech: ['PHP', 'Laravel', 'MySQL', 'PHPUnit'],
    image: null,
    links: [{ label: 'Source on GitHub', href: 'https://github.com/YusriArman/club-treasury' }],
  },
]
