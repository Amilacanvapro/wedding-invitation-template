import React, { useState } from 'react';
import { ChevronDown, Menu, X } from 'lucide-react';
import { WeddingTemplateConfig } from '../../config/weddingConfig';
import { WatercolorFloralCorner } from '../BotanicalArt';

interface HeroSectionProps {
  config: WeddingTemplateConfig;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ config }) => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const navItems = [
    { label: 'OUR STORY', href: '#ourstory' },
    { label: 'DETAILS', href: '#details' },
    { label: 'RSVP', href: '#rsvp' },
  ];

  return (
    <>
      <section
        id="hero"
        className="relative min-h-[100dvh] w-full flex flex-col items-center justify-center bg-[#FFFDFC] overflow-hidden px-5 py-24 text-center"
      >
        <WatercolorFloralCorner position="top-right" />
        <WatercolorFloralCorner position="bottom-left" />

        {/* Top Navigation Bar (1:1 with reference site desktop + mobile trigger) */}
        <header className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-6xl px-5 z-20">
          <nav
            aria-label="Primary invitation navigation"
            className="flex items-center justify-end md:justify-center"
          >
            <div className="hidden md:flex items-center justify-center space-x-8 text-[15px] font-medium uppercase tracking-[0.14em] text-[#92786B]/75">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="hover:text-[#7A6145] transition-colors"
                >
                  {item.label}
                </a>
              ))}
            </div>

            <button
              type="button"
              onClick={() => setMobileNavOpen((prev) => !prev)}
              aria-label={mobileNavOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileNavOpen}
              className="md:hidden inline-flex items-center justify-center w-9 h-9 rounded-full bg-white/65 backdrop-blur-sm text-[#92786B] border border-[#E2C6CD]/70 shadow-sm"
            >
              {mobileNavOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </nav>

          {mobileNavOpen && (
            <div className="md:hidden mt-3 ml-auto w-44 rounded-2xl bg-[#FFFDFC]/95 backdrop-blur-md border border-[#E2C6CD] shadow-editorial py-3 px-4 flex flex-col gap-2.5 text-right">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className="text-[12px] font-semibold uppercase tracking-[0.18em] text-[#7A6145] hover:text-[#c98f9f]"
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
        </header>

        <div className="relative z-10 flex flex-col items-center max-w-4xl mx-auto">
          {/* Top Badge */}
          <div
            data-hero-stagger
            className="mb-8 px-6 py-2.5 rounded-full bg-[#F7EBEE] border border-[#E2C6CD] text-[#3C2A12] text-[11px] sm:text-[13px] font-semibold tracking-[0.24em] uppercase shadow-sm"
          >
            {config.event.heroBadge}
          </div>

          {/* Couple Names — matches Cinzel Decorative 128px on desktop */}
          <h1
            data-hero-stagger
            className="font-display-cinzel text-[#CC9FAC] text-[46px] sm:text-[72px] md:text-[104px] lg:text-[124px] leading-[1.04] tracking-[0.03em] drop-shadow-[0_2px_10px_rgba(204,159,172,0.22)]"
          >
            <span className="block">{config.couple.brideName}</span>
            <span className="block text-[40px] sm:text-[62px] md:text-[84px] lg:text-[98px] my-1 font-normal">
              &amp;
            </span>
            <span className="block">{config.couple.groomName}</span>
          </h1>

          {/* Wedding Date */}
          <p
            data-hero-stagger
            className="mt-7 text-[#C997A3] text-[13px] sm:text-[17px] font-semibold tracking-[0.22em] uppercase"
          >
            {config.event.displayDateUpper}
          </p>
        </div>

        {/* Bottom Scroll Cue */}
        <a
          href="#countdown"
          data-hero-stagger
          className="absolute bottom-7 md:bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1.5 text-[#C997A3] hover:text-[#AA954B] transition-colors"
          aria-label="Scroll to countdown"
        >
          <span className="text-[10px] sm:text-[11px] font-medium tracking-[0.24em] uppercase">
            SWIPE UP FOR MORE
          </span>
          <ChevronDown className="w-4 h-4 swipe-chevron" strokeWidth={1.75} />
        </a>
      </section>
    </>
  );
};
