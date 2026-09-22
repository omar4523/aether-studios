import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  GraduationCap, 
  Briefcase, 
  Rocket, 
  ShieldCheck, 
  AlertCircle,
  Zap,
  Volume2,
  VolumeX,
  Compass,
  Star,
  Check,
  KeyRound,
  ShieldAlert,
  Layers,
  HelpCircle
} from 'lucide-react';
import confetti from 'canvas-confetti';
import AuthCanvas3D from '../3d/AuthCanvas3D';
import AetherLogo from '../ui/AetherLogo';
import { soundEffects } from '../../utils/soundFx';

export default function AuthPage({ 
  onLoginSuccess, 
  onBack, 
  initialMode = 'signin',
  currentTheme = 'cyan',
  onOpenTerms,
  onOpenPrivacy
}) {
  const [activeTab, setActiveTab] = useState(initialMode === 'signup' ? 'signup' : 'signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted());

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    accountType: 'student', // 'student' | 'business' | 'startup'
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setErrorMsg('');
    setSuccessMsg('');
    setActiveTab(initialMode === 'signup' ? 'signup' : 'signin');
  }, [initialMode]);

  const toggleSound = () => {
    const nextMuted = soundEffects.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) soundEffects.playClick();
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  // Real-time password strength calculation
  const passwordStrength = useMemo(() => {
    const pwd = signUpData.password;
    if (!pwd) return { score: 0, label: '', color: 'bg-slate-700' };
    let score = 0;
    if (pwd.length >= 6) score += 1;
    if (pwd.length >= 10) score += 1;
    if (/[A-Z]/.test(pwd)) score += 1;
    if (/[0-9]/.test(pwd)) score += 1;
    if (/[^A-Za-z0-9]/.test(pwd)) score += 1;

    if (score <= 2) return { score: 1, label: 'Fair', color: 'bg-amber-500' };
    if (score <= 4) return { score: 2, label: 'Strong', color: 'bg-cyan-400' };
    return { score: 3, label: 'Quantum-Grade', color: 'bg-emerald-400' };
  }, [signUpData.password]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#38bdf8', '#a855f7', '#ffffff']
      });
    } catch {}
  };

  // 1-Click Instant VIP Guest Access
  const handleGuestLogin = () => {
    soundEffects.playSuccess();
    triggerCelebration();

    const guestUser = {
      name: 'Guest Explorer (VIP Pass)',
      email: 'guest.preview@aetherstudios.dev',
      role: 'VIP Guest Client',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      projectId: 'AE-GUEST-2026',
      accountType: 'guest',
      isGuest: true,
      perks: [
        'Full Interactive Project Portal Access',
        'Direct Staging Sandbox Demo',
        'Instant Milestone & Deliverables Tracker',
        'Interactive Cost Estimator with 15% VIP Discount',
        'Real-time Code & IP Handover Spec Download'
      ]
    };

    onLoginSuccess(guestUser);
  };

  // Sign In submit
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!validateEmail(signInData.email)) {
      setErrorMsg('Please provide a valid email address.');
      soundEffects.playClick();
      return;
    }
    if (signInData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      soundEffects.playClick();
      return;
    }

    soundEffects.playSuccess();
    triggerCelebration();

    const loggedInUser = {
      name: signInData.email.split('@')[0],
      email: signInData.email,
      role: 'Verified Studio Client',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      projectId: 'AE-8942',
      accountType: 'business'
    };

    onLoginSuccess(loggedInUser);
  };

  // Sign Up submit
  const handleSignUpSubmit = (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!signUpData.fullName.trim()) {
      setErrorMsg('Please enter your full name.');
      soundEffects.playClick();
      return;
    }
    if (!validateEmail(signUpData.email)) {
      setErrorMsg('Please provide a valid email address.');
      soundEffects.playClick();
      return;
    }
    if (signUpData.password.length < 6) {
      setErrorMsg('Password must contain at least 6 characters.');
      soundEffects.playClick();
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      soundEffects.playClick();
      return;
    }
    if (!signUpData.agreeTerms) {
      setErrorMsg('Please agree to the Terms of Service and Privacy Policy to continue.');
      soundEffects.playClick();
      return;
    }

    soundEffects.playSuccess();
    triggerCelebration();

    const roleName = signUpData.accountType === 'student' 
      ? 'Student Member (Capstone)' 
      : signUpData.accountType === 'startup'
      ? 'Startup Founder'
      : 'Creative Business Partner';

    const newUser = {
      name: signUpData.fullName,
      email: signUpData.email,
      role: roleName,
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      projectId: 'AE-9051',
      accountType: signUpData.accountType
    };

    onLoginSuccess(newUser);
  };

  // 1-Click Quick Demo Profiles
  const handleQuickDemoLogin = (demoRole) => {
    soundEffects.playSuccess();
    triggerCelebration();

    let demoUser;
    if (demoRole === 'student') {
      demoUser = {
        name: 'Alex Vance',
        email: 'alex.vance@mit.edu',
        role: 'Computer Science Senior',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&q=80',
        projectId: 'AE-8942 (MediVision Capstone)',
        accountType: 'student',
        grantCode: 'STUDENT40',
      };
    } else {
      demoUser = {
        name: 'Sarah Jenkins',
        email: 'sarah@luxestore.dev',
        role: 'Founder & CEO',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80',
        projectId: 'AE-7721 (Luxury 3D Storefront)',
        accountType: 'business',
      };
    }

    onLoginSuccess(demoUser);
  };

  return (
    <div className="min-h-screen bg-[#04060A] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* 3D Quantum Nexus Interactive Canvas */}
      <AuthCanvas3D theme={currentTheme} offsetLeft={true} />

      {/* Cyber Grid & Atmospheric Gradients (GPU composited without heavy blurs) */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-20 z-0" />
      <div 
        className="absolute top-1/3 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(0, 242, 254, 0.12) 0%, rgba(168, 85, 247, 0.05) 50%, transparent 70%)'
        }}
      />

      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex items-center justify-between">
        <button
          onClick={() => {
            soundEffects.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all group active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Studio Home</span>
        </button>

        <div onClick={onBack} className="cursor-pointer">
          <AetherLogo showText={true} />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white transition-colors border border-white/10"
            title={isMuted ? "Unmute audio" : "Mute audio"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-cyan-400" />}
          </button>
        </div>
      </header>

      {/* Main Split-Screen Container */}
      <main className="relative z-10 flex-grow flex items-center justify-center py-6 sm:py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 3D Quantum Stage Showcase & Brand Prestige */}
          <div className="lg:col-span-6 text-left space-y-6 pointer-events-auto hidden lg:block pr-6">
            
            {/* Status Protocol Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-white/5 border border-cyan-400/30 text-[11px] font-mono tracking-wider text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.15)]">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>AETHER QUANTUM GATEWAY v2.6 ACTIVE</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-black text-white leading-[1.08] tracking-tight">
              Where Visionaries <br />
              <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_30px_rgba(0,242,254,0.35)]">
                Build The Impossible.
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg font-normal">
              Access your unified client dashboard, high-velocity engineering sprints, milestone deliverables, and live sandbox deployments.
            </p>

            {/* Prestige Value Pillars */}
            <div className="space-y-3 pt-2 max-w-md">
              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm hover:border-cyan-400/40 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center shrink-0 border border-cyan-500/30">
                  <Zap className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="text-white font-bold">48-Hour Rapid Delivery</div>
                  <div className="text-slate-400 text-[11px]">Sprint-ready production code without bloated agency turnaround cycles</div>
                </div>
              </div>

              <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-sm hover:border-purple-400/40 transition-colors">
                <div className="w-9 h-9 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/30">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="text-white font-bold">100% Full IP Handover</div>
                  <div className="text-slate-400 text-[11px]">You own all source code, Figma assets, and deployment environments</div>
                </div>
              </div>
            </div>

            {/* Verified Rating & Live 3D Hint */}
            <div className="pt-2 flex items-center justify-between max-w-md text-xs font-mono text-slate-400">
              <div className="flex items-center gap-2">
                <div className="flex items-center text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <span className="text-white font-bold">4.98/5</span>
                <span className="text-slate-500">•</span>
                <span>140+ Projects</span>
              </div>
              <span className="text-[10px] text-cyan-400/80">✦ Interactive 3D Core</span>
            </div>

          </div>

          {/* Right Column: High-End Luxury Auth Card Console */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-lg bg-[#070A12]/95 border border-white/15 rounded-3xl shadow-[0_20px_70px_-15px_rgba(0,0,0,0.8)] p-6 sm:p-8 text-slate-100 flex flex-col relative z-20 backdrop-blur-xl">
              
              {/* Card Header & Switcher */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-display font-extrabold text-white tracking-tight">
                      {activeTab === 'signin' ? 'Welcome Back' : 'Create Workspace'}
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {activeTab === 'signin' 
                        ? 'Sign in to access your projects and staging builds' 
                        : 'Join visionary founders and elite student researchers'}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-1 rounded-full border border-cyan-400/30 shrink-0">
                    256-Bit TLS
                  </span>
                </div>

                {/* Segmented Mode Switcher */}
                <div className="grid grid-cols-2 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setErrorMsg('');
                      setSuccessMsg('');
                      setActiveTab('signin');
                    }}
                    className={`py-2.5 rounded-xl transition-all font-bold flex items-center justify-center gap-1.5 ${
                      activeTab === 'signin'
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Lock className="w-3.5 h-3.5" />
                    <span>Sign In</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setErrorMsg('');
                      setSuccessMsg('');
                      setActiveTab('signup');
                    }}
                    className={`py-2.5 rounded-xl transition-all font-bold flex items-center justify-center gap-1.5 ${
                      activeTab === 'signup'
                        ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-md shadow-cyan-500/20'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Create Account</span>
                  </button>
                </div>
              </div>

              {/* 1-CLICK INSTANT VIP GUEST ACCESS PASS (HIGH PRESTIGE) */}
              <div className="mb-5 p-4 rounded-2xl bg-gradient-to-br from-cyan-950/50 via-slate-900/60 to-purple-950/50 border border-cyan-400/35 text-left relative overflow-hidden shadow-lg group">
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Instant VIP Guest Pass</span>
                    </span>
                  </div>
                  <span className="text-[10px] font-mono bg-cyan-400/20 text-cyan-200 px-2 py-0.5 rounded-full font-bold border border-cyan-400/30">
                    No Password Needed
                  </span>
                </div>
                
                <p className="text-xs text-slate-300 leading-relaxed mb-3">
                  Instantly explore live project telemetries, staging builds, milestones, and cost calculators.
                </p>

                <button
                  type="button"
                  onClick={handleGuestLogin}
                  className="w-full py-2.5 px-4 rounded-xl font-display font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-300 hover:opacity-95 shadow-[0_0_20px_rgba(0,242,254,0.35)] flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
                >
                  <Compass className="w-4 h-4" />
                  <span>Enter as VIP Guest Client</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {/* Feedback Alerts */}
              {successMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2.5 text-left">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2.5 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* MODE 1: SIGN IN FORM */}
              {activeTab === 'signin' ? (
                <form onSubmit={handleSignInSubmit} className="space-y-4 text-left">
                  
                  {/* Email Input */}
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                      Work / Personal Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="founder@company.com"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    </div>
                  </div>

                  {/* Password Input */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-xs font-mono text-slate-300 font-semibold">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => {
                          soundEffects.playSuccess();
                          setSuccessMsg('A password recovery transmission has been dispatched to your email address.');
                        }}
                        className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Remember Me Toggle */}
                  <div className="flex items-center text-xs pt-0.5">
                    <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-slate-200">
                      <input
                        type="checkbox"
                        checked={signInData.rememberMe}
                        onChange={(e) => setSignInData({ ...signInData, rememberMe: e.target.checked })}
                        className="rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-0 cursor-pointer"
                      />
                      <span className="text-[11px]">Remember this workstation for 30 days</span>
                    </label>
                  </div>

                  {/* Main Sign In Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-display font-bold text-xs text-white bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:opacity-95 shadow-[0_0_25px_rgba(147,51,234,0.3)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                  >
                    <span>Authenticate & Access Portal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                  {/* 1-Click Quick Demo Profiles */}
                  <div className="pt-2">
                    <div className="text-[10px] font-mono uppercase tracking-wider text-slate-500 text-center mb-2">
                      Or Instant 1-Click Test Workspaces
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('client')}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
                      >
                        <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Client Founder</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('student')}
                        className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-[11px] font-mono text-slate-300 hover:text-white flex items-center justify-center gap-2 transition-colors"
                      >
                        <GraduationCap className="w-3.5 h-3.5 text-purple-400" />
                        <span>Student Lab</span>
                      </button>
                    </div>
                  </div>

                </form>
              ) : (
                /* MODE 2: SIGN UP FORM */
                <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-left">
                  
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1 font-semibold">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="Alex Vance"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    </div>
                  </div>

                  {/* Work Email */}
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1 font-semibold">
                      Work / Academic Email
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="alex@stanford.edu or founder@startup.io"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                    </div>
                  </div>

                  {/* Primary Archetype Selector */}
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1.5 font-semibold">
                      Primary Project Archetype
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'student', label: 'Student Lab', badge: '40% Grant', icon: GraduationCap },
                        { id: 'business', label: 'Creator/Brand', badge: 'Full IP', icon: Briefcase },
                        { id: 'startup', label: 'SaaS Startup', badge: 'MVP Sprint', icon: Rocket },
                      ].map((item) => {
                        const Icon = item.icon;
                        const isSelected = signUpData.accountType === item.id;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => {
                              soundEffects.playClick();
                              setSignUpData({ ...signUpData, accountType: item.id });
                            }}
                            className={`p-2.5 rounded-xl border text-left flex flex-col justify-between transition-all ${
                              isSelected
                                ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-sm'
                                : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                            }`}
                          >
                            <div className="flex items-center justify-between w-full mb-1">
                              <Icon className={`w-4 h-4 ${isSelected ? 'text-cyan-300' : 'text-slate-400'}`} />
                              <span className="text-[9px] font-mono px-1 py-0.2 rounded bg-white/10 text-cyan-200">
                                {item.badge}
                              </span>
                            </div>
                            <span className="text-[11px] font-bold truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Passwords */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div>
                      <label className="text-[11px] font-mono text-slate-300 block mb-1 font-semibold">
                        Create Password
                      </label>
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-mono text-slate-300 block mb-1 font-semibold">
                        Confirm Password
                      </label>
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                        className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Password Strength Meter */}
                  {signUpData.password && (
                    <div className="space-y-1">
                      <div className="flex items-center justify-between text-[10px] font-mono">
                        <span className="text-slate-400">Security Score:</span>
                        <span className="text-cyan-300 font-bold">{passwordStrength.label}</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden flex gap-1">
                        <div className={`h-full rounded-full transition-all duration-300 ${passwordStrength.score >= 1 ? passwordStrength.color : 'bg-transparent'} w-1/3`} />
                        <div className={`h-full rounded-full transition-all duration-300 ${passwordStrength.score >= 2 ? passwordStrength.color : 'bg-transparent'} w-1/3`} />
                        <div className={`h-full rounded-full transition-all duration-300 ${passwordStrength.score >= 3 ? passwordStrength.color : 'bg-transparent'} w-1/3`} />
                      </div>
                    </div>
                  )}

                  {/* Terms Checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer text-[11px] text-slate-400 pt-1">
                    <input
                      type="checkbox"
                      checked={signUpData.agreeTerms}
                      onChange={(e) => setSignUpData({ ...signUpData, agreeTerms: e.target.checked })}
                      className="mt-0.5 rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-0 cursor-pointer"
                    />
                    <span>
                      I agree to the{' '}
                      <button type="button" onClick={onOpenTerms} className="text-cyan-400 hover:underline">
                        Terms of Service
                      </button>{' '}
                      and{' '}
                      <button type="button" onClick={onOpenPrivacy} className="text-cyan-400 hover:underline">
                        Privacy Policy
                      </button>
                    </span>
                  </label>

                  {/* Sign Up Submit */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-display font-bold text-xs text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:opacity-95 shadow-[0_0_25px_rgba(0,242,254,0.3)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                  >
                    <span>Create Studio Account & Claim Perks</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>

                </form>
              )}

              {/* Bottom Toggle Between Sign In & Sign Up */}
              <div className="mt-5 pt-4 border-t border-white/10 text-center text-xs text-slate-400">
                {activeTab === 'signin' ? (
                  <p>
                    Don't have a studio account yet?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playClick();
                        setActiveTab('signup');
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                    >
                      Sign Up here
                    </button>
                  </p>
                ) : (
                  <p>
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        soundEffects.playClick();
                        setActiveTab('signin');
                      }}
                      className="text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
                    >
                      Sign In here
                    </button>
                  </p>
                )}
              </div>

              {/* Trust & Security Footnote */}
              <div className="mt-3 flex items-center justify-center gap-4 text-[10px] font-mono text-slate-500">
                <span>• AES-256 GCM Encrypted</span>
                <span>• Zero-Tracker Guarantee</span>
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
