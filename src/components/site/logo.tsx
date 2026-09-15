import { site } from '@/content/site';

/**
 * The Sub-Dot — a humanist O with a dot set beneath it.
 *
 * The O is a drawn letterform, not a stroked circle: a fixed outer ellipse with
 * a rotated inner counter cut out of it, giving weight at the flanks, lightness
 * at crown and foot, and a stress axis tilted −11°.
 *
 * Two optical cuts ship, the way a typeface ships optical sizes:
 *   drawn (≥ 24px) — contrast 1.29:1, dot r 6.5
 *   small (< 24px) — monoline ring, larger dot, since the drawn cut's waist
 *                    falls under two device pixels and turns to mud
 *
 * Server Component. The original used `useId()` for per-instance mask ids,
 * which forces `'use client'`. The mask geometry is identical for every
 * instance, so the masks are hoisted into <LogoDefs /> — rendered once in the
 * root layout — and referenced by fixed id instead.
 */

const CUT_THRESHOLD = 24;

export const LOGO_MASK = {
  counter: 'sub-dot-counter',
  sweep: 'sub-dot-sweep',
} as const;

interface LogoProps {
  /** Rendered size in px. Also selects the optical cut. */
  size?: number;
  /** Play the entrance once. Use on one instance per page. */
  animate?: boolean;
  cut?: 'drawn' | 'small';
  className?: string;
  title?: string;
}

export function Logo({
  size = 40,
  animate = false,
  cut,
  className,
  title = site.name,
}: LogoProps) {
  const resolved = cut ?? (size < CUT_THRESHOLD ? 'small' : 'drawn');

  if (resolved === 'small') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        role="img"
        aria-label={title}
        className={className}
      >
        <ellipse
          cx="50"
          cy="36"
          rx="27.5"
          ry="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="13"
        />
        <circle cx="50" cy="85" r="9" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      role="img"
      aria-label={title}
      className={className}
    >
      <g mask={animate ? `url(#${LOGO_MASK.sweep})` : undefined}>
        <ellipse
          cx="50"
          cy="40"
          rx="31"
          ry="31.5"
          fill="currentColor"
          mask={`url(#${LOGO_MASK.counter})`}
        />
      </g>
      <circle
        cx="50"
        cy="85"
        r="6.5"
        fill="currentColor"
        className={animate ? 'jo-dot jo-dot-in' : 'jo-dot'}
      />
    </svg>
  );
}

/**
 * Mask definitions for every <Logo /> on the page. Render exactly once.
 *
 * Hidden with zero size rather than `display: none` — Safari and Firefox have
 * historically dropped mask and gradient definitions inside a `display: none`
 * SVG, which would leave every logo on the page rendering as a solid disc.
 */
export function LogoDefs() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="0"
      height="0"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}
    >
      <defs>
        <mask id={LOGO_MASK.counter}>
          <ellipse cx="50" cy="40" rx="31" ry="31.5" fill="#fff" />
          <ellipse
            cx="50"
            cy="40"
            rx="18.5"
            ry="22"
            fill="#000"
            transform="rotate(-11 50 40)"
          />
        </mask>
        <mask id={LOGO_MASK.sweep}>
          <circle
            cx="50"
            cy="40"
            r="31"
            fill="none"
            stroke="#fff"
            strokeWidth="36"
            pathLength={100}
            transform="rotate(-90 50 40)"
            className="jo-sweep"
          />
        </mask>
      </defs>
    </svg>
  );
}
