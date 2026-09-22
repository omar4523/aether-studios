import React, { useState, useEffect } from 'react';
import { LogOut, Terminal, Sparkles, ExternalLink } from 'lucide-react';
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
import AuthPage from './components/pages/AuthPage';
import ClientPortalModal from './components/ui/ClientPortalModal';
import LegalModal from './components/ui/LegalModal';
import DocumentationModal from './components/ui/DocumentationModal';
import { soundEffects } from './utils/soundFx';

export default function App() {
  const [currentTheme, setCurrentTheme] = useState('cyan');
  const [activeSection, setActiveSection] = useState('home');
  const [currentView, setCurrentView] = useState('main'); // 'main' | 'auth'
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

  // Support direct URL routing & browser back/forward buttons
  useEffect(() => {
    const handleLocationChange = () => {
      const hash = window.location.hash.toLowerCase();
      const path = window.location.pathname.toLowerCase();
      const isAuthPath = path.startsWith('/auth') || path.startsWith('/login') || path.startsWith('/signin') || path.startsWith('/signup');

      if (isAuthPath || hash === '#auth' || hash === '#signin' || hash === '#signup' || hash === '#guest') {
        setAuthModalMode(hash === '#signup' || path.startsWith('/signup') ? 'signup' : hash === '#guest' ? 'guest' : 'signin');
        setCurrentView('auth');
      } else {
        setCurrentView('main');
        if (hash === '#portal') {
          setIsPortalModalOpen(true);
        }
      }
    };

    handleLocationChange();
    window.addEventListener('hashchange', handleLocationChange);
    window.addEventListener('popstate', handleLocationChange);
    return () => {
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('popstate', handleLocationChange);
    };
  }, []);

  const handleNavigate = (sectionId) => {
    if (currentView !== 'main') {
      setCurrentView('main');
      window.location.hash = `#${sectionId}`;
    }
    setActiveSection(sectionId);
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
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

    // Return to main view and immediately launch the live project portal
    setCurrentView('main');
    window.location.hash = '#portal';
    if (user.projectId) {
      setPortalProjectId(user.projectId);
    }
    setIsPortalModalOpen(true);
  };

  const handleLogout = () => {
    soundEffects.playClick();
    setCurrentUser(null);
    try {
      localStorage.removeItem('aether_user');
    } catch {}
    if (window.location.hash === '#portal') {
      window.history.replaceState(null, '', window.location.pathname);
    }
    setIsPortalModalOpen(false);
  };

  const handleOpenAuth = (mode = 'signin') => {
    soundEffects.playClick();
    setAuthModalMode(mode);
    setCurrentView('auth');
    window.location.hash = mode === 'signup' ? '#signup' : mode === 'guest' ? '#guest' : '#auth';
  };

  const handleBackFromAuth = () => {
    soundEffects.playClick();
    setCurrentView('main');
    if (window.location.pathname !== '/' && window.location.pathname !== '') {
      window.history.pushState(null, '', '/');
    }
    window.location.hash = '#home';
  };

  const handleOpenLegal = (tab = 'privacy') => {
    setLegalInitialTab(tab);
    setIsLegalModalOpen(true);
  };

  const handleOpenPortal = (projectId = null) => {
    if (projectId) {
      setPortalProjectId(projectId);
    } else if (currentUser?.projectId) {
      setPortalProjectId(currentUser.projectId);
    }
    setIsPortalModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#04060A] text-slate-100 flex flex-col antialiased selection:bg-cyan-500/20 selection:text-cyan-300">
      

      {/* Floating Side Quick Dock (Right Side) */}
      {currentView === 'main' && (
        <FloatingSideDock
          currentTheme={currentTheme}
          onThemeChange={setCurrentTheme}
          onOpenThemeModal={() => setIsThemeModalOpen(true)}
        />
      )}

      {/* Dedicated Floating Sound Toggle Widget (Bottom-Right) */}
      {currentView === 'main' && <SoundWidget />}

      {/* Floating Active VIP Guest Session Indicator (Bottom-Left) */}
      {currentView === 'main' && currentUser?.isGuest && (
        <aside 
          aria-label="VIP Guest Session Notification"
          className="fixed bottom-5 left-5 z-40 p-3 sm:p-3.5 rounded-2xl bg-[#090D16]/95 border border-cyan-400/40 shadow-2xl backdrop-blur-md flex items-center justify-between gap-3 sm:gap-4 animate-in fade-in slide-in-from-bottom-4 duration-300"
        >
          <div className="flex items-center gap-2.5">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping shrink-0" />
            <div>
              <div className="text-xs font-display font-bold text-white flex items-center gap-1.5">
                <span>VIP Guest Preview Active</span>
              </div>
              <div className="text-[10px] font-mono text-cyan-300">
                Workspace #AE-GUEST-001 (0% Started)
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => handleOpenPortal('AE-GUEST-001')}
              className="px-3 py-1.5 rounded-lg bg-cyan-400 text-slate-950 font-mono text-xs font-bold hover:bg-cyan-300 transition-colors flex items-center gap-1 shadow-sm"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Project Portal</span>
            </button>
            <button
              onClick={handleLogout}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Exit Guest Mode"
            >
              <LogOut className="w-3.5 h-3.5" />
            </button>
          </div>
        </aside>
      )}

      {/* Theme Switcher Modal */}
      <ThemeModal
        isOpen={isThemeModalOpen}
        onClose={() => setIsThemeModalOpen(false)}
        currentTheme={currentTheme}
        onThemeChange={setCurrentTheme}
      />

      {/* Standalone Full-Page Auth Experience OR Main Agency Site */}
      {currentView === 'auth' ? (
        <AuthPage
          onLoginSuccess={handleLoginSuccess}
          onBack={handleBackFromAuth}
          initialMode={authModalMode}
          currentTheme={currentTheme}
          onOpenTerms={() => handleOpenLegal('terms')}
          onOpenPrivacy={() => handleOpenLegal('privacy')}
        />
      ) : (
        <>
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
        </>
      )}

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

      {/* Backup Modal for Quick In-Place Sign In if needed */}
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
        onClose={() => {
          setIsPortalModalOpen(false);
          if (window.location.hash === '#portal') {
            window.history.replaceState(null, '', window.location.pathname);
          }
        }}
        currentUser={currentUser}
        initialProjectId={portalProjectId}
        onOpenLegal={handleOpenLegal}
        onOpenIntake={() => handleOpenIntake()}
        onOpenEstimator={() => handleNavigate('pricing')}
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
