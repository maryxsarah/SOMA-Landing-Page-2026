'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/cn';

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  /** Stagger offset in ms — use for card grids (i * 90). */
  delay?: number;
}

/**
 * Scroll-reveal wrapper: adds .ld-in once when the element enters the
 * viewport (see .ld-reveal in landing.css). Content is server-rendered as
 * usual — only the entrance animation is client-side, and reduced-motion /
 * no-JS users see everything immediately.
 */
export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0 }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('ld-in');
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn('ld-reveal', className)}
      style={delay ? ({ '--ld-reveal-delay': `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {children}
    </div>
  );
};
