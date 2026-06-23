import { motion } from 'motion/react';

export function Marquee() {
  const items = [
    'UI/UX Design',
    'Brand Identity',
    'Frontend Engineering',
    'Product Strategy',
    'Conversion Optimization',
    'Design Systems',
    'Web Performance',
    'Interactive Animation',
  ];

  return (
    <div className="py-8 overflow-hidden border-y border-foreground/5 relative">
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-dark to-transparent z-10" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-dark to-transparent z-10" />

      <motion.div
        className="flex gap-12 whitespace-nowrap animate-marquee"
      >
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-6">
            <span className="text-lg md:text-xl font-heading text-foreground/10 font-light tracking-wide">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-gold/30" />
          </span>
        ))}
      </motion.div>
    </div>
  );
}
