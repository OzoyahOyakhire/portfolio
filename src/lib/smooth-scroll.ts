import type Lenis from 'lenis';

/**
 * One Lenis instance for the page, created by <SmoothScroll /> and shared here
 * so links and the mobile drawer can drive it without a React context.
 * `null` when the visitor prefers reduced motion — callers fall back to a
 * native jump.
 */
let lenis: Lenis | null = null;

export const setLenis = (instance: Lenis | null) => {
  lenis = instance;
};

export const getLenis = () => lenis;

/** Fast start, long settle: the page moves on the click frame, then glides in. */
const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - 2 ** (-10 * t));

/** Longer trips take a little longer, but never feel sluggish. */
const durationFor = (distance: number) => Math.min(1.25, Math.max(0.6, 0.5 + distance / 4000));

const headerHeight = () =>
  document.querySelector<HTMLElement>('[data-site-header]')?.offsetHeight ?? 0;

/**
 * Scrolls to `#id` (or to the top for an empty hash) on the current page.
 * Returns false when there is no such target, so the caller can let normal
 * navigation happen instead.
 */
export function scrollToHash(hash: string): boolean {
  const id = decodeURIComponent(hash.replace(/^#/, ''));
  const target = id ? document.getElementById(id) : null;
  if (id && !target) return false;

  const offset = -headerHeight();
  const destination = target ? target.getBoundingClientRect().top + window.scrollY + offset : 0;

  const settle = () => {
    // Move focus with the view so the next Tab continues from the section,
    // not from the nav link the visitor just clicked.
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  };

  if (lenis) {
    lenis.scrollTo(target ?? 0, {
      offset: target ? offset : 0,
      duration: durationFor(Math.abs(destination - window.scrollY)),
      easing: easeOutExpo,
      // The drawer stops Lenis while it is open; don't let that swallow this.
      force: true,
      onComplete: settle,
    });
  } else {
    window.scrollTo({ top: destination, behavior: 'instant' });
    settle();
  }

  const url = id ? `#${id}` : window.location.pathname;
  if (window.location.hash !== (id ? `#${id}` : '')) window.history.pushState(null, '', url);
  return true;
}
