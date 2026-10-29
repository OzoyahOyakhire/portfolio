import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight } from '@/components/icons';
import { Band } from '@/components/primitives/band';
import { ArchitectureFigure } from '@/components/work/architecture-figure';
import { ProjectSketch } from '@/components/work/sketches';
import { getProject, neighbours, projects } from '@/content/projects';
import { site } from '@/content/site';
import { stagger } from '@/lib/stagger';

type Params = { slug: string };

/** Any slug not returned below 404s without the page ever running. */
export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return projects.map((project) => ({ slug: project.slug }));
}

// Next 15: `params` is a Promise and must be awaited, here and in the page.
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: 'article',
      title: `${project.title} — ${site.name}`,
      description: project.summary,
      url: `/work/${project.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const project = getProject(slug);
  // `notFound()` returns `never`, which is also what narrows `project` below.
  if (!project) notFound();

  const index = projects.findIndex((p) => p.slug === project.slug);
  const { prev, next } = neighbours(project.slug);

  return (
    <article aria-labelledby="case-title">
      <Band as="div" innerClassName="pt-10 pb-12 md:pt-12">
        <div className="flex items-baseline justify-between border-b-2 border-fg pb-3.5">
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 label text-muted hover:text-fg"
          >
            <ArrowLeft width={12} height={12} /> All work
          </Link>
          <span className="label text-muted">
            Case study {String(index + 1).padStart(2, '0')} of{' '}
            {String(projects.length).padStart(2, '0')}
          </span>
        </div>

        <header className="mt-10">
          <p className="label text-accent">
            {project.category} — {project.year}
          </p>
          <h1
            id="case-title"
            className="mt-4 font-display text-[clamp(2.1rem,1.1rem+3.6vw,4rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-balance"
          >
            {project.title}
          </h1>
          <p className="mt-5 max-w-[58ch] text-[1.15rem] leading-relaxed text-muted md:text-[1.3rem]">
            {project.lede}
          </p>
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 border-b border-accent pb-1 label text-accent"
            >
              Visit the live site <ArrowUpRight width={11} height={11} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </header>

        <dl className="mt-9 grid border-y border-fg/20 sm:grid-cols-2 lg:grid-cols-4">
          {project.meta.map((cell, i) => (
            <div
              key={cell.label}
              style={stagger(i)}
              className="reveal border-fg/15 py-4.5 not-last:border-b sm:odd:pr-7 sm:even:pl-7 lg:border-b-0 lg:px-7 lg:not-last:border-r lg:first:pl-0 lg:last:pr-0"
            >
              <dt className="label text-muted">{cell.label}</dt>
              <dd className="mt-1.5 font-medium">{cell.value}</dd>
            </div>
          ))}
        </dl>
      </Band>

      <Band as="section" tone="navy" aria-label="At a glance" innerClassName="py-10 md:py-12">
        <dl className="grid gap-8 md:grid-cols-3 md:gap-0">
          {project.glance.map((item, i) => (
            <div
              key={item.label}
              style={stagger(i)}
              className="reveal border-ground/25 md:px-11 md:not-last:border-r md:first:pl-0 md:last:pr-0"
            >
              <dt className="label text-ground/60">{item.label}</dt>
              <dd className="mt-3 text-[1.08rem] leading-relaxed">{item.value}</dd>
            </div>
          ))}
        </dl>
      </Band>

      <Band as="div" innerClassName="pt-12 pb-16 md:pb-20">
        {project.shot ? (
          <figure className={project.architecture ? 'mb-12' : undefined}>
            <span className="block w-full overflow-clip border border-fg">
              <Image
                src={project.shot.src}
                alt={project.shot.alt}
                sizes="(min-width: 1344px) 1264px, calc(100vw - 3rem)"
                placeholder="blur"
                className="drift h-auto w-full"
              />
            </span>
            <figcaption className="mt-3 label text-muted">The live site</figcaption>
          </figure>
        ) : null}

        {project.architecture ? (
          <div className="reveal">
            <ArchitectureFigure architecture={project.architecture} />
          </div>
        ) : project.shot ? null : (
          <figure className="border border-fg bg-raised px-6 py-8 text-accent">
            <ProjectSketch
              slug={project.slug}
              className="mx-auto block h-auto w-full max-w-3xl"
            />
          </figure>
        )}

        {project.decisions && project.decisions.length > 0 ? (
          <section aria-labelledby="decisions-title" className="mt-14">
            <div className="flex flex-col gap-2 border-b-2 border-fg pb-3.5 sm:flex-row sm:items-baseline sm:justify-between">
              <h2 id="decisions-title" className="label">
                {project.decisions.length === 3 ? 'Three decisions' : 'Decisions'}, and what I
                turned down
              </h2>
              <p className="label text-muted">The interesting part of any build</p>
            </div>
            <ul className="mt-6 grid gap-8 md:grid-cols-3 md:gap-0">
              {project.decisions.map((decision, i) => (
                <li
                  key={decision.title}
                  style={stagger(i)}
                  className="reveal border-fg/15 md:px-10 md:not-last:border-r md:first:pl-0 md:last:pr-0"
                >
                  <h3 className="font-display text-xl leading-tight font-bold tracking-tight">
                    {decision.title}
                  </h3>
                  <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">
                    <span className="label">Turned down</span> — {decision.turnedDown}
                  </p>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </Band>

      <nav
        aria-label="More case studies"
        data-tone="bone"
        className="border-t border-fg bg-raised"
      >
        <div className="mx-auto flex max-w-editorial flex-col gap-4 px-6 py-7 sm:flex-row sm:items-center sm:justify-between md:px-10">
          <Link
            href={`/work/${prev.slug}`}
            rel="prev"
            className="inline-flex items-center gap-2 label text-fg/70 hover:text-fg"
          >
            <ArrowLeft width={12} height={12} /> Previous — {prev.title}
          </Link>
          <Link
            href={`/work/${next.slug}`}
            rel="next"
            className="inline-flex items-center gap-2 font-display text-xl font-bold tracking-tight hover:text-accent"
          >
            Next — {next.title} <ArrowRight width={14} height={14} />
          </Link>
        </div>
      </nav>
    </article>
  );
}
