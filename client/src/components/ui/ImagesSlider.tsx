import { type ReactNode, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/cn';

type ImagesSliderProps = {
  images: string[];
  children: ReactNode;
  className?: string;
  overlayClassName?: string;
  autoplay?: boolean;
};

export function ImagesSlider({ images, children, className, overlayClassName, autoplay = true }: ImagesSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const hasImages = images.length > 0;

  function showNext(): void {
    setCurrentIndex((index) => (index + 1) % images.length);
  }

  function showPrevious(): void {
    setCurrentIndex((index) => (index - 1 + images.length) % images.length);
  }

  useEffect(() => {
    if (!autoplay || images.length < 2) return undefined;
    const interval = window.setInterval(showNext, 5500);
    return () => window.clearInterval(interval);
  }, [autoplay, images.length]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent): void {
      const target = event.target as HTMLElement | null;
      if (target?.matches('input, textarea, select')) return;
      if (event.key === 'ArrowRight') showNext();
      if (event.key === 'ArrowLeft') showPrevious();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [images.length]);

  if (!hasImages) return null;

  return (
    <section className={cn('group relative isolate overflow-hidden rounded-2xl bg-[#0b1f4a]', className)} aria-label="Featured PDF tools">
      {images.map((image, index) => (
        <div
          key={image}
          aria-hidden="true"
          className={cn(
            'absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out',
            index === currentIndex ? 'scale-100 opacity-100' : 'scale-105 opacity-0',
          )}
          style={{ backgroundImage: `url("${image}")` }}
        />
      ))}
      <div className={cn('absolute inset-0 bg-gradient-to-r from-[#071835]/95 via-[#0b1f4a]/78 to-[#0b1f4a]/36', overlayClassName)} />
      <div className="relative z-10 h-full">{children}</div>

      {images.length > 1 && (
        <>
          <div className="absolute bottom-5 right-5 z-20 flex items-center gap-2">
            <button type="button" aria-label="Previous feature" onClick={showPrevious} className="grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-slate-950/25 text-white backdrop-blur-sm transition hover:bg-white/20">
              <ChevronLeft size={16} />
            </button>
            <button type="button" aria-label="Next feature" onClick={showNext} className="grid h-8 w-8 place-items-center rounded-full border border-white/25 bg-slate-950/25 text-white backdrop-blur-sm transition hover:bg-white/20">
              <ChevronRight size={16} />
            </button>
          </div>
          <div className="absolute bottom-6 left-6 z-20 flex gap-1.5" aria-hidden="true">
            {images.map((image, index) => <span key={image} className={cn('h-1.5 rounded-full transition-all', index === currentIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/45')} />)}
          </div>
        </>
      )}
    </section>
  );
}
