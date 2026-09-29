import React from 'react';
import { comparisonPoints } from '../data/agencyData';
import { Check, X } from 'lucide-react';

export const ComparisonMatrix: React.FC = () => {
  return (
    <section id="why-us" className="py-16 lg:py-24 border-b border-slate-200 bg-slate-50/60">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-2xl space-y-3 mb-12">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            Why NexGrid
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            How we compare to typical alternatives.
          </h2>
          <p className="text-base text-slate-600">
            We built NexGrid to be the web partner we would want to hire: direct communication, transparent pricing, and zero corporate runaround.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 bg-white shadow-xs">
          <table className="w-full min-w-[650px] border-collapse text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wider text-slate-500 bg-slate-50/50">
                <th className="py-4 px-5 w-1/4">Key Factors</th>
                <th className="py-4 px-5 w-1/3 bg-sky-50/70 text-slate-950 font-bold border-l border-r border-sky-200">
                  NexGrid
                </th>
                <th className="py-4 px-5 w-1/5 text-slate-500">Traditional Agency</th>
                <th className="py-4 px-5 w-1/5 text-slate-500">Cheap Site Templates</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {comparisonPoints.map((point, index) => (
                <tr key={index} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 px-5 font-semibold text-slate-900">
                    {point.feature}
                  </td>
                  <td className="py-4 px-5 bg-sky-50/30 border-l border-r border-sky-100 text-slate-900 font-medium">
                    <div className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{point.nexgrid}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-slate-500 text-xs">
                    <div className="flex items-start gap-2">
                      <X className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{point.traditionalAgency}</span>
                    </div>
                  </td>
                  <td className="py-4 px-5 text-slate-500 text-xs">
                    <div className="flex items-start gap-2">
                      <X className="h-3.5 w-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span>{point.cheapTemplates}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </section>
  );
};
