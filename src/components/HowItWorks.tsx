import React from 'react';
import { clientSteps, clientGuarantees } from '../data/agencyData';
import { CheckCircle2, Clock } from 'lucide-react';

export const HowItWorks: React.FC = () => {
  return (
    <section id="process" className="py-16 lg:py-24 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-2xl space-y-3 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            Simple 3-Step Process
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 [text-wrap:balance]">
            How we work together, from idea to launch.
          </h2>
          <p className="text-base text-slate-600">
            No confusion, no endless meetings, no technical headaches. A streamlined, predictable process designed to respect your time and budget.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {clientSteps.map((step) => (
            <div
              key={step.number}
              className="rounded-xl border border-slate-200 bg-slate-50/70 p-6 sm:p-7 flex flex-col justify-between shadow-xs"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-display text-2xl font-bold text-sky-600">
                    {step.number}
                  </span>
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1">
                    <Clock className="h-3 w-3 text-slate-400" />
                    {step.timing}
                  </span>
                </div>

                <h3 className="font-display text-lg font-bold text-slate-900">
                  {step.title}
                </h3>

                <p className="text-sm text-slate-600 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Client Guarantees Bar */}
        <div className="mt-12 rounded-xl border border-slate-200 bg-slate-50/90 p-6 sm:p-8">
          <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">
            Our Commitments to Every Client
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {clientGuarantees.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-sm text-slate-900">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />
                  <span>{item.title}</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed pl-6">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
