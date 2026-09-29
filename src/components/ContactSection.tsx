import React, { useState, useEffect } from 'react';
import { agencyContactInfo } from '../data/agencyData';
import { ContactFormData } from '../types';
import { CheckCircle2, Mail, Phone, Clock, Download, ArrowRight, ShieldCheck, MessageCircle, ExternalLink } from 'lucide-react';
import { sendTelegramNotification, ConsultationSubmission } from '../services/telegramService';
import { saveClientLead } from '../services/cmsService';
import { Toast } from './Toast';

interface ContactSectionProps {
  initialData?: Partial<ContactFormData>;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialData }) => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    company: '',
    projectType: 'Business & Marketing Website',
    estimatedBudget: 'ETB 35,000 – ETB 65,000',
    targetTimeline: '3 to 4 weeks',
    projectScopeNotes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [directTelegramUrl, setDirectTelegramUrl] = useState<string | null>(null);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('Inquiry & specifications successfully forwarded to our Telegram bot.');

  useEffect(() => {
    if (initialData) {
      setFormData((prev) => ({
        ...prev,
        ...initialData,
      }));
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Please tell us your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please provide an email address so we can reply.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.projectScopeNotes.trim() || formData.projectScopeNotes.length < 5) {
      newErrors.projectScopeNotes = 'Please tell us a little bit about what you need.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    const submission: ConsultationSubmission = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: 'Provided via website contact form',
      company: formData.company.trim(),
      notes: formData.projectScopeNotes.trim(),
      estimate: {
        projectType: formData.projectType,
        scopeLevel: formData.targetTimeline,
        estimatedPrice: formData.estimatedBudget,
        estimatedWeeks: formData.targetTimeline,
        addonsList: [],
        inclusions: ['100% Code Ownership', 'Sub-second speed', '30-Day Warranty'],
      },
    };

    const res = await sendTelegramNotification(submission);
    if (res.directUrl) {
      setDirectTelegramUrl(res.directUrl);
    }

    // Persist lead for Admin CMS
    saveClientLead({
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: 'Website Form',
      company: formData.company.trim(),
      projectType: formData.projectType,
      estimatedBudget: formData.estimatedBudget,
      targetTimeline: formData.targetTimeline,
      notes: formData.projectScopeNotes.trim(),
    });

    if (res.success) {
      setToastMessage('Inquiry successfully delivered to our Telegram bot! We review and reply within 4 hours.');
    } else {
      setToastMessage('Inquiry received! We have prepared your requirements for our Telegram bot & team.');
    }
    setShowToast(true);

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleDownloadBrief = () => {
    const briefContent = `===========================================
NEXGRID DIGITAL SOLUTIONS — PROJECT BRIEF
===========================================
Date: ${new Date().toLocaleDateString()}
Contact Name: ${formData.name}
Email: ${formData.email}
Company / Business: ${formData.company || 'Not specified'}
Project Type: ${formData.projectType}
Budget Target: ${formData.estimatedBudget}
Target Timeline: ${formData.targetTimeline}

PROJECT DETAILS:
${formData.projectScopeNotes}

NexGrid Email: ${agencyContactInfo.email}
Promise: Fixed pricing, 100% code ownership, 30-day warranty.
===========================================`;

    const blob = new Blob([briefContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexgrid-project-brief-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="py-16 lg:py-24 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact & Guarantees */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                Start a Conversation
              </div>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
                Let's discuss your next website.
              </h2>
              <p className="text-base text-slate-600">
                Share a few details about your project. We'll reply within 4 hours with honest recommendations, scope ideas, and a transparent fixed quote.
              </p>
            </div>

            {/* Direct Contact Cards */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-5 space-y-3.5 shadow-2xs">
              <a
                href={`mailto:${agencyContactInfo.email}`}
                className="flex items-center gap-3 text-sm text-slate-700 hover:text-sky-600 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-200">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Email us directly</div>
                  <div className="font-semibold text-slate-900">{agencyContactInfo.email}</div>
                </div>
              </a>

              <a
                href={`tel:${agencyContactInfo.phone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 text-sm text-slate-700 hover:text-sky-600 transition-colors"
              >
                <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 border border-emerald-200">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Call / WhatsApp directly</div>
                  <div className="font-semibold text-slate-900">{agencyContactInfo.phone}</div>
                </div>
              </a>

              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="h-8 w-8 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center shrink-0 border border-slate-200">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Working hours</div>
                  <div className="font-medium text-slate-800">{agencyContactInfo.workingHours}</div>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-slate-700">
                <div className="h-8 w-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-[11px] text-slate-500">Response guarantee</div>
                  <div className="font-medium text-slate-800">{agencyContactInfo.turnaroundTime}</div>
                </div>
              </div>
            </div>

            {/* Reassurance points */}
            <div className="space-y-2 text-xs text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Zero sales pressure or obligation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Transparent, fixed-price quotes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                <span>Direct consultation with lead builder</span>
              </div>
            </div>

          </div>

          {/* Right Column: Clean Project Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
              
              {isSubmitted ? (
                <div className="py-8 text-center space-y-4">
                  <div className="mx-auto h-12 w-12 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                    <CheckCircle2 className="h-6 w-6" />
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900">
                    Thank you! We received your inquiry.
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">
                    We are reviewing your requirements and will reply to <strong className="text-slate-900">{formData.email}</strong> within 4 business hours with initial notes and recommendations.
                  </p>

                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    {directTelegramUrl && (
                      <a
                        href={directTelegramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-bold text-white bg-[#0088cc] hover:bg-[#0077b5] rounded-lg transition-colors"
                      >
                        <MessageCircle className="h-4 w-4" />
                        <span>Chat via Telegram</span>
                        <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                    <button
                      onClick={handleDownloadBrief}
                      className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-800 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors"
                    >
                      <Download className="h-3.5 w-3.5" />
                      <span>Download Copy of Your Brief (.txt)</span>
                    </button>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-4 py-2.5 text-xs font-medium text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      Send Another Note
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="Your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                          errors.name ? 'border-rose-400' : 'border-slate-200'
                        }`}
                      />
                      {errors.name && (
                        <div className="text-[11px] text-rose-500 mt-1">{errors.name}</div>
                      )}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                          errors.email ? 'border-rose-400' : 'border-slate-200'
                        }`}
                      />
                      {errors.email && (
                        <div className="text-[11px] text-rose-500 mt-1">{errors.email}</div>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Business / Company Name
                      </label>
                      <input
                        type="text"
                        placeholder="Your company, brand, or project name"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Project Type
                      </label>
                      <select
                        value={formData.projectType}
                        onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      >
                        <option>Business &amp; Marketing Website</option>
                        <option>E-Commerce &amp; Online Store</option>
                        <option>Client Portal &amp; Web App</option>
                        <option>Website Redesign &amp; Speed Makeover</option>
                        <option>Other / Custom Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Estimated Budget
                      </label>
                      <select
                        value={formData.estimatedBudget}
                        onChange={(e) => setFormData({ ...formData, estimatedBudget: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      >
                        <option>ETB 30,000 – ETB 50,000 (Starter Website)</option>
                        <option>ETB 50,000 – ETB 90,000 (Growth / E-Commerce)</option>
                        <option>ETB 90,000 – ETB 160,000 (Custom Portal / Platform)</option>
                        <option>ETB 160,000+ (Enterprise / Full Suite)</option>
                        <option>Not sure yet / Need guidance</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Desired Launch Timing
                      </label>
                      <select
                        value={formData.targetTimeline}
                        onChange={(e) => setFormData({ ...formData, targetTimeline: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
                      >
                        <option>As soon as possible (2–3 weeks)</option>
                        <option>Normal pace (3–5 weeks)</option>
                        <option>Planning for next quarter (6–8 weeks)</option>
                        <option>Flexible / exploring options</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Tell us about your project *
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Briefly describe what your business does and what you're hoping to achieve with the new website..."
                      value={formData.projectScopeNotes}
                      onChange={(e) => setFormData({ ...formData, projectScopeNotes: e.target.value })}
                      className={`w-full px-3.5 py-2.5 text-sm rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                        errors.projectScopeNotes ? 'border-rose-400' : 'border-slate-200'
                      }`}
                    />
                    {errors.projectScopeNotes && (
                      <div className="text-[11px] text-rose-500 mt-1">{errors.projectScopeNotes}</div>
                    )}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3.5 px-6 text-sm font-bold text-white bg-[#1F1F1F] hover:bg-slate-800 active:scale-95 disabled:opacity-50 rounded-lg shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#1F1F1F]"
                    >
                      {isSubmitting ? (
                        <span>Sending inquiry...</span>
                      ) : (
                        <>
                          <span>Submit Project Inquiry</span>
                          <ArrowRight className="h-4 w-4" />
                        </>
                      )}
                    </button>
                    <div className="text-center text-[11px] text-slate-500 mt-2">
                      Guaranteed response within 4 hours · No spam
                    </div>
                  </div>

                </form>
              )}

            </div>
          </div>

        </div>

      </div>

      {/* Subtle Telegram Delivery Success Toast */}
      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        title="Delivered to Telegram Bot"
        message={toastMessage}
        actionLabel={directTelegramUrl ? 'Open Telegram Chat' : undefined}
        actionUrl={directTelegramUrl || undefined}
      />
    </section>
  );
};
