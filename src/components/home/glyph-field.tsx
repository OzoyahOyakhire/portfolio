'use client';

import { useEffect, useRef } from 'react';
import { cx } from '@/lib/cx';

const GLYPHS = '{}<>/;=01()[]#*+';
const STEP = 20;

type Variant = 'hero' | 'strip';

/**
 * A field of code glyphs drifting like loose fabric, drawn on a 2D canvas.
 *
 * - The cursor pushes glyphs aside and warms the nearest ones to the accent.
 * - `hero`: as the hero scrolls out of view the wave flattens and the glyphs
 *   settle onto a still grid — the source "compiles".
 * - `strip`: the contact bookend. It does the reverse, loosening as it
 *   scrolls into view, and is tinted with the accent.
 *
 * Purely decorative (`aria-hidden`). It only animates while on screen, draws a
 * single still frame for visitors who prefer reduced motion, and costs nothing
 * on the server — it is an empty canvas until mount.
 */
export function GlyphField({
  variant = 'hero',
  className,
}: {
  variant?: Variant;
  className?: string;
}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const host = canvas.parentElement?.parentElement ?? canvas;
    let width = 0;
    let height = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let t = 0;
    let raf = 0;
    let visible = false;

    const size = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = '12px "IBM Plex Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
    };

    const clamp = (v: number) => Math.max(0, Math.min(1, v));
    const ease = (x: number) => (x < 0.5 ? 2 * x * x : 1 - (-2 * x + 2) ** 2 / 2);

    /** 1 = loose fabric of code, 0 = compiled grid. */
    const looseness = () => {
      const r = canvas.getBoundingClientRect();
      const vh = window.innerHeight;
      return variant === 'hero'
        ? 1 - ease(clamp(-r.top / (r.height * 0.8)))
        : 0.15 + 0.85 * ease(clamp((vh - r.top) / (vh * 0.9)));
    };

    const draw = () => {
      const k = reduce ? (variant === 'hero' ? 1 : 0.6) : looseness();
      ctx.clearRect(0, 0, width, height);
      for (let y = STEP / 2; y < height; y += STEP) {
        for (let x = STEP / 2; x < width; x += STEP) {
          const wave = Math.sin(x * 0.011 + t) * Math.cos(y * 0.014 + t * 0.7);
          const dx = x - mouseX;
          const dy = y - mouseY;
          const d = Math.hypot(dx, dy) || 1;
          const push = d < 140 ? (1 - d / 140) * 22 * k : 0;
          const px = x + (dx / d) * push;
          const py = y + wave * 9 * k + (dy / d) * push;
          const a = (0.08 + (wave + 1) * 0.2) * (0.35 + 0.65 * k) + (1 - k) * 0.05;
          const lit = ((x * 7 + y * 13) | 0) % 83 === 0 || (d < 70 && k > 0.3);
          ctx.fillStyle = lit
            ? `rgba(255,74,28,${Math.min(1, a + 0.5)})`
            : variant === 'strip'
              ? `rgba(255,74,28,${a})`
              : `rgba(242,240,234,${a})`;
          ctx.fillText(GLYPHS[(((x + y * 3) / STEP) | 0) % GLYPHS.length]!, px, py);
        }
      }
    };

    const loop = () => {
      draw();
      t += 0.012;
      if (visible) raf = requestAnimationFrame(loop);
    };

    const onMove = (event: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouseX = event.clientX - r.left;
      mouseY = event.clientY - r.top;
    };
    const onLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };
    const onResize = () => {
      size();
      draw();
    };

    size();
    draw();

    const observer = new IntersectionObserver(([entry]) => {
      visible = Boolean(entry?.isIntersecting) && !reduce;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(loop);
    });
    observer.observe(canvas);

    window.addEventListener('resize', onResize);
    if (!reduce) {
      host.addEventListener('pointermove', onMove);
      host.addEventListener('pointerleave', onLeave);
    }
    // The mono face may arrive after first paint; redraw once it has.
    void document.fonts?.ready.then(() => {
      size();
      draw();
    });

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
    };
  }, [variant]);

  return (
    <div
      aria-hidden="true"
      className={cx(variant === 'hero' ? 'glyph-field' : 'glyph-strip', className)}
    >
      <canvas ref={ref} />
    </div>
  );
}
