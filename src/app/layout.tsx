import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { SmoothScroll } from '@/components/site/smooth-scroll';
import { site } from '@/content/site';
import { manrope, plexMono, unbounded } from '@/lib/fonts';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — ${site.role}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: site.name,
    title: `${site.name} — ${site.role}`,
    description: site.description,
    url: '/',
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
};

const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: site.name,
  alternateName: site.shortName,
  jobTitle: site.role,
  url: site.url,
  email: `mailto:${site.email}`,
  sameAs: site.socials.map((s) => s.href),
  worksFor: { '@type': 'Organization', name: site.studio },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${unbounded.variable} ${manrope.variable} ${plexMono.variable}`}
    >
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only z-50 bg-ground px-4 py-3 label text-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Static, author-controlled JSON; nothing user-supplied reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </body>
    </html>
  );
}
