import React, { useState, useMemo } from 'react';
import { Check, ArrowRight, Calculator, Sparkles, Clock, ShieldCheck, GraduationCap } from 'lucide-react';
import { pricingTiers } from '../../data/pricingData';
import { soundEffects } from '../../utils/soundFx';

const customAddons = [
  { id: 'ai', name: 'AI & LLM Integration (OpenAI/Gemini)', price: 90, days: 2 },
  { id: 'payments', name: 'Stripe / Apple Pay Payment Gateway', price: 70, days: 1 },
  { id: 'threejs', name: 'Three.js 3D WebGL Canvas & Shaders', price: 110, days: 3 },
  { id: 'report', name: '35+ Page IEEE Documentation & Slides', price: 45, days: 1 },
  { id: 'seo', name: 'Advanced SEO & Analytics Suite', price: 50, days: 1 },
  { id: 'cms', name: 'Admin CMS / No-Code Content Manager', price: 80, days: 2 },
];

export default function PricingSection({ onOpenIntake, onContactClick }) {
  const [billingCycle, setBillingCycle] = useState('one-time');
  const [showCalculator, setShowCalculator] = useState(false);
  const [baseTier, setBaseTier] = useState('starter');
  const [selectedAddons, setSelectedAddons] = useState(['report']);
  const [isStudent, setIsStudent] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [promoMsg, setPromoMsg] = useState('');

  const handleToggle = (cycle) => {
    soundEffects.playClick();
    setBillingCycle(cycle);
  };

  const toggleAddon = (id) => {
    soundEffects.playClick();
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    soundEffects.playClick();
    if (promoCode.trim().toUpperCase() === 'STUDENT40') {
      setIsStudent(true);
      setPromoMsg('🎉 40% Student Discount Activated!');
      soundEffects.playSuccess();
    } else {
      setPromoMsg('Invalid code. Use STUDENT40 for 40% academic grant.');
    }
  };

  const calculation = useMemo(() => {
    const base = baseTier === 'starter' ? 89 : baseTier === 'business' ? 299 : 599;
    let days = baseTier === 'starter' ? 3 : baseTier === 'business' ? 7 : 14;
    let addonSum = 0;

    selectedAddons.forEach((id) => {
      const a = customAddons.find((item) => item.id === id);
      if (a) {
        addonSum += a.price;
        days += a.days;
      }
    });

    const subtotal = base + addonSum;
    const discount = isStudent ? Math.round(subtotal * 0.40) : 0;
    return {
      subtotal,
      discount,
      total: subtotal - discount,
      days,
    };
  }, [baseTier, selectedAddons, isStudent]);

  return (
    <section id="pricing" className="relative py-24 bg-[#FFFFFF] text-slate-900 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with 3D Crystal from Design */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl text-left">
            <div className="text-[11px] font-mono tracking-widest text-slate-500 uppercase font-bold mb-2">
              — PRICING
            </div>
            <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-slate-950 tracking-tight mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
              No hidden fees. No surprises. Choose the plan that fits your needs, or get a custom quote for larger projects.
            </p>
          </div>

          {/* 3D Crystal Floating Illustration from Design */}
          <div className="hidden lg:flex items-center justify-center pr-8 pointer-events-none">
            <div className="relative w-32 h-32 flex items-center justify-center drop-shadow-2xl">
              <img 
                src="/aether_crystal_purple.jpg" 
                alt="3D Violet Crystal" 
                className="w-full h-full object-cover rounded-3xl animate-float-slow shadow-[0_0_35px_rgba(168,85,247,0.35)] border border-white/40" 
              />
            </div>
          </div>
        </div>

        {/* Monthly / One-Time Toggle Switch from Design */}
        <div className="flex items-center justify-center mb-16">
          <div className="p-1 rounded-full bg-slate-100 border border-slate-200 flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => handleToggle('monthly')}
              className={`px-5 py-2 rounded-full transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-950 shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              Monthly Retainer
            </button>
            <button
              onClick={() => handleToggle('one-time')}
              className={`px-5 py-2 rounded-full transition-all ${
                billingCycle === 'one-time'
                  ? 'bg-slate-950 text-white shadow-sm font-bold'
                  : 'text-slate-500 hover:text-slate-900'
              }`}
            >
              One-Time Project
            </button>
          </div>
        </div>

        {/* 3 Pricing Cards from Design */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-left">
          {pricingTiers.map((tier) => {
            const price = billingCycle === 'monthly' ? tier.priceMonthly : tier.priceOneTime;
            const isPopular = tier.popular;
            return (
              <div
                key={tier.id}
                className={`rounded-3xl p-8 flex flex-col justify-between transition-all duration-300 relative ${
                  isPopular
                    ? 'bg-[#F8FAFC] border-2 border-purple-500/80 shadow-xl'
                    : 'bg-[#FFFFFF] border border-slate-200/90 shadow-sm hover:shadow-lg'
                }`}
              >
                {/* Most Popular Badge from Design */}
                {isPopular && (
                  <div className="absolute -top-3.5 right-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-[10px] font-mono uppercase tracking-wider font-bold px-3 py-1 rounded-full shadow-md">
                    {tier.badge}
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-display font-bold text-slate-950 mb-1">
                    {tier.name}
                  </h3>

                  <div className="flex items-baseline gap-1 my-4">
                    <span className="text-4xl sm:text-5xl font-display font-black text-slate-950">
                      ${price}
                    </span>
                    <span className="text-xs text-slate-500 font-mono">
                      {billingCycle === 'monthly' ? '/month' : ' flat'}
                    </span>
                  </div>

                  <p className="text-xs text-slate-500 font-medium mb-6">
                    {tier.subtitle}
                  </p>

                  {/* Features List from Design */}
                  <ul className="space-y-3 pt-6 border-t border-slate-100 mb-8">
                    {tier.features.map((feat, idx) => (
                      <li key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-600">
                        <div className="rounded-full p-0.5 text-blue-600">
                          <Check className="w-4 h-4 stroke-[2.5]" />
                        </div>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA Button from Design */}
                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onOpenIntake({ budgetTier: `$${price}`, category: tier.id });
                  }}
                  onMouseEnter={() => soundEffects.playHover()}
                  className={`w-full py-3.5 rounded-full font-display font-bold text-xs tracking-wider transition-all shadow-sm flex items-center justify-center gap-2 ${
                    isPopular
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90 shadow-md'
                      : 'bg-slate-950 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>{tier.buttonText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom "Need something custom?" Card from Design with 3D Sphere */}
        <div className="rounded-3xl p-8 sm:p-10 bg-[#F8FAFC] border border-slate-200/90 flex flex-col md:flex-row items-center justify-between gap-6 text-left shadow-sm">
          <div className="space-y-1 max-w-xl">
            <h4 className="text-xl font-display font-bold text-slate-950">
              Need something custom?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600">
              Tell us what you're looking for and we'll create a personalized quote, or use our instant project estimator.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={() => {
                soundEffects.playClick();
                setShowCalculator(!showCalculator);
              }}
              onMouseEnter={() => soundEffects.playHover()}
              className="px-5 py-3 rounded-full font-display font-bold text-xs text-slate-950 bg-white border border-slate-300 hover:border-slate-400 flex items-center gap-2 transition-colors shadow-sm"
            >
              <Calculator className="w-4 h-4 text-blue-600" />
              <span>{showCalculator ? 'Hide Calculator' : 'Instant Cost Calculator'}</span>
            </button>

            <button
              onClick={() => {
                soundEffects.playClick();
                onContactClick();
              }}
              onMouseEnter={() => soundEffects.playHover()}
              className="px-6 py-3 rounded-full font-display font-bold text-xs text-white bg-slate-950 hover:bg-slate-800 flex items-center gap-2 transition-colors shrink-0"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* 3D Prism Cube Graphic */}
            <div className="hidden sm:block w-16 h-16 rounded-2xl overflow-hidden shadow-2xl border border-white/40 animate-float-slow shrink-0">
              <img src="/aether_prism_cube.jpg" alt="3D Prism Hypercube" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Expandable Instant Estimator with Student Grant (STUDENT40) */}
        {showCalculator && (
          <div className="mt-8 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-xl text-left animate-in fade-in duration-300">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                  <Calculator className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-lg font-display font-bold text-slate-950">
                    Interactive Project Spec & Cost Calculator
                  </h4>
                  <p className="text-xs text-slate-500 font-mono">
                    Includes 40% student grant discount engine with code <strong className="text-blue-600">STUDENT40</strong>
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Controls (8 Cols) */}
              <div className="lg:col-span-8 space-y-6">
                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 font-bold block mb-2">
                    1. Base Archetype:
                  </span>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: 'starter', label: 'Starter / Student ($89)', days: '3 Days' },
                      { id: 'business', label: 'Business Store ($299)', days: '7 Days' },
                      { id: 'professional', label: 'Pro SaaS / App ($599)', days: '14 Days' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => {
                          soundEffects.playClick();
                          setBaseTier(item.id);
                        }}
                        className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                          baseTier === item.id
                            ? 'bg-blue-50 border-blue-600 text-blue-700'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-xs font-mono uppercase text-slate-500 font-bold block mb-2">
                    2. Add-On Modules:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {customAddons.map((addon) => {
                      const active = selectedAddons.includes(addon.id);
                      return (
                        <button
                          key={addon.id}
                          onClick={() => toggleAddon(addon.id)}
                          className={`p-3 rounded-xl border text-left text-xs flex items-center justify-between transition-all ${
                            active
                              ? 'bg-blue-50/70 border-blue-500 text-slate-900 font-medium'
                              : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <div className={`w-4 h-4 rounded flex items-center justify-center ${active ? 'bg-blue-600 text-white' : 'border border-slate-300'}`}>
                              {active && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span>{addon.name}</span>
                          </div>
                          <span className="font-mono text-slate-500 font-bold">+${addon.price}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyPromo} className="pt-2 flex items-center gap-2 max-w-sm">
                  <input
                    type="text"
                    placeholder="Enter STUDENT40"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 text-xs uppercase focus:outline-none focus:border-blue-600"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl"
                  >
                    Apply
                  </button>
                </form>
                {promoMsg && (
                  <p className={`text-xs font-mono ${isStudent ? 'text-emerald-600 font-bold' : 'text-amber-600'}`}>
                    {promoMsg}
                  </p>
                )}
              </div>

              {/* Estimate Summary (4 Cols) */}
              <div className="lg:col-span-4 p-6 rounded-2xl bg-slate-900 text-white space-y-4">
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">
                  Calculated Estimate
                </span>
                
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-display font-extrabold text-white">
                    ${calculation.total}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">USD</span>
                </div>

                {isStudent && (
                  <div className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Includes 40% Student Discount (-${calculation.discount})</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-xs text-slate-300 pt-2 border-t border-white/10">
                  <Clock className="w-4 h-4 text-cyan-400" />
                  <span>Est. Turnaround: <strong>{calculation.days} Business Days</strong></span>
                </div>

                <button
                  onClick={() => {
                    soundEffects.playClick();
                    onOpenIntake({
                      budgetTier: `$${calculation.total}`,
                      description: `Custom build (${selectedAddons.length} add-ons, ${calculation.days} days turnaround)`
                    });
                  }}
                  className="w-full py-3 rounded-full font-display font-bold text-xs text-slate-950 bg-gradient-to-r from-cyan-400 to-blue-400 hover:opacity-95 shadow-md flex items-center justify-center gap-2"
                >
                  <span>Book This Specification</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
