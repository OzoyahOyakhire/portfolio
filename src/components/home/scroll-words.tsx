'use client';

import { useRef } from 'react';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';

/**
 * Paragraphs that brighten word by word as they scroll through the viewport,
 * so the text appears to be read aloud as you go.
 *
 * Server-rendered at full strength: GSAP dims the words only once it is
 * running, and only when motion is welcome. If the script never runs, the
 * text is simply there.
 */
export function ScrollWords({
  paragraphs,
  className,
}: {
  paragraphs: readonly string[];
  className?: string;
}) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MOTION_OK, () => {
        gsap.fromTo(
          '.scroll-word',
          // Dimmed, never faint: still readable before the sweep reaches it.
          { opacity: 0.45 },
          {
            opacity: 1,
            ease: 'none',
            stagger: 0.1,
            scrollTrigger: {
              trigger: root.current,
              // Fully lit by the time the last line is comfortably on screen,
              // rather than only once it has scrolled up past the middle.
              start: 'top 85%',
              end: 'bottom 80%',
              scrub: true,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      {paragraphs.map((paragraph) => (
        <p key={paragraph}>
          {paragraph.split(' ').map((word, i) => (
            <span key={i} className="scroll-word">
              {word}{' '}
            </span>
          ))}
        </p>
      ))}
    </div>
  );
}
