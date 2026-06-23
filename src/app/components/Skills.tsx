import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const designStack = [
  { name: 'Figma', level: 95 },
  { name: 'Adobe Photoshop', level: 85 },
  { name: 'Adobe Illustrator', level: 75 },
  { name: 'Prototyping', level: 90 },
  { name: 'Design Systems', level: 92 },
  { name: 'Typography', level: 88 },
];

const engineeringStack = [
  { name: 'React', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Next.js', level: 88 },
  { name: 'Tailwind CSS', level: 95 },
  { name: 'Framer Motion', level: 90 },
  { name: 'GSAP', level: 82 },
  { name: 'Node.js', level: 75 },
  { name: 'Figma to Code', level: 95 },
];

export function Skills() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="skills" className="py-32 lg:py-48 px-6 lg:px-12 relative">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="text-sm font-mono text-gold tracking-[0.2em] uppercase mb-6 block">
            [06] Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.05] max-w-3xl">
            Design &
            <span className="text-gradient-gold italic"> engineering</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
              className="mb-8"
            >
              <span className="text-sm font-mono text-foreground/30 tracking-widest uppercase">
                Design
              </span>
              <div className="h-px w-full bg-foreground/5 mt-4" />
            </motion.div>

            <div className="space-y-6">
              {designStack.map((skill, index) => (
                <SkillBar key={index} skill={skill} index={index} isInView={isInView} />
              ))}
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
              className="mb-8"
            >
              <span className="text-sm font-mono text-foreground/30 tracking-widest uppercase">
                Engineering
              </span>
              <div className="h-px w-full bg-foreground/5 mt-4" />
            </motion.div>

            <div className="space-y-6">
              {engineeringStack.map((skill, index) => (
                <SkillBar key={index} skill={skill} index={index} isInView={isInView} delay={0.3} />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-20 pt-12 border-t border-foreground/5"
        >
          <div className="flex flex-wrap gap-3">
            {['HTML5', 'CSS3', 'JavaScript', 'Git', 'Vercel', 'REST APIs', 'Responsive Design', 'SEO', 'Web Performance', 'Accessibility', 'Agile', 'CI/CD'].map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.04 }}
                className="px-4 py-2 text-sm font-mono text-foreground/20 border border-foreground/5 rounded-sm hover:border-gold/20 hover:text-gold/60 transition-all duration-300"
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SkillBar({ skill, index, isInView, delay = 0 }: { skill: { name: string; level: number }; index: number; isInView: boolean; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: delay + 0.3 + index * 0.08 }}
      className="group"
    >
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-mono text-foreground/50 group-hover:text-foreground/80 transition-colors duration-300">
          {skill.name}
        </span>
        <span className="text-xs font-mono text-foreground/15">
          {skill.level}%
        </span>
      </div>
      <div className="h-px w-full bg-foreground/5 relative overflow-hidden">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: skill.level / 100 } : {}}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1], delay: delay + 0.5 + index * 0.08 }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-gold/60 to-gold origin-left"
        />
      </div>
    </motion.div>
  );
}
