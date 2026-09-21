import React from 'react';

export default function AetherLogo({ className = "w-7 h-7", textClassName = "text-lg", showText = true }) {
  return (
    <div className="flex items-center gap-2.5 group cursor-pointer">
      {/* Precision Geometric 'A' Prism Glyph from Design */}
      <div className={`relative flex items-center justify-center shrink-0 ${className}`}>
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-[0_0_12px_rgba(0,242,254,0.5)]">
          {/* Outer Triangle Outline */}
          <path 
            d="M20 4L36 34H4L20 4Z" 
            stroke="url(#aether-grad)" 
            strokeWidth="3.2" 
            strokeLinejoin="round" 
          />
          {/* Inner Inverted Chevron / Delta core */}
          <path 
            d="M20 16L27 30H13L20 16Z" 
            fill="url(#aether-core-grad)" 
            opacity="0.9"
          />
          {/* Central Energy Spark */}
          <circle cx="20" cy="23" r="2" fill="#FFFFFF" />
          
          <defs>
            <linearGradient id="aether-grad" x1="4" y1="4" x2="36" y2="34" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgb(var(--color-primary))" />
              <stop offset="0.6" stopColor="rgb(var(--color-secondary))" />
              <stop offset="1" stopColor="rgb(var(--color-accent))" />
            </linearGradient>
            <linearGradient id="aether-core-grad" x1="13" y1="16" x2="27" y2="30" gradientUnits="userSpaceOnUse">
              <stop stopColor="rgb(var(--color-primary))" />
              <stop offset="1" stopColor="rgb(var(--color-secondary))" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span className={`font-display font-extrabold tracking-wider text-white ${textClassName}`}>
              AETHER
            </span>
            <span className="text-[10px] font-mono tracking-widest text-[rgb(var(--color-primary))] font-bold uppercase">
              STUDIOS
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
