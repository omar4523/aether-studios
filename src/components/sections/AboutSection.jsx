import React from 'react';
import { ShieldCheck, Zap, Lightbulb, Heart, ArrowRight } from 'lucide-react';
import { soundEffects } from '../../utils/soundFx';

export default function AboutSection({ onOpenIntake }) {
  const values = [
    {
      icon: ShieldCheck,
      title: "Quality",
      description: "We deliver excellence in everything we build.",
    },
    {
      icon: Zap,
      title: "Speed",
      description: "We move fast without compromising quality.",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description: "We use the latest tech to solve real problems.",
    },
    {
      icon: Heart,
      title: "Client First",
      description: "Your success is our success.",
    },
  ];

  return (
    <section id="about" className="relative py-24 bg-[#F8FAFC] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header from Design */}
        <div className="text-left max-w-3xl mb-16">
          <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold mb-2">
            — ABOUT AETHER STUDIOS
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight mb-4">
            More Than Just Code. <br />
            <span className="text-slate-900">We Build Futures.</span>
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-2xl">
            We're a modern digital studio focused on turning ideas into impactful products. With a passion for technology, design and problem solving, we help students, businesses and startups take their next step — faster.
          </p>

          {/* Inline Stats Row from Design */}
          <div className="grid grid-cols-3 gap-6 pt-8 mt-8 border-t border-slate-200 max-w-lg">
            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950">
                140+
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                Projects Delivered
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950">
                48h
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                Avg. Turnaround
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-display font-extrabold text-slate-950">
                99.6%
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                Client Satisfaction
              </div>
            </div>
          </div>
        </div>

        {/* Our Story Grid from Design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-sm mb-16 text-left">
          
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-2xl font-display font-extrabold text-slate-950">
              Our Story
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              Aether Studios started with a simple idea: make high-quality digital solutions accessible to everyone. What began as a small team of passionate developers and designers has grown into a full-service studio, helping clients turn their ideas into real, working products.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenIntake();
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className="inline-flex items-center gap-2 text-xs font-display font-bold text-slate-900 hover:text-blue-600 transition-colors"
              >
                <span>Our Mission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 rounded-2xl overflow-hidden shadow-md max-h-64">
            <img 
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
              alt="Aether Studios Team Workspace" 
              className="w-full h-full object-cover" 
            />
          </div>

        </div>

        {/* Our Values Row from Design */}
        <div className="text-left">
          <h3 className="text-xl font-display font-extrabold text-slate-950 mb-8">
            Our Values
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div 
                  key={i} 
                  className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-sm hover:shadow-md transition-shadow text-left"
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h4 className="text-base font-display font-bold text-slate-950 mb-1.5">
                    {v.title}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {v.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
