import React, { useEffect, useState } from 'react';
import { SplashRoseSvg } from '../BotanicalArt';

interface SplashCoverProps {
  monogram: string;
  onOpenStart?: () => void;
  onEnter: () => void;
}

export const SplashCover: React.FC<SplashCoverProps> = ({ monogram, onOpenStart, onEnter }) => {
  const [frameVisible, setFrameVisible] = useState(false);
  const [monogramVisible, setMonogramVisible] = useState(false);
  const [roseDrawn, setRoseDrawn] = useState(false);
  const [ctaVisible, setCtaVisible] = useState(false);
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setFrameVisible(true);
      setMonogramVisible(true);
      setRoseDrawn(true);
      setCtaVisible(true);
      return;
    }

    const t1 = window.setTimeout(() => setFrameVisible(true), 60);
    const t2 = window.setTimeout(() => setMonogramVisible(true), 550);
    const t3 = window.setTimeout(() => setRoseDrawn(true), 1050);
    const t4 = window.setTimeout(() => setCtaVisible(true), 1450);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
      window.clearTimeout(t4);
    };
  }, []);

  const handleOpen = () => {
    if (exiting) return;
    // Start audio synchronously inside the user click gesture so mobile/desktop browsers never block autoplay
    onOpenStart?.();
    setExiting(true);
    window.setTimeout(() => {
      onEnter();
    }, 680);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Invitation Cover"
      className={`fixed inset-0 z-50 flex items-center justify-center bg-[#FFFDFC] px-4 py-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        exiting ? 'opacity-0 scale-[1.04] pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      <div
        className={`relative flex flex-col items-center justify-between w-full max-w-[336px] sm:max-w-[376px] h-[min(88dvh,664px)] rounded-[9999px] bg-[#FAF6EE] border border-[#c98f9f] shadow-editorial overflow-hidden pt-14 sm:pt-16 pb-[74px] sm:pb-[84px] px-7 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          frameVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.96]'
        }`}
      >
        {/* Top Monogram */}
        <div
          className={`relative z-10 font-display-cinzel text-[68px] sm:text-[78px] leading-none tracking-[0.06em] text-[#c98f9f] select-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            monogramVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {monogram}
        </div>

        {/* Full-Scale Botanical Rose SVG Line-Draw filling the heart of the oval */}
        <div className="pointer-events-none absolute inset-x-0 top-[148px] sm:top-[164px] bottom-0 flex items-start justify-center">
          <SplashRoseSvg drawn={roseDrawn} />
        </div>

        {/* Bottom Pill CTA — lifted comfortably inside the wider lower arch */}
        <div
          className={`relative z-10 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <button
            type="button"
            onClick={handleOpen}
            className="splash-cta-breathe whitespace-nowrap px-6 sm:px-7 py-2.5 sm:py-3 rounded-full bg-[#FAF6EE]/90 backdrop-blur-sm border border-[#c98f9f] text-[#c98f9f] text-[12px] sm:text-[13.5px] font-semibold tracking-[0.22em] sm:tracking-[0.26em] uppercase hover:bg-[#c98f9f] hover:text-[#FFFDF7] active:scale-[0.97] transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c98f9f]/60"
          >
            VIEW INVITATION
          </button>
        </div>
      </div>
    </div>
  );
};
