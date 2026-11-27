import React from 'react';
import { Crown } from 'lucide-react';
import { CouplePerson, WeddingTemplateConfig } from '../../config/weddingConfig';

interface HappyCoupleSectionProps {
  config: WeddingTemplateConfig;
}

const CoupleCard: React.FC<{ person: CouplePerson }> = ({ person }) => (
  <article className="flex flex-col items-center text-center max-w-sm mx-auto">
    {/* Oval Portrait — exact 200x300 / 220x330 with border-8 #F8D8DC + brown crown badge */}
    <div className="relative mb-7">
      <div
        data-portrait-mask
        className="w-[204px] h-[306px] sm:w-[220px] sm:h-[330px] rounded-full overflow-hidden border-[8px] border-[#F8D8DC] shadow-editorial bg-[#FAF6EE]"
      >
        <img
          data-portrait-img
          src={person.portraitUrl}
          alt={person.portraitAlt}
          width={440}
          height={660}
          loading="lazy"
          className="w-full h-full object-cover object-top will-change-transform"
        />
      </div>
      <span
        aria-hidden="true"
        className="absolute top-2 -right-2 flex items-center justify-center w-11 h-11 rounded-full bg-[#8C6F63] text-white shadow-md"
      >
        <Crown className="w-5 h-5" strokeWidth={1.75} />
      </span>
    </div>

    <h3
      data-reveal
      className="font-display-cinzel text-[#7A6145] text-[34px] sm:text-[44px] leading-tight tracking-[0.04em]"
    >
      {person.name}
    </h3>

    <p
      data-reveal
      className="mt-2 text-[#D8C58E] text-[13px] font-semibold tracking-[0.22em] uppercase"
    >
      {person.role}
    </p>

    <p
      data-reveal
      className="mt-4 text-[#C5B378] text-[14px] sm:text-[15px] leading-relaxed font-medium"
    >
      {person.parentsLine}
    </p>

    <blockquote
      data-reveal
      className="mt-4 text-[#D3C48F] italic text-[13.5px] sm:text-[14.5px] leading-relaxed"
    >
      {person.vowQuote}
    </blockquote>
  </article>
);

export const HappyCoupleSection: React.FC<HappyCoupleSectionProps> = ({ config }) => {
  return (
    <section id="couple" className="w-full bg-[#FFFDFC] pt-24">
      <div className="max-w-5xl mx-auto px-5 pb-24 text-center">
        <h2
          data-reveal
          className="font-display-cinzel text-[#92786B] text-[28px] sm:text-[36px] leading-[1.2] tracking-[0.04em]"
        >
          {config.happyCouple.heading}
        </h2>
        <div data-reveal className="mx-auto mt-3 w-32 h-1 rounded-full bg-[#92786B]" />
        <p data-reveal className="mt-4 text-[#8C7B6E] text-[15px] sm:text-[17px]">
          {config.happyCouple.subtitle}
        </p>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-14 md:gap-12">
          <CoupleCard person={config.happyCouple.bride} />
          <CoupleCard person={config.happyCouple.groom} />
        </div>
      </div>

      {/* Full-Bleed Our Promise Champagne Gold Band (70vh mobile / 100vh desktop) */}
      <div className="relative w-full min-h-[70vh] md:min-h-[92vh] bg-promise-band flex flex-col justify-between py-14 sm:py-20 px-6 text-center overflow-hidden">
        <div aria-hidden="true" className="h-4" />

        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <div
            data-reveal
            className="flex items-center justify-center gap-4 text-[#111827]/75 text-[11px] sm:text-[12px] font-medium tracking-[0.28em] uppercase"
          >
            <span className="w-8 h-[1px] bg-[#111827]/30" />
            <span>{config.ourPromise.eyebrow}</span>
            <span className="w-8 h-[1px] bg-[#111827]/30" />
          </div>

          <h2
            data-reveal
            className="mt-7 font-sans text-[#111827] text-[21px] sm:text-[30px] md:text-[34px] leading-[1.55] font-normal max-w-3xl"
          >
            {config.ourPromise.quote}
          </h2>
        </div>

        {/* Bottom Corner Editorial Stamps */}
        <div className="w-full max-w-6xl mx-auto flex items-center justify-between text-[#111827]/70 text-[10px] sm:text-[11px] font-medium tracking-[0.28em] uppercase">
          <span>{config.ourPromise.leftStamp}</span>
          <span>{config.ourPromise.rightStamp}</span>
        </div>
      </div>
    </section>
  );
};
