import React from 'react';
import { Bell } from 'lucide-react';
import { WeddingTemplateConfig } from '../../config/weddingConfig';
import { PartingCloudsOverlay } from '../BotanicalArt';

interface LoveStorySectionProps {
  config: WeddingTemplateConfig;
}

export const LoveStorySection: React.FC<LoveStorySectionProps> = ({ config }) => {
  return (
    <section
      id="ourstory"
      data-story-clouds
      className="relative w-full bg-[#FFFDFC] py-24 px-4 sm:px-6 overflow-hidden"
    >
      {/* Scroll-Linked Parting Clouds (1:1 with reference site #ourstory) */}
      <PartingCloudsOverlay />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center text-center">
        <h2
          data-reveal
          className="font-display-cinzel text-[#92786B] text-[28px] sm:text-[36px] tracking-[0.04em]"
        >
          {config.loveStory.heading}
        </h2>
        <div data-reveal className="mt-3 w-32 h-1 rounded-full bg-[#92786B]" />

        {/* Double-Bordered Editorial Card */}
        <div
          data-reveal
          className="mt-12 w-full bg-[#FFFDFC] p-2.5 sm:p-3 shadow-editorial"
          style={{ border: '2px solid #FDF5E6' }}
        >
          <div
            data-stagger-group
            className="relative border border-[#c98f9f] bg-[#FFFDFC] px-7 py-10 sm:px-16 sm:py-16"
          >
            {/* Subtle top-right bell watermark matching reference */}
            <Bell
              className="absolute top-4 right-4 w-7 h-7 text-[#EED9DF] pointer-events-none"
              strokeWidth={1.4}
              aria-hidden="true"
            />

            <div className="space-y-7 text-[#5A493D] text-[15px] sm:text-[18px] leading-[1.85] font-normal">
              {config.loveStory.paragraphs.map((paragraph, idx) => (
                <p key={idx} data-stagger-item>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
