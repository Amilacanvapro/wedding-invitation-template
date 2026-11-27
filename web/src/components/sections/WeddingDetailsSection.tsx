import React from 'react';
import { MapPin } from 'lucide-react';
import { WeddingTemplateConfig } from '../../config/weddingConfig';

interface WeddingDetailsSectionProps {
  config: WeddingTemplateConfig;
}

export const WeddingDetailsSection: React.FC<WeddingDetailsSectionProps> = ({ config }) => {
  return (
    <section
      id="details"
      className="w-full bg-[#F5EDD8]/40 pt-24 pb-12 px-4 sm:px-6 text-center"
    >
      <div className="max-w-2xl mx-auto flex flex-col items-center">
        <h2
          data-reveal
          className="font-display-cinzel text-[#92786B] text-[28px] sm:text-[36px] tracking-[0.04em]"
        >
          {config.weddingDetails.heading}
        </h2>
        <div data-reveal className="mt-3 w-32 h-1 rounded-full bg-[#92786B]" />
        <p data-reveal className="mt-4 text-[#7A6A5E] text-[15px] sm:text-[17px] max-w-lg">
          {config.weddingDetails.subtitle}
        </p>

        {/* Tall Arched Venue Card */}
        <div
          data-reveal
          className="mt-14 w-full max-w-[420px] sm:max-w-[520px] rounded-t-[260px] rounded-b-2xl bg-[#FFFDFB] border-[4px] border-[#F4DFEA] shadow-editorial px-6 sm:px-12 pt-16 sm:pt-20 pb-14 relative overflow-hidden"
        >
          {/* Soft atmospheric venue wash matching reference mix-blend-multiply backdrop */}
          <img
            src={config.event.venuePhotoUrl}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="pointer-events-none select-none absolute inset-0 w-full h-full object-cover opacity-[0.08] mix-blend-multiply blur-[1px]"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,253,247,0.4),rgba(255,253,247,0.88)_75%)]"
          />

          <div className="relative z-10 flex flex-col items-center">
            <h3 className="font-sans text-[#7A6145] text-[24px] sm:text-[32px] leading-[1.28] tracking-[0.08em] uppercase font-normal max-w-[340px]">
              {config.event.ceremonyTitle}
            </h3>

            <div className="mt-5 w-16 h-[1px] bg-[#C4B47B]" />

            {/* Inner Arched Venue Polaroid */}
            <div className="mt-9 w-[216px] sm:w-[232px] bg-white p-2 pb-3.5 rounded-t-[118px] rounded-b-md shadow-card border border-[#F2E9DD]">
              <div className="w-full aspect-[4/3.6] rounded-t-[110px] overflow-hidden bg-[#1D2230]">
                <img
                  src={config.event.venuePhotoUrl}
                  alt={`${config.event.venueName}, ${config.event.venueCity}`}
                  width={420}
                  height={378}
                  loading="lazy"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-[#AA954B] text-[12px] font-medium tracking-[0.06em]">
                {config.event.venueCaption}
              </p>
            </div>

            {/* Date & Time Block */}
            <div className="mt-10 flex flex-col items-center w-full">
              <span className="text-[#9E8B76] text-[11px] font-semibold tracking-[0.22em] uppercase">
                {config.event.displayDayName}
              </span>
              <p className="mt-1.5 text-[#6B5438] text-[22px] sm:text-[24px] font-semibold tracking-[0.02em]">
                {config.event.displayDateCard}
              </p>

              <div className="mt-5 w-52 border-y border-[#E8DEC6] py-2.5 text-[#7A6145] text-[14px] sm:text-[15px] font-medium tracking-[0.06em]">
                {config.event.timeLabel}
              </div>

              {/* Venue Address */}
              <div className="mt-6 flex flex-col items-center text-[#7A6145]">
                <MapPin className="w-4 h-4 text-[#C4B47B] mb-1.5" strokeWidth={1.8} />
                <p className="font-semibold text-[16px]">{config.event.venueName}</p>
                <p className="text-[13.5px] text-[#9A8874]">{config.event.venueCity}</p>
              </div>

              {/* Ivory Pill Google Maps CTA — 1:1 with reference site & video */}
              <a
                href={config.event.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-[#FFFDF7] border border-[#D4B896] text-[#7A6145] hover:bg-[#e4cfd5] hover:text-white hover:border-[#c98f9f] text-[13px] sm:text-[14px] font-bold tracking-[0.14em] uppercase shadow-lg active:scale-[0.97] transition-all duration-300"
              >
                <MapPin className="w-4 h-4 shrink-0" strokeWidth={2} />
                <span>{config.weddingDetails.locationCta}</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
