import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Menu, 
  X, 
  ArrowRight, 
  User, 
  LogIn, 
  LogOut, 
  ChevronDown, 
  Terminal, 
  ShieldCheck, 
  Sparkles,
  ExternalLink
} from 'lucide-react';
import AetherLogo from './AetherLogo';
import { soundEffects } from '../../utils/soundFx';

export default function Navbar({ 
  onOpenIntake, 
  activeSection, 
  onNavigate,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenClientPortal
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted());
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleSound = () => {
    const nextMuted = soundEffects.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) soundEffects.playClick();
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'pricing', label: 'Pricing' },
    { id: 'resources', label: 'Resources' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (id) => {
    soundEffects.playClick();
    onNavigate(id);
    setMobileOpen(false);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'py-3.5 bg-[#05070B]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div onClick={() => handleNavClick('home')} className="cursor-pointer">
          <AetherLogo />
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-7 text-xs font-medium text-slate-300">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              onMouseEnter={() => soundEffects.playHover()}
              className={`transition-colors relative py-1 hover:text-white ${
                activeSection === item.id ? 'text-white font-semibold' : 'text-slate-400'
              }`}
            >
              {item.label}
              {activeSection === item.id && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[rgb(var(--color-primary))] rounded-full shadow-[0_0_8px_rgb(var(--color-primary))]" />
              )}
            </button>
          ))}
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          
          {/* Quick Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundEffects.playHover()}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[rgb(var(--color-primary))]" />}
          </button>

          {/* User Auth or Profile Dropdown */}
          {currentUser ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setUserDropdownOpen(!userDropdownOpen);
                }}
                className="flex items-center gap-2 pl-2 pr-3 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/15 transition-all text-xs font-mono"
              >
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-6 h-6 rounded-full object-cover border border-cyan-400/50" 
                />
                <span className="text-white font-bold max-w-[100px] truncate">
                  {currentUser.name}
                </span>
                <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {/* Profile Dropdown Menu */}
              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-[#0A0D14] border border-white/15 shadow-2xl p-3 space-y-2 z-50 animate-in fade-in zoom-in-95 duration-150 text-left">
                  
                  {/* User Meta Header */}
                  <div className="p-2.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="text-xs font-display font-bold text-white truncate">
                      {currentUser.name}
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 truncate">
                      {currentUser.email}
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 text-[9px] font-mono text-cyan-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      <span>{currentUser.role || 'Active Client'}</span>
                    </div>
                  </div>

                  {/* Dropdown Options */}
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setUserDropdownOpen(false);
                        onOpenClientPortal();
                      }}
                      className="w-full p-2 rounded-xl hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center justify-between transition-colors"
                    >
                      <span className="flex items-center gap-2">
                        <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Client Project Portal</span>
                      </span>
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-bold">
                        Live
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setUserDropdownOpen(false);
                        onOpenIntake();
                      }}
                      className="w-full p-2 rounded-xl hover:bg-white/10 text-xs font-mono text-slate-300 hover:text-white flex items-center gap-2 transition-colors"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-purple-400" />
                      <span>New Project Intake</span>
                    </button>

                    <button
                      onClick={() => {
                        soundEffects.playClick();
                        setUserDropdownOpen(false);
                        onLogout();
                      }}
                      className="w-full p-2 rounded-xl hover:bg-rose-500/10 text-xs font-mono text-rose-300 hover:text-rose-200 flex items-center gap-2 transition-colors pt-2 border-t border-white/5"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Sign Out</span>
                    </button>
                  </div>

                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                soundEffects.playClick();
                onOpenAuth('signin');
              }}
              onMouseEnter={() => soundEffects.playHover()}
              className="px-3 sm:px-4 py-2 rounded-full text-xs font-mono text-slate-300 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5"
            >
              <LogIn className="w-3.5 h-3.5 text-cyan-400" />
              <span>Sign In</span>
            </button>
          )}

          {/* Start a Project Pill CTA */}
          <button
            onClick={() => {
              soundEffects.playClick();
              onOpenIntake();
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs font-display font-bold text-white border border-white/20 hover:border-white/40 bg-white/5 hover:bg-white/10 transition-all duration-300 flex items-center gap-2 shadow-lg group active:scale-95"
          >
            <span>Start a Project</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-xl text-slate-300 hover:text-white"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-b border-white/10 px-6 py-6 mt-3 space-y-4 animate-in slide-in-from-top-4 duration-200 text-left">
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <AetherLogo showText={true} />
            <button onClick={() => setMobileOpen(false)} className="text-slate-400">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2 py-2">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full text-left py-2 text-sm font-medium transition-colors ${
                  activeSection === item.id ? 'text-[rgb(var(--color-primary))] font-bold' : 'text-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Mobile Auth / Profile */}
          <div className="pt-3 border-t border-white/10 space-y-2">
            {currentUser ? (
              <div className="space-y-2">
                <div className="p-3 rounded-xl bg-white/5 flex items-center gap-3">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-8 h-8 rounded-full object-cover border border-cyan-400" 
                  />
                  <div>
                    <div className="text-xs font-bold text-white">{currentUser.name}</div>
                    <div className="text-[10px] font-mono text-slate-400">{currentUser.email}</div>
                  </div>
                </div>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setMobileOpen(false);
                    onOpenClientPortal();
                  }}
                  className="w-full py-2.5 rounded-xl bg-white/10 text-xs font-mono text-cyan-300 flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  <span>Open Client Portal</span>
                </button>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    setMobileOpen(false);
                    onLogout();
                  }}
                  className="w-full py-2 rounded-xl bg-rose-500/10 text-xs font-mono text-rose-300 flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  soundEffects.playClick();
                  setMobileOpen(false);
                  onOpenAuth('signin');
                }}
                className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-mono text-white flex items-center justify-center gap-2"
              >
                <LogIn className="w-4 h-4 text-cyan-400" />
                <span>Sign In / Register</span>
              </button>
            )}

            <button
              onClick={() => {
                soundEffects.playClick();
                setMobileOpen(false);
                onOpenIntake();
              }}
              className="w-full py-3 rounded-full font-display font-bold text-xs text-white bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] flex items-center justify-center gap-2 shadow-lg"
            >
              <span>Start a Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
