import { HeroBackdrop } from '@/components/sections/Hero';
import { Button } from '@/components/ui/Button';
import { messages } from '@/content/messages';
import { ctas } from '@/content/site';

// 404 (A8 row 16, B10.5).
export default function NotFound() {
  return (
    <section className="relative flex min-h-[80vh] items-center overflow-hidden bg-hero-page pb-24 pt-36 text-white">
      <HeroBackdrop />
      <div className="container-x relative text-center">
        <p className="t-eyebrow text-mint-400">404</p>
        <h1 className="t-h1 mx-auto mt-4 max-w-2xl">{messages.notFound}</h1>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Button href={ctas.brainScan.href}>{ctas.brainScan.label}</Button>
          <Button href="/" variant="secondary">
            Go to the home page
          </Button>
        </div>
      </div>
    </section>
  );
}
