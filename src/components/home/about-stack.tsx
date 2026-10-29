import { home } from '@/content/home';
import { stack } from '@/content/stack';
import { stagger } from '@/lib/stagger';
import { ScrollWords } from './scroll-words';

/** The orange band: the heading holds still while the paragraphs brighten. */
export function About() {
  const { eyebrow, headline, body } = home.about;

  return (
    <section
      id="about"
      aria-labelledby="about-title"
      data-tone="navy"
      className="bg-accent text-ground"
    >
      <div className="mx-auto grid max-w-editorial gap-8 px-5 py-28 md:grid-cols-2 md:gap-20 md:px-10 md:pt-36 md:pb-44">
        <div className="md:sticky md:top-32 md:self-start">
          <p className="label font-medium">{eyebrow}</p>
          <h2
            id="about-title"
            className="mt-5 font-display text-[clamp(2.1rem,1.4rem+2.4vw,3rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance"
          >
            {headline}
          </h2>
        </div>
        <ScrollWords
          paragraphs={body}
          className="flex flex-col gap-6 pt-2 text-[1.3rem] leading-[1.5] font-semibold tracking-[-0.01em] md:pt-10 md:text-[1.5rem]"
        />
      </div>
    </section>
  );
}

/** Four plain columns of tools, grouped by use. Deliberately no logos. */
export function Stack() {
  const { eyebrow, title } = home.stack;

  return (
    <section
      id="stack"
      aria-labelledby="stack-title"
      className="mx-auto max-w-editorial px-5 pt-28 md:px-10 md:pt-36"
    >
      <div className="reveal mb-14 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="label text-muted">{eyebrow}</p>
          <h2
            id="stack-title"
            className="mt-4 font-display text-[2rem] leading-none font-bold tracking-[-0.03em] md:text-[2.5rem]"
          >
            {title}
          </h2>
        </div>
        <p className="max-w-[30em] label text-muted">{stack.caption}.</p>
      </div>

      <div className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-8">
        {stack.groups.map((group, i) => (
          <div key={group.title} className="reveal" style={stagger(i)}>
            <div className="mb-1 flex items-baseline justify-between border-b-2 border-fg pb-4">
              <h3 className="font-display text-lg font-bold md:text-xl">{group.title}</h3>
              <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
            </div>
            <ul>
              {group.items.map((item) => (
                <li
                  key={item}
                  className="stack-item border-b border-line py-3.5 font-medium text-fg-soft"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="reveal mt-14 flex flex-wrap items-baseline gap-x-8 gap-y-3 border border-l-[3px] border-line border-l-accent bg-surface px-6 py-7 md:px-8">
        <span className="shrink-0 basis-48 label font-medium text-accent">
          {stack.learning.label}
        </span>
        <p className="min-w-0 flex-1 basis-80 text-[1.05rem] leading-relaxed text-fg-soft">
          {stack.learning.value}
        </p>
      </div>
    </section>
  );
}
