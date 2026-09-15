import Link from 'next/link';
import { ArrowRight, ArrowUpRight } from '@/components/icons';
import { Band } from '@/components/primitives/band';
import { SectionHeader } from '@/components/primitives/section-header';
import { TagList } from '@/components/primitives/tag-list';
import { ProjectSketch } from '@/components/work/sketches';
import { featuredProject, otherProjects } from '@/content/projects';
import type { Project } from '@/content/types';

export function Work() {
  return (
    <Band
      id="work"
      aria-labelledby="work-title"
      className="border-t border-ink"
      innerClassName="pt-16 pb-20 md:pt-20 md:pb-24"
    >
      <SectionHeader
        id="work-title"
        number="04"
        label="Selected work"
        caption="Five projects — what it was, what was hard, what happened"
      />

      <FeaturedCard project={featuredProject} />

      <ul className="mt-7 grid gap-7 md:grid-cols-2">
        {otherProjects.map((project) => (
          <li key={project.slug} className="reveal">
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </Band>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article className="reveal mt-9 grid border border-ink lg:grid-cols-[minmax(0,40rem)_1fr]">
      <div className="border-b border-ink bg-bone px-4 py-6 text-navy lg:border-r lg:border-b-0 lg:p-0">
        <ProjectSketch slug={project.slug} className="block h-auto w-full" />
      </div>

      <div className="flex flex-col p-6 md:p-8 lg:py-9 lg:pr-9 lg:pl-11">
        <p className="flex items-baseline justify-between gap-4">
          <span className="label text-navy">{project.category}</span>
          <span className="label text-muted">{project.year}</span>
        </p>
        <h3 className="mt-3.5 font-display text-[2.1rem] leading-[1.03] font-extrabold tracking-tight md:text-[2.4rem]">
          {project.title}
        </h3>
        <p className="mt-3.5 text-[1.06rem] leading-relaxed text-muted">{project.summary}</p>

        <dl>
          <div className="mt-5 border-t border-ink/15 pt-4">
            <dt className="label text-muted">The hard part</dt>
            <dd className="mt-2 leading-relaxed text-muted">{project.hardPart}</dd>
          </div>
          <div className="mt-4 border-t border-ink/15 pt-4">
            <dt className="label text-muted">What happened</dt>
            <dd className="mt-2 leading-relaxed font-medium text-navy">
              {project.whatHappened}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 lg:mt-auto lg:pt-6">
          <TagList items={project.tags} />
          <Link
            href={`/work/${project.slug}`}
            className="inline-flex items-center gap-2 bg-navy px-4.5 py-3 label text-paper transition-colors hover:bg-ink"
          >
            Read the teardown <ArrowRight width={12} height={12} />
            <span className="sr-only">: {project.title}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

/**
 * The whole card is one link to the case study, via the stretched-link pattern
 * (an `after:` pseudo-element on the title link covering the card) — so it's a
 * single tab stop with a sensible accessible name, not a nest of links.
 * A live-site link, where there is one, sits above it with `relative z-10`.
 */
function ProjectCard({ project }: { project: Project }) {
  const isStudy = project.category.startsWith('Study');

  return (
    <article
      className={`group relative flex h-full flex-col border border-ink transition-colors hover:bg-bone/40 ${isStudy ? 'border-dashed' : ''}`}
    >
      <div
        className={`border-b border-ink bg-bone px-4 py-3 text-navy ${isStudy ? 'border-dashed' : ''}`}
      >
        <ProjectSketch slug={project.slug} className="block h-24 w-full md:h-28" />
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <p className="flex items-baseline justify-between gap-4">
          <span className={`label ${isStudy ? 'text-muted' : 'text-navy'}`}>
            {project.category}
          </span>
          <span className="label text-muted">{project.year}</span>
        </p>
        <h3 className="mt-2.5 font-display text-2xl font-bold tracking-tight">
          <Link
            href={`/work/${project.slug}`}
            className="group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4 after:absolute after:inset-0"
          >
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 leading-relaxed text-muted">{project.summary}</p>
        <p className="mt-3 leading-snug font-medium text-navy">{project.whatHappened}</p>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
          <TagList items={project.tags} />
          {project.href ? (
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative z-10 inline-flex items-center gap-1.5 label text-navy hover:underline"
            >
              Live site <ArrowUpRight width={11} height={11} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
