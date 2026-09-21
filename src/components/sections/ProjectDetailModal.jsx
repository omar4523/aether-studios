import React, { useState } from 'react';
import { X, ExternalLink, CheckCircle2, Laptop, Tablet, Smartphone, Sparkles, Layers } from 'lucide-react';
import { soundEffects } from '../../utils/soundFx';

export default function ProjectDetailModal({ project, isOpen, onClose, onOpenIntake }) {
  const [deviceView, setDeviceView] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'

  if (!isOpen || !project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#070A11] border border-white/20 max-w-4xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto text-left text-slate-100">
        
        {/* Top Bar with Brand Logo and Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[rgb(var(--color-primary))]/15 text-[rgb(var(--color-primary))] border border-[rgb(var(--color-primary))]/30 font-semibold">
              CASE STUDY EXAMPLE
            </span>
            <span className="text-xs font-mono text-slate-400">{project.duration}</span>
          </div>

          <div className="flex items-center gap-2">
            {/* Device Frame View Switcher */}
            <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 text-xs text-slate-400">
              <button
                onClick={() => setDeviceView('desktop')}
                className={`p-1.5 rounded-lg ${deviceView === 'desktop' ? 'bg-white/20 text-white' : 'hover:text-white'}`}
                title="Desktop View"
              >
                <Laptop className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('tablet')}
                className={`p-1.5 rounded-lg ${deviceView === 'tablet' ? 'bg-white/20 text-white' : 'hover:text-white'}`}
                title="Tablet View"
              >
                <Tablet className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeviceView('mobile')}
                className={`p-1.5 rounded-lg ${deviceView === 'mobile' ? 'bg-white/20 text-white' : 'hover:text-white'}`}
                title="Mobile View"
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white mb-2">
            {project.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 font-mono">
            Client: <span className="text-white font-semibold">{project.client}</span> • Delivered in {project.duration}
          </p>
        </div>

        {/* Device Frame Mockup from Design */}
        <div className="relative mb-8 flex justify-center bg-gradient-to-b from-slate-900 to-black p-4 sm:p-8 rounded-2xl border border-white/10 overflow-hidden">
          <div 
            className={`transition-all duration-300 rounded-xl overflow-hidden shadow-2xl border border-white/20 ${
              deviceView === 'desktop' ? 'w-full max-w-2xl aspect-[16/10]' :
              deviceView === 'tablet' ? 'w-full max-w-md aspect-[4/3]' :
              'w-full max-w-xs aspect-[9/16]'
            }`}
          >
            {/* Simulated Browser Chrome */}
            <div className="px-3 py-2 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="bg-black/50 px-4 py-0.5 rounded text-cyan-300">
                https://{project.id}.aetherstudios.dev
              </div>
              <ExternalLink className="w-3 h-3" />
            </div>

            <img 
              src={project.image} 
              alt={project.title} 
              className="w-full h-full object-cover" 
            />
          </div>
        </div>

        {/* 3-Column Info Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 text-xs leading-relaxed">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-1.5">
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
              Project Overview
            </span>
            <p className="text-slate-300">
              {project.description}
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
            <span className="text-[10px] font-mono uppercase text-slate-400 block font-bold">
              Technologies Used
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((t, idx) => (
                <span key={idx} className="px-2 py-0.5 rounded bg-white/10 text-cyan-300 font-mono text-[10px]">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 space-y-1">
            <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">
              Key Business Impact
            </span>
            <div className="text-xl font-display font-black text-white">
              {project.metrics}
            </div>
            <p className="text-[11px] text-emerald-300/80">
              Verified metric post-launch.
            </p>
          </div>
        </div>

        {/* Deliverables List & Testimonial */}
        <div className="space-y-4 mb-8">
          <h4 className="text-xs font-mono uppercase text-slate-400 font-bold">
            Delivered Modules:
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {project.deliverables.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 p-3 rounded-xl bg-white/5 border border-white/5 text-xs text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>

          {project.testimonial && (
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mt-4">
              <p className="text-xs italic text-slate-300 mb-1">
                "{project.testimonial}"
              </p>
              <span className="text-[10px] font-mono text-cyan-400 font-semibold block">
                — {project.client}
              </span>
            </div>
          )}
        </div>

        {/* Modal Action CTA */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-400">
            Want a project engineered with this level of quality?
          </p>
          <button
            onClick={() => {
              onClose();
              onOpenIntake({ category: project.category, description: `Inspired by ${project.title}` });
            }}
            className="w-full sm:w-auto px-6 py-2.5 rounded-full font-display font-bold text-xs text-slate-950 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] hover:opacity-95 shadow-md flex items-center justify-center gap-2"
          >
            <span>Request Similar Project</span>
            <Sparkles className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
}
