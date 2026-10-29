import Link from 'next/link';
import { ArrowDown } from '@/components/icons';
import { site } from '@/content/site';

export function Hero() {
  const { hero, status } = site;

  return (
    <section aria-labelledby="hero-title" className="overflow-x-clip border-b border-fg">
      <div className="mx-auto grid max-w-editorial px-6 md:px-10 lg:min-h-[calc(100svh-4.75rem-5rem)] lg:grid-cols-[1fr_22rem] xl:grid-cols-[1fr_24rem]">
        {/* statement */}
        <div className="relative flex flex-col pt-10 pb-12 md:pt-16 lg:pt-20 lg:pr-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 -left-6 hidden bg-[repeating-linear-gradient(90deg,rgb(11_11_11/0.05)_0_1px,transparent_1px_110px)] md:-left-10 lg:block"
          />

          <div className="relative flex flex-1 flex-col">
            <p className="flex items-center gap-3.5 text-accent">
              <span aria-hidden="true" className="block h-[3px] w-7 bg-accent" />
              <span className="label">{hero.eyebrow}</span>
            </p>

            <h1
              id="hero-title"
              className="mt-7 font-display text-display font-extrabold text-fg"
            >
              {hero.headline.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>

            <p className="mt-7 max-w-[46ch] text-[1.08rem] leading-relaxed text-muted md:text-[1.19rem]">
              {hero.lede}
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/#work"
                className="inline-flex items-center justify-center gap-2.5 bg-fg px-7 py-[1.1rem] label text-ground transition-colors hover:bg-accent"
              >
                See the work <ArrowDown width={12} height={12} />
              </Link>
              <Link
                href={site.contactHref}
                className="inline-flex items-center justify-center border-[1.5px] border-fg px-7 py-4 label transition-colors hover:bg-fg hover:text-ground"
              >
                Start a project
              </Link>
            </div>

            <div className="mt-auto pt-12">
              <div className="border-t border-fg/20 pt-4">
                <p className="label text-muted">Recently shipped</p>
                <ul className="mt-3 flex flex-wrap gap-y-2">
                  {hero.recentlyShipped.map((name) => (
                    <li
                      key={name}
                      className="border-fg/20 font-display text-lg font-bold tracking-tight not-last:mr-6 not-last:border-r not-last:pr-6"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Status panel — bleeds to the viewport edge on the right. A named <section>
            (a region landmark) rather than <aside>: a complementary landmark must be
            top-level, and this one lives inside <main>. */}
        <section
          aria-label="Availability"
          data-tone="navy"
          className="relative -mx-6 bg-accent px-6 py-10 text-ground md:-mx-10 md:px-10 lg:mx-0 lg:py-20 lg:pr-0 lg:pl-10 lg:before:absolute lg:before:inset-y-0 lg:before:left-full lg:before:w-screen lg:before:bg-accent"
        >
          <p className="flex items-center gap-2.5 border-b border-ground/30 pb-4">
            <span aria-hidden="true" className="block size-2 rounded-full bg-ground" />
            <span className="label">{status.available}</span>
          </p>
          <dl>
            {status.panel.map((row) => (
              <div key={row.label} className="border-b border-ground/15 py-5">
                <dt className="label text-ground/60">{row.label}</dt>
                <dd className="mt-2 text-[1.06rem] leading-snug font-medium">{row.value}</dd>
              </div>
            ))}
            <div className="py-5">
              <dt className="label text-ground/60">Direct</dt>
              <dd className="mt-2">
                <a
                  href={`mailto:${site.email}`}
                  className="border-b border-ground/40 pb-0.5 font-medium break-all hover:border-ground"
                >
                  {site.email}
                </a>
              </dd>
            </div>
          </dl>
        </section>
      </div>

      {/* capability band */}
      <div data-tone="bone" className="border-t border-fg bg-raised">
        <div className="mx-auto flex max-w-editorial flex-col gap-3 px-6 py-6 sm:flex-row sm:items-center sm:gap-8 md:px-10">
          <p className="shrink-0 label text-fg/70">I build</p>
          <ul className="flex flex-wrap gap-y-2">
            {hero.capabilities.map((item) => (
              <li
                key={item}
                className="border-fg/20 font-display text-[1.06rem] font-semibold tracking-tight not-last:mr-6 not-last:border-r not-last:pr-6"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
