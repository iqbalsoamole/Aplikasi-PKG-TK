import React from 'react';
import logoSukabumiImg from '../assets/logo-sukabumi.png';

export const LogoSukabumi: React.FC<{ className?: string; alt?: string }> = ({
  className = 'w-16 h-16',
  alt = 'Lambang Resmi Kota Sukabumi - Reugreug Pageuh Repeh Rapih',
}) => {
  return (
    <img
      src={logoSukabumiImg}
      alt={alt}
      className={`${className} object-contain shrink-0 select-none`}
      loading="eager"
      decoding="sync"
    />
  );
};

export const LogoTK: React.FC<{ className?: string }> = ({ className = 'w-16 h-16' }) => {
  return (
    <svg
      viewBox="0 0 500 500"
      className={`${className} shrink-0 select-none drop-shadow-xs`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Lambang Resmi Taman Kanak-Kanak Indonesia"
    >
      <defs>
        {/* Soft radial gradient for vibrant blue badge background */}
        <radialGradient id="tkBlueBg" cx="48%" cy="46%" r="52%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="65%" stopColor="#25a9e0" />
          <stop offset="100%" stopColor="#1e96cb" />
        </radialGradient>
      </defs>

      {/* 1. OUTER BLACK RING & SKY BLUE CIRCULAR FIELD */}
      <circle
        cx="250"
        cy="250"
        r="238"
        fill="url(#tkBlueBg)"
        stroke="#111827"
        strokeWidth="14"
      />
      <circle
        cx="250"
        cy="250"
        r="230"
        fill="none"
        stroke="#111827"
        strokeWidth="2"
      />

      {/* 2. LEFT WREATH: RICE STALK (PADI) - White grains with black outlines */}
      <g id="padiStalk" stroke="#111827" strokeWidth="3" strokeLinejoin="round">
        {/* Main curved branch */}
        <path
          d="M 235 435 C 145 420 90 320 105 200 C 115 135 155 85 210 75"
          fill="none"
          stroke="#111827"
          strokeWidth="4.5"
        />

        {/* Rice grains in pairs along the arc */}
        {[
          { x: 215, y: 418, r: -25, w: 22, h: 10 },
          { x: 190, y: 405, r: -35, w: 23, h: 10.5 },
          { x: 170, y: 385, r: -45, w: 24, h: 11 },
          { x: 152, y: 358, r: -55, w: 25, h: 11.5 },
          { x: 138, y: 328, r: -65, w: 25, h: 11.5 },
          { x: 128, y: 295, r: -75, w: 25, h: 11.5 },
          { x: 122, y: 260, r: -85, w: 25, h: 11.5 },
          { x: 125, y: 225, r: -95, w: 24, h: 11 },
          { x: 135, y: 190, r: -105, w: 24, h: 11 },
          { x: 150, y: 155, r: -115, w: 23, h: 10.5 },
          { x: 172, y: 125, r: -125, w: 22, h: 10 },
          { x: 198, y: 100, r: -135, w: 20, h: 9.5 },
          // Inner grain pairs
          { x: 202, y: 395, r: 25, w: 20, h: 9.5 },
          { x: 180, y: 370, r: 20, w: 21, h: 10 },
          { x: 165, y: 340, r: 10, w: 22, h: 10 },
          { x: 152, y: 308, r: 0, w: 22, h: 10 },
          { x: 148, y: 275, r: -10, w: 22, h: 10 },
          { x: 150, y: 240, r: -20, w: 22, h: 10 },
          { x: 158, y: 205, r: -30, w: 21, h: 10 },
          { x: 172, y: 172, r: -40, w: 20, h: 9.5 },
          { x: 192, y: 142, r: -50, w: 19, h: 9 },
          { x: 215, y: 118, r: -60, w: 18, h: 8.5 },
        ].map((g, i) => (
          <g key={i} transform={`translate(${g.x}, ${g.y}) rotate(${g.r})`}>
            <ellipse
              cx="0"
              cy="0"
              rx={g.w}
              ry={g.h}
              fill="#ffffff"
              stroke="#111827"
              strokeWidth="3.5"
            />
            <path d={`M ${-g.w * 0.7} 0 L ${g.w * 0.7} 0`} stroke="#111827" strokeWidth="2.5" />
          </g>
        ))}
      </g>

      {/* 3. RIGHT WREATH: COTTON GARLAND (KAPAS) */}
      <g id="kapasGarland" stroke="#111827" strokeWidth="3" strokeLinejoin="round">
        {/* Main right curved branch */}
        <path
          d="M 265 435 C 355 420 410 320 395 200 C 385 135 345 85 290 75"
          fill="none"
          stroke="#111827"
          strokeWidth="4.5"
        />

        {/* 8 Fluffy white cotton bolls with green/black calyxes */}
        {[
          { x: 305, y: 405, r: 35, s: 0.9 },
          { x: 340, y: 365, r: 45, s: 1.0 },
          { x: 362, y: 318, r: 60, s: 1.05 },
          { x: 372, y: 268, r: 75, s: 1.1 },
          { x: 368, y: 218, r: 90, s: 1.05 },
          { x: 352, y: 172, r: 105, s: 1.0 },
          { x: 325, y: 132, r: 120, s: 0.95 },
          { x: 290, y: 102, r: 135, s: 0.9 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x}, ${c.y}) rotate(${c.r}) scale(${c.s})`}>
            {/* Calyx leaves */}
            <path
              d="M -15 15 L 0 32 L 15 15 L 25 25 L 18 5 L -18 5 L -25 25 Z"
              fill="#22c55e"
              stroke="#111827"
              strokeWidth="3"
            />
            {/* White fluffy cotton boll */}
            <path
              d="M -22 10 
                 C -32 5 -32 -18 -15 -22 
                 C -12 -35 12 -35 15 -22 
                 C 32 -18 32 5 22 10 
                 C 20 20 -20 20 -22 10 Z"
              fill="#ffffff"
              stroke="#111827"
              strokeWidth="3.5"
            />
            {/* Inner cotton creases */}
            <path d="M 0 -25 L 0 5" stroke="#111827" strokeWidth="2.5" />
            <path d="M -12 -12 L 0 2" stroke="#111827" strokeWidth="2" />
            <path d="M 12 -12 L 0 2" stroke="#111827" strokeWidth="2" />
          </g>
        ))}
      </g>

      {/* 4. BOTTOM TIE: Crossed ribbon & leaves at the base */}
      <g id="bottomBase" stroke="#111827" strokeWidth="3" strokeLinejoin="round">
        {/* Radiating bottom leaves */}
        <path d="M 250 435 C 220 465 190 460 170 445 C 190 430 225 425 250 435 Z" fill="#ffffff" />
        <path d="M 250 435 C 280 465 310 460 330 445 C 310 430 275 425 250 435 Z" fill="#ffffff" />
        <path d="M 250 440 C 230 478 210 478 195 465 C 215 450 240 445 250 440 Z" fill="#ffffff" />
        <path d="M 250 440 C 270 478 290 478 305 465 C 285 450 260 445 250 440 Z" fill="#ffffff" />
        <path d="M 250 445 C 240 488 230 490 220 480 C 235 465 245 455 250 445 Z" fill="#ffffff" />
        <path d="M 250 445 C 260 488 270 490 280 480 C 265 465 255 455 250 445 Z" fill="#ffffff" />

        {/* Ribbon knot in center */}
        <circle cx="250" cy="435" r="9" fill="#ffffff" stroke="#111827" strokeWidth="3.5" />
      </g>

      {/* 5. RED BOLD LETTERS "T" AND "K" */}
      <g id="lettersTK">
        {/* Letter T on left */}
        <text
          x="192"
          y="218"
          textAnchor="middle"
          fill="#dc2626"
          stroke="#111827"
          strokeWidth="3.5"
          paintOrder="stroke fill"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="68"
        >
          T
        </text>

        {/* Letter K on right */}
        <text
          x="308"
          y="218"
          textAnchor="middle"
          fill="#dc2626"
          stroke="#111827"
          strokeWidth="3.5"
          paintOrder="stroke fill"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="68"
        >
          K
        </text>
      </g>

      {/* 6. TWO CHILDREN (BOY & GIRL) */}
      <g id="childrenFigures" stroke="#111827" strokeWidth="3.5" strokeLinejoin="round" strokeLinecap="round">
        {/* ================= BOY (LEFT) ================= */}
        {/* Boy's Left Leg & Shoe */}
        <path d="M 205 385 L 210 425 L 222 425 L 220 385 Z" fill="#ffffff" />
        {/* Boy's Right Leg & Shoe */}
        <path d="M 230 385 L 235 425 L 247 425 L 243 385 Z" fill="#ffffff" />

        {/* Boy's Shorts */}
        <path d="M 198 340 L 248 340 L 250 388 L 226 388 L 224 365 L 222 388 L 195 388 Z" fill="#ffffff" />
        <path d="M 224 340 L 224 365" stroke="#111827" strokeWidth="3" />

        {/* Boy's Shirt */}
        <path
          d="M 188 280 
             L 242 270 
             L 246 342 
             L 196 342 Z"
          fill="#ffffff"
        />
        {/* Shirt collar & buttons */}
        <path d="M 205 278 L 218 295 L 228 273" fill="#ffffff" />
        <path d="M 218 295 L 218 340" stroke="#111827" strokeWidth="2.5" />
        <circle cx="218" cy="308" r="2" fill="#111827" />
        <circle cx="218" cy="322" r="2" fill="#111827" />

        {/* Boy's Right Arm (holding ball) */}
        <path d="M 188 280 Q 175 305 180 335 L 196 330 Q 192 305 198 282 Z" fill="#ffffff" />
        {/* Ball in boy's right hand */}
        <circle cx="198" cy="335" r="16" fill="#ffffff" stroke="#111827" strokeWidth="3.5" />
        <path d="M 184 335 C 192 325 204 325 212 335" fill="none" stroke="#111827" strokeWidth="2.5" />
        <path d="M 184 335 C 192 345 204 345 212 335" fill="none" stroke="#111827" strokeWidth="2.5" />
        <path d="M 198 319 L 198 351" fill="none" stroke="#111827" strokeWidth="2.5" />

        {/* Boy's Left Arm raised high */}
        <path
          d="M 235 272 
             L 248 215 
             L 260 220 
             L 245 275 Z"
          fill="#ffffff"
        />

        {/* Boy's Head & Face */}
        <circle cx="205" cy="245" r="22" fill="#ffffff" stroke="#111827" strokeWidth="3.5" />
        {/* Boy's Hair */}
        <path
          d="M 185 242 
             C 182 225 198 218 212 218 
             C 225 218 230 228 226 242 
             C 218 232 205 232 185 242 Z"
          fill="#111827"
        />
        {/* Eyes & Smile */}
        <circle cx="198" cy="246" r="2" fill="#111827" />
        <circle cx="212" cy="244" r="2" fill="#111827" />
        <path d="M 200 256 Q 206 260 212 255" fill="none" stroke="#111827" strokeWidth="2.5" />

        {/* ================= GIRL (RIGHT) ================= */}
        {/* Girl's Legs & Shoes */}
        <path d="M 262 385 L 258 425 L 270 425 L 272 385 Z" fill="#ffffff" />
        <path d="M 285 385 L 285 425 L 297 425 L 295 385 Z" fill="#ffffff" />

        {/* Girl's School Dress */}
        <path
          d="M 252 275 
             L 285 272 
             L 315 378 
             L 245 378 Z"
          fill="#ffffff"
        />
        {/* Belt / waist detail */}
        <path d="M 250 315 Q 280 320 306 315" fill="none" stroke="#111827" strokeWidth="2.5" />

        {/* Girl's Left Arm holding book / slate */}
        <path d="M 285 275 Q 315 295 310 335 L 295 330 Q 295 298 282 280 Z" fill="#ffffff" />
        {/* Book in girl's hand */}
        <rect
          x="280"
          y="312"
          width="25"
          height="32"
          rx="3"
          transform="rotate(12 292 328)"
          fill="#ffffff"
          stroke="#111827"
          strokeWidth="3.5"
        />
        <path d="M 284 322 L 302 325" stroke="#111827" strokeWidth="2" />
        <path d="M 283 330 L 301 333" stroke="#111827" strokeWidth="2" />

        {/* Girl's Right Arm raised high */}
        <path
          d="M 255 275 
             L 248 215 
             L 236 220 
             L 246 278 Z"
          fill="#ffffff"
        />

        {/* Girl's Head & Face */}
        <circle cx="282" cy="245" r="22" fill="#ffffff" stroke="#111827" strokeWidth="3.5" />
        {/* Girl's Hair with bob styling & headband */}
        <path
          d="M 262 245 
             C 260 220 282 216 295 216 
             C 308 216 308 235 304 252 
             C 300 262 292 262 295 248 
             C 285 235 272 235 262 245 Z"
          fill="#111827"
        />
        {/* Hair clip */}
        <rect x="290" y="222" width="6" height="4" rx="2" fill="#ffffff" stroke="#111827" strokeWidth="1.5" />
        {/* Eyes & Smile */}
        <circle cx="274" cy="244" r="2" fill="#111827" />
        <circle cx="288" cy="246" r="2" fill="#111827" />
        <path d="M 276 255 Q 282 260 288 256" fill="none" stroke="#111827" strokeWidth="2.5" />

        {/* Joint Raised Hands of Boy & Girl */}
        <circle cx="247" cy="216" r="7" fill="#ffffff" stroke="#111827" strokeWidth="3.5" />
      </g>

      {/* 7. OPEN WHITE LOTUS FLOWER BASE & INDONESIAN NATIONAL FLAG */}
      <g id="lotusAndFlag" stroke="#111827" strokeWidth="3.5" strokeLinejoin="round">
        {/* Lotus Flower Base held by the children */}
        <path
          d="M 220 190 
             C 215 165 228 155 235 170 
             C 238 150 255 150 258 170 
             C 265 155 278 165 272 190 
             C 265 210 228 210 220 190 Z"
          fill="#ffffff"
          stroke="#111827"
          strokeWidth="3.5"
        />
        {/* Lotus petal accents */}
        <path d="M 235 170 Q 247 185 247 210" fill="none" stroke="#111827" strokeWidth="2.5" />
        <path d="M 258 170 Q 247 185 247 210" fill="none" stroke="#111827" strokeWidth="2.5" />

        {/* Flagpole rising from the center of lotus */}
        <path d="M 247 205 L 243 45" stroke="#111827" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="243" cy="45" r="4" fill="#facc15" stroke="#111827" strokeWidth="2" />

        {/* Indonesian Flag: Sang Saka Merah Putih waving right */}
        {/* Red Top Half */}
        <path
          d="M 245 52 
             C 275 42 295 62 325 55 
             L 322 88 
             C 292 95 272 75 244 85 Z"
          fill="#dc2626"
          stroke="#111827"
          strokeWidth="3.5"
        />
        {/* White Bottom Half */}
        <path
          d="M 244 85 
             C 272 75 292 95 322 88 
             L 320 120 
             C 290 128 270 108 244 118 Z"
          fill="#ffffff"
          stroke="#111827"
          strokeWidth="3.5"
        />
        {/* Flag rippling wave lines */}
        <path d="M 285 55 C 285 75 282 95 282 118" fill="none" stroke="#111827" strokeWidth="2" opacity="0.4" />
      </g>
    </svg>
  );
};

// Backward-compatibility alias
export const LogoTutWuri = LogoTK;
