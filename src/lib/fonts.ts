import localFont from 'next/font/local';

/**
 * Self-hosted from `src/fonts` (Latin subset, SIL Open Font License — see
 * `src/fonts/OFL.txt`) rather than `next/font/google`.
 *
 * `next/font/google` downloads the files from fonts.gstatic.com at build
 * time, so any network that can't reach Google fails the whole build. Local
 * files build anywhere, and `next/font/local` still preloads them and
 * generates size-matched fallbacks, so there is no layout shift on load.
 *
 * Unbounded carries the headlines only. It is wide and heavy by design, so it
 * is never used below ~20px; everything that is read rather than seen is
 * Manrope. Plex Mono is the utility voice: eyebrows, metadata, the glyph field.
 */
export const unbounded = localFont({
  src: '../fonts/unbounded-latin-wght-normal.woff2',
  weight: '200 900',
  display: 'swap',
  variable: '--font-unbounded',
});

export const manrope = localFont({
  src: '../fonts/manrope-latin-wght-normal.woff2',
  weight: '200 800',
  display: 'swap',
  variable: '--font-manrope',
});

export const plexMono = localFont({
  src: [
    { path: '../fonts/ibm-plex-mono-latin-400-normal.woff2', weight: '400' },
    { path: '../fonts/ibm-plex-mono-latin-500-normal.woff2', weight: '500' },
  ],
  display: 'swap',
  variable: '--font-plex-mono',
  fallback: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
});
