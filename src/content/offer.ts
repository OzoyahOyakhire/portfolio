import type { ProjectSlug } from './projects';

/**
 * The Services page (/services). Each service is named the way clients search
 * for it ("website design and development", "web app development"…), and
 * points at the real project that shows it, where there is one.
 *
 * Kept apart from the older `services.ts`, which belongs to the previous
 * design's components.
 */
export interface Service {
  /** Anchor on the page, e.g. /services#web-apps. */
  readonly id: string;
  readonly title: string;
  readonly summary: string;
  readonly includes: readonly string[];
  readonly tools: readonly string[];
  readonly example?: { readonly project: ProjectSlug; readonly note: string };
}

export const offer = {
  meta: {
    title: 'Web Development Services in Nigeria',
    description:
      'Website design and development, web app development, dashboards and business automation, by a freelance developer in Nigeria working remotely worldwide.',
  },

  eyebrow: 'Services',
  headline: 'Websites, web apps and dashboards, designed and built by one developer.',
  intro:
    'I’m a freelance web and software developer in Nigeria, working remotely with founders, startups and small businesses anywhere. You brief me, I design it, build it, launch it and hand you the keys. These are the four things I do most.',

  services: [
    {
      id: 'websites',
      title: 'Website design and development',
      summary:
        'Websites for small businesses, studios and personal brands that look considered and still load fast on the phones most visitors actually use. Designed in Figma first, then built and launched.',
      includes: [
        'Design in Figma, then a responsive build',
        'Booking and contact flows',
        'Performance and SEO basics from day one',
        'Hosting, domain and launch',
      ],
      tools: ['Figma', 'Next.js', 'JavaScript', 'Vercel'],
      example: {
        project: 'aquimoda-london',
        note: 'a booking website for a London styling studio',
      },
    },
    {
      id: 'web-apps',
      title: 'Web app development',
      summary:
        'Custom web applications with React and Next.js: accounts and sign-in, long guided forms, listings and the admin screens behind them. Good for an MVP that has to work for real users from the first week.',
      includes: [
        'MVPs for startups',
        'Auth, user roles and sessions',
        'Forms, validation and PDF output',
        'Unit and integration tests',
      ],
      tools: ['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL'],
      example: {
        project: 'phc-workhub',
        note: 'a document generator web app for paystubs, invoices and tax forms',
      },
    },
    {
      id: 'dashboards',
      title: 'Dashboard development',
      summary:
        'Dashboards and internal tools that turn a pile of inputs into a number someone can act on: estimates, forecasts and reports that people finish using rather than abandon.',
      includes: [
        'Data entry broken into short, finishable steps',
        'Charts, tables and saved history',
        'Exports and printable reports',
        'Role-based access for teams',
      ],
      tools: ['React', 'TypeScript', 'Node.js', 'Python'],
      example: {
        project: 'livestock-cost-estimator',
        note: 'a farm cost and profit estimator dashboard',
      },
    },
    {
      id: 'automation',
      title: 'Business automation',
      summary:
        'Work a person is doing by hand and shouldn’t be: syncing data between tools, payment and webhook flows, document pipelines, and assistants built on language models with retrieval.',
      includes: [
        'API integrations and webhooks',
        'Payment flows',
        'Document generation pipelines',
        'LLM and retrieval-based tools',
      ],
      tools: ['Node.js', 'Python', 'REST & webhooks', 'LLMs & retrieval'],
    },
  ] satisfies readonly Service[],

  process: {
    title: 'How working together goes',
    steps: [
      {
        title: 'You talk to me',
        body: 'No account manager and no handover. The person you brief is the person who writes the code.',
      },
      {
        title: 'You see it early',
        body: 'Something real in your hands in the first week, even if it’s rough. Opinions are cheaper before the code exists.',
      },
      {
        title: 'You keep the keys',
        body: 'Your repo, your accounts, your deploy, with documentation so the next developer isn’t stuck.',
      },
    ],
  },
} as const;
