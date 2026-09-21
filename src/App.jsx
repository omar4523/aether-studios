import React, { useState, useEffect } from 'react';
import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/ui/Navbar';
import FloatingSideDock from './components/ui/FloatingSideDock';
import ThemeModal from './components/ui/ThemeModal';
import SoundWidget from './components/ui/SoundWidget';
import HeroSection from './components/sections/HeroSection';
import WhoWeServeSection from './components/sections/WhoWeServeSection';
import ServicesSection from './components/sections/ServicesSection';
import PortfolioSection from './components/sections/PortfolioSection';
import AboutSection from './components/sections/AboutSection';
import PricingSection from './components/sections/PricingSection';
import BlogSection from './components/sections/BlogSection';
import ContactSection from './components/sections/ContactSection';
import IntakeModal from './components/sections/IntakeModal';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('cyan');
  const [activeSection, setActiveSection] = useState('home');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [intakeInitialData, setIntakeInitialData] = useState(null);

  useEffect(() => {
    document.body.setAttribute('data-theme', currentTheme);
  }, [currentTheme]);

  const handleNavigate = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenIntake = (data = null) => {
    setIntakeInitialData(data);
    setIsIntakeOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#04060A] text-slate-100 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Precision Magnetic Mouse Cursor */}
      <CustomCursor />

      {/* Floating Side Quick Dock from Design (Right Side) */}
      <FloatingSideDock
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
      />

      {/* Dedicated Floating Sound Toggle Widget from Design (Bottom-Right) */}
      <SoundWidget />

      {/* Theme Switcher Modal from Design */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      {/* Top Navigation Bar from Design */}
      <Navbar
        onOpenIntake={() => handleOpenIntake()}
        activeSection={activeSection}
        onNavigate={handleNavigate}
      />

      {/* Page Sections matching Design Flow */}
      <main className="flex-grow">
        
        {/* 1. Hero with Glowing A-Monolith & 3D Particles */}
        <HeroSection
          onOpenIntake={() => handleOpenIntake()}
          onExploreWork={() => handleNavigate('portfolio')}
          currentTheme={currentTheme}
        />

        {/* 2. Organic White Wave Transition: Solutions for Every Vision (01, 02, 03) */}
        <WhoWeServeSection
          onSelectAudience={(audience) => handleNavigate(audience.targetSection || 'services')}
        />

        {/* 3. Productized Solutions for Real-World Needs (6 Services) with 3D Crystal */}
        <ServicesSection
          onSelectService={(svc) => handleOpenIntake(svc)}
        />

        {/* 4. Featured Projects Showcase & Bottom CTA Banner with 3D Torus and Orb */}
        <PortfolioSection
          onOpenIntake={() => handleOpenIntake()}
        />

        {/* 5. About: More Than Just Code. We Build Futures. */}
        <AboutSection
          onOpenIntake={() => handleOpenIntake()}
        />

        {/* 6. Simple, Transparent Pricing with 3D Crystal, Monthly/One-time toggle & Instant Calculator */}
        <PricingSection
          onOpenIntake={(data) => handleOpenIntake(data)}
          onContactClick={() => handleNavigate('contact')}
        />

        {/* 7. Insights & Resources (Blog) */}
        <BlogSection />

        {/* 8. Contact & Footer: Let's Build Something Great Together with 3D Purple Crystal */}
        <ContactSection onNavigate={handleNavigate} />

      </main>

      {/* Multi-Step Intake Modal */}
      <IntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        initialData={intakeInitialData}
      />

    </div>
  );
}
