import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Check, 
  Clock, 
  DollarSign, 
  Send, 
  CheckCircle2, 
  Copy,
  Terminal,
  FileUp,
  GraduationCap
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundEffects } from '../../utils/soundFx';

export default function IntakeModal({ isOpen, onClose, initialData = null, onOpenPortal }) {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [projectRefId, setProjectRefId] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    projectName: '',
    category: 'webapp',
    description: '',
    targetDate: '',
    budgetTier: '$300 - $700',
    fullName: '',
    email: '',
    contactChannel: 'Email',
    channelHandle: '',
    isStudent: false,
    promoCode: '',
  });

  // Pre-fill if opened with initial spec from Estimator or Service card
  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        category: initialData.projectType?.id || initialData.id || prev.category,
        budgetTier: initialData.totalCost ? `$${initialData.totalCost}` : prev.budgetTier,
        isStudent: initialData.isStudentDiscount || false,
        description: initialData.tagline || (initialData.projectType ? `Custom build based on ${initialData.projectType.name}` : prev.description),
      }));
    }
  }, [initialData]);

  if (!isOpen) return null;

  const nextStep = (e) => {
    e?.preventDefault();
    soundEffects.playClick();
    setStep((s) => s + 1);
  };

  const prevStep = () => {
    soundEffects.playClick();
    setStep((s) => s - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    soundEffects.playClick();

    // Generate simulated project ref
    const randomRef = 'AE-' + Math.floor(100000 + Math.random() * 900000);
    setProjectRefId(randomRef);
    setIsSubmitted(true);

    // Audio & Confetti celebration
    soundEffects.playSuccess();
    try {
      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00F2FE', '#4FACFE', '#8A2387', '#10B981', '#F59E0B'],
      });
    } catch {
      // Ignore if canvas-confetti is not loaded
    }
  };

  const handleCopyRef = () => {
    soundEffects.playClick();
    navigator.clipboard.writeText(projectRefId);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  const resetAndClose = () => {
    soundEffects.playClick();
    setIsSubmitted(false);
    setStep(1);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Backdrop click to close */}
      <div className="fixed inset-0" onClick={resetAndClose} />

      {/* Modal Dialog */}
      <div className="relative glass-card max-w-xl w-full rounded-3xl border border-white/20 p-6 sm:p-8 shadow-2xl z-10 max-h-[92vh] overflow-y-auto">
        
        {/* Modal Close Button */}
        <button
          onClick={resetAndClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[rgb(var(--color-primary))]/10 border border-[rgb(var(--color-primary))]/30 text-[rgb(var(--color-primary))] text-xs font-mono mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>STEP {step} OF 3 • PROJECT INTAKE</span>
              </div>
              <h3 className="text-2xl font-display font-extrabold text-white">
                Launch Your New Project
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Tell us what you need. Our team will review the brief and send you a staging blueprint within 24 hours.
              </p>
            </div>

            {/* Step 1: Project Details */}
            {step === 1 && (
              <form onSubmit={nextStep} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-300 block mb-1.5 font-medium">
                    Project Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[rgb(var(--color-primary))]"
                  >
                    <option value="ecommerce">E-Commerce & Online Store</option>
                    <option value="webapp">Full-Stack SaaS / Web Application</option>
                    <option value="student">Student Capstone & Graduation Project</option>
                    <option value="mobile">Mobile iOS & Android App</option>
                    <option value="landing">High-Converting Landing Page</option>
                    <option value="other">Custom Software / Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-300 block mb-1.5 font-medium">
                    Project Working Name / Title
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Lumina Fashion Store or MediVision AI Capstone"
                    value={formData.projectName}
                    onChange={(e) => setFormData({ ...formData, projectName: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[rgb(var(--color-primary))]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-300 block mb-1.5 font-medium">
                    Describe What You Want Built
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe the main goal, must-have features, target audience, or paste your professor's assignment rubric..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-[rgb(var(--color-primary))]"
                  />
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-display font-bold text-xs text-slate-950 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] hover:opacity-95 flex items-center gap-2 shadow-[0_0_20px_rgba(var(--color-primary),0.3)]"
                  >
                    <span>Continue to Budget & Timeline</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 2: Budget & Timeline */}
            {step === 2 && (
              <form onSubmit={nextStep} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-300 block mb-1.5 font-medium">
                    Target Launch Date / Deadline
                  </label>
                  <input
                    type="date"
                    required
                    value={formData.targetDate}
                    onChange={(e) => setFormData({ ...formData, targetDate: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[rgb(var(--color-primary))]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-300 block mb-1.5 font-medium">
                    Estimated Budget Tier
                  </label>
                  <select
                    value={formData.budgetTier}
                    onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[rgb(var(--color-primary))]"
                  >
                    <option value="$89 - $250">$89 - $250 (Student Capstone / Starter Landing)</option>
                    <option value="$300 - $700">$300 - $700 (Complete E-Commerce Store)</option>
                    <option value="$700 - $1,500">$700 - $1,500 (Custom SaaS Web App / Mobile)</option>
                    <option value="$1,500+">$1,500+ (Full Enterprise Solution)</option>
                  </select>
                </div>

                <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isStudent}
                      onChange={(e) => setFormData({ ...formData, isStudent: e.target.checked })}
                      className="w-4 h-4 rounded text-emerald-500 focus:ring-0 bg-black/50 border-white/30"
                    />
                    <div>
                      <span className="text-xs font-bold text-emerald-300 block">
                        I am a University or College Student (Apply 40% Grant)
                      </span>
                      <span className="text-[11px] text-slate-400">
                        Requires university email or student ID card verification.
                      </span>
                    </div>
                  </label>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl font-display font-bold text-xs text-slate-950 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] hover:opacity-95 flex items-center gap-2"
                  >
                    <span>Final Step: Contact Info</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            )}

            {/* Step 3: Contact & Submit */}
            {step === 3 && (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-xs font-mono uppercase text-slate-300 block mb-1.5 font-medium">
                    Your Full Name
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Taylor"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[rgb(var(--color-primary))]"
                  />
                </div>

                <div>
                  <label className="text-xs font-mono uppercase text-slate-300 block mb-1.5 font-medium">
                    Your Email Address (For Staging & Updates)
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@example.com or student@university.edu"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[rgb(var(--color-primary))]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-300 block mb-1.5 font-medium">
                      Preferred Channel
                    </label>
                    <select
                      value={formData.contactChannel}
                      onChange={(e) => setFormData({ ...formData, contactChannel: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[rgb(var(--color-primary))]"
                    >
                      <option value="Email">Email</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Telegram">Telegram</option>
                      <option value="Discord">Discord</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-mono uppercase text-slate-300 block mb-1.5 font-medium">
                      Handle / Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="@username or phone"
                      value={formData.channelHandle}
                      onChange={(e) => setFormData({ ...formData, channelHandle: e.target.value })}
                      className="w-full bg-black/60 border border-white/15 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-[rgb(var(--color-primary))]"
                    />
                  </div>
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-300 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl font-display font-bold text-xs text-slate-950 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] hover:opacity-95 shadow-[0_0_30px_rgba(var(--color-primary),0.4)] flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Project Brief Now</span>
                  </button>
                </div>
              </form>
            )}

          </div>
        ) : (
          /* Confirmation Success State */
          <div className="text-center py-8 space-y-6 animate-in zoom-in-95 duration-300">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div>
              <h3 className="text-2xl font-display font-extrabold text-white mb-2">
                Project Brief Received!
              </h3>
              <p className="text-xs text-slate-300 max-w-sm mx-auto leading-relaxed">
                Thank you, <strong className="text-white">{formData.fullName || 'Creator'}</strong>. Our lead engineer has received your specifications and will send you a private staging roadmap to <strong className="text-[rgb(var(--color-primary))]">{formData.email}</strong>.
              </p>
            </div>

            {/* Generated Reference Code */}
            <div className="p-4 rounded-2xl bg-black/60 border border-white/10 max-w-sm mx-auto">
              <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-1">
                Your Project Reference ID
              </span>
              <div className="flex items-center justify-center gap-3">
                <span className="text-lg font-mono font-bold text-white tracking-widest">
                  {projectRefId}
                </span>
                <button
                  onClick={handleCopyRef}
                  className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-slate-300"
                  title="Copy Reference ID"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  soundEffects.playClick();
                  const targetId = projectRefId;
                  resetAndClose();
                  if (onOpenPortal) onOpenPortal(targetId);
                }}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-400/40 text-xs font-mono flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Track #{projectRefId} in Live Portal</span>
              </button>
              <button
                onClick={resetAndClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] text-slate-950 font-bold text-xs"
              >
                Done
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
