'use client';

import Image from 'next/image';
import { useId, useState } from 'react';
import { ArrowUpRight } from '@/components/icons';
import { home } from '@/content/home';
import { projects } from '@/content/projects';

/**
 * The detail behind the fan: one row per project, opened one at a time.
 *
 * Each row is a real disclosure — a <button> with `aria-expanded` controlling
 * a region — so it works from the keyboard and reads correctly. The panel
 * stays in the DOM when closed (hidden from assistive tech with `inert`), which
 * is what lets it animate open and closed.
 */
export function WorkList() {
  const [open, setOpen] = useState(0);
  const id = useId();
  const { detailsTitle, detailsHint } = home.work;

  return (
    <section
      aria-labelledby={`${id}-title`}
      className="mx-auto max-w-editorial px-5 pb-28 md:px-10 md:pt-6 md:pb-36"
    >
      <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-4">
        <h2
          id={`${id}-title`}
          className="font-display text-[2rem] leading-none font-bold tracking-[-0.03em] md:text-[2.5rem]"
        >
          {detailsTitle}
        </h2>
        <p className="label text-muted">{detailsHint}</p>
      </div>

      <div className="reveal">
        {projects.map((project, i) => {
          const isOpen = open === i;
          const panel = `${id}-panel-${i}`;
          const role = project.meta[0].value;

          return (
            <div key={project.slug} className="work-row" data-open={isOpen ? '' : undefined}>
              <h3>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panel}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className="work-head grid w-full cursor-pointer grid-cols-[2rem_minmax(0,1fr)_2.75rem] items-center gap-3 py-6 text-left sm:grid-cols-[2.5rem_minmax(0,1fr)_3rem] sm:py-7 md:grid-cols-[3.5rem_minmax(0,1fr)_4rem_3.5rem] md:gap-5 lg:grid-cols-[4.5rem_minmax(0,1fr)_13rem_5rem_3.5rem] lg:gap-6"
                >
                  <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="work-title min-w-0 font-display text-[1.15rem] leading-tight font-bold tracking-[-0.02em] [overflow-wrap:anywhere] transition-colors sm:text-[1.35rem] md:text-[1.75rem] lg:text-[2.1rem]">
                    {project.title}
                  </span>
                  <span className="hidden text-[0.95rem] text-fg-soft lg:block">
                    {project.category}
                  </span>
                  <span className="hidden label text-muted md:block">{project.year}</span>
                  <span
                    aria-hidden="true"
                    className="work-plus flex size-11 items-center justify-center border-[1.5px] border-line-strong sm:size-12"
                  >
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M12 5v14M5 12h14" />
                    </svg>
                  </span>
                </button>
              </h3>

              <div
                id={panel}
                role="region"
                aria-label={project.title}
                className="work-body"
                inert={!isOpen}
              >
                <div>
                  <div className="work-inner grid gap-8 pt-2 pb-14 md:grid-cols-[minmax(0,7fr)_minmax(0,4fr)] md:gap-14">
                    {project.shot ? (
                      <div className="border border-line bg-raised p-4 md:p-10">
                        <div className="scroll-shot aspect-[16/10] overflow-hidden border border-line-strong">
                          <Image
                            src={project.shot.src}
                            alt={project.shot.alt}
                            sizes="(min-width: 768px) 46vw, 90vw"
                            placeholder="blur"
                            className="h-full w-full object-cover"
                          />
                        </div>
                      </div>
                    ) : null}

                    <div className="flex flex-col gap-6">
                      <p className="text-[1.15rem] leading-relaxed">{project.summary}</p>
                      <div>
                        <p className="mb-1.5 label text-muted">My role</p>
                        <p className="leading-relaxed text-fg-soft">{role}</p>
                      </div>
                      <div>
                        <p className="mb-1.5 label text-muted">The hard part</p>
                        <p className="leading-relaxed text-fg-soft">{project.hardPart}</p>
                      </div>
                      <ul className="flex flex-wrap gap-2">
                        {project.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border border-line-strong px-2.5 py-1.5 label text-fg-soft"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                      {project.href ? (
                        <div>
                          <a
                            href={project.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-hot"
                          >
                            View live project <ArrowUpRight width={12} height={12} />
                            <span className="sr-only">(opens in a new tab)</span>
                          </a>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
