import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useMotionTemplate, AnimatePresence } from 'motion/react';
import gsap from 'gsap';

const rotatingPhrases = [
  'Software Products',
  'Intelligent Systems',
  'SaaS Platforms',
  'Digital Experiences',
  'Automation Tools',
];

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  pulseSpeed: number;
  layer: number;
  connectedTo: number[];
}

interface ProductPanelData {
  id: string;
  subtitle: string;
  icon: string;
  baseX: number;
  baseY: number;
  parallaxX: number;
  parallaxY: number;
  width: number;
  height: number;
  delay: number;
}

const productPanels: ProductPanelData[] = [
  { id: 'saas', subtitle: 'Analytics Platform', icon: '◈', baseX: -280, baseY: -60, parallaxX: -8, parallaxY: 5, width: 200, height: 140, delay: 3.0 },
  { id: 'ai', subtitle: 'Intelligence System', icon: '⬡', baseX: 280, baseY: -80, parallaxX: 8, parallaxY: -5, width: 180, height: 130, delay: 3.15 },
  { id: 'web', subtitle: 'Product Engine', icon: '◇', baseX: -300, baseY: 80, parallaxX: -5, parallaxY: 8, width: 190, height: 135, delay: 3.3 },
  { id: 'automation', subtitle: 'Workflow Engine', icon: '△', baseX: 260, baseY: 100, parallaxX: 10, parallaxY: -3, width: 175, height: 125, delay: 3.45 },
  { id: 'mobile', subtitle: 'Cross-Platform', icon: '⬢', baseX: 0, baseY: -160, parallaxX: 0, parallaxY: 10, width: 160, height: 120, delay: 3.6 },
];

