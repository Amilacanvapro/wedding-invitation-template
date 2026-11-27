# 1:1 Wedding Invitation Website — Complete Motion & Animation Specification

**Reference Video:** Facebook Reel (`https://www.facebook.com/share/r/1E9cK4THos/` — Savethedate.lk, `46.7s`, `720×1280` mobile viewport)  
**Target:** Reusable, 1:1 multi-client Wedding Invitation Website Template (Mobile-First, 60fps, Core Web Vitals & `prefers-reduced-motion` compliant)  
**Author:** Motion Engineer (`agent-dbad8857-5c19-4505-8447-3ebbf8ae1b60`)  
**Visual Assets Directory:** `C:\Users\Amila Munasinghe\OpenBot\Shared\wedding-invitation-template\assets\`

---

## 1. Visual Keyframe Reference Index

All keyframes extracted directly from the reference Reel are saved in `assets/`:

- **Full 46.7s Timeline Contact Sheet (16 frames, 3s intervals):** `assets/motion-overview-contact-sheet.png`
- **Cover-to-Hero High-Resolution Motion Sequence (16 frames, `0.2s–9.5s`):** `assets/motion-cover-to-hero-sequence.png`
- **Individual Section Frames (`assets/motion-frames/`):**
  - `01-cover-initial-0.5s.png` — Cover oval hairline frame
  - `02-cover-rose-reveal-3.5s.png` — Monogram `HK`, SVG rose line-draw, `VIEW INVITATION` CTA
  - `03-hero-section-6.5s.png` — Hero typography, watercolor floral corners, floating audio FAB
  - `04-countdown-section-9.5s.png` — Countdown cards (`DAYS / HOURS / MINS / SECS`) + Calendar CTA
  - `05-love-story-12.5s.png` — Editorial "Our Love Story" text reveal
  - `06-happy-couple-bride-15.5s.png` — "The Happy Couple" oval portrait mask + bio
  - `07-couple-to-gradient-18.5s.png` — Groom transition into warm champagne/gold band
  - `08-wedding-details-header-21.5s.png` — "Wedding Details" section intro
  - `09-reception-card-24.5s.png` — Reception venue arched card + `View Location` pill
  - `10-order-of-events-timeline-27.5s.png` — Vertical "Order of Events" icon timeline
  - `11-rsvp-intro-30.5s.png` — RSVP header + attendance toggle cards
  - `12-rsvp-form-input-33.5s.png` — Active form input focus & mobile keyboard state
  - `13-rsvp-form-scroll-36.5s.png` — Dropdown & guest count interaction
  - `14-rsvp-submit-cta-39.5s.png` — Champagne gold `SEND RSVP` CTA
  - `15-wishes-carousel-42.5s.png` — Quote/Wishes carousel with pagination dots
  - `16-closing-footer-45.5s.png` — Dark espresso-to-gold gradient closing card + share/calendar CTAs

---

## 2. Motion Design System (Tokens & Physics)

The invitation's motion language is **romantic editorial luxury**: unhurried, weightless deceleration, zero harsh bounces, and delicate botanical ambient sway.

### 2.1 Duration Scale
| Token | Duration | Usage |
| :--- | :--- | :--- |
| `--dur-micro` | `150ms` | Button tap press (`scale: 0.97`), radio/card selection, input focus ring |
| `--dur-ui` | `300ms` | Audio FAB toggle, carousel dot indicator, form validation states |
| `--dur-reveal` | `700ms` | Standard scroll-triggered text/card reveals (`opacity` + `translateY`) |
| `--dur-editorial` | `950ms` | Cover exit veil, Hero typography entrance, oval portrait mask reveals |
| `--dur-svg-draw` | `1200ms` | Cover botanical rose `stroke-dashoffset` SVG line-drawing |
| `--dur-ambient` | `6000ms–9000ms` | Continuous infinite floral sway & audio button gentle pulse |

### 2.2 Easing Curves & Spring Physics
| Token | CSS `cubic-bezier` | GSAP Equivalent | Framer Motion Equivalent | Usage |
| :--- | :--- | :--- | :--- | :--- |
| `--ease-editorial` | `cubic-bezier(0.22, 1, 0.36, 1)` | `power3.out` | `[0.22, 1, 0.36, 1]` | All scroll reveals, typography entrances, cover dissolve |
| `--ease-silk` | `cubic-bezier(0.25, 0.46, 0.45, 0.94)` | `power2.out` | `[0.25, 0.46, 0.45, 0.94]` | SVG rose stroke draw-on, parallax scrub |
| `--ease-tactile` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | `back.out(1.4)` | `{ type: "spring", stiffness: 360, damping: 24 }` | Audio FAB entrance, RSVP radio card check |
| `--ease-ambient` | `cubic-bezier(0.45, 0.05, 0.55, 0.95)` | `sine.inOut` | `"easeInOut"` | Continuous watercolor floral breeze sway |

### 2.3 Smooth Scroll Configuration (Lenis)
```ts
import Lenis from 'lenis';

