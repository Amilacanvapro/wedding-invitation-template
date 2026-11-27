import React, { useEffect, useMemo, useState } from 'react';
import { Calendar, Heart } from 'lucide-react';
import { WeddingTemplateConfig } from '../../config/weddingConfig';
import { buildGoogleCalendarUrl } from '../../services/rsvpService';

interface CountdownSectionProps {
  config: WeddingTemplateConfig;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function computeRemaining(targetIso: string): TimeRemaining {
  const diff = Math.max(0, new Date(targetIso).getTime() - Date.now());
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export const CountdownSection: React.FC<CountdownSectionProps> = ({ config }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>(() =>
    computeRemaining(config.event.isoDateTime)
  );

  useEffect(() => {
    const timer = window.setInterval(() => {
      setTimeLeft(computeRemaining(config.event.isoDateTime));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [config.event.isoDateTime]);

  const calendarUrl = useMemo(
    () =>
      buildGoogleCalendarUrl({
        title: `${config.couple.fullTitle}'s Wedding`,
        details: `Join us for ${config.couple.fullTitle}'s wedding celebration. ${config.event.ceremonyTitle} at ${config.event.timeLabel}.`,
        location: `${config.event.venueName}, ${config.event.venueCity}`,
        startIso: config.event.isoDateTime,
        endIso: config.event.endIsoDateTime,
      }),
    [config]
  );

  const units = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds },
  ];

  return (
    <section
      id="countdown"
      className="w-full bg-[#F7F0E7] py-20 px-4 sm:px-6 text-center"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center">
        <h2
          data-reveal
          className="font-display-cinzel text-[#92786B] text-[28px] sm:text-[36px] leading-[1.2] tracking-[0.04em]"
        >
          {config.countdown.heading}
        </h2>

        <div
          data-reveal
          className="mt-4 flex items-center justify-center gap-3 text-[#7A6145]/90 text-[15px] sm:text-[17px]"
        >
          <Heart className="w-4 h-4 text-[#c98f9f] shrink-0" strokeWidth={1.7} />
          <span>{config.countdown.subtitle}</span>
          <Heart className="w-4 h-4 text-[#c98f9f] shrink-0" strokeWidth={1.7} />
        </div>

        {/* 4-Column Countdown Cards — exact border #c98f9f + shadow-lg */}
        <div
          data-stagger-group
          className="mt-10 grid grid-cols-4 gap-2.5 sm:gap-5 w-full max-w-2xl"
        >
          {units.map((unit) => (
            <div
              key={unit.label}
              data-stagger-item
              className="flex flex-col items-center justify-center rounded-2xl bg-[#FFFDFC] border border-[#c98f9f] shadow-lg py-5 sm:py-6 px-2"
            >
              <span
                key={`${unit.label}-${unit.value}`}
                className="digit-tick font-sans font-normal text-[#5A4632] text-[30px] sm:text-[44px] leading-none tabular-nums"
              >
                {unit.value}
              </span>
              <span className="mt-2.5 text-[#c98f9f] text-[9px] sm:text-[13px] font-normal tracking-[0.14em] uppercase">
                {unit.label}
              </span>
            </div>
          ))}
        </div>

        {/* Google Calendar CTA — exact #FFFDF7 + #D4B896 border */}
        <div data-reveal className="mt-10">
          <a
            href={calendarUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#FFFDF7] border border-[#D4B896] text-[#7A6145] text-[13px] sm:text-[15px] font-medium tracking-[0.12em] uppercase shadow-lg hover:bg-[#FAF3E6] hover:border-[#B8965A] active:scale-[0.97] transition-all duration-200"
          >
            <Calendar className="w-4 h-4 text-[#7A6145] shrink-0" strokeWidth={1.8} />
            <span>{config.countdown.calendarCta}</span>
          </a>
        </div>
      </div>
    </section>
  );
};
