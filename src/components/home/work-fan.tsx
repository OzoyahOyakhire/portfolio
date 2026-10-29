'use client';

import Image from 'next/image';
import Link from 'next/link';
import { type CSSProperties, useRef } from 'react';
import { home } from '@/content/home';
import { projects } from '@/content/projects';
import { gsap, MOTION_OK, useGSAP } from '@/lib/gsap';

/** Where each card rests in the finished fan, relative to the centre. */
function fanPosition(i: number, count: number): CSSProperties {
  const o = i - (count - 1) / 2;
  return {
    '--fan-x': `calc(${o} * min(21vw, 19rem))`,
    '--fan-y': `${Math.abs(o) * 1.75}rem`,
    '--fan-r': `${o * 6}deg`,
    zIndex: 10 - Math.round(Math.abs(o) * 2),
  } as CSSProperties;
}

/**
 * The one held moment on the page. On wide screens the section pins while
 * the visitor scrolls: the four projects rise as a stacked deck, then deal out
 * into a fan as the title arrives.
 *
 * The CSS resting state is the finished fan, and GSAP only animates *from*
 * the stacked deck back to it. So without JavaScript, below `lg`, or with
 * reduced motion, the visitor simply sees the cards laid out — no pin, no
 * empty stage.
 */
export function WorkFan() {
  const root = useRef<HTMLElement>(null);
  const { eyebrow, title } = home.work;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(`${MOTION_OK} and (min-width: 1024px)`, () => {
        const cards = gsap.utils.toArray<HTMLElement>('.fan-card');
        const centre = (cards.length - 1) / 2;
        // The same fan the CSS describes, worked out here rather than read back
        // from the stylesheet, so it is recomputed on every resize
        // (`invalidateOnRefresh`) and can never go stale.
        const fanX = (i: number) => (i - centre) * Math.min(window.innerWidth * 0.21, 304);
        const fanY = (i: number) => Math.abs(i - centre) * 28;
        const fanR = (i: number) => (i - centre) * 6;
        const tilt = (i: number) => (i % 2 ? 3 : -3);

        // GSAP owns the whole transform from here on, centring included.
        gsap.set(cards, { xPercent: -50, yPercent: -50 });

        const stacked = {
          x: (i: number) => i * 6,
          y: (i: number) => -i * 6,
          rotation: tilt,
        };

        // 1. While the section scrolls into view, the deck rises from below
        //    as a slightly messy stack and the title arrives — so the stage
        //    is never empty when the pin takes hold.
        gsap
          .timeline({
            defaults: { ease: 'power2.out' },
            scrollTrigger: {
              trigger: '.fan-stage',
              start: 'top 85%',
              end: 'top top',
              scrub: 1,
            },
          })
          .fromTo(
            cards,
            { ...stacked, y: (i: number) => 260 - i * 6, scale: 0.9, opacity: 0 },
            { ...stacked, scale: 1, opacity: 1, stagger: 0.06 },
          )
          .fromTo('.fan-title', { opacity: 0, y: 32 }, { opacity: 1, y: 0 }, '<0.2');

        // 2. Pinned: scrolling deals the stack out into the fan the CSS
        //    describes, then holds it briefly before the section releases.
        gsap
          .timeline({
            scrollTrigger: {
              trigger: '.fan-stage',
              start: 'top top',
              end: '+=140%',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          })
          .fromTo(cards, stacked, {
            x: fanX,
            y: fanY,
            rotation: fanR,
            ease: 'power3.inOut',
            stagger: 0.03,
            // Don't stamp the stacked pose now; the rise above owns the
            // cards until this part of the scroll is reached.
            immediateRender: false,
          })
          .to({}, { duration: 0.4 });

        // When the screen drops below `lg` (a resize, a tablet rotating),
        // matchMedia reverts the timelines; this also wipes every inline
        // style GSAP wrote, so the small-screen grid starts clean.
        return () => {
          gsap.set([...cards, '.fan-title'], {
            clearProps: 'transform,translate,rotate,scale,opacity',
          });
        };
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="work" aria-labelledby="work-title" className="relative">
      <div className="fan-stage mx-auto max-w-editorial px-5 pt-8 pb-16 md:px-10 lg:py-0">
        <div className="fan-title relative z-20 pt-[calc(5.25rem+4vh)] text-center max-lg:pt-0 max-lg:pb-10 max-lg:text-left">
          <p className="label text-accent">{eyebrow} · 2024 — 2026</p>
          <h2
            id="work-title"
            className="mx-auto mt-3 max-w-[16em] font-display text-[clamp(1.9rem,1.2rem+2vw,2.75rem)] leading-[1.05] font-extrabold tracking-[-0.03em] text-balance max-lg:mx-0"
          >
            {title}
          </h2>
        </div>

        <div className="fan-deck">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="fan-card"
              style={fanPosition(i, projects.length)}
            >
              {project.shot ? (
                <Image
                  src={project.shot.src}
                  alt={project.shot.alt}
                  sizes="(min-width: 1024px) 21vw, 45vw"
                  placeholder="blur"
                  className="aspect-[4/3] w-full object-cover object-top"
                />
              ) : null}
              <span className="fan-caption flex justify-between gap-2 px-0.5 pt-2.5 pb-3 label text-fg-soft transition-colors">
                <span>{String(i + 1).padStart(2, '0')}</span>
                <span className="truncate">{project.shortTitle}</span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
