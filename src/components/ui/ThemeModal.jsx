import React from 'react';
import { X, Check } from 'lucide-react';
import { soundEffects } from '../../utils/soundFx';

const themes = [
  { id: 'cyan', name: 'Neon Cyan', color: '#00F2FE', glow: 'rgba(0, 242, 254, 0.45)' },
  { id: 'violet', name: 'Cyber Violet', color: '#A855F7', glow: 'rgba(168, 85, 247, 0.45)' },
  { id: 'emerald', name: 'Emerald Matrix', color: '#10B981', glow: 'rgba(16, 185, 129, 0.45)' },
  { id: 'gold', name: 'Solar Gold', color: '#F59E0B', glow: 'rgba(245, 158, 11, 0.45)' },
];

export default function ThemeModal({ isOpen, onClose, currentTheme, onThemeChange }) {
  if (!isOpen) return null;

  const handleSelect = (id) => {
    soundEffects.playClick();
    onThemeChange(id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative glass-card max-w-lg w-full rounded-3xl border border-white/20 p-8 shadow-2xl z-10 text-center">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-2xl font-display font-extrabold text-white mb-1">
          Choose Your Theme
        </h3>
        <p className="text-xs text-slate-400 font-mono mb-8">
          Four unique themes, Find your vibe.
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {themes.map((t) => {
            const isSelected = currentTheme === t.id;
            return (
              <button
                key={t.id}
                onClick={() => handleSelect(t.id)}
                onMouseEnter={() => soundEffects.playHover()}
                className={`flex flex-col items-center p-4 rounded-2xl border transition-all ${
                  isSelected
                    ? 'border-white bg-white/15 scale-105 shadow-xl'
                    : 'border-white/10 bg-black/40 hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {/* Glowing Circle Swatch matching design */}
                <div 
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-3 relative transition-transform"
                  style={{
                    backgroundColor: t.color,
                    boxShadow: `0 0 25px ${t.glow}`,
                  }}
                >
                  <div className="w-11 h-11 rounded-full bg-black/40 flex items-center justify-center border border-white/30">
                    {isSelected && <Check className="w-5 h-5 text-white stroke-[3]" />}
                  </div>
                </div>

                <span className="text-xs font-display font-bold text-white">
                  {t.name}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
