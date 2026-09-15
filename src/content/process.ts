export const process = {
  eyebrow: 'How it goes',
  caption: 'Six to fourteen weeks, typically',
  steps: [
    {
      title: 'Discovery',
      body: 'What are we actually solving, for whom, and what happens if we do nothing. I would rather lose a week here than three later.',
    },
    {
      title: 'Shape it',
      body: 'Architecture, data model, the flows. Mostly this is where I decide what *not* to build, which is the expensive decision.',
    },
    {
      title: 'Design',
      body: 'Wireframes into real interface, in a browser as early as possible. Static mockups are optimistic about things that later turn out to be hard.',
    },
    {
      title: 'Build',
      body: 'Production code, tested where breaking would actually cost you something, deployed continuously so nothing piles up.',
    },
    {
      title: 'Ship, then keep going',
      body: 'Live, measured, improved. Written handover so you are never dependent on me being available.',
      open: true,
    },
  ],
} as const;
