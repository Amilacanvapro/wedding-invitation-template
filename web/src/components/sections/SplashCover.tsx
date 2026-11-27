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
        className={`relative flex flex-col items-center justify-between w-full max-w-[332px] sm:max-w-[366px] h-[min(90dvh,690px)] rounded-[9999px] bg-[#FAF6EE] border border-[#c98f9f] shadow-editorial overflow-hidden pt-14 pb-8 px-6 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          frameVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.96]'
        }`}
      >
        {/* Top Monogram */}
        <div
          className={`font-display-cinzel text-[64px] sm:text-[74px] leading-none tracking-[0.06em] text-[#c98f9f] select-none transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            monogramVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {monogram}
        </div>

        {/* Center Botanical Rose SVG Line-Draw */}
        <div className="relative flex-1 flex items-end justify-center w-full -mb-10">
          <SplashRoseSvg drawn={roseDrawn} />
        </div>

        {/* Bottom Pill CTA */}
        <div
          className={`relative z-10 mb-2 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
            ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
        >
          <button
            type="button"
            onClick={handleOpen}
            className="splash-cta-breathe px-7 sm:px-8 py-3 rounded-full bg-[#FFFDF7]/85 backdrop-blur-sm border border-[#c98f9f] text-[#c98f9f] text-[13px] sm:text-[15px] font-semibold tracking-[0.28em] sm:tracking-[0.3em] uppercase hover:bg-[#c98f9f] hover:text-[#FFFDF7] active:scale-[0.97] transition-all duration-500 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c98f9f]/60"
          >
            VIEW INVITATION
          </button>
        </div>
      </div>
    </div>
  );
};
