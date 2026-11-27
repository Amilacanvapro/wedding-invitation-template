import React from 'react';

export const SplashRoseSvg: React.FC<{ drawn: boolean }> = ({ drawn }) => (
  <svg
    viewBox="0 0 320 470"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-[92%] max-w-[310px] sm:max-w-[342px] h-full object-contain select-none pointer-events-none ${
      drawn ? 'rose-drawn' : ''
    }`}
    preserveAspectRatio="xMidYMin meet"
    aria-hidden="true"
  >
    {/* Graceful Botanical Stem extending past CTA to bottom arch */}
    <path
      d="M160 250 C166 312 158 386 164 468"
      stroke="#DFD4BE"
      strokeWidth="1.6"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 240 } as React.CSSProperties}
    />

    {/* Left Upper Leaf + Midrib + Veins */}
    <path
      d="M161 324 C122 282 70 278 16 290 C46 322 96 336 161 324 Z"
      stroke="#DFD4BE"
      strokeWidth="1.45"
      strokeLinejoin="round"
      className="rose-stroke-path"
      style={{ '--path-len': 380, transitionDelay: '100ms' } as React.CSSProperties}
    />
    <path
      d="M156 320 C112 302 68 296 28 292"
      stroke="#DFD4BE"
      strokeWidth="1.05"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 160, transitionDelay: '150ms' } as React.CSSProperties}
    />

    {/* Left Lower Sweeping Leaf + Vein */}
    <path
      d="M158 346 C106 326 52 354 24 406 C80 404 130 384 158 346 Z"
      stroke="#DFD4BE"
      strokeWidth="1.45"
      strokeLinejoin="round"
      className="rose-stroke-path"
      style={{ '--path-len': 400, transitionDelay: '170ms' } as React.CSSProperties}
    />
    <path
      d="M152 350 C110 364 74 380 42 396"
      stroke="#DFD4BE"
      strokeWidth="1.05"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 160, transitionDelay: '210ms' } as React.CSSProperties}
    />

    {/* Right Sweeping Botanical Leaf + Detailed Veins */}
    <path
      d="M164 338 C194 282 246 250 306 254 C280 310 232 350 164 338 Z"
      stroke="#DFD4BE"
      strokeWidth="1.45"
      strokeLinejoin="round"
      className="rose-stroke-path"
      style={{ '--path-len': 430, transitionDelay: '200ms' } as React.CSSProperties}
    />
    <path
      d="M166 336 C212 308 252 284 290 264"
      stroke="#DFD4BE"
      strokeWidth="1.1"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 190, transitionDelay: '250ms' } as React.CSSProperties}
    />
    <path
      d="M210 308 C218 290 228 278 242 270 M228 300 C242 304 256 304 270 298 M194 318 C208 326 222 330 238 328"
      stroke="#DFD4BE"
      strokeWidth="0.95"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 180, transitionDelay: '290ms' } as React.CSSProperties}
    />

    {/* Outer Full-Bloom Ruffled Rose Petals */}
    <path
      d="M160 22 C122 14 84 34 74 70 C42 78 28 116 46 150 C34 188 60 222 102 220 C128 244 188 248 218 222 C262 222 288 186 272 148 C290 112 272 72 240 66 C226 30 194 16 160 22 Z"
      stroke="#DFD4BE"
      strokeWidth="1.6"
      strokeLinejoin="round"
      className="rose-stroke-path"
      style={{ '--path-len': 940, transitionDelay: '220ms' } as React.CSSProperties}
    />

    {/* Outer-Mid Petal Folds (Left & Right) */}
    <path
      d="M74 70 C62 104 68 144 96 172 C122 198 176 206 218 184 C252 166 268 130 256 92"
      stroke="#DFD4BE"
      strokeWidth="1.35"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 480, transitionDelay: '300ms' } as React.CSSProperties}
    />
    <path
      d="M48 148 C78 176 116 214 172 214 C218 214 252 192 270 154"
      stroke="#DFD4BE"
      strokeWidth="1.35"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 380, transitionDelay: '350ms' } as React.CSSProperties}
    />
    <path
      d="M92 48 C124 34 186 32 222 58 C248 76 254 114 238 148"
      stroke="#DFD4BE"
      strokeWidth="1.3"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 340, transitionDelay: '390ms' } as React.CSSProperties}
    />

    {/* Secondary Cupped Petals */}
    <path
      d="M98 102 C88 138 108 182 156 190 C208 196 236 160 228 114 C220 74 182 56 144 64 C116 70 104 84 98 102 Z"
      stroke="#DFD4BE"
      strokeWidth="1.45"
      className="rose-stroke-path"
      style={{ '--path-len': 540, transitionDelay: '430ms' } as React.CSSProperties}
    />

    {/* Inner Velvet Rose Petals & Center Swirl */}
    <path
      d="M158 130 C146 124 148 106 162 106 C178 106 184 126 172 140 C156 156 126 148 124 124 C120 94 152 78 184 88 C212 98 216 140 190 162 C160 184 114 170 110 134"
      stroke="#DFD4BE"
      strokeWidth="1.45"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 480, transitionDelay: '500ms' } as React.CSSProperties}
    />
    <path
      d="M138 118 C148 96 182 94 194 116 C204 134 190 156 168 160"
      stroke="#DFD4BE"
      strokeWidth="1.2"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 210, transitionDelay: '560ms' } as React.CSSProperties}
    />
  </svg>
);

export const WatercolorFloralCorner: React.FC<{ position: 'top-right' | 'bottom-left' }> = ({
  position,
}) => {
  const isTopRight = position === 'top-right';
  const uid = isTopRight ? 'tr' : 'bl';

  return (
    <div
      className={`pointer-events-none select-none absolute z-0 w-[300px] sm:w-[390px] md:w-[440px] ${
        isTopRight ? '-top-6 -right-6' : '-bottom-8 -left-6'
      }`}
      data-hero-parallax
      aria-hidden="true"
    >
      <div
        data-hero-floral-top={isTopRight ? '' : undefined}
        data-hero-floral-bottom={!isTopRight ? '' : undefined}
        className={isTopRight ? 'floral-ambient-top' : 'floral-ambient-bottom'}
      >
        <svg
          viewBox="0 0 460 360"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={`w-full h-auto ${isTopRight ? '' : 'rotate-180'}`}
        >
          <defs>
            <filter id={`wc-blur-${uid}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
            <radialGradient id={`wc-wash-${uid}`} cx="0.65" cy="0.24" r="0.72">
              <stop offset="0%" stopColor="#DEB1C4" stopOpacity="0.46" />
              <stop offset="52%" stopColor="#EFD7E2" stopOpacity="0.28" />
              <stop offset="100%" stopColor="#FFFDFC" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`wc-rose-outer-${uid}`} cx="0.45" cy="0.45" r="0.55">
              <stop offset="0%" stopColor="#DF7E8D" />
              <stop offset="48%" stopColor="#F2ADB7" />
              <stop offset="82%" stopColor="#FAD5DB" />
              <stop offset="100%" stopColor="#FCE9EC" stopOpacity="0.2" />
            </radialGradient>
            <radialGradient id={`wc-rose-core-${uid}`} cx="0.5" cy="0.5" r="0.5">
              <stop offset="0%" stopColor="#CE6678" />
              <stop offset="65%" stopColor="#EA95A3" />
              <stop offset="100%" stopColor="#F8C6CE" stopOpacity="0" />
            </radialGradient>
            <radialGradient id={`wc-ivory-${uid}`} cx="0.48" cy="0.48" r="0.55">
              <stop offset="0%" stopColor="#EDE2D4" />
              <stop offset="58%" stopColor="#F8F2E8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          {/* Soft translucent watercolor blush wash */}
          <ellipse cx="268" cy="86" rx="242" ry="132" fill={`url(#wc-wash-${uid})`} filter={`url(#wc-blur-${uid})`} />

          {/* Painterly Eucalyptus & Sage Branches */}
          <path d="M98 18 C162 42 225 60 296 86" stroke="#75947B" strokeWidth="2.2" strokeLinecap="round" opacity="0.72" />
          <path d="M188 14 C228 46 266 78 308 112" stroke="#85A28B" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
          <ellipse cx="128" cy="20" rx="22" ry="8" transform="rotate(-16 128 20)" fill="#94B39A" opacity="0.82" />
          <ellipse cx="164" cy="30" rx="24" ry="9" transform="rotate(-24 164 30)" fill="#7A9D82" opacity="0.8" />
          <ellipse cx="150" cy="48" rx="19" ry="7.5" transform="rotate(24 150 48)" fill="#A4C1AA" opacity="0.76" />
          <ellipse cx="204" cy="42" rx="22" ry="8.5" transform="rotate(-18 204 42)" fill="#6E9176" opacity="0.74" />
          <ellipse cx="212" cy="68" rx="19" ry="8" transform="rotate(20 212 68)" fill="#8CAB93" opacity="0.72" />
          <ellipse cx="268" cy="144" rx="18" ry="7" transform="rotate(-48 268 144)" fill="#7B9982" opacity="0.68" />
          <ellipse cx="290" cy="160" rx="15" ry="6" transform="rotate(-35 290 160)" fill="#99B49F" opacity="0.65" />

          {/* Hanging Crimson Berry Sprig */}
          <path d="M324 114 C332 152 346 184 358 214" stroke="#6B564C" strokeWidth="1.5" opacity="0.6" />
          <circle cx="328" cy="142" r="5" fill="#AC2D46" opacity="0.92" />
          <circle cx="338" cy="156" r="5.5" fill="#952239" opacity="0.94" />
          <circle cx="324" cy="168" r="4.5" fill="#C4415A" opacity="0.88" />
          <circle cx="344" cy="178" r="5.2" fill="#9C263E" opacity="0.92" />
          <circle cx="335" cy="190" r="4.6" fill="#B7364F" opacity="0.88" />
          <circle cx="354" cy="196" r="4.8" fill="#8E2036" opacity="0.88" />

          {/* Main Painterly Blush Garden Rose */}
          <g transform="translate(310 74)">
            <circle cx="0" cy="0" r="64" fill={`url(#wc-rose-outer-${uid})`} />
            <circle cx="-4" cy="2" r="34" fill={`url(#wc-rose-core-${uid})`} />
            <path d="M-40 -10 C-30 -42 18 -46 36 -16 C50 12 24 44 -10 40 C-38 36 -46 12 -26 -14" stroke="#D36E80" strokeWidth="2" strokeLinecap="round" opacity="0.58" />
            <path d="M-24 2 C-18 -20 14 -24 24 -6 C32 10 14 28 -8 24 C-22 20 -26 8 -14 -6" stroke="#BC5668" strokeWidth="1.8" strokeLinecap="round" opacity="0.64" />
            <path d="M-8 4 C-6 -8 8 -10 12 -2 C15 6 6 12 -4 10" stroke="#9F3F52" strokeWidth="1.5" strokeLinecap="round" opacity="0.6" />
          </g>

          {/* Peach-Coral Accent Bloom */}
          <g transform="translate(396 52)">
            <circle cx="0" cy="0" r="42" fill="#F9B7A9" opacity="0.78" />
            <circle cx="-6" cy="4" r="22" fill="#F29686" opacity="0.55" />
          </g>

          {/* Secondary Ivory Garden Rose */}
          <g transform="translate(384 166)">
            <circle cx="0" cy="0" r="50" fill={`url(#wc-ivory-${uid})`} />
            <path d="M-28 -8 C-20 -30 14 -32 26 -10 C34 10 16 30 -8 28 C-24 26 -30 8 -18 -8" stroke="#D9CBB8" strokeWidth="1.7" strokeLinecap="round" />
            <path d="M-12 2 C-8 -12 10 -14 14 -2 C18 8 6 16 -6 14" stroke="#CAB9A2" strokeWidth="1.4" strokeLinecap="round" />
          </g>

          {/* Delicate Small White Blossom */}
          <g transform="translate(248 118)">
            <circle cx="0" cy="-10" r="9" fill="#FFFDF9" opacity="0.95" />
            <circle cx="10" cy="-2" r="9" fill="#FFFDF9" opacity="0.95" />
            <circle cx="6" cy="9" r="9" fill="#FFFDF9" opacity="0.95" />
            <circle cx="-6" cy="9" r="9" fill="#FFFDF9" opacity="0.95" />
            <circle cx="-10" cy="-2" r="9" fill="#FFFDF9" opacity="0.95" />
            <circle cx="0" cy="1" r="4.5" fill="#D5BE84" />
          </g>
        </svg>
      </div>
    </div>
  );
};

