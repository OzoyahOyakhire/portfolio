export const site = {
  name: 'Ozoyah Oyakhire',
  /** Short name, used only where the copy is first-person and conversational. */
  shortName: 'Ozed',
  role: 'Software Developer',
  studio: 'Crafts and Code Studio',
  url: 'https://ozoyah.dev',
  location: 'Nigeria — works remotely',
  email: 'justiceoyakhire27@gmail.com',
  whatsapp: 'https://wa.link/tlxlma',

  description:
    'Software developer building web platforms, automation and systems with a model inside. Design and engineering from the same pair of hands.',

  hero: {
    eyebrow: 'Software developer',
    headline: ['I build the software', 'businesses actually', 'run on.'],
    lede: 'Web Application, automation that removes real work, and systems with a model inside. Design and engineering from the same pair of hands, which is usually why the two agree with each other.',
    capabilities: ['Web Application', 'Automation', 'Intelligent systems', 'Product design'],
    recentlyShipped: ['Livestock Cost Estimator', 'PHC WorkHub', 'Aquimoda London'],
  },

  /** The living panel. Edit these four lines and the hero is current again. */
  status: {
    available: 'Available — taking work',
    panel: [
      {
        label: 'Currently building',
        value: 'A retrieval layer I actually understand, rather than one I call.',
      },
      { label: 'Typical engagement', value: '6 to 14 weeks, concept through deployment.' },
      { label: 'Replies within', value: 'A day. Usually the same one.' },
    ],
  },

  /** Root-relative so they work from a case-study page as well as the home page. */
  nav: [
    { label: 'Work', href: '/#work' },
    { label: 'About', href: '/#about' },
    { label: 'Stack', href: '/#stack' },
    { label: 'Contact', href: '/#contact' },
  ],

  contactHref: '/#contact',

  socials: [
    { label: 'GitHub', href: 'https://github.com/OzoyahOyakhire' },
    { label: 'LinkedIn', href: 'https://linkedin.com/in/oyakhire-justice-888a4b344' },
    { label: 'X', href: 'https://twitter.com/heyOzed' },
  ],

  cta: {
    eyebrow: 'Start something',
    headline: ['Got something', 'you want built?'],
    body: 'Tell me what it is and what it is meant to fix. If I am the wrong person for it, I will tell you that too — and usually who is.',
    note: 'Replies within a day',
  },

  footer: {
    blurb:
      'Software developer working as Crafts and Code Studio. Design and engineering for founders and small teams, from Nigeria, remotely.',
    available: 'Available for work',
    colophon: 'Built by the person whose name is on it.',
  },
} as const;
