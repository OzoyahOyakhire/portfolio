import { Band } from '@/components/primitives/band';
import { stagger } from '@/lib/stagger';
import { SectionHeader } from '@/components/primitives/section-header';
import { about } from '@/content/about';
import { site } from '@/content/site';

/** Three stacked bands: statement + facts, the bone stat band, how it goes. */
export function About() {
  return (
    <section id="about" aria-labelledby="about-title">
      <Band as="div" innerClassName="pt-16 pb-14 md:pt-20">
        <SectionHeader
          id="about-title"
          number="01"
          label={about.eyebrow}
          caption={about.caption}
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_20rem] lg:gap-16">
          <div>
            <h3 className="reveal-slot max-w-[20ch] font-display text-[2.35rem] leading-[1.02] font-extrabold tracking-tight md:text-5xl">
              <span className="reveal-line">{about.headline}</span>
            </h3>
            <div className="reveal mt-8 flex max-w-[60ch] flex-col gap-5 text-[1.08rem] leading-[1.7] text-muted">
              {about.body.map((paragraph, i) => (
                <p key={i}>
                  {i === about.studioSentenceIndex ? (
                    <StudioSentence text={paragraph} />
                  ) : (
                    paragraph
                  )}
                </p>
              ))}
            </div>
          </div>

          <div className="reveal" style={stagger(1)}>
            {/* Portrait placeholder until a real photo exists. */}
            <div
              data-tone="navy"
              className="flex aspect-[4/3.4] items-end bg-accent p-5 text-ground lg:aspect-auto lg:h-64"
            >
              <div>
                <p className="label text-ground/55">Portrait — placeholder</p>
                <p className="mt-1.5 font-display text-2xl font-bold tracking-tight">
                  {site.name}
                </p>
              </div>
            </div>

            <dl className="mt-6">
              {about.facts.map((fact) => (
                <div
                  key={fact.label}
                  className="flex items-baseline justify-between gap-4 border-b border-fg/15 py-3 last:border-b-0"
                >
                  <dt className="label text-muted">{fact.label}</dt>
                  <dd
                    className={
                      'accent' in fact && fact.accent
                        ? 'text-[0.95rem] font-semibold text-accent'
                        : 'text-right text-[0.95rem] font-medium'
                    }
                  >
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Band>

      <Band as="div" tone="bone" className="border-y border-fg">
        <dl className="grid md:grid-cols-3">
          {about.stats.map((stat, i) => (
            <div
              key={stat.label}
              style={stagger(i)}
              className="reveal flex items-baseline gap-5 border-fg/15 py-7 not-last:border-b md:py-8 md:not-first:pl-10 md:not-last:border-r md:not-last:border-b-0 md:not-last:pr-10"
            >
              {/* DOM order is term-then-value, as <dl> requires; the number is
                  pulled visually first with `order-first`. */}
              <dt className="order-last">
                <span className="block font-display text-[1.06rem] font-bold tracking-tight">
                  {stat.label}
                </span>
                {/* On bone, so ink/70 rather than muted — muted fails AA here. */}
                <span className="mt-0.5 block text-[0.9rem] text-fg/70">{stat.note}</span>
              </dt>
              <dd className="order-first font-display text-6xl leading-[0.9] font-extrabold tracking-tighter text-accent tabular-nums">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </Band>

      <Band as="div" innerClassName="pt-12 pb-20 md:pb-24">
        <h3 className="reveal label text-muted">{about.howItGoes.caption}</h3>
        <ul className="mt-6 grid gap-8 md:grid-cols-3 md:gap-11">
          {about.howItGoes.items.map((item, i) => (
            <li
              key={item.title}
              style={stagger(i)}
              className="reveal border-t-2 border-accent pt-4"
            >
              <h4 className="font-display text-xl font-bold tracking-tight">{item.title}</h4>
              <p className="mt-2 text-[0.98rem] leading-relaxed text-muted">{item.body}</p>
            </li>
          ))}
        </ul>
      </Band>
    </section>
  );
}

/** Picks the studio name out of the sentence in navy, without splitting content. */
function StudioSentence({ text }: { text: string }) {
  const [before, after] = text.split(site.studio);
  if (after === undefined) return <>{text}</>;
  return (
    <>
      {before}
      <span className="font-semibold text-accent">{site.studio}</span>
      {after}
    </>
  );
}
