import React, { useState, useEffect } from 'react';
import { ContactFormData } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CapabilitiesBento } from './components/CapabilitiesBento';
import { OurWorkSection } from './components/OurWorkSection';
import { HowItWorks } from './components/HowItWorks';
import { ProjectEstimator } from './components/ProjectEstimator';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal, ConsultationEstimate } from './components/ConsultationModal';
import { TelegramSettingsModal } from './components/TelegramSettingsModal';
import { ScrollProgressBar } from './components/ScrollProgressBar';
import { SectionNavDots } from './components/SectionNavDots';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminCMSModal } from './components/AdminCMSModal';
import { getAdminSession, AdminUser } from './services/authService';

export default function App() {
  const [contactPrefill, setContactPrefill] = useState<Partial<ContactFormData>>({});
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isTelegramSettingsOpen, setIsTelegramSettingsOpen] = useState(false);
  const [adminUser, setAdminUser] = useState<AdminUser | null>(getAdminSession());
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false);
  const [isAdminCMSOpen, setIsAdminCMSOpen] = useState(false);
  const [consultationEstimate, setConsultationEstimate] = useState<ConsultationEstimate>({
    projectType: 'Business & Marketing Website',
    scopeLevel: 'Standard (6–12 pages)',
    estimatedPrice: 'ETB 52,000',
    estimatedWeeks: '~4 wks',
    addonsList: ['Easy Content Editor (CMS)', 'Google SEO & Local Search Setup'],
    inclusions: [
      '100% full code & account ownership',
      'Sub-second page load optimization',
      'Responsive testing on phones & laptops',
      '30-day post-launch warranty & training',
    ],
  });

  // Always use light theme permanently
  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.body.className = 'bg-slate-50 text-slate-900 antialiased selection:bg-[#1F1F1F] selection:text-white';
  }, []);

  // Hidden admin access: Only accessible via Alt + Shift + T or #admin-telegram
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && e.shiftKey && e.key.toLowerCase() === 't') {
        e.preventDefault();
        setIsTelegramSettingsOpen((prev) => !prev);
      }
    };

    const handleHashChange = () => {
      if (window.location.hash === '#admin-telegram') {
        setIsTelegramSettingsOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash === '#admin-telegram') {
      setIsTelegramSettingsOpen(true);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForEstimate = (serviceId: string) => {
    scrollToSection('estimator');
    const estimatorSection = document.getElementById('estimator');
    if (estimatorSection) {
      estimatorSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenConsultationWithEstimate = (estimate: ConsultationEstimate) => {
    setConsultationEstimate(estimate);
    setIsConsultationModalOpen(true);
  };

  const handleApplyEstimateToContact = (data: {
    projectType: string;
    estimatedBudget: string;
    targetTimeline: string;
    scopeSummary: string;
  }) => {
    setContactPrefill((prev) => ({
      ...prev,
      projectType: data.projectType,
      estimatedBudget: data.estimatedBudget,
      targetTimeline: data.targetTimeline,
      projectScopeNotes: data.scopeSummary,
    }));
    scrollToSection('contact');
  };

  const handleOpenContactWithNote = (note?: string) => {
    if (note) {
      setContactPrefill((prev) => ({
        ...prev,
        projectScopeNotes: note,
      }));
    }
    scrollToSection('contact');
  };

  useEffect(() => {
    const handleAuthChange = (e: CustomEvent<AdminUser | null>) => {
      setAdminUser(e.detail);
    };
    window.addEventListener('nexgrid_auth_change', handleAuthChange as EventListener);
    return () => {
      window.removeEventListener('nexgrid_auth_change', handleAuthChange as EventListener);
    };
  }, []);

  const handleOpenAdminAuth = () => {
    if (adminUser) {
      setIsAdminCMSOpen(true);
    } else {
      setIsAdminLoginOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Slim & Subtle Scroll Progress Bar at very top of page */}
      <ScrollProgressBar />

      {/* Floating Section Navigation Dots on right side */}
      <SectionNavDots />

      {/* Permanent Light Sticky Navigation */}
      <Navbar
        onOpenEstimator={() => scrollToSection('estimator')}
        onOpenContact={() => scrollToSection('contact')}
      />

      <main>
        {/* Simple & Welcoming Advert Hero */}
        <Hero
          onOpenEstimator={() => scrollToSection('estimator')}
          onOpenContact={() => scrollToSection('contact')}
        />

        {/* 4 Core Client Services */}
        <CapabilitiesBento
          onSelectServiceForEstimate={handleSelectServiceForEstimate}
          onOpenContact={handleOpenContactWithNote}
        />

        {/* Our Work & Real Client Case Studies */}
        <OurWorkSection
          onOpenContactWithProject={(projectName) => {
            setContactPrefill((prev) => ({
              ...prev,
              projectScopeNotes: `I saw your work on "${projectName}" and would like to build a similar high-performance solution for my business.`,
            }));
            scrollToSection('contact');
          }}
        />

        {/* Simple 3-Step Client Journey */}
        <HowItWorks />

        {/* Transparent Interactive Price Estimator */}
        <ProjectEstimator
          onOpenConsultationModal={handleOpenConsultationWithEstimate}
          onApplyEstimateToContact={handleApplyEstimateToContact}
        />

        {/* Why Choose NexGrid */}
        <ComparisonMatrix />

        {/* Client FAQs */}
        <FaqSection />

        {/* Easy 2-Minute Contact & Inquiry Form */}
        <ContactSection initialData={contactPrefill} />
      </main>

      {/* Clean Footer */}
      <Footer
        onOpenAdminLogin={handleOpenAdminAuth}
        isAdminLoggedIn={!!adminUser}
      />

      {/* Admin Authentication Login Modal */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onLoginSuccess={(user) => {
          setAdminUser(user);
          setIsAdminLoginOpen(false);
          setIsAdminCMSOpen(true);
        }}
      />

      {/* Easy Content Editor (CMS) Suite */}
      {adminUser && (
        <AdminCMSModal
          isOpen={isAdminCMSOpen}
          onClose={() => setIsAdminCMSOpen(false)}
          user={adminUser}
          onLogout={() => {
            setAdminUser(null);
            setIsAdminCMSOpen(false);
          }}
        />
      )}

      {/* Consultation Modal Triggered by 'Use This Quote for Consultation' */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        estimate={consultationEstimate}
      />

      {/* Telegram Bot Setup Modal (Owner / Admin Only via Alt+Shift+T or #admin-telegram) */}
      <TelegramSettingsModal
        isOpen={isTelegramSettingsOpen}
        onClose={() => {
          setIsTelegramSettingsOpen(false);
          if (window.location.hash === '#admin-telegram') {
            history.replaceState(null, '', window.location.pathname + window.location.search);
          }
        }}
      />
    </div>
  );
}
