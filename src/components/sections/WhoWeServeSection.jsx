import React from 'react';
import { GraduationCap, Briefcase, Rocket, ArrowRight } from 'lucide-react';
import TiltCard from '../3d/TiltCard';
import { whoWeServeData } from '../../data/servicesData';
import { soundEffects } from '../../utils/soundFx';

const iconMap = {
  GraduationCap,
  Briefcase,
  Rocket,
};

export default function WhoWeServeSection({ onSelectAudience }) {
  return (
    <section className="relative bg-[#FFFFFF] text-slate-900 pt-16 pb-28">
      
      {/* Signature Curved Top Wave Transition from Dark Hero to Crisp White */}
      <div className="absolute top-0 inset-x-0 -translate-y-[99%] overflow-hidden leading-none z-10 pointer-events-none">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full h-16 sm:h-24 md:h-28 text-[#FFFFFF] preserve-3d"
        >
          <path 
            d="M0,48 C280,120 720,0 1440,64 L1440,120 L0,120 Z" 
            fill="currentColor"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        
        {/* Section Header from Design */}
        <div className="text-left max-w-3xl mb-14">
          <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold mb-2">
            — WHO WE SERVE
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight mb-4">
            Solutions for Every Vision
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl font-normal">
            From students to startups, we turn your ideas into powerful digital products — fast, affordable and built for the future.
          </p>
        </div>

        {/* 3 Large Audience Cards from Design with Ghost Numbers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {whoWeServeData.map((item) => {
            const Icon = iconMap[item.icon] || Rocket;
            return (
              <div
                key={item.number}
                onClick={() => {
                  soundEffects.playClick();
                  onSelectAudience(item);
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className="group relative bg-[#F8FAFC] hover:bg-white rounded-3xl p-8 border border-slate-200/80 hover:border-slate-300 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer overflow-hidden"
              >
                {/* Large Ghost Number (01, 02, 03) from Design */}
                <span className="absolute top-4 right-6 font-display font-black text-6xl text-slate-200/60 group-hover:text-slate-300/80 select-none transition-colors pointer-events-none">
                  {item.number}
                </span>

                <div>
                  {/* Icon Box */}
                  <div className="w-14 h-14 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center justify-center text-slate-900 group-hover:text-[rgb(var(--color-primary))] group-hover:scale-110 transition-all mb-6">
                    <Icon className="w-7 h-7" />
                  </div>

                  <h3 className="text-xl font-display font-bold text-slate-950 mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-8">
                    {item.description}
                  </p>
                </div>

                {/* Bottom Link from Design */}
                <div className="flex items-center gap-2 text-xs font-display font-bold text-slate-900 group-hover:text-cyan-600 transition-colors pt-4 border-t border-slate-200/60">
                  <span>{item.linkText}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
