import React, { useState, useEffect } from 'react';
import { ContactFormData } from './types';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { CapabilitiesBento } from './components/CapabilitiesBento';
import { HowItWorks } from './components/HowItWorks';
import { ProjectEstimator } from './components/ProjectEstimator';
import { ComparisonMatrix } from './components/ComparisonMatrix';
import { FaqSection } from './components/FaqSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ConsultationModal, ConsultationEstimate } from './components/ConsultationModal';
import { TelegramSettingsModal } from './components/TelegramSettingsModal';

export default function App() {
  const [contactPrefill, setContactPrefill] = useState<Partial<ContactFormData>>({});
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false);
  const [isTelegramSettingsOpen, setIsTelegramSettingsOpen] = useState(false);
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

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectServiceForEstimate = (serviceId: string) => {
    scrollToSection('estimator');
  };

  const handleOpenConsultationWithEstimate = (estimate: ConsultationEstimate) => {
    setConsultationEstimate(estimate);
    setIsConsultationModalOpen(true);
  };

  const handleApplyEstimateToContact = (estimateData: {
    projectType: string;
    estimatedBudget: string;
    targetTimeline: string;
    scopeSummary: string;
  }) => {
    setContactPrefill((prev) => ({
      ...prev,
      projectType: estimateData.projectType,
      estimatedBudget: estimateData.estimatedBudget,
      targetTimeline: estimateData.targetTimeline,
      projectScopeNotes: `Estimated Scope:\n${estimateData.scopeSummary}\n\nAdditional notes: `,
    }));
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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Permanent Light Sticky Navigation */}
      <Navbar
        onOpenEstimator={() => scrollToSection('estimator')}
        onOpenContact={() => scrollToSection('contact')}
        onOpenTelegramSettings={() => setIsTelegramSettingsOpen(true)}
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

      {/* Clean Footer with Telegram Settings Link */}
      <Footer onOpenTelegramSettings={() => setIsTelegramSettingsOpen(true)} />

      {/* Consultation Modal Triggered by 'Use This Quote for Consultation' */}
      <ConsultationModal
        isOpen={isConsultationModalOpen}
        onClose={() => setIsConsultationModalOpen(false)}
        estimate={consultationEstimate}
        onOpenTelegramSettings={() => {
          setIsConsultationModalOpen(false);
          setIsTelegramSettingsOpen(true);
        }}
      />

      {/* Telegram Bot Setup Modal */}
      <TelegramSettingsModal
        isOpen={isTelegramSettingsOpen}
        onClose={() => setIsTelegramSettingsOpen(false)}
      />
    </div>
  );
}
