import { site } from '@/content/site';
import { Logo } from './logo';
import { MobileNav } from './mobile-nav';
import { SectionLink } from './section-link';

/**
 * Server Component. The section links and the drawer below `md` are the only
 * client islands.
 *
 * Sticky works here because no ancestor sets `overflow` — see the note on
 * full-bleed in globals.css for why that matters. `data-site-header` is how
 * section scrolling measures the offset to clear it.
 */
export function Header() {
  return (
    <header
      data-site-header
      data-tone="paper"
      className="sticky top-0 z-40 border-b border-ink bg-paper"
    >
      <div className="mx-auto flex h-16 max-w-editorial items-center justify-between px-6 md:h-[4.75rem] md:px-10">
        <SectionLink href="/" className="-ml-1 flex items-center gap-2 p-1">
          <Logo size={38} animate className="text-navy" />
          <span className="font-display text-base font-bold tracking-tight">{site.name}</span>
        </SectionLink>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-8">
            {site.nav.map((item) => (
              <li key={item.href}>
                <SectionLink
                  href={item.href}
                  className="label text-muted transition-colors duration-200 hover:text-ink"
                >
                  {item.label}
                </SectionLink>
              </li>
            ))}
            <li>
              <SectionLink
                href={site.contactHref}
                className="block bg-navy px-5 py-3 label text-paper transition-colors duration-200 hover:bg-ink"
              >
                Start a project
              </SectionLink>
            </li>
          </ul>
        </nav>

        <MobileNav />
      </div>
    </header>
  );
}
