import React, { useState } from 'react';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  Terminal, 
  GitBranch, 
  Download, 
  ExternalLink, 
  Layers, 
  ShieldCheck, 
  Play, 
  MessageSquare,
  Sparkles
} from 'lucide-react';
import TiltCard from '../3d/TiltCard';
import { soundEffects } from '../../utils/soundFx';

export default function ClientPortalPreview() {
  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban' | 'staging' | 'repo'

  const stages = [
    { name: "1. Scope & Architecture", status: "completed", date: "Sep 18", progress: 100 },
    { name: "2. UI/UX & 3D Assets", status: "completed", date: "Sep 20", progress: 100 },
    { name: "3. Full-Stack Development", status: "active", date: "In Progress", progress: 84 },
    { name: "4. Staging QA & Testing", status: "pending", date: "Sep 24", progress: 0 },
    { name: "5. Production Handover", status: "pending", date: "Sep 26", progress: 0 },
  ];

  const kanbanColumns = [
    {
      title: "Completed",
      count: 6,
      badge: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
      tasks: [
        { title: "System Architecture & ER Schema", tag: "Architecture", time: "Approved" },
        { title: "3D WebGL Canvas Engine", tag: "Frontend", time: "Merged" },
        { title: "Stripe Payment Gateway Integration", tag: "Backend", time: "Verified" }
      ]
    },
    {
      title: "In Active Sprint",
      count: 2,
      badge: "border-[rgb(var(--color-primary))]/30 text-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/10",
      tasks: [
        { title: "AI Assistant REST API Endpoints", tag: "Backend", time: "84% Done" },
        { title: "Mobile Touch Gestures & Haptics", tag: "UI/UX", time: "Reviewing" }
      ]
    },
    {
      title: "Ready for Launch",
      count: 3,
      badge: "border-white/10 text-slate-400 bg-white/5",
      tasks: [
        { title: "Automated Lighthouse 95+ Audit", tag: "QA", time: "Pending" },
        { title: "Client Staging Sandbox Walkthrough", tag: "Review", time: "Upcoming" }
      ]
    }
  ];

  return (
    <section id="portal-preview" className="relative py-28 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono text-[rgb(var(--color-primary))] mb-4">
            <Activity className="w-3.5 h-3.5" />
            <span>REAL-TIME TRANSPARENCY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            Your Dedicated <br />
            <span className="text-gradient-primary">Client Project Portal.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            No guessing games or endless emails. As soon as your project kicks off, you gain access to your private live dashboard to monitor every line of code, test staging builds, and download deliverables.
          </p>
        </div>

        {/* Portal Dashboard Window Mockup */}
        <div className="glass-card rounded-2xl border border-white/15 overflow-hidden shadow-2xl">
          
          {/* Top Window Bar */}
          <div className="px-6 py-4 bg-black/60 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Traffic Lights */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-red-500/80" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              
              {/* Project ID Tag */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                <Terminal className="w-3.5 h-3.5 text-[rgb(var(--color-primary))]" />
                <span>PROJECT #AE-8942</span>
                <span className="text-slate-600">/</span>
                <span className="text-white font-semibold">MediVision & Lumina Hybrid</span>
              </div>
            </div>

            {/* Tab Navigation */}
            <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('kanban');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'kanban' 
                    ? 'bg-white/15 text-white font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sprint Kanban
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('staging');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'staging' 
                    ? 'bg-white/15 text-white font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Staging Preview
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('repo');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'repo' 
                    ? 'bg-white/15 text-white font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Deliverables & Repo
              </button>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="px-6 py-5 bg-black/40 border-b border-white/5 overflow-x-auto">
            <div className="min-w-[650px] flex items-center justify-between gap-4">
              {stages.map((stage, i) => (
                <div key={i} className="flex-1 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between text-[11px] font-mono">
                    <span className={`font-semibold ${
                      stage.status === 'completed' ? 'text-emerald-400' :
                      stage.status === 'active' ? 'text-[rgb(var(--color-primary))]' : 'text-slate-500'
                    }`}>
                      {stage.name}
                    </span>
                    <span className="text-slate-400">{stage.progress}%</span>
                  </div>
                  {/* Progress Line */}
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        stage.status === 'completed' ? 'bg-emerald-400' :
                        stage.status === 'active' ? 'bg-[rgb(var(--color-primary))]' : 'bg-transparent'
                      }`}
                      style={{ width: `${stage.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tab Content Display */}
          <div className="p-6 sm:p-8">
            
            {/* 1. Kanban Tab */}
            {activeTab === 'kanban' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
                {kanbanColumns.map((col, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-black/30 border border-white/10">
                    <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                      <span className="text-xs font-mono font-bold text-white uppercase tracking-wider">
                        {col.title}
                      </span>
                      <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${col.badge}`}>
                        {col.count} tasks
                      </span>
                    </div>

                    <div className="space-y-3">
                      {col.tasks.map((task, tIdx) => (
                        <div 
                          key={tIdx} 
                          className="p-3.5 rounded-lg bg-white/5 border border-white/5 hover:border-white/15 transition-colors"
                        >
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300 block w-fit mb-2">
                            {task.tag}
                          </span>
                          <h4 className="text-xs font-medium text-white mb-2 leading-snug">
                            {task.title}
                          </h4>
                          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400">
                            <span className="flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                              <span>Verified</span>
                            </span>
                            <span className="text-slate-300">{task.time}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* 2. Staging Preview Tab */}
            {activeTab === 'staging' && (
              <div className="p-6 sm:p-10 rounded-2xl bg-black/50 border border-white/10 text-center animate-in fade-in duration-200">
                <div className="max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-[rgb(var(--color-primary))]/10 border border-[rgb(var(--color-primary))]/30 flex items-center justify-center text-[rgb(var(--color-primary))] mx-auto">
                    <Layers className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-white">
                    Live Client Staging Sandbox Active
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    A live containerized build running at <code className="text-cyan-300 font-mono">staging-ae8942.aetherstudios.dev</code>. You can interact, test on your mobile device, and request live revisions before production deployment.
                  </p>
                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href="#portfolio"
                      onClick={() => soundEffects.playClick()}
                      className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-slate-950 text-xs font-bold font-display flex items-center gap-2"
                    >
                      <Play className="w-3.5 h-3.5 fill-slate-950" />
                      <span>Launch Interactive Sandbox</span>
                    </a>
                    <button
                      onClick={() => soundEffects.playClick()}
                      className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono flex items-center gap-2"
                    >
                      <MessageSquare className="w-3.5 h-3.5" />
                      <span>Leave Feedback Marker</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* 3. Repo & Deliverables Tab */}
            {activeTab === 'repo' && (
              <div className="space-y-4 animate-in fade-in duration-200">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                        <GitBranch className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">GitHub Repository</h5>
                        <span className="text-[10px] font-mono text-slate-400">main branch • 42 commits</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => soundEffects.playClick()}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-purple-500/10 text-purple-400">
                        <Download className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">Build Artifact (.zip)</h5>
                        <span className="text-[10px] font-mono text-slate-400">Production ready • 14.2 MB</span>
                      </div>
                    </div>
                    <button 
                      onClick={() => soundEffects.playClick()}
                      className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400">
                        <ShieldCheck className="w-5 h-5" />
                      </div>
                      <div>
                        <h5 className="text-xs font-bold text-white">IP Transfer & Warranty</h5>
                        <span className="text-[10px] font-mono text-slate-400">Full Commercial License</span>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                      Signed
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