export const lenisConfig = {
  duration: 1.15,
  easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  orientation: 'vertical' as const,
  gestureOrientation: 'vertical' as const,
  smoothWheel: true,
  touchMultiplier: 1.4,
};
```
*Note: Keep scroll locked (`overflow: hidden` / `lenis.stop()`) while the Cover Splash overlay is active; call `lenis.start()` immediately when the user taps `VIEW INVITATION`.*

---

## 3. Section-by-Section Frame-by-Frame Motion Breakdown

### Section 0: Cover / Splash Screen (`t = 0.0s – 4.2s`)
**Keyframes:** `motion-cover-to-hero-sequence.png` (`M01–M07`), `01-cover-initial-0.5s.png`, `02-cover-rose-reveal-3.5s.png`

1. **Oval Hairline Frame (`0.0s – 0.6s`)**
   - Full-viewport fixed overlay (`100dvh`, soft paper `#F7F5F2`).
   - Centered tall oval border (`1px solid #CFC6BC`, `border-radius: 9999px`) fades in and scales gently: `opacity: 0 → 1`, `scale: 0.96 → 1`, `600ms`, `--ease-editorial`.
2. **Monogram `HK` Entrance (`0.8s – 1.4s`)**
   - Serif monogram fades in with subtle vertical rise: `opacity: 0 → 1`, `translateY(14px → 0)`, `650ms`, `--ease-editorial`.
3. **Botanical Rose SVG Line-Draw (`1.6s – 2.8s`)**
   - Multi-path line-art rose illustration animates from stem/leaves upward to petals using SVG `stroke-dasharray` / `stroke-dashoffset` (`pathLength: 0 → 1`) + `opacity: 0.15 → 1`, `1200ms`, `--ease-silk`.
4. **`VIEW INVITATION` Pill CTA (`1.9s – 2.5s`)**
   - Hairline oval/pill button fades in below the rose: `opacity: 0 → 1`, `translateY(10px → 0)`, `600ms`, `--ease-editorial`.
   - Idle micro-interaction: subtle breathing border/shadow pulse (`scale: 1 → 1.02 → 1`, `3000ms`, `infinite`, `--ease-ambient`).
5. **Tap & Cover Exit Transition (`3.2s – 4.0s`)**
   - Trigger: User taps `VIEW INVITATION` (also starts background wedding audio on this user gesture to satisfy iOS/Android autoplay policies).
   - Cover overlay exits with a **dissolve + gentle zoom-out veil**: `opacity: 1 → 0`, `scale: 1 → 1.04`, `750ms`, `--ease-editorial`, then `pointer-events: none` and unmount.

---

### Section 1: Hero Section (`t = 3.8s – 7.0s`)
**Keyframes:** `motion-cover-to-hero-sequence.png` (`M07–M13`), `03-hero-section-6.5s.png`

