'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';

/**
 * A word in the headline that cycles through `words`, each one sliding up out
 * of a clipped slot as the next slides in. The slot's width eases to fit the
 * incoming word, so the rest of the line moves smoothly instead of jumping.
 *
 * - Only the first word is real text, so search engines and screen readers
 *   read the headline as written ("…build software people…"). The other
 *   words are drawn by CSS from `data-word` (pseudo-element text is not
 *   indexed) and are `aria-hidden`.
 * - Without JavaScript, or for visitors who prefer reduced motion, it simply
 *   shows the first word and never moves.
 * - It pauses while the tab is hidden, so it doesn't race through words in the
 *   background.
 */
export function RotatingWord({
  words,
  interval = 2600,
}: {
  words: readonly string[];
  interval?: number;
}) {
  // `previous` is the word sliding out, so it can animate up and away rather
  // than vanishing.
  const [{ index, previous }, setTurn] = useState<{ index: number; previous: number | null }>({
    index: 0,
    previous: null,
  });
  const [widths, setWidths] = useState<number[]>([]);
  const items = useRef<(HTMLSpanElement | null)[]>([]);

  // Measure every word at its natural width, and again whenever the type
  // could have changed size: the real font arriving, or a resize crossing a
  // breakpoint in the fluid headline scale.
  useLayoutEffect(() => {
    const measure = () => setWidths(items.current.map((el) => el?.scrollWidth ?? 0));
    measure();
    void document.fonts?.ready.then(measure);
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, [words]);

  useEffect(() => {
    if (words.length < 2) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let timer = 0;
    const tick = () =>
      setTurn((turn) => ({ previous: turn.index, index: (turn.index + 1) % words.length }));
    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(tick, interval);
    };
    const onVisibility = () => (document.hidden ? window.clearInterval(timer) : start());

    // Hold the first word until the opening screen has cleared, so visitors
    // actually see "software" before it starts to change.
    const openingDelay =
      parseFloat(
        getComputedStyle(document.documentElement).getPropertyValue('--opening-delay'),
      ) || 0;
    const firstStart = window.setTimeout(start, openingDelay * 1000);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearTimeout(firstStart);
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [words, interval]);

  const width = widths[index];

  return (
    <span className="rotator" style={width ? { width } : undefined}>
      {words.map((word, i) => (
        <span
          key={word}
          ref={(el) => {
            items.current[i] = el;
          }}
          aria-hidden={i === 0 ? undefined : true}
          data-word={i === 0 ? undefined : word}
          className="rotator-word"
          data-state={i === index ? 'in' : i === previous ? 'out' : undefined}
        >
          {i === 0 ? word : null}
        </span>
      ))}
    </span>
  );
}
