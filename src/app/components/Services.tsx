import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const services = [
  {
    number: '01',
    title: 'Brand Identity',
    description: 'Strategic brand systems that communicate your value proposition with clarity and distinction. Logo, typography, color, voice — crafted to resonate.',
    features: ['Brand Strategy', 'Visual Identity', 'Brand Guidelines', 'Voice & Tone'],
  },
  {
    number: '02',
    title: 'Website Design',
    description: 'Premium web experiences designed to captivate, communicate, and convert. Every pixel serves a purpose. Every interaction tells a story.',
    features: ['UI/UX Design', 'Design Systems', 'Responsive Design', 'Prototyping'],
  },
  {
    number: '03',
    title: 'Frontend Development',
    description: 'Production-grade code that brings designs to life with butter-smooth animations, pixel-perfect execution, and performance that impresses.',
    features: ['React / Next.js', 'GSAP / Motion', 'Performance', 'Accessibility'],
  },
  {
    number: '04',
    title: 'Product Design',
    description: 'End-to-end product thinking — from user research and strategy to high-fidelity design and interactive prototyping.',
    features: ['User Research', 'Product Strategy', 'Interaction Design', 'Testing'],
  },
  {
    number: '05',
    title: 'Conversion Optimization',
    description: 'Data-informed design decisions that turn visitors into customers. Every layout, CTA, and flow is optimized for business results.',
    features: ['A/B Testing', 'Analytics', 'Funnel Design', 'CRO Strategy'],
  },
];

export function Services() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="services" className="py-32 lg:py-48 px-6 lg:px-12 bg-dark-card/50 relative">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-foreground/5 to-transparent" />

      <div ref={ref} className="max-w-[1400px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="text-sm font-mono text-gold tracking-[0.2em] uppercase mb-6 block">
            [04] Services
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.05] max-w-3xl">
            What I
            <span className="text-gradient-gold italic"> bring</span>
          </h2>
        </motion.div>

        <div className="space-y-0">
          {services.map((service, index) => (
            <ServiceItem key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ service, index }: { service: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group border-b border-foreground/5 last:border-0"
      data-hover
    >
      <div className="py-8 lg:py-12 grid lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-1">
          <span className="text-sm font-mono text-foreground/20 group-hover:text-gold transition-colors duration-500">
            {service.number}
          </span>
        </div>

        <div className="lg:col-span-4">
          <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground group-hover:text-foreground/80 transition-colors duration-500">
            {service.title}
          </h3>
        </div>

        <div className="lg:col-span-4">
          <p className="text-foreground/30 leading-relaxed group-hover:text-foreground/50 transition-colors duration-500">
            {service.description}
          </p>
        </div>

        <div className="lg:col-span-3 flex flex-wrap gap-2">
          {service.features.map((feature, i) => (
            <span
              key={i}
              className="px-3 py-1 text-xs font-mono text-foreground/20 border border-foreground/5 rounded-sm group-hover:border-foreground/10 group-hover:text-foreground/40 transition-all duration-500"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
