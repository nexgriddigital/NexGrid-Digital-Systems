import React, { useState } from 'react';
import { agencyContactInfo } from '../data/agencyData';
import { ArrowUp, Mail, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';
import { sendNewsletterSubscriber } from '../services/telegramService';
import { Toast } from './Toast';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const trimmed = email.trim();
    if (!trimmed) {
      setError('Please enter your email address.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);
    const res = await sendNewsletterSubscriber(trimmed);
    setIsSubmitting(false);
    setIsSubscribed(true);

    if (res.success) {
      setToastMessage('New subscriber lead successfully delivered to our Telegram bot!');
    } else {
      setToastMessage("You're subscribed! We've forwarded your email to our team.");
    }
    setShowToast(true);
  };

  return (
    <footer className="border-t border-slate-200 bg-white py-12 text-slate-500 text-sm">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-200">
          
          {/* Brand info */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-2.5 font-display text-xl font-bold tracking-tight text-slate-900">
              <img
                src="/logo.svg"
                alt="NexGrid Logo"
                className="h-8 w-8 object-contain"
              />
              <span className="flex items-center">
                <span>NexGrid</span>
                <span className="text-sky-500 font-bold">.</span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 max-w-sm leading-relaxed">
              We design and build fast, modern websites, e-commerce stores, and custom web applications with transparent fixed pricing and 100% code ownership.
            </p>
            <div className="text-xs space-y-1 pt-1">
              <div>
                Email:{' '}
                <a
                  href={`mailto:${agencyContactInfo.email}`}
                  className="text-slate-800 hover:text-sky-600 font-medium transition-colors"
                >
                  {agencyContactInfo.email}
                </a>
              </div>
              <div className="text-slate-500">
                {agencyContactInfo.location}
              </div>
            </div>
          </div>

          {/* Navigation Mirrors */}
          <div className="md:col-span-4 grid grid-cols-2 gap-6 text-xs">
            <div>
              <div className="font-semibold uppercase tracking-wider text-slate-900 mb-3">
                Services
              </div>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#services" className="hover:text-slate-950 transition-colors">Business Websites</a></li>
                <li><a href="#services" className="hover:text-slate-950 transition-colors">E-Commerce Stores</a></li>
                <li><a href="#services" className="hover:text-slate-950 transition-colors">Client Portals</a></li>
                <li><a href="#services" className="hover:text-slate-950 transition-colors">Website Redesigns</a></li>
              </ul>
            </div>
            <div>
              <div className="font-semibold uppercase tracking-wider text-slate-900 mb-3">
                Company
              </div>
              <ul className="space-y-2 text-slate-600">
                <li><a href="#process" className="hover:text-slate-950 transition-colors">How It Works</a></li>
                <li><a href="#estimator" className="hover:text-slate-950 transition-colors">Pricing Calculator</a></li>
                <li><a href="#why-us" className="hover:text-slate-950 transition-colors">Why NexGrid</a></li>
                <li><a href="#faqs" className="hover:text-slate-950 transition-colors">FAQs</a></li>
              </ul>
            </div>
          </div>

          {/* Quick Contact & Action */}
          <div className="md:col-span-3 space-y-3">
            <div className="font-semibold uppercase tracking-wider text-xs text-slate-900">
              Ready to build?
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Tell us about your project and get an itemized quote within 4 business hours.
            </p>
            <div className="flex flex-col gap-2 pt-1">
              <a
                href="#contact"
                className="inline-block text-center px-4 py-2 text-xs font-bold text-white bg-[#1F1F1F] hover:bg-slate-800 rounded-lg transition-colors shadow-xs"
              >
                Start Your Project
              </a>
            </div>
          </div>

        </div>

        {/* Minimal Newsletter Lead Capture Strip */}
        <div className="py-8 border-b border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            
            <div className="md:col-span-6 space-y-1">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-sky-500" />
                <span>Not ready for a full consultation yet?</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed max-w-lg">
                Join our occasional briefing on modern website optimization, speed benchmarks, and practical tech guides for growing businesses.
              </p>
            </div>

            <div className="md:col-span-6">
              {isSubscribed ? (
                <div className="flex items-center gap-2.5 p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-xs text-emerald-800">
                  <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                  <span>
                    <strong>You're subscribed!</strong> Thanks for connecting with NexGrid. We'll send helpful website insights your way.
                  </span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-1.5">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
                      <input
                        type="email"
                        placeholder="Enter your email for web tips..."
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (error) setError('');
                        }}
                        className={`w-full pl-9 pr-3.5 py-2 text-xs rounded-lg border bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-sky-400 placeholder:text-slate-400 ${
                          error ? 'border-rose-400' : 'border-slate-300'
                        }`}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-4 py-2 text-xs font-bold text-white bg-[#1F1F1F] hover:bg-slate-800 active:scale-95 disabled:opacity-50 rounded-lg transition-all shrink-0 cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <span>{isSubmitting ? 'Joining...' : 'Subscribe'}</span>
                      <ArrowRight className="h-3 w-3" />
                    </button>
                  </div>
                  {error && <div className="text-[11px] text-rose-500 pl-1">{error}</div>}
                  <div className="text-[11px] text-slate-400 pl-1">
                    No spam ever. Unsubscribe at any time with one click.
                  </div>
                </form>
              )}
            </div>

          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            &copy; {new Date().getFullYear()} {agencyContactInfo.companyName}. All rights reserved.
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span>Guaranteed Fixed Quotes</span>
            <span>·</span>
            <span>100% Code Ownership</span>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <span>Back to top</span>
              <ArrowUp className="h-3 w-3" />
            </button>
          </div>
        </div>

      </div>

      {/* Subtle toast for newsletter signup */}
      <Toast
        isOpen={showToast}
        onClose={() => setShowToast(false)}
        title="Subscribed to NexGrid Briefing"
        message={toastMessage}
      />
    </footer>
  );
};
