import Link from 'next/link';
import { ArrowLeft } from '@/components/icons';
import { Band } from '@/components/primitives/band';
import { Logo } from '@/components/site/logo';

export default function NotFound() {
  return (
    <Band as="div" innerClassName="flex min-h-[70svh] flex-col justify-center py-24">
      <Logo size={56} className="text-navy" />
      <p className="mt-8 label text-navy">404</p>
      <h1 className="mt-4 max-w-[16ch] font-display text-5xl leading-none font-extrabold tracking-tighter md:text-6xl">
        Nothing was built here.
      </h1>
      <p className="mt-5 max-w-[44ch] text-lg leading-relaxed text-muted">
        The page you were after doesn’t exist — or it did once and I took it apart.
      </p>
      <Link
        href="/"
        className="mt-9 inline-flex w-fit items-center gap-2 bg-ink px-6 py-4 label text-paper hover:bg-navy"
      >
        <ArrowLeft width={12} height={12} /> Back to the start
      </Link>
    </Band>
  );
}
