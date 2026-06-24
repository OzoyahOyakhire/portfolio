import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

const services = [
  {
    number: '01',
    title: 'Software Products',
    description: 'Custom-built platforms, SaaS applications, and business software engineered for scale. From MVP to production-ready systems.',
    features: ['SaaS Platforms', 'Custom Software', 'API Development', 'System Architecture'],
  },
  {
    number: '02',
    title: 'Web Applications',
    description: 'Fast, scalable, modern web systems built with production-grade architecture. React, Next.js, TypeScript — engineered for performance.',
    features: ['React / Next.js', 'TypeScript', 'Performance', 'Scalable Architecture'],
  },
  {
    number: '03',
    title: 'AI & Automation Tools',
    description: 'Systems that reduce manual work and improve efficiency. Machine learning models, predictive engines, and automated workflows.',
    features: ['Machine Learning', 'Process Automation', 'Data Pipelines', 'Predictive Systems'],
  },
  {
    number: '04',
    title: 'Premium Websites',
    description: 'High-performing brand experiences that look exceptional and convert. Awwwards-level design with engineering precision.',
    features: ['UI/UX Design', 'Design Systems', 'Animation', 'Conversion Strategy'],
  },
  {
    number: '05',
    title: 'Product Design',
    description: 'End-to-end product thinking — user research, strategy, interaction design, and prototyping for products that people actually use.',
    features: ['User Research', 'Product Strategy', 'Wireframing', 'Prototyping'],
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
            [04] What I Build
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.05] max-w-4xl">
            From idea to
            <span className="text-gradient-gold italic"> product</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-foreground/5 rounded-sm overflow-hidden">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: (typeof services)[0]; index: number }) {
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
      className="group relative bg-dark p-8 lg:p-10 transition-colors duration-500 hover:bg-dark-card"
      data-hover
    >
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gold/[0.02] to-transparent opacity-0 transition-opacity duration-500"
        animate={{ opacity: isHovered ? 1 : 0 }}
      />

      <div className="relative z-10">
        <span className="text-5xl font-heading font-bold text-foreground/[0.03] group-hover:text-gold/[0.08] transition-colors duration-500 block mb-6">
          {service.number}
        </span>

        <h3 className="text-2xl lg:text-3xl font-heading font-semibold text-foreground mb-4 group-hover:text-foreground/80 transition-colors duration-500">
          {service.title}
        </h3>

        <p className="text-foreground/30 leading-relaxed mb-8 group-hover:text-foreground/50 transition-colors duration-500">
          {service.description}
        </p>

        <div className="flex flex-wrap gap-2">
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
