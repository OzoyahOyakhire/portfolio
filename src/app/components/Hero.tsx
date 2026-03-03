import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'motion/react';
import { useEffect, useState } from 'react';

export function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);

  // Smooth mouse tracking
  const mouseX = useSpring(0, { stiffness: 150, damping: 20 });
  const mouseY = useSpring(0, { stiffness: 150, damping: 20 });

  useEffect(() => {
    setIsLoaded(true);
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setMousePosition({ x: clientX, y: clientY });
      mouseX.set(clientX);
      mouseY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const name = "Ozoyah Oyakhire";
  const nameChars = name.split('');

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-950">
      {/* Animated mesh gradient background */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(circle at 50% 50%, #1e3a8a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 20% 80%, #0891b2 0%, transparent 50%)',
          }}
          animate={{
            background: [
              'radial-gradient(circle at 50% 50%, #1e3a8a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 20% 80%, #0891b2 0%, transparent 50%)',
              'radial-gradient(circle at 30% 70%, #1e3a8a 0%, transparent 50%), radial-gradient(circle at 70% 30%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 40% 60%, #0891b2 0%, transparent 50%)',
              'radial-gradient(circle at 70% 30%, #1e3a8a 0%, transparent 50%), radial-gradient(circle at 30% 70%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 60% 40%, #0891b2 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, #1e3a8a 0%, transparent 50%), radial-gradient(circle at 80% 20%, #7c3aed 0%, transparent 50%), radial-gradient(circle at 20% 80%, #0891b2 0%, transparent 50%)',
            ],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
      </div>

   
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.15), transparent 80%)`,
        }}
      />

     
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-blue-400 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        />
      ))}

    
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

   
      <div className="relative max-w-7xl mx-auto px-6 py-32 text-center z-10">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.5, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ 
            duration: 1, 
            ease: [0.34, 1.56, 0.64, 1],
            delay: 0.2 
          }}
          whileHover={{ scale: 1.05 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8 shadow-lg shadow-blue-500/10"
        >
          <motion.div 
            className="w-2 h-2 rounded-full bg-green-400"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(74, 222, 128, 0.7)',
                '0 0 0 8px rgba(74, 222, 128, 0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-sm text-gray-300">Available for new opportunities</span>
        </motion.div>

     
        <div className="perspective-1000 mb-6">
          <h1 className="text-5xl md:text-7xl font-bold">
            {nameChars.map((char, i) => (
              <motion.span
                key={i}
                initial={{ 
                  opacity: 0, 
                  y: 50,
                  rotateX: -90,
                  scale: 0.5,
                }}
                animate={{ 
                  opacity: 1, 
                  y: 0,
                  rotateX: 0,
                  scale: 1,
                }}
                transition={{
                  duration: 0.8,
                  delay: 0.4 + i * 0.05,
                  ease: [0.34, 1.56, 0.64, 1],
                }}
                whileHover={{
                  scale: 1.2,
                  color: '#60a5fa',
                  textShadow: '0 0 20px rgba(96, 165, 250, 0.8)',
                  transition: { duration: 0.2 }
                }}
                className="inline-block bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent cursor-default"
                style={{
                  textShadow: '0 10px 30px rgba(0,0,0,0.3)',
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </h1>
        </div>

   
        <motion.div className="overflow-hidden mb-6">
          <motion.p
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ 
              duration: 1, 
              delay: 1.2,
              ease: [0.34, 1.56, 0.64, 1]
            }}
            className="text-2xl md:text-4xl text-gray-100 max-w-4xl mx-auto leading-tight"
          >
            I build{' '}
            <motion.span
              className="inline-block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent font-bold"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity }}
              style={{ backgroundSize: '200% auto' }}
            >
              high-performance
            </motion.span>{' '}
            web applications that turn ideas into real products.
          </motion.p>
        </motion.div>


        <motion.div className="overflow-hidden mb-12">
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5, ease: "easeOut" }}
            className="text-lg text-gray-400 max-w-2xl mx-auto"
          >
            Frontend-focused product engineer combining design thinking, user experience, and scalable architecture to ship software that matters.
          </motion.p>
        </motion.div>

   
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <MagneticButton
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group px-8 py-4 bg-white text-gray-900 rounded-xl transition-all duration-200 flex items-center gap-2 shadow-lg shadow-white/20 relative overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
            <span className="relative z-10">View Projects</span>
            <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
          </MagneticButton>
          <MagneticButton
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-white/5 text-white rounded-xl transition-all duration-200 backdrop-blur-sm border border-white/10 hover:border-white/20 hover:bg-white/10"
          >
            Contact Me
          </MagneticButton>
        </motion.div>

     
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
          className="flex gap-6 justify-center"
        >
          {[
            { Icon: Github, delay: 0, href: "https://github.com/OzoyahOyakhire" },
            { Icon: Linkedin, delay: 0.1, href: "https://linkedin.com/in/oyakhire-justice-888a4b344" },
            { Icon: Mail, delay: 0.2, href: "#contact" },
          ].map(({ Icon: IconComponent, delay, href }, idx) => (
            <motion.a
              key={idx}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                duration: 0.6,
                delay: 0.5 + delay,
                ease: [0.34, 1.56, 0.64, 1],
              }}
              whileHover={{
                scale: 1.2,
                rotate: 5,
                y: -5,
              }}
              className="relative text-gray-400 hover:text-white transition-colors p-3 rounded-xl hover:bg-white/5"
            >
              <motion.div
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500 to-purple-500 opacity-0"
                whileHover={{ opacity: 0.2 }}
              />
              <IconComponent className="w-6 h-6 relative z-10" />
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Enhanced scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 2.5 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="relative"
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2 backdrop-blur-sm">
            <motion.div
              animate={{
                y: [0, 16, 0],
                opacity: [1, 0, 1],
              }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-2 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full"
            />
          </div>
          <motion.div
            className="absolute -inset-2 rounded-full bg-blue-500/20 blur-md"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          x: [0, 50, 0],
          y: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, -50, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          x: [0, 30, 0],
          y: [0, -30, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
    </section>
  );
}

// Magnetic button component
function MagneticButton({ 
  children, 
  onClick, 
  className = '' 
}: { 
  children: React.ReactNode; 
  onClick?: () => void; 
  className?: string;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const x = useSpring(0, { stiffness: 300, damping: 20 });
  const y = useSpring(0, { stiffness: 300, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isHovered) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;
    
    x.set(deltaX * 0.3);
    y.set(deltaY * 0.3);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}