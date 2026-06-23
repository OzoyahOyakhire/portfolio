import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

const headline = "Crafting Digital";
const headline2 = "Experiences That";
const headline3 = "Move People";

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const words1 = headline.split(' ');
  const words2 = headline2.split(' ');
  const words3 = headline3.split(' ');

  const allWords = [...words1, ...words2, ...words3];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.8 },
    },
  };

  const wordAnim = {
    hidden: { y: 120, opacity: 0, rotateX: -40 },
    show: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section ref={containerRef} className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-dark" />

      <div className="absolute inset-0 mask-radial-faded">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(245,245,245,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(245,245,245,0.03)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      {isLoaded && (
        <motion.div
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full blur-[180px]"
          style={{ background: 'radial-gradient(circle, rgba(218,165,32,0.08), transparent 70%)' }}
          animate={{
            x: [0, 100, -50, 0],
            y: [0, -80, 60, 0],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
        />
      )}

      {isLoaded && (
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px]"
          style={{ background: 'radial-gradient(circle, rgba(218,165,32,0.05), transparent 70%)' }}
          animate={{
            x: [0, -80, 60, 0],
            y: [0, 60, -100, 0],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear', delay: 2 }}
        />
      )}

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full"
      >
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="perspective-1000"
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap">
              {words1.map((word, i) => (
                <motion.span
                  key={`w1-${i}`}
                  variants={wordAnim}
                  className="text-[clamp(3rem,8vw,8rem)] font-heading font-bold leading-[0.9] text-foreground mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex flex-wrap">
              {words2.map((word, i) => (
                <motion.span
                  key={`w2-${i}`}
                  variants={wordAnim}
                  className={`text-[clamp(3rem,8vw,8rem)] font-heading font-bold leading-[0.9] mr-[0.3em] ${
                    word === 'Experiences' ? 'text-gradient-gold italic' : 'text-foreground'
                  }`}
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <div className="flex flex-wrap">
              {words3.map((word, i) => (
                <motion.span
                  key={`w3-${i}`}
                  variants={wordAnim}
                  className="text-[clamp(3rem,8vw,8rem)] font-heading font-bold leading-[0.9] text-foreground mr-[0.3em]"
                >
                  {word}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 max-w-2xl"
        >
          <p className="text-lg md:text-xl text-foreground/40 leading-relaxed font-light">
            I design and build premium websites that merge strategy, aesthetics, and performance.
            <span className="text-foreground/60"> Founder of Crafts and Code Studio.</span>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 2.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row gap-4 items-start"
        >
          <MagneticButton
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-foreground text-background rounded-sm font-medium text-sm tracking-wide overflow-hidden flex items-center gap-3"
          >
            <span className="relative z-20">View My Work</span>
            <svg className="w-4 h-4 relative z-20 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7V17"/></svg>
            <motion.div
              className="absolute inset-0 bg-gold z-10"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </MagneticButton>

          <MagneticButton
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 text-foreground/60 hover:text-foreground border border-foreground/10 hover:border-foreground/20 rounded-sm font-medium text-sm tracking-wide transition-all duration-300"
          >
            Start a Project
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.8 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] uppercase tracking-[0.3em] text-foreground/20 font-mono">Scroll</span>
            <div className="w-px h-12 bg-gradient-to-b from-foreground/20 to-transparent" />
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-dark to-transparent z-20" />
    </section>
  );
}

function MagneticButton({ children, onClick, className = '' }: { children: React.ReactNode; onClick?: () => void; className?: string }) {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    setPosition({
      x: (e.clientX - centerX) * 0.15,
      y: (e.clientY - centerY) * 0.15,
    });
  };

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 });

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      whileTap={{ scale: 0.97 }}
      className={className}
      data-hover
    >
      {children}
    </motion.button>
  );
}
