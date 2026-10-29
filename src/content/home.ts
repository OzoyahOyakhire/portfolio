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
    intro: [
      'I’m Ozoyah Oyakhire (Ozed), a software developer who cares about how things work just as much as how they look. I design and build ',
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
    title: 'Projects that are live and in use.',
    detailsTitle: 'The details',
    detailsHint: 'Open a project to see it running',
  },

  about: {
    eyebrow: 'About me',
    headline: 'One person. Both halves of the job.',
    body: [
      'I started as a frontend developer and learned design because I wanted my work to look as good as it runs. Now I handle both, so nothing gets lost between the mockup and the product.',
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
  },
} as const;
