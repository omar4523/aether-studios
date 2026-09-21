import React, { useState } from 'react';
import { Volume2, VolumeX, ArrowRight } from 'lucide-react';
import { soundEffects } from '../../utils/soundFx';

export default function SoundWidget() {
  const [isMuted, setIsMuted] = useState(soundEffects.isMuted());

  const toggleSound = () => {
    const nextMuted = soundEffects.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) soundEffects.playClick();
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Sound Toggle Widget matching the design image (bottom right) */}
      <button
        onClick={toggleSound}
        onMouseEnter={() => soundEffects.playHover()}
        className={`px-4 py-2.5 rounded-full flex items-center gap-2.5 transition-all duration-300 shadow-2xl backdrop-blur-xl border ${
          !isMuted
            ? 'bg-black/80 border-cyan-400/50 text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.35)]'
            : 'bg-black/70 border-white/10 text-slate-400 hover:text-white'
        }`}
        title="Toggle Ambient Interface Sound"
      >
        <div className={`p-1 rounded-full ${!isMuted ? 'bg-cyan-400/20 text-cyan-300' : 'text-slate-500'}`}>
          {!isMuted ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
        </div>
        <span className="text-xs font-display font-bold">
          {!isMuted ? 'Sound On' : 'Sound Off'}
        </span>
        <ArrowRight className="w-3 h-3 text-cyan-400" />
      </button>
    </div>
  );
}
