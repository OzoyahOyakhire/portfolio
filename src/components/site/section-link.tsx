'use client';

import type { Route } from 'next';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { ComponentProps, MouseEvent } from 'react';
import { scrollToHash } from '@/lib/smooth-scroll';

type SectionLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & { href: Route };

/**
 * A link to a section, e.g. `/#work`.
 *
 * A plain <Link> to a hash on the current page still runs a full router
 * navigation — a React transition and commit — before Next scrolls, which is
 * the pause you feel between clicking and moving. On the same page this skips
 * the router and scrolls on the click frame. From any other page it behaves
 * exactly like <Link>, so `/#work` from a case study still navigates home.
 *
 * Modified clicks (new tab, new window) are left to the browser.
 */
export function SectionLink({ href, onClick, ...rest }: SectionLinkProps) {
  const pathname = usePathname();

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) return;
    if (
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey
    ) {
      return;
    }

    const url = new URL(href, window.location.href);
    if (url.pathname !== pathname) return;

    // Next's <Link> checks `defaultPrevented` and skips its own navigation.
    if (scrollToHash(url.hash)) event.preventDefault();
  };

  return <Link href={href} onClick={handleClick} {...rest} />;
}
