import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Search, Lightbulb, PenTool, Code2, Rocket } from 'lucide-react';

const steps = [
  {
    icon: Search,
    number: '01',
    title: 'Discovery',
    description: 'Deep dive into your brand, audience, goals, and competitive landscape to uncover strategic opportunities.',
    detail: 'Stakeholder interviews, competitor analysis, brand audit, technical requirements',
  },
  {
    icon: Lightbulb,
    number: '02',
    title: 'Strategy',
    description: 'Define the blueprint — user flows, content strategy, conversion metrics, and technical architecture.',
    detail: 'Sitemap, user journeys, technical specs, conversion goals, content framework',
  },
  {
    icon: PenTool,
    number: '03',
    title: 'Design',
    description: 'Craft the visual experience — from wireframes to polished, interactive prototypes that tell your story.',
    detail: 'Wireframing, UI design, motion design, design systems, prototyping',
  },
  {
    icon: Code2,
    number: '04',
    title: 'Development',
    description: 'Translate design into production-grade code with performance, accessibility, and polish at the core.',
    detail: 'Component architecture, animation engineering, performance optimization, responsive build',
  },
  {
    icon: Rocket,
    number: '05',
    title: 'Launch',
    description: 'Ship with confidence — thorough testing, smooth deployment, and continuous iteration based on real data.',
    detail: 'QA testing, deployment, analytics setup, monitoring, iteration roadmap',
  },
];

export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="process" className="py-32 lg:py-48 px-6 lg:px-12 relative overflow-hidden">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="text-sm font-mono text-gold tracking-[0.2em] uppercase mb-6 block">
            [05] Process
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.05] max-w-3xl">
            How I
            <span className="text-gradient-gold italic"> work</span>
          </h2>
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute left-[27.5%] top-0 bottom-0 w-px bg-foreground/5" />

          <div className="space-y-4 lg:space-y-0">
            {steps.map((step, index) => (
              <ProcessStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessStep({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      className="group relative lg:grid lg:grid-cols-12 lg:gap-8 lg:py-12 items-center"
    >
      <div className="lg:col-span-3 lg:text-right lg:pr-8">
        <span className="text-sm font-mono text-foreground/15 group-hover:text-gold transition-colors duration-500">
          {step.number}
        </span>
      </div>

      <div className="hidden lg:flex absolute left-[27.5%] -translate-x-1/2 items-center justify-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-12 h-12 rounded-full border border-foreground/10 bg-dark flex items-center justify-center group-hover:border-gold/30 transition-colors duration-500"
        >
          <Icon className="w-5 h-5 text-foreground/30 group-hover:text-gold transition-colors duration-500" />
        </motion.div>
      </div>

      <div className="lg:col-span-5 lg:pl-8 py-6 lg:py-0">
        <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-3 group-hover:text-foreground/80 transition-colors">
          {step.title}
        </h3>
        <p className="text-foreground/30 leading-relaxed mb-4 group-hover:text-foreground/50 transition-colors duration-500">
          {step.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {step.detail.split(', ').map((item, i) => (
            <span
              key={i}
              className="px-2 py-1 text-[10px] font-mono text-foreground/15 border border-foreground/5 rounded-sm group-hover:text-foreground/30 group-hover:border-foreground/10 transition-all duration-500"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="lg:col-span-4 lg:pl-8 hidden lg:block">
        <div className="text-8xl font-heading font-bold text-foreground/[0.02] group-hover:text-foreground/[0.05] transition-colors duration-500 select-none">
          {step.number}
        </div>
      </div>
    </motion.div>
  );
}
