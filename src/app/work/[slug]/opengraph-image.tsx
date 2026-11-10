import { ImageResponse } from 'next/og';
import { getProject, projects } from '@/content/projects';
import { site } from '@/content/site';

/**
 * A link-preview card per case study: the project's name, what it is, and the
 * one-line summary, in the same look as the home card.
 */
export const alt = 'Case study';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function CaseStudyImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  const index = projects.findIndex((p) => p.slug === slug);

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        background: '#0b0b0c',
        color: '#f2f0ea',
        padding: '64px 72px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 28 }}>
        <span style={{ display: 'flex', fontWeight: 700, fontSize: 34 }}>
          ozed<span style={{ color: '#ff4a1c' }}>/</span>
        </span>
        <span style={{ color: '#8c8a84' }}>
          Case study {String(index + 1).padStart(2, '0')}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        <div style={{ display: 'flex', fontSize: 28, color: '#ff4a1c' }}>
          {project ? `${project.category} · ${project.year}` : site.role}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 84,
            fontWeight: 800,
            lineHeight: 1.02,
            letterSpacing: -2,
          }}
        >
          {project?.title ?? site.name}
        </div>
        {project ? (
          <div
            style={{
              display: 'flex',
              fontSize: 32,
              lineHeight: 1.4,
              color: '#c9c6be',
              maxWidth: 960,
            }}
          >
            {project.summary}
          </div>
        ) : null}
      </div>

      <div style={{ display: 'flex', fontSize: 26, color: '#8c8a84' }}>
        {site.name} · {site.role}
      </div>
    </div>,
    size,
  );
}
