import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Home, 
  FolderKanban, 
  MessageSquare, 
  FileText, 
  User, 
  Settings, 
  Bell, 
  MoreVertical, 
  CheckCircle2, 
  Clock, 
  Send, 
  ArrowLeft, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Sparkles,
  Download,
  AlertCircle
} from 'lucide-react';
import AetherLogo from './AetherLogo';
import { soundEffects } from '../../utils/soundFx';

export default function ClientPortalModal({ 
  isOpen, 
  onClose, 
  currentUser, 
  initialProjectId, 
  onOpenLegal,
  onOpenIntake
}) {
  const [activeNav, setActiveNav] = useState('projects');
  const [messageInput, setMessageInput] = useState('');
  const [messages, setMessages] = useState([
    {
      id: 1,
      time: 'Sep 25, 2025 • 11:42 AM',
      author: 'Studio Team',
      text: "Frontend development is in progress. The core structure is complete and we're working on the responsive design.",
      status: 'info'
    },
    {
      id: 2,
      time: 'Sep 22, 2025 • 4:30 PM',
      author: 'Lead Designer',
      text: "UI/UX design has been approved. We're now moving to development.",
      status: 'success'
    },
    {
      id: 3,
      time: 'Sep 20, 2025 • 2:14 PM',
      author: 'System',
      text: "Project created and initial requirements received.",
      status: 'system'
    }
  ]);

  const [isContractOpen, setIsContractOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        if (isContractOpen) {
          setIsContractOpen(false);
        } else {
          onClose();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, isContractOpen, onClose]);

  if (!isOpen) return null;

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!messageInput.trim()) return;
    soundEffects.playSuccess();
    const newMsg = {
      id: Date.now(),
      time: 'Just now',
      author: currentUser?.name || 'Omar Mohamed',
      text: messageInput.trim(),
      status: 'client'
    };
    setMessages([newMsg, ...messages]);
    setMessageInput('');
  };

  const handleDownloadContract = () => {
    soundEffects.playClick();
    const contractText = `=====================================================
AETHER STUDIOS - DIGITAL CLIENT SERVICE AGREEMENT
Project Ref: #A-2847 (E-Commerce Website)
Client: ${currentUser?.name || 'Omar Mohamed'}
Contract Date: September 20, 2025
Budget: $299.00 USD (Fully Paid / Verified)
Delivery Target: October 10, 2025
=====================================================

1. SCOPE OF SERVICES
Aether Studios agrees to deliver a custom, full-stack E-Commerce Website featuring:
- Responsive desktop, tablet, and mobile interface design
- Stripe/PayPal secure payment checkout architecture
- Admin inventory management dashboard
- 100% intellectual property & source code handover

2. INTELLECTUAL PROPERTY
Upon final delivery, the Client retains exclusive, perpetual ownership of all code,
design files, and database schemas developed under this project.

3. SUPPORT & WARRANTY
Aether Studios provides 30 days of complimentary post-launch support and bug fixes.

Signed:
Aether Studios Lead Architect
Omar Mohamed (Client)`;

    const blob = new Blob([contractText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Aether-Contract-A-2847.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      
      {/* Background Click to dismiss */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Main Dashboard Window matching Bottom-Left Mockup */}
      <div className="relative bg-[#040813] border border-white/15 max-w-7xl w-full h-[94vh] rounded-3xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.9)] z-10 overflow-hidden flex flex-col lg:flex-row text-slate-100">
        
        {/* ================= LEFT SIDEBAR ================= */}
        <aside className="w-full lg:w-64 bg-[#050A18] border-b lg:border-b-0 lg:border-r border-white/10 p-5 flex flex-col justify-between shrink-0">
          <div>
            {/* Top Brand Logo */}
            <div className="flex items-center justify-between mb-8">
              <AetherLogo showText={true} />
              <button 
                onClick={onClose} 
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Navigation Links matching Mockup */}
            <nav className="space-y-1.5 text-xs font-medium">
              {[
                { id: 'home', label: 'Home', icon: Home },
                { id: 'projects', label: 'My Projects', icon: FolderKanban, active: true },
                { id: 'messages', label: 'Messages', icon: MessageSquare },
                { id: 'invoices', label: 'Invoices', icon: FileText },
                { id: 'profile', label: 'Profile', icon: User },
                { id: 'settings', label: 'Settings', icon: Settings },
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeNav === item.id || item.active;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      soundEffects.playClick();
                      setActiveNav(item.id);
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

          {/* Bottom "Need Help?" Card matching Mockup */}
          <div className="mt-6 p-4 rounded-2xl bg-gradient-to-br from-[#0A1124] to-[#0D1836] border border-white/10 relative overflow-hidden text-left">
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="text-xs font-bold text-white">Need Help?</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Our team is here 24/7</div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-cyan-500/15 border border-cyan-400/30 flex items-center justify-center shrink-0">
                <img 
                  src="/aether_prism_cube.jpg" 
                  alt="3D Crystal" 
                  className="w-6 h-6 object-cover rounded" 
                />
              </div>
            </div>

            <button
              onClick={() => {
                soundEffects.playClick();
                if (onOpenIntake) onOpenIntake({ category: 'support' });
              }}
              className="w-full mt-2 py-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/15 border border-white/15 text-[11px] font-mono text-slate-200 hover:text-white transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Contact Support</span>
            </button>
          </div>
        </aside>

        {/* ================= MAIN CONTENT AREA ================= */}
        <div className="flex-1 flex flex-col overflow-y-auto bg-[#030712]">
          
          {/* TOP BREADCRUMB & USER BAR matching Mockup */}
          <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between shrink-0 bg-[#040814]/80 backdrop-blur-md">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
              <span className="hover:text-white cursor-pointer transition-colors">‹ My Projects</span>
              <span>›</span>
              <span className="text-cyan-400 font-bold">Project #A-2847</span>
            </div>

            {/* Right: Notifications & User Profile */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => soundEffects.playClick()}
                className="relative p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-cyan-400" />
              </button>

              <div className="flex items-center gap-2.5 pl-2 border-l border-white/10">
                <img 
                  src={currentUser?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                  alt="Avatar" 
                  className="w-8 h-8 rounded-full object-cover border border-cyan-400/40"
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

              <button 
                onClick={onClose}
                className="p-1.5 rounded-xl hover:bg-white/10 text-slate-400 hover:text-white transition-colors ml-1"
                title="Close Project Portal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* PROJECT HEADER BANNER matching Mockup */}
          <div className="p-6 sm:p-8 pb-4 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              
              <div className="text-left space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-3">
                  <h1 className="text-2xl sm:text-3xl font-display font-extrabold text-white">
                    E-Commerce Website
                  </h1>
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-bold flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>In Progress</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-400">
                  Modern online store with secure payments, admin dashboard and responsive design.
                </p>
              </div>

              {/* Floating 3D Crystal Gem in Top Right matching Mockup */}
              <div className="hidden md:flex items-center justify-center shrink-0 w-24 h-24 relative pointer-events-none">
                <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-[0_0_30px_rgba(0,242,254,0.3)] animate-pulse">
                  <img 
                    src="/aether_prism_cube.jpg" 
                    alt="3D Quantum Core" 
                    className="w-full h-full object-cover" 
                  />
                </div>
              </div>

            </div>

            {/* HORIZONTAL MILESTONE PIPELINE TRACKER matching Mockup */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="grid grid-cols-5 gap-2 relative">
                
                {/* Connecting horizontal line */}
                <div className="absolute top-3.5 left-6 right-6 h-0.5 bg-slate-800 -z-0" />

                {[
                  { label: 'Planning', status: 'completed' },
                  { label: 'Design', status: 'completed' },
                  { label: 'Development', status: 'active' },
                  { label: 'Testing', status: 'pending' },
                  { label: 'Delivery', status: 'pending' },
                ].map((step, idx) => {
                  const isDone = step.status === 'completed';
                  const isActive = step.status === 'active';

                  return (
                    <div key={step.label} className="flex flex-col items-center text-center relative z-10">
                      {/* Step Indicator Node */}
                      <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                        isDone
                          ? 'bg-emerald-500 text-slate-950 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                          : isActive
                          ? 'bg-cyan-500 text-slate-950 ring-4 ring-cyan-500/20 shadow-[0_0_15px_rgba(0,242,254,0.6)] animate-pulse'
                          : 'bg-slate-900 border border-slate-700 text-slate-500'
                      }`}>
                        {isDone ? '✓' : isActive ? '◉' : '○'}
                      </div>

                      <span className={`text-[11px] font-mono mt-2 ${
                        isDone ? 'text-emerald-400 font-bold' : isActive ? 'text-cyan-300 font-bold' : 'text-slate-500'
                      }`}>
                        {step.label}
                      </span>
                      <span className="text-[10px] text-slate-500 capitalize">
                        {step.status === 'active' ? 'In Progress' : step.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* ================= 3-CARD DASHBOARD GRID matching Mockup ================= */}
          <div className="p-6 sm:p-8 pt-4 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 text-left">
            
            {/* CARD 1: Project Details matching Mockup */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#090F20]/90 border border-white/10 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-base font-display font-bold text-white mb-4">
                  Project Details
                </h3>

                <div className="space-y-3.5 text-xs">
                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-400">Project ID</span>
                    <span className="font-mono text-cyan-400 font-bold">#A-2847</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-400">Type</span>
                    <span className="text-white font-medium">E-Commerce Website</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-400">Start Date</span>
                    <span className="font-mono text-slate-300">Sep 20, 2025</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-400">Estimated Delivery</span>
                    <span className="font-mono text-slate-300">Oct 10, 2025</span>
                  </div>

                  <div className="flex items-center justify-between pb-2 border-b border-white/5">
                    <span className="text-slate-400">Budget</span>
                    <span className="font-mono text-emerald-400 font-bold text-sm">$299</span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status</span>
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-[11px] font-bold flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                      <span>In Progress</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* View Contract Button */}
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setIsContractOpen(true);
                }}
                className="w-full mt-6 py-2.5 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-xs font-mono font-bold text-slate-200 hover:text-white transition-all text-center flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <FileText className="w-3.5 h-3.5 text-cyan-400" />
                <span>View Contract</span>
              </button>
            </div>

            {/* CARD 2: Current Progress matching Mockup */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#090F20]/90 border border-white/10 shadow-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-display font-bold text-white">
                    Current Progress
                  </h3>
                  <span className="text-xs font-mono font-bold text-cyan-400">65%</span>
                </div>

                {/* 65% Progress Bar */}
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden mb-5">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full w-[65%]" />
                </div>

                {/* Checklist Tasks matching Mockup */}
                <div className="space-y-3 text-xs">
                  
                  {/* Task 1 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-slate-200 font-medium leading-tight">Project Setup & Requirements</div>
                        <div className="text-[10px] text-slate-500 font-mono">Sep 20, 2025</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                      Completed
                    </span>
                  </div>

                  {/* Task 2 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                      <div>
                        <div className="text-slate-200 font-medium leading-tight">UI/UX Design</div>
                        <div className="text-[10px] text-slate-500 font-mono">Sep 23, 2025</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-semibold">
                      Completed
                    </span>
                  </div>

                  {/* Task 3 */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-cyan-400 shrink-0 animate-spin" />
                      <div>
                        <div className="text-white font-bold leading-tight">Frontend Development</div>
                        <div className="text-[10px] text-cyan-400 font-mono">Sep 29, 2025 • Active</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-400/40 font-bold">
                      In Progress
                    </span>
                  </div>

                  {/* Task 4 */}
                  <div className="flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                      <span className="text-slate-400">Backend Development</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600">Pending</span>
                  </div>

                  {/* Task 5 */}
                  <div className="flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                      <span className="text-slate-400">Testing & Bug Fixes</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600">Pending</span>
                  </div>

                  {/* Task 6 */}
                  <div className="flex items-center justify-between text-slate-500">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full border border-slate-700 shrink-0" />
                      <span className="text-slate-400">Final Delivery</span>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600">Pending</span>
                  </div>

                </div>
              </div>
            </div>

            {/* CARD 3: Live Updates Timeline & Chat Input matching Mockup */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#090F20]/90 border border-white/10 shadow-lg flex flex-col justify-between">
              <div>
                <h3 className="text-base font-display font-bold text-white mb-4">
                  Live Updates
                </h3>

                {/* Timeline Feed matching Mockup */}
                <div className="space-y-4 text-xs max-h-56 overflow-y-auto pr-1">
                  {messages.map((item) => (
                    <div key={item.id} className="relative pl-4 border-l-2 border-cyan-400/40 pb-1">
                      <span className="absolute -left-[5px] top-1 w-2 h-2 rounded-full bg-cyan-400" />
                      <div className="text-[10px] font-mono text-cyan-300 font-semibold mb-0.5">
                        {item.time}
                      </div>
                      <p className="text-xs text-slate-300 leading-relaxed font-normal">
                        {item.text}
                      </p>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </div>

              {/* Chat Input matching Mockup */}
              <form onSubmit={handleSendMessage} className="mt-4 pt-3 border-t border-white/10 relative flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Type a message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  className="w-full bg-[#0D152B] border border-white/15 rounded-xl px-3.5 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 pr-10 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!messageInput.trim()}
                  className="absolute right-1.5 p-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold disabled:opacity-40 disabled:hover:bg-cyan-500 transition-all"
                  title="Send message"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>

          </div>

        </div>

      </div>

      {/* Contract Modal Overlay */}
      {isContractOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-150">
          <div className="bg-[#090E1E] border border-cyan-400/30 max-w-xl w-full rounded-2xl p-6 shadow-2xl text-left text-slate-100">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-cyan-400" />
                <h4 className="text-base font-bold text-white">Client Service Contract #A-2847</h4>
              </div>
              <button 
                onClick={() => setIsContractOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-black/40 border border-white/5 font-mono text-[11px] text-slate-300 space-y-2 mb-5">
              <div className="text-cyan-300 font-bold">PROJECT: E-Commerce Website (#A-2847)</div>
              <div>CLIENT: {currentUser?.name || 'Omar Mohamed'}</div>
              <div>DELIVERY TARGET: October 10, 2025</div>
              <div>TOTAL BUDGET: $299.00 USD (Verified Deposit)</div>
              <div className="pt-2 text-slate-400">
                TERMS: 100% full intellectual property handover upon completion. Standard 30-day post-launch warranty included.
              </div>
            </div>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setIsContractOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-mono text-slate-400 hover:text-white"
              >
                Close
              </button>
              <button
                onClick={handleDownloadContract}
                className="px-4 py-2 rounded-xl bg-cyan-400 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-300 flex items-center gap-1.5 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download Signed Copy</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
