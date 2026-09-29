import React, { useState } from 'react';
import { Menu, X, ArrowRight, MessageSquare } from 'lucide-react';

interface NavbarProps {
  onOpenEstimator: () => void;
  onOpenContact: () => void;
  onOpenTelegramSettings?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenEstimator,
  onOpenContact,
  onOpenTelegramSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Services', href: '#services' },
    { label: 'How It Works', href: '#process' },
    { label: 'Pricing Calculator', href: '#estimator' },
    { label: 'Why NexGrid', href: '#why-us' },
    { label: 'FAQs', href: '#faqs' },
  ];

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md transition-colors duration-200 border-b border-slate-200/90 bg-white/95 text-slate-900 shadow-xs">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <a
          href="#top"
          className="group flex items-center gap-1.5 font-display text-xl font-bold tracking-tight text-slate-900"
        >
          <span>NexGrid</span>
          <span className="text-sky-500 font-bold">.</span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="transition-colors hover:text-slate-950 py-1 cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-500"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-2.5">
          {onOpenTelegramSettings && (
            <button
              onClick={onOpenTelegramSettings}
              title="Telegram Bot Settings"
              aria-label="Telegram Bot Settings"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:text-sky-600 hover:bg-sky-50 transition-colors cursor-pointer"
            >
              <MessageSquare className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold text-white bg-[#1F1F1F] hover:bg-slate-800 active:scale-95 rounded-lg transition-all shadow-xs cursor-pointer whitespace-nowrap"
          >
            <span>Get a Free Quote</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-slate-50 text-slate-700"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 py-4 space-y-2 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="block w-full text-left py-2.5 text-sm font-medium text-slate-700 hover:text-slate-950"
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenContact();
              }}
              className="w-full py-2.5 text-center text-sm font-bold text-white bg-[#1F1F1F] hover:bg-slate-800 rounded-lg"
            >
              Get a Free Quote
            </button>
            {onOpenTelegramSettings && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTelegramSettings();
                }}
                className="w-full py-2 text-center text-xs font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200"
              >
                Telegram Bot Settings
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
