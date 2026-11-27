import React, { useEffect, useRef, useState } from 'react';
import { GuestWish, WeddingTemplateConfig } from '../../config/weddingConfig';

interface WordsOfLoveSectionProps {
  config: WeddingTemplateConfig;
  wishes: GuestWish[];
}

export const WordsOfLoveSection: React.FC<WordsOfLoveSectionProps> = ({ config, wishes }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const safeWishes = wishes.length > 0 ? wishes : config.wordsOfLove.wishes;
  const currentIndex = activeIndex % safeWishes.length;
  const activeWish = safeWishes[currentIndex];

  useEffect(() => {
    if (paused || safeWishes.length <= 1) return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const timer = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % safeWishes.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [paused, safeWishes.length]);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchStartXRef.current = e.touches[0]?.clientX ?? null;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartXRef.current === null || safeWishes.length <= 1) return;
    const endX = e.changedTouches[0]?.clientX ?? touchStartXRef.current;
    const delta = endX - touchStartXRef.current;
    touchStartXRef.current = null;
    if (Math.abs(delta) < 40) return;
    if (delta < 0) {
      setActiveIndex((prev) => (prev + 1) % safeWishes.length);
    } else {
      setActiveIndex((prev) => (prev - 1 + safeWishes.length) % safeWishes.length);
    }
  };

  return (
    <section
      id="wishes"
      className="w-full bg-[#FFFAF7] py-24 px-4 sm:px-6 text-center"
    >
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        <h2
          data-reveal
          className="font-display-cinzel text-[#92786B] text-[28px] sm:text-[36px] tracking-[0.04em]"
        >
          {config.wordsOfLove.heading}
        </h2>
        <div data-reveal className="mt-3 w-32 h-1 rounded-full bg-[#92786B]" />
        <p
          data-reveal
          className="mt-5 text-[#C4B47B] text-[15px] sm:text-[19px] leading-relaxed max-w-3xl font-normal"
        >
          {config.wordsOfLove.subtitle}
        </p>

        {/* Double-Bordered Quote Carousel with Decorative Corner Brackets (1:1 with reference site) */}
        <div
          data-reveal
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative mt-14 w-full max-w-3xl bg-[#FFFAF7] p-2.5 shadow-editorial"
          style={{ border: '2px solid #FDF5E6' }}
        >
          <div className="relative border border-[#aa954b]/30 bg-[#FFFAF7] px-8 sm:px-14 py-12 sm:py-16 min-h-[340px] sm:min-h-[310px] flex flex-col items-center justify-center">
            {/* 4 Corner Editorial Brackets */}
            <span aria-hidden="true" className="absolute top-0 left-0 w-7 h-7 border-t border-l border-[#C4B47B]/60" />
            <span aria-hidden="true" className="absolute top-0 right-0 w-7 h-7 border-t border-r border-[#C4B47B]/60" />
            <span aria-hidden="true" className="absolute bottom-0 left-0 w-7 h-7 border-b border-l border-[#C4B47B]/60" />
            <span aria-hidden="true" className="absolute bottom-0 right-0 w-7 h-7 border-b border-r border-[#C4B47B]/60" />

            <blockquote
              key={activeWish.id}
              className={`digit-tick text-[#9F8B4E] text-[16px] sm:text-[18px] max-w-xl ${
                activeWish.lang === 'si'
                  ? 'font-sinhala-serif'
                  : 'font-sans leading-relaxed'
              }`}
            >
              {activeWish.quote}
            </blockquote>

            <p
              key={`${activeWish.id}-author`}
              className="mt-6 text-[#C4B47B] text-[14px] sm:text-[15px] font-semibold tracking-[0.04em]"
            >
              – {activeWish.author}
            </p>
          </div>
        </div>

        {/* Exact Pagination Dots (#aa954b scale-125 active / #aa954b/50 inactive) */}
        {safeWishes.length > 1 && (
          <div
            className="mt-8 flex items-center justify-center gap-3"
            role="tablist"
            aria-label="Guest wishes"
          >
            {safeWishes.map((wish, idx) => {
              const isActive = idx === currentIndex;
              return (
                <button
                  key={wish.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={`Show wish from ${wish.author}`}
                  onClick={() => setActiveIndex(idx)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    isActive
                      ? 'bg-[#aa954b] scale-125'
                      : 'bg-[#aa954b]/50 hover:bg-[#aa954b]/70'
                  }`}
                />
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
