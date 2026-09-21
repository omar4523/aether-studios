import React, { useState } from 'react';
import { Mail, MessageCircle, MapPin, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import AetherLogo from '../ui/AetherLogo';
import { soundEffects } from '../../utils/soundFx';

export default function ContactSection({ onNavigate }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEffects.playSuccess();
    setSubmitted(true);
    try {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    } catch {}
  };

  return (
    <section id="contact" className="relative pt-24 pb-12 bg-[#FFFFFF] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Headphones from Design */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl text-left">
            <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold mb-2">
              — GET IN TOUCH
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight mb-4">
              Let's Build Something <br />
              <span className="text-slate-900">Great Together</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              Have a project in mind? Questions about our services? We'd love to hear from you.
            </p>
          </div>

          {/* 3D Chrome Headphones Graphic from Design */}
          <div className="hidden lg:flex items-center justify-center pr-8 pointer-events-none">
            <div className="relative w-36 h-36 flex items-center justify-center drop-shadow-2xl">
              <img 
                src="/aether_headphones.jpg" 
                alt="3D Studio Headphones" 
                className="w-full h-full object-cover rounded-3xl animate-float-slow shadow-[0_0_35px_rgba(0,242,254,0.35)] border border-white/40" 
              />
            </div>
          </div>
        </div>

        {/* Two-Column Contact Layout from Design */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start mb-24 text-left">
          
          {/* Left Column: Direct Info Cards (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* 1. Email Card */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  Email
                </span>
                <a href="mailto:hello@aetherstudios.dev" className="text-base font-display font-bold text-slate-950 hover:text-blue-600 transition-colors">
                  hello@aetherstudios.dev
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  We usually reply within 24 hours.
                </p>
              </div>
            </div>

            {/* 2. Phone Card from Design */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <MessageCircle className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                  Phone / WhatsApp
                </span>
                <a href="tel:+20123456789" className="text-base font-display font-bold text-slate-950 hover:text-indigo-600 transition-colors">
                  +20 123 456 789
                </a>
                <p className="text-xs text-slate-500 mt-1">
                  Mon - Fri, 9AM - 6PM EET (Cairo Time)
                </p>
              </div>
            </div>

            {/* 3. Location & Cairo Map Card from Design */}
            <div className="p-6 rounded-3xl bg-[#F8FAFC] border border-slate-200/90 shadow-sm space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider block font-bold">
                    Location
                  </span>
                  <h4 className="text-base font-display font-bold text-slate-950">
                    Cairo, Egypt
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Remote & global clients welcome worldwide.
                  </p>
                </div>
              </div>

              {/* Stylized Modern Cairo Map Visual */}
              <div className="relative rounded-2xl overflow-hidden bg-slate-950 p-4 border border-slate-800 text-slate-300">
                <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300 mb-2">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                    <span>CAIRO HQ • ACTIVE HUB</span>
                  </span>
                  <span className="text-slate-400">30.0444° N, 31.2357° E</span>
                </div>
                <div className="text-[11px] text-slate-400 leading-relaxed font-sans">
                  Operating from Egypt's vibrant technology corridor, serving students and global companies across North America, Europe, and the Middle East.
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Contact Form (7 Cols) */}
          <div className="lg:col-span-7 bg-[#F8FAFC] p-8 sm:p-10 rounded-3xl border border-slate-200/90 shadow-sm">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Project Type
                  </label>
                  <select
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 focus:outline-none focus:border-blue-600"
                  >
                    <option value="">Select a service</option>
                    <option value="ecommerce">E-Commerce & Digital Store</option>
                    <option value="webapp">Full-Stack SaaS / Web App</option>
                    <option value="student">Student Capstone & Final-Year Lab</option>
                    <option value="mobile">Mobile iOS & Android App</option>
                    <option value="ai-3d">AI Tools & 3D Interactive Web</option>
                    <option value="custom">Custom Solution</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    onMouseEnter={() => soundEffects.playHover()}
                    className="w-full py-3.5 rounded-full font-display font-bold text-xs text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-95 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
                  >
                    <span>Send Message</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-display font-extrabold text-slate-950">
                  Message Sent Successfully!
                </h4>
                <p className="text-xs text-slate-600 max-w-sm mx-auto">
                  Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our team in Cairo has received your inquiry and will reply to <strong className="text-blue-600">{formData.email}</strong> within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-semibold"
                >
                  Send Another Message
                </button>
              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
