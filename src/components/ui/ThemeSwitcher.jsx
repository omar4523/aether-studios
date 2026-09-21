import React, { useState } from 'react';
import { Palette, Check } from 'lucide-react';
import { soundEffects } from '../../utils/soundFx';

const themes = [
  { id: 'cyan', name: 'Neon Cyan', color: '#00F2FE' },
  { id: 'violet', name: 'Cyber Violet', color: '#A855F7' },
  { id: 'emerald', name: 'Emerald Matrix', color: '#10B981' },
  { id: 'gold', name: 'Solar Gold', color: '#F59E0B' },
];

export default function ThemeSwitcher({ currentTheme, onThemeChange }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (id) => {
    soundEffects.playClick();
    onThemeChange(id);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => {
          soundEffects.playClick();
          setIsOpen(!isOpen);
        }}
        onMouseEnter={() => soundEffects.playHover()}
        className="p-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all flex items-center gap-1.5 text-xs font-mono"
        title="Change Color Theme"
      >
        <Palette className="w-4 h-4 text-[rgb(var(--color-primary))]" />
        <span className="hidden sm:inline capitalize">{currentTheme}</span>
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 mt-2 w-44 rounded-2xl glass-card border border-white/15 p-2 shadow-2xl z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="px-2 py-1.5 text-[10px] font-mono uppercase tracking-wider text-slate-400">
              Select Accent Theme
            </div>
            <div className="space-y-1">
              {themes.map((t) => (
                <button
                  key={t.id}
                  onClick={() => handleSelect(t.id)}
                  onMouseEnter={() => soundEffects.playHover()}
                  className={`w-full flex items-center justify-between px-2.5 py-1.5 rounded-lg text-xs transition-colors ${
                    currentTheme === t.id
                      ? 'bg-white/15 text-white font-medium'
                      : 'text-slate-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3 h-3 rounded-full shadow-sm"
                      style={{ backgroundColor: t.color, boxShadow: `0 0 8px ${t.color}` }}
                    />
                    <span>{t.name}</span>
                  </div>
                  {currentTheme === t.id && <Check className="w-3.5 h-3.5 text-[rgb(var(--color-primary))]" />}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