/**
 * Scroll-linked volumetric ivory/cream Parting Clouds for the Our Love Story section,
 * matching the reference site's two opposing cloud banks that part outward left/right
 * and fade away as the user scrolls down.
 */
export const PartingCloudsOverlay: React.FC = () => (
  <div
    className="pointer-events-none select-none absolute inset-0 overflow-hidden z-20 flex flex-col md:flex-row"
    aria-hidden="true"
  >
    {/* Left / Top-Left Volumetric Cloud Bank */}
    <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-visible">
      <svg
        data-story-cloud="left"
        viewBox="0 0 640 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -left-24 top-0 w-[135vw] md:w-[130%] h-[78%] md:h-full max-w-none will-change-transform"
      >
        <defs>
          <filter id="story-cloud-blur-l" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <radialGradient id="story-cloud-grad-l" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FAF3E7" stopOpacity="0.96" />
            <stop offset="58%" stopColor="#EFE4D2" stopOpacity="0.78" />
            <stop offset="100%" stopColor="#EFE4D2" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g filter="url(#story-cloud-blur-l)">
          <ellipse cx="220" cy="210" rx="230" ry="145" fill="url(#story-cloud-grad-l)" />
          <ellipse cx="385" cy="245" rx="195" ry="125" fill="url(#story-cloud-grad-l)" />
          <ellipse cx="165" cy="310" rx="185" ry="118" fill="url(#story-cloud-grad-l)" />
          <ellipse cx="310" cy="145" rx="170" ry="102" fill="url(#story-cloud-grad-l)" />
        </g>
      </svg>
    </div>

    {/* Right / Bottom-Right Volumetric Cloud Bank */}
    <div className="relative w-full h-1/2 md:w-1/2 md:h-full overflow-visible">
      <svg
        data-story-cloud="right"
        viewBox="0 0 640 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute -right-24 bottom-0 w-[135vw] md:w-[130%] h-[78%] md:h-full max-w-none will-change-transform"
      >
        <defs>
          <filter id="story-cloud-blur-r" x="-15%" y="-15%" width="130%" height="130%">
            <feGaussianBlur stdDeviation="16" />
          </filter>
          <radialGradient id="story-cloud-grad-r" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FAF3E7" stopOpacity="0.96" />
            <stop offset="58%" stopColor="#ECE0CC" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ECE0CC" stopOpacity="0" />
          </radialGradient>
        </defs>
        <g filter="url(#story-cloud-blur-r)">
          <ellipse cx="410" cy="255" rx="235" ry="148" fill="url(#story-cloud-grad-r)" />
          <ellipse cx="245" cy="290" rx="195" ry="126" fill="url(#story-cloud-grad-r)" />
          <ellipse cx="465" cy="165" rx="180" ry="110" fill="url(#story-cloud-grad-r)" />
          <ellipse cx="340" cy="355" rx="175" ry="104" fill="url(#story-cloud-grad-r)" />
        </g>
      </svg>
    </div>
  </div>
);
