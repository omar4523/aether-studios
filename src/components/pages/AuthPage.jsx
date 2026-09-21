import React, { useState, useEffect } from 'react';
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
  Terminal,
  Activity,
  Zap,
  Volume2,
  VolumeX,
  Compass
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
  const [activeTab, setActiveTab] = useState(initialMode);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted());

  // Sign In State
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
    rememberMe: true,
  });

  // Sign Up State
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    accountType: 'student',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setErrorMsg('');
    setSuccessMsg('');
    setActiveTab(initialMode);
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

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#4facfe', '#a855f7', '#ffffff']
      });
    } catch {}
  };

  // 1-Click VIP Guest Access
  const handleGuestLogin = () => {
    soundEffects.playSuccess();
    triggerConfetti();

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
        'Direct Staging Sandbox Sandbox Demo',
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
      setErrorMsg('Please enter a valid email address.');
      soundEffects.playClick();
      return;
    }
    if (signInData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      soundEffects.playClick();
      return;
    }

    soundEffects.playSuccess();
    triggerConfetti();

    const loggedInUser = {
      name: signInData.email.split('@')[0],
      email: signInData.email,
      role: 'Verified Client',
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
      setErrorMsg('Please enter a valid email address.');
      soundEffects.playClick();
      return;
    }
    if (signUpData.password.length < 6) {
      setErrorMsg('Password must be at least 6 characters long.');
      soundEffects.playClick();
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      soundEffects.playClick();
      return;
    }
    if (!signUpData.agreeTerms) {
      setErrorMsg('You must agree to the Terms of Service and Privacy Policy.');
      soundEffects.playClick();
      return;
    }

    soundEffects.playSuccess();
    triggerConfetti();

    const newUser = {
      name: signUpData.fullName,
      email: signUpData.email,
      role: signUpData.accountType === 'student' ? 'Student Member (Capstone)' : 'Startup Founder',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      projectId: 'AE-9051',
      accountType: signUpData.accountType
    };

    onLoginSuccess(newUser);
  };

  const handleQuickDemoLogin = (demoRole) => {
    soundEffects.playSuccess();
    triggerConfetti();

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
      
      {/* 3D WebGL Interactive Background Canvas */}
      <AuthCanvas3D theme={currentTheme} />

      {/* Cyber Grid & Vignette Overlay */}
      <div className="absolute inset-0 cyber-grid pointer-events-none opacity-30 z-0" />
      <div className="absolute inset-0 radial-vignette pointer-events-none z-0" />

      {/* Top Header Bar */}
      <header className="relative z-20 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              soundEffects.playClick();
              onBack();
            }}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all group active:scale-95"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
            <span>Return to Studio Home</span>
          </button>
        </div>

        <div onClick={onBack} className="cursor-pointer">
          <AetherLogo showText={true} />
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleSound}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[rgb(var(--color-primary))]" />}
          </button>
        </div>
      </header>

      {/* Main Dual-Column Content Body */}
      <main className="relative z-10 flex-grow flex items-center justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: 3D Holographic Info & Live Ticker (5 Cols) */}
          <div className="hidden lg:flex lg:col-span-5 flex-col space-y-6 text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-400/30 text-xs font-mono text-cyan-300 w-fit">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>AETHER CLIENT CLOUD v4.2</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-display font-extrabold text-white leading-tight tracking-tight">
              Access the Next Generation <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Digital Production Hub.
              </span>
            </h1>

            <p className="text-sm text-slate-400 leading-relaxed font-normal">
              Manage your high-performance web applications, track active development sprints in real-time, test containerized staging builds, and download production code & commercial IP deeds.
            </p>

            {/* Live Security Feature Cards */}
            <div className="space-y-3 pt-2">
              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5 hover:border-cyan-400/30 transition-colors">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Interactive Client Portal</div>
                  <div className="text-[10px] font-mono text-slate-400">Real-time Kanban tracker & milestone status</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5 hover:border-emerald-400/30 transition-colors">
                <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Full IP Transfer & Warranty</div>
                  <div className="text-[10px] font-mono text-slate-400">100% Commercial code deed & repository handover</div>
                </div>
              </div>

              <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center gap-3.5 hover:border-purple-400/30 transition-colors">
                <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
                  <Activity className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Instant 1-Click Guest Preview</div>
                  <div className="text-[10px] font-mono text-slate-400">Explore staging sandboxes without registration</div>
                </div>
              </div>
            </div>

            {/* Telemetry Status Line */}
            <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] font-mono text-slate-500">
              <span className="flex items-center gap-1.5 text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>WebSockets Connected</span>
              </span>
              <span>RSA-4096 ENCRYPTED</span>
            </div>

          </div>

          {/* Right Column: High-Performance Auth Console (7 Cols) */}
          <div className="lg:col-span-7 flex justify-center w-full">
            <div className="w-full max-w-md bg-[#0A0D14]/90 backdrop-blur-xl border border-white/15 rounded-3xl shadow-2xl overflow-hidden text-slate-100 flex flex-col relative z-20 border-beam">
              
              {/* Top Neon Accent Gradient */}
              <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500" />

              {/* Console Header */}
              <div className="p-6 pb-4 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-600 p-[1px]">
                    <div className="w-full h-full bg-[#07090F] rounded-[11px] flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-cyan-300" />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-base text-white tracking-wide">
                      AETHER <span className="text-cyan-400 font-mono text-xs">PORTAL ACCESS</span>
                    </h2>
                    <p className="text-[10px] font-mono text-slate-400">
                      Sign in or explore instantly as Guest
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>LIVE</span>
                </div>
              </div>

              {/* 1-CLICK GUEST ACCESS BANNER (PROMINENT HIGHLIGHT) */}
              <div className="p-4 mx-6 mt-5 rounded-2xl bg-gradient-to-r from-cyan-950/60 via-blue-950/40 to-purple-950/60 border border-cyan-400/40 shadow-[0_0_20px_rgba(0,242,254,0.15)] relative overflow-hidden group">
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded-md bg-cyan-400 text-slate-950 text-[9px] font-mono font-extrabold uppercase tracking-wider">
                        Quick Preview
                      </span>
                      <span className="text-xs font-display font-bold text-white">
                        Explore as Guest Client
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-tight">
                      Instant 1-click access to the live Project Portal, Kanban sprint tracker & cost estimator without creating an account.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleGuestLogin}
                  className="mt-3 w-full py-2.5 rounded-xl font-display font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-200 hover:from-cyan-300 hover:to-white shadow-[0_0_15px_rgba(0,242,254,0.4)] flex items-center justify-center gap-2 transition-all duration-200 active:scale-98"
                >
                  <Compass className="w-4 h-4" />
                  <span>Continue as Guest Client</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Tab Switcher */}
              <div className="px-6 pt-5 pb-2">
                <div className="grid grid-cols-2 p-1 rounded-2xl bg-white/5 border border-white/10 text-xs font-mono">
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setErrorMsg('');
                      setSuccessMsg('');
                      setActiveTab('signin');
                    }}
                    className={`py-2 rounded-xl transition-all font-semibold ${
                      activeTab === 'signin'
                        ? 'bg-white/15 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => {
                      soundEffects.playClick();
                      setErrorMsg('');
                      setSuccessMsg('');
                      setActiveTab('signup');
                    }}
                    className={`py-2 rounded-xl transition-all font-semibold ${
                      activeTab === 'signup'
                        ? 'bg-white/15 text-white shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Create Account
                  </button>
                </div>
              </div>

              {/* Alerts */}
              {successMsg && (
                <div className="mx-6 mt-3 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="mx-6 mt-3 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Form Content */}
              <div className="p-6 pt-3 space-y-4 text-left">
                
                {/* 1. SIGN IN FORM */}
                {activeTab === 'signin' && (
                  <form onSubmit={handleSignInSubmit} className="space-y-4 animate-in fade-in duration-200">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="client@company.com"
                          value={signInData.email}
                          onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-[11px] font-mono uppercase text-slate-400 font-semibold">
                          Password
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            setErrorMsg('');
                            setSuccessMsg('A password reset link has been dispatched to your email.');
                            soundEffects.playSuccess();
                          }}
                          className="text-[10px] font-mono text-cyan-400 hover:underline"
                        >
                          Forgot Password?
                        </button>
                      </div>
                      <div className="relative">
                        <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          required
                          placeholder="••••••••"
                          value={signInData.password}
                          onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-10 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3.5 top-3 text-slate-500 hover:text-slate-300"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between text-xs">
                      <label className="flex items-center gap-2 cursor-pointer text-slate-400 hover:text-white">
                        <input
                          type="checkbox"
                          checked={signInData.rememberMe}
                          onChange={(e) => setSignInData({ ...signInData, rememberMe: e.target.checked })}
                          className="rounded border-white/20 bg-black/40 text-cyan-400 focus:ring-0"
                        />
                        <span>Remember this device</span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-display font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-500 hover:opacity-95 shadow-[0_0_20px_rgba(0,242,254,0.3)] flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <span>Sign In to Portal</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>

                    {/* Instant Demo Quick Logins */}
                    <div className="pt-3 border-t border-white/10 space-y-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block text-center font-bold">
                        Quick 1-Click Demo Profiles
                      </span>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => handleQuickDemoLogin('student')}
                          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-emerald-500/30 text-left flex items-center gap-2.5 transition-colors group"
                        >
                          <div className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400">
                            <GraduationCap className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-white leading-tight">Student Demo</div>
                            <div className="text-[9px] font-mono text-emerald-300">CS Senior • Capstone</div>
                          </div>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleQuickDemoLogin('founder')}
                          className="p-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-purple-500/30 text-left flex items-center gap-2.5 transition-colors group"
                        >
                          <div className="p-1.5 rounded-lg bg-purple-500/20 text-purple-400">
                            <Briefcase className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold text-white leading-tight">Founder Demo</div>
                            <div className="text-[9px] font-mono text-purple-300">E-Commerce • Store</div>
                          </div>
                        </button>
                      </div>
                    </div>

                    {/* Social Login Buttons */}
                    <div className="pt-2 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('founder')}
                        className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-center gap-2 transition-colors"
                      >
                        <svg className="w-4 h-4" viewBox="0 0 24 24">
                          <path fill="#EA4335" d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.4 1 3.5 3.6 1.6 7.4l3.7 2.9C6.2 7.3 8.9 5 12 5z"/>
                          <path fill="#4285F4" d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"/>
                          <path fill="#FBBC05" d="M5.3 14.7c-.2-.7-.4-1.5-.4-2.7s.1-2 .4-2.7L1.6 6.4C.6 8.3 0 10.1 0 12s.6 3.7 1.6 5.6l3.7-2.9z"/>
                          <path fill="#34A853" d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3.1 0-5.8-2.3-6.7-5.3L1.6 16c1.9 3.8 5.8 7 10.4 7z"/>
                        </svg>
                        <span>Google</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleQuickDemoLogin('student')}
                        className="flex-1 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 flex items-center justify-center gap-2 transition-colors"
                      >
                        <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                      </button>
                    </div>
                  </form>
                )}

                {/* 2. SIGN UP FORM */}
                {activeTab === 'signup' && (
                  <form onSubmit={handleSignUpSubmit} className="space-y-3.5 animate-in fade-in duration-200">
                    <div>
                      <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="text"
                          required
                          placeholder="Alex Vance"
                          value={signUpData.fullName}
                          onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                        <input
                          type="email"
                          required
                          placeholder="alex@example.com"
                          value={signUpData.email}
                          onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400 transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                        I am registering as:
                      </label>
                      <div className="grid grid-cols-3 gap-2">
                        {[
                          { id: 'student', label: 'Student', icon: GraduationCap },
                          { id: 'business', label: 'Business', icon: Briefcase },
                          { id: 'founder', label: 'Founder', icon: Rocket },
                        ].map((type) => {
                          const Icon = type.icon;
                          const isSelected = signUpData.accountType === type.id;
                          return (
                            <button
                              key={type.id}
                              type="button"
                              onClick={() => {
                                soundEffects.playClick();
                                setSignUpData({ ...signUpData, accountType: type.id });
                              }}
                              className={`p-2 rounded-xl border text-center transition-all flex flex-col items-center gap-1 ${
                                isSelected
                                  ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-300'
                                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
                              }`}
                            >
                              <Icon className="w-4 h-4" />
                              <span className="text-[10px] font-mono">{type.label}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                          Password
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={signUpData.password}
                          onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                        />
                      </div>

                      <div>
                        <label className="text-[11px] font-mono uppercase text-slate-400 block mb-1 font-semibold">
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          required
                          placeholder="••••••••"
                          value={signUpData.confirmPassword}
                          onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:border-cyan-400"
                        />
                      </div>
                    </div>

                    <div className="pt-1">
                      <label className="flex items-start gap-2 text-[11px] text-slate-400 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={signUpData.agreeTerms}
                          onChange={(e) => setSignUpData({ ...signUpData, agreeTerms: e.target.checked })}
                          className="mt-0.5 rounded border-white/20 bg-black/40 text-cyan-400 focus:ring-0"
                        />
                        <span>
                          I agree to the{' '}
                          <button
                            type="button"
                            onClick={() => onOpenTerms && onOpenTerms()}
                            className="text-cyan-400 hover:underline"
                          >
                            Terms of Service
                          </button>{' '}
                          and{' '}
                          <button
                            type="button"
                            onClick={() => onOpenPrivacy && onOpenPrivacy()}
                            className="text-cyan-400 hover:underline"
                          >
                            Privacy Policy
                          </button>.
                        </span>
                      </label>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 rounded-xl font-display font-bold text-xs text-slate-950 bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 hover:opacity-95 shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center justify-center gap-2 transition-all active:scale-95"
                    >
                      <span>Create Aether Account</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </form>
                )}

              </div>

              {/* Console Footer */}
              <div className="px-6 py-3.5 bg-black/40 border-t border-white/10 text-center text-[10px] font-mono text-slate-500">
                🔒 End-to-end encrypted • 100% Client Privacy Guarantee
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
