import React, { useState, useEffect } from 'react';
import { 
  X, 
  BookOpen, 
  Terminal, 
  Code, 
  ShieldCheck, 
  Cpu, 
  GraduationCap, 
  Sparkles, 
  Copy, 
  Check, 
  Layers,
  ArrowRight
} from 'lucide-react';
import { soundEffects } from '../../utils/soundFx';

export default function DocumentationModal({ isOpen, onClose, onOpenIntake }) {
  const [activeDoc, setActiveDoc] = useState('getting-started');
  const [copiedIndex, setCopiedIndex] = useState(null);

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

  const handleCopy = (text, idx) => {
    soundEffects.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedIndex(idx);
      setTimeout(() => setCopiedIndex(null), 2000);
    }
  };

  const docArticles = [
    {
      id: 'getting-started',
      title: '1. Quick Start & Project Commissioning',
      icon: Terminal,
      category: 'Overview',
      content: `Welcome to Aether Studios. Our engineering process is designed for maximum speed, zero friction, and complete transparency.

### Step 1: Submit Your Project Brief
Select your project archetype (E-Commerce, Full-Stack SaaS, Student Capstone, or Mobile App) using our interactive Project Estimator or Intake Modal. Specify your preferred technologies and target deadline.

### Step 2: Architecture & Staging Setup
Within 24 hours of brief confirmation, our systems architects initialize your private GitHub repository, setup the Dockerized staging environment, and provide your Project ID (e.g., #AE-8942).

### Step 3: Interactive Staging & Milestone Reviews
Monitor daily progress via the live Kanban sprint board in your Client Portal. Test live builds on mobile and desktop at your private staging URL.

### Step 4: Production Handover & IP Assignment
Upon final approval, 100% of the repository, domain DNS configs, and commercial licenses transfer directly into your accounts.`,
      code: `# Clone your commissioned Aether project
git clone https://github.com/aether-studios/your-project.git
cd your-project

# Install dependencies with locked pnpm/npm
npm install

# Launch production-grade local environment
npm run dev`
    },
    {
      id: 'student-rubrics',
      title: '2. Academic Capstone & IEEE Thesis Rubrics',
      icon: GraduationCap,
      category: 'Academic Lab',
      content: `Our academic packages are formulated strictly according to international accreditation guidelines (ABET, IEEE, and European ECTS criteria).

### What Each Package Includes:
1. **Modular Source Code**: Cleanly commented, fully typed, with unit tests and Docker compose setups.
2. **35+ Page IEEE Formatted Report**: Editable Word or LaTeX format with Problem Formulation, Literature Survey, System Architecture, Experimental Results, and BibTeX citations.
3. **Defense Presentation Deck**: 15 professionally formatted slides (.pptx) highlighting problem, architecture, live demo steps, and future work.
4. **Viva Oral Defense Cheat Sheet**: Antidotes and model responses to the 15 most tricky questions university examiners ask during project defense.`,
      code: `\\documentclass[conference]{IEEEtran}
\\title{MediVision: Deep Convolutional Pathological Localization}
\\author{\\IEEEauthorblockN{Alex Vance, Senior Capstone Project}}
\\begin{document}
\\maketitle
\\begin{abstract}
We present a dual-branch neural architecture for high-accuracy chest radiography pathology diagnosis...
\\end{abstract}`
    },
    {
      id: 'tech-stack',
      title: '3. Architecture & Technology Stack',
      icon: Cpu,
      category: 'Engineering',
      content: `We build with best-in-class, future-proof open standards that scale from prototype to millions of users:

- **Frontend**: Next.js 15 App Router, React 19, Tailwind CSS v4, Three.js / WebGL.
- **Backend & APIs**: Node.js, FastAPI (Python), GraphQL, REST, WebSockets for real-time collaboration.
- **Database & Storage**: PostgreSQL, Supabase, Redis, Cloudflare R2, Pinecone Vector DB.
- **Payments & Billing**: Stripe Connect, Stripe Elements, Apple Pay, Google Pay.
- **AI & Deep Learning**: PyTorch, HuggingFace Transformers, OpenAI Assistants, LangChain.`,
      code: `// Example Aether Server Component Data Fetching Pattern
export async function generateStaticParams() {
  const posts = await getFeaturedDeliverables();
  return posts.map((post) => ({ slug: post.slug }));
}`
    },
    {
      id: 'ip-ownership',
      title: '4. 100% Intellectual Property Guarantee',
      icon: ShieldCheck,
      category: 'Legal',
      content: `Unlike traditional agencies that retain proprietary licenses or charge monthly recurring maintenance fees to keep your software alive, Aether Studios operates on an **absolute IP transfer policy**.

- **Zero Vendor Lock-In**: You can host the software anywhere (Vercel, AWS, GCP, Railway, or your own server).
- **Full Commercial Rights**: You own copyright to all graphics, audio, UI layouts, and code.
- **Clean Audit Warranty**: Every codebase is delivered with automated dependency scanning, zero vulnerabilities, and 30 days of complimentary post-delivery bug fixes.`,
      code: `// Commercial License Grant
// Subject: Project Deliverables Handover
// Status: Irrevocable, Worldwide, Perpetual, Exclusive Commercial Rights.`
    }
  ];

  const currentDoc = docArticles.find((d) => d.id === activeDoc) || docArticles[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-hidden animate-in fade-in duration-200">
      
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/85 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-5xl max-h-[90vh] bg-[#07090F] border border-white/15 rounded-3xl shadow-2xl flex flex-col overflow-hidden z-10 text-slate-100">
        
        {/* Header */}
        <div className="px-6 py-4 bg-black/60 border-b border-white/10 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-300">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest font-bold">
                DOCUMENTATION & DEVELOPER DOCS
              </div>
              <h3 className="text-lg font-display font-bold text-white">
                Aether Studios Engineering Guidebook
              </h3>
            </div>
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

        {/* Two-Column Docs Layout */}
        <div className="flex-1 flex flex-col md:flex-row overflow-hidden text-left">
          
          {/* Left Sidebar Topics */}
          <div className="w-full md:w-72 bg-black/40 border-r border-white/10 p-4 space-y-1 overflow-y-auto shrink-0 custom-scrollbar">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-bold block px-3 py-2">
              Guide Topics
            </span>
            {docArticles.map((doc) => {
              const Icon = doc.icon;
              const isSelected = activeDoc === doc.id;
              return (
                <button
                  key={doc.id}
                  onClick={() => {
                    soundEffects.playClick();
                    setActiveDoc(doc.id);
                  }}
                  className={`w-full text-left p-3 rounded-xl text-xs font-mono transition-all flex items-center gap-2.5 ${
                    isSelected
                      ? 'bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 font-bold shadow-sm'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border border-transparent'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="truncate">{doc.title}</span>
                </button>
              );
            })}

            <div className="pt-6 mt-6 border-t border-white/10 px-2 space-y-2">
              <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block">
                Have specific requirements?
              </span>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  onClose();
                  onOpenIntake();
                }}
                className="w-full py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-cyan-300 flex items-center justify-center gap-1.5 transition-colors"
              >
                <span>Request Custom Spec</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-6 sm:p-10 overflow-y-auto custom-scrollbar space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-bold uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{currentDoc.category}</span>
            </div>

            <h2 className="text-2xl font-display font-extrabold text-white">
              {currentDoc.title}
            </h2>

            <div className="prose prose-invert max-w-none text-slate-300 text-xs sm:text-sm leading-relaxed space-y-4">
              {currentDoc.content.split('\n\n').map((paragraph, idx) => {
                if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={idx} className="text-base font-display font-bold text-white pt-2">
                      {paragraph.replace('### ', '')}
                    </h3>
                  );
                }
                return (
                  <p key={idx} className="text-slate-300 leading-relaxed whitespace-pre-line">
                    {paragraph}
                  </p>
                );
              })}
            </div>

            {/* Code Block Example */}
            {currentDoc.code && (
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-[#05070B] shadow-lg mt-6">
                <div className="px-4 py-2 bg-black/60 border-b border-white/10 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>Terminal / Code Example</span>
                  <button
                    onClick={() => handleCopy(currentDoc.code, 1)}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    {copiedIndex === 1 ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy snippet</span>
                      </>
                    )}
                  </button>
                </div>
                <pre className="p-4 text-xs font-mono text-cyan-300 overflow-x-auto leading-relaxed">
                  <code>{currentDoc.code}</code>
                </pre>
              </div>
            )}

          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-black/60 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-400 shrink-0">
          <span>Aether Studios Technical Documentation v2026.9</span>
          <button
            onClick={() => {
              soundEffects.playClick();
              onClose();
            }}
            className="px-4 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-white transition-colors"
          >
            Close Docs
          </button>
        </div>

      </div>

    </div>
  );
}
