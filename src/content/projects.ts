import aquimodaShot from '@/images/work/aquimoda.webp';
import jobFinderShot from '@/images/work/job-finder.webp';
import livestockShot from '@/images/work/livestock-cost-estimator.webp';
import phcShot from '@/images/work/phc-workhub.webp';
import type { Project } from './types';

export const projects = [
  {
    slug: 'livestock-cost-estimator',
    title: 'Livestock Cost Estimator',
    shortTitle: 'Livestock Estimator',
    category: 'SaaS product',
    year: '2026',
    featured: true,
    href: 'https://livestock-cost-estimator.vercel.app/',
    shot: {
      src: livestockShot,
      alt: 'The LivestockIQ homepage: the headline “Make Smarter Livestock Investment Decisions” above Start Estimation and Watch Demo buttons.',
    },
    summary:
      'Cost estimation and profit prediction for poultry and cattle farmers, so an investment decision starts from numbers instead of a hunch.',
    hardPart:
      'Turning a lot of farm inputs into a flow a farmer will actually finish. The answer was a step-by-step wizard rather than one long form.',
    whatHappened:
      'Live. Farmers pick a livestock type, enter their data, review the risk and keep every estimate on a dashboard.',
    tags: ['React', 'Dashboard', 'Multi-step form'],

    lede: 'Cost estimation and profit prediction for poultry and cattle farmers, built so the decision starts from numbers rather than a hunch.',
    meta: [
      { label: 'Role', value: 'Design and build' },
      { label: 'Type', value: 'Web application' },
      { label: 'Livestock', value: 'Poultry · Cattle' },
      { label: 'Status', value: 'Live' },
    ],
    glance: [
      {
        label: 'The problem',
        value:
          'Livestock investment decisions were being made on rough guesses about feed, medical and running costs, with no clear view of the profit at the end.',
      },
      {
        label: 'What I built',
        value:
          'A four-step estimation wizard (livestock type, input data, risk assessment, review and export) and a dashboard that keeps every past estimate one click away.',
      },
      {
        label: 'What happened',
        value:
          'It is live. Splitting the inputs into steps kept each screen short enough that people get all the way to a result.',
      },
    ],
  },

  {
    slug: 'phc-workhub',
    title: 'PHC WorkHub',
    shortTitle: 'PHC WorkHub',
    category: 'Team product',
    year: '2025',
    href: 'https://www.phcworkhub.com/',
    shot: {
      src: phcShot,
      alt: 'The PHC WorkHub homepage: the headline “Free Online Document Generator for Paystubs, Invoices, W-2 Forms & More” above a template search bar.',
    },
    summary:
      'An online document generator for paystubs, invoices, W-2s, 1099s and 20+ other templates. I worked on the frontend and on testing.',
    hardPart:
      'Long, guided forms with a live PDF preview beside them, where one wrong field ends up on someone’s tax document.',
    whatHappened:
      'Live and used by freelancers and small businesses. Alongside frontend work, I wrote unit and integration tests and tested manually.',
    tags: ['Frontend', 'Unit tests', 'Integration tests'],

    lede: 'An online document generator for paystubs, invoices, W-2s, 1099s and 20+ other business templates. I was on the team as a frontend developer, and I also worked on testing.',
    meta: [
      { label: 'Role', value: 'Frontend developer & testing' },
      { label: 'Team', value: 'Part of a product team' },
      { label: 'Testing', value: 'Unit · Integration · Manual' },
      { label: 'Status', value: 'Live' },
    ],
    glance: [
      {
        label: 'The product',
        value:
          'Pick a template, fill in a guided form, review a live preview and download a finished PDF, with no document software and no blank page.',
      },
      {
        label: 'What I did',
        value:
          'Built frontend features as part of the team, and wrote unit and integration tests for the code.',
      },
      {
        label: 'How I tested',
        value:
          'Automated tests for the logic, plus manual testing across the forms and flows to catch what the automated tests could not see.',
      },
    ],
  },

  {
    slug: 'job-finder',
    title: 'JobFinder',
    shortTitle: 'JobFinder',
    category: 'Web application',
    year: '2024',
    href: 'https://job-finder-one-ebon.vercel.app/',
    shot: {
      src: jobFinderShot,
      alt: 'The JobFinder homepage: a green banner asking “Looking for a Job?” above two cards, one for developers to browse jobs and one for employers to add a job.',
    },
    summary: 'A job board with two sides: developers browse roles, employers post them.',
    hardPart:
      'Serving two kinds of user from one small app without either of them landing on screens meant for the other.',
    whatHappened: 'Browse, post and sign in, all from the same app.',
    tags: ['React', 'Job listings', 'Auth'],

    lede: 'A job board with two sides: developers browse roles, employers sign in and post them.',
    meta: [
      { label: 'Role', value: 'Design and build' },
      { label: 'Type', value: 'Web application' },
      { label: 'Users', value: 'Developers · Employers' },
      { label: 'Status', value: 'Live' },
    ],
    glance: [
      {
        label: 'The idea',
        value:
          'Keep a job board focused: one clear route for people looking for work and one for people hiring.',
      },
      {
        label: 'What I built',
        value:
          'A homepage that splits the two audiences straight away, a jobs listing with recent roles, a form for employers to add a job, and sign-in.',
      },
      {
        label: 'What I took from it',
        value:
          'Deciding who a screen is for before designing it made the rest of the app much simpler to build.',
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
