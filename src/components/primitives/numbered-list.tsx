import { stagger } from '@/lib/stagger';
import type { NumberedItem } from '@/content/types';
import { TagList } from './tag-list';

interface NumberedListProps {
  items: readonly NumberedItem[];
}

/**
 * The services / principles row.
 *
 * An `<ol>` with CSS counters supplying the numerals — never hardcoded in
 * content, because reordering the list would then desync every number.
 */
export function NumberedList({ items }: NumberedListProps) {
  return (
    <ol className="border-t border-current/20 [counter-reset:row]">
      {items.map((item, i) => (
        <li
          key={item.title}
          style={stagger(i)}
          className="reveal grid grid-cols-1 gap-x-8 gap-y-3 border-b border-current/10 py-6 last:border-b-0 md:grid-cols-[5rem_18rem_1fr] md:py-7 lg:grid-cols-[5rem_20rem_1fr_13rem]"
        >
          <span
            aria-hidden="true"
            className="font-display text-[2.5rem] leading-none font-extrabold tracking-tighter text-accent/25 tabular-nums [counter-increment:row] before:content-[counter(row,decimal-leading-zero)]"
          />
          <h3 className="font-display text-2xl leading-tight font-bold tracking-tight md:text-[1.7rem]">
            {item.title}
          </h3>
          <p className="max-w-[62ch] text-[1.02rem] leading-relaxed text-muted">{item.body}</p>
          {item.tags ? <TagList items={item.tags} className="lg:justify-end" /> : null}
        </li>
      ))}
    </ol>
  );
}
