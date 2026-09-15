'use client';

import Link from 'next/link';
import { useRef } from 'react';
import { site } from '@/content/site';

/**
 * The one genuinely interactive widget on the site.
 *
 * Built on a native <dialog> opened with `showModal()`, which gives focus
 * trapping, Escape-to-close, an inert background and top-layer stacking from
 * the platform — no focus-trap library, no scroll-lock hack, no portal.
 * Links close the dialog before the hash navigation lands.
 */
export function MobileNav() {
  const dialog = useRef<HTMLDialogElement>(null);

  const open = () => dialog.current?.showModal();
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
        <span aria-hidden="true" className="block h-[1.6px] w-[22px] bg-ink" />
        <span aria-hidden="true" className="block h-[1.6px] w-[22px] bg-ink" />
      </button>

      <dialog
        ref={dialog}
        aria-label="Menu"
        data-tone="navy"
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === dialog.current) close();
        }}
        className="m-0 ml-auto h-dvh max-h-none w-[min(22rem,100%)] max-w-none bg-navy p-0 text-paper backdrop:bg-ink/50"
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
            <ul className="border-t border-paper/20">
              {site.nav.map((item) => (
                <li key={item.href} className="border-b border-paper/20">
                  <Link
                    href={item.href}
                    onClick={close}
                    className="block py-4 font-display text-3xl font-bold tracking-tight"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <Link
            href={site.contactHref}
            onClick={close}
            className="mt-auto bg-paper px-6 py-5 text-center label text-navy"
          >
            Start a project
          </Link>
        </div>
      </dialog>
    </>
  );
}
