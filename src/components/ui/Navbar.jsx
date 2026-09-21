import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, ArrowRight } from 'lucide-react';
import AetherLogo from './AetherLogo';
import { soundEffects } from '../../utils/soundFx';

export default function Navbar({ onOpenIntake, activeSection, onNavigate }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
          ? 'py-3.5 bg-[#05070B]/85 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div onClick={() => handleNavClick('home')}>
          <AetherLogo />
        </div>

        {/* Desktop Nav Items from Design */}
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

        {/* Action Controls from Design */}
        <div className="flex items-center gap-3">
          {/* Quick Sound Toggle */}
          <button
            onClick={toggleSound}
            onMouseEnter={() => soundEffects.playHover()}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-[rgb(var(--color-primary))]" />}
          </button>

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

      {/* Mobile Menu Drawer matching design */}
      {mobileOpen && (
        <div className="md:hidden glass-card border-b border-white/10 px-6 py-6 mt-3 space-y-4 animate-in slide-in-from-top-4 duration-200">
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

          <div className="pt-3 border-t border-white/10">
            <button
              onClick={() => {
                soundEffects.playClick();
                setMobileOpen(false);
                onOpenIntake();
              }}
              className="w-full py-3 rounded-full font-display font-bold text-xs text-white bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] flex items-center justify-center gap-2"
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
