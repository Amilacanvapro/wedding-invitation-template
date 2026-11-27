import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { initPartingClouds } from './partingClouds';

export const LENIS_CONFIG = {
  duration: 1.15,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  touchMultiplier: 1.4,
};

export interface WeddingMotionOptions {
  /** Whether the Splash Cover is currently visible (locks scroll until opened) */
  isSplashOpen: boolean;
  /** Optional custom cloud images for the scroll-linked parting clouds */
  leftCloudSrc?: string | null;
  rightCloudSrc?: string | null;
}

/**
 * Triggers a crisp 220ms vertical micro-flip on a countdown digit element.
 */
export function animateDigitTick(el: HTMLElement | null, nextValue: number | string): void {
  if (!el) return;
  const formatted = String(nextValue).padStart(2, '0');
  if (el.textContent === formatted) return;

  el.textContent = formatted;
  el.classList.remove('is-ticking');
  void el.offsetWidth;
  el.classList.add('is-ticking');
}

/**
 * React hook orchestrating the full 1:1 Wedding Invitation Motion System:
 * - Lenis Smooth Scroll (locked while splash is open, disabled for reduced-motion)
 * - Section 0 Splash Cover SVG Rose stroke-dashoffset draw-in
 * - Section 1 Hero staggered entrance, floral corner parallax & Scroll-Linked Parting Clouds
 * - Sections 2–9 Editorial reveals, Oval Portrait Ken Burns settle, and Scroll-Scrubbed Timeline Spine
 */
export function useWeddingMotion({
  isSplashOpen,
  leftCloudSrc = null,
  rightCloudSrc = null,
}: WeddingMotionOptions) {
  const lenisRef = useRef<Lenis | null>(null);

  // Lock/unlock scroll cleanly based on splash state
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isSplashOpen) {
      document.documentElement.classList.add('splash-locked');
      document.body.classList.add('splash-locked');
      lenisRef.current?.stop();
    } else {
      document.documentElement.classList.remove('splash-locked');
      document.body.classList.remove('splash-locked');
      if (!reducedMotion) {
        lenisRef.current?.start();
      }
      // Refresh ScrollTrigger positions once main layout is scrollable
      requestAnimationFrame(() => ScrollTrigger.refresh());
    }
  }, [isSplashOpen]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.registerPlugin(ScrollTrigger);

    let rafId: number | null = null;
    if (!reducedMotion) {
      const lenis = new Lenis(LENIS_CONFIG);
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);

      if (isSplashOpen) {
        lenis.stop();
      }

      const raf = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
    }

    const ctx = gsap.context(() => {
      if (reducedMotion) return;

      // Section 0: Splash Cover Oval + Monogram + SVG Rose Draw-In
      const splashOval = document.querySelector('[data-motion="splash-oval"]');
      const splashMonogram = document.querySelector('[data-motion="splash-monogram"]');
      const rosePaths = document.querySelectorAll<SVGGeometryElement>('[data-motion="rose-path"]');
      const splashBtn = document.querySelector('[data-motion="splash-open"]');

      if (splashOval || rosePaths.length) {
        rosePaths.forEach((path) => {
          if (typeof path.getTotalLength === 'function') {
            const len = path.getTotalLength();
            gsap.set(path, {
              strokeDasharray: len,
              strokeDashoffset: len,
              opacity: 0.15,
            });
          }
        });

        const splashTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
        if (splashOval) {
          splashTl.fromTo(splashOval, { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.6 }, 0);
        }
        if (splashMonogram) {
          splashTl.fromTo(splashMonogram, { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.65 }, 0.35);
        }
        if (rosePaths.length) {
          splashTl.to(
            rosePaths,
            { strokeDashoffset: 0, opacity: 1, duration: 1.2, stagger: 0.08, ease: 'power2.out' },
            0.55
          );
        }
        if (splashBtn) {
          splashTl.fromTo(splashBtn, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 1.15);
        }
      }

      // Section 1: Hero Floral Corner Scroll Parallax
      const heroSection = document.querySelector('[data-motion="hero-section"]');
      const heroFlorals = document.querySelectorAll('[data-motion="floral-parallax"]');
      if (heroSection && heroFlorals.length) {
        gsap.to(heroFlorals, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: heroSection,
            start: 'top top',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      }

      // Generic Editorial Reveal Groups (Sections 2, 3, 5, 7, 8, 9)
      document.querySelectorAll<HTMLElement>('[data-motion="reveal-group"]').forEach((group) => {
        const items = group.querySelectorAll('[data-motion="reveal-item"]');
        if (!items.length) return;
        const stagger = parseFloat(group.dataset.stagger || '0.09');

        gsap.fromTo(
          items,
          { opacity: 0, y: 22 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: group,
              start: 'top 82%',
              once: true,
            },
          }
        );
      });

      // Section 4: Oval Portrait Mask + Inner Ken Burns Settle
      document.querySelectorAll<HTMLElement>('[data-motion="oval-portrait"]').forEach((mask) => {
        const img = mask.querySelector('img');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: mask,
            start: 'top 80%',
            once: true,
          },
        });
        tl.fromTo(mask, { opacity: 0, scale: 0.92 }, { opacity: 1, scale: 1, duration: 0.85, ease: 'power3.out' }, 0);
        if (img) {
          tl.fromTo(img, { scale: 1.12 }, { scale: 1.0, duration: 1.1, ease: 'power2.out' }, 0);
        }
      });

      // Section 6: Order of Events — Scroll-Scrubbed Gold Spine + Tactile Row Badges
      const timelineSection = document.querySelector('[data-motion="timeline-section"]');
      const spine = document.querySelector('[data-motion="timeline-spine"]');
      if (timelineSection && spine) {
        gsap.fromTo(
          spine,
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: timelineSection,
              start: 'top 72%',
              end: 'bottom 78%',
              scrub: 0.6,
            },
          }
        );
      }

      document.querySelectorAll<HTMLElement>('[data-motion="timeline-row"]').forEach((row) => {
        const badge = row.querySelector('[data-motion="timeline-badge"]');
        const content = row.querySelector('[data-motion="timeline-content"]');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: row,
            start: 'top 86%',
            once: true,
          },
        });
        if (badge) {
          tl.fromTo(badge, { opacity: 0, scale: 0.75 }, { opacity: 1, scale: 1, duration: 0.45, ease: 'back.out(1.4)' }, 0);
        }
        if (content) {
          tl.fromTo(content, { opacity: 0, x: 14 }, { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, 0.08);
        }
      });
    });

    const clouds = initPartingClouds({
      trigger: '[data-motion="hero-section"]',
      reducedMotion,
      leftCloudSrc,
      rightCloudSrc,
    });

    return () => {
      clouds.destroy();
      ctx.revert();
      if (rafId !== null) cancelAnimationFrame(rafId);
      lenisRef.current?.destroy();
      lenisRef.current = null;
    };
  }, [leftCloudSrc, rightCloudSrc]);

  return { lenisRef };
}
