import { IBM_Plex_Mono, Manrope, Unbounded } from 'next/font/google';

/**
 * Unbounded and Manrope are variable, so `weight` is omitted — one variable
 * file covers every weight the design uses and is smaller than the static
 * instances would be.
 *
 * Unbounded carries the headlines only. It is wide and heavy by design, so it
 * is never used below ~20px; everything that is read rather than seen is
 * Manrope. Plex Mono is the utility voice: eyebrows, metadata, the glyph field.
 */
export const unbounded = Unbounded({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-unbounded',
});

export const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

/** Not variable, so the two weights in use are listed. */
export const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  variable: '--font-plex-mono',
});