function NetworkCanvas({ containerRef }: { containerRef: React.RefObject<HTMLDivElement | null> }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nodesRef = useRef<Node[]>([]);
  const animFrameRef = useRef<number>(0);
  const timeRef = useRef(0);
  const phaseRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);
  const isMobileRef = useRef(false);

  const initNodes = useCallback((width: number, height: number, isMobile: boolean) => {
    const count = isMobile ? 20 : Math.min(55, Math.floor((width * height) / 25000));
    const nodes: Node[] = [];
    for (let i = 0; i < count; i++) {
      const layer = Math.floor(Math.random() * 3);
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.12,
        radius: 1.5 + Math.random() * 2,
        baseRadius: 1.5 + Math.random() * 2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.5 + Math.random() * 1.5,
        layer,
        connectedTo: [],
      });
    }

    const maxDist = Math.min(width, height) * (isMobile ? 0.25 : 0.18);
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < maxDist && Math.abs(nodes[i].layer - nodes[j].layer) <= 1) {
          if (nodes[i].connectedTo.length < 3 && nodes[j].connectedTo.length < 3) {
            nodes[i].connectedTo.push(j);
            nodes[j].connectedTo.push(i);
          }
        }
      }
    }

    nodesRef.current = nodes;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    isMobileRef.current = window.matchMedia('(pointer: coarse)').matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      isMobileRef.current = window.matchMedia('(pointer: coarse)').matches;
      initNodes(rect.width, rect.height, isMobileRef.current);
    };

    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const dt = 0.016;
      timeRef.current += dt;
      const t = timeRef.current;
      const phase = phaseRef.current;
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const scrollProg = scrollRef.current;
      const isMobile = isMobileRef.current;

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      if (!nodes.length) {
        animFrameRef.current = requestAnimationFrame(draw);
        return;
      }

      const gridOpacity = Math.min(1, phase * 0.7);
      const connectionOpacity = Math.min(1, Math.max(0, (phase - 0.5) * 1.5));
      const nodeScale = Math.min(1, phase * 1.2);

      if (gridOpacity > 0.01) {
        const gridSize = isMobile ? 80 : 60;
        const gridFade = gridOpacity * (isMobile ? 0.025 : 0.04);
        ctx.strokeStyle = `rgba(218, 165, 32, ${gridFade})`;
        ctx.lineWidth = 0.5;

        const waveOffset = t * (isMobile ? 15 : 30);
        for (let x = -gridSize; x < w + gridSize; x += gridSize) {
          const wave = Math.sin((x + waveOffset) * 0.008) * (isMobile ? 1 : 2);
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x + wave, h);
          ctx.stroke();
        }
        for (let y = -gridSize; y < h + gridSize; y += gridSize) {
          const wave = Math.sin((y + waveOffset * 0.7) * 0.008) * (isMobile ? 1 : 2);
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(w, y + wave);
          ctx.stroke();
        }
      }

      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.x = Math.max(0, Math.min(w, node.x));
        node.y = Math.max(0, Math.min(h, node.y));

        if (!isMobile && mx > 0 && my > 0) {
          const dx = mx - node.x;
          const dy = my - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 200 && dist > 0) {
            const force = ((200 - dist) / 200) * 0.0003;
            node.vx += dx * force;
            node.vy += dy * force;
          }
        }
        node.vx *= 0.99;
        node.vy *= 0.99;

        node.radius = node.baseRadius + Math.sin(t * node.pulseSpeed + node.pulsePhase) * 0.8;
      }

      if (connectionOpacity > 0.01) {
        const maxConnDist = Math.min(w, h) * 0.2;
        const drawn = new Set<string>();

        for (let i = 0; i < nodes.length; i++) {
          for (const j of nodes[i].connectedTo) {
            const key = `${Math.min(i, j)}-${Math.max(i, j)}`;
            if (drawn.has(key)) continue;
            drawn.add(key);

            const n1 = nodes[i];
            const n2 = nodes[j];
            const dx = n2.x - n1.x;
            const dy = n2.y - n1.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < maxConnDist) {
              const distFactor = 1 - dist / maxConnDist;
              const alpha = distFactor * connectionOpacity * (isMobile ? 0.08 : 0.12);

              ctx.beginPath();
              ctx.moveTo(n1.x, n1.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = `rgba(218, 165, 32, ${alpha})`;
              ctx.lineWidth = Math.max(0.3, 0.6 * distFactor * nodeScale);
              ctx.stroke();

              if (connectionOpacity > 0.3 && distFactor > 0.5) {
                const pulsePos = ((t * 0.3 + i * 0.1) % 1);
                const px = n1.x + dx * pulsePos;
                const py = n1.y + dy * pulsePos;
                const pulseAlpha = Math.sin(pulsePos * Math.PI) * alpha * 1.5;
                const pulseRadius = Math.max(1, 2 * nodeScale);

                const pulseGrad = ctx.createRadialGradient(px, py, 0, px, py, pulseRadius * 3);
                pulseGrad.addColorStop(0, `rgba(218, 165, 32, ${pulseAlpha})`);
                pulseGrad.addColorStop(1, `rgba(218, 165, 32, 0)`);
                ctx.beginPath();
                ctx.arc(px, py, pulseRadius * 3, 0, Math.PI * 2);
                ctx.fillStyle = pulseGrad;
                ctx.fill();
              }
            }
          }
        }
      }

      for (const node of nodes) {
        const r = Math.max(0.5, node.radius * nodeScale);
        let mouseGlow = 0;
        if (!isMobile && mx > 0 && my > 0) {
          const distToMouse = Math.sqrt((mx - node.x) ** 2 + (my - node.y) ** 2);
          mouseGlow = distToMouse < 250 ? (250 - distToMouse) / 250 : 0;
        }
        const glowAlpha = (0.3 + mouseGlow * 0.4) * Math.min(1, phase);

        if (nodeScale > 0.1 && !isMobile) {
          const glowSize = r * (3 + mouseGlow * 4);
          const glow = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, glowSize);
          glow.addColorStop(0, `rgba(218, 165, 32, ${glowAlpha * 0.25})`);
          glow.addColorStop(0.5, `rgba(218, 165, 32, ${glowAlpha * 0.06})`);
          glow.addColorStop(1, `rgba(218, 165, 32, 0)`);
          ctx.beginPath();
          ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
          ctx.fillStyle = glow;
          ctx.fill();
        }

        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        const nodeAlpha = (0.5 + mouseGlow * 0.5) * Math.min(1, phase);
        ctx.fillStyle = `rgba(218, 165, 32, ${nodeAlpha})`;
        ctx.fill();
      }

      if (!isMobile && mx > 0 && my > 0) {
        const cursorGrad = ctx.createRadialGradient(mx, my, 0, mx, my, 180);
        cursorGrad.addColorStop(0, `rgba(218, 165, 32, 0.035)`);
        cursorGrad.addColorStop(0.5, `rgba(218, 165, 32, 0.012)`);
        cursorGrad.addColorStop(1, `rgba(218, 165, 32, 0)`);
        ctx.beginPath();
        ctx.arc(mx, my, 180, 0, Math.PI * 2);
        ctx.fillStyle = cursorGrad;
        ctx.fill();
      }

      if (gridOpacity > 0.01 && !isMobile) {
        const beamX = (t * 60) % (w + 400) - 200;
        const beamGrad = ctx.createLinearGradient(beamX - 100, 0, beamX + 100, 0);
        beamGrad.addColorStop(0, `rgba(218, 165, 32, 0)`);
        beamGrad.addColorStop(0.5, `rgba(218, 165, 32, ${0.035 * gridOpacity})`);
        beamGrad.addColorStop(1, `rgba(218, 165, 32, 0)`);
        ctx.fillStyle = beamGrad;
        ctx.fillRect(beamX - 100, 0, 200, h);
      }

      if (isMobile) {
        const vertBeamY = (t * 40) % (h + 400) - 200;
        const vertGrad = ctx.createLinearGradient(0, vertBeamY - 100, 0, vertBeamY + 100);
        vertGrad.addColorStop(0, `rgba(218, 165, 32, 0)`);
        vertGrad.addColorStop(0.5, `rgba(218, 165, 32, ${0.025 * gridOpacity})`);
        vertGrad.addColorStop(1, `rgba(218, 165, 32, 0)`);
        ctx.fillStyle = vertGrad;
        ctx.fillRect(0, vertBeamY - 100, w, 200);
      }

      if (scrollProg > 0 && scrollProg < 1) {
        ctx.fillStyle = `rgba(5, 5, 5, ${scrollProg * 0.3})`;
        ctx.fillRect(0, 0, w, h);
      }

      animFrameRef.current = requestAnimationFrame(draw);
    };

    animFrameRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [containerRef, initNodes]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  );
}

