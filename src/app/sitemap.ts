import type { MetadataRoute } from 'next';
import { projects } from '@/content/projects';
import { absoluteUrl } from '@/lib/site-url';

/** The build time: every page is static, so this is when it last changed. */
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: absoluteUrl('/'), lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: absoluteUrl('/services'), lastModified, changeFrequency: 'monthly', priority: 0.9 },
    ...projects.map((project) => ({
      url: absoluteUrl(`/work/${project.slug}`),
      lastModified,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
