import { site } from '@/content/site';

/**
 * The site's public origin, used for canonical URLs, the sitemap, robots.txt,
 * Open Graph and structured data. Search engines treat a wrong canonical as
 * "the real page is somewhere else", so this must always be the address the
 * site is actually served from.
 *
 * In order of preference:
 * 1. `NEXT_PUBLIC_SITE_URL` — set this in Vercel once a custom domain is live.
 * 2. `VERCEL_PROJECT_PRODUCTION_URL` — Vercel sets this on every build to the
 *    project's production domain (without a protocol).
 * 3. `site.url` — the fallback for local builds.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_SITE_URL;
  if (explicit) return explicit.replace(/\/+$/, '');

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel.replace(/\/+$/, '')}`;

  return site.url;
}

export const siteUrl = resolveSiteUrl();

/** An absolute URL on this site, for places that can't take a relative one. */
export const absoluteUrl = (path = '/') => new URL(path, `${siteUrl}/`).toString();
