import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';

export function About() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const [counters, setCounters] = useState({ years: 0, projects: 0, satisfaction: 0 });

  useEffect(() => {
    if (!isInView) return;
    const duration = 2000;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setCounters({
        years: Math.round(3 * ease),
        projects: Math.round(20 * ease),
        satisfaction: Math.round(100 * ease),
      });
      if (progress < 1) requestAnimationFrame(tick);
    };
    tick();
  }, [isInView]);

  return (
    <section id="about" className="py-32 lg:py-48 px-6 lg:px-12 relative">
      <div className="max-w-[1400px] mx-auto">
        <div ref={ref} className="grid lg:grid-cols-12 gap-16 lg:gap-24">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4"
          >
            <span className="text-sm font-mono text-gold tracking-[0.2em] uppercase mb-6 block">
              [01] About
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-heading leading-[1.05]">
              Software developer.
              <br />
              <span className="text-gradient-gold italic">Product builder.</span>
              <br />
              Problem solver.
            </h2>
          </motion.div>

          <div className="lg:col-span-8 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-xl md:text-2xl text-foreground/60 leading-relaxed font-light">
                I'm <span className="text-foreground font-medium">Justice Oyakhire</span> — a software developer who operates at the intersection of design, engineering, product thinking, and innovation. I build software that solves real-world problems.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg text-foreground/40 leading-relaxed">
                As the founder of <span className="text-gold">Crafts and Code Studio</span>, I don't just build websites — I architect scalable software systems, SaaS platforms, automation tools, and intelligent business solutions. From concept to deployment, I handle the full product lifecycle.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="text-lg text-foreground/40 leading-relaxed">
                Every product I build is designed for scale, usability, and long-term growth. I believe great software is simple, performant, and engineered to create real business outcomes.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 60 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-3 gap-6 pt-8 border-t border-foreground/5"
            >
              {[
                { value: `${counters.years}+`, label: 'Years of Engineering' },
                { value: `${counters.projects}+`, label: 'Products Shipped' },
                { value: `${counters.satisfaction}%`, label: 'Client Satisfaction' },
              ].map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <div className="text-4xl lg:text-5xl font-heading font-bold text-foreground mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-foreground/30 font-mono tracking-wider uppercase">
                    {stat.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
