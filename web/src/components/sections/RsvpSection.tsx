import React, { useState } from 'react';
import { CheckCircle2, Heart, Loader2 } from 'lucide-react';
import { GuestWish, WeddingTemplateConfig } from '../../config/weddingConfig';
import { AttendanceStatus, submitRsvp } from '../../services/rsvpService';

interface RsvpSectionProps {
  config: WeddingTemplateConfig;
  onWishAdded: (wish: GuestWish) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({ config, onWishAdded }) => {
  const [name, setName] = useState('');
  const [attendance, setAttendance] = useState<'' | AttendanceStatus>('');
  const [guestCount, setGuestCount] = useState(1);
  const [message, setMessage] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    if (!attendance) {
      setError('Please select whether you will be attending.');
      return;
    }

    setSubmitting(true);
    try {
      await submitRsvp({
        slug: config.slug,
        name: name.trim(),
        attendance,
        guestCount: attendance === 'attending' ? guestCount : 0,
        message: message.trim(),
        submittedAt: new Date().toISOString(),
        honeypot,
      });

      if (message.trim().length > 2) {
        onWishAdded({
          id: `new-${Date.now()}`,
          quote: `“${message.trim()}”`,
          author: name.trim(),
          lang: /[\u0D80-\u0DFF]/.test(message) ? 'si' : 'en',
        });
      }

      setSubmitted(true);
    } catch {
      setError('Could not send your RSVP right now. Please try again in a moment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="rsvp" className="w-full bg-[#FFFDF7] py-24 px-4 sm:px-6">
      <div className="max-w-2xl mx-auto">
        {/* Heading */}
        <div className="text-center">
          <h2
            data-reveal
            className="font-display-cinzel text-[#92786B] text-[48px] sm:text-[68px] leading-none tracking-[0.04em]"
          >
            {config.rsvp.heading}
          </h2>
          <div data-reveal className="mx-auto mt-3 w-32 h-1 rounded-full bg-[#92786B]" />
          <p data-reveal className="mt-5 text-[#7A6145]/90 text-[15px] sm:text-[18px]">
            {config.rsvp.subtitle}
          </p>
        </div>

        {/* Form + Overlapping Save-the-Date Card */}
        <div className="relative mt-14">
          <div
            data-reveal
            className="mb-7 md:mb-0 md:absolute md:-top-8 md:-right-12 md:z-20 md:w-[290px] rounded-2xl bg-[#FFFDFB] border border-[#E5BAC5] shadow-editorial p-6 text-left"
          >
            <div className="flex items-center gap-2.5">
              <Heart className="w-4 h-4 text-[#c98f9f] shrink-0" strokeWidth={1.8} />
              <h3 className="text-[#2A2318] text-[15px] font-semibold">
                {config.rsvp.saveDateTitle}
              </h3>
            </div>
            <p className="mt-2.5 text-[#5A4D43] text-[13.5px] leading-relaxed">
              {config.rsvp.saveDateBody}
            </p>
          </div>

          {/* Warm Cream Form Card */}
          <div
            data-reveal
            className="rounded-2xl bg-[#F7F0E2] border border-[#E8DBC2] shadow-editorial px-6 py-8 sm:px-10 sm:py-10"
          >
            {submitted ? (
              <div className="py-10 text-center flex flex-col items-center">
                <CheckCircle2 className="w-12 h-12 text-[#B8965A]" strokeWidth={1.6} />
                <h3 className="mt-4 font-display-cinzel text-[#3C2A12] text-[24px]">
                  {config.rsvp.successTitle}
                </h3>
                <p className="mt-3 text-[#6E5C4B] text-[15px] max-w-md leading-relaxed">
                  {config.rsvp.successBody}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSubmitted(false);
                    setName('');
                    setAttendance('');
                    setGuestCount(1);
                    setMessage('');
                  }}
                  className="mt-7 px-6 py-2.5 rounded-full border border-[#B8965A] text-[#7A6145] text-[12px] font-semibold tracking-[0.16em] uppercase hover:bg-[#B8965A] hover:text-white transition-colors"
                >
                  Submit Another Response
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 text-left" noValidate>
                <input
                  type="text"
                  name="website"
                  tabIndex={-1}
                  autoComplete="off"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Stacked left-aligned Name & Attend fields so Save-the-Date card never overlaps on desktop */}
                <div className="md:max-w-[54%]">
                  <label
                    htmlFor="rsvp-name"
                    className="block text-[#7A6145] text-[12px] font-medium tracking-[0.12em] uppercase mb-2"
                  >
                    NAME
                  </label>
                  <input
                    id="rsvp-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={config.rsvp.namePlaceholder}
                    className="w-full rounded-xl bg-[#FFFDF7] border border-[#D4B896] px-4 py-3 text-[#3C2A12] placeholder:text-[#9E9388] text-[15px] focus:outline-none focus:border-[#B8965A] focus:ring-2 focus:ring-[#C9A96E]/40 transition"
                  />
                </div>

                <div className="md:max-w-[54%]">
                  <label
                    htmlFor="rsvp-attendance"
                    className="block text-[#7A6145] text-[12px] font-medium tracking-[0.12em] uppercase mb-2"
                  >
                    WILL YOU ATTEND?
                  </label>
                  <select
                    id="rsvp-attendance"
                    required
                    value={attendance}
                    onChange={(e) => setAttendance(e.target.value as '' | AttendanceStatus)}
                    className="w-full rounded-xl bg-[#FFFDF7] border border-[#D4B896] px-4 py-3 text-[#3C2A12] text-[15px] focus:outline-none focus:border-[#B8965A] focus:ring-2 focus:ring-[#C9A96E]/40 transition"
                  >
                    <option value="">Select</option>
                    <option value="attending">Yes, I&apos;ll be there</option>
                    <option value="declined">Sorry, I can&apos;t make it</option>
                  </select>
                </div>

                {attendance === 'attending' && (
                  <div className="md:max-w-[54%]">
                    <label
                      htmlFor="rsvp-guests"
                      className="block text-[#7A6145] text-[12px] font-medium tracking-[0.12em] uppercase mb-2"
                    >
                      NUMBER OF GUESTS
                    </label>
                    <select
                      id="rsvp-guests"
                      value={guestCount}
                      onChange={(e) => setGuestCount(Number(e.target.value))}
                      className="w-full rounded-xl bg-[#FFFDF7] border border-[#D4B896] px-4 py-3 text-[#3C2A12] text-[15px] focus:outline-none focus:border-[#B8965A] focus:ring-2 focus:ring-[#C9A96E]/40 transition"
                    >
                      {[1, 2, 3, 4, 5].map((count) => (
                        <option key={count} value={count}>
                          {count} {count === 1 ? 'Guest' : 'Guests'}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="rsvp-message"
                    className="block text-[#7A6145] text-[12px] font-medium tracking-[0.12em] uppercase mb-2"
                  >
                    MESSAGE
                  </label>
                  <textarea
                    id="rsvp-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={config.rsvp.messagePlaceholder}
                    className="w-full rounded-xl bg-[#FFFDF7] border border-[#D4B896] px-4 py-3 text-[#3C2A12] placeholder:text-[#9E9388] text-[15px] focus:outline-none focus:border-[#B8965A] focus:ring-2 focus:ring-[#C9A96E]/40 transition resize-y"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-[13px] font-medium text-[#A43A4B]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full flex items-center justify-center gap-2.5 rounded-xl bg-[#B8965A] hover:bg-[#A68449] disabled:opacity-70 text-white py-4 px-6 text-[15px] sm:text-[19px] font-normal tracking-[0.14em] uppercase shadow-lg hover:shadow-xl active:scale-[0.98] transition-all duration-300"
                >
                  {submitting && <Loader2 className="w-5 h-5 animate-spin" />}
                  <span>{submitting ? 'SENDING...' : config.rsvp.submitCta}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
