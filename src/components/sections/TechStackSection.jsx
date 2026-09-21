import React from 'react';
import { 
  Code2, 
  Cpu, 
  Database, 
  Globe, 
  Server, 
  Sparkles, 
  ShieldCheck, 
  Layers 
} from 'lucide-react';
import TiltCard from '../3d/TiltCard';

const technologies = [
  { name: 'React 18 & 19', role: 'Frontend Ecosystem', level: 'Mastery', color: '#00F2FE' },
  { name: 'Three.js & WebGL', role: '3D Graphics & Shaders', level: 'Advanced', color: '#8A2387' },
  { name: 'Next.js 15 (App Router)', role: 'Full-Stack Framework', level: 'Production', color: '#FFFFFF' },
  { name: 'Python & PyTorch', role: 'AI / ML Models & Data', level: 'Research', color: '#38BDF8' },
  { name: 'Tailwind CSS', role: 'Design Systems & UI', level: 'Mastery', color: '#38BDF8' },
  { name: 'PostgreSQL & Supabase', role: 'Relational Cloud DB', level: 'Enterprise', color: '#34D399' },
  { name: 'Node.js & FastAPI', role: 'High-Concurrency APIs', level: 'Production', color: '#22C55E' },
  { name: 'Docker & AWS Cloud', role: 'DevOps & Orchestration', level: 'Automated', color: '#F59E0B' },
  { name: 'Stripe & PayPal SDK', role: 'Payments & Checkouts', level: 'Certified', color: '#6366F1' },
  { name: 'LaTeX & IEEE Overleaf', role: 'Academic Documentation', level: 'Academic A+', color: '#10B981' },
  { name: 'ESP32 & IoT MQTT', role: 'Hardware & Mechatronics', level: 'Embedded', color: '#EF4444' },
  { name: 'React Native / Flutter', role: 'Mobile iOS & Android', level: 'Cross-Platform', color: '#EC4899' },
];

export default function TechStackSection() {
  return (
    <section className="relative py-28 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono text-[rgb(var(--color-primary))] mb-4">
            <Cpu className="w-3.5 h-3.5" />
            <span>MODERN PRODUCTION INFRASTRUCTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            Built on Battle-Tested, <br />
            <span className="text-gradient-primary">High-Speed Technology.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            We don't use dated templates or bloated drag-and-drop builders. Every project is coded with clean, modular, and scalable modern web architecture.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {technologies.map((tech, idx) => (
            <TiltCard 
              key={idx} 
              className="glass-card p-5 border border-white/10 hover:border-[rgb(var(--color-primary))]/40 group"
            >
              <div className="flex items-center justify-between mb-3">
                <span 
                  className="w-2.5 h-2.5 rounded-full" 
                  style={{ backgroundColor: tech.color, boxShadow: `0 0 8px ${tech.color}` }}
                />
                <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300 border border-white/5">
                  {tech.level}
                </span>
              </div>
              <h4 className="text-sm sm:text-base font-display font-bold text-white group-hover:text-[rgb(var(--color-primary))] transition-colors">
                {tech.name}
              </h4>
              <p className="text-[11px] text-slate-400 font-mono mt-1">
                {tech.role}
              </p>
            </TiltCard>
          ))}
        </div>

      </div>
    </section>
  );
}