- **Trigger:** Immediately chained `150ms` after cover exit begins.
- **Choreography:**
  1. **Watercolor Floral Corners (Top-Right & Bottom-Left):**
     - Enter from off-edge: Top-Right `translate(24px, -24px) scale(0.95) → (0, 0) scale(1)`, Bottom-Left `translate(-24px, 24px) scale(0.95) → (0, 0) scale(1)`, `opacity: 0 → 1`, `950ms`, `--ease-editorial`.
     - **Ambient Loop:** Continuous gentle botanical sway (`rotate: -1.5deg ↔ 1.5deg`, `translateY: -4px ↔ 4px`, `7500ms`, `infinite`, `alternate`, `--ease-ambient`).
     - **Scroll Parallax:** Subtle scrubbed vertical drift (`yPercent: -12` as hero scrolls out, `scrub: 1.2`).
  2. **Hero Typography Stagger (`stagger: 120ms`):**
     - Line 1 (`WE'RE GETTING MARRIED`): `opacity: 0 → 1`, `translateY(16px → 0)`, `700ms`.
     - Line 2 (`HANSINI & KAVISHKA`): `opacity: 0 → 1`, `translateY(22px → 0)`, `850ms`.
     - Line 3 (`FRIDAY, 23 OCTOBER 2026`): `opacity: 0 → 1`, `translateY(14px → 0)`, `700ms`.
  3. **Floating Audio / Music FAB (Bottom-Right, `position: fixed`):**
     - Enters at `+450ms`: `scale(0.6 → 1)`, `opacity: 0 → 1`, `450ms`, `--ease-tactile`.
     - Playing state: Soft radial champagne ripple ring (`scale: 1 → 1.45`, `opacity: 0.45 → 0`, `2400ms`, `infinite`) + gentle icon rotation/equalizer pulse.
     - Muted state: Static icon, ripple paused.

---

### Section 2: Countdown Section (`t = 7.5s – 11.0s`)
**Keyframes:** `motion-cover-to-hero-sequence.png` (`M15–M16`), `04-countdown-section-9.5s.png`

- **ScrollTrigger:** `start: "top 82%"`, `once: true`.
- **Watercolor Floral Divider:** Fades & scales subtly (`opacity: 0 → 1`, `scale: 0.96 → 1`, `700ms`).
- **Heading (`COUNTING DOWN TO FOREVER`):** `opacity: 0 → 1`, `translateY(20px → 0)`, `700ms`, `--ease-editorial`.
- **4 Countdown Cards (`DAYS`, `HOURS`, `MINS`, `SECS`):**
  - Staggered card entrance: `opacity: 0 → 1`, `translateY(24px → 0)`, `scale(0.95 → 1)`, `600ms`, `stagger: 80ms`, `--ease-editorial`.
  - **Live Second Tick:** Every `1000ms`, the changing digit performs a crisp vertical micro-flip/slide (`translateY(-6px) opacity: 0 → translateY(0) opacity: 1`, `220ms`, `--ease-editorial`) with `tabular-nums` (`font-variant-numeric: tabular-nums`) to prevent horizontal jitter.
- **`ADD TO GOOGLE CALENDAR` Pill CTA:** Enters `+320ms` after cards (`opacity: 0 → 1`, `translateY(14px → 0)`), tactile press `scale(0.97)` on tap (`150ms`).

---

### Section 3: Our Love Story (`t = 11.0s – 14.0s`)
**Keyframes:** `05-love-story-12.5s.png`

- **ScrollTrigger:** `start: "top 80%"`, `once: true`.
- **Heading (`OUR LOVE STORY`):** `opacity: 0 → 1`, `translateY(18px → 0)`, `700ms`.
- **Narrative Paragraphs:** Staggered paragraph-by-paragraph fade-up (`opacity: 0 → 1`, `translateY(20px → 0)`, `750ms`, `stagger: 140ms`, `--ease-editorial`).

