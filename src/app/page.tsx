import { About } from '@/components/sections/about';
import { Contact, Testimonials } from '@/components/sections/contact';
import { Hero } from '@/components/sections/hero';
import { Principles, Stack } from '@/components/sections/principles';
import { Process, Services } from '@/components/sections/services';
import { Work } from '@/components/sections/work';

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Services />
      <Process />
      <Work />
      <Principles />
      <Stack />
      <Testimonials />
      <Contact />
    </>
  );
}
