import React from 'react';
import { ArrowRight } from 'lucide-react';
import HeroCanvas3D from '../3d/HeroCanvas3D';
import { soundEffects } from '../../utils/soundFx';

export default function HeroSection({ onOpenIntake, onExploreWork, currentTheme }) {
  return (
    <section id="home" className="relative min-h-screen pt-32 pb-28 flex flex-col justify-center overflow-hidden bg-[#04060A]">
      {/* 3D Cosmic Starfield Background */}
      <HeroCanvas3D theme={currentTheme} />

      {/* Atmospheric Nebula Glows */}
      <div 
        className="pointer-events-none absolute top-1/4 left-1/3 -translate-x-1/2 w-[650px] h-[550px] rounded-full blur-[160px] opacity-25"
        style={{ background: 'rgb(var(--color-primary))' }}
      />
      <div 
        className="pointer-events-none absolute top-1/2 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-20"
        style={{ background: 'rgb(var(--color-accent))' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full my-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Hero Column (7 Cols) */}
          <div className="lg:col-span-7 text-left space-y-7">
            
            {/* Tagline Pill from Design */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#0B101B]/90 border border-white/10 text-[11px] font-mono tracking-wider text-slate-300 shadow-sm">
              <span className="text-[#00F2FE] font-bold">IDEAS</span>
              <span className="text-slate-500">→</span>
              <span className="text-[#C084FC] font-bold">PRODUCTS</span>
              <span className="text-slate-500">→</span>
              <span className="text-white font-bold">REALITY</span>
            </div>

            {/* Main Headline matching the design exactly */}
            <h1 className="text-4xl sm:text-6xl lg:text-[70px] font-display font-extrabold text-white leading-[1.08] tracking-tight">
              Build Your Vision <br />
              <span className="text-white">With </span>
              <span className="bg-gradient-to-r from-[#38BDF8] via-[#00F2FE] to-[#A855F7] bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,242,254,0.3)]">
                Aether Studios
              </span>
            </h1>

            {/* Subtitle from Design */}
            <p className="text-sm sm:text-base lg:text-lg text-slate-400 max-w-xl font-normal leading-relaxed">
              We design, code and launch modern websites, apps and digital solutions for students, creators, businesses and startups.
            </p>

            {/* Action Buttons from Design */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenIntake();
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className="px-8 py-3.5 rounded-full font-display font-bold text-sm text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-[0_0_30px_rgba(147,51,234,0.4)] flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 group"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={() => {
                  soundEffects.playClick();
                  onExploreWork();
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className="px-7 py-3.5 rounded-full font-display font-medium text-sm text-slate-200 bg-white/5 hover:bg-white/10 hover:text-white border border-white/15 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <span>Explore Our Work</span>
              </button>
            </div>

            {/* Stats Row from Design */}
            <div className="grid grid-cols-3 gap-6 pt-10 border-t border-white/10 max-w-lg">
              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white">
                  140+
                </div>
                <div className="text-xs text-slate-400 font-sans mt-1">
                  Projects Delivered
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white">
                  48h
                </div>
                <div className="text-xs text-slate-400 font-sans mt-1">
                  Avg. Turnaround
                </div>
              </div>

              <div>
                <div className="text-2xl sm:text-3xl lg:text-4xl font-display font-extrabold text-white">
                  99.6%
                </div>
                <div className="text-xs text-slate-400 font-sans mt-1">
                  Client Satisfaction
                </div>
              </div>
            </div>

          </div>

          {/* Right Hero Visual (5 Cols): The Epic Monolith Gateway from the Design */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Ambient Backlight Glow */}
            <div className="absolute inset-0 bg-gradient-to-t from-[rgb(var(--color-primary))]/25 via-[rgb(var(--color-accent))]/15 to-transparent blur-3xl rounded-full scale-105" />

            {/* Realistic Cinematic Monolith Artwork matching design */}
            <div className="relative w-full max-w-[440px] aspect-[3/4] rounded-3xl overflow-hidden border border-white/15 shadow-[0_0_50px_rgba(0,242,254,0.25)] group">
              <img 
                src="/aether_hero_monolith.jpg" 
                alt="Aether Studios Cosmic Monolith Gateway" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
              />

              {/* Subtle Corner Vignette & Lighting */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#04060A]/80 via-transparent to-transparent pointer-events-none" />

              {/* Bottom Subtle Tag */}
              <div className="absolute bottom-4 inset-x-4 flex items-center justify-between px-4 py-2 rounded-xl bg-black/50 backdrop-blur-md border border-white/10 text-[10px] font-mono text-slate-300">
                <span className="flex items-center gap-1.5 text-cyan-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
                  <span>Aether Monolith v2.6</span>
                </span>
                <span className="text-slate-400">Active Gateway</span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
