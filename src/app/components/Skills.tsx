import { useRef } from 'react';
import { motion, useInView } from 'motion/react';

const stackCategories = [
  {
    title: 'Frontend',
    skills: [
      { name: 'React', level: 95 },
      { name: 'TypeScript', level: 90 },
      { name: 'Next.js', level: 88 },
      { name: 'Tailwind CSS', level: 95 },
      { name: 'Framer Motion', level: 90 },
      { name: 'GSAP', level: 82 },
    ],
  },
  {
    title: 'Backend',
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'REST APIs', level: 88 },
      { name: 'Databases', level: 75 },
      { name: 'Payment Integration', level: 85 },
      { name: 'Authentication', level: 88 },
      { name: 'Server Architecture', level: 72 },
    ],
  },
  {
    title: 'AI & Data',
    skills: [
      { name: 'Python', level: 78 },
      { name: 'Machine Learning', level: 72 },
      { name: 'Predictive Analytics', level: 75 },
      { name: 'Data Visualization', level: 85 },
    ],
  },
  {
    title: 'Design',
    skills: [
      { name: 'Figma', level: 95 },
      { name: 'Design Systems', level: 92 },
      { name: 'Prototyping', level: 90 },
      { name: 'Typography', level: 88 },
    ],
  },
];

const additionalSkills = [
  'Git', 'CI/CD', 'Vercel', 'Jest', 'Puppeteer', 'Agile/Scrum',
  'HTML5', 'CSS3', 'JavaScript', 'SEO', 'Web Performance', 'Accessibility',
  'Responsive Design', 'Component Architecture', 'State Management',
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
            [08] Tech Stack
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.05] max-w-3xl">
            Full-spectrum
            <span className="text-gradient-gold italic"> engineering</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-12">
          {stackCategories.map((category, catIndex) => (
            <div key={catIndex}>
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: catIndex * 0.15 }}
                className="mb-8"
              >
                <span className="text-sm font-mono text-foreground/30 tracking-widest uppercase">
                  {category.title}
                </span>
                <div className="h-px w-full bg-foreground/5 mt-4" />
              </motion.div>

              <div className="space-y-6">
                {category.skills.map((skill, index) => (
                  <SkillBar
                    key={index}
                    skill={skill}
                    index={index}
                    isInView={isInView}
                    delay={catIndex * 0.15}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.6 }}
          className="mt-20 pt-12 border-t border-foreground/5"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-xs font-mono text-foreground/20 tracking-widest uppercase mb-4 block"
          >
            Also experienced in
          </motion.span>
          <div className="flex flex-wrap gap-3">
            {additionalSkills.map((tag, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.8 + i * 0.03 }}
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
