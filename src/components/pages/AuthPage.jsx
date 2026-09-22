import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Mail, 
  Lock, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  BarChart2, 
  MessageSquare, 
  ShieldCheck, 
  Rocket, 
  Bell, 
  Users, 
  CheckCircle2, 
  AlertCircle,
  Sparkles,
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
  const [activeTab, setActiveTab] = useState(initialMode === 'signup' ? 'signup' : 'signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // Sign In Form State
  const [signInData, setSignInData] = useState({
    email: '',
    password: '',
  });

  // Sign Up Form State
  const [signUpData, setSignUpData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setErrorMsg('');
    setSuccessMsg('');
    setActiveTab(initialMode === 'signup' ? 'signup' : 'signin');
  }, [initialMode]);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 75,
        origin: { y: 0.6 },
        colors: ['#00f2fe', '#38bdf8', '#818cf8', '#c084fc', '#ffffff']
      });
    } catch {}
  };

  // 1-Click Instant VIP Guest Login
  const handleGuestLogin = () => {
    soundEffects.playSuccess();
    triggerConfetti();

    const guestUser = {
      name: 'Guest Client',
      email: 'guest@aetherstudios.dev',
      role: 'Guest Explorer',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80',
      projectId: 'AE-GUEST-001',
      projectTitle: 'New Project Workspace',
      accountType: 'guest',
      isGuest: true
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
      setErrorMsg('Password must be at least 6 characters.');
      soundEffects.playClick();
      return;
    }

    soundEffects.playSuccess();
    triggerConfetti();

    const user = {
      name: signInData.email.split('@')[0],
      email: signInData.email,
      role: 'Client',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      projectId: 'A-2847',
      projectTitle: 'E-Commerce Website',
      accountType: 'business'
    };

    onLoginSuccess(user);
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
      setErrorMsg('Password must contain at least 6 characters.');
      soundEffects.playClick();
      return;
    }
    if (signUpData.password !== signUpData.confirmPassword) {
      setErrorMsg('Passwords do not match. Please verify.');
      soundEffects.playClick();
      return;
    }

    soundEffects.playSuccess();
    triggerConfetti();

    const newUser = {
      name: signUpData.fullName,
      email: signUpData.email,
      role: 'Client',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
      projectId: 'A-2847',
      projectTitle: 'E-Commerce Website',
      accountType: 'business'
    };

    onLoginSuccess(newUser);
  };

  // Social SSO Simulation
  const handleSocialLogin = (provider) => {
    soundEffects.playSuccess();
    triggerConfetti();
    const user = {
      name: provider === 'google' ? 'Alex Rivera' : 'Dev Explorer',
      email: provider === 'google' ? 'alex.rivera@gmail.com' : 'dev@github.com',
      role: 'Client',
      avatar: provider === 'google' 
        ? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&q=80'
        : 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=150&q=80',
      projectId: 'A-2847',
      projectTitle: 'E-Commerce Website',
      accountType: 'business'
    };
    onLoginSuccess(user);
  };

  const isLogin = activeTab === 'signin';

  return (
    <div className="min-h-screen bg-[#03060E] text-slate-100 flex flex-col relative overflow-x-hidden selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* 3D Stardust & Glass Orbs Canvas */}
      <AuthCanvas3D mode={activeTab} theme={currentTheme} />

      {/* Top Header Bar */}
      <header className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-8 py-5 flex items-center justify-between">
        <div onClick={onBack} className="cursor-pointer">
          <AetherLogo showText={true} />
        </div>

        <button
          onClick={() => {
            soundEffects.playClick();
            onBack();
          }}
          className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-mono text-slate-300 hover:text-white transition-all group active:scale-95 shadow-sm"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-cyan-400 group-hover:-translate-x-1 transition-transform" />
          <span>Return to Home</span>
        </button>
      </header>

      {/* Main Dual-Stage Content Grid */}
      <main className="relative z-20 flex-grow flex items-center justify-center py-6 sm:py-10 px-4 sm:px-8">
        <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
          
          {/* LEFT STAGE: Branding, 3D Hero Artwork & Feature Bullets */}
          <div className="lg:col-span-6 relative flex flex-col justify-between text-left min-h-[520px]">
            
            {/* 3D Background Artwork matching Mockup */}
            <div className="absolute inset-0 -z-10 rounded-3xl overflow-hidden opacity-90 pointer-events-none">
              <img 
                src={isLogin ? '/aether_auth_login_art.jpg' : '/aether_auth_signup_art.jpg'} 
                alt={isLogin ? '3D Aether Monolith' : '3D Aether Crystal'}
                className="w-full h-full object-cover object-center scale-105 transition-all duration-700 filter brightness-95"
              />
              {/* Radial gradient shading to blend text cleanly */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#03060E]/95 via-[#03060E]/75 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#03060E] via-transparent to-transparent" />
            </div>

            {/* Top Text Content */}
            <div className="space-y-4 pt-4 relative z-10 max-w-md">
              
              {/* Category Pill matching Mockup */}
              <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-wider text-cyan-400">
                <span>→</span>
                <span>{isLogin ? 'WELCOME BACK' : 'GET STARTED'}</span>
              </div>

              {/* Headline matching Mockup */}
              <h1 className="text-3xl sm:text-5xl font-display font-extrabold text-white leading-[1.12] tracking-tight">
                {isLogin ? (
                  <>
                    Great to <br />
                    see you <span className="text-[#A855F7] drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">again</span>
                  </>
                ) : (
                  <>
                    Create <span className="text-[#A855F7] drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">Your</span> <br />
                    <span className="text-[#A855F7] drop-shadow-[0_0_25px_rgba(168,85,247,0.4)]">Account</span>
                  </>
                )}
              </h1>

              {/* Subtitle matching Mockup */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                {isLogin
                  ? 'Log in to continue your journey and bring your ideas to life.'
                  : 'Join Aether Studios and start turning your ideas into reality.'}
              </p>

              {/* 3 Feature Bullets matching Mockup */}
              <div className="space-y-3 pt-3">
                {isLogin ? (
                  <>
                    {/* Feature 1 */}
                    <div className="flex items-center gap-3.5 group">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-105 transition-transform">
                        <BarChart2 className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white leading-snug">Track your projects</div>
                        <div className="text-[11px] text-slate-400">See real-time updates</div>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-center gap-3.5 group">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-105 transition-transform">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white leading-snug">Direct communication</div>
                        <div className="text-[11px] text-slate-400">Talk to your developer</div>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-center gap-3.5 group">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0 text-cyan-400 group-hover:scale-105 transition-transform">
                        <ShieldCheck className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white leading-snug">Secure & private</div>
                        <div className="text-[11px] text-slate-400">Your ideas are safe with us</div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Feature 1 */}
                    <div className="flex items-center gap-3.5 group">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0 text-purple-400 group-hover:scale-105 transition-transform">
                        <Rocket className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white leading-snug">Build your dream projects</div>
                        <div className="text-[11px] text-slate-400">From websites to mobile apps</div>
                      </div>
                    </div>

                    {/* Feature 2 */}
                    <div className="flex items-center gap-3.5 group">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0 text-purple-400 group-hover:scale-105 transition-transform">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white leading-snug">Get real-time updates</div>
                        <div className="text-[11px] text-slate-400">Track progress anytime</div>
                      </div>
                    </div>

                    {/* Feature 3 */}
                    <div className="flex items-center gap-3.5 group">
                      <div className="w-10 h-10 rounded-xl bg-white/[0.08] border border-white/10 flex items-center justify-center shrink-0 text-purple-400 group-hover:scale-105 transition-transform">
                        <Users className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="text-xs font-bold text-white leading-snug">Work with expert developers</div>
                        <div className="text-[11px] text-slate-400">Skilled, reliable, and dedicated</div>
                      </div>
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Bottom Left Switch Link matching Mockup */}
            <div className="pt-6 relative z-10 text-xs text-slate-400">
              {isLogin ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setErrorMsg('');
                      setSuccessMsg('');
                      setActiveTab('signup');
                    }}
                    className="text-[#A855F7] hover:text-[#C084FC] font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    <span>Sign up</span>
                    <span>→</span>
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => {
                      soundEffects.playClick();
                      setErrorMsg('');
                      setSuccessMsg('');
                      setActiveTab('signin');
                    }}
                    className="text-[#A855F7] hover:text-[#C084FC] font-semibold transition-colors inline-flex items-center gap-1"
                  >
                    <span>Log in</span>
                    <span>→</span>
                  </button>
                </p>
              )}
            </div>

          </div>

          {/* RIGHT STAGE: Form Card Console matching Mockup */}
          <div className="lg:col-span-6 flex justify-center w-full">
            <div className="w-full max-w-md bg-[#090D18]/90 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-md text-slate-100 flex flex-col relative z-20">
              
              {/* Header Title & Subtitle matching Mockup */}
              <div className="text-left mb-5">
                <h2 className="text-2xl font-display font-extrabold text-white">
                  {isLogin ? 'Log In' : 'Sign Up'}
                </h2>
                <p className="text-xs text-slate-400 mt-1">
                  {isLogin 
                    ? 'Enter your email and password to access your account' 
                    : 'Create your account to get started'}
                </p>
              </div>

              {/* Status Alerts */}
              {successMsg && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2 text-left">
                  <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                  <span>{successMsg}</span>
                </div>
              )}

              {errorMsg && (
                <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 text-left">
                  <AlertCircle className="w-4 h-4 shrink-0 text-rose-400" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* 1-CLICK INSTANT VIP GUEST BUTTON (FAST ACCESS) */}
              <button
                type="button"
                onClick={handleGuestLogin}
                className="mb-4 w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-cyan-950/70 via-slate-900 to-purple-950/70 border border-cyan-400/40 hover:border-cyan-300 text-xs font-mono font-bold text-cyan-300 hover:text-white flex items-center justify-between transition-all group shadow-sm active:scale-[0.99]"
              >
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>1-Click Instant Guest Access</span>
                </span>
                <span className="text-[10px] bg-cyan-400/20 text-cyan-200 px-2 py-0.5 rounded-full">
                  Zero Password →
                </span>
              </button>

              {/* FORM: LOG IN OR SIGN UP */}
              {isLogin ? (
                /* LOG IN FORM matching Top-Left Mockup */
                <form onSubmit={handleSignInSubmit} className="space-y-4 text-left">
                  
                  {/* Email address */}
                  <div>
                    <label className="text-xs font-sans text-slate-300 block mb-1.5 font-medium">
                      Email address :
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={signInData.email}
                        onChange={(e) => setSignInData({ ...signInData, email: e.target.value })}
                        className="w-full bg-[#0D1220] border border-white/15 rounded-xl px-4 py-2.5 pl-10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs font-sans text-slate-300 block mb-1.5 font-medium">
                      Password :
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="••••••••••••"
                        value={signInData.password}
                        onChange={(e) => setSignInData({ ...signInData, password: e.target.value })}
                        className="w-full bg-[#0D1220] border border-white/15 rounded-xl px-4 py-2.5 pl-10 pr-10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      />
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-3 text-slate-400 hover:text-white transition-colors"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>

                    <div className="text-right mt-1.5">
                      <button
                        type="button"
                        onClick={() => {
                          soundEffects.playSuccess();
                          setSuccessMsg('A password recovery dispatch has been sent to your email.');
                        }}
                        className="text-[11px] text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                      >
                        Forgot password?
                      </button>
                    </div>
                  </div>

                  {/* Primary CTA: Log In → matching gradient from mockup */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-display font-bold text-xs text-white bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#A855F7] hover:opacity-95 shadow-[0_0_20px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                  >
                    <span>Log In</span>
                    <span>→</span>
                  </button>

                  {/* Divider matching Mockup */}
                  <div className="relative my-3 flex items-center justify-center">
                    <div className="border-t border-white/10 w-full" />
                    <span className="bg-[#090D18] px-3 text-[11px] text-slate-500 font-mono">or</span>
                    <div className="border-t border-white/10 w-full" />
                  </div>

                  {/* Social SSO: Google & GitHub matching Mockup */}
                  <div className="space-y-2.5">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('google')}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-xs text-slate-200 hover:text-white flex items-center justify-center gap-2.5 transition-colors"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                      <span>Continue with Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialLogin('github')}
                      className="w-full py-2.5 px-4 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-xs text-slate-200 hover:text-white flex items-center justify-center gap-2.5 transition-colors"
                    >
                      <svg className="w-4 h-4 fill-current text-slate-200" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      <span>Continue with GitHub</span>
                    </button>
                  </div>

                </form>
              ) : (
                /* SIGN UP FORM matching Top-Right Mockup */
                <form onSubmit={handleSignUpSubmit} className="space-y-3.5 text-left">
                  
                  {/* Full Name */}
                  <div>
                    <label className="text-xs font-sans text-slate-300 block mb-1 font-medium">
                      Full Name :
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        value={signUpData.fullName}
                        onChange={(e) => setSignUpData({ ...signUpData, fullName: e.target.value })}
                        className="w-full bg-[#0D1220] border border-white/15 rounded-xl px-4 py-2 pl-10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                      <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                    </div>
                  </div>

                  {/* Email address */}
                  <div>
                    <label className="text-xs font-sans text-slate-300 block mb-1 font-medium">
                      Email address :
                    </label>
                    <div className="relative">
                      <input
                        type="email"
                        required
                        placeholder="you@example.com"
                        value={signUpData.email}
                        onChange={(e) => setSignUpData({ ...signUpData, email: e.target.value })}
                        className="w-full bg-[#0D1220] border border-white/15 rounded-xl px-4 py-2 pl-10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                      <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                    </div>
                  </div>

                  {/* Password */}
                  <div>
                    <label className="text-xs font-sans text-slate-300 block mb-1 font-medium">
                      Password :
                    </label>
                    <div className="relative">
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        placeholder="Create a strong password"
                        value={signUpData.password}
                        onChange={(e) => setSignUpData({ ...signUpData, password: e.target.value })}
                        className="w-full bg-[#0D1220] border border-white/15 rounded-xl px-4 py-2 pl-10 pr-10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3.5 top-2.5 text-slate-400 hover:text-white"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <label className="text-xs font-sans text-slate-300 block mb-1 font-medium">
                      Confirm Password :
                    </label>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? 'text' : 'password'}
                        required
                        placeholder="Confirm your password"
                        value={signUpData.confirmPassword}
                        onChange={(e) => setSignUpData({ ...signUpData, confirmPassword: e.target.value })}
                        className="w-full bg-[#0D1220] border border-white/15 rounded-xl px-4 py-2 pl-10 pr-10 text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                      />
                      <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-2.5" />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3.5 top-2.5 text-slate-400 hover:text-white"
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Primary CTA: Create Account → */}
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl font-display font-bold text-xs text-white bg-gradient-to-r from-[#4F46E5] via-[#6366F1] to-[#A855F7] hover:opacity-95 shadow-[0_0_20px_rgba(99,102,241,0.35)] flex items-center justify-center gap-2 active:scale-[0.98] transition-all"
                  >
                    <span>Create Account</span>
                    <span>→</span>
                  </button>

                  {/* Divider */}
                  <div className="relative my-2.5 flex items-center justify-center">
                    <div className="border-t border-white/10 w-full" />
                    <span className="bg-[#090D18] px-3 text-[11px] text-slate-500 font-mono">or</span>
                    <div className="border-t border-white/10 w-full" />
                  </div>

                  {/* Social Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleSocialLogin('google')}
                      className="py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-[11px] text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"/>
                        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.15 0 9.92 0 12s.45 3.85 1.24 5.42l4.04-3.15z"/>
                        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                      </svg>
                      <span>Google</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleSocialLogin('github')}
                      className="py-2 px-3 rounded-xl bg-white/[0.04] hover:bg-white/[0.08] border border-white/15 text-[11px] text-slate-200 hover:text-white flex items-center justify-center gap-2 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5 fill-current text-slate-200" viewBox="0 0 24 24">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                      </svg>
                      <span>GitHub</span>
                    </button>
                  </div>

                  {/* Footnote Terms Agreement */}
                  <p className="text-[10px] text-slate-400 pt-1 text-center leading-normal">
                    By creating an account, you agree to our{' '}
                    <button type="button" onClick={onOpenTerms} className="text-[#38BDF8] hover:underline">
                      Terms of Service
                    </button>{' '}
                    and{' '}
                    <button type="button" onClick={onOpenPrivacy} className="text-[#38BDF8] hover:underline">
                      Privacy Policy
                    </button>
                    .
                  </p>

                </form>
              )}

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}
