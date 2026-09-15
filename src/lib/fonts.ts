import { Bricolage_Grotesque, Instrument_Sans } from 'next/font/google';

/**
 * Both faces are variable, so `weight` is deliberately omitted — one variable
 * file covers the whole range and is smaller than the four static instances
 * the design uses. (`axes` may only be passed when `weight` is omitted.)
 *
 * `axes: ['opsz']` matters more than it looks. `next/font/google` ships only
 * the `wght` axis by default and pins everything else at its default, and
 * Bricolage's default optical size is at the *text* end of its 12–96 range.
 * Without it the 7rem hero headline renders in the text cut — looser spacing,
 * softer joins — rather than the display cut the face was drawn for. Browsers
 * apply `font-optical-sizing: auto` by default, so large text picks up the
 * display cut with no further CSS.
 *
 * `wdth` is available on both faces and deliberately not requested: nothing in
 * the design varies width, so it would be pure payload.
 */
export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
  axes: ['opsz'],
});

export const instrument = Instrument_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-instrument',
});
