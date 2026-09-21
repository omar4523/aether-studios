import React, { useState } from 'react';
import { 
  Terminal, 
  Sparkles, 
  ArrowRight, 
  Globe, 
  MessageSquare, 
  Send, 
  Mail, 
  ShieldCheck, 
  Heart,
  Check
} from 'lucide-react';
import { soundEffects } from '../../utils/soundFx';

export default function Footer({ onOpenIntake }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    soundEffects.playSuccess();
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="relative border-t border-white/10 bg-[#040508] pt-20 pb-12 overflow-hidden">
      
      {/* Background radial glow */}
      <div 
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full blur-[140px] opacity-10"
        style={{ background: 'rgb(var(--color-primary))' }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top Call to Action Box */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-white/15 mb-16 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-mono uppercase tracking-wider text-[rgb(var(--color-primary))] font-semibold flex items-center justify-center md:justify-start gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready to Bring Your Vision to Life?</span>
            </span>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              Let's Build Something Legendary Together.
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Whether you need an online store launched this week, a custom SaaS, or your final university graduation capstone, our team is ready.
            </p>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenIntake();
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className="w-full md:w-auto px-8 py-4 rounded-xl font-display font-bold text-sm text-slate-950 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] hover:opacity-95 shadow-[0_0_30px_rgba(var(--color-primary),0.35)] flex items-center justify-center gap-2.5 shrink-0 transition-transform active:scale-95"
          >
            <span>Start Your Project Brief</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* 4 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-16">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] p-[1px]">
                <div className="w-full h-full bg-[#07090E] rounded-[11px] flex items-center justify-center">
                  <Terminal className="w-4 h-4 text-[rgb(var(--color-primary))]" />
                </div>
              </div>
              <span className="font-display font-bold text-lg tracking-wider text-white">
                AETHER <span className="font-mono text-xs text-[rgb(var(--color-primary))]">STUDIOS</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              The next-generation digital studio and project-as-a-service lab. Engineering websites, online stores, web apps, and academic capstones with precision.
            </p>

            {/* Live Operational Status */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400 pt-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational • Global Engineering Hub</span>
            </div>
          </div>

          {/* Col 2: Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#services" className="hover:text-white transition-colors">E-Commerce Stores</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">SaaS & Web Applications</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Mobile iOS & Android</a></li>
              <li><a href="#student-lab" className="hover:text-white transition-colors">Student Capstone Lab</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Three.js 3D & AI Pipelines</a></li>
            </ul>
          </div>

          {/* Col 3: Resources */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Resources
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><a href="#estimator" className="hover:text-white transition-colors">Cost & Timeline Estimator</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Case Studies & Showcase</a></li>
              <li><a href="#portal-preview" className="hover:text-white transition-colors">Client Portal Tracker</a></li>
              <li><a href="#student-lab" className="hover:text-white transition-colors">Student Grant (STUDENT40)</a></li>
              <li><a href="#portfolio" className="hover:text-white transition-colors">Code Ownership Guarantee</a></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white font-bold">
              Tech Dispatch
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Subscribe for weekly case studies, open-source templates, and student project blueprints.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[rgb(var(--color-primary))]"
              />
              <button
                type="submit"
                className="w-full py-2 bg-white/10 hover:bg-white/15 text-white rounded-xl text-xs font-mono font-semibold transition-colors flex items-center justify-center gap-1.5"
              >
                {subscribed ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <span>Subscribe to Dispatch</span>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-500">
          <p>© 2026 AETHER STUDIOS. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Security Warranty</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
