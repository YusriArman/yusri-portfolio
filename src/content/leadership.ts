// Leadership and community roles, grouped by organisation and shown in this order.
// Set `featured: true` on exactly one role to show it first, large.
// To add a role: copy a role object into the right organisation, or add a new organisation.

import type { Organisation } from './types'

export const leadership: Organisation[] = [
  {
    name: "Taylor's Orientation Leaders",
    roles: [
      {
        title: 'President',
        period: '2024 to 2025',
        featured: true,
        contributions: [
          "Led the student body that organises orientation events for every intake at Taylor's College and Taylor's University.",
          "Served as the main liaison to other student bodies and to other universities' student councils.",
        ],
      },
      {
        title: 'Director of Sponsorship',
        period: '2023 to 2024',
        contributions: [
          'Secured over RM480,000 in sponsorship for the year by negotiating with brands including Samsung, Gamuda and MSI.',
          'Led the Sponsorship Executive Team and Media Marketing Team to secure orientation sponsors and produce digital shoutouts for them.',
        ],
      },
      {
        title: 'Project Manager, Orientation Party 2026',
        period: '2026',
        contributions: ["Planned and delivered Taylor's University's largest orientation event."],
        link: { label: 'See the event', href: '#events' },
      },
    ],
  },
  {
    name: "Taylor's Agents of Tech",
    roles: [
      {
        title: 'Treasurer and Sponsorship',
        period: '2025 to 2026',
        contributions: [
          "Managed all sponsorship matters and oversaw the club's finances and budgeting.",
          'Maintained relationships with past sponsors including Hilti and PayNet.',
        ],
      },
    ],
  },
  {
    name: "Taylor's University Student Council",
    roles: [
      {
        title: 'Committee Member, Campus Welfare',
        period: '2024 to 2026',
        contributions: [
          'Worked with departments across the university to address and resolve student welfare concerns.',
          "Project-managed Welcome to Taylor's, an initiative to welcome, guide and answer questions from incoming students.",
        ],
      },
    ],
  },
  {
    name: "Taylor's University Student Life Centre",
    roles: [
      {
        title: 'Student Ambassador Manager',
        period: '2026',
        contributions: [
          'Managed facility bookings and quality checks, and sent weekly shift schedules to the ambassador team.',
          'Identified recurring operational issues, such as missing or damaged game equipment, and reported them to SLC staff.',
        ],
      },
    ],
  },
]
