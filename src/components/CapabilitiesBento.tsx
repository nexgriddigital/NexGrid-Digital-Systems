import React from 'react';
import { capabilityServices } from '../data/agencyData';
import { CheckCircle2, ArrowRight, Clock } from 'lucide-react';

interface CapabilitiesBentoProps {
  onSelectServiceForEstimate: (serviceId: string) => void;
  onOpenContact: (note?: string) => void;
}

export const CapabilitiesBento: React.FC<CapabilitiesBentoProps> = ({
  onSelectServiceForEstimate,
  onOpenContact,
}) => {
  return (
    <section id="services" className="py-16 lg:py-24 border-b border-slate-200 bg-slate-50/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            What We Do
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 [text-wrap:balance]">
            Tailored digital solutions, built around your business goals.
          </h2>
          <p className="text-base text-slate-600">
            Every business is unique. We do not force cookie-cutter templates. We design and engineer websites and digital tools that solve your exact operational and sales challenges.
          </p>
        </div>

        {/* 4 Clean Service Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {capabilityServices.map((service) => (
            <div
              key={service.id}
              className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-slate-400 transition-all shadow-xs"
            >
              <div className="space-y-4">
                
                {/* Header with index */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-semibold text-slate-400">
                    {service.number}
                  </span>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    {service.typicalTimeline}
                  </span>
                </div>

                <div>
                  <h3 className="font-display text-xl font-bold text-slate-900">
                    {service.title}
                  </h3>
                  <p className="text-sm font-medium text-sky-700 mt-1">
                    {service.headline}
                  </p>
                </div>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.description}
                </p>

                {/* Deliverables List */}
                <div className="pt-2 space-y-2">
                  <div className="text-xs font-semibold text-slate-800">
                    What is included:
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-600">
                    {service.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Best for */}
                <div className="pt-3 text-xs text-slate-500 border-t border-slate-100">
                  <span className="font-semibold text-slate-700">Ideal for: </span>
                  {service.idealFor}
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between gap-3">
                <div className="text-xs text-slate-500">
                  <span className="font-medium text-emerald-600">{service.impactMetric}</span>
                </div>

                <button
                  onClick={() => onSelectServiceForEstimate(service.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:text-sky-600 cursor-pointer"
                >
                  <span>Estimate price</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
