import type { SVGProps } from 'react';

/**
 * The four glyphs the site needs, drawn on a 16px grid with square caps to
 * match the Swiss line weight. Lucide's rounded 2px house style fights it,
 * and pulling a library in for four icons isn't worth the dependency.
 *
 * Decorative by default (`aria-hidden`); the adjacent text carries the meaning.
 */
type IconProps = Omit<SVGProps<SVGSVGElement>, 'children'>;

const base: IconProps = {
  width: 16,
  height: 16,
  viewBox: '0 0 16 16',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.5,
  strokeLinecap: 'square',
  'aria-hidden': true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 8h10M9 4.5 12.5 8 9 11.5" />
    </svg>
  );
}

export function ArrowDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 2.5v10M4.5 9 8 12.5 11.5 9" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 11.5l7-7M5.5 4.5h6v6" />
    </svg>
  );
}

export function ArrowLeft(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M13.5 8h-10M7 4.5 3.5 8 7 11.5" />
    </svg>
  );
}
