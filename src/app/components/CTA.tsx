import { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { ArrowUpRight, Mail, Send } from 'lucide-react';

export function CTA() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="contact" className="py-32 lg:py-48 px-6 lg:px-12 relative">
      <div ref={ref} className="max-w-[1400px] mx-auto">
        <div className="relative rounded-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.06] via-dark-card to-dark-card" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

          <div className="relative z-10 p-12 lg:p-24 text-center">
            <motion.div
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className="text-sm font-mono text-gold tracking-[0.2em] uppercase mb-8 block">
                [08] Contact
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 80 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
              className="text-4xl md:text-6xl lg:text-8xl font-heading leading-[1.05] mb-8"
            >
              Have a project
              <br />
              <span className="text-gradient-gold italic">in mind?</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="text-xl text-foreground/40 max-w-2xl mx-auto mb-12 leading-relaxed"
            >
              Let's build something exceptional. Whether you need a brand identity, a premium website, or a complete digital experience — I'm ready.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1.2, delay: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            >
              <MagneticLink
                href="mailto:justiceoyakhire27@gmail.com?subject=Project Inquiry"
                className="group relative px-8 py-4 bg-foreground text-background rounded-sm font-medium text-sm tracking-wide overflow-hidden flex items-center gap-3"
              >
                <span className="relative z-20 group-hover:text-background transition-colors">
                  Send Email
                </span>
                <Send className="w-4 h-4 relative z-20 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                <motion.div
                  className="absolute inset-0 bg-gold z-10"
                  initial={{ x: '100%' }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                />
              </MagneticLink>

              <MagneticLink
                href="https://wa.link/tlxlma"
                className="group px-8 py-4 text-foreground/50 hover:text-foreground border border-foreground/10 hover:border-foreground/20 rounded-sm font-medium text-sm tracking-wide transition-all duration-300 flex items-center gap-2"
              >
                Schedule a Call
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </MagneticLink>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center text-sm font-mono text-foreground/20"
            >
              <a
                href="mailto:justiceoyakhire27@gmail.com"
                className="hover:text-gold transition-colors duration-300 flex items-center gap-2"
                data-hover
              >
                <Mail className="w-3.5 h-3.5" />
                justiceoyakhire27@gmail.com
              </a>
              <span className="hidden sm:block text-foreground/5">|</span>
              <a
                href="https://linkedin.com/in/oyakhire-justice-888a4b344"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors duration-300"
                data-hover
              >
                LinkedIn
              </a>
              <span className="hidden sm:block text-foreground/5">|</span>
              <a
                href="https://github.com/OzoyahOyakhire"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gold transition-colors duration-300"
                data-hover
              >
                GitHub
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

function MagneticLink({ href, children, className = '' }: { href: string; children: React.ReactNode; className?: string }) {
  return (
    <motion.a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={className}
      data-hover
    >
      {children}
    </motion.a>
  );
}
