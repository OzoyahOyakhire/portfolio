import { useEffect, useRef, createContext, useContext } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface GSAPContextType {
  registerReveal: (el: HTMLElement, options?: gsap.TweenVars) => void;
}

const GSAPCtx = createContext<GSAPContextType | null>(null);

export function useGSAP() {
  const ctx = useContext(GSAPCtx);
  if (!ctx) throw new Error('useGSAP must be used within GSAPProvider');
  return ctx;
}

export function GSAPProvider({ children }: { children: React.ReactNode }) {
  const revealsRef = useRef<gsap.core.Tween[]>([]);

  const registerReveal = (el: HTMLElement, options: gsap.TweenVars = {}) => {
    const tween = gsap.from(el, {
      y: 80,
      opacity: 0,
      duration: 1.2,
      ease: 'power3.out',
      ...options,
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        toggleActions: 'play none none none',
        ...((options.scrollTrigger as ScrollTrigger.Vars) || {}),
      },
    });
    revealsRef.current.push(tween);
  };

  useEffect(() => {
    return () => {
      revealsRef.current.forEach(t => t.kill());
      ScrollTrigger.getAll().forEach(t => t.kill());
    };
  }, []);

  return (
    <GSAPCtx.Provider value={{ registerReveal }}>
      {children}
    </GSAPCtx.Provider>
  );
}
