import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const principles = [
  {
    number: '01',
    title: 'Simplicity',
    statement: 'The best software is deceptively simple. Complexity is a cost — I minimize it relentlessly.',
  },
  {
    number: '02',
    title: 'Performance',
    statement: 'Speed is a feature. Every millisecond of load time, every frame of animation, every API response is an engineering decision.',
  },
  {
    number: '03',
    title: 'User-First Thinking',
    statement: 'Technology serves people. The hardest engineering problems are solved by deeply understanding the humans who use the software.',
  },
  {
    number: '04',
    title: 'Scalable Architecture',
    statement: 'Build for today, architect for tomorrow. Systems that grow with your business without costly rewrites.',
  },
  {
    number: '05',
    title: 'Business Outcomes',
    statement: 'Code that doesn\'t create business value is technical debt. Every feature, every optimization, every line of code must move a metric that matters.',
  },
];

export function ProductPhilosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-32 lg:py-48 px-6 lg:px-12 bg-dark-card/30 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />

      <div ref={ref} className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="text-sm font-mono text-gold tracking-[0.2em] uppercase mb-6 block">
            [07] Philosophy
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.05] max-w-4xl">
            What makes
            <span className="text-gradient-gold italic"> great software</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {principles.map((principle, index) => (
            <PhilosophyItem key={index} principle={principle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PhilosophyItem({ principle, index }: { principle: (typeof principles)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      className="group border-b border-foreground/5 last:border-0"
    >
      <div className="py-8 lg:py-10 grid lg:grid-cols-12 gap-4 items-start">
        <div className="lg:col-span-1">
          <span className="text-sm font-mono text-foreground/15 group-hover:text-gold transition-colors duration-500">
            {principle.number}
          </span>
        </div>

        <div className="lg:col-span-3">
          <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground group-hover:text-foreground/80 transition-colors duration-500">
            {principle.title}
          </h3>
        </div>

        <div className="lg:col-span-8">
          <p className="text-lg text-foreground/30 leading-relaxed group-hover:text-foreground/55 transition-colors duration-500 font-light">
            {principle.statement}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
