import type { NumberedItem } from './types';

export const principles = {
  eyebrow: 'How I build',
  caption: 'Five rules, all learned the slow way',
  headline: 'Good software is mostly a series of decisions you never see.',
  items: [
    {
      title: 'Scalable by design',
      body: 'Architecture that behaves the same at ten users and ten thousand. Not because I expect ten thousand — because rewriting later is the expensive option.',
    },
    {
      title: 'Maintainable on purpose',
      body: 'Clear boundaries, boring patterns, and a README written for someone who has never seen the repo. That someone is often me, six months on.',
    },
    {
      title: 'Fast is a feature',
      body: 'Speed is decided when you pick the data model, not the week before launch. Everything after that point is repair work.',
    },
    {
      title: 'Built for the person using it',
      body: 'Obvious next step, honest feedback, accessible by default. The best software is invisible while you are using it.',
    },
    {
      title: 'Tied to an outcome',
      body: 'Every technical decision is a business decision in different clothes. I want to move a number you care about, not the commit count.',
    },
  ],
} as const satisfies {
  eyebrow: string;
  caption: string;
  headline: string;
  items: readonly NumberedItem[];
};
