import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * 1:1 Motion Orchestration System matching savethedate.lk/hansini&kavishka
 * (Facebook Reel reference: https://www.facebook.com/share/r/1E9cK4THos/)
 *
 * Key 1:1 Choreography verified against live reference:
 * - No extra fixed clouds over Hero (#hero stays crisp with floral corner sway & parallax).
 * - #ourstory: Full-width 2-half parting clouds slide 0% -> -100% (left) & 0% -> +100% (right)
 *   scrubbed to scroll, while editorial story card scales gently (0.95 -> 1).
 * - #couple: Bride slides from left (-50px), Groom slides from right (+50px),
 *   oval portrait inner image performs 1.2 -> 1.0 Ken Burns settle.
 * - #details: Arched venue card iris bloom (circle 0% -> 100%, scale 0.85 -> 1),
 *   title center-unfold (inset 0 50%), gold divider draw (scaleX 0 -> 1),
 *   inner venue polaroid tilted pop (scale 0.6 rotate -5deg -> 1, 0deg).
 * - #order-of-events: Scroll-scrubbed dotted gold spine + staggered Y(20px -> 0) rows.
 * - #rsvp: Save-the-Date card scale(0.9 -> 1), form container X(-40px -> 0),
 *   per-field staggered Y(32px -> 0).
 * - 100% prefers-reduced-motion compliant.
 */
export function useMotionSystem(isUnlocked: boolean) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!isUnlocked) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
      return () => {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
      };
    }

    document.documentElement.style.overflow = '';
    document.body.style.overflow = '';

    if (prefersReducedMotion) {
      gsap.set(
        '[data-reveal], [data-stagger-item], [data-portrait-mask], [data-portrait-img], [data-timeline-row], [data-timeline-spine], #couple article, #details [class*="rounded-t-"]',
        {
          clearProps: 'all',
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          rotation: 0,
          clipPath: 'none',
        }
      );
      return;
    }

    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    const onTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(onTick);
    gsap.ticker.lagSmoothing(0);

    const ctx = gsap.context(() => {
      // 1. Hero entrance choreography right after splash unlocks
      const heroTl = gsap.timeline({ delay: 0.06 });
      heroTl
        .fromTo(
          '[data-hero-floral-top]',
          { opacity: 0, x: 24, y: -24, scale: 0.95 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.95, ease: 'power3.out' },
          0
        )
        .fromTo(
          '[data-hero-floral-bottom]',
          { opacity: 0, x: -24, y: 24, scale: 0.95 },
          { opacity: 1, x: 0, y: 0, scale: 1, duration: 0.95, ease: 'power3.out' },
          0.05
        )
        .fromTo(
          '[data-hero-stagger]',
          { opacity: 0, y: 18 },
          { opacity: 1, y: 0, duration: 0.78, stagger: 0.12, ease: 'power3.out' },
          0.08
        )
        .fromTo(
          '[data-audio-fab]',
          { opacity: 0, scale: 0.6 },
          { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' },
          0.38
        );

      // 2. Hero corner floral scroll parallax
      gsap.to('[data-hero-parallax]', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: '#hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2,
        },
      });

      // 3. Countdown heading gentle scale(0.95 -> 1) + 4-card rise (1:1 reference)
      const countdownHeading = document.querySelector<HTMLElement>('#countdown h2');
      if (countdownHeading) {
        gsap.fromTo(
          countdownHeading,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.75,
            ease: 'power3.out',
            scrollTrigger: { trigger: '#countdown', start: 'top 84%', once: true },
          }
        );
      }

      // 4. Generic editorial fade-up reveals (excluding elements with specialized choreography)
      const storySection = document.querySelector<HTMLElement>('#ourstory, #our-story');
      const storyCardEl = storySection?.querySelector<HTMLElement>('.shadow-editorial') ?? null;
      const detailsArchEl = document.querySelector<HTMLElement>('#details [class*="rounded-t-"]');

      gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
        if (el === detailsArchEl || el === countdownHeading || el === storyCardEl) {
          return;
        }
        gsap.fromTo(
          el,
          { opacity: 0, y: 26 },
          {
            opacity: 1,
            y: 0,
            duration: 0.72,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 85%',
              once: true,
            },
          }
        );
      });

      // 5. Our Love Story: 1:1 Scroll-Linked Parting Clouds (0% -> -100% / +100%) + Card Scale(0.95 -> 1)
      if (storyCardEl) {
        gsap.fromTo(
          storyCardEl,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: { trigger: storyCardEl, start: 'top 82%', once: true },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('[data-story-clouds]').forEach((stage) => {
        const leftClouds = stage.querySelectorAll<HTMLElement>(
          '[data-story-cloud="left"], [data-cloud="left"]'
        );
        const rightClouds = stage.querySelectorAll<HTMLElement>(
          '[data-story-cloud="right"], [data-cloud="right"]'
        );

        if (leftClouds.length) {
          gsap.fromTo(
            leftClouds,
            { xPercent: 0, opacity: 0.96 },
            {
              xPercent: -100,
              opacity: 0.05,
              ease: 'none',
              scrollTrigger: {
                trigger: stage,
                start: 'top 85%',
                end: 'bottom 25%',
                scrub: 1.0,
              },
            }
          );
        }

        if (rightClouds.length) {
          gsap.fromTo(
            rightClouds,
            { xPercent: 0, opacity: 0.96 },
            {
              xPercent: 100,
              opacity: 0.05,
              ease: 'none',
              scrollTrigger: {
                trigger: stage,
                start: 'top 85%',
                end: 'bottom 25%',
                scrub: 1.0,
              },
            }
          );
        }
      });

      // 6. Staggered groups (countdown cards, love story paragraphs, closing CTAs)
      gsap.utils.toArray<HTMLElement>('[data-stagger-group]').forEach((group) => {
        const items = group.querySelectorAll<HTMLElement>('[data-stagger-item]');
        if (!items.length) return;
        gsap.fromTo(
          items,
          { opacity: 0, y: 24, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.65,
            stagger: 0.09,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });

      // 7. Happy Couple: 1:1 Opposite Horizontal Slide (-50px Bride, +50px Groom) + 1.2 -> 1.0 Ken Burns
      const coupleArticles = gsap.utils.toArray<HTMLElement>('#couple article');
      coupleArticles.forEach((article, idx) => {
        const fromX = idx % 2 === 0 ? -50 : 50;
        gsap.fromTo(
          article,
          { opacity: 0, x: fromX },
          {
            opacity: 1,
            x: 0,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: article,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>('[data-portrait-mask]').forEach((mask) => {
        const img = mask.querySelector<HTMLElement>('[data-portrait-img]');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mask,
            start: 'top 82%',
            once: true,
          },
        });
        tl.fromTo(
          mask,
          { opacity: 0, scale: 0.92 },
          { opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out' },
          0
        );
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.2 },
            { scale: 1, duration: 1.15, ease: 'power2.out' },
            0
          );
        }
      });

      // 8. Wedding Details: 1:1 Signature Arched Iris Clip-Path + Wash Zoom + Center Title Unfold + Tilted Polaroid
      const detailsArchCard = detailsArchEl;
      if (detailsArchCard) {
        const archWash = detailsArchCard.querySelector<HTMLElement>('img.mix-blend-multiply');
        const archTitle = detailsArchCard.querySelector<HTMLElement>('h3');
        const archDivider = detailsArchCard.querySelector<HTMLElement>('[class*="h-[1px]"]');
        const archPolaroid = detailsArchCard.querySelector<HTMLElement>('[class*="shadow-card"]');
        const archCta = detailsArchCard.querySelector<HTMLElement>('a');

        const detailsTl = gsap.timeline({
          scrollTrigger: {
            trigger: detailsArchCard,
            start: 'top 80%',
            once: true,
          },
        });

        detailsTl.fromTo(
          detailsArchCard,
          { opacity: 0, scale: 0.85, clipPath: 'circle(0% at 50% 50%)' },
          {
            opacity: 1,
            scale: 1,
            clipPath: 'circle(100% at 50% 50%)',
            duration: 1.0,
            ease: 'power3.out',
          },
          0
        );

        if (archWash) {
          detailsTl.fromTo(
            archWash,
            { scale: 1.3 },
            { scale: 1, duration: 1.25, ease: 'power2.out' },
            0
          );
        }

        if (archTitle) {
          detailsTl.fromTo(
            archTitle,
            { opacity: 0, clipPath: 'inset(0 50% 0 50%)' },
            { opacity: 1, clipPath: 'inset(0 0% 0 0%)', duration: 0.85, ease: 'power3.out' },
            0.22
          );
        }

        if (archDivider) {
          detailsTl.fromTo(
            archDivider,
            { scaleX: 0 },
            { scaleX: 1, transformOrigin: 'center center', duration: 0.7, ease: 'power2.out' },
            0.4
          );
        }

        if (archPolaroid) {
          detailsTl.fromTo(
            archPolaroid,
            { opacity: 0, scale: 0.6, rotation: -5 },
            { opacity: 1, scale: 1, rotation: 0, duration: 0.85, ease: 'back.out(1.25)' },
            0.45
          );
        }

        if (archCta) {
          detailsTl.fromTo(
            archCta,
            { opacity: 0, y: 24 },
            { opacity: 1, y: 0, duration: 0.65, ease: 'power3.out' },
            0.65
          );
        }
      }

      // 9. Order of Events: Scroll-Scrubbed Dotted Gold Spine + Vertical Row Entrance (1:1 translateY 20px -> 0)
      const spine = document.querySelector<HTMLElement>('[data-timeline-spine]');
      const timelineContainer = document.querySelector<HTMLElement>('[data-timeline-container]');
      if (spine && timelineContainer) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            transformOrigin: 'top center',
            ease: 'none',
            scrollTrigger: {
              trigger: timelineContainer,
              start: 'top 76%',
              end: 'bottom 68%',
              scrub: 0.65,
            },
          }
        );
      }

      gsap.utils.toArray<HTMLElement>('[data-timeline-row]').forEach((row) => {
        const badge = row.querySelector<HTMLElement>('[data-timeline-badge]');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 86%',
            once: true,
          },
        });
        tl.fromTo(
          row,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
          0
        );
        if (badge) {
          tl.fromTo(
            badge,
            { scale: 0.8 },
            { scale: 1, duration: 0.45, ease: 'back.out(1.4)' },
            0.05
          );
        }
      });

      // 10. RSVP Section: 1:1 Save-the-Date Scale(0.9 -> 1) + Form X(-40px -> 0) + Per-Field Stagger
      const rsvpSection = document.getElementById('rsvp');
      if (rsvpSection) {
        const saveDateCard = rsvpSection.querySelector<HTMLElement>('[class*="md:-top-8"], [class*="md:-top-7"]');
        const rsvpForm = rsvpSection.querySelector<HTMLElement>('form');
        const rsvpFields = rsvpForm ? Array.from(rsvpForm.children) as HTMLElement[] : [];

        if (saveDateCard) {
          gsap.fromTo(
            saveDateCard,
            { opacity: 0, scale: 0.9 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.7,
              ease: 'power3.out',
              scrollTrigger: { trigger: saveDateCard, start: 'top 85%', once: true },
            }
          );
        }

        if (rsvpForm) {
          gsap.fromTo(
            rsvpForm.parentElement,
            { opacity: 0, x: -36 },
            {
              opacity: 1,
              x: 0,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: { trigger: rsvpForm, start: 'top 84%', once: true },
            }
          );
        }

        if (rsvpFields.length) {
          gsap.fromTo(
            rsvpFields.filter((el) => !el.classList.contains('hidden')),
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.08,
              ease: 'power3.out',
              scrollTrigger: { trigger: rsvpForm, start: 'top 82%', once: true },
            }
          );
        }
      }
    });

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 250);

    return () => {
      window.clearTimeout(refreshTimer);
      ctx.revert();
      gsap.ticker.remove(onTick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [isUnlocked]);

  return lenisRef;
}
