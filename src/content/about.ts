export const about = {
  eyebrow: 'About',
  caption: 'One person, both halves of the job',
  headline: 'Design and engineering, from the same pair of hands.',

  body: [
    'I’m Ozoyah, you can call me Ozed. I started as a frontend developer, building things that worked. After a while, working wasn’t enough, I wanted what I built to look as good as it ran, so I started learning design.',
    'Now the two happen together. I take a product from the first sketch to the thing running in production, and I understand every step in between mostly because I have been stuck on all of them.',
  ],

  /** Rendered with the studio name picked out in navy. */
  studioSentenceIndex: 2,

  facts: [
    { label: 'Based', value: 'Nigeria — works remotely' },
    { label: 'Works with', value: 'Founders & small teams' },
    { label: 'Handles', value: 'Design through deployment' },
    { label: 'Status', value: 'Taking work', accent: true },
  ],

  stats: [
    { value: '3', label: 'years building for clients', note: 'the first one barely counts' },
    { value: '4', label: 'projects live right now', note: 'all four are on this site' },
    { value: '2', label: 'I stopped on purpose', note: 'and can tell you exactly why' },
  ],

  howItGoes: {
    caption: 'How working together actually goes',
    items: [
      {
        title: 'You talk to me',
        body: 'No account manager, no handover. The person you brief is the person who writes it.',
      },
      {
        title: 'You see it early',
        body: 'Something real in your hands in week one, even if it is ugly. Opinions are cheaper before the code exists.',
      },
      {
        title: 'You keep the keys',
        body: 'Your repo, your accounts, your deploy. I document it so the next person is not stuck.',
      },
    ],
  },
} as const;
