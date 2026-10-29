'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { site } from '@/content/site';
import { getLenis } from '@/lib/smooth-scroll';
import { stagger } from '@/lib/stagger';
import { SectionLink } from './section-link';

/**
 * The menu button and the full-screen panel it opens, on every screen size.
 *
 * The panel stays mounted so the wipe can play in both directions; while
 * closed it is `inert`, so nothing in it can be focused or clicked. While open:
 * Escape closes it, focus moves to the first link and returns to the button,
 * and wheel smoothing is paused so the page behind cannot glide.
 */
export function SiteMenu() {
  const [open, setOpen] = useState(false);
  const button = useRef<HTMLButtonElement>(null);
  const firstLink = useRef<HTMLAnchorElement>(null);
  const panelId = useId();

  useEffect(() => {
    if (!open) return;
    const lenis = getLenis();
    lenis?.stop();
    document.documentElement.style.overflow = 'clip';
    firstLink.current?.focus({ preventScroll: true });

    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        button.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      document.documentElement.style.overflow = '';
      lenis?.start();
    };
  }, [open]);

  // Release the scroll lock synchronously, before the link's own click
  // handler starts scrolling to its section. Waiting for the effect cleanup
  // would be a render too late, and the locked page would swallow the scroll.
  const close = () => {
    document.documentElement.style.overflow = '';
    getLenis()?.start();
    setOpen(false);
  };

  return (
    <>
      <button
        ref={button}
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
        className="menu-button relative z-50 flex size-[3.25rem] cursor-pointer flex-col items-center justify-center gap-[7px] border-[1.5px] border-line-strong transition-colors hover:border-fg"
      >
        <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
        <span aria-hidden="true" className="block h-0.5 w-[22px] bg-fg" />
        <span aria-hidden="true" className="block h-0.5 w-[22px] bg-fg" />
      </button>

      <div id={panelId} className="site-menu" data-open={open ? '' : undefined} inert={!open}>
        <div className="mx-auto w-full max-w-editorial px-5 md:px-10">
          <p className="mb-6 label text-muted">Menu</p>
          <nav aria-label="Primary" className="border-t border-line">
            {site.nav.map((item, i) => (
              <SectionLink
                key={item.href}
                ref={i === 0 ? firstLink : undefined}
                href={item.href}
                onClick={close}
                style={stagger(i)}
                className="menu-link flex items-baseline gap-5 border-b border-line py-4 font-display text-[2.1rem] leading-[1.05] font-bold tracking-[-0.03em] md:gap-7 md:py-5 md:text-[3.5rem]"
              >
                <span className="label text-accent">{String(i + 1).padStart(2, '0')}</span>
                {item.label}
              </SectionLink>
            ))}
          </nav>
          <div className="menu-foot mt-10 flex flex-wrap justify-between gap-4 label text-muted">
            <a href={`mailto:${site.email}`} className="text-fg hover:text-accent">
              {site.email}
            </a>
            <span className="flex gap-6">
              {site.socials.map((social) => (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-fg"
                >
                  {social.label}
                </a>
              ))}
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
