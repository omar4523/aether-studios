import React, { useState, useEffect } from 'react';
import { X, ShieldCheck, FileText, Lock, CheckCircle2, ArrowRight, Download, Sparkles } from 'lucide-react';
import { soundEffects } from '../../utils/soundFx';

export default function LegalModal({ isOpen, onClose, initialTab = 'privacy' }) {
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setActiveTab(initialTab);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialTab]);

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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-3xl max-h-[88vh] bg-[#07090F] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-white/10 bg-black/50 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                LEGAL & COMPLIANCE
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                Aether Studios Trust & Legal Framework
              </h3>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-1.5 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="px-6 py-2.5 bg-[#0A0D14] border-b border-white/10 flex items-center gap-2">
          {[
            { id: 'privacy', label: 'Privacy Policy', icon: Lock },
            { id: 'terms', label: 'Terms of Service', icon: FileText },
            { id: 'security', label: 'Security & IP Warranty', icon: ShieldCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  soundEffects.playClick();
                  setActiveTab(tab.id);
                }}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 transition-all ${
                  isActive
                    ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300'
                    : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 text-left custom-scrollbar text-slate-300 text-xs sm:text-sm leading-relaxed">
          
          {/* TAB 1: PRIVACY POLICY */}
          {activeTab === 'privacy' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="pb-3 border-b border-white/10">
                <h4 className="text-base font-display font-bold text-white">Privacy Policy</h4>
                <p className="text-[11px] font-mono text-slate-400">Effective Date: September 2026 • Version 2.4</p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider font-mono text-cyan-400">
                  1. Zero Data Brokerage & Confidentiality
                </h5>
                <p>
                  At Aether Studios, we uphold strict non-disclosure and privacy protocols. We will <strong>never sell, rent, or trade</strong> your personal details, academic prompts, proprietary code, business models, or customer lists to any third-party advertising network or data broker.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider font-mono text-cyan-400">
                  2. What Information We Collect
                </h5>
                <p>
                  We collect strictly necessary project delivery data:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  <li>Client contact data (name, email address, WhatsApp/phone number for project milestone notifications).</li>
                  <li>Project scope specs, tech stack preferences, and asset requirements submitted via our Project Intake or Estimator.</li>
                  <li>Authentication credentials stored via salted cryptographic hashes.</li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider font-mono text-cyan-400">
                  3. Academic Capstone Discretion
                </h5>
                <p>
                  For student graduation capstones, we treat all code repositories, dataset samples, and thesis drafts with academic non-disclosure. We do not publish your capstone code publicly without explicit written student consent.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider font-mono text-cyan-400">
                  4. Your Rights
                </h5>
                <p>
                  You retain the permanent right to request full export or permanent deletion of your project briefs, user account, and staging containers by emailing <code className="text-cyan-300">privacy@aetherstudios.dev</code>.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: TERMS OF SERVICE */}
          {activeTab === 'terms' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="pb-3 border-b border-white/10">
                <h4 className="text-base font-display font-bold text-white">Terms of Service & Engagement</h4>
                <p className="text-[11px] font-mono text-slate-400">Effective Date: September 2026</p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider font-mono text-cyan-400">
                  1. Scope of Engagement & Deliverables
                </h5>
                <p>
                  Aether Studios operates as a Project-as-a-Service engineering laboratory. When you commission a project (E-Commerce Store, Web App, Capstone, or Mobile Build), our scope of work is codified in your project brief specification.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider font-mono text-cyan-400">
                  2. 100% Intellectual Property Handover
                </h5>
                <p>
                  Upon final milestone sign-off and balance completion, <strong>one hundred percent (100%)</strong> of all custom software code, database schemas, UI design Figma files, and documentation transfer exclusively to you. Aether Studios retains zero proprietary lock-in.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider font-mono text-cyan-400">
                  3. Transparent Milestone Payments
                </h5>
                <p>
                  Projects under $500 require either upfront payment or a 50/50 milestone split. Projects above $500 are structured in progressive milestones (Architecture, Staging, Final Handover). No surprise fees or unauthorized overages.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-white text-xs sm:text-sm uppercase tracking-wider font-mono text-cyan-400">
                  4. Unlimited Staging Revisions Guarantee
                </h5>
                <p>
                  Before final production deployment, clients review the build in their private interactive Staging Sandbox. We provide revisions to guarantee compliance with the agreed architectural brief.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: SECURITY & IP WARRANTY */}
          {activeTab === 'security' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="pb-3 border-b border-white/10">
                <h4 className="text-base font-display font-bold text-white">Security & Code Warranty Certificate</h4>
                <p className="text-[11px] font-mono text-slate-400">Standard with every Aether Studios delivery</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-3">
                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white text-xs block">Zero Vulnerabilities</strong>
                    <span className="text-[11px] text-slate-400">Every build passes automated Snyk & npm audit security checks.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white text-xs block">Clean Git Commit History</strong>
                    <span className="text-[11px] text-slate-400">Descriptive commit logs with verified signed authors.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white text-xs block">Safe Secrets Management</strong>
                    <span className="text-[11px] text-slate-400">No committed API keys, tokens, or plaintext credentials.</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                  <div>
                    <strong className="text-white text-xs block">30-Day Bug Warranty</strong>
                    <span className="text-[11px] text-slate-400">Post-handover defect fixes provided free of charge for 30 days.</span>
                  </div>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                All production deployments are configured with modern SSL/TLS encryption, Content Security Policy headers, and rate-limited REST/GraphQL endpoints.
              </p>
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-black/60 border-t border-white/10 flex items-center justify-between gap-4 shrink-0">
          <span className="text-[11px] font-mono text-slate-400">
            Aether Studios Inc. • Cairo, Egypt • All Rights Reserved
          </span>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-mono font-semibold transition-colors"
          >
            Acknowledge & Close
          </button>
        </div>

      </div>

    </div>
  );
}