---

### Section 4: The Happy Couple (`t = 14.0s – 20.0s`)
**Keyframes:** `06-happy-couple-bride-15.5s.png`, `07-couple-to-gradient-18.5s.png`

- **ScrollTrigger:** Per-profile card (`start: "top 80%"`, `once: true`).
- **Oval Portrait Mask Reveal:**
  - Container (`border-radius: 9999px`, `overflow: hidden`): `opacity: 0 → 1`, `scale(0.92 → 1)`, `850ms`, `--ease-editorial`.
  - Inner `<img>` Ken Burns settle: `scale(1.12 → 1.0)`, `1100ms`, `--ease-silk` (creates a luxury photographic depth reveal without layout shift).
- **Name (`HANSINI` / `KAVISHKA`), Role (`THE BRIDE` / `THE GROOM`), & Bio:** Staggered fade-up (`translateY(16px → 0)`, `stagger: 90ms`, `650ms`).
- **Warm Champagne Gradient Transition (`t = 18.5s`):** Smooth CSS background gradient band (`#F7F5F2 → #E8D9C0 → #F7F5F2`) that acts as a visual breather into Wedding Details.

---

### Section 5: Wedding Details & Reception Card (`t = 20.5s – 26.0s`)
**Keyframes:** `08-wedding-details-header-21.5s.png`, `09-reception-card-24.5s.png`

- **Intro Header (`WEDDING DETAILS`):** `opacity: 0 → 1`, `translateY(20px → 0)`, `700ms`.
- **Reception Venue Card:**
  - Card container rises smoothly: `opacity: 0 → 1`, `translateY(28px → 0)`, `750ms`, `--ease-editorial`.
  - Arched/circular venue thumbnail: `scale(0.9 → 1)`, `opacity: 0 → 1`, `700ms`, `+120ms` delay.
  - Date, time, venue text, and `View Location` pill button stagger in (`stagger: 80ms`, `550ms`).

---

### Section 6: Order of Events — Vertical Timeline (`t = 26.5s – 29.5s`)
**Keyframes:** `10-order-of-events-timeline-27.5s.png`

- **Header (`HK` + `ORDER OF EVENTS`):** `opacity: 0 → 1`, `translateY(16px → 0)`, `650ms`.
- **Vertical Spine Line (Optional Enhancement matching flow):** Scrubbed `scaleY(0 → 1)` from `transform-origin: top` tied to scroll (`scrub: 0.6`).
- **Timeline Rows (Icon Badge + Time + Event Label):**
  - Each row triggers individually at `start: "top 86%"` (or staggered `90ms` in viewport):
  - Circular icon badge: `scale(0.75 → 1)`, `opacity: 0 → 1`, `450ms`, `--ease-tactile`.
  - Text block: `translateX(14px → 0)`, `opacity: 0 → 1`, `600ms`, `--ease-editorial`.

---

### Section 7: Interactive RSVP Form (`t = 30.0s – 40.5s`)
**Keyframes:** `11-rsvp-intro-30.5s.png`, `12-rsvp-form-input-33.5s.png`, `13-rsvp-form-scroll-36.5s.png`, `14-rsvp-submit-cta-39.5s.png`

- **Section Entrance:** Heading + form fields stagger in (`translateY(18px → 0)`, `opacity: 0 → 1`, `stagger: 60ms`, `600ms`).
- **Attendance Radio Cards (`Yes, I'll be there` / `Decline`):**
  - Tap feedback: `scale(0.98)` (`120ms`), border color & champagne tint crossfade (`250ms`).
- **Input Focus & Dropdowns:**
  - Smooth border-color + subtle outer glow transition (`200ms`, `ease-out`).
- **Champagne Gold `SEND RSVP` Button:**
  - Tap press: `scale(0.97)` (`150ms`).
  - Submit loading state: Spinner fade-in (`200ms`) → Success state crossfade with subtle celebratory check icon (`scale(0.8 → 1)`, `--ease-tactile`).

