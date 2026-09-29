import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, ShieldCheck, Clock, Zap, Layers, ShoppingBag, Globe } from 'lucide-react';

interface HeroProps {
  onOpenEstimator: () => void;
  onOpenContact: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenEstimator, onOpenContact }) => {
  const [selectedPackage, setSelectedPackage] = useState<'marketing' | 'ecommerce' | 'webapp'>('marketing');

  const packages = {
    marketing: {
      name: 'Business Website',
      icon: Globe,
      priceFrom: 'From ETB 35,000',
      timeline: '2 to 3 weeks',
      tagline: 'Establish immediate credibility and turn visitors into qualified inquiries.',
      idealFor: 'Professional services, consultancies, local practices, and emerging companies.',
      highlights: [
        'Mobile-first responsive design tested on all devices',
        'Sub-second page load times (Lighthouse 95+ score)',
        'Google SEO structure so clients find you locally',
        'Intuitive CMS to update text, photos, and team anytime',
        'Direct inquiry forms connected to your email or WhatsApp',
      ],
    },
    ecommerce: {
      name: 'E-Commerce Store',
      icon: ShoppingBag,
      priceFrom: 'From ETB 75,000',
      timeline: '3 to 5 weeks',
      tagline: 'Sell products online with effortless checkout and local payment options.',
      idealFor: 'Retail brands, boutiques, product sellers, and wholesale distributors.',
      highlights: [
        'Integrated local payments (Telebirr, Chapa, CBE Birr & Cards)',
        'Frictionless slide-out cart & 1-tap mobile checkout',
        'Organized product catalog with variations and high-res gallery',
        'Automated order confirmation emails to you and your buyers',
        'Zero ongoing transaction cuts taken by our agency',
      ],
    },
    webapp: {
      name: 'Custom Web Portal',
      icon: Layers,
      priceFrom: 'From ETB 90,000',
      timeline: '4 to 6 weeks',
      tagline: 'Replace messy email chains and spreadsheets with a custom web tool.',
      idealFor: 'Businesses needing client logins, intake workflows, or self-serve dashboards.',
      highlights: [
        'Secure user authentication with personal client dashboards',
        'Automated file sharing, document generation, and intake forms',
        'Modern React & Node architecture built to scale',
        'Connected with your existing email and workflow tools',
        'Rock-solid database security and encrypted data handling',
      ],
    },
  };

  const currentPkg = packages[selectedPackage];
  const IconComponent = currentPkg.icon;

  return (
    <section id="top" className="relative pt-12 pb-16 lg:pt-18 lg:pb-24 overflow-hidden border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Direct Startup Advert Messaging */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Category Kicker */}
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-sky-600">
              <span>Web Development Studio</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Fixed Pricing</span>
              <span aria-hidden="true" className="text-slate-400">·</span>
              <span>Fast 2–4 Wk Launch</span>
            </div>

            {/* Clear, Honest Headline */}
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] [text-wrap:balance]">
              We build fast, modern websites for growing businesses.
            </h1>

            {/* Client-friendly plain language */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              NexGrid is a modern web studio. We design and develop custom business websites, online stores, and web apps with guaranteed fixed quotes, zero tech jargon, and 100% full code ownership.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onOpenEstimator}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-bold text-white bg-[#1F1F1F] hover:bg-slate-800 active:scale-95 rounded-lg shadow-sm transition-all cursor-pointer border border-[#1F1F1F]"
              >
                <span>Calculate Your Project Price</span>
                <ArrowRight className="h-4 w-4" />
              </button>

              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 border border-slate-300 hover:bg-slate-100 rounded-lg transition-all cursor-pointer"
              >
                <span>Get a Free Quote</span>
              </button>
            </div>

            {/* Honest Startup Guarantees */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs font-medium text-slate-500">
              <span className="flex items-center gap-1.5 text-slate-700">
                <Clock className="h-3.5 w-3.5 text-emerald-600" />
                2–4 week average delivery
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                Guaranteed fixed quote
              </span>
              <span aria-hidden="true" className="text-slate-300">·</span>
              <span className="flex items-center gap-1.5 text-slate-700">
                <Zap className="h-3.5 w-3.5 text-emerald-600" />
                100% code &amp; domain ownership
              </span>
            </div>
          </div>

          {/* Right Column: Clean Advert Package Overview (Honest Startup Presentation) */}
          <div className="lg:col-span-5">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-5 sm:p-6 shadow-xl shadow-slate-200/50">
              
              {/* Advert Header with Live Availability Status */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-200 gap-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                  </span>
                  <span className="text-xs font-semibold text-slate-800">
                    Open for New Projects
                  </span>
                </div>
                
                <span className="text-[11px] font-mono font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Fixed Pricing
                </span>
              </div>

              {/* Package Selector Segmented Bar */}
              <div className="pt-4 space-y-4">
                <div>
                  <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-2">
                    What are you looking to build?
                  </div>
                  <div className="grid grid-cols-3 gap-1 bg-white p-1 rounded-lg border border-slate-200 text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedPackage('marketing')}
                      className={`py-1.5 px-2 rounded-md font-medium text-center transition-all cursor-pointer ${
                        selectedPackage === 'marketing'
                          ? 'bg-[#1F1F1F] text-white font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Website
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPackage('ecommerce')}
                      className={`py-1.5 px-2 rounded-md font-medium text-center transition-all cursor-pointer ${
                        selectedPackage === 'ecommerce'
                          ? 'bg-[#1F1F1F] text-white font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Online Store
                    </button>
                    <button
                      type="button"
                      onClick={() => setSelectedPackage('webapp')}
                      className={`py-1.5 px-2 rounded-md font-medium text-center transition-all cursor-pointer ${
                        selectedPackage === 'webapp'
                          ? 'bg-[#1F1F1F] text-white font-semibold shadow-xs'
                          : 'text-slate-600 hover:text-slate-900'
                      }`}
                    >
                      Web Portal
                    </button>
                  </div>
                </div>

                {/* Selected Package Advert Details */}
                <div className="rounded-xl bg-white border border-slate-200 p-4 space-y-3 shadow-xs">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 border border-sky-100">
                        <IconComponent className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-bold text-slate-900">
                          {currentPkg.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {currentPkg.idealFor}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Timeline Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-100">
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-500">Starting Price</div>
                      <div className="text-sm font-bold text-slate-900 font-mono-code tabular-nums mt-0.5">
                        {currentPkg.priceFrom}
                      </div>
                    </div>
                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                      <div className="text-[10px] text-slate-500">Typical Delivery</div>
                      <div className="text-sm font-bold text-emerald-600 font-mono-code tabular-nums mt-0.5">
                        {currentPkg.timeline}
                      </div>
                    </div>
                  </div>

                  {/* Included Deliverables */}
                  <div className="space-y-1.5 pt-1">
                    <div className="text-xs font-semibold text-slate-800">
                      Included in every build:
                    </div>
                    <ul className="space-y-1 text-xs text-slate-600">
                      {currentPkg.highlights.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Direct Startup Commitments Box */}
                <div className="p-3 rounded-lg bg-slate-100/90 border border-slate-200 text-[11px] text-slate-600 space-y-1">
                  <div className="font-semibold text-slate-800 flex items-center gap-1.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-emerald-600" />
                    <span>NexGrid Startup Promise</span>
                  </div>
                  <p>
                    Fixed price quote before start · Free 30-day post-launch warranty · 100% full code and account transfer on completion.
                  </p>
                </div>

                {/* Action Button */}
                <div className="pt-1">
                  <button
                    onClick={onOpenEstimator}
                    className="w-full py-2.5 px-4 text-xs font-semibold text-slate-800 bg-white border border-slate-200 hover:border-sky-500 hover:text-sky-600 rounded-lg transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                  >
                    <span>Customize &amp; Calculate Exact Estimate</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
