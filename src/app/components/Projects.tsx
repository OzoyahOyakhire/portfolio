import { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring, useTransform } from 'motion/react';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import aqumodaImage from '@/assets/aquimoda.PNG';
import gymImage from '@/assets/gym.PNG';
import jobFinderImage from '@/assets/jobfinder.PNG';

const projects = [
  {
    title: 'Aquimoda London',
    category: 'Brand & Web Design',
    year: '2025',
    description:
      'Luxury personal styling & wardrobe curation platform. Premium brand storytelling with seamless client booking for high-end clientele.',
    problem: 'Needed a digital presence matching the exclusivity of their in-person styling services.',
    solution: 'Crafted a bespoke web experience with editorial design, refined typography, and intuitive booking flows.',
    image: aqumodaImage,
    tags: ['HTML', 'CSS', 'JavaScript', 'Figma'],
    color: '#DAA520',
    demoUrl: 'https://aquimoda.vercel.app/',
    repoUrl: 'https://github.com/OzoyahOyakhire/aquimoda',
    results: ['40% increase in booking inquiries', '2.1s average load time', '95+ Lighthouse score'],
  },
  {
    title: 'PHC WorkHub',
    category: 'Product Design & Development',
    year: '2025',
    description:
      'A collaborative workspace platform designed for modern teams — combining real-time communication, project management, and seamless integrations.',
    problem: 'Teams juggling multiple tools needed a unified workspace that felt intuitive.',
    solution: 'Designed and built an integrated platform with real-time features, clean architecture, and a focus on team workflows.',
    image: gymImage,
    tags: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
    color: '#22c55e',
    demoUrl: '#',
    repoUrl: '#',
    results: ['Unified 4 tools into 1 platform', '60% faster task completion', '4.8/5 user satisfaction'],
  },
  {
    title: 'Livestock Cost Estimator',
    category: 'Web Application',
    year: '2025',
    description:
      'A precision cost estimation platform for livestock operations — combining real-time market data with intelligent projections for farmers and ranchers.',
    problem: 'Agricultural businesses lacked data-driven tools for accurate cost forecasting.',
    solution: 'Built an intelligent estimation engine with real-time data integration and intuitive visual dashboards.',
    image: jobFinderImage,
    tags: ['React', 'Tailwind CSS', 'Node.js', 'Charts'],
    color: '#3b82f6',
    demoUrl: '#',
    repoUrl: '#',
    results: ['85% estimation accuracy', '3x faster decision making', '500+ active users'],
  },
  {
    title: 'Get-Fit Gym',
    category: 'Web Design & Development',
    year: '2024',
    description:
      'A modern fitness platform designed to showcase services, drive memberships, and present training programs through a high-performance interface.',
    problem: 'Gym needed a digital experience that matched their premium in-person training quality.',
    solution: 'Created a clean, high-impact website with smooth animations, membership CTAs, and workout showcase.',
    image: gymImage,
    tags: ['React', 'Tailwind CSS', 'Framer Motion'],
    color: '#ef4444',
    demoUrl: 'https://oze-gym-website.vercel.app/',
    repoUrl: 'https://github.com/OzoyahOyakhire/gym-website',
    results: ['28% membership increase', '1.4s load time', '92+ mobile score'],
  },
  {
    title: 'Job Finder',
    category: 'Product Design',
    year: '2024',
    description:
      'An intelligent job search platform with advanced filtering, clean presentation, and a seamless discovery experience for job seekers.',
    problem: 'Job seekers frustrated with cluttered platforms needed a focused, intuitive search experience.',
    solution: 'Designed a streamlined job discovery platform with smart filters, saved searches, and clean UX.',
    image: jobFinderImage,
    tags: ['React', 'Tailwind CSS', 'Firebase', 'Redux'],
    color: '#a855f7',
    demoUrl: 'https://job-finder-one-ebon.vercel.app',
    repoUrl: 'https://github.com/OzoyahOyakhire/Job-finder-React-ap',
    results: ['50% faster job discovery', '3.5k+ monthly active users', '4.6/5 user rating'],
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
            [03] Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-heading leading-[1.05] max-w-3xl">
            Projects built with
            <span className="text-gradient-gold italic"> purpose</span>
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
        <div
          className={`relative rounded-lg overflow-hidden transition-all duration-500 ${
            isExpanded ? 'bg-dark-card' : 'bg-dark-card hover:bg-dark-card/80'
          } border border-foreground/5 hover:border-foreground/10`}
        >
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
                <span className="text-sm font-mono text-foreground/30">
                  0{index + 1}
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
                {isExpanded ? '— Less' : '+ Read More'}
              </button>

              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="space-y-6 mb-6"
                >
                  <div>
                    <h4 className="text-sm font-mono text-foreground/30 uppercase tracking-wider mb-2">Problem</h4>
                    <p className="text-foreground/50">{project.problem}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-mono text-foreground/30 uppercase tracking-wider mb-2">Solution</h4>
                    <p className="text-foreground/50">{project.solution}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-mono text-foreground/30 uppercase tracking-wider mb-2">Results</h4>
                    <ul className="space-y-1">
                      {project.results.map((result, i) => (
                        <li key={i} className="text-foreground/50 flex items-center gap-2">
                          <span className="w-1 h-1 rounded-full bg-gold" />
                          {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              )}

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
                  Live Site
                  <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                </a>
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-medium text-foreground/30 hover:text-foreground/60 transition-colors"
                >
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
