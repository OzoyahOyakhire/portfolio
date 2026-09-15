import { cx } from '@/lib/cx';

interface TagListProps {
  items: readonly string[];
  className?: string;
}

/** A `<ul>` rather than a div so screen readers get the item count for free. */
export function TagList({ items, className }: TagListProps) {
  return (
    <ul className={cx('flex flex-wrap gap-1.5', className)}>
      {items.map((item) => (
        <li
          key={item}
          className="border border-current/25 px-2.5 py-1 font-sans text-[11px] font-medium opacity-70"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
