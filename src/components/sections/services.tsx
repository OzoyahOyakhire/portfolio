import { Band } from '@/components/primitives/band';
import { stagger } from '@/lib/stagger';
import { NumberedList } from '@/components/primitives/numbered-list';
import { SectionHeader } from '@/components/primitives/section-header';
import { process } from '@/content/process';
import { services } from '@/content/services';

export function Services() {
  return (
    <Band id="services" aria-labelledby="services-title" innerClassName="pt-16 pb-16 md:pt-20">
      <SectionHeader
        id="services-title"
        number="02"
        label={services.eyebrow}
        caption={services.caption}
      />
      <div className="mt-3">
        <NumberedList items={services.items} />
      </div>
    </Band>
  );
}

export function Process() {
  return (
    <Band
      id="process"
      tone="bone"
      aria-labelledby="process-title"
      className="border-t border-fg"
      innerClassName="pt-12 pb-16 md:pb-20"
    >
      <SectionHeader
        id="process-title"
        number="03"
        label={process.eyebrow}
        caption={process.caption}
      />

      <ol className="mt-9 grid gap-8 [counter-reset:step] md:grid-cols-2 lg:grid-cols-5 lg:gap-0">
        {process.steps.map((step, i) => (
          <li
            key={step.title}
            style={stagger(i)}
            className="reveal border-fg/15 lg:px-7 lg:not-last:border-r lg:first:pl-0 lg:last:pr-0"
          >
            <p className="flex items-center gap-2.5 text-accent">
              <span
                aria-hidden="true"
                className={
                  'open' in step && step.open
                    ? 'block size-[11px] border-2 border-accent'
                    : 'block size-[11px] bg-accent'
                }
              />
              <span className="label [counter-increment:step] before:content-['Step_'_counter(step,decimal-leading-zero)]" />
            </p>
            <h3 className="mt-3.5 font-display text-[1.4rem] leading-tight font-bold tracking-tight">
              {step.title}
            </h3>
            {/* On bone: ink/75 rather than muted, which fails AA against bone. */}
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-fg/75">
              <Emphasised text={step.body} />
            </p>
          </li>
        ))}
      </ol>
    </Band>
  );
}

/** Renders a single `*word*` in the copy as italic. */
function Emphasised({ text }: { text: string }) {
  const parts = text.split(/\*(.+?)\*/);
  return <>{parts.map((part, i) => (i % 2 === 1 ? <em key={i}>{part}</em> : part))}</>;
}
