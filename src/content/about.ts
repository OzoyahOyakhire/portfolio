export const about = {
  eyebrow: 'About',
  caption: 'One person, both halves of the job',
  headline: 'Design and engineering, from the same pair of hands.',

  body: [
    'I’m Ozoyah (Ozed). I started in design, because I wanted things to look right. Then I learned to build them, and looking right stopped being enough — the moment something broke I had no idea why.',
    'So I went down a layer. Then another. Now I take a product from the first sketch to the thing running in production, and I understand every step in between — mostly because I have been stuck on all of them.',
    'I work as Crafts and Code Studio, but there is no “we”. It is me. That is usually the point — you talk to the person writing the code, and nothing gets lost between the brief and the build.',
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
    { value: '5', label: 'products shipped and in use', note: 'all five are on this site' },
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
