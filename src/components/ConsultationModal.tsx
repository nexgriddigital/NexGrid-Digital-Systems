import React, { useState } from 'react';
import { X, Send, CheckCircle2, Clock, ShieldCheck, Download, ExternalLink, Sparkles, MessageCircle } from 'lucide-react';
import { sendTelegramNotification, ConsultationSubmission, formatConsultationPlainText } from '../services/telegramService';
import { Toast } from './Toast';

export interface ConsultationEstimate {
  projectType: string;
  scopeLevel: string;
  estimatedPrice: string;
  estimatedWeeks: string;
  addonsList: string[];
  inclusions: string[];
}

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  estimate: ConsultationEstimate;
}

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  estimate,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submissionResult, setSubmissionResult] = useState<{ success: boolean; directUrl?: string; error?: string } | null>(null);
  const [showToast, setShowToast] = useState(false);

  if (!isOpen) return null;

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim()) errs.name = 'Please provide your full name.';
    if (!formData.email.trim()) {
      errs.email = 'Please provide an email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.phone.trim()) {
      errs.phone = 'Please provide a phone number or Telegram handle.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    const submission: ConsultationSubmission = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      company: formData.company.trim(),
      notes: formData.notes.trim(),
      estimate,
    };

    const res = await sendTelegramNotification(submission);
    setIsSubmitting(false);
    setIsSuccess(true);
    setSubmissionResult(res);
    setShowToast(true);
  };

  const handleDownloadCopy = () => {
    const submission: ConsultationSubmission = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      notes: formData.notes,
      estimate,
    };
    const content = formatConsultationPlainText(submission);
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `nexgrid-consultation-quote-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-5 sm:p-7 overflow-y-auto max-h-[92vh]">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-4 right-4 h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
        >
          <X className="h-4 w-4" />
        </button>

        {isSuccess ? (
          /* Success Screen */
          <div className="py-6 text-center space-y-5">
            <div className="mx-auto h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="h-7 w-7" />
            </div>

            <div className="space-y-2">
              <h3 className="font-display text-2xl font-bold text-slate-900">
                Consultation Request &amp; Quote Sent!
              </h3>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Your consultation request along with your attached quote summary has been generated for delivery to our Telegram Bot.
              </p>
            </div>

            {/* Notification Delivery Details */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left max-w-md mx-auto space-y-2 text-xs">
              <div className="font-semibold text-slate-800 flex items-center justify-between">
                <span>Delivery Status</span>
                {submissionResult?.success ? (
                  <span className="text-emerald-700 font-medium bg-emerald-100 px-2 py-0.5 rounded">
                    Delivered to Telegram Bot
                  </span>
                ) : (
                  <span className="text-amber-700 font-medium bg-amber-100 px-2 py-0.5 rounded">
                    Ready for Telegram Direct
                  </span>
                )}
              </div>
              <div className="text-slate-600">
                • <strong>Client:</strong> {formData.name} ({formData.phone})<br />
                • <strong>Attached Quote:</strong> {estimate.projectType} · {estimate.estimatedPrice} · {estimate.estimatedWeeks}
              </div>
              {submissionResult?.error === 'NO_TOKEN_CONFIGURED' && (
                <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-500">
                  Tip: Connect your own Telegram Bot Token anytime via the settings icon to automatically send messages directly to your private chat.
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="pt-2 flex flex-wrap justify-center items-center gap-3">
              {submissionResult?.directUrl && (
                <a
                  href={submissionResult.directUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#0088cc] hover:bg-[#0077b5] rounded-lg transition-colors shadow-xs"
                >
                  <MessageCircle className="h-4 w-4" />
                  <span>Open in Telegram Chat</span>
                  <ExternalLink className="h-3 w-3" />
                </a>
              )}

              <button
                type="button"
                onClick={handleDownloadCopy}
                className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Download className="h-3.5 w-3.5" />
                <span>Download Quote Copy (.txt)</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-slate-900 border border-slate-300 hover:bg-slate-50 rounded-lg cursor-pointer"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          /* Intake Form with Attached Summary */
          <div className="space-y-5">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600 mb-1">
                <span>Free Project Consultation</span>
                <span>·</span>
                <span>Direct Telegram Bot Delivery</span>
              </div>
              <h2 className="font-display text-2xl font-bold text-slate-900">
                Book Consultation with Your Attached Quote
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Please fill out your contact info below. Both your consultation details and your customized quote summary will be delivered straight to our team via Telegram Bot.
              </p>
            </div>

            {/* Attached Estimate Summary Box (Matching the user's attached screenshot) */}
            <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-4 sm:p-5 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-sky-900 flex items-center gap-1.5">
                  <Sparkles className="h-3.5 w-3.5 text-sky-600" />
                  <span>Attached Estimate Summary</span>
                </span>
                <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
                  Fixed Price Guarantee
                </span>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-1 border-t border-sky-200/80">
                <div>
                  <div className="font-display font-extrabold text-base text-slate-900">
                    {estimate.projectType}
                  </div>
                  <div className="text-xs text-slate-600">
                    Scope: <strong className="text-slate-800">{estimate.scopeLevel}</strong>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0">
                  <div className="text-left sm:text-right">
                    <div className="text-[10px] uppercase font-semibold text-slate-500">Estimated Total</div>
                    <div className="text-xl font-extrabold text-slate-900 font-mono-code tabular-nums">
                      {estimate.estimatedPrice}
                    </div>
                  </div>
                  <div className="text-left sm:text-right border-l border-sky-200 pl-3">
                    <div className="text-[10px] uppercase font-semibold text-slate-500">Timeline</div>
                    <div className="text-base font-bold text-sky-700 font-mono-code tabular-nums">
                      {estimate.estimatedWeeks}
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected Add-ons Pill List */}
              {estimate.addonsList.length > 0 && (
                <div className="pt-2 border-t border-sky-200/70">
                  <div className="text-[11px] font-semibold text-slate-700 mb-1">
                    Selected Features &amp; Add-ons:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {estimate.addonsList.map((addon, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-white border border-sky-200 text-sky-900 font-medium"
                      >
                        ✓ {addon}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions Guarantee */}
              <div className="text-[11px] text-slate-500 flex items-center gap-1.5 pt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Includes 100% full code ownership, sub-second speed optimization, and 30-day post-launch warranty.</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Alex Morgan"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                      errors.name ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  />
                  {errors.name && <div className="text-[10px] text-rose-500 mt-1">{errors.name}</div>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="alex@yourcompany.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                      errors.email ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  />
                  {errors.email && <div className="text-[10px] text-rose-500 mt-1">{errors.email}</div>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone / Telegram Handle *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. +251 906697634 or @username"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className={`w-full px-3 py-2 text-xs rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 ${
                      errors.phone ? 'border-rose-400' : 'border-slate-200'
                    }`}
                  />
                  {errors.phone && <div className="text-[10px] text-rose-500 mt-1">{errors.phone}</div>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Business / Company Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Acme Studio or Website Link"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Additional Project Notes or Goals
                </label>
                <textarea
                  rows={2}
                  placeholder="Share any specific goals, target launch dates, or features you want to discuss during the consultation..."
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="text-[11px] text-slate-400 flex items-center gap-1.5 order-2 sm:order-1">
                  <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Direct, confidential dispatch to our engineers</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto order-1 sm:order-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-3.5 py-2.5 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-bold text-white bg-[#1F1F1F] hover:bg-slate-800 active:scale-95 disabled:opacity-50 rounded-lg shadow-sm transition-all cursor-pointer"
                  >
                    {isSubmitting ? (
                      <span>Sending to Telegram Bot...</span>
                    ) : (
                      <>
                        <Send className="h-3.5 w-3.5" />
                        <span>Send Consultation via Telegram Bot</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="text-center text-[10px] text-slate-400 pt-1">
                Guaranteed response within 4 hours · No spam or aggressive sales calls
              </div>
            </form>
          </div>
        )}

      </div>

      {/* Subtle Toast notification */}
      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        title="Quote Sent to Telegram Bot"
        message="Your consultation details and customized quote summary have been forwarded to our Telegram bot."
        actionLabel={submissionResult?.directUrl ? 'Open Telegram Chat' : undefined}
        actionUrl={submissionResult?.directUrl || undefined}
      />
    </div>
  );
};