function ProductPanel({ panel, mouseX, mouseY, visible }: {
  panel: ProductPanelData;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  visible: boolean;
}) {
  const xTransform = useTransform(mouseX, (v: number) =>
    panel.baseX + (v - 0.5) * panel.parallaxX * 6
  );
  const yTransform = useTransform(mouseY, (v: number) =>
    panel.baseY + (v - 0.5) * panel.parallaxY * 6
  );
  const rotateXValue = useTransform(mouseY, (v: number) =>
    panel.parallaxY + (v - 0.5) * 5
  );
  const rotateYValue = useTransform(mouseX, (v: number) =>
    panel.parallaxX + (v - 0.5) * 5
  );

  const translateX = useMotionTemplate`calc(-50% + ${xTransform}px)`;
  const translateY = useMotionTemplate`calc(-50% + ${yTransform}px)`;
  const rotX = useMotionTemplate`${rotateXValue}deg`;
  const rotY = useMotionTemplate`${rotateYValue}deg`;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? { opacity: 1, scale: 1 } : {}}
      transition={{
        duration: 1.2,
        delay: panel.delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className="absolute left-1/2 top-1/2 hidden lg:block pointer-events-none"
      style={{
        translateX,
        translateY,
        rotateX: rotX,
        rotateY: rotY,
        perspective: '1000px',
        transformStyle: 'preserve-3d',
        width: panel.width,
        height: panel.height,
      }}
    >
      <div className="relative w-full h-full rounded-lg overflow-hidden glass border-[0.5px] border-gold/[0.08] group">
        <div className="absolute inset-0 bg-gradient-to-br from-gold/[0.03] to-transparent" />
        <div className="absolute inset-0 opacity-30">
          <div className="flex gap-1.5 p-3">
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/20" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/10" />
            <div className="w-1.5 h-1.5 rounded-full bg-foreground/10" />
          </div>
          <div className="px-3 space-y-1.5">
            <div className="h-1 w-16 bg-foreground/[0.06] rounded" />
            <div className="h-1 w-24 bg-foreground/[0.04] rounded" />
          </div>
          <div className="p-3 space-y-1.5">
            <div className="h-8 w-full bg-foreground/[0.03] rounded" />
            <div className="flex gap-1.5">
              <div className="h-6 flex-1 bg-gold/[0.04] rounded" />
              <div className="h-6 flex-1 bg-foreground/[0.03] rounded" />
            </div>
            <div className="h-4 w-full bg-foreground/[0.02] rounded" />
            <div className="h-4 w-3/4 bg-foreground/[0.02] rounded" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-dark/80 to-transparent">
          <div className="flex items-center gap-2">
            <span className="text-gold/60 text-[10px]">{panel.icon}</span>
            <span className="text-[10px] font-mono text-foreground/40 tracking-wider uppercase">{panel.subtitle}</span>
          </div>
        </div>
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-gold/[0.05] to-transparent pointer-events-none" />
      </div>
    </motion.div>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const canvasPhaseRef = useRef(0);
  const canvasMouseRef = useRef({ x: 0, y: 0 });
  const canvasScrollRef = useRef(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [textVisible, setTextVisible] = useState(false);
  const [uiVisible, setUiVisible] = useState(false);
  const [panelsVisible, setPanelsVisible] = useState(false);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const networkOpacity = useTransform(scrollYProgress, [0, 0.5], [0.8, 0.3]);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v: number) => {
      canvasScrollRef.current = v;
    });
    return unsubscribe;
  }, [scrollYProgress]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect();
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top) / rect.height;
        mouseX.set(nx);
        mouseY.set(ny);
        canvasMouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(canvasPhaseRef, {
      current: 0.15,
      duration: 0.3,
      ease: 'none',
      onUpdate: () => { canvasPhaseRef.current = Math.max(canvasPhaseRef.current, 0.15); },
    });
    tl.to(canvasPhaseRef, {
      current: 0.4,
      duration: 0.4,
      ease: 'none',
      onUpdate: () => { canvasPhaseRef.current = Math.max(canvasPhaseRef.current, 0.4); },
    });
    tl.to(canvasPhaseRef, {
      current: 0.7,
      duration: 0.5,
      ease: 'none',
      onUpdate: () => { canvasPhaseRef.current = Math.max(canvasPhaseRef.current, 0.7); },
    });
    tl.to(canvasPhaseRef, {
      current: 1,
      duration: 0.4,
      ease: 'none',
      onUpdate: () => { canvasPhaseRef.current = 1; },
    });
    tl.add(() => setTextVisible(true), '+=0.1');
    tl.add(() => setUiVisible(true), '+=0.3');
    tl.add(() => setPanelsVisible(true), '+=0.2');

    return () => { tl.kill(); };
  }, []);

  useEffect(() => {
    if (!textVisible) return;
    const interval = setInterval(() => {
      setPhraseIndex((prev) => (prev + 1) % rotatingPhrases.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [textVisible]);

  useEffect(() => {
    if (!textVisible || !headlineRef.current) return;

    const chars = headlineRef.current.querySelectorAll('.char');
    gsap.fromTo(
      chars,
      {
        opacity: 0,
        y: 80,
        rotateX: -60,
        filter: 'blur(12px)',
      },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        filter: 'blur(0px)',
        duration: 1,
        stagger: 0.02,
        ease: 'expo.out',
      }
    );
  }, [textVisible]);

  const headline = "Building Software That Powers Businesses";
  const words = headline.split(' ');

  const tiltX = useTransform(mouseY, (v: number) => (v - 0.5) * -4);
  const tiltY = useTransform(mouseX, (v: number) => (v - 0.5) * 4);
  const headlineTransform = useMotionTemplate`rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 bg-dark" />

      <motion.div className="absolute inset-0" style={{ opacity: networkOpacity }}>
        <NetworkCanvas containerRef={sectionRef} />
      </motion.div>

      <motion.div
        className="absolute top-[20%] left-[20%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(218,165,32,0.07), transparent 70%)' }}
        animate={{ x: [0, 80, -40, 0], y: [0, -60, 50, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />

      <motion.div
        className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(218,165,32,0.04), transparent 70%)' }}
        animate={{ x: [0, -60, 40, 0], y: [0, 50, -80, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear', delay: 3 }}
      />

      {panelsVisible && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {productPanels.map((panel) => (
            <ProductPanel
              key={panel.id}
              panel={panel}
              mouseX={mouseX}
              mouseY={mouseY}
              visible={panelsVisible}
            />
          ))}
        </div>
      )}

      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 w-full"
      >
        {uiVisible && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="flex items-center gap-3 mb-8"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left"
            >
              <span className="px-3 py-1 font-mono text-[11px] tracking-[0.2em] uppercase text-gold/70 border border-gold/20 rounded-sm bg-gold/[0.03]">
                Software Developer
              </span>
            </motion.div>
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="origin-left flex items-center gap-3"
            >
              <span className="h-px w-12 bg-foreground/10" />
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-foreground/25">
                Product Engineer
              </span>
            </motion.div>
          </motion.div>
        )}

        {textVisible && (
          <div
            ref={headlineRef}
            className="perspective-1000"
            style={{
              transform: headlineTransform,
              transformStyle: 'preserve-3d',
              transition: 'transform 0.15s ease-out',
            }}
          >
            <div className="flex flex-wrap">
              {words.map((word, wi) => (
                <span key={wi} className="inline-flex mr-[0.3em]">
                  {word.split('').map((char, ci) => (
                    <span
                      key={`${wi}-${ci}`}
                      className={`char inline-block text-[clamp(3rem,8vw,8rem)] font-heading font-bold leading-[0.9] ${
                        word === 'Businesses' ? 'text-gradient-gold italic' : 'text-foreground'
                      }`}
                      style={{
                        opacity: 0,
                        display: 'inline-block',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </div>
          </div>
        )}

        {uiVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-4 overflow-hidden h-[2.5rem]"
          >
            <div className="flex items-center gap-3">
              <span className="text-lg md:text-xl text-foreground/40 font-light">I build</span>
              <div className="relative h-[2.5rem] overflow-hidden min-w-[200px] md:min-w-[300px]">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={phraseIndex}
                    initial={{ y: 40, opacity: 0, filter: 'blur(8px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: -40, opacity: 0, filter: 'blur(8px)' }}
                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center text-lg md:text-xl text-gold font-medium"
                  >
                    {rotatingPhrases[phraseIndex]}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        )}

        {uiVisible && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl"
          >
            <p className="text-lg md:text-xl text-foreground/40 leading-relaxed font-light">
              I design and engineer high-performance software products, intelligent systems, and digital experiences that help businesses grow.
              <span className="text-foreground/60"> Founder of Crafts and Code Studio.</span>
            </p>
          </motion.div>
        )}

        {uiVisible && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row gap-4 items-start"
          >
            <MagneticButton
              onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              className="group relative px-8 py-4 bg-foreground text-background rounded-sm font-medium text-sm tracking-wide overflow-hidden flex items-center gap-3"
            >
              <span className="relative z-20">View My Products</span>
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
        )}

        {uiVisible && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
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
        )}
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
