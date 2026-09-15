export const stack = {
  eyebrow: 'The stack',
  caption: 'Grouped by what I use it for, not by how well I know it',
  groups: [
    {
      title: 'Frontend',
      items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP'],
    },
    {
      title: 'Backend',
      items: [
        'Node.js',
        'REST & webhooks',
        'PostgreSQL',
        'Auth & sessions',
        'Payment integrations',
        'Deployment',
      ],
    },
    {
      title: 'AI & data',
      items: [
        'Python',
        'Machine learning',
        'Predictive models',
        'Data pipelines',
        'LLMs & retrieval',
      ],
    },
    {
      title: 'Design',
      items: ['Figma', 'Design systems', 'Prototyping', 'Typography', 'Motion'],
    },
  ],
  learning: {
    label: 'Currently learning',
    value:
      'How retrieval actually works underneath, rather than how to call it. Ask me again in a month and this line will say something else — that is rather the point of it.',
  },
} as const;
