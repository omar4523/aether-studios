import React, { useState } from 'react';
import { Volume2, VolumeX, Palette } from 'lucide-react';
import { soundEffects } from '../../utils/soundFx';

const themes = [
  { id: 'cyan', name: 'Neon Cyan', color: '#00F2FE' },
  { id: 'violet', name: 'Cyber Violet', color: '#A855F7' },
  { id: 'emerald', name: 'Emerald Matrix', color: '#10B981' },
  { id: 'gold', name: 'Solar Gold', color: '#F59E0B' },
];

export default function FloatingSideDock({ currentTheme, onThemeChange, onOpenThemeModal }) {
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted());

  const toggleSound = () => {
    const nextMuted = soundEffects.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) soundEffects.playClick();
  };

  return (
    <div className="fixed right-5 top-32 z-40 hidden md:flex flex-col items-center gap-3 p-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/15 shadow-2xl animate-in fade-in slide-in-from-right duration-300">
      {/* Audio Button */}
      <button
        onClick={toggleSound}
        onMouseEnter={() => soundEffects.playHover()}
        className={`w-9 h-9 rounded-full flex flex-col items-center justify-center transition-all ${
          isMuted ? 'text-slate-500 hover:text-slate-300' : 'text-[rgb(var(--color-primary))] bg-white/10 shadow-[0_0_12px_rgba(0,242,254,0.3)]'
        }`}
        title={isMuted ? "Sound Off (Click to turn on)" : "Sound On (Click to mute)"}
      >
        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        <span className="text-[7px] font-mono uppercase tracking-tighter scale-90 -mt-0.5">Sound</span>
      </button>

      {/* Divider */}
      <div className="w-4 h-[1px] bg-white/15" />

      {/* Theme Picker Dots */}
      <div className="flex flex-col items-center gap-2 py-1">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => {
              soundEffects.playClick();
              onThemeChange(t.id);
            }}
            onMouseEnter={() => soundEffects.playHover()}
            className={`w-3.5 h-3.5 rounded-full transition-all duration-200 ${
              currentTheme === t.id
                ? 'scale-125 ring-2 ring-white ring-offset-2 ring-offset-black'
                : 'opacity-60 hover:opacity-100 hover:scale-110'
            }`}
            style={{ 
              backgroundColor: t.color, 
              boxShadow: currentTheme === t.id ? `0 0 10px ${t.color}` : 'none' 
            }}
            title={t.name}
          />
        ))}

        {/* Theme Palette icon button */}
        <button
          onClick={() => {
            soundEffects.playClick();
            onOpenThemeModal();
          }}
          onMouseEnter={() => soundEffects.playHover()}
          className="w-7 h-7 rounded-full flex items-center justify-center text-slate-400 hover:text-white transition-colors mt-1"
          title="Open Theme Showcase"
        >
          <Palette className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
