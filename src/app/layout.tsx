import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { Opening } from '@/components/site/opening';
import { SiteFooter } from '@/components/site/site-footer';
import { SiteHeader } from '@/components/site/site-header';
import { SmoothScroll } from '@/components/site/smooth-scroll';
import { offer } from '@/content/offer';
import { site } from '@/content/site';
import { stack } from '@/content/stack';
import { manrope, plexMono, unbounded } from '@/lib/fonts';
import { absoluteUrl, siteUrl } from '@/lib/site-url';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: site.seo.title,
    template: `%s — ${site.name}`,
  },
  description: site.seo.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: siteUrl }],
  creator: site.name,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    siteName: site.name,
    title: site.seo.title,
    description: site.seo.description,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: site.seo.title,
    description: site.seo.description,
    creator: site.seo.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  // Stop iOS turning the email address and numbers into blue system links.
  formatDetection: { email: false, telephone: false, address: false },
};

export const viewport: Viewport = {
  themeColor: '#0b0b0c',
  colorScheme: 'dark',
};

/**
 * Structured data for the whole site: who the person is and that this is
 * their site. `@id`s let the case studies point back at the same Person
 * instead of describing them again.
 */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': absoluteUrl('/#website'),
      url: absoluteUrl('/'),
      name: site.name,
      description: site.seo.description,
      inLanguage: 'en',
      publisher: { '@id': absoluteUrl('/#person') },
    },
    {
      '@type': 'Person',
      '@id': absoluteUrl('/#person'),
      name: site.name,
      alternateName: site.shortName,
      jobTitle: site.seo.jobTitle,
      description: site.seo.description,
      url: absoluteUrl('/'),
      email: `mailto:${site.email}`,
      address: { '@type': 'PostalAddress', addressCountry: 'NG' },
      areaServed: [{ '@type': 'Country', name: 'Nigeria' }, 'Worldwide'],
      // Points at the Service entries on /services, which describe each one.
      makesOffer: offer.services.map((service) => ({
        '@type': 'Offer',
        itemOffered: { '@id': absoluteUrl(`/services#${service.id}`) },
      })),
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'degree',
        name: 'BSc Computer Science',
      },
      knowsAbout: stack.groups.flatMap((group) => group.items),
      sameAs: site.socials.map((s) => s.href),
      worksFor: { '@type': 'Organization', name: site.studio },
    },
  ],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    // `suppressHydrationWarning`: the opening screen's inline script may stamp
    // `data-opening` on <html> before React hydrates.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${unbounded.variable} ${manrope.variable} ${plexMono.variable}`}
    >
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only z-50 bg-ground px-4 py-3 label text-accent focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <Opening />
        <SmoothScroll />
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
        <script
          type="application/ld+json"
          // Static, author-controlled JSON; nothing user-supplied reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
