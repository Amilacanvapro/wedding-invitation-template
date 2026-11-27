import React, { useMemo } from 'react';
import { Calendar, Heart } from 'lucide-react';
import { WeddingTemplateConfig } from '../../config/weddingConfig';
import { buildGoogleCalendarUrl } from '../../services/rsvpService';

interface ClosingAndFooterProps {
  config: WeddingTemplateConfig;
}

const InstagramSvg: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-4 h-4" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookSvg: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <path d="M15 3h-3a4 4 0 0 0-4 4v3H5v4h3v7h4v-7h3l1-4h-4V7a1 1 0 0 1 1-1h2V3Z" />
  </svg>
);

const TikTokSvg: React.FC = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
    <path d="M14 4v10.5a3.5 3.5 0 1 1-3-3.46" />
    <path d="M14 4c.8 2.3 2.5 3.8 5 4" />
  </svg>
);

export const ClosingAndFooter: React.FC<ClosingAndFooterProps> = ({ config }) => {
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

  return (
    <>
      {/* Closing Luxury Espresso-Gold Banner */}
      <section className="w-full bg-closing-luxury py-24 sm:py-32 px-5 text-center text-white">
        <div data-stagger-group className="max-w-4xl mx-auto flex flex-col items-center">
          <div
            data-stagger-item
            className="font-display-cinzel text-[56px] sm:text-[68px] leading-none tracking-[0.06em] text-[#FAF5E8]"
          >
            {config.monogram}
          </div>

          <h2
            data-stagger-item
            className="mt-7 font-display-cinzel text-[28px] sm:text-[44px] leading-[1.2] tracking-[0.04em] text-[#FFFDF7] max-w-3xl"
          >
            {config.closing.heading}
          </h2>

          <p
            data-stagger-item
            className="mt-5 text-[#F4ECDD]/90 text-[15px] sm:text-[18px] leading-relaxed max-w-2xl"
          >
            {config.closing.body}
          </p>

          <div
            data-stagger-item
            className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
          >
            <a
              href="#rsvp"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 sm:px-12 py-4 rounded-full bg-white text-[#1A1A1A] text-[14px] sm:text-[18px] font-normal tracking-[0.14em] uppercase shadow-2xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <Heart className="w-4 h-4 shrink-0" strokeWidth={1.8} />
              <span>{config.closing.rsvpCta}</span>
            </a>

            <a
              href={calendarUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-10 sm:px-12 py-3.5 rounded-full bg-transparent border-2 border-white/90 text-white text-[14px] sm:text-[18px] font-medium shadow-2xl hover:bg-white/15 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300"
            >
              <Calendar className="w-4 h-4 shrink-0" strokeWidth={1.8} />
              <span>{config.closing.calendarCta}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Luxury 4-Column Responsive Footer (1:1 gradient + Tenor Sans + SVG social icons) */}
      <footer className="w-full bg-footer-luxury text-white font-tenor">
        <div className="max-w-6xl mx-auto px-6 sm:px-10 py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
            {/* Column 1: Pair & Social Icons */}
            <div>
              <div className="flex items-center gap-2 text-[22px] tracking-[0.08em]">
                <Heart className="w-5 h-5" strokeWidth={1.7} />
                <span className="font-display-cinzel">{config.shortPair}</span>
              </div>
              <p className="mt-4 text-white/90 text-[13.5px] leading-relaxed">
                {config.footer.aboutText}
              </p>
              <div className="mt-5 flex items-center gap-3" aria-label="Wedding social links">
                <a
                  href="#hero"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E5BCC7]/80 text-white hover:bg-[#c98f9f] transition-colors"
                >
                  <InstagramSvg />
                </a>
                <a
                  href="#hero"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E5BCC7]/80 text-white hover:bg-[#c98f9f] transition-colors"
                >
                  <FacebookSvg />
                </a>
                <a
                  href="#hero"
                  aria-label="TikTok"
                  className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-[#E5BCC7]/80 text-white hover:bg-[#c98f9f] transition-colors"
                >
                  <TikTokSvg />
                </a>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-[18px] font-medium tracking-[0.04em]">Quick Links</h3>
              <ul className="mt-4 space-y-2.5 text-[15px] text-white/95">
                <li>
                  <a href="#ourstory" className="hover:underline underline-offset-4">
                    Our Story
                  </a>
                </li>
                <li>
                  <a href="#details" className="hover:underline underline-offset-4">
                    Details
                  </a>
                </li>
                <li>
                  <a href="#rsvp" className="hover:underline underline-offset-4">
                    RSVP
                  </a>
                </li>
              </ul>
            </div>

            {/* Column 3: Wedding Details */}
            <div>
              <h3 className="text-[18px] font-medium tracking-[0.04em]">Wedding Details</h3>
              <ul className="mt-4 space-y-2.5 text-[14.5px] text-white/95">
                <li>{config.event.displayDateFooter}</li>
                <li>
                  {config.event.venueName}, {config.event.venueCity}
                </li>
                <li className="tracking-wide">{config.couple.hashtag}</li>
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="text-[18px] font-medium tracking-[0.04em]">Contact</h3>
              <ul className="mt-4 space-y-2.5 text-[14.5px] text-white/95">
                {config.footer.contacts.map((contact) => (
                  <li key={contact.name}>
                    <a
                      href={`tel:${contact.phone.replace(/\s+/g, '')}`}
                      className="hover:underline underline-offset-4"
                    >
                      {contact.name} — {contact.phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr className="my-10 border-white/40" />

          <div className="text-center text-white/95 space-y-2">
            <p className="inline-flex items-center justify-center gap-2 text-[14px]">
              <Heart className="w-4 h-4" strokeWidth={1.7} />
              <span>Made with love</span>
              <Heart className="w-4 h-4" strokeWidth={1.7} />
            </p>
            <p className="text-[12.5px] text-white/90">{config.footer.copyright}</p>
            <p className="text-[11.5px] text-white/85">
              {config.footer.creditText}{' '}
              <a
                href={config.footer.creditLinkUrl}
                className="underline underline-offset-2 hover:text-white"
              >
                {config.footer.creditLinkLabel}
              </a>
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};
