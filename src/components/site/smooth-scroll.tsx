'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { setLenis } from '@/lib/smooth-scroll';

/**
 * Eases wheel scrolling so the page glides instead of stepping, which is most
 * of what reads as "smooth" — especially with a notched mouse wheel on Windows.
 *
 * Lenis runs on GSAP's ticker rather than its own rAF loop, and reports every
 * scroll to ScrollTrigger. Without that bridge the pinned work section and the
 * scrubbed reveals would read the scroll position one frame late and visibly
 * lag behind the page.
 *
 * Renders nothing and wraps nothing, so every other component stays a Server
 * Component. Touch scrolling is left native (`syncTouch: false`). Skipped
 * entirely for visitors who prefer reduced motion, and torn down live if that
 * preference changes.
 */
export function SmoothScroll() {
  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)');
    let instance: Lenis | null = null;
    const raf = (time: number) => instance?.raf(time * 1000);

    const start = () => {
      instance = new Lenis({
        autoRaf: false,
        lerp: 0.1,
        smoothWheel: true,
        syncTouch: false,
        stopInertiaOnNavigate: true,
      });
      instance.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(raf);
      gsap.ticker.lagSmoothing(0);
      setLenis(instance);
    };

    const stop = () => {
      gsap.ticker.remove(raf);
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
