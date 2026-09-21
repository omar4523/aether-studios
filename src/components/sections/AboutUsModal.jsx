import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  Users, 
  Trophy, 
  Target, 
  Cpu, 
  Calendar, 
  Award, 
  CheckCircle2, 
  ArrowRight, 
  Heart, 
  Globe, 
  ShieldCheck, 
  Terminal,
  ExternalLink
} from 'lucide-react';
import { soundEffects } from '../../utils/soundFx';

export default function AboutUsModal({ isOpen, onClose, onOpenIntake }) {
  const [activeTab, setActiveTab] = useState('story'); // 'story' | 'team' | 'timeline' | 'philosophy' | 'awards'

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
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const teamMembers = [
    {
      name: "Alex Rivers",
      role: "Founder & Lead Systems Architect",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
      bio: "10+ years engineering high-concurrency cloud distributed systems, Next.js architectures, and full-stack SaaS backbones.",
      skills: ["Next.js 15", "Distributed Systems", "TypeScript", "PostgreSQL"],
      badge: "Founder"
    },
    {
      name: "Maya Lin",
      role: "Principal UI/UX & 3D Spatial Designer",
      avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80",
      bio: "Former design agency lead specializing in WebGL, Three.js spatial interfaces, luxury e-commerce visuals, and accessible design tokens.",
      skills: ["Three.js", "WebGL", "Figma", "Tailwind CSS"],
      badge: "Design Lead"
    },
    {
      name: "Tariq Al-Mansoor",
      role: "Senior Full-Stack & Cloud Infrastructure Engineer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80",
      bio: "Expert in real-time WebSockets, Supabase architectures, Stripe checkout orchestration, and edge deployment automation.",
      skills: ["Cloud Ops", "Supabase", "Docker", "Node.js"],
      badge: "Infrastructure"
    },
    {
      name: "Elena Rostova",
      role: "AI & Machine Learning Research Lead",
      avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80",
      bio: "Specializing in generative neural networks, computer vision pathology models (MediVision), vector search, and LLM edge endpoints.",
      skills: ["PyTorch", "FastAPI", "OpenAI / Claude", "Computer Vision"],
      badge: "AI / ML"
    },
    {
      name: "David Chen",
      role: "Academic Capstone & Student Lab Director",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
      bio: "Mentored 140+ senior graduation engineering teams across top global universities to score departmental Grade A+ honors and publish IEEE papers.",
      skills: ["Academic Defense", "IEEE LaTeX", "Viva Coaching", "System Schemas"],
      badge: "Student Lab"
    }
  ];

  const milestones = [
    {
      year: "2024 Q1",
      title: "Inception & Academic Lab Launch",
      description: "Founded with a mission to help ambitious engineering students build real, bug-free capstone prototypes with full academic IEEE papers."
    },
    {
      year: "2024 Q3",
      title: "50th Milestone & Startup Division",
      description: "Expanded our offerings to early-stage founders and small businesses, launching high-converting e-commerce stores and SaaS MVPs."
    },
    {
      year: "2025 Q2",
      title: "3D WebGL & Interactive Experiences",
      description: "Pioneered interactive Three.js 3D product visualizers and kinetic web experiences, achieving industry recognition on Awwwards."
    },
    {
      year: "2025 Q4",
      title: "120+ International Clients",
      description: "Crossed 120 completed handovers across the US, Europe, and MENA with a proven 99.6% client satisfaction rating and zero late deliveries."
    },
    {
      year: "2026 Q1",
      title: "Real-Time Client Portal & AI Pipelines",
      description: "Introduced our transparent Client Portal Tracker for live sprint monitoring and turnkey autonomous generative AI integrations."
    }
  ];

  const awards = [
    {
      title: "Best Academic Capstone Sponsor",
      organization: "University Engineering Excellence Forum 2025",
      badge: "Department Honors",
      desc: "Recognized for mentoring 45 consecutive university teams to score marks above 95/100."
    },
    {
      title: "Top 10 Rapid Prototyping Studio",
      organization: "Tech Innovators Summit 2025",
      badge: "Velocity Award",
      desc: "Honored for delivering verified, production-grade web applications with a 48h to 2-week turnaround."
    },
    {
      title: "Honorable Mention — WebGL Experience",
      organization: "Interactive Design & Awwwards Review",
      badge: "Design Recognition",
      desc: "Celebrated for immersive 3D spatial interactive interfaces and zero-lag performance."
    },
    {
      title: "100% Code Ownership & IP Guarantee",
      organization: "Global Software Developers Alliance",
      badge: "Integrity Badge",
      desc: "Full intellectual property transfer certification with zero vendor lock-in or recurring license fees."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#07090F] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 text-slate-100">
        
        {/* Header Bar */}
        <div className="px-6 py-5 border-b border-white/10 bg-black/50 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-400 to-purple-600 p-[1px]">
              <div className="w-full h-full bg-[#07090F] rounded-[15px] flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-cyan-300" />
              </div>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                AETHER STUDIOS • COMPANY DOSSIER
              </div>
              <h2 className="text-xl font-display font-extrabold text-white">
                About Our Studio & Team
              </h2>
            </div>
          </div>

          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="p-2 rounded-xl bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Bar */}
        <div className="px-6 py-3 bg-[#0A0D14] border-b border-white/10 flex items-center gap-2 overflow-x-auto shrink-0 custom-scrollbar">
          {[
            { id: 'story', label: 'Our Story & Vision', icon: Target },
            { id: 'team', label: 'Leadership & Team', icon: Users },
            { id: 'timeline', label: 'Studio Milestones', icon: Calendar },
            { id: 'philosophy', label: 'Tech Philosophy', icon: Cpu },
            { id: 'awards', label: 'Awards & Honors', icon: Trophy },
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
                className={`px-4 py-2 rounded-xl text-xs font-mono font-semibold flex items-center gap-2 shrink-0 transition-all ${
                  isActive
                    ? 'bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/40 text-cyan-300 shadow-sm'
                    : 'bg-white/5 border border-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-10 space-y-8 custom-scrollbar text-left">
          
          {/* TAB 1: STORY & VISION */}
          {activeTab === 'story' && (
            <div className="space-y-8 animate-in fade-in duration-200">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7 space-y-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                    THE ORIGIN
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-display font-extrabold text-white leading-tight">
                    Bridging the Gap Between Bold Ideas and Production Code.
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Aether Studios was founded with a singular conviction: too many promising projects get stuck in purgatory. Students struggle with complex capstone documentation and thesis requirements, while startup founders and small business owners get burned by overpriced agencies that drag projects out for months.
                  </p>
                  <p className="text-sm text-slate-400 leading-relaxed">
                    We created a new model: <strong>Project-as-a-Service</strong>. We combine senior full-stack engineers, 3D WebGL artists, and academic researchers into dedicated sprint units that ship complete, bug-free digital products in days, not months.
                  </p>
                </div>

                <div className="lg:col-span-5 rounded-2xl overflow-hidden border border-white/15 shadow-2xl relative">
                  <img 
                    src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80" 
                    alt="Aether Studios Workspace"
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-5">
                    <div className="text-xs font-mono text-cyan-300">
                      Cairo HQ & Global Remote Engineering Network
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Highlight Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-white/10">
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-display font-extrabold text-cyan-300">140+</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Projects Delivered</div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-display font-extrabold text-purple-400">48 Hours</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Avg. Express Turnaround</div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-display font-extrabold text-emerald-400">99.6%</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">Client Satisfaction</div>
                </div>
                <div className="p-5 rounded-2xl bg-white/5 border border-white/10 text-center">
                  <div className="text-3xl font-display font-extrabold text-blue-400">100%</div>
                  <div className="text-xs text-slate-400 font-mono mt-1">IP & Code Ownership</div>
                </div>
              </div>

              {/* Core Values */}
              <div className="space-y-4 pt-4">
                <h4 className="text-lg font-display font-bold text-white">Our 4 Core Operating Principles</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300 shrink-0">
                      <ShieldCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">100% Intellectual Property Handover</h5>
                      <p className="text-xs text-slate-400 mt-1">You own all Git repositories, Figma files, databases, and licenses. No royalties, no recurring lock-in.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-purple-500/20 text-purple-300 shrink-0">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Radical Production Transparency</h5>
                      <p className="text-xs text-slate-400 mt-1">Watch every commit and test sprint live on your private Client Portal Tracker before final release.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300 shrink-0">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Academic Excellence & Rubrics</h5>
                      <p className="text-xs text-slate-400 mt-1">Every student capstone meets strict IEEE formatting, comprehensive viva defense, and A+ viva standards.</p>
                    </div>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-blue-500/20 text-blue-300 shrink-0">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white">Next-Gen Visuals & 3D WebGL</h5>
                      <p className="text-xs text-slate-400 mt-1">We don't build generic cookie-cutter templates. We craft immersive, spatial 3D interactive canvases that convert.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: TEAM MEMBERS */}
          {activeTab === 'team' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  THE ARCHITECTS & BUILDERS
                </span>
                <h3 className="text-2xl font-display font-extrabold text-white">
                  Meet the Core Engineering Team
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  A tight-knit collective of full-stack engineers, 3D artists, machine learning researchers, and academic directors.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map((member, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-cyan-400/40 transition-all flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center gap-4 mb-4">
                        <img 
                          src={member.avatar} 
                          alt={member.name}
                          className="w-16 h-16 rounded-2xl object-cover border border-white/20 shadow-md group-hover:scale-105 transition-transform" 
                        />
                        <div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/10 text-cyan-300 border border-white/10 font-bold block w-fit mb-1">
                            {member.badge}
                          </span>
                          <h4 className="text-base font-display font-bold text-white leading-tight">
                            {member.name}
                          </h4>
                          <p className="text-xs text-slate-400 font-mono mt-0.5">
                            {member.role}
                          </p>
                        </div>
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed mb-4">
                        {member.bio}
                      </p>
                    </div>

                    <div>
                      <div className="flex flex-wrap gap-1.5 pt-3 border-t border-white/10">
                        {member.skills.map((skill, sIdx) => (
                          <span key={sIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-black/40 text-slate-300 border border-white/5">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: TIMELINE & MILESTONES */}
          {activeTab === 'timeline' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  OUR JOURNEY
                </span>
                <h3 className="text-2xl font-display font-extrabold text-white">
                  Studio Milestones & Track Record
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  How we went from a handful of engineering capstones to a globally trusted software studio.
                </p>
              </div>

              <div className="relative pl-6 sm:pl-8 border-l-2 border-cyan-500/30 space-y-8 my-6">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative group">
                    {/* Circle on line */}
                    <div className="absolute -left-[31px] sm:-left-[39px] top-1 w-4 h-4 rounded-full bg-cyan-400 border-4 border-[#07090F] shadow-[0_0_12px_rgba(0,242,254,0.6)]" />

                    <div className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-white/20 transition-all">
                      <span className="text-xs font-mono font-bold text-cyan-300 uppercase tracking-wider block mb-1">
                        {m.year}
                      </span>
                      <h4 className="text-base font-display font-bold text-white mb-2">
                        {m.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {m.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PHILOSOPHY */}
          {activeTab === 'philosophy' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  HOW WE WORK
                </span>
                <h3 className="text-2xl font-display font-extrabold text-white">
                  Our Engineering & Architectural Philosophy
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  We believe in code that stands the test of time, scales without headaches, and empowers its owners.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold">
                    01
                  </div>
                  <h4 className="text-base font-display font-bold text-white">Zero Technical Debt Delivery</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Every project is authored with strict TypeScript types, ESLint rules, automated testing benchmarks, and modular folder architectures. You will never open an Aether Studios codebase and find undocumented spaghetti code.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-500/20 text-purple-300 flex items-center justify-center font-mono font-bold">
                    02
                  </div>
                  <h4 className="text-base font-display font-bold text-white">High-Concurrency Modern Stack</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    We standardize on best-in-class open-source technologies: Next.js 15, React 19, Tailwind CSS, Three.js, PostgreSQL, Supabase, and PyTorch. No proprietary black boxes.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-300 flex items-center justify-center font-mono font-bold">
                    03
                  </div>
                  <h4 className="text-base font-display font-bold text-white">Comprehensive Documentation Guarantee</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    Whether it is a 40-page academic capstone report formatted for IEEE submission or comprehensive OpenAPI documentation for a SaaS backend, our deliverables are always complete and presentation-ready.
                  </p>
                </div>

                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-300 flex items-center justify-center font-mono font-bold">
                    04
                  </div>
                  <h4 className="text-base font-display font-bold text-white">Fair, Fixed Pricing with Zero Upselling</h4>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    We quote fixed project prices upfront with transparent timelines. If our team takes longer to polish your product, you do not pay a single extra penny.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: AWARDS & HONORS */}
          {activeTab === 'awards' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-cyan-400 font-bold">
                  RECOGNITION
                </span>
                <h3 className="text-2xl font-display font-extrabold text-white">
                  Awards, Honors & Verified Accolades
                </h3>
                <p className="text-sm text-slate-400 mt-1">
                  Proven recognition from academic institutions, design reviewers, and startup accelerators.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {awards.map((award, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/30 font-bold">
                          {award.badge}
                        </span>
                        <Trophy className="w-5 h-5 text-amber-400" />
                      </div>
                      <h4 className="text-base font-display font-bold text-white mb-1">
                        {award.title}
                      </h4>
                      <div className="text-xs font-mono text-cyan-300 mb-3">
                        {award.organization}
                      </div>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        {award.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Action Bar */}
        <div className="px-6 py-4 bg-black/60 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs font-mono text-slate-400">
            Have an idea ready for development? We provide free technical architectural consults.
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => {
                soundEffects.playClick();
                onClose();
                onOpenIntake();
              }}
              className="w-full sm:w-auto px-6 py-2.5 rounded-full font-display font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-purple-400 hover:opacity-95 shadow-md flex items-center justify-center gap-2 active:scale-95 transition-all"
            >
              <span>Start a Project with Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
