import { SectionLink } from './section-link';
import { SiteMenu } from './site-menu';

/**
 * The wordmark and the menu button, nothing else — the navigation lives in
 * the full-screen menu on every screen size.
 *
 * `data-site-header` is how section scrolling measures the offset to clear it.
 */
export function SiteHeader() {
  return (
    <header data-site-header className="sticky top-0 z-40 bg-ground/95">
      <div className="mx-auto flex h-[5.25rem] max-w-editorial items-center justify-between px-5 md:px-10">
        <SectionLink href="/" className="relative z-50 font-display text-base font-bold">
          ozed<span className="text-accent">/</span>
          <span className="sr-only"> — Ozoyah Oyakhire, home</span>
        </SectionLink>
        <SiteMenu />
      </div>
    </header>
  );
}
