import React from 'react';
import { 
  ShoppingBag, 
  Layers, 
  GraduationCap, 
  Smartphone, 
  Cpu, 
  Infinity as InfinityIcon, 
  Check, 
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { servicesData } from '../../data/servicesData';
import { soundEffects } from '../../utils/soundFx';

const iconMap = {
  ShoppingBag,
  Layers,
  GraduationCap,
  Smartphone,
  Cpu,
  InfinityIcon,
};

export default function ServicesSection({ onSelectService }) {
  return (
    <section id="services" className="relative py-24 bg-[#F8FAFC] text-slate-900 overflow-hidden border-t border-slate-200">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Crystal Accent from Design */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left">
            <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold mb-2">
              — SERVICES
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight mb-4">
              Turn Your Ideas Into <br />
              <span className="text-slate-900">
                Real Products
              </span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              We specialize in turning complex ideas into functional, beautifully designed digital products. Whether you're an ambitious student, a thriving business, or an early-stage startup, we're here to build.
            </p>
          </div>

          {/* 3D Crystalline Isometric Cube Art from Design */}
          <div className="hidden lg:flex items-center justify-center pr-8 pointer-events-none">
            <div className="relative w-36 h-36 flex items-center justify-center drop-shadow-2xl">
              <img 
                src="/aether_crystal_blue.jpg" 
                alt="Aether 3D Crystal" 
                className="w-full h-full object-cover rounded-3xl animate-float-slow shadow-[0_0_35px_rgba(0,242,254,0.35)] border border-white/40" 
              />
            </div>
          </div>
        </div>

        {/* 6 Services Grid from Design (3x2 on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {servicesData.map((svc) => {
            const Icon = iconMap[svc.icon] || Layers;
            return (
              <div 
                key={svc.id}
                className="bg-white rounded-3xl p-7 border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group text-left"
              >
                <div>
                  {/* Icon & Heading */}
                  <div className="flex items-center gap-3.5 mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform shrink-0">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-lg font-display font-bold text-slate-950 leading-tight">
                        {svc.title}
                      </h3>
                      <div className="text-[11px] font-mono text-slate-500 font-semibold mt-0.5">
                        Starting {svc.startingPrice} • {svc.turnaround}
                      </div>
                    </div>
                  </div>

                  {/* Checklist from Design */}
                  <ul className="space-y-2.5 my-5">
                    {svc.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs text-slate-600">
                        <div className="rounded-full p-0.5 text-blue-600 shrink-0">
                          <Check className="w-3.5 h-3.5 stroke-[2.5]" />
                        </div>
                        <span className="line-clamp-1">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Link from Design (Learn More →) */}
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onSelectService(svc);
                  }}
                  onMouseEnter={() => soundEffects.playHover()}
                  className="flex items-center gap-2 text-xs font-display font-bold text-slate-900 group-hover:text-blue-600 transition-colors pt-4 border-t border-slate-100 w-fit"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
