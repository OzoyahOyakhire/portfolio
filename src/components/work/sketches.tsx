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
          fill="var(--color-paper)"
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
          fill="var(--color-paper)"
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
          fill="var(--color-paper)"
          strokeWidth="1.2"
        />
      </>
    ),
  },

  'whatsapp-ordering': {
    viewBox: '0 0 640 128',
    label:
      'Sketch of the ordering conversation: alternating message bubbles between a customer and the shop.',
    Art: () => (
      <>
        <rect
          x="200"
          y="14"
          width="240"
          height="100"
          fill="var(--color-paper)"
          strokeWidth="1.2"
        />
        <rect
          x="216"
          y="30"
          width="130"
          height="20"
          rx="10"
          fill="currentColor"
          fillOpacity="0.12"
          strokeWidth="1"
        />
        <rect
          x="294"
          y="58"
          width="130"
          height="20"
          rx="10"
          fill="var(--color-paper)"
          strokeWidth="1"
        />
        <rect
          x="216"
          y="86"
          width="104"
          height="20"
          rx="10"
          fill="currentColor"
          fillOpacity="0.12"
          strokeWidth="1"
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
          fill="var(--color-paper)"
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

  'spotify-rebuilt': {
    viewBox: '0 0 640 128',
    label:
      'Sketch of the streaming client: a play button, an audio waveform and a scrubber control.',
    Art: () => (
      <>
        <rect
          x="120"
          y="14"
          width="400"
          height="100"
          fill="var(--color-paper)"
          strokeWidth="1.2"
          strokeDasharray="5 5"
        />
        <circle cx="180" cy="64" r="22" strokeWidth="1.2" />
        <polygon
          points="174,54 194,64 174,74"
          fill="currentColor"
          fillOpacity="0.4"
          stroke="none"
        />
        <g strokeWidth="1.4" opacity="0.6">
          <line x1="228" y1="72" x2="228" y2="56" />
          <line x1="244" y1="76" x2="244" y2="52" />
          <line x1="260" y1="68" x2="260" y2="60" />
          <line x1="276" y1="80" x2="276" y2="48" />
          <line x1="292" y1="72" x2="292" y2="56" />
          <line x1="308" y1="78" x2="308" y2="50" />
          <line x1="324" y1="66" x2="324" y2="62" />
          <line x1="340" y1="76" x2="340" y2="52" />
        </g>
        <rect x="376" y="52" width="120" height="24" rx="12" strokeWidth="1" />
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
        fill="var(--color-paper)"
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
