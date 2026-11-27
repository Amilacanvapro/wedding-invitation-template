import React from 'react';

export const SplashRoseSvg: React.FC<{ drawn: boolean }> = ({ drawn }) => (
  <svg
    viewBox="0 0 260 360"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`w-60 sm:w-64 h-auto select-none pointer-events-none ${drawn ? 'rose-drawn' : ''}`}
    aria-hidden="true"
  >
    {/* Stem */}
    <path
      d="M130 198 C134 248 130 298 134 354"
      stroke="#DFD4BE"
      strokeWidth="1.5"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 200 } as React.CSSProperties}
    />
    {/* Left Upper Leaf */}
    <path
      d="M130 262 C98 228 56 226 16 232 C42 256 80 266 130 262 Z"
      stroke="#DFD4BE"
      strokeWidth="1.35"
      strokeLinejoin="round"
      className="rose-stroke-path"
      style={{ '--path-len': 320, transitionDelay: '120ms' } as React.CSSProperties}
    />
    <path
      d="M126 258 C88 242 54 238 26 234"
      stroke="#DFD4BE"
      strokeWidth="1"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 140, transitionDelay: '160ms' } as React.CSSProperties}
    />
    {/* Left Lower Leaf */}
    <path
      d="M126 278 C84 260 44 282 22 322 C66 322 106 306 126 278 Z"
      stroke="#DFD4BE"
      strokeWidth="1.35"
      strokeLinejoin="round"
      className="rose-stroke-path"
      style={{ '--path-len': 340, transitionDelay: '180ms' } as React.CSSProperties}
    />
    {/* Right Leaf + Veins */}
    <path
      d="M133 272 C156 230 196 206 244 208 C222 252 184 284 133 272 Z"
      stroke="#DFD4BE"
      strokeWidth="1.35"
      strokeLinejoin="round"
      className="rose-stroke-path"
      style={{ '--path-len': 360, transitionDelay: '220ms' } as React.CSSProperties}
    />
    <path
      d="M133 272 C170 250 202 232 232 216"
      stroke="#DFD4BE"
      strokeWidth="1.05"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 160, transitionDelay: '260ms' } as React.CSSProperties}
    />
    {/* Outer Rose Petals */}
    <path
      d="M130 42 C102 36 74 52 68 78 C46 84 38 112 52 136 C42 162 62 186 92 184 C112 198 152 200 174 184 C206 184 222 158 210 132 C222 108 210 78 188 74 C178 48 154 38 130 42 Z"
      stroke="#DFD4BE"
      strokeWidth="1.45"
      strokeLinejoin="round"
      className="rose-stroke-path"
      style={{ '--path-len': 720, transitionDelay: '240ms' } as React.CSSProperties}
    />
    {/* Secondary Layered Petals */}
    <path
      d="M84 96 C78 122 92 154 128 160 C166 164 186 138 180 104 C174 74 146 62 118 68 C98 72 88 82 84 96 Z"
      stroke="#DFD4BE"
      strokeWidth="1.35"
      className="rose-stroke-path"
      style={{ '--path-len': 420, transitionDelay: '360ms' } as React.CSSProperties}
    />
    <path
      d="M62 134 C86 154 124 176 168 164 C192 156 202 132 198 110"
      stroke="#DFD4BE"
      strokeWidth="1.25"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 260, transitionDelay: '440ms' } as React.CSSProperties}
    />
    {/* Inner Rose Swirl */}
    <path
      d="M128 116 C120 112 122 100 132 100 C144 100 148 114 140 124 C128 136 106 130 104 112 C102 90 126 78 148 86 C168 94 170 124 152 140 C130 156 96 146 92 120"
      stroke="#DFD4BE"
      strokeWidth="1.35"
      strokeLinecap="round"
      className="rose-stroke-path"
      style={{ '--path-len': 380, transitionDelay: '520ms' } as React.CSSProperties}
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
