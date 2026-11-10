import type { ProjectSlug } from './projects';

/**
 * Copy for the home page. Kept apart from `site.ts` (identity, links,
 * metadata) so the words can be rewritten without touching anything the rest
 * of the site depends on.
 */

/** A run of plain text, or a phrase that previews one of the projects. */
export type IntroPart = string | { readonly text: string; readonly project: ProjectSlug };

export const home = {
  hero: {
    /** One entry per line; the last line is set in the accent colour. */
    headline: ['I design and build', 'software people', 'actually use.'],
    /** The headline word that cycles, and what it cycles through (first = resting). */
    rotating: {
      word: 'software',
      words: ['software', 'websites', 'web apps'],
    },
    intro: [
      'I’m Ozoyah Oyakhire (Ozed), a freelance web and software developer who cares about how things work just as much as how they look. I design and build ',
      { text: 'web apps', project: 'job-finder' },
      ', ',
      { text: 'dashboards', project: 'livestock-cost-estimator' },
      ', and automations that turn ideas into practical, ',
      { text: 'polished', project: 'aquimoda-london' },
      ' and usable products.',
    ] satisfies readonly IntroPart[],
    hint: 'Hover the underlined words',
  },

  work: {
    eyebrow: 'Selected work',
    title: 'Websites and web apps I’ve built, all live and in use.',
    detailsTitle: 'The details',
    detailsHint: 'Open a project to see it running',
  },

  about: {
    eyebrow: 'About me',
    headline: 'One person. Both halves of the job.',
    body: [
      'I hold a BSc in Computer Science and have spent three years building software for clients. I started as a frontend developer and learned design because I wanted my work to look as good as it runs. Now I handle both, so you get a web designer and developer in one person, from first sketch to launch, and nothing gets lost between the mockup and the product.',
      'You talk to me directly, you see real progress in the first week, and you keep the keys when we’re done.',
    ],
  },

  stack: {
    eyebrow: 'Tech stack',
    title: 'What I build with',
  },

  contact: {
    eyebrow: 'Contact',
    headline: ['Let’s build', 'something'],
    body: 'Need a developer for your website or web app? Tell me what it is and what it’s meant to fix. If I’m the wrong person for it, I’ll tell you that too, and usually who is.',
  },
} as const;
