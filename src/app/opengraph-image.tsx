import { ImageResponse } from 'next/og';
import { home } from '@/content/home';
import { site } from '@/content/site';
import { siteUrl } from '@/lib/site-url';

/**
 * The link-preview card for the home page (LinkedIn, X, WhatsApp, Slack…).
 * Generated at build time in the site's own look: near-black ground, the
 * headline with its accent line, and a faint field of code glyphs.
 *
 * Uses ImageResponse's built-in face, which ships with Next and needs no
 * network, so the build works offline.
 */
export const alt = `${site.name} — ${site.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const GLYPHS = '{ } < > / ; = 0 1 ( ) [ ] # * + ';

export default function OpengraphImage() {
  const headline = home.hero.headline;
  const host = siteUrl.replace(/^https?:\/\//, '');

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
        position: 'relative',
      }}
    >
      {/* The glyph field, as a few faint rows down the right-hand side. */}
      <div
        style={{
          position: 'absolute',
          top: 40,
          right: 0,
          width: 440,
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          fontSize: 22,
          letterSpacing: 6,
          color: 'rgba(242,240,234,0.16)',
        }}
      >
        {Array.from({ length: 20 }, (_, i) => (
          <div key={i} style={{ display: 'flex', whiteSpace: 'nowrap' }}>
            {(GLYPHS.repeat(4) as string).slice((i * 3) % 16, ((i * 3) % 16) + 40)}
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', fontSize: 34, fontWeight: 700 }}>
        ozed<span style={{ color: '#ff4a1c' }}>/</span>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          fontSize: 76,
          fontWeight: 800,
          lineHeight: 1.02,
          letterSpacing: -2,
        }}
      >
        {headline.map((line, i) => (
          <div
            key={line}
            style={{
              display: 'flex',
              color: i === headline.length - 1 ? '#ff4a1c' : '#f2f0ea',
            }}
          >
            {line}
          </div>
        ))}
      </div>

      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 26,
          color: '#8c8a84',
        }}
      >
        <span>
          {site.name} · {site.role}
        </span>
        <span>{host}</span>
      </div>
    </div>,
    size,
  );
}
