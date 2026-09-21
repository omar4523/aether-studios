import React, { useState, useEffect } from 'react';
import { 
  X, 
  Terminal, 
  Layers, 
  CheckCircle2, 
  Play, 
  GitBranch, 
  Download, 
  ShieldCheck, 
  Clock, 
  Sparkles, 
  Activity, 
  ExternalLink,
  Search,
  MessageSquare
} from 'lucide-react';
import { soundEffects } from '../../utils/soundFx';

export default function ClientPortalModal({ isOpen, onClose, currentUser }) {
  const [activeTab, setActiveTab] = useState('kanban'); // 'kanban' | 'staging' | 'repo'
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [feedbackText, setFeedbackText] = useState('');
  const [projectIdInput, setProjectIdInput] = useState(currentUser?.projectId || 'AE-8942');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setFeedbackSent(false);
      if (currentUser?.projectId) {
        setProjectIdInput(currentUser.projectId);
      }
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, currentUser]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const stages = [
    { name: "1. Scope & Architecture", status: "completed", date: "Sep 18", progress: 100 },
    { name: "2. UI/UX & 3D Assets", status: "completed", date: "Sep 20", progress: 100 },
    { name: "3. Full-Stack Development", status: "active", date: "In Progress", progress: 88 },
    { name: "4. Staging QA & Testing", status: "pending", date: "Sep 24", progress: 20 },
    { name: "5. Production Handover", status: "pending", date: "Sep 26", progress: 0 },
  ];

  const kanbanColumns = [
    {
      title: "Completed",
      count: 6,
      badge: "border-emerald-500/30 text-emerald-400 bg-emerald-500/10",
      tasks: [
        { title: "System Architecture & ER Schema", tag: "Architecture", time: "Approved" },
        { title: "3D WebGL Canvas Engine & Shaders", tag: "Frontend", time: "Merged" },
        { title: "Stripe & Auth Security Gateway", tag: "Backend", time: "Verified" }
      ]
    },
    {
      title: "In Active Sprint",
      count: 2,
      badge: "border-cyan-400/30 text-cyan-300 bg-cyan-500/10",
      tasks: [
        { title: "AI Assistant REST API Endpoints", tag: "Backend", time: "88% Done" },
        { title: "Haptic Feedback & Mobile Touch Optimizations", tag: "UI/UX", time: "Reviewing" }
      ]
    },
    {
      title: "Ready for Launch",
      count: 3,
      badge: "border-white/10 text-slate-400 bg-white/5",
      tasks: [
        { title: "Automated Lighthouse 98+ Audit Pass", tag: "QA", time: "Pending" },
        { title: "Client Staging Sandbox Walkthrough", tag: "Review", time: "Upcoming" }
      ]
    }
  ];

  const handleSendFeedback = (e) => {
    e.preventDefault();
    if (!feedbackText.trim()) return;
    soundEffects.playSuccess();
    setFeedbackSent(true);
    setFeedbackText('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#07090F] border border-cyan-500/30 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 text-slate-100">
        
        {/* Top Window Bar */}
        <div className="px-6 py-4 bg-black/70 border-b border-white/10 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-4">
            {/* Traffic lights */}
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
              <Terminal className="w-4 h-4 text-cyan-400" />
              <span className="font-bold text-white">PROJECT #{projectIdInput}</span>
              <span className="text-slate-600">/</span>
              <span className="text-cyan-300">
                {currentUser?.name ? `${currentUser.name}'s Workspace` : 'MediVision AI & Lumina Hybrid'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab Navigation */}
            <div className="flex items-center gap-1 p-1 rounded-xl bg-white/5 border border-white/10 text-xs font-mono">
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('kanban');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'kanban' 
                    ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold' 
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
                    ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Staging Sandbox
              </button>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab('repo');
                }}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  activeTab === 'repo' 
                    ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold' 
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Deliverables & IP
              </button>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
              }}
              className="p-1.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Real-time Sprint Stepper Bar */}
        <div className="px-6 py-4 bg-black/40 border-b border-white/5 overflow-x-auto shrink-0 custom-scrollbar">
          <div className="min-w-[680px] flex items-center justify-between gap-4">
            {stages.map((stage, i) => (
              <div key={i} className="flex-1 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className={`font-semibold ${
                    stage.status === 'completed' ? 'text-emerald-400' :
                    stage.status === 'active' ? 'text-cyan-300' : 'text-slate-500'
                  }`}>
                    {stage.name}
                  </span>
                  <span className="text-slate-400">{stage.progress}%</span>
                </div>
                <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      stage.status === 'completed' ? 'bg-emerald-400' :
                      stage.status === 'active' ? 'bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse' : 'bg-transparent'
                    }`}
                    style={{ width: `${stage.progress}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scrollable Tab Content Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 custom-scrollbar text-left">
          
          {/* TAB 1: KANBAN */}
          {activeTab === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
              {kanbanColumns.map((col, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col justify-between">
                  <div>
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
                          className="p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 transition-colors"
                        >
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-cyan-300 block w-fit mb-2">
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
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: STAGING SANDBOX */}
          {activeTab === 'staging' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="p-8 rounded-2xl bg-black/50 border border-cyan-500/20 text-center space-y-4">
                <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mx-auto">
                  <Layers className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold text-white">
                  Live Containerized Staging Sandbox
                </h3>
                <p className="text-xs text-slate-400 max-w-lg mx-auto leading-relaxed">
                  Your isolated preview instance is active at <code className="text-cyan-300 font-mono">staging-ae8942.aetherstudios.dev</code>. You can interact, test on your mobile device, and submit revision markers directly to our engineering lead.
                </p>

                <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      window.open('https://luxevoyage.aetherstudios.dev', '_blank');
                    }}
                    className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 text-xs font-display font-bold flex items-center gap-2 shadow-lg"
                  >
                    <Play className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Open Live Staging Link</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Revision Marker Box */}
              <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-cyan-300 font-bold uppercase">
                  <MessageSquare className="w-4 h-4" />
                  <span>Submit Live Revision Marker</span>
                </div>
                <form onSubmit={handleSendFeedback} className="space-y-3">
                  <textarea
                    rows={3}
                    placeholder="Describe any adjustments or tweaks you would like in the current sprint..."
                    value={feedbackText}
                    onChange={(e) => setFeedbackText(e.target.value)}
                    className="w-full bg-black/50 border border-white/10 rounded-xl p-3 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-500">
                      Directly dispatched to your assigned lead architect.
                    </span>
                    <button
                      type="submit"
                      className="px-5 py-2 rounded-xl bg-cyan-400 text-slate-950 text-xs font-mono font-bold hover:bg-cyan-300 transition-colors"
                    >
                      {feedbackSent ? 'Marker Logged! ✓' : 'Send Revision Marker'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* TAB 3: DELIVERABLES & IP REPO */}
          {activeTab === 'repo' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                
                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400">
                      <GitBranch className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">GitHub Repository</h5>
                      <span className="text-[10px] font-mono text-slate-400">main branch • 42 commits</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      soundEffects.playClick();
                      window.open('https://github.com/omar4523/aether-studios', '_blank');
                    }}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                    title="View Repo"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-purple-500/10 text-purple-400">
                      <Download className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">Build Artifact (.zip)</h5>
                      <span className="text-[10px] font-mono text-slate-400">Production ready • 14.2 MB</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => soundEffects.playSuccess()}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300"
                    title="Download Archive"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-xs font-bold text-white">IP Transfer & Warranty</h5>
                      <span className="text-[10px] font-mono text-slate-400">Full Commercial License</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                    Signed ✓
                  </span>
                </div>

              </div>

              {/* Commit Log Stream */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/10 space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Recent Automated Git CI/CD Activity</span>
                  <span className="text-emerald-400">All Pipelines Passing</span>
                </div>
                <div className="space-y-2 font-mono text-[11px]">
                  <div className="p-2 rounded-lg bg-white/5 flex items-center justify-between text-slate-300">
                    <span>feat: integrate Three.js spatial canvas visualizer</span>
                    <span className="text-slate-500">2h ago • commit #c8e91f</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 flex items-center justify-between text-slate-300">
                    <span>perf: optimize client bundle size with partial pre-rendering</span>
                    <span className="text-slate-500">5h ago • commit #a14b3d</span>
                  </div>
                  <div className="p-2 rounded-lg bg-white/5 flex items-center justify-between text-slate-300">
                    <span>docs: format IEEE 35+ page capstone LaTeX report</span>
                    <span className="text-slate-500">1d ago • commit #98df02</span>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer Bar */}
        <div className="px-6 py-3.5 bg-black/60 border-t border-white/10 flex items-center justify-between gap-4 shrink-0 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Real-Time Sync Active • End-to-End Encrypted</span>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
          >
            Close Portal
          </button>
        </div>

      </div>

    </div>
  );
}
