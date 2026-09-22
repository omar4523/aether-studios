import React from 'react';

export default function AetherLogo({ className = "w-6 h-6", textClassName = "text-base", showText = true }) {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer select-none">
      {/* Precision Geometric 'A' Mark from Mockup */}
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(56,189,248,0.4)]">
          {/* Main Angled Left-Right Triangle Apex */}
          <path
            d="M18 4L32 30H24L18 17L12 30H4L18 4Z"
            fill="url(#aether-logo-gradient)"
          />
          {/* Inner Accent Core */}
          <path
            d="M18 10L23.5 22H12.5L18 10Z"
            fill="#050811"
            opacity="0.9"
          />
          {/* Cyan Glow Cross Bar */}
          <path
            d="M10 24H26L28 28H8L10 24Z"
            fill="url(#aether-logo-accent)"
          />
          <defs>
            <linearGradient id="aether-logo-gradient" x1="4" y1="4" x2="32" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="#38BDF8" />
              <stop offset="0.6" stopColor="#818CF8" />
              <stop offset="1" stopColor="#C084FC" />
            </linearGradient>
            <linearGradient id="aether-logo-accent" x1="8" y1="24" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00F2FE" />
              <stop offset="1" stopColor="#A855F7" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col text-left leading-tight">
          <span className={`font-display font-black tracking-[0.2em] text-white ${textClassName}`}>
            AETHER
          </span>
          <span className="text-[9px] font-mono tracking-[0.32em] text-slate-400 font-bold uppercase -mt-0.5">
            STUDIOS
          </span>
        </div>
      )}
    </div>
  );
}
