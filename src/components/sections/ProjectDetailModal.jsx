import React, { useState } from 'react';
import { 
  X, 
  ExternalLink, 
  CheckCircle2, 
  ChevronLeft, 
  ChevronRight, 
  Sparkles, 
  Layers, 
  Check, 
  ArrowLeft, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Star
} from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';
import { soundEffects } from '../../utils/soundFx';

export default function ProjectDetailModal({ project, isOpen, onClose, onOpenIntake, onSelectProject }) {
  if (!isOpen || !project) return null;

  const currentIndex = portfolioData.findIndex((p) => p.id === project.id);
  
  const handlePrev = () => {
    soundEffects.playClick();
    const prevIndex = (currentIndex - 1 + portfolioData.length) % portfolioData.length;
    if (onSelectProject) onSelectProject(portfolioData[prevIndex]);
  };

  const handleNext = () => {
    soundEffects.playClick();
    const nextIndex = (currentIndex + 1) % portfolioData.length;
    if (onSelectProject) onSelectProject(portfolioData[nextIndex]);
  };

  const displayImage = project.multiDeviceImage || project.image;
  const techList = project.technologies || project.tagBadges || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative bg-[#070A11] border border-white/20 max-w-5xl w-full rounded-3xl p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto text-left text-slate-100">
        
        {/* Top Header Bar: Back Button, Breadcrumb, and Close */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </button>

          <div className="flex items-center gap-2">
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-[rgb(var(--color-primary))]/15 text-[rgb(var(--color-primary))] border border-[rgb(var(--color-primary))]/30 font-semibold">
              {project.duration}
            </span>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project Header Info */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 font-bold mb-1">
              {project.client}
            </div>
            <h2 className="text-2xl sm:text-4xl font-display font-extrabold text-white">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl">
              {project.description}
            </p>
          </div>

          {/* Quick Prev / Next Arrows */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handlePrev}
              title="Previous Project"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              title="Next Project"
              className="p-2.5 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Multi-Device Showcase Mockup matching Panel 04 */}
        <div className="relative mb-8 rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-gradient-to-b from-slate-900 via-slate-950 to-black group">
          <div className="px-4 py-2.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between text-[10px] font-mono text-slate-400">
            <div 
              onClick={() => {
                soundEffects.playClick();
                if (project.liveUrl) window.open(project.liveUrl, '_blank');
              }}
              className="flex items-center gap-2 cursor-pointer hover:text-white transition-colors"
              title="Click to visit live demo"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 text-slate-300 hover:text-cyan-300 font-semibold truncate flex items-center gap-1.5">
                <span>{project.liveUrl || `https://${project.id}.aetherstudios.dev`}</span>
                <ExternalLink className="w-3 h-3 text-cyan-400" />
              </span>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                if (project.liveUrl) window.open(project.liveUrl, '_blank');
              }}
              className="text-cyan-300 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 px-2.5 py-1 rounded-lg text-[10px] font-mono flex items-center gap-1.5 transition-colors"
            >
              <span>Launch Live Prototype</span>
              <ExternalLink className="w-3 h-3" />
            </button>
          </div>

          <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden">
            <img 
              src={displayImage} 
              alt={project.title} 
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
            
            {/* Live Metric Badge Overlaid */}
            <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2">
              <div className="px-3 py-1.5 rounded-xl bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold shadow-lg flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{project.metrics}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Project Detailed Sections Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8 text-xs">
          
          {/* Left: Overview & Key Features (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Overview */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Project Overview
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm">
                {project.overview || project.description}
              </p>
            </div>

            {/* Key Features */}
            {project.keyFeatures && (
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Key Features
                </h3>
                <ul className="space-y-2.5">
                  {project.keyFeatures.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-slate-300 text-xs sm:text-sm">
                      <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>

          {/* Right: Tech Stack, Stats & Deliverables (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Technologies */}
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
              <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                Technologies & Architecture
              </h3>
              <div className="flex flex-wrap gap-2">
                {techList.map((t, idx) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-1 rounded-lg bg-white/10 text-cyan-300 font-mono text-xs border border-white/10"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Performance & Execution Stats */}
            {project.stats && (
              <div className="p-5 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <h3 className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
                  Verified Performance
                </h3>
                <div className="grid grid-cols-3 gap-2">
                  {project.stats.map((st, idx) => (
                    <div key={idx} className="p-2.5 rounded-xl bg-black/40 border border-white/5 text-center">
                      <div className="text-base font-display font-extrabold text-white">
                        {st.value}
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate">
                        {st.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Testimonial Quote */}
            {project.testimonial && (
              <div className="p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-200">
                <p className="text-xs italic leading-relaxed mb-2">
                  "{project.testimonial}"
                </p>
                <div className="text-[11px] font-mono text-purple-300 font-bold">
                  — {project.client}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Thumbnail Strip of Other Projects */}
        <div className="mb-8 pt-4 border-t border-white/10">
          <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-bold mb-3">
            More Projects in Our Portfolio:
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {portfolioData.map((p) => {
              const isSelected = p.id === project.id;
              return (
                <button
                  key={p.id}
                  onClick={() => {
                    soundEffects.playClick();
                    if (onSelectProject) onSelectProject(p);
                  }}
                  className={`group rounded-xl overflow-hidden border transition-all text-left relative aspect-[16/10] ${
                    isSelected
                      ? 'border-cyan-400 ring-2 ring-cyan-400/50 scale-105 shadow-lg'
                      : 'border-white/10 opacity-60 hover:opacity-100 hover:scale-102'
                  }`}
                >
                  <img src={p.image} alt={p.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors p-1.5 flex items-end">
                    <span className="text-[9px] font-mono text-white truncate font-bold">
                      {p.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Modal Bottom Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrev}
              className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Previous Project</span>
            </button>
            <span className="text-slate-600">•</span>
            <button
              onClick={handleNext}
              className="flex items-center gap-1 text-xs font-mono text-slate-400 hover:text-white transition-colors"
            >
              <span>Next Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

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
