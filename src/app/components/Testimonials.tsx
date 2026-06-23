import { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';

const testimonials = [
  {
    quote: "Working with Justice was a huge pleasure. He understood the brief completely, working from my wireframe and website mockup creating exactly what I wanted. The technical functionalities all work perfectly. I highly recommend his services — he is a capable web developer.",
    author: 'Jennifer Onah',
    role: 'Founder & Creative Director, Aquimoda',
    rating: 5,
  },
  {
    quote: "Justice is a highly skilled and reliable web developer. He combines clean design with strong functionality, delivering websites that are both visually impressive and performant. Professional, attentive to detail, and always on time. I highly recommend him.",
    author: 'Segun',
    role: 'Freelance Designer',
    rating: 5,
  },
  {
    quote: "Incredible frontend skills combined with product thinking. Justice delivered ahead of schedule and the code quality was outstanding. Would hire again in a heartbeat.",
    author: 'Emma Rodriguez',
    role: 'CTO at GrowthLabs',
    rating: 5,
  },
];

export function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="testimonials" className="py-32 lg:py-48 px-6 lg:px-12 bg-dark-card/30 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />

      <div ref={ref} className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="text-sm font-mono text-gold tracking-[0.2em] uppercase mb-6 block">
            [07] Testimonials
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.05] max-w-3xl">
            Client
            <span className="text-gradient-gold italic"> words</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="relative min-h-[280px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className="flex gap-1 mb-8">
                  {[...Array(testimonials[activeIndex].rating)].map((_, i) => (
                    <span key={i} className="text-gold text-sm">*</span>
                  ))}
                </div>

                <blockquote className="text-2xl md:text-3xl lg:text-4xl font-heading font-light text-foreground/70 leading-[1.3] mb-10">
                  "{testimonials[activeIndex].quote}"
                </blockquote>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center border border-gold/20">
                    <span className="text-gold font-heading font-semibold text-sm">
                      {testimonials[activeIndex].author.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <div className="text-foreground font-medium">
                      {testimonials[activeIndex].author}
                    </div>
                    <div className="text-sm text-foreground/30 font-mono">
                      {testimonials[activeIndex].role}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex gap-2 mt-12">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`h-px transition-all duration-500 ${
                  i === activeIndex
                    ? 'w-12 bg-gold'
                    : 'w-6 bg-foreground/10 hover:bg-foreground/20'
                }`}
                data-hover
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
