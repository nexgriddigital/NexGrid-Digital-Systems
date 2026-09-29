import React, { useState } from 'react';
import { pricingPresets } from '../data/agencyData';
import { EstimatorState } from '../types';
import { ArrowRight, CheckCircle2, Copy, Check, Sparkles } from 'lucide-react';
import { ConsultationEstimate } from './ConsultationModal';

interface ProjectEstimatorProps {
  onOpenConsultationModal: (estimate: ConsultationEstimate) => void;
  onApplyEstimateToContact?: (data: {
    projectType: string;
    estimatedBudget: string;
    targetTimeline: string;
    scopeSummary: string;
  }) => void;
}

export const ProjectEstimator: React.FC<ProjectEstimatorProps> = ({
  onOpenConsultationModal,
  onApplyEstimateToContact,
}) => {
  const [copied, setCopied] = useState(false);
  const [state, setState] = useState<EstimatorState>({
    projectType: 'marketing',
    pageScope: 'medium',
    addons: {
      cms: true,
      authPortal: false,
      advancedSeo: true,
      apiIntegrations: false,
      expressDelivery: false,
      slaSupport: false,
    },
  });

  // Calculate pricing based on selections
  const baseConfig = pricingPresets[state.projectType];
  let calculatedPrice = baseConfig.basePrice;
  let estimatedDays = baseConfig.baseDays;

  if (state.pageScope === 'starter') {
    calculatedPrice -= 8000;
    estimatedDays -= 4;
  } else if (state.pageScope === 'enterprise') {
    calculatedPrice += 20000;
    estimatedDays += 10;
  }

  if (state.addons.cms && state.projectType !== 'marketing') calculatedPrice += 9000;
  if (state.addons.authPortal) {
    calculatedPrice += 22000;
    estimatedDays += 7;
  }
  if (state.addons.advancedSeo) calculatedPrice += 7000;
  if (state.addons.apiIntegrations) {
    calculatedPrice += 14000;
    estimatedDays += 5;
  }
  if (state.addons.expressDelivery) {
    calculatedPrice += 12000;
    estimatedDays = Math.max(14, Math.round(estimatedDays * 0.7));
  }

  const timelineWeeks = Math.ceil(estimatedDays / 7);

  const getActiveAddonsList = () => {
    return [
      state.addons.cms ? 'Easy Content Editor (CMS)' : null,
      state.addons.advancedSeo ? 'Google SEO & Local Search Setup' : null,
      state.addons.apiIntegrations ? 'Payment Gateway (Telebirr / Chapa / Cards)' : null,
      state.addons.authPortal ? 'Client Login / Member Portal' : null,
      state.addons.expressDelivery ? 'Priority Fast-Track Launch' : null,
    ].filter(Boolean) as string[];
  };

  const getScopeLabel = () => {
    if (state.pageScope === 'starter') return 'Starter (1–5 pages)';
    if (state.pageScope === 'medium') return 'Standard (6–12 pages)';
    return 'Expanded (15+ pages)';
  };

  const handleApply = () => {
    const activeAddonsList = getActiveAddonsList();
    const scopeLabel = getScopeLabel();

    const estimate: ConsultationEstimate = {
      projectType: baseConfig.title,
      scopeLevel: scopeLabel,
      estimatedPrice: `ETB ${calculatedPrice.toLocaleString()}`,
      estimatedWeeks: `~${timelineWeeks} wks`,
      addonsList: activeAddonsList,
      inclusions: [
        '100% full code & account ownership',
        'Sub-second page load optimization',
        'Responsive testing on phones & laptops',
        '30-day post-launch warranty & training',
      ],
    };

    onOpenConsultationModal(estimate);

    if (onApplyEstimateToContact) {
      onApplyEstimateToContact({
        projectType: baseConfig.title,
        estimatedBudget: `ETB ${calculatedPrice.toLocaleString()}`,
        targetTimeline: `${timelineWeeks} weeks`,
        scopeSummary: `${baseConfig.title} (${scopeLabel}) with ${activeAddonsList.join(', ') || 'standard inclusions'}`,
      });
    }
  };

  const handleCopyQuote = async () => {
    const activeAddonsList = getActiveAddonsList().join(', ') || 'Standard inclusions';
    const scopeLabel = getScopeLabel();

    const textToCopy = `NexGrid Project Cost Estimate:
- Project Type: ${baseConfig.title}
- Scope Level: ${scopeLabel}
- Features & Add-ons: ${activeAddonsList}
- Estimated Total: ETB ${calculatedPrice.toLocaleString()} (Fixed Price Guarantee)
- Timeline to Launch: ~${timelineWeeks} wks (From kickoff sprint)
- Inclusions: 100% Code Ownership, Mobile Testing, Sub-second Speed, 30-Day Warranty.
Consultation: nexgriddigital@gmail.com`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    }
  };

  return (
    <section id="estimator" className="py-16 lg:py-24 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-10">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            Transparent Pricing
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 [text-wrap:balance]">
            Instant project cost estimator.
          </h2>
          <p className="text-base text-slate-600">
            No guessing games or vague "it depends" answers. Select your project specifications below for a transparent, real-world estimate in seconds.
          </p>
        </div>

        {/* 2-Column Calculator Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Project Type */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-3 shadow-xs">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Step 1: Choose Your Project Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  { id: 'marketing', name: 'Business Website', price: 'From ETB 37,000' },
                  { id: 'ecommerce', name: 'E-Commerce Store', price: 'From ETB 75,000' },
                  { id: 'webapp', name: 'Client Portal / App', price: 'From ETB 98,000' },
                  { id: 'redesign', name: 'Website Redesign', price: 'From ETB 27,000' },
                ].map((item) => {
                  const isSelected = state.projectType === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setState({ ...state, projectType: item.id as any })}
                      className={`p-3.5 rounded-lg border text-left transition-all cursor-pointer ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/70 text-slate-950 font-semibold shadow-xs ring-1 ring-sky-500/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="font-semibold text-sm">{item.name}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{item.price}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Scale & Pages */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-3 shadow-xs">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Step 2: Estimated Size &amp; Pages
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { id: 'starter', label: 'Starter', desc: '1–5 key pages' },
                  { id: 'medium', label: 'Standard', desc: '6–12 pages' },
                  { id: 'enterprise', label: 'Expanded', desc: '15+ pages' },
                ].map((scale) => {
                  const isSelected = state.pageScope === scale.id;
                  return (
                    <button
                      key={scale.id}
                      type="button"
                      onClick={() => setState({ ...state, pageScope: scale.id as any })}
                      className={`p-3 rounded-lg border text-center transition-all cursor-pointer ${
                        isSelected
                          ? 'border-sky-500 bg-sky-50/70 text-slate-950 font-semibold shadow-xs ring-1 ring-sky-500/20'
                          : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50/50'
                      }`}
                    >
                      <div className="text-sm font-semibold">{scale.label}</div>
                      <div className="text-xs text-slate-500 mt-0.5">{scale.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 3: Optional Features */}
            <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-3 shadow-xs">
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Step 3: Helpful Features &amp; Add-ons
              </label>
              <div className="space-y-2">
                {[
                  {
                    key: 'cms',
                    title: 'Easy Content Editor (CMS)',
                    desc: 'Edit copy, photos, and publish blog articles without code',
                    cost: 'Included in Marketing',
                  },
                  {
                    key: 'advancedSeo',
                    title: 'Google SEO & Local Search Setup',
                    desc: 'Schema markup, sitemap, and Google Search Console indexing',
                    cost: '+ETB 7,000',
                  },
                  {
                    key: 'apiIntegrations',
                    title: 'Payment Gateway (Telebirr / Chapa / Cards)',
                    desc: 'Telebirr, Chapa, CBE Birr, or card checkout integration',
                    cost: '+ETB 14,000',
                  },
                  {
                    key: 'authPortal',
                    title: 'Client Login / Member Portal',
                    desc: 'Secure dashboard for customer self-serve access',
                    cost: '+ETB 22,000',
                  },
                  {
                    key: 'expressDelivery',
                    title: 'Priority Fast-Track Launch',
                    desc: 'Accelerated turnaround with dedicated sprint resources',
                    cost: '+ETB 12,000',
                  },
                ].map((addon) => {
                  const isChecked = state.addons[addon.key as keyof typeof state.addons];
                  return (
                    <label
                      key={addon.key}
                      className={`flex items-start justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                        isChecked
                          ? 'border-sky-400 bg-sky-50/40'
                          : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/40'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) =>
                            setState({
                              ...state,
                              addons: { ...state.addons, [addon.key]: e.target.checked },
                            })
                          }
                          className="mt-0.5 h-4 w-4 rounded text-sky-600 focus:ring-sky-400 border-slate-300 cursor-pointer"
                        />
                        <div>
                          <div className="text-sm font-semibold text-slate-900">
                            {addon.title}
                          </div>
                          <div className="text-xs text-slate-500">
                            {addon.desc}
                          </div>
                        </div>
                      </div>
                      <span className="text-xs font-semibold text-slate-600 shrink-0 ml-2">
                        {addon.cost}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Results Column (Matches attached image) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 sm:p-7 shadow-sm space-y-6">
              
              <div className="space-y-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-sky-600">
                  Estimated Summary
                </div>
                <h3 className="font-display text-xl font-extrabold text-slate-900">
                  {baseConfig.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {baseConfig.description}
                </p>
              </div>

              {/* Price & Timeline Display */}
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-200">
                <div>
                  <div className="text-xs text-slate-500">Estimated Total</div>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono-code tabular-nums mt-0.5">
                    ETB {calculatedPrice.toLocaleString()}
                  </div>
                  <div className="text-[11px] text-emerald-600 font-medium mt-0.5">
                    Fixed price guarantee
                  </div>
                </div>

                <div>
                  <div className="text-xs text-slate-500">Timeline to Launch</div>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono-code tabular-nums mt-0.5">
                    ~{timelineWeeks} wks
                  </div>
                  <div className="text-[11px] text-slate-500 mt-0.5">
                    From kickoff sprint
                  </div>
                </div>
              </div>

              {/* What is always included */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-slate-800">
                  Every NexGrid build includes:
                </div>
                <ul className="space-y-1.5 text-xs text-slate-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>100% full code &amp; account ownership</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Sub-second page load optimization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>Responsive testing on phones &amp; laptops</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
                    <span>30-day post-launch warranty &amp; training</span>
                  </li>
                </ul>
              </div>

              {/* Action Buttons: Consultation and Copy */}
              <div className="space-y-2.5 pt-1">
                <button
                  type="button"
                  onClick={handleApply}
                  className="w-full py-3.5 px-4 text-xs font-bold uppercase tracking-wider text-white bg-[#1F1F1F] hover:bg-slate-800 active:scale-95 rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer border border-[#1F1F1F]"
                >
                  <span>Use this quote for consultation</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  type="button"
                  onClick={handleCopyQuote}
                  className="w-full py-2.5 px-4 text-xs font-semibold text-slate-700 hover:text-slate-950 bg-white hover:bg-slate-100 rounded-lg transition-all border border-slate-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
                >
                  {copied ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                      <span className="text-emerald-600 font-bold">Estimate Copied to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-slate-400" />
                      <span>Copy Estimate Summary</span>
                    </>
                  )}
                </button>
              </div>

              <div className="text-center text-[11px] text-slate-500">
                No obligation. We reply within 4 hours with recommendations.
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
