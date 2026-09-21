import React, { useState } from 'react';
import { 
  ArrowRight, 
  ExternalLink, 
  Sparkles, 
  CheckCircle2, 
  Layers, 
  Eye, 
  Laptop, 
  ShieldCheck, 
  Flame 
} from 'lucide-react';
import { portfolioData, portfolioCategories } from '../../data/portfolioData';
import ProjectDetailModal from './ProjectDetailModal';
import { soundEffects } from '../../utils/soundFx';

export default function PortfolioSection({ onOpenIntake }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeTab === 'all'
    ? portfolioData
    : portfolioData.filter((p) => p.category === activeTab);

  const handleOpenDetail = (proj) => {
    soundEffects.playClick();
    setSelectedProject(proj);
  };

  const handleCloseDetail = () => {
    soundEffects.playClick();
    setSelectedProject(null);
  };

  return (
    <section id="portfolio" className="relative py-28 bg-[#FFFFFF] text-slate-900 border-t border-slate-200 overflow-hidden">
      
      {/* Background Decorative Soft Gradients */}
      <div className="pointer-events-none absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full bg-blue-100/40 blur-3xl" />
      <div className="pointer-events-none absolute bottom-1/4 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-100/30 blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Holographic Torus */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-8 mb-14">
          <div className="max-w-2xl text-left">
            <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold mb-2">
              — OUR WORK
            </div>
            
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight mb-4">
              Featured Projects
            </h2>
            
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal max-w-xl">
              Real solutions. Real results. Explore a selection of our recent work across different industries.
            </p>
          </div>

          {/* 3D Holographic Mesh Torus from Design */}
          <div className="hidden lg:flex items-center justify-center pr-4 pointer-events-none">
            <div className="relative w-36 h-36 flex items-center justify-center drop-shadow-2xl">
              <img 
                src="/aether_mesh_torus.jpg" 
                alt="3D Holographic Torus" 
                className="w-full h-full object-cover rounded-full shadow-[0_0_40px_rgba(0,242,254,0.4)] animate-spin-slow border border-white/40" 
              />
            </div>
          </div>
        </div>

        {/* Filter Pills with Counts */}
        <div className="flex flex-wrap items-center gap-2.5 mb-12">
          {portfolioCategories.map((cat) => {
            const count = cat.id === 'all' 
              ? portfolioData.length 
              : portfolioData.filter((p) => p.category === cat.id).length;
            const isActive = activeTab === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab(cat.id);
                }}
                onMouseEnter={() => soundEffects.playHover()}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all flex items-center gap-2 ${
                  isActive
                    ? 'bg-slate-950 text-white shadow-lg scale-105'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-950'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-500'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Studio-Grade Showcase Grid (3 Columns on Large Screens) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-20">
          {filteredProjects.map((proj) => {
            const displayTags = proj.tagBadges || proj.technologies || proj.tags || [];
            return (
              <div
                key={proj.id}
                onClick={() => handleOpenDetail(proj)}
                onMouseEnter={() => soundEffects.playHover()}
                className="group bg-[#F8FAFC] hover:bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-2xl transition-all duration-300 overflow-hidden cursor-pointer flex flex-col justify-between text-left"
              >
                {/* Browser / Device Chrome Header */}
                <div className="px-4 py-3 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-[10px] font-mono text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    <span className="ml-2 text-slate-300 font-semibold truncate max-w-[150px]">
                      {proj.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-cyan-300 font-mono">
                      {proj.duration}
                    </span>
                  </div>
                </div>

                {/* Realistic Software Screenshot with Interactive Hover Reveal */}
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-950 group">
                  <img 
                    src={proj.image} 
                    alt={proj.title} 
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700" 
                  />

                  {/* Ambient Dark Gradient Sheen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-50 group-hover:opacity-30 transition-opacity" />

                  {/* Floating Outcome Metric Pill */}
                  <div className="absolute bottom-3 left-3 z-10">
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/90 backdrop-blur-md border border-emerald-500/40 text-emerald-400 text-[11px] font-mono font-bold shadow-lg">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      <span>{proj.metrics}</span>
                    </div>
                  </div>

                  {/* Quick View Button on Hover */}
                  <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="px-3 py-1 rounded-xl bg-blue-600 text-white text-[11px] font-display font-bold shadow-lg flex items-center gap-1.5">
                      <Eye className="w-3 h-3" />
                      <span>Explore</span>
                    </div>
                  </div>
                </div>

                {/* Card Details Body */}
                <div className="p-6 flex flex-col justify-between flex-1">
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-blue-600 font-bold truncate">
                        {proj.client}
                      </span>
                    </div>

                    <h3 className="text-xl font-display font-bold text-slate-950 group-hover:text-blue-600 transition-colors mb-2">
                      {proj.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed line-clamp-2 mb-4">
                      {proj.description}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack Badges */}
                    <div className="flex flex-wrap gap-1 mb-4 pt-3 border-t border-slate-100">
                      {displayTags.slice(0, 3).map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Interactive Action Link */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-1.5 text-xs font-display font-bold text-slate-950 group-hover:text-blue-600 transition-colors">
                        <span>Case Study Details</span>
                        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                      </div>

                      <div className="w-7 h-7 rounded-full bg-slate-100 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center text-slate-700 transition-colors">
                        <ExternalLink className="w-3 h-3" />
                      </div>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA Banner with 3D Chrome Orb from Design */}
        <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-r from-blue-50 via-indigo-50 to-purple-50 border border-blue-100 flex flex-col md:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="text-left space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/80 text-blue-800 text-[11px] font-mono font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Have a Project in Mind?</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-display font-extrabold text-slate-950">
              Let's Build Something Amazing Together.
            </h3>
            <p className="text-sm text-slate-600 leading-relaxed">
              We turn concepts into high-converting digital products. Fast delivery, transparent fixed rates, and 100% intellectual property handover.
            </p>
          </div>

          <div className="flex items-center gap-6 shrink-0">
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenIntake();
              }}
              onMouseEnter={() => soundEffects.playHover()}
              className="px-8 py-4 rounded-full font-display font-bold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-xl flex items-center gap-2 active:scale-95 transition-all"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* 3D Metallic Orb Graphic from Design */}
            <div className="hidden sm:block w-20 h-20 rounded-full overflow-hidden shadow-2xl border border-white/40 animate-float-slow shrink-0">
              <img src="/aether_metallic_orb.jpg" alt="3D Metallic Orb" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

      </div>

      {/* Case Study Example Modal */}
      <ProjectDetailModal
        project={selectedProject}
        isOpen={!!selectedProject}
        onClose={handleCloseDetail}
        onOpenIntake={onOpenIntake}
        onSelectProject={setSelectedProject}
      />

    </section>
  );
}
