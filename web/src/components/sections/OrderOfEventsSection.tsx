import React from 'react';
import { Camera, Car, ClipboardList, Music, ScrollText, Utensils } from 'lucide-react';
import { TimelineEvent, WeddingTemplateConfig } from '../../config/weddingConfig';

interface OrderOfEventsSectionProps {
  config: WeddingTemplateConfig;
}

const EventIcon: React.FC<{ kind: TimelineEvent['icon'] }> = ({ kind }) => {
  const cls = 'w-6 h-6 text-[#3C2A12]';
  switch (kind) {
    case 'arrival':
      return <ClipboardList className={cls} strokeWidth={1.7} />;
    case 'poruwa':
      return <ScrollText className={cls} strokeWidth={1.7} />;
    case 'reception':
      return <Camera className={cls} strokeWidth={1.7} />;
    case 'lunch':
      return <Utensils className={cls} strokeWidth={1.7} />;
    case 'celebration':
      return <Music className={cls} strokeWidth={1.7} />;
    case 'sendoff':
      return <Car className={cls} strokeWidth={1.7} />;
  }
};

export const OrderOfEventsSection: React.FC<OrderOfEventsSectionProps> = ({ config }) => {
  return (
    <section
      id="order-of-events"
      className="w-full bg-[#F5EDD8]/40 pt-10 pb-24 px-4 sm:px-6 flex justify-center"
    >
      <div
        data-reveal
        className="w-full max-w-[390px] sm:max-w-[440px] rounded-[220px] bg-[#FBF1F3] shadow-editorial border border-[#F3E1E5] px-7 sm:px-12 pt-14 pb-20"
      >
        {/* Header */}
        <div className="text-center">
          <div className="font-display-cinzel text-[#3C2A12] text-[52px] sm:text-[60px] leading-none tracking-[0.04em]">
            {config.monogram}
          </div>
          <h3 className="mt-4 text-[#3C2A12] text-[16px] sm:text-[20px] font-medium tracking-[0.25em] uppercase">
            {config.orderOfEvents.heading}
          </h3>
        </div>

        {/* Vertical Timeline with Scroll-Scrubbed Dotted Gold Spine */}
        <div data-timeline-container className="relative mt-12">
          <div
            data-timeline-spine
            aria-hidden="true"
            className="timeline-dotted-spine absolute left-[52px] sm:left-[58px] top-2 bottom-4 w-[4px] will-change-transform"
          />

          <ol className="space-y-8">
            {config.orderOfEvents.events.map((item) => (
              <li
                key={`${item.time}-${item.title}`}
                data-timeline-row
                className="relative grid grid-cols-[52px_1fr] sm:grid-cols-[58px_1fr] gap-5 items-start"
              >
                <div
                  data-timeline-badge
                  className="flex items-center justify-center w-10 h-10 mt-1"
                >
                  <EventIcon kind={item.icon} />
                </div>

                <div data-timeline-text className="pl-3 text-left">
                  <p className="text-[#3C2A12] text-[13.5px] font-bold tracking-[0.03em]">
                    {item.time}
                  </p>
                  <h4 className="mt-0.5 text-[#3C2A12] text-[16px] font-medium leading-snug">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-[#6D5A4B] text-[13px] leading-relaxed">
                    {item.subtitle}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
};
