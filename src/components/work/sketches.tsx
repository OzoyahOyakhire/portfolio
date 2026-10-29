import type { ComponentType } from 'react';

/**
 * Interface sketches — the design's finished treatment for project imagery,
 * not placeholders standing in for screenshots. A screenshot's arbitrary
 * palette and type would fight the editorial layout; a line drawing in
 * `currentColor` reads as part of it, and works on any tone.
 *
 * Each carries a real description, because it is the only image of the work.
 */

interface SketchProps {
  className?: string;
}

interface Sketch {
  viewBox: string;
  label: string;
  Art: ComponentType;
}

function Frame({
  viewBox,
  label,
  className,
  children,
}: {
  viewBox: string;
  label: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      preserveAspectRatio="xMidYMid meet"
      className={className}
      fill="none"
      stroke="currentColor"
    >
      {children}
    </svg>
  );
}

const sketches: Record<string, Sketch> = {
  'livestock-cost-estimator': {
    viewBox: '0 0 640 372',
    label:
      'Sketch of the cost estimator dashboard: a navigation rail on the left, a projection chart with the estimate line and its upper and lower range, and two summary panels beneath.',
    Art: () => (
      <>
        <rect
          x="46"
          y="40"
          width="548"
          height="292"
          fill="var(--color-ground)"
          strokeWidth="1.2"
        />
        <line x1="46" y1="76" x2="594" y2="76" strokeWidth="1" />
        <circle cx="64" cy="58" r="4" strokeWidth="1" />
        <circle cx="78" cy="58" r="4" strokeWidth="1" />
        <rect x="66" y="96" width="140" height="216" strokeWidth="1" />
        <g strokeWidth="1" opacity="0.5">
          <line x1="80" y1="118" x2="192" y2="118" />
          <line x1="80" y1="136" x2="168" y2="136" />
          <line x1="80" y1="154" x2="184" y2="154" />
          <line x1="80" y1="180" x2="192" y2="180" />
          <line x1="80" y1="198" x2="152" y2="198" />
        </g>
        <rect x="226" y="96" width="348" height="128" strokeWidth="1" />
        <polyline
          points="242,206 288,186 334,192 380,158 426,168 472,126 518,138 558,104"
          strokeWidth="2"
        />
        <polyline
          points="242,220 288,204 334,210 380,182 426,192 472,158 518,170 558,142"
          strokeWidth="0.9"
          strokeDasharray="4 4"
          opacity="0.7"
        />
        <polyline
          points="242,190 288,166 334,172 380,132 426,142 472,92 518,104 558,62"
          strokeWidth="0.9"
          strokeDasharray="4 4"
          opacity="0.7"
        />
        <circle cx="558" cy="104" r="4.5" fill="currentColor" stroke="none" />
        <rect x="226" y="240" width="166" height="72" strokeWidth="1" />
        <rect
          x="408"
          y="240"
          width="166"
          height="72"
          fill="currentColor"
          fillOpacity="0.12"
          strokeWidth="1"
        />
      </>
    ),
  },

  'phc-workhub': {
    viewBox: '0 0 640 128',
    label:
      'Sketch of the document pipeline: a form feeding a processing step, which produces a finished document.',
    Art: () => (
      <>
        <rect
          x="40"
          y="18"
          width="200"
          height="92"
          fill="var(--color-ground)"
          strokeWidth="1.2"
        />
        <g strokeWidth="1" opacity="0.55">
          <line x1="58" y1="40" x2="200" y2="40" />
          <line x1="58" y1="58" x2="176" y2="58" />
          <line x1="58" y1="76" x2="192" y2="76" />
        </g>
        <path d="M256 64h52M298 58l10 6-10 6" strokeWidth="1.4" />
        <rect
          x="324"
          y="18"
          width="120"
          height="92"
          fill="currentColor"
          fillOpacity="0.12"
          strokeWidth="1.2"
        />
        <path d="M460 64h52M502 58l10 6-10 6" strokeWidth="1.4" />
        <rect
          x="528"
          y="30"
          width="72"
          height="68"
          fill="var(--color-ground)"
          strokeWidth="1.2"
        />
      </>
    ),
  },

  'aquimoda-london': {
    viewBox: '0 0 640 128',
    label:
      'Sketch of the Aquimoda site: a header bar above a feature image, a block of copy and a booking panel.',
    Art: () => (
      <>
        <rect
          x="40"
          y="14"
          width="560"
          height="100"
          fill="var(--color-ground)"
          strokeWidth="1.2"
        />
        <line x1="40" y1="42" x2="600" y2="42" strokeWidth="1" />
        <rect
          x="64"
          y="60"
          width="150"
          height="38"
          fill="currentColor"
          fillOpacity="0.12"
          strokeWidth="1"
        />
        <g strokeWidth="1" opacity="0.5">
          <line x1="240" y1="68" x2="404" y2="68" />
          <line x1="240" y1="82" x2="358" y2="82" />
          <line x1="240" y1="96" x2="386" y2="96" />
        </g>
        <rect x="436" y="60" width="140" height="38" strokeWidth="1" />
      </>
    ),
  },
};

const generic: Sketch = {
  viewBox: '0 0 640 128',
  label: 'Sketch of an application window.',
  Art: () => (
    <>
      <rect
        x="120"
        y="14"
        width="400"
        height="100"
        fill="var(--color-ground)"
        strokeWidth="1.2"
      />
      <line x1="120" y1="40" x2="520" y2="40" strokeWidth="1" />
    </>
  ),
};

/** Falls back to a generic frame, so a new project without art still renders. */
export function ProjectSketch({ slug, className }: SketchProps & { slug: string }) {
  const { viewBox, label, Art } = sketches[slug] ?? generic;
  return (
    <Frame viewBox={viewBox} label={label} className={className}>
      <Art />
    </Frame>
  );
}
