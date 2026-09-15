import type { NumberedItem } from './types';

export const services = {
  eyebrow: 'What I do',
  caption: 'Five things, honestly described',
  items: [
    {
      title: 'Software products',
      body: 'Custom platforms and internal tools, from first idea to production — including the unglamorous half: auth, billing, permissions, and the admin screen nobody puts in a demo.',
      tags: ['MVP', 'Platforms', 'Internal tools'],
    },
    {
      title: 'Web applications',
      body: 'React, Next.js and TypeScript, fast by default. I treat performance as a design decision made early, not a cleanup task bolted on the week before launch.',
      tags: ['React', 'Next.js', 'TypeScript'],
    },
    {
      title: 'Automation & integrations',
      body: 'Work a person is doing by hand and should not be. Document pipelines, payment flows, messaging bots — things that have to talk reliably to other things they did not choose.',
      tags: ['APIs', 'Webhooks', 'Payments'],
    },
    {
      title: 'Intelligent systems',
      body: 'Prediction and analysis where it genuinely earns its place. A model is only useful if the person reading the output can see why it said that — so that part gets designed too.',
      tags: ['Python', 'ML', 'LLMs'],
    },
    {
      title: 'Product design',
      body: 'Interface, flows, and the system underneath them. Usually drawn the same week the code is written, which is what keeps the two from quietly disagreeing.',
      tags: ['Figma', 'Design systems', 'Prototypes'],
    },
  ],
} as const satisfies { eyebrow: string; caption: string; items: readonly NumberedItem[] };
