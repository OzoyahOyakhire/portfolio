import Link from 'next/link';
import { Band } from '@/components/primitives/band';
import { ArrowUpRight } from '@/components/icons';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { stagger } from '@/lib/stagger';
import { LocalTime } from './local-time';
import { SectionLink } from './section-link';
import { Logo } from './logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Band as="footer" tone="ink" innerClassName="pt-12 pb-8 md:pt-14">
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-10">
        <div>
          <SectionLink href="/" className="-ml-1 inline-flex items-center gap-2 p-1">
            <Logo size={38} className="text-ground" />
            <span className="font-display text-[1.06rem] font-bold tracking-tight">
              {site.name}
            </span>
          </SectionLink>
          <p className="mt-4 max-w-[38ch] text-[0.97rem] leading-relaxed text-ground/65">
            {site.footer.blurb}
          </p>
          <p className="mt-5 flex items-center gap-2.5">
            <span aria-hidden="true" className="block size-2 rounded-full bg-ground" />
            <span className="label">{site.footer.available}</span>
          </p>
        </div>

        <FooterColumn title="Site" index={1}>
          {site.nav.map((item) => (
            <li key={item.href}>
              <SectionLink href={item.href} className="hover:text-ground">
                {item.label}
              </SectionLink>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Selected work" index={2}>
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/work/${project.slug}`} className="hover:text-ground">
                {project.shortTitle}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Elsewhere" index={3}>
          {site.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-ground"
              >
                {social.label}
                <ArrowUpRight width={12} height={12} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className="break-all hover:text-ground">
              {site.email}
            </a>
          </li>
        </FooterColumn>
      </div>

      <div className="mt-11 flex flex-col gap-2 border-t border-ground/20 pt-5 text-[0.84rem] text-ground/55 sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {year} {site.name}. {site.footer.colophon}
        </p>
        <p>
          <LocalTime />
        </p>
      </div>
    </Band>
  );
}

function FooterColumn({
  title,
  index = 0,
  children,
}: {
  title: string;
  index?: number;
  children: React.ReactNode;
}) {
  return (
    <div className="reveal" style={stagger(index)}>
      <h2 className="mb-4 label text-ground/55">{title}</h2>
      <ul className="flex flex-col gap-2.5 text-[0.94rem] text-ground/80">{children}</ul>
    </div>
  );
}
