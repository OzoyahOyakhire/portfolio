import { About, Stack } from '@/components/home/about-stack';
import { Hero } from '@/components/home/hero';
import { WorkFan } from '@/components/home/work-fan';
import { WorkList } from '@/components/home/work-list';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WorkFan />
      <WorkList />
      <About />
      <Stack />
    </>
  );
}
