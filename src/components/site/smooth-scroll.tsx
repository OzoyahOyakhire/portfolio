'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { setLenis } from '@/lib/smooth-scroll';

/**
 * Eases wheel scrolling so the page glides instead of stepping, which is most
 * of what reads as "smooth" — especially with a notched mouse wheel on Windows.
 *
 * Renders nothing and wraps nothing, so every other component stays a Server
 * Component. The native scrollbar, keyboard scrolling, find-in-page and touch
 * scrolling are left alone (`syncTouch: false` keeps phones on native
 * momentum). Skipped entirely for visitors who prefer reduced motion, and torn
 * down live if that preference changes.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let instance: Lenis | null = null;

    const start = () => {
      instance = new Lenis({
        autoRaf: true,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        stopInertiaOnNavigate: true,
      });
      setLenis(instance);
    };

    const stop = () => {
      instance?.destroy();
      instance = null;
      setLenis(null);
    };

    const sync = () => (query.matches ? stop() : start());

    sync();
    query.addEventListener('change', sync);
    return () => {
      query.removeEventListener('change', sync);
      stop();
    };
  }, []);

  return null;
}
