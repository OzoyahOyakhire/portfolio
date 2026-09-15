import aquimodaShot from '@/images/work/aquimoda.webp';
import type { Project } from './types';

/**
 * `as const satisfies readonly Project[]` on purpose, in that order:
 * `satisfies` alone would check the shape but widen every literal, losing the
 * `ProjectSlug` union; `as const` alone preserves literals but checks nothing.
 * Together you get full structural validation *and* slugs that `typedRoutes`
 * can use to fail the build on a broken `/work/…` link.
 */
export const projects = [
  {
    slug: 'livestock-cost-estimator',
    title: 'Livestock Cost Estimator',
    shortTitle: 'Livestock Estimator',
    category: 'Intelligent system',
    year: '2025',
    featured: true,
    summary:
      'Cost forecasting for livestock operations, replacing a spreadsheet with a cell that was just a guess.',
    hardPart:
      'Not the model. Getting anyone to trust it. A number with no visible reasoning is worse than the guess it replaced.',
    whatHappened:
      'In use. Every estimate ships with a range, and the range is the part people trust.',
    tags: ['React', 'Python', 'PostgreSQL'],

    lede: 'Cost forecasting for livestock operations — replacing a spreadsheet whose most important cell was, in the end, a guess.',
    meta: [
      { label: 'Role', value: 'All of it — design, build, deploy' },
      { label: 'Timeline', value: '14 weeks' },
      { label: 'Stack', value: 'React · Python · PostgreSQL' },
      { label: 'Status', value: 'Live and in use' },
    ],
    glance: [
      {
        label: 'The problem',
        value:
          'Seasonal cost decisions were being made off a spreadsheet with a guessed figure at the top. Everything downstream inherited that guess, and nobody could see it happening.',
      },
      {
        label: 'What I built',
        value:
          'A forecasting service with a trained model behind one endpoint, a nightly feature pipeline, and a dashboard that shows the range and the reasoning alongside the number.',
      },
      {
        label: 'What happened',
        value:
          'It is in use. The estimate ships with a confidence range, and the range turned out to be the part people actually trust.',
      },
    ],

    architecture: {
      caption: 'How it fits together',
      note: 'One server. That was a constraint before it was a decision.',
      description:
        'Architecture diagram. Farm inputs and a scheduled market feed flow into a feature store that is rebuilt nightly and backed by PostgreSQL. The feature store feeds a gradient-boosting model, which sits behind a single predict API, which serves the dashboard. An evaluation notebook reads from the model. The feature store, model, API and notebook all run inside one Python service.',
      cols: 5,
      rows: 4,
      nodes: [
        { id: 'farm', label: 'Farm inputs', sub: 'herd, feed, timeline', col: 0, row: 0 },
        { id: 'market', label: 'Market feed', sub: 'pulled on a schedule', col: 0, row: 2 },
        {
          id: 'features',
          label: 'Feature store',
          sub: 'rebuilt nightly, not on ask',
          col: 1,
          row: 1,
          tone: 'bone',
        },
        { id: 'db', label: 'PostgreSQL', sub: 'history + features', col: 1, row: 3 },
        {
          id: 'model',
          label: 'The model',
          sub: 'gradient boosting',
          col: 2,
          row: 1,
          tone: 'navy',
        },
        {
          id: 'eval',
          label: 'Eval notebook',
          sub: 'keeps me honest',
          col: 2,
          row: 3,
          tone: 'ghost',
        },
        {
          id: 'api',
          label: 'Predict API',
          sub: 'one endpoint, on purpose',
          col: 3,
          row: 1,
        },
        {
          id: 'dashboard',
          label: 'Dashboard',
          sub: 'value, range, reasoning',
          col: 4,
          row: 1,
          tone: 'bone',
        },
      ],
      edges: [
        { from: 'farm', to: 'features', elbow: 'hv' },
        { from: 'market', to: 'features', elbow: 'hv' },
        { from: 'features', to: 'model', label: 'features' },
        { from: 'model', to: 'api', label: 'value + range' },
        { from: 'api', to: 'dashboard' },
        { from: 'features', to: 'db' },
        { from: 'model', to: 'eval', dashed: true },
      ],
      boundaries: [
        {
          label: 'Python service — one box, one job',
          nodes: ['features', 'model', 'api', 'eval'],
        },
      ],
    },

    decisions: [
      {
        title: 'Boosted trees, not a neural net',
        turnedDown:
          'a deep model. There were four hundred rows. It would have memorised them and I would have believed it.',
      },
      {
        title: 'Features built nightly',
        turnedDown:
          'computing them per request. Faster to write, and the first real month of use would have ended it.',
      },
      {
        title: 'Always show the range',
        turnedDown:
          'a single clean number. It looked better. People trusted the range more, which was the whole objective.',
      },
    ],
  },

  {
    slug: 'phc-workhub',
    title: 'PHC WorkHub',
    shortTitle: 'PHC WorkHub',
    category: 'SaaS product',
    year: '2025',
    summary:
      'Document automation and subscription billing for a business drowning in manual PDFs.',
    hardPart:
      'PDF generation that stays correct under concurrency, and a billing flow that has to survive a failed webhook without double-charging anyone.',
    whatHappened: 'Replaced a process that used to eat somebody’s afternoon, every afternoon.',
    tags: ['Node', 'Payments', 'PDF pipeline'],

    lede: 'Document automation and recurring billing for a business that was generating every PDF by hand.',
    meta: [
      { label: 'Role', value: 'All of it — design, build, deploy' },
      { label: 'Timeline', value: '9 weeks' },
      { label: 'Stack', value: 'React · Node · Payment APIs' },
      { label: 'Status', value: 'In use' },
    ],
    glance: [
      {
        label: 'The problem',
        value:
          'Documents were assembled by hand, one at a time, and subscriptions were tracked in a spreadsheet beside them. Both scaled by adding afternoons.',
      },
      {
        label: 'What I built',
        value:
          'A document pipeline that generates and stores PDFs on demand, wired to a subscription layer that handles renewals, failures and retries without a human watching.',
      },
      {
        label: 'What happened',
        value:
          'The manual step is gone. The interesting work turned out to be the failure paths — what a half-finished document or a declined renewal should do.',
      },
    ],
  },

  {
    slug: 'whatsapp-ordering',
    title: 'Ordering over WhatsApp',
    shortTitle: 'WhatsApp Ordering',
    category: 'Automation',
    year: '2024',
    summary:
      'Conversational ordering for small shops that were losing sales inside missed messages.',
    hardPart:
      'What an order should do when someone stops replying halfway through. The bot was never the difficult part.',
    whatHappened:
      'An order now survives an interrupted conversation. That was the entire problem.',
    tags: ['Twilio', 'Node', 'State machine'],

    lede: 'Conversational ordering for small shops, built on the messaging app their customers already had open.',
    meta: [
      { label: 'Role', value: 'All of it — design, build, deploy' },
      { label: 'Timeline', value: '6 weeks' },
      { label: 'Stack', value: 'Node · Twilio · PostgreSQL' },
      { label: 'Status', value: 'Shipped' },
    ],
    glance: [
      {
        label: 'The problem',
        value:
          'Orders arrived as messages, phone calls and follow-ups, and the ones that needed a second reply were the ones that quietly disappeared.',
      },
      {
        label: 'What I built',
        value:
          'A two-way messaging flow backed by an explicit state machine, so every order has a known state and can be resumed from wherever it stalled.',
      },
      {
        label: 'What happened',
        value:
          'An interrupted conversation no longer loses the order. Modelling the conversation as states rather than messages was the decision that mattered.',
      },
    ],
  },

  {
    slug: 'aquimoda-london',
    title: 'Aquimoda London',
    shortTitle: 'Aquimoda London',
    category: 'Brand platform',
    year: '2025',
    href: 'https://aquimoda.vercel.app/',
    shot: {
      src: aquimodaShot,
      alt: 'The Aquimoda London homepage: an editorial hero image beside the studio name and a booking call to action.',
    },
    summary:
      'A personal styling studio that needed a site as considered as the service itself.',
    hardPart:
      'Holding a luxury feel while keeping the thing genuinely quick on a mid-range phone. Every image I added made the design worse.',
    whatHappened: 'Live, and quick on a phone — which was most of the brief.',
    tags: ['Figma', 'JavaScript', 'Performance'],

    lede: 'A personal styling and wardrobe studio that needed a site as considered as the service it was selling.',
    meta: [
      { label: 'Role', value: 'Design and build' },
      { label: 'Timeline', value: '11 weeks' },
      { label: 'Stack', value: 'Figma · HTML · CSS · JavaScript' },
      { label: 'Status', value: 'Live' },
    ],
    glance: [
      {
        label: 'The problem',
        value:
          'The in-person service was considered and unhurried; the web presence was neither, and it was where every new client formed their first impression.',
      },
      {
        label: 'What I built',
        value:
          'An editorial site with a booking flow, built to stay fast on the mid-range phones most of the traffic actually arrives on.',
      },
      {
        label: 'What happened',
        value:
          'Live. The lesson that stuck: performance is a design decision made early, not a cleanup task at the end.',
      },
    ],
  },

  {
    slug: 'spotify-rebuilt',
    title: 'Spotify, rebuilt',
    shortTitle: 'Spotify, rebuilt',
    category: 'Study — not client work',
    year: '2024',
    summary:
      'A streaming client built to find out what breaks when audio state and interface state disagree.',
    hardPart:
      'Keeping playback state and interface state in agreement across a queue, a scrubber and a route change.',
    whatHappened: 'Everything breaks. I know exactly where now, which was the point.',
    tags: ['React', 'Redux', 'Audio'],

    lede: 'A streaming client rebuilt from scratch. Not original, and originality was never the assignment.',
    meta: [
      { label: 'Role', value: 'Study — built alone' },
      { label: 'Timeline', value: '4 weeks' },
      { label: 'Stack', value: 'React · Redux · Web Audio' },
      { label: 'Status', value: 'Learning project' },
    ],
    glance: [
      {
        label: 'Why I built it',
        value:
          'I wanted to know what actually breaks when the audio element and the interface hold two different ideas of what is playing.',
      },
      {
        label: 'What I built',
        value:
          'Auth, a queue, a scrubber and playback that survives navigation — with one source of truth for playback state rather than two.',
      },
      {
        label: 'What happened',
        value:
          'Everything breaks, and now I know where. Listing it as a study rather than client work is the honest description.',
      },
    ],
  },
] as const satisfies readonly Project[];

export type ProjectSlug = (typeof projects)[number]['slug'];

export const featuredProject =
  projects.find((p) => 'featured' in p && p.featured) ?? projects[0];

export const otherProjects = projects.filter((p) => p.slug !== featuredProject.slug);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Wraps at both ends, so prev/next is never a dead control. */
export function neighbours(slug: string): { prev: Project; next: Project } {
  const i = projects.findIndex((p) => p.slug === slug);
  const last = projects.length - 1;
  return {
    prev: projects[i <= 0 ? last : i - 1]!,
    next: projects[i >= last ? 0 : i + 1]!,
  };
}
