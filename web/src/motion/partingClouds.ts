import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export interface PartingCloudsOptions {
  /** ScrollTrigger element or selector (defaults to '[data-motion="hero-section"]') */
  trigger?: string | Element;
  /** Disable under prefers-reduced-motion */
  reducedMotion?: boolean;
  /** Optional custom cloud image URL for left-side clouds (falls back to volumetric SVG) */
  leftCloudSrc?: string | null;
  /** Optional custom cloud image URL for right-side clouds (falls back to volumetric SVG) */
  rightCloudSrc?: string | null;
}

export interface PartingCloudsController {
  stage: HTMLElement | null;
  destroy: () => void;
}

const VOLUMETRIC_CLOUD_SVG = `
<svg viewBox="0 0 460 240" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <radialGradient id="cloudIvory" cx="50%" cy="46%" r="55%">
      <stop offset="0%" stop-color="#FFFDFC" stop-opacity="0.97"/>
      <stop offset="52%" stop-color="#F7ECF1" stop-opacity="0.82"/>
      <stop offset="100%" stop-color="#EEDBE4" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="cloudBlush" cx="48%" cy="50%" r="54%">
      <stop offset="0%" stop-color="#F3E2EA" stop-opacity="0.88"/>
      <stop offset="58%" stop-color="#FAF3E8" stop-opacity="0.62"/>
      <stop offset="100%" stop-color="#FFFDFC" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <ellipse cx="148" cy="126" rx="126" ry="68" fill="url(#cloudBlush)"/>
  <ellipse cx="248" cy="96" rx="138" ry="78" fill="url(#cloudIvory)"/>
  <ellipse cx="330" cy="138" rx="108" ry="58" fill="url(#cloudBlush)"/>
  <ellipse cx="212" cy="152" rx="148" ry="62" fill="url(#cloudIvory)"/>
</svg>
`;

/**
 * Mounts or binds the 4-layer scroll-linked parting clouds stage.
 * As the user scrolls down past the Hero section, clouds smoothly part outward
 * to the left/right edges, scale slightly, and fade out (100% GPU-composited).
 */
export function initPartingClouds(options: PartingCloudsOptions = {}): PartingCloudsController {
  const {
    trigger = '#ourstory',
    reducedMotion = false,
    leftCloudSrc = null,
    rightCloudSrc = null,
  } = options;

  if (reducedMotion || typeof window === 'undefined') {
    return { stage: null, destroy: () => {} };
  }

  gsap.registerPlugin(ScrollTrigger);

  const renderMedia = (src: string | null) =>
    src
      ? `<img src="${src}" alt="" draggable="false" style="width:100%;height:auto;display:block;" />`
      : VOLUMETRIC_CLOUD_SVG;

  let stage = document.querySelector<HTMLElement>('[data-parting-clouds]');
  let createdByEngine = false;

  if (!stage) {
    stage = document.createElement('div');
    stage.className = 'parting-clouds-stage';
    stage.setAttribute('data-parting-clouds', '');
    stage.setAttribute('aria-hidden', 'true');
    stage.innerHTML = `
      <div class="parting-cloud parting-cloud--left-top" data-cloud-side="left" data-cloud-depth="1.15">
        <span class="parting-cloud__inner">${renderMedia(leftCloudSrc)}</span>
      </div>
      <div class="parting-cloud parting-cloud--right-top" data-cloud-side="right" data-cloud-depth="1.2">
        <span class="parting-cloud__inner">${renderMedia(rightCloudSrc || leftCloudSrc)}</span>
      </div>
      <div class="parting-cloud parting-cloud--left-mid" data-cloud-side="left" data-cloud-depth="0.95">
        <span class="parting-cloud__inner">${renderMedia(leftCloudSrc)}</span>
      </div>
      <div class="parting-cloud parting-cloud--right-mid" data-cloud-side="right" data-cloud-depth="1.0">
        <span class="parting-cloud__inner">${renderMedia(rightCloudSrc || leftCloudSrc)}</span>
      </div>
    `;
    document.body.appendChild(stage);
    createdByEngine = true;
  }

  const triggerEl = typeof trigger === 'string' ? document.querySelector(trigger) : trigger;
  if (!triggerEl) {
    return {
      stage,
      destroy: () => {
        if (createdByEngine && stage) stage.remove();
      },
    };
  }

  const leftClouds = stage.querySelectorAll<HTMLElement>('[data-cloud-side="left"]');
  const rightClouds = stage.querySelectorAll<HTMLElement>('[data-cloud-side="right"]');

  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: triggerEl,
      start: 'top top',
      end: 'bottom top',
      scrub: 1.1,
      invalidateOnRefresh: true,
    },
  });

  leftClouds.forEach((el) => {
    const depth = parseFloat(el.dataset.cloudDepth || '1');
    tl.to(
      el,
      {
        xPercent: -98 * depth,
        yPercent: -14 * depth,
        scale: 1.08,
        opacity: 0,
        ease: 'power2.out',
      },
      0
    );
  });

  rightClouds.forEach((el) => {
    const depth = parseFloat(el.dataset.cloudDepth || '1');
    tl.to(
      el,
      {
        xPercent: 98 * depth,
        yPercent: -10 * depth,
        scale: 1.08,
        opacity: 0,
        ease: 'power2.out',
      },
      0
    );
  });

  return {
    stage,
    destroy: () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      if (createdByEngine && stage) {
        stage.remove();
      }
    },
  };
}
