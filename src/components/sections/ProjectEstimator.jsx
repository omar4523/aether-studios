import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Clock, 
  Zap, 
  Check, 
  Plus, 
  Sparkles, 
  ArrowRight, 
  GraduationCap, 
  Layout, 
  ShoppingBag, 
  Layers, 
  Smartphone,
  ShieldAlert
} from 'lucide-react';
import TiltCard from '../3d/TiltCard';
import { projectTypes, addOnOptions, timelinePaces } from '../../data/pricingData';
import { soundEffects } from '../../utils/soundFx';

const iconMap = {
  GraduationCap,
  Layout,
  ShoppingBag,
  Layers,
  Smartphone,
};

export default function ProjectEstimator({ onBookSpec }) {
  const [selectedType, setSelectedType] = useState(projectTypes[0].id);
  const [selectedAddons, setSelectedAddons] = useState(['academic_report']);
  const [selectedPace, setSelectedPace] = useState(timelinePaces[0].id);
  const [isStudentPromoApplied, setIsStudentPromoApplied] = useState(false);
  const [promoInput, setPromoInput] = useState('');
  const [promoMessage, setPromoMessage] = useState('');

  const currentType = useMemo(
    () => projectTypes.find((t) => t.id === selectedType) || projectTypes[0],
    [selectedType]
  );

  const currentPace = useMemo(
    () => timelinePaces.find((p) => p.id === selectedPace) || timelinePaces[0],
    [selectedPace]
  );

  const toggleAddon = (addonId) => {
    soundEffects.playClick();
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleApplyPromo = (e) => {
    e.preventDefault();
    soundEffects.playClick();
    if (promoInput.trim().toUpperCase() === 'STUDENT40') {
      setIsStudentPromoApplied(true);
      setPromoMessage('🎉 40% Student Discount Applied Successfully!');
      soundEffects.playSuccess();
    } else {
      setPromoMessage('Invalid coupon. Use STUDENT40 for student pricing.');
    }
  };

  // Calculation Logic
  const calculation = useMemo(() => {
    let subtotal = currentType.basePrice;
    let days = currentType.baseDays;

    selectedAddons.forEach((addonId) => {
      const addon = addOnOptions.find((a) => a.id === addonId);
      if (addon) {
        subtotal += addon.price;
        days += addon.days;
      }
    });

    if (currentPace.id === 'rush') {
      subtotal += currentPace.priceModifier;
      days = Math.max(2, Math.round(days * (1 - currentPace.daysReduction)));
    }

    let discount = 0;
    if (isStudentPromoApplied) {
      discount = Math.round(subtotal * 0.40);
    }

    const total = subtotal - discount;

    return {
      subtotal,
      discount,
      total,
      days,
    };
  }, [currentType, selectedAddons, currentPace, isStudentPromoApplied]);

  const handleBook = () => {
    soundEffects.playClick();
    const spec = {
      projectType: currentType,
      addons: selectedAddons.map((id) => addOnOptions.find((a) => a.id === id)),
      pace: currentPace,
      totalCost: calculation.total,
      estimatedDays: calculation.days,
      isStudentDiscount: isStudentPromoApplied,
    };
    onBookSpec(spec);
  };

  return (
    <section id="estimator" className="relative py-28 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card border border-white/10 text-xs font-mono text-[rgb(var(--color-primary))] mb-4">
            <Calculator className="w-3.5 h-3.5" />
            <span>INSTANT PROJECT & COST CALCULATOR</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-display font-extrabold text-white tracking-tight mb-4">
            Transparent Pricing.{' '}
            <span className="text-gradient-primary">Zero Hidden Fees.</span>
          </h2>
          <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
            Customize your project requirements below to see your real-time investment estimate and guaranteed delivery timeline.
          </p>
        </div>

        {/* Interactive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Step 1: Select Project Type */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[rgb(var(--color-primary))] font-semibold">
                  Step 1: Choose Project Archetype
                </span>
                <span className="text-xs text-slate-400">Select one option</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {projectTypes.map((type) => {
                  const Icon = iconMap[type.icon] || Layers;
                  const isSelected = selectedType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => {
                        soundEffects.playClick();
                        setSelectedType(type.id);
                      }}
                      onMouseEnter={() => soundEffects.playHover()}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3.5 relative overflow-hidden ${
                        isSelected
                          ? 'border-[rgb(var(--color-primary))] bg-[rgb(var(--color-primary))]/10 shadow-[0_0_20px_rgba(var(--color-primary),0.15)]'
                          : 'border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className={`p-2.5 rounded-lg ${isSelected ? 'bg-[rgb(var(--color-primary))] text-slate-950' : 'bg-white/10 text-slate-300'}`}>
                        <Icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="text-sm font-display font-bold text-white truncate">
                            {type.name}
                          </h4>
                          <span className="text-xs font-mono font-semibold text-[rgb(var(--color-primary))]">
                            ${type.basePrice}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 line-clamp-2 mt-1">
                          {type.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Add-on Capabilities */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-mono uppercase tracking-wider text-[rgb(var(--color-primary))] font-semibold">
                  Step 2: Add-On Features & Capabilities
                </span>
                <span className="text-xs text-slate-400">Select any that apply</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {addOnOptions.map((addon) => {
                  const isChecked = selectedAddons.includes(addon.id);
                  return (
                    <button
                      key={addon.id}
                      type="button"
                      onClick={() => toggleAddon(addon.id)}
                      onMouseEnter={() => soundEffects.playHover()}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-3 relative ${
                        isChecked
                          ? 'border-[rgb(var(--color-primary))]/80 bg-[rgb(var(--color-primary))]/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-md flex items-center justify-center mt-0.5 border transition-colors ${
                        isChecked 
                          ? 'bg-[rgb(var(--color-primary))] border-[rgb(var(--color-primary))] text-slate-950' 
                          : 'border-white/30 bg-transparent text-transparent'
                      }`}>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-white">
                            {addon.name}
                          </span>
                          <span className="text-xs font-mono text-slate-300">
                            +${addon.price}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {addon.description}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Delivery Speed & Urgency */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
              <span className="text-xs font-mono uppercase tracking-wider text-[rgb(var(--color-primary))] font-semibold block mb-4">
                Step 3: Target Turnaround Pace
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {timelinePaces.map((pace) => {
                  const isSelected = selectedPace === pace.id;
                  return (
                    <button
                      key={pace.id}
                      type="button"
                      onClick={() => {
                        soundEffects.playClick();
                        setSelectedPace(pace.id);
                      }}
                      onMouseEnter={() => soundEffects.playHover()}
                      className={`p-4 rounded-xl border text-left transition-all ${
                        isSelected
                          ? 'border-emerald-400 bg-emerald-500/10'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-bold text-white">{pace.name}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/10 text-emerald-300">
                          {pace.badge}
                        </span>
                      </div>
                      <span className="text-xs text-slate-400 block">
                        {pace.id === 'rush' ? 'Fast-track engineer allocation +$60' : 'Standard meticulous development schedule'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Quotation Summary Card (4 Cols Sticky) */}
          <div className="lg:col-span-4 sticky top-28">
            <TiltCard className="glass-card p-8 border border-[rgb(var(--color-primary))]/40 shadow-2xl">
              
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block">
                    Real-Time Estimate
                  </span>
                  <h3 className="text-lg font-display font-bold text-white">
                    Project Quote
                  </h3>
                </div>
                <div className="p-2 rounded-xl bg-[rgb(var(--color-primary))]/20 text-[rgb(var(--color-primary))]">
                  <Sparkles className="w-5 h-5" />
                </div>
              </div>

              {/* Price Display */}
              <div className="py-6 border-b border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl sm:text-5xl font-display font-extrabold text-white">
                    ${calculation.total}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">USD</span>
                </div>

                {isStudentPromoApplied && (
                  <div className="mt-2 text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5" />
                    <span>Includes 40% Student Grant (-${calculation.discount})</span>
                  </div>
                )}

                <div className="mt-4 flex items-center gap-2 text-xs text-slate-300">
                  <Clock className="w-4 h-4 text-[rgb(var(--color-primary))]" />
                  <span>Estimated Delivery: </span>
                  <strong className="text-white font-mono">{calculation.days} Business Days</strong>
                </div>
              </div>

              {/* Deliverables Checklist Summary */}
              <div className="py-6 border-b border-white/10 space-y-2.5">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 block mb-2">
                  What's Included in This Package:
                </span>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{currentType.name} codebase</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Staging preview link before final handover</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>100% intellectual property & source code</span>
                </div>
                {selectedAddons.length > 0 && (
                  <div className="flex items-center gap-2 text-xs text-[rgb(var(--color-primary))] font-mono">
                    <Check className="w-3.5 h-3.5" />
                    <span>+{selectedAddons.length} specialized modules added</span>
                  </div>
                )}
              </div>

              {/* Student Coupon Input */}
              <form onSubmit={handleApplyPromo} className="py-4 border-b border-white/10">
                <label className="text-[10px] font-mono uppercase text-slate-400 block mb-2">
                  Have a Student / Promo Code?
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                    placeholder="e.g. STUDENT40"
                    className="flex-1 bg-black/50 border border-white/10 rounded-lg px-3 py-2 text-xs text-white uppercase placeholder:text-slate-600 focus:outline-none focus:border-[rgb(var(--color-primary))]"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-mono font-semibold"
                  >
                    Apply
                  </button>
                </div>
                {promoMessage && (
                  <p className={`text-[11px] mt-1.5 font-mono ${isStudentPromoApplied ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {promoMessage}
                  </p>
                )}
              </form>

              {/* Book Button */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleBook}
                  onMouseEnter={() => soundEffects.playHover()}
                  className="w-full py-4 rounded-xl font-display font-bold text-sm text-slate-950 bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-secondary))] hover:opacity-95 shadow-[0_0_25px_rgba(var(--color-primary),0.35)] flex items-center justify-center gap-2 active:scale-95 transition-all"
                >
                  <span>Lock in This Spec & Quote</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <p className="text-[10px] text-center text-slate-500 font-mono mt-3">
                  No credit card required upfront. 100% satisfaction guarantee.
                </p>
              </div>

            </TiltCard>
          </div>

        </div>

      </div>
    </section>
  );
}
