import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Services } from './components/Services';
import { Process } from './components/Process';
import { EngineeringMindset } from './components/EngineeringMindset';
import { ProductPhilosophy } from './components/ProductPhilosophy';
import { Skills } from './components/Skills';
import { Testimonials } from './components/Testimonials';
import { CTA } from './components/CTA';
import { Footer } from './components/Footer';
import { Marquee } from './components/Marquee';
import { SmoothScrollProvider } from './components/providers/SmoothScrollProvider';

export default function App() {
  return (
    <SmoothScrollProvider>
      <div className="min-h-screen bg-dark text-foreground overflow-x-hidden">
        <Navbar />
        <Hero />
        <Marquee />
        <About />
        <Projects />
        <Marquee />
        <Services />
        <Process />
        <EngineeringMindset />
        <ProductPhilosophy />
        <Skills />
        <Testimonials />
        <CTA />
        <Footer />
      </div>
    </SmoothScrollProvider>
  );
}
