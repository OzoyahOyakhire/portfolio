import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform, AnimatePresence } from 'motion/react';
import { ExternalLink, ArrowUpRight, Github } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import aqumodaImage from '@/assets/aquimoda.PNG';
import gymImage from '@/assets/gym.PNG';
import jobFinderImage from '@/assets/jobfinder.PNG';

const projects = [
  {
    title: 'PHC WorkHub',
    category: 'Document Automation Platform',
    year: '2025',
    type: 'SaaS Product',
    description:
      'A document automation platform that streamlines PDF generation, subscription management, payment processing, and document workflows for businesses.',
    problem: 'Businesses were manually processing thousands of documents monthly — slow, error-prone, and impossible to scale.',
    solution: 'Built an end-to-end document automation engine with PDF generation, subscription billing via payment APIs, and automated document workflow pipelines.',
    architecture: 'React SPA + Node.js API layer + Payment gateway integration + PDF generation service + Subscription management system',
    challenges: 'Designing a reliable PDF generation pipeline, handling concurrent document processing, and building a fault-tolerant subscription billing system.',
    image: gymImage,
    tags: ['React', 'TypeScript', 'APIs', 'Payment Integration', 'PDF Generation', 'Subscriptions'],
    color: '#22c55e',
    demoUrl: '#',
    repoUrl: '#',
    results: ['10x faster document processing', '95% reduction in manual errors', 'Automated payment & subscription flows'],
  },
  {
    title: 'Intelligent Livestock Cost Estimation Platform',
    category: 'AI-Powered Analytics Platform',
    year: '2025',
    type: 'Intelligent System',
    description:
      'An AI-powered cost estimation engine for livestock operations — combining predictive models, risk analysis, and intelligent projections for data-driven decision making.',
    problem: 'Agricultural businesses relied on guesswork and spreadsheets for cost forecasting — leading to financial losses and poor planning.',
    solution: 'Engineered an intelligent estimation platform with machine learning prediction models, real-time market data integration, and risk analysis dashboards.',
    architecture: 'React dashboard + Python ML backend + Prediction engine + Real-time data pipeline + Visualization layer',
    challenges: 'Training accurate prediction models with limited agricultural data, building real-time data ingestion pipelines, and making ML outputs interpretable for non-technical users.',
    image: jobFinderImage,
    tags: ['React', 'Python', 'Machine Learning', 'Predictive Analytics', 'Data Visualization'],
    color: '#3b82f6',
    demoUrl: '#',
    repoUrl: '#',
    results: ['85% estimation accuracy', '3x faster business decisions', 'Data-driven risk assessments'],
  },
  {
    title: 'Spotify Clone',
    category: 'Streaming Application',
    year: '2024',
    type: 'Full-Stack Product',
    description:
      'A fully functional music streaming platform showcasing production-grade software engineering — authentication, streaming logic, state management, and performance optimization.',
    problem: 'Demonstrate the ability to build a complex, real-time streaming application with robust authentication and state management architecture.',
    solution: 'Architected a complete streaming platform with secure auth flows, efficient audio streaming, global state management, and optimized rendering for seamless playback.',
    architecture: 'React + Redux state management + Auth flow + Streaming service + Optimized audio pipeline',
    challenges: 'Building smooth audio streaming without buffering, managing complex global state for playback/no queues, and optimizing component rendering during live streaming.',
    image: aqumodaImage,
    tags: ['React', 'Redux', 'Auth', 'Streaming', 'Performance Optimization', 'APIs'],
    color: '#1DB954',
    demoUrl: '#',
    repoUrl: '#',
    results: ['Seamless 0-buffer playback', 'Robust auth & session management', 'Production-grade state architecture'],
  },
  {
    title: 'WhatsApp Ordering System',
    category: 'Business Automation',
    year: '2024',
    type: 'Automation Tool',
    description:
      'An automated ordering system built on WhatsApp — enabling businesses to receive, process, and fulfill orders through conversational commerce with automated bot workflows.',
    problem: 'Small businesses were losing orders and revenue because their ordering process required manual phone calls, messages, and follow-ups.',
    solution: 'Built a WhatsApp-integrated ordering bot with Twilio APIs, automated order processing, messaging workflows, and real-time notifications for both customers and businesses.',
    architecture: 'WhatsApp Bot + Twilio API integration + Order processing engine + Notification system + Admin dashboard',
    challenges: 'Building reliable two-way messaging flows, handling order state across interrupted conversations, and integrating payment confirmations via messaging.',
    image: gymImage,
    tags: ['Twilio APIs', 'Node.js', 'Bot Workflows', 'Backend', 'Automation', 'Messaging'],
    color: '#25D366',
    demoUrl: '#',
    repoUrl: '#',
    results: ['Automated 80% of order flow', '50% increase in completed orders', 'Zero missed orders'],
  },
  {
    title: 'Aquimoda London',
    category: 'Premium Brand Platform',
    year: '2025',
    type: 'Digital Experience',
    description:
      'A luxury personal styling & wardrobe curation platform. Premium brand storytelling with seamless client booking for high-end clientele — where design thinking meets engineering excellence.',
    problem: 'Needed a digital presence that matched the exclusivity of their in-person styling services and drove high-value client bookings.',
    solution: 'Crafted a bespoke web experience with editorial design, refined typography, intuitive booking flows, and a performance-optimized architecture.',
    architecture: 'Static site + Optimized asset delivery + Booking integration + SEO + Performance-first architecture',
    challenges: 'Achieving luxury-level visual quality while maintaining 95+ Lighthouse scores and sub-2s load times on all devices.',
    image: aqumodaImage,
    tags: ['HTML', 'CSS', 'JavaScript', 'Figma', 'Performance', 'SEO'],
    color: '#DAA520',
    demoUrl: 'https://aquimoda.vercel.app/',
    repoUrl: 'https://github.com/OzoyahOyakhire/aquimoda',
    results: ['40% increase in booking inquiries', '2.1s average load time', '95+ Lighthouse score'],
  },
];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: '-50px' });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <section id="projects" className="py-32 lg:py-48 relative">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <motion.div
          ref={containerRef}
          initial={{ opacity: 0, y: 80 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="mb-20"
        >
          <span className="text-sm font-mono text-gold tracking-[0.2em] uppercase mb-6 block">
            [03] Product Case Studies
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.05] max-w-4xl">
            Software built to
            <span className="text-gradient-gold italic"> solve problems</span>
          </h2>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              isHovered={hoveredProject === index}
              onHover={() => setHoveredProject(index)}
              onLeave={() => setHoveredProject(null)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index,
  isHovered,
  onHover,
  onLeave,
}: {
  project: (typeof projects)[0];
  index: number;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  const [isExpanded, setIsExpanded] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });
  const rotateX = useTransform(springY, [-100, 100], [3, -3]);
  const rotateY = useTransform(springX, [-100, 100], [-3, 3]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    onLeave();
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
      onMouseMove={handleMouseMove}
      onMouseEnter={onHover}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      data-hover
    >
      <motion.div
        style={{ rotateX, rotateY }}
        className="preserve-3d"
      >
        <div className="relative rounded-lg overflow-hidden transition-all duration-500 bg-dark-card border border-foreground/5 hover:border-foreground/10">
          <div className="grid lg:grid-cols-12 gap-0">
            <div className="lg:col-span-5 relative overflow-hidden">
              <div className="aspect-[16/10] lg:aspect-auto lg:h-full overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className={`w-full h-full object-cover transition-transform duration-700 ${
                    isHovered ? 'scale-105' : 'scale-100'
                  }`}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-dark/80 lg:block hidden" />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent lg:hidden" />
              </div>
              <div
                className="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500"
                style={{ opacity: isHovered ? 0.15 : 0, background: project.color }}
              />
            </div>

            <div className="lg:col-span-7 p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <span className="px-2 py-0.5 text-[10px] font-mono text-gold border border-gold/20 rounded-sm bg-gold/[0.03] tracking-wider uppercase">
                  {project.type}
                </span>
                <span className="h-px flex-1 bg-foreground/5" />
                <span className="text-sm font-mono text-foreground/30">
                  {project.year}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-3xl lg:text-4xl font-heading font-semibold text-foreground mb-2">
                    {project.title}
                  </h3>
                  <span className="text-sm font-mono text-gold tracking-wider uppercase">
                    {project.category}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isHovered ? 0 : 45 }}
                  transition={{ duration: 0.3 }}
                  className="flex-shrink-0 w-10 h-10 rounded-full border border-foreground/10 flex items-center justify-center"
                >
                  <ArrowUpRight className="w-4 h-4 text-foreground/40" />
                </motion.div>
              </div>

              <p className="text-foreground/40 leading-relaxed mb-6">
                {project.description}
              </p>

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-left text-sm font-mono text-gold hover:text-gold-light transition-colors mb-6"
              >
                {isExpanded ? '— Collapse' : '+ View Case Study'}
              </button>

              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="space-y-6 mb-6 overflow-hidden"
                  >
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="text-sm font-mono text-foreground/30 uppercase tracking-wider mb-2">Problem</h4>
                        <p className="text-foreground/50 text-sm">{project.problem}</p>
                      </div>
                      <div>
                        <h4 className="text-sm font-mono text-foreground/30 uppercase tracking-wider mb-2">Solution</h4>
                        <p className="text-foreground/50 text-sm">{project.solution}</p>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-mono text-foreground/30 uppercase tracking-wider mb-2">Architecture</h4>
                      <p className="text-foreground/50 text-sm font-mono">{project.architecture}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-mono text-foreground/30 uppercase tracking-wider mb-2">Challenges</h4>
                      <p className="text-foreground/50 text-sm">{project.challenges}</p>
                    </div>
                    <div>
                      <h4 className="text-sm font-mono text-foreground/30 uppercase tracking-wider mb-2">Outcome</h4>
                      <ul className="space-y-1">
                        {project.results.map((result, i) => (
                          <li key={i} className="text-foreground/50 flex items-center gap-2 text-sm">
                            <span className="w-1 h-1 rounded-full bg-gold" />
                            {result}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="px-3 py-1 rounded-sm text-xs font-mono text-foreground/30 border border-foreground/5 bg-foreground/[0.02]"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-4">
                <a
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground group/link hover:text-gold transition-colors"
                >
                  Live Product
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground/30 hover:text-foreground/60 transition-colors"
                >
                  <Github className="w-3.5 h-3.5" />
                  Source
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
