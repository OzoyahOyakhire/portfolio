import { Band } from '@/components/primitives/band';
import { stagger } from '@/lib/stagger';
import { SectionHeader } from '@/components/primitives/section-header';
import { principles } from '@/content/principles';
import { stack } from '@/content/stack';

export function Principles() {
  return (
    <Band
      id="principles"
      tone="navy"
      aria-labelledby="principles-title"
      innerClassName="pt-14 pb-16 md:pb-20"
    >
      <SectionHeader
        id="principles-title"
        number="05"
        label={principles.eyebrow}
        caption={principles.caption}
      />

      <h3 className="reveal-slot mt-9 max-w-[26ch] font-display text-[2.1rem] leading-[1.05] font-extrabold tracking-tight md:text-[2.6rem]">
        <span className="reveal-line">{principles.headline}</span>
      </h3>

      <ol className="mt-12 grid gap-9 [counter-reset:rule] sm:grid-cols-2 lg:grid-cols-5 lg:gap-0">
        {principles.items.map((item, i) => (
          <li
            key={item.title}
            style={stagger(i)}
            className="reveal border-ground/20 lg:px-7 lg:not-last:border-r lg:first:pl-0 lg:last:pr-0"
          >
            <span
              aria-hidden="true"
              className="block font-display text-[2.1rem] leading-none font-extrabold tracking-tighter text-ground/45 tabular-nums [counter-increment:rule] before:content-[counter(rule,decimal-leading-zero)]"
            />
            <h4 className="mt-3.5 font-display text-[1.35rem] leading-[1.12] font-bold tracking-tight">
              {item.title}
            </h4>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-ground/80">{item.body}</p>
          </li>
        ))}
      </ol>
    </Band>
  );
}

export function Stack() {
  return (
    <Band id="stack" aria-labelledby="stack-title" innerClassName="pt-12 pb-20 md:pb-24">
      <SectionHeader
        id="stack-title"
        number="06"
        label={stack.eyebrow}
        caption={stack.caption}
      />

      <div className="mt-9 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0">
        {stack.groups.map((group, i) => (
          <div
            key={group.title}
            style={stagger(i)}
            className="reveal border-fg/15 lg:px-9 lg:not-last:border-r lg:first:pl-0 lg:last:pr-0"
          >
            <h3 className="font-display text-2xl font-extrabold tracking-tight text-accent">
              {group.title}
            </h3>
            <ul className="mt-3 flex flex-col gap-2 text-[0.97rem] text-muted">
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="reveal mt-9 flex flex-col gap-2 border-t border-fg/15 pt-4.5 sm:flex-row sm:items-baseline sm:gap-6">
        <span className="shrink-0 label text-muted">{stack.learning.label}</span>
        <span className="text-[1.03rem] leading-relaxed text-muted">
          {stack.learning.value}
        </span>
      </p>
    </Band>
  );
}
