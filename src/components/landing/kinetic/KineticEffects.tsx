'use client';

import { useEffect } from 'react';

/**
 * Global interaction wiring for the Kinetic v7 homepage: scroll-reveal
 * ([data-r]), scroll parallax ([data-px]), pointer-magnetic tilt
 * ([data-magnet]), animated progress bars ([data-bar]) and count-up numbers
 * ([data-count]). One mount point queries the whole `.ld-kinetic` subtree —
 * mirrors this design's original imperative wiring rather than wrapping
 * every element individually, since several of these (bento grid columns,
 * the hero's absolutely-positioned floaters) would break their layout if
 * wrapped in an extra div the way <Reveal> does elsewhere on this site.
 */
export const KineticEffects = () => {
  useEffect(() => {
    const root = document.querySelector<HTMLElement>('.ld-kinetic');
    if (!root) return;
    root.dataset.js = 'on';

    const reveal = (el: Element) => {
      el.setAttribute('data-shown', '');
      el.querySelectorAll<HTMLElement>('[data-bar]').forEach((b) => {
        const fill = b.firstElementChild as HTMLElement | null;
        if (fill) fill.style.width = `${parseFloat(b.dataset.bar ?? '0') * 100}%`;
      });
      el.querySelectorAll<HTMLElement>('[data-count]').forEach((n) => {
        const target = parseFloat(n.dataset.count ?? '0');
        const dec = Number(n.dataset.decimals ?? 0);
        const suffix = n.dataset.suffix ?? '';
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / 1400);
          n.textContent = (target * (1 - Math.pow(1 - k, 4))).toFixed(dec) + (k === 1 ? suffix : '');
          if (k < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    );
    root.querySelectorAll('[data-r]').forEach((el) => io.observe(el));
    const safety = setTimeout(() => {
      root.querySelectorAll('[data-r]:not([data-shown])').forEach(reveal);
    }, 2800);

    let raf = 0;
    const pxEls = Array.from(root.querySelectorAll<HTMLElement>('[data-px]'));
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        pxEls.forEach((el) => {
          el.style.translate = `0 ${(-y * parseFloat(el.dataset.px ?? '0')).toFixed(1)}px`;
        });
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const onMove = (e: PointerEvent) => {
      root.querySelectorAll<HTMLElement>('[data-magnet]').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -200 || r.top > window.innerHeight + 200) return;
        const dx = (e.clientX - (r.left + r.width / 2)) / r.width;
        const dy = (e.clientY - (r.top + r.height / 2)) / r.height;
        const near = Math.abs(dx) < 1.2 && Math.abs(dy) < 1.2;
        el.style.transform = near
          ? `perspective(1000px) rotateY(${(dx * 5).toFixed(2)}deg) rotateX(${(-dy * 4).toFixed(2)}deg) translateY(-3px)`
          : 'none';
      });
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    return () => {
      delete root.dataset.js;
      clearTimeout(safety);
      io.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('pointermove', onMove);
    };
  }, []);

  return null;
};
