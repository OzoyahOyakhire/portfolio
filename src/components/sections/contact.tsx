import { ArrowRight } from '@/components/icons';
import { Band } from '@/components/primitives/band';
import { stagger } from '@/lib/stagger';
import { SectionHeader } from '@/components/primitives/section-header';
import { site } from '@/content/site';
import { testimonials } from '@/content/testimonials';

export function Testimonials() {
  return (
    <Band
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="border-t border-fg"
      innerClassName="pt-14 pb-16 md:pb-20"
    >
      <SectionHeader
        id="testimonials-title"
        number="07"
        label={testimonials.eyebrow}
        caption={testimonials.caption}
      />

      <div className="mt-10 grid gap-12 md:grid-cols-2 md:gap-0">
        {testimonials.items.map((item, i) => (
          // The attribution lives in <figcaption>, outside the <blockquote>, so a
          // screen reader doesn't read the name as part of the quote.
          <figure
            key={item.org}
            style={stagger(i)}
            className={`reveal border-fg/15 ${i === 0 ? 'md:border-r md:pr-14' : 'md:pl-14'}`}
          >
            <blockquote className="font-display text-[1.35rem] leading-[1.34] font-semibold tracking-tight md:text-[1.55rem]">
              <p>“{item.quote}”</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3.5">
              <span
                aria-hidden="true"
                className={`flex size-10 items-center justify-center font-display text-sm font-extrabold ${
                  i === 0 ? 'bg-accent text-ground' : 'border border-fg bg-raised text-fg'
                }`}
              >
                {item.initial}
              </span>
              <span>
                <span className="block text-[0.94rem] font-semibold">{item.role}</span>
                <span className="block text-[0.88rem] text-muted">{item.org}</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </Band>
  );
}

export function Contact() {
  const { cta } = site;

  return (
    <Band
      id="contact"
      tone="navy"
      aria-labelledby="contact-title"
      innerClassName="py-16 md:py-20"
    >
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <p className="reveal label text-ground/60">08 — {cta.eyebrow}</p>
          <h2
            id="contact-title"
            className="mt-5 font-display text-[2.8rem] leading-none font-extrabold tracking-tighter md:text-6xl"
          >
            {cta.headline.map((line, i) => (
              <span key={line} className="reveal-slot block">
                <span className="reveal-line" style={stagger(i)}>
                  {line}
                </span>
              </span>
            ))}
          </h2>
          <p
            className="reveal mt-5 max-w-[42ch] text-[1.12rem] leading-relaxed text-ground/80"
            style={stagger(1)}
          >
            {cta.body}
          </p>
        </div>

        <div className="reveal flex flex-col gap-3.5 sm:w-80" style={stagger(2)}>
          <a
            href={`mailto:${site.email}?subject=A%20project`}
            className="inline-flex items-center justify-center gap-2 bg-ground px-8 py-5 label text-accent transition-colors hover:bg-raised"
          >
            Email me <ArrowRight width={12} height={12} />
          </a>
          <a
            href={site.whatsapp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center border-[1.5px] border-ground/50 px-8 py-[1.1rem] label transition-colors hover:border-ground hover:bg-ground/10"
          >
            Message on WhatsApp
            <span className="sr-only">(opens in a new tab)</span>
          </a>
          <p className="text-center text-sm text-ground/60">{cta.note}</p>
        </div>
      </div>
    </Band>
  );
}
