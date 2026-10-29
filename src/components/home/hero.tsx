import Image from 'next/image';
import { SectionLink } from '@/components/site/section-link';
import { home } from '@/content/home';
import { getProject } from '@/content/projects';
import { site } from '@/content/site';
import { stagger } from '@/lib/stagger';
import { GlyphField } from './glyph-field';

/**
 * The opener: a three-line headline that rises line by line, a short intro
 * whose underlined phrases preview the projects they describe, and the glyph
 * field behind it all on the right.
 *
 * Server Component; only the glyph canvas is a client island.
 */
export function Hero() {
  const { headline, intro, hint } = home.hero;

  return (
    <section aria-labelledby="hero-title" className="relative overflow-clip">
      <GlyphField />

      <div className="relative mx-auto max-w-editorial px-5 pt-20 pb-24 md:px-10 md:pt-28 md:pb-32">
        <h1
          id="hero-title"
          className="max-w-[12em] font-display text-display font-extrabold text-balance"
        >
          {headline.map((line, i) => (
            <span key={line} className="line-slot" style={stagger(i)}>
              <span className={i === headline.length - 1 ? 'text-accent' : undefined}>
                {line}
              </span>
            </span>
          ))}
        </h1>

        <div className="hero-after mt-12 max-w-[36rem] md:mt-14">
          <p className="text-[1.0625rem] leading-[1.75] text-fg-soft md:text-lg">
            {intro.map((part, i) =>
              typeof part === 'string' ? (
                part
              ) : (
                <PreviewLink key={i} text={part.text} slug={part.project} />
              ),
            )}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a className="btn btn-hot" href={`mailto:${site.email}`}>
              Start a project
            </a>
            <SectionLink className="btn btn-line" href="/#work">
              View work
            </SectionLink>
            <span className="ml-2 hidden label text-muted md:inline">{hint}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

/** A phrase that links to a case study and shows its screenshot on hover. */
function PreviewLink({ text, slug }: { text: string; slug: string }) {
  const project = getProject(slug);
  if (!project) return <>{text}</>;

  return (
    <a href={`/work/${project.slug}`} className="preview-link">
      {text}
      {project.shot ? (
        <Image
          src={project.shot.src}
          alt=""
          sizes="240px"
          className="preview-card aspect-[16/10] object-cover object-top"
        />
      ) : null}
    </a>
  );
}
