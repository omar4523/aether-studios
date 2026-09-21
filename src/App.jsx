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
import Footer from './components/sections/Footer';
import IntakeModal from './components/sections/IntakeModal';
import AboutUsModal from './components/sections/AboutUsModal';
import AuthModal from './components/ui/AuthModal';
import ClientPortalModal from './components/ui/ClientPortalModal';
import LegalModal from './components/ui/LegalModal';
import DocumentationModal from './components/ui/DocumentationModal';
import { soundEffects } from './utils/soundFx';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('cyan');
  const [activeSection, setActiveSection] = useState('home');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  const [isIntakeOpen, setIsIntakeOpen] = useState(false);
  const [intakeInitialData, setIntakeInitialData] = useState(null);

  // Dedicated Modals State
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [isPortalModalOpen, setIsPortalModalOpen] = useState(false);
  const [portalProjectId, setPortalProjectId] = useState(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [legalInitialTab, setLegalInitialTab] = useState('privacy');
  const [isDocsModalOpen, setIsDocsModalOpen] = useState(false);

  // Persistent User Auth State
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aether_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

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

  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
    try {
      localStorage.setItem('aether_user', JSON.stringify(user));
    } catch {}
  };

  const handleLogout = () => {
    soundEffects.playClick();
    setCurrentUser(null);
    try {
      localStorage.removeItem('aether_user');
    } catch {}
  };

  const handleOpenAuth = (mode = 'signin') => {
    setAuthModalMode(mode);
    setIsAuthModalOpen(true);
  };

  const handleOpenLegal = (tab = 'privacy') => {
    setLegalInitialTab(tab);
    setIsLegalModalOpen(true);
  };

  const handleOpenPortal = (projectId = null) => {
    if (projectId) {
      setPortalProjectId(projectId);
    }
    setIsPortalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#04060A] text-slate-100 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      
      {/* Precision Magnetic Mouse Cursor */}
      <CustomCursor />

      {/* Floating Side Quick Dock (Right Side) */}
      <FloatingSideDock
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
        onOpenThemeModal={() => setIsThemeModalOpen(true)}
      />

      {/* Dedicated Floating Sound Toggle Widget (Bottom-Right) */}
      <SoundWidget />

      {/* Theme Switcher Modal */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      {/* Top Navigation Bar with Dynamic Auth & Profile Controls */}
      <Navbar
        onOpenIntake={() => handleOpenIntake()}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        currentUser={currentUser}
        onOpenAuth={handleOpenAuth}
        onLogout={handleLogout}
        onOpenClientPortal={() => handleOpenPortal()}
      />

      {/* Page Sections */}
      <main className="flex-grow">
        
        {/* 1. Hero with Glowing A-Monolith & 3D Particles */}
        <HeroSection
          onOpenIntake={() => handleOpenIntake()}
          onExploreWork={() => handleNavigate('portfolio')}
          currentTheme={currentTheme}
        />

        {/* 2. Solutions for Every Vision (01 Students, 02 Business, 03 Startups) */}
        <WhoWeServeSection
          onSelectAudience={(audience) => {
            if (audience.number === '01') {
              handleOpenIntake({ category: 'student' });
            } else {
              handleNavigate('services');
            }
          }}
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
          onOpenAboutUs={() => setIsAboutModalOpen(true)}
        />

        {/* 6. Simple, Transparent Pricing with 3D Crystal, Monthly/One-time toggle & Instant Calculator */}
        <PricingSection
          onOpenIntake={(data) => handleOpenIntake(data)}
          onContactClick={() => handleNavigate('contact')}
        />

        {/* 7. Insights & Resources with Dedicated Blog Article Reader Modal */}
        <BlogSection onOpenIntake={(data) => handleOpenIntake(data)} />

        {/* 8. Contact: Let's Build Something Great Together with 3D Headphones */}
        <ContactSection onNavigate={handleNavigate} />

        {/* 9. Comprehensive Dark Studio Footer with Functional Links & Modals */}
        <Footer
          onOpenIntake={() => handleOpenIntake()}
          onNavigate={handleNavigate}
          onOpenPortal={() => handleOpenPortal()}
          onOpenLegal={handleOpenLegal}
          onOpenDocs={() => setIsDocsModalOpen(true)}
          onOpenAuth={handleOpenAuth}
          onOpenAboutUs={() => setIsAboutModalOpen(true)}
        />

      </main>

      {/* Multi-Step Intake Modal */}
      <IntakeModal
        isOpen={isIntakeOpen}
        onClose={() => setIsIntakeOpen(false)}
        initialData={intakeInitialData}
        onOpenPortal={handleOpenPortal}
      />

      {/* Comprehensive Dedicated About Us Experience Modal */}
      <AboutUsModal
        isOpen={isAboutModalOpen}
        onClose={() => setIsAboutModalOpen(false)}
        onOpenIntake={() => handleOpenIntake()}
      />

      {/* Sign In & Sign Up Auth Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        initialMode={authModalMode}
        onOpenTerms={() => {
          setIsAuthModalOpen(false);
          handleOpenLegal('terms');
        }}
        onOpenPrivacy={() => {
          setIsAuthModalOpen(false);
          handleOpenLegal('privacy');
        }}
      />

      {/* Live Client Project Portal Tracker Modal */}
      <ClientPortalModal
        isOpen={isPortalModalOpen}
        onClose={() => setIsPortalModalOpen(false)}
        currentUser={currentUser}
        initialProjectId={portalProjectId}
        onOpenLegal={handleOpenLegal}
      />

      {/* Legal Framework Modal: Privacy Policy, Terms of Service, Security Warranty */}
      <LegalModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
        initialTab={legalInitialTab}
      />

      {/* Developer & Capstone Documentation Guidebook Modal */}
      <DocumentationModal
        isOpen={isDocsModalOpen}
        onClose={() => setIsDocsModalOpen(false)}
        onOpenIntake={() => handleOpenIntake()}
      />

    </div>
  );
}
