import type { MetadataRoute } from 'next';
import { site } from '@/content/site';

/** Names and colours for "add to home screen" and for search engines. */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.role}`,
    short_name: site.shortName,
    description: site.seo.description,
    start_url: '/',
    display: 'browser',
    background_color: '#0b0b0c',
    theme_color: '#0b0b0c',
    icons: [{ src: '/icon.svg', sizes: 'any', type: 'image/svg+xml' }],
  };
}
