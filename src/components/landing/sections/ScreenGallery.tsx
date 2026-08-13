'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { LocalImage } from '@/components/LocalImage';

export type Screen = {
  readonly src: string;
  readonly caption: string;
  readonly alt: string;
};

/**
 * Dot carousel over the app screenshots — three screens per page on desktop,
 * one on mobile. The track is a native scroll-snap container (so trackpad and
 * touch swipe work for free); the dots read the scroll position back and
 * scroll to a page on click. Arrows wrap around, so the gallery loops.
 *
 * Page math relies on each item being exactly 1/perView of the track width —
 * hence padding inside the items instead of a flex `gap`, which would make
 * scrollLeft drift out of step with clientWidth.
 */
export const ScreenGallery = ({ screens }: { screens: readonly Screen[] }) => {
  const t = useTranslations('common');
  const trackRef = useRef<HTMLUListElement>(null);
  const [perView, setPerView] = useState(1);
  const [page, setPage] = useState(0);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 768px)');
    const sync = () => setPerView(query.matches ? 3 : 1);
    sync();
    query.addEventListener('change', sync);
    return () => query.removeEventListener('change', sync);
  }, []);

  const pageCount = Math.max(1, Math.ceil(screens.length / perView));

  const readPage = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    // The last page is a partial scroll (7 screens over 3 columns), so snap the
    // reading to the last dot once the track is scrolled all the way right.
    const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
    const next = atEnd ? pageCount - 1 : Math.round(track.scrollLeft / track.clientWidth);
    setPage(Math.min(Math.max(next, 0), pageCount - 1));
  }, [pageCount]);

  useEffect(readPage, [readPage]);

  const goTo = (next: number) => {
    const track = trackRef.current;
    if (!track) return;
    const wrapped = (next + pageCount) % pageCount;
    track.scrollTo({ left: wrapped * track.clientWidth, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative w-full">
        <ul
          ref={trackRef}
          onScroll={readPage}
          // overflow-y-clip, not the default auto that overflow-x-auto implies:
          // an auto y-axis makes the track swallow the page's wheel scroll.
          className="ld-noscrollbar -mx-3 flex snap-x snap-mandatory overflow-x-auto overflow-y-clip py-4"
        >
          {screens.map((screen) => (
            <li
              key={screen.src}
              className="w-full shrink-0 snap-start px-3 md:w-1/3"
            >
              <figure className="flex flex-col items-center gap-4">
                <div className="ld-lift w-full rounded-[2.1rem] border border-[var(--ld-line)] bg-[var(--ld-surface)] p-[7px] shadow-[0_12px_32px_rgba(43,74,99,0.1)]">
                  <LocalImage
                    src={screen.src}
                    alt={screen.alt}
                    width={660}
                    height={1404}
                    sizes="(max-width: 768px) 90vw, 340px"
                    className="h-auto w-full rounded-[1.7rem]"
                  />
                </div>
                <figcaption className="text-lg text-[var(--ld-ink)] md:text-xl">
                  {screen.caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {[
          { dir: -1, label: t('previousScreens'), glyph: '‹', side: 'left-0 md:-left-5' },
          { dir: 1, label: t('nextScreens'), glyph: '›', side: 'right-0 md:-right-5' },
        ].map((arrow) => (
          <button
            key={arrow.label}
            type="button"
            aria-label={arrow.label}
            onClick={() => goTo(page + arrow.dir)}
            // Mobile drives the track by swipe — arrows would just sit on top
            // of the one screen it shows.
            className={`absolute top-[38%] ${arrow.side} hidden h-11 w-11 place-items-center md:grid rounded-full border border-[var(--ld-line)] bg-[var(--ld-surface)] text-2xl leading-none text-[var(--ld-text-2)] shadow-[0_6px_20px_rgba(43,74,99,0.12)] transition hover:text-[var(--ld-ink)]`}
          >
            <span aria-hidden="true" className="-mt-1">
              {arrow.glyph}
            </span>
          </button>
        ))}
      </div>

      <div className="flex items-center gap-2.5">
        {Array.from({ length: pageCount }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={t('screenOf', { i: index + 1, n: pageCount })}
            aria-current={index === page}
            onClick={() => goTo(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === page
                ? 'w-7 bg-[var(--ld-accent)]'
                : 'w-2.5 bg-[var(--ld-line-strong)] hover:bg-[var(--ld-text-3)]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
