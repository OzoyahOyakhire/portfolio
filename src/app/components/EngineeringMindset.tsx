import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Scale, Wrench, Gauge, Users, TrendingUp } from 'lucide-react';

const principles = [
  {
    icon: Scale,
    title: 'Scalability',
    description: 'Systems designed to grow. Architecture that handles 10 users or 10,000 without rewrites. Build once, scale infinitely.',
  },
  {
    icon: Wrench,
    title: 'Maintainability',
    description: 'Clean code, clear abstractions, sensible patterns. Code that any engineer can understand, extend, and ship with confidence.',
  },
  {
    icon: Gauge,
    title: 'Performance',
    description: 'Speed is a feature. Every millisecond matters. Optimized rendering, efficient data fetching, zero wasted compute.',
  },
  {
    icon: Users,
    title: 'User Experience',
    description: 'Software serves people first. Intuitive flows, clear feedback, accessible design. The best code is invisible to the user.',
  },
  {
    icon: TrendingUp,
    title: 'Business Impact',
    description: 'Every technical decision is a business decision. I build software that moves metrics, not just commits.',
  },
];

export function EngineeringMindset() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="py-32 lg:py-48 px-6 lg:px-12 relative">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20 max-w-3xl"
        >
          <span className="text-sm font-mono text-gold tracking-[0.2em] uppercase mb-6 block">
            [06] Engineering Mindset
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.05] mb-8">
            How I think as
            <span className="text-gradient-gold italic"> an engineer</span>
          </h2>
          <p className="text-xl text-foreground/40 leading-relaxed font-light">
            I don't just write code. I build systems designed for scale, usability, and long-term growth. These are the principles that guide every decision.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-px bg-foreground/5 rounded-sm overflow-hidden">
          {principles.map((principle, index) => (
            <PrincipleCard key={index} principle={principle} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function PrincipleCard({ principle, index }: { principle: (typeof principles)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const Icon = principle.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      className="group bg-dark p-6 lg:p-8 hover:bg-dark-card transition-colors duration-500"
    >
      <div className="w-10 h-10 rounded-sm border border-foreground/5 flex items-center justify-center mb-6 group-hover:border-gold/20 group-hover:bg-gold/[0.03] transition-all duration-500">
        <Icon className="w-5 h-5 text-foreground/20 group-hover:text-gold transition-colors duration-500" />
      </div>

      <h3 className="text-lg font-heading font-semibold text-foreground mb-3 group-hover:text-foreground/80 transition-colors duration-500">
        {principle.title}
      </h3>

      <p className="text-sm text-foreground/25 leading-relaxed group-hover:text-foreground/45 transition-colors duration-500">
        {principle.description}
      </p>
    </motion.div>
  );
}
