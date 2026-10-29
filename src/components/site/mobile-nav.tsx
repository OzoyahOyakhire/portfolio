'use client';

import { useRef } from 'react';
import { site } from '@/content/site';
import { getLenis } from '@/lib/smooth-scroll';
import { SectionLink } from './section-link';

/**
 * The one genuinely interactive widget on the site.
 *
 * Built on a native <dialog> opened with `showModal()`, which gives focus
 * trapping, Escape-to-close, an inert background and top-layer stacking from
 * the platform — no focus-trap library, no scroll-lock hack, no portal.
 *
 * Wheel smoothing is paused while it is open — otherwise a wheel over the
 * backdrop would glide the page behind the drawer — and resumed on `close`,
 * which fires however it closed: the button, the backdrop or Escape. The
 * section links close it first, then scroll (they pass `force`, so the pause
 * never swallows the scroll).
 */
export function MobileNav() {
  const dialog = useRef<HTMLDialogElement>(null);

  const open = () => {
    dialog.current?.showModal();
    getLenis()?.stop();
  };
  const close = () => dialog.current?.close();

  return (
    <>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className="-mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[5px] md:hidden"
      >
        <span className="sr-only">Open menu</span>
        <span aria-hidden="true" className="block h-[1.6px] w-[22px] bg-fg" />
        <span aria-hidden="true" className="block h-[1.6px] w-[22px] bg-fg" />
      </button>

      <dialog
        ref={dialog}
        aria-label="Menu"
        data-tone="navy"
        onClose={() => getLenis()?.start()}
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === dialog.current) close();
        }}
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,100%)] max-w-none bg-accent p-0 text-ground backdrop:bg-fg/50"
      >
        <div className="flex h-full flex-col px-6 pt-5 pb-8">
          <div className="flex items-center justify-between">
            <span className="label opacity-60">Menu</span>
            <button
              type="button"
              onClick={close}
              className="-mr-2 flex h-11 w-11 items-center justify-center"
            >
              <span className="sr-only">Close menu</span>
              <svg
                aria-hidden="true"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                stroke="currentColor"
                strokeWidth="1.6"
              >
                <path d="M3 3l12 12M15 3 3 15" />
              </svg>
            </button>
          </div>

          <nav aria-label="Mobile" className="mt-10">
            <ul className="border-t border-ground/20">
              {site.nav.map((item) => (
                <li key={item.href} className="border-b border-ground/20">
                  <SectionLink
                    href={item.href}
                    onClick={close}
                    className="block py-4 font-display text-3xl font-bold tracking-tight"
                  >
                    {item.label}
                  </SectionLink>
                </li>
              ))}
            </ul>
          </nav>

          <SectionLink
            href={site.contactHref}
            onClick={close}
            className="mt-auto bg-ground px-6 py-5 text-center label text-accent"
          >
            Start a project
          </SectionLink>
        </div>
      </dialog>
    </>
  );
}
