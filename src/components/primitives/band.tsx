import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';
import { cx } from '@/lib/cx';

export type Tone = 'paper' | 'bone' | 'navy' | 'ink';

const grounds: Record<Tone, string> = {
  paper: 'bg-ground text-fg',
  bone: 'bg-raised text-fg',
  navy: 'bg-accent text-ground',
  ink: 'bg-fg text-ground',
};

interface BandProps extends Omit<ComponentPropsWithoutRef<'section'>, 'className'> {
  tone?: Tone;
  as?: ElementType;
  /** Skip the inner container — for a band that manages its own layout. */
  bleed?: boolean;
  className?: string;
  innerClassName?: string;
  children: ReactNode;
}

/**
 * A full-width ground with the content container *inside* it.
 *
 * Inverting the usual nesting is what makes full-bleed colour free: nothing is
 * contained at the top level, so a band never has to break out of anything.
 * No `100vw`, so no scrollbar overflow and no need for `overflow-x: hidden`
 * on the body — which would break the sticky header.
 *
 * `data-tone` is load-bearing, not decoration. It drives the focus-ring colour
 * (globals.css), the Sub-Dot hover colour (logo.css) and the rule/label
 * opacities, so none of those need a prop passed down.
 */
export function Band({
  tone = 'paper',
  as: As = 'section',
  bleed = false,
  className,
  innerClassName,
  children,
  ...rest
}: BandProps) {
  return (
    <As data-tone={tone} className={cx(grounds[tone], className)} {...rest}>
      {bleed ? (
        children
      ) : (
        <div className={cx('mx-auto w-full max-w-editorial px-6 md:px-10', innerClassName)}>
          {children}
        </div>
      )}
    </As>
  );
}
