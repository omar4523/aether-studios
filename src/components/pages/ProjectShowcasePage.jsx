import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  CheckCircle2, 
  Clock, 
  Layers, 
  FileText, 
  FolderKanban, 
  MessageSquare, 
  Activity, 
  Download,
  X,
  Sparkles
} from 'lucide-react';
import AetherLogo from '../ui/AetherLogo';
import { soundEffects } from '../../utils/soundFx';

export default function ProjectShowcasePage({ 
  onBackToDashboard, 
  currentUser 
}) {
  const [activeSubTab, setActiveSubTab] = useState('overview');
  const [isFilesModalOpen, setIsFilesModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, []);

  const handleLaunchLive = () => {
    soundEffects.playClick();
    window.open('https://travel-demo.aetherstudios.dev', '_blank');
  };

  const handleDownloadFiles = () => {
    soundEffects.playSuccess();
    const manifest = `AETHER STUDIOS - SOURCE PACKAGE MANIFEST
Project: Travel Platform (#A-TRAVEL-2025)
Stack: Next.js 15, TypeScript, Tailwind CSS, Supabase PostgreSQL
Client: ${currentUser?.name || 'Omar Mohamed'} (Verified)

DELIVERABLES:
1. /frontend - Responsive Web Application (App Router, Tailwind CSS)
2. /supabase - Database Migrations, RLS Security Policies & Edge Functions
3. /figma - Full Design System (Typography, Components, 3D Assets)
4. /docs - API Specification & Deployment Guide (Vercel Ready)

Signed: Aether Studios Core Engineering Team`;

    const blob = new Blob([manifest], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aether-Travel-Platform-Files.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen w-full bg-[#040814] text-slate-100 flex flex-col lg:flex-row overflow-hidden font-sans select-none">
      
      {/* ================= LEFT INNER SIDEBAR matching Mockup ================= */}
      <aside className="w-full lg:w-60 bg-[#060D1E] border-b lg:border-b-0 lg:border-r border-white/10 p-5 flex flex-col justify-between shrink-0 h-auto lg:h-screen sticky top-0 z-30">
        <div>
          {/* Top Brand Logo */}
          <div 
            onClick={() => {
              soundEffects.playClick();
              onBackToDashboard();
            }}
            className="flex items-center justify-between mb-8 cursor-pointer"
            title="Return to Dashboard"
          >
            <AetherLogo showText={true} />
          </div>

          {/* Inner Nav Links matching Mockup */}
          <nav className="space-y-1.5 text-xs font-medium">
            {[
              { id: 'overview', label: 'Overview', icon: FolderKanban, active: true },
              { id: 'designs', label: 'Designs', icon: Layers },
              { id: 'development', label: 'Development', icon: Activity },
              { id: 'timeline', label: 'Timeline', icon: Clock },
              { id: 'files', label: 'Files', icon: FileText, action: () => setIsFilesModalOpen(true) },
              { id: 'messages', label: 'Messages', icon: MessageSquare },
            ].map((item) => {
              const Icon = item.icon;
              const isActive = activeSubTab === item.id || item.active;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    soundEffects.playClick();
                    if (item.action) {
                      item.action();
                    } else {
                      setActiveSubTab(item.id);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-600/25 to-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-semibold shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                      : 'text-slate-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Return to Dashboard */}
        <div className="pt-4 border-t border-white/10 text-left">
          <button
            onClick={() => {
              soundEffects.playClick();
              onBackToDashboard();
            }}
            className="flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Dashboard</span>
          </button>
        </div>
      </aside>

      {/* ================= MAIN CONTENT PANE ================= */}
      <main className="flex-1 flex flex-col min-h-screen overflow-y-auto bg-[#040814] relative z-10">
        
        {/* TOP BAR matching Mockup */}
        <header className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#050B1B]/90 backdrop-blur-md sticky top-0 z-20">
          {/* Back to Projects */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onBackToDashboard();
            }}
            className="flex items-center gap-2 text-xs font-mono text-slate-300 hover:text-white transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>← Back to Projects</span>
          </button>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5">
              <img 
                src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                alt="Avatar" 
                className="w-8 h-8 rounded-full object-cover border border-cyan-400/40 shadow-sm"
              />
              <div className="hidden sm:flex flex-col text-left leading-tight">
                <span className="text-xs font-bold text-white">
                  {currentUser?.name || 'Omar Mohamed'}
                </span>
                <span className="text-[10px] font-mono text-slate-400">
                  {currentUser?.role || 'Client'}
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* HERO BANNER with 3D AIRPLANE ARTWORK matching Mockup */}
        <section className="relative p-6 sm:p-8 overflow-hidden min-h-[170px] flex flex-col justify-end text-left">
          {/* Background 3D Airplane Flying Over Coastal Mountains */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
            <img 
              src="/aether_travel_airplane.jpg" 
              alt="3D Travel Airplane Flight" 
              className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
            />
            {/* Cinematic Vignette */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#040814]/95 via-[#040814]/70 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#040814] via-transparent to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-2xl sm:text-4xl font-display font-extrabold text-white tracking-tight drop-shadow-md">
                  Travel Platform
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>In Progress</span>
                </span>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-xl font-normal drop-shadow-sm">
                A modern travel booking platform with hotels, flights, and attractions.
              </p>
            </div>

            {/* Action Button: Preview Live Version ↗ */}
            <button
              onClick={handleLaunchLive}
              className="px-5 py-2.5 rounded-xl font-display font-bold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-[0_0_20px_rgba(147,51,234,0.4)] flex items-center gap-2 transition-all active:scale-[0.98] shrink-0"
            >
              <span>Preview Live Version</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </section>

        {/* MAIN TWO-COLUMN CONTAINER matching Mockup */}
        <section className="p-6 sm:p-8 pt-2 grid grid-cols-1 xl:grid-cols-12 gap-6 text-left flex-grow">
          
          {/* LEFT CONTAINER: Clean White Showcase Card with Device Mockup (8 Cols) */}
          <div className="xl:col-span-8 bg-white text-slate-900 rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col justify-between">
            
            <div>
              {/* Multi-Device Travel Mockup matching Mockup */}
              <div className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-950 shadow-md mb-6 relative group">
                <img 
                  src="/ui_travel_multi_device.jpg" 
                  alt="Travel Platform Multi-Device Experience" 
                  className="w-full h-auto object-cover group-hover:scale-[1.01] transition-transform duration-500" 
                />
                
                {/* Interactive Hover Overlay */}
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <button
                    onClick={handleLaunchLive}
                    className="px-4 py-2 rounded-full bg-slate-950/90 text-white text-xs font-mono font-bold flex items-center gap-2 shadow-2xl hover:bg-cyan-500 hover:text-slate-950 transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5" />
                    <span>Launch Live Prototype</span>
                  </button>
                </div>
              </div>

              {/* About This Project matching Mockup */}
              <div className="mb-6">
                <h3 className="text-base font-display font-extrabold text-slate-950 mb-2">
                  About This Project
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  This project is a complete travel platform that allows users to search for hotels, flights, restaurants, and attractions. The platform includes a modern, responsive design, user accounts, and an easy booking process.
                </p>
              </div>

              {/* Technologies Used matching Mockup */}
              <div>
                <h4 className="text-xs font-mono font-bold text-slate-500 uppercase tracking-wider mb-2.5">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { name: 'Next.js', color: 'bg-slate-900 text-white' },
                    { name: 'TypeScript', color: 'bg-blue-600 text-white' },
                    { name: 'Tailwind CSS', color: 'bg-cyan-600 text-white' },
                    { name: 'Supabase', color: 'bg-emerald-600 text-white' }
                  ].map((tech) => (
                    <span
                      key={tech.name}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-bold flex items-center gap-1.5 shadow-sm ${tech.color}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white/80" />
                      <span>{tech.name}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT COLUMN: Project Progress Donut & Quick Info (4 Cols) */}
          <div className="xl:col-span-4 space-y-6">
            
            {/* CARD 1: Project Progress with Circular Donut Chart 45% matching Mockup */}
            <div className="p-6 rounded-3xl bg-[#090F20]/90 border border-white/10 shadow-lg">
              <h3 className="text-base font-display font-bold text-white mb-4">
                Project Progress
              </h3>

              {/* Circular Donut Ring 45% */}
              <div className="flex items-center gap-4 mb-5 pb-5 border-b border-white/10">
                <div className="relative w-16 h-16 shrink-0 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    {/* Track */}
                    <path
                      className="text-slate-800"
                      strokeWidth="3.5"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                    {/* 45% Fill */}
                    <path
                      className="text-[#6366F1]"
                      strokeDasharray="45, 100"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                      stroke="currentColor"
                      fill="none"
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    />
                  </svg>
                  <span className="absolute font-display font-extrabold text-sm text-white">
                    45%
                  </span>
                </div>

                <div className="text-xs">
                  <div className="text-white font-bold">Stage 3: Frontend</div>
                  <div className="text-slate-400 text-[11px]">Sprint progressing on schedule</div>
                </div>
              </div>

              {/* Checklist matching Mockup */}
              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">Project Setup</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Completed</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span className="text-slate-200">UI/UX Design</span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400">Completed</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-[#6366F1] shrink-0 animate-spin" />
                    <span className="text-white font-bold">Frontend Development</span>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-300 font-bold">In Progress</span>
                </div>

                <div className="flex items-center justify-between text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                    <span>Backend Development</span>
                  </div>
                  <span className="text-[10px] font-mono">Pending</span>
                </div>

                <div className="flex items-center justify-between text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                    <span>Testing & Bug Fixes</span>
                  </div>
                  <span className="text-[10px] font-mono">Pending</span>
                </div>

                <div className="flex items-center justify-between text-slate-500">
                  <div className="flex items-center gap-2">
                    <div className="w-3.5 h-3.5 rounded-full border border-slate-700 shrink-0" />
                    <span>Final Delivery</span>
                  </div>
                  <span className="text-[10px] font-mono">Pending</span>
                </div>
              </div>

            </div>

            {/* CARD 2: Quick Info & View All Files Button matching Mockup */}
            <div className="p-6 rounded-3xl bg-[#090F20]/90 border border-white/10 shadow-lg space-y-4">
              <h3 className="text-base font-display font-bold text-white">
                Quick Info
              </h3>

              <div className="space-y-3 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">Type</span>
                  <span className="text-white font-medium">Web Application</span>
                </div>

                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <span className="text-slate-400">Estimated Delivery</span>
                  <span className="font-mono text-slate-300">Oct 15, 2025</span>
                </div>

                <div className="flex items-center justify-between pb-1">
                  <span className="text-slate-400">Budget</span>
                  <span className="font-mono text-emerald-400 font-bold text-sm">$599</span>
                </div>
              </div>

              {/* Primary Pill Button: View All Files → matching Mockup */}
              <button
                onClick={handleDownloadFiles}
                className="w-full mt-2 py-3 rounded-xl font-display font-bold text-xs text-white bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#A855F7] hover:opacity-95 shadow-[0_0_20px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
              >
                <span>View All Files</span>
                <span>→</span>
              </button>
            </div>

          </div>

        </section>

      </main>

      {/* Files Manifest Overlay */}
      {isFilesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-[#090E1E] border border-cyan-400/30 max-w-lg w-full rounded-2xl p-6 shadow-2xl text-left text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h4 className="text-base font-bold text-white">Project Deliverables & Repository</h4>
              <button onClick={() => setIsFilesModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2.5 text-xs mb-5">
              {[
                { name: 'frontend-source-v1.4.zip', size: '14.2 MB', tag: 'Next.js App' },
                { name: 'database-supabase-schema.sql', size: '240 KB', tag: 'PostgreSQL' },
                { name: 'figma-design-tokens-v2.fig', size: '48.6 MB', tag: 'UI Kit' },
                { name: 'commercial-license-handover.pdf', size: '1.1 MB', tag: 'IP Deed' }
              ].map((f) => (
                <div key={f.name} className="flex items-center justify-between p-2.5 rounded-xl bg-white/5 border border-white/10">
                  <div className="flex items-center gap-2 truncate">
                    <FileText className="w-4 h-4 text-cyan-400 shrink-0" />
                    <span className="truncate text-slate-200">{f.name}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 shrink-0">{f.size}</span>
                </div>
              ))}
            </div>

            <div className="flex items-center justify-end gap-3">
              <button onClick={() => setIsFilesModalOpen(false)} className="px-4 py-2 text-xs font-mono text-slate-400 hover:text-white">
                Close
              </button>
              <button onClick={handleDownloadFiles} className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-300 flex items-center gap-1.5">
                <Download className="w-3.5 h-3.5" />
                <span>Download All Files (.zip)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