---

### Section 8: Wishes / Quote Carousel (`t = 41.0s – 43.5s`)
**Keyframes:** `15-wishes-carousel-42.5s.png`

- **Entrance:** `opacity: 0 → 1`, `translateY(18px → 0)`, `700ms`.
- **Slide Transition (Swipe or Auto-advance every `5000ms`):**
  - Crossfade + subtle horizontal drift (`translateX(16px → 0)`, `opacity: 0 → 1`, `500ms`, `--ease-editorial`).
- **Pagination Dots (`• • •`):** Active dot width morph (`6px → 18px`, `border-radius: 9999px`, `300ms`, `--ease-editorial`).

---

### Section 9: Closing / Dark Espresso-Gold Footer (`t = 44.0s – 46.7s`)
**Keyframes:** `16-closing-footer-45.5s.png`

- **ScrollTrigger:** `start: "top 80%"`, `once: true`.
- **Background:** Rich dark espresso-to-champagne-gold radial/linear gradient.
- **Choreography (`stagger: 110ms`):**
  1. Monogram `HK`: `opacity: 0 → 1`, `translateY(16px → 0)`, `700ms`.
  2. Heading (`WE CAN'T WAIT TO CELEBRATE WITH YOU!`): `opacity: 0 → 1`, `translateY(20px → 0)`, `800ms`.
  3. Thank-you note: `opacity: 0 → 1`, `translateY(14px → 0)`, `700ms`.
  4. Action Pill Buttons (2 stacked pills): `opacity: 0 → 1`, `translateY(14px → 0)`, `650ms`, `stagger: 90ms`.

---

## 4. Production Implementation Reference (GSAP + Framer Motion + CSS)

### 4.1 Reusable Framer Motion Variants (React / Next.js)
```tsx
export const editorialEase = [0.22, 1, 0.36, 1] as const;

export const fadeUpVariant = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: editorialEase },
  }),
};

export const ovalPortraitVariant = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.85, ease: editorialEase },
  },
};

export const svgRosePathVariant = {
  hidden: { pathLength: 0, opacity: 0.15 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.2, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};
```

### 4.2 Ambient Floral Sway & Audio Ripple (Pure CSS — Zero JS Overhead)
```css
@keyframes floralSway {
  0%, 100% { transform: translate3d(0, 0, 0) rotate(-1.5deg); }
  50%      { transform: translate3d(0, -4px, 0) rotate(1.5deg); }
}

@keyframes audioRipple {
  0%   { transform: scale(1); opacity: 0.45; }
  100% { transform: scale(1.48); opacity: 0; }
}

.floral-ambient {
  animation: floralSway 7.5s cubic-bezier(0.45, 0.05, 0.55, 0.95) infinite;
}

.audio-fab-ring {
  animation: audioRipple 2.4s cubic-bezier(0.22, 1, 0.36, 1) infinite;
}

@media (prefers-reduced-motion: reduce) {
  .floral-ambient,
  .audio-fab-ring {
    animation: none !important;
  }
  * {
    scroll-behavior: auto !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4.3 Performance & Accessibility Guardrails (Mandatory)
1. **GPU-Composited Only:** Only animate `transform`, `opacity`, and SVG `stroke-dashoffset`. Never animate `top`, `left`, `width`, `height`, or `margin`.
2. **CLS = 0:** Reserve explicit `aspect-ratio` on all oval portraits, venue thumbnails, and floral corner containers.
3. **Reduced Motion:** Wrap Framer Motion root in `<MotionConfig reducedMotion="user">` and disable Lenis smooth-scroll / parallax when `window.matchMedia('(prefers-reduced-motion: reduce)').matches` is true.
4. **Template Reusability:** Drive all copy, dates, monogram letters, audio track URL, and floral theme colors from a single `weddingConfig.ts` JSON object so every motion timeline works identically for any client.
