import type { CSSProperties } from 'react';

/**
 * Sets `--i`, the stagger slot read by the scroll reveals in styles/scroll.css
 * and the post-intro entrance in styles/intro.css.
 *
 * Scroll-driven animations have no delay to stagger with — a delay is a time
 * offset and these run on scroll, not time — so `--i` shifts each item's
 * *range* instead, and a row resolves one item at a time as it crosses.
 */
export const stagger = (i: number) => ({ '--i': i }) as CSSProperties;
