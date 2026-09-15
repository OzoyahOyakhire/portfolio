import Link from 'next/link';
import { Band } from '@/components/primitives/band';
import { ArrowUpRight } from '@/components/icons';
import { projects } from '@/content/projects';
import { site } from '@/content/site';
import { LocalTime } from './local-time';
import { Logo } from './logo';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <Band as="footer" tone="ink" innerClassName="pt-12 pb-8 md:pt-14">
      <div className="grid gap-12 md:grid-cols-[1.6fr_1fr_1fr_1fr] md:gap-10">
        <div>
          <Link href="/" className="-ml-1 inline-flex items-center gap-2 p-1">
            <Logo size={38} className="text-paper" />
            <span className="font-display text-[1.06rem] font-bold tracking-tight">
              {site.name}
            </span>
          </Link>
          <p className="mt-4 max-w-[38ch] text-[0.97rem] leading-relaxed text-paper/65">
            {site.footer.blurb}
          </p>
          <p className="mt-5 flex items-center gap-2.5">
            <span aria-hidden="true" className="block size-2 rounded-full bg-paper" />
            <span className="label">{site.footer.available}</span>
          </p>
        </div>

        <FooterColumn title="Site">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link href={item.href} className="hover:text-paper">
                {item.label}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Selected work">
          {projects.map((project) => (
            <li key={project.slug}>
              <Link href={`/work/${project.slug}`} className="hover:text-paper">
                {project.shortTitle}
              </Link>
            </li>
          ))}
        </FooterColumn>

        <FooterColumn title="Elsewhere">
          {site.socials.map((social) => (
            <li key={social.href}>
              <a
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-paper"
              >
                {social.label}
                <ArrowUpRight width={12} height={12} />
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </li>
          ))}
          <li>
            <a href={`mailto:${site.email}`} className="break-all hover:text-paper">
              {site.email}
            </a>
          </li>
        </FooterColumn>
      </div>

      <div className="mt-11 flex flex-col gap-2 border-t border-paper/20 pt-5 text-[0.84rem] text-paper/55 sm:flex-row sm:items-center sm:justify-between">
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

function FooterColumn({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h2 className="mb-4 label text-paper/55">{title}</h2>
      <ul className="flex flex-col gap-2.5 text-[0.94rem] text-paper/80">{children}</ul>
    </div>
  );
}
