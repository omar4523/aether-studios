import React, { useState } from 'react';
import { 
  Star, 
  MessageSquare, 
  ChevronDown, 
  CheckCircle2, 
  Quote, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import TiltCard from '../3d/TiltCard';
import { soundEffects } from '../../utils/soundFx';

const testimonials = [
  {
    name: "Marcus Vance",
    role: "Founder, Lumina Apparel (UK)",
    rating: 5,
    tag: "E-Commerce Client",
    review: "Aether Studios gave our fashion brand an online presence that punches way above our weight. The custom 3D model visualizer and instant checkout doubled our average order value within our first month.",
  },
  {
    name: "Amina Al-Mansoor",
    role: "Computer Science Senior (Stanford)",
    rating: 5,
    tag: "Capstone Project",
    review: "I was drowning in coursework and had 3 weeks left for my deep-learning capstone. The team built an incredible React + PyTorch portal, complete with 40-page LaTeX documentation. My professor awarded our team 99/100!",
  },
  {
    name: "David Chen",
    role: "CTO, OmniFlow SaaS",
    rating: 5,
    tag: "Startup Client",
    review: "Hiring Aether was 10x faster and cheaper than recruiting local engineers. Clean TypeScript code, Supabase integration, and they handled Vercel CI/CD flawlessly. Will definitely keep them on retainer.",
  },
  {
    name: "Sarah Jenkins",
    role: "Local Bakery & Cafe Owner",
    rating: 5,
    tag: "Everyday Business",
    review: "I had no idea how websites worked. The team made it so simple! They set up our online ordering, Google Maps listing, and mobile menu in 4 days. Customers constantly compliment how fast the site is.",
  }
];

const faqs = [
  {
    question: "Do I get 100% full ownership of the source code?",
    answer: "Yes, absolutely. Once final delivery and payment are complete, all copyright, source code, repository rights, and deployment assets are fully transferred to you. We retain zero claims to your intellectual property."
  },
  {
    question: "How does the student discount work?",
    answer: "Students from any accredited university or college qualify for our 40% academic grant. Simply use promo code STUDENT40 or upload your university student ID/email during project intake."
  },
  {
    question: "What is your typical turnaround time?",
    answer: "Rapid landing pages and student capstone prototypes take as little as 48 to 72 hours. Full-stack e-commerce stores take 3 to 7 days, and custom multi-tenant SaaS applications take 2 to 3 weeks."
  },
  {
    question: "Can I request revisions if I want something changed?",
    answer: "Every project package includes unlimited minor revisions during the staging review phase. We don't consider a project finished until you test it live and give 100% approval."
  },
  {
    question: "Can you sign a Non-Disclosure Agreement (NDA)?",
    answer: "Yes. For proprietary startup concepts and research projects, we routinely sign bilateral NDAs before discussing technical specifications or reviewing private documents."
  }
];

export default function TestimonialsSection() {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    soundEffects.playClick();
    setOpenFaq(openFaq === index ? -1 : index);
  };

  return (
    <section className="relative py-28 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Testimonials Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono text-[rgb(var(--color-primary))] mb-4">
            <Star className="w-3.5 h-3.5 fill-[rgb(var(--color-primary))]" />
            <span>CLIENT & STUDENT REPUTATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            Trusted by Creators, <br />
            <span className="text-gradient-primary">Startups & Top Students.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            See what real clients and graduates say about our delivery speed, engineering quality, and hands-on support.
          </p>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-28">
          {testimonials.map((t, idx) => (
            <TiltCard 
              key={idx} 
              className="glass-card p-8 border border-white/10 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-white/5 text-[rgb(var(--color-primary))] border border-[rgb(var(--color-primary))]/20">
                    {t.tag}
                  </span>
                </div>

                <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                  "{t.review}"
                </p>
              </div>

              <div className="flex items-center gap-3 pt-4 border-t border-white/10">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] p-[1px]">
                  <div className="w-full h-full bg-[#0a0d14] rounded-full flex items-center justify-center font-display font-bold text-xs text-white">
                    {t.name[0]}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-display font-bold text-white">
                    {t.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">
                    {t.role}
                  </p>
                </div>
              </div>
            </TiltCard>
          ))}
        </div>

        {/* FAQ Accordion Section */}
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono uppercase tracking-wider text-[rgb(var(--color-primary))] block mb-2 font-semibold">
              Got Questions?
            </span>
            <h3 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Frequently Asked Questions
            </h3>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = openFaq === index;
              return (
                <div
                  key={index}
                  className="glass-card rounded-xl border border-white/10 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    onMouseEnter={() => soundEffects.playHover()}
                    className="w-full px-6 py-4 text-left flex items-center justify-between gap-4"
                  >
                    <span className="text-sm font-semibold text-white">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 transition-transform duration-200 shrink-0 ${
                        isOpen ? 'rotate-180 text-[rgb(var(--color-primary))]' : ''
                      }`}
                    />
                  </button>

                  {isOpen && (
                    <div className="px-6 pb-5 pt-1 text-xs text-slate-400 leading-relaxed border-t border-white/5 animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
