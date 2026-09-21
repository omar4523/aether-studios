import React, { useState } from 'react';
import { 
  GraduationCap, 
  Code, 
  FileText, 
  Presentation, 
  MessageSquareCheck, 
  Copy, 
  Check, 
  Sparkles, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';
import TiltCard from '../3d/TiltCard';
import { soundEffects } from '../../utils/soundFx';

export default function StudentLabSection({ onOpenIntake }) {
  const [copied, setCopied] = useState(false);

  const copyCoupon = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText('STUDENT40');
    setCopied(true);
    soundEffects.playSuccess();
    setTimeout(() => setCopied(false), 3000);
  };

  const studentPillars = [
    {
      icon: Code,
      title: "1. Production-Grade Source Code",
      description: "Clean, commented, and modular codebase (React, Python, AI/ML, ESP32/IoT, Flutter). Built following university grading criteria.",
      badge: "Tested & Bug-Free"
    },
    {
      icon: FileText,
      title: "2. 35+ Page Formatted Report",
      description: "Abstract, literature review, methodology, system architecture diagrams, test results, and IEEE citations in editable Word or LaTeX.",
      badge: "IEEE & University Rubrics"
    },
    {
      icon: Presentation,
      title: "3. Defense Ready Slide Deck",
      description: "Professionally designed 12-15 slide presentation deck (.pptx / PDF) highlighting system workflow, problem statement, and live demo steps.",
      badge: "Presentation Ready"
    },
    {
      icon: MessageSquareCheck,
      title: "4. Viva & Examiner Defense Prep",
      description: "A cheat sheet of the 15 most common questions university examiners ask during project defense, complete with recommended technical answers.",
      badge: "Pass with Honors"
    }
  ];

  return (
    <section id="student-lab" className="relative py-28 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Banner */}
        <div className="glass-card rounded-3xl p-8 sm:p-12 border border-emerald-500/30 relative overflow-hidden shadow-2xl">
          
          {/* Background Glow */}
          <div className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl" />

          {/* Section Header */}
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
              <GraduationCap className="w-4 h-4" />
              <span>THE ACADEMIC & STUDENT INNOVATION LAB</span>
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
              Ace Your Graduation Project <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Without the Stress & Sleepless Nights.
              </span>
            </h2>
            
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              We understand academic deadlines. Whether you are in Computer Science, Mechatronics, Data Science, or Business, our engineers build your prototype and assemble your documentation package in record time.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {studentPillars.map((p, i) => {
              const Icon = p.icon;
              return (
                <div 
                  key={i} 
                  className="p-5 rounded-2xl bg-black/40 border border-white/10 hover:border-emerald-500/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-emerald-300 border border-emerald-500/20">
                        {p.badge}
                      </span>
                    </div>
                    <h3 className="text-sm font-display font-bold text-white mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coupon Code Banner & CTA */}
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-[#071311] to-black border border-emerald-500/40 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
                  40% University Student Grant
                </span>
              </div>
              <h4 className="text-xl font-display font-bold text-white">
                Affordable pricing tailored to student budgets.
              </h4>
              <p className="text-xs text-slate-400">
                Use code at checkout or mention it in your project intake consultation.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
              {/* Coupon Box */}
              <button
                onClick={copyCoupon}
                onMouseEnter={() => soundEffects.playHover()}
                className="w-full sm:w-auto px-5 py-3 rounded-xl bg-black/60 border border-emerald-400/40 hover:border-emerald-400 text-emerald-300 font-mono text-sm font-bold flex items-center justify-center gap-3 transition-colors shadow-inner"
              >
                <span>CODE: STUDENT40</span>
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-emerald-400" />}
              </button>

              {/* Start Project CTA */}
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onOpenIntake({ category: 'student' });
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-display font-bold text-sm text-slate-950 bg-emerald-400 hover:bg-emerald-300 flex items-center justify-center gap-2 transition-all shadow-[0_0_25px_rgba(16,185,129,0.35)]"
              >
                <span>Submit Student Prompt</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
