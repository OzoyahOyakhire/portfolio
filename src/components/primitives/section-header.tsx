import { cx } from '@/lib/cx';

interface SectionHeaderProps {
  /** Two-digit sheet number, as the design numbers its sections. */
  number: string;
  label: string;
  caption?: string;
  /** Points at this section's `aria-labelledby`. */
  id?: string;
  className?: string;
}

/**
 * Rule, number, label, right-aligned caption.
 *
 * The eyebrow *is* the `<h2>`: it names the section, so `aria-labelledby` on
 * the parent can point at it and the section reads correctly in a landmark
 * list. Any large display headline underneath is an `<h3>` that happens to be
 * visually louder — one convention, held across every section.
 *
 * The rule is `border-current/20` rather than a fixed colour, so the same
 * component works unchanged on paper and on navy.
 */
export function SectionHeader({ number, label, caption, id, className }: SectionHeaderProps) {
  return (
    <header className={cx('relative border-t-2 border-current/15 pt-3.5', className)}>
      {/* The drawn rule sits over the static one, which stays as the fallback
          wherever scroll timelines are unavailable. */}
      <span
        aria-hidden="true"
        className="rule-draw absolute inset-x-0 -top-0.5 block h-0.5 bg-current"
      />
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2">
        <h2 id={id} className="flex items-baseline gap-5">
          <span className="font-display text-2xl font-extrabold tracking-tighter tabular-nums opacity-90">
            {number}
          </span>
          <span className="label">{label}</span>
        </h2>
        {caption ? <p className="label opacity-60 md:text-right">{caption}</p> : null}
      </div>
    </header>
  );
}
