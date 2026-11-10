import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight } from '@/components/icons';
import { SectionLink } from '@/components/site/section-link';
import { offer } from '@/content/offer';
import { getProject } from '@/content/projects';
import { site } from '@/content/site';
import { absoluteUrl } from '@/lib/site-url';
import { stagger } from '@/lib/stagger';

export const metadata: Metadata = {
  title: offer.meta.title,
  description: offer.meta.description,
  alternates: { canonical: '/services' },
  openGraph: {
    type: 'website',
    title: `${offer.meta.title} — ${site.name}`,
    description: offer.meta.description,
    url: '/services',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${offer.meta.title} — ${site.name}`,
    description: offer.meta.description,
    creator: site.seo.twitter,
  },
};

/**
 * One page per kind of work, named the way clients search for it. Each
 * service links to the case study that shows it, so the claim is backed by a
 * live project rather than a list of adjectives.
 */
export default function ServicesPage() {
  const url = absoluteUrl('/services');

  // Each service, offered by the site's Person (defined in the root layout),
  // plus a breadcrumb so results can show Home › Services.
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      ...offer.services.map((service) => ({
        '@type': 'Service',
        '@id': `${url}#${service.id}`,
        name: service.title,
        serviceType: service.title,
        description: service.summary,
        url: `${url}#${service.id}`,
        provider: { '@id': absoluteUrl('/#person') },
        areaServed: [{ '@type': 'Country', name: 'Nigeria' }, 'Worldwide'],
      })),
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: absoluteUrl('/') },
          { '@type': 'ListItem', position: 2, name: 'Services', item: url },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        // Built from static content files; nothing user-supplied reaches it.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section
        aria-labelledby="services-title"
        className="mx-auto max-w-editorial px-5 pt-20 pb-20 md:px-10 md:pt-28 md:pb-28"
      >
        <p className="label text-accent">{offer.eyebrow}</p>
        <h1
          id="services-title"
          className="mt-5 max-w-[18em] font-display text-[clamp(2.1rem,1.2rem+3.6vw,3.75rem)] leading-[1.04] font-extrabold tracking-[-0.03em] text-balance"
        >
          {offer.headline}
        </h1>
        <p className="mt-8 max-w-[40rem] text-[1.0625rem] leading-[1.75] text-fg-soft md:text-lg">
          {offer.intro}
        </p>
        <nav aria-label="Services on this page" className="mt-10 flex flex-wrap gap-2">
          {offer.services.map((service) => (
            <a
              key={service.id}
              href={`#${service.id}`}
              className="border border-line-strong px-3.5 py-2 label text-fg-soft transition-colors hover:border-fg hover:text-fg"
            >
              {service.title}
            </a>
          ))}
        </nav>
      </section>

      <div className="mx-auto max-w-editorial px-5 md:px-10">
        {offer.services.map((service, i) => {
          const example = service.example ? getProject(service.example.project) : undefined;
          return (
            <section
              key={service.id}
              id={service.id}
              aria-labelledby={`${service.id}-title`}
              className="reveal grid gap-8 border-t border-line py-14 md:py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16"
            >
              <div>
                <p className="label text-accent">{String(i + 1).padStart(2, '0')}</p>
                <h2
                  id={`${service.id}-title`}
                  className="mt-4 font-display text-[clamp(1.6rem,1.2rem+1.4vw,2.25rem)] leading-[1.1] font-bold tracking-[-0.02em] text-balance"
                >
                  {service.title}
                </h2>
              </div>

              <div className="flex flex-col gap-8">
                <p className="text-[1.1rem] leading-relaxed text-fg-soft">{service.summary}</p>

                <div className="grid gap-8 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-3 label text-muted">What’s included</h3>
                    <ul className="flex flex-col">
                      {service.includes.map((item) => (
                        <li key={item} className="border-b border-line py-3 font-medium">
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="mb-3 label text-muted">Built with</h3>
                    <ul className="flex flex-wrap gap-2">
                      {service.tools.map((tool) => (
                        <li
                          key={tool}
                          className="border border-line-strong px-2.5 py-1.5 label text-fg-soft"
                        >
                          {tool}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {example && service.example ? (
                  <Link
                    href={`/work/${example.slug}`}
                    className="group inline-flex w-fit items-center gap-3 border-b border-accent pb-1 font-medium transition-colors hover:text-accent"
                  >
                    See it in {example.title}, {service.example.note}
                    <ArrowRight
                      width={14}
                      height={14}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </Link>
                ) : null}
              </div>
            </section>
          );
        })}
      </div>

      <section
        aria-labelledby="process-title"
        className="mx-auto max-w-editorial border-t border-line px-5 pt-20 md:px-10 md:pt-28"
      >
        <h2
          id="process-title"
          className="font-display text-[2rem] leading-none font-bold tracking-[-0.03em] md:text-[2.5rem]"
        >
          {offer.process.title}
        </h2>
        <ol className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {offer.process.steps.map((step, i) => (
            <li
              key={step.title}
              className="reveal border-t-2 border-fg pt-5"
              style={stagger(i)}
            >
              <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{step.title}</h3>
              <p className="mt-3 leading-relaxed text-fg-soft">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-14">
          {/* The contact section is the footer, on this page too. */}
          <SectionLink href="/services#contact" className="btn btn-hot">
            Start a project
          </SectionLink>
        </div>
      </section>
    </>
  );
}
