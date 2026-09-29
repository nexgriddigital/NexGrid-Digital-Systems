import React, { useState } from 'react';
import { agencyFaqs } from '../data/agencyData';
import { ChevronDown } from 'lucide-react';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 lg:py-24 border-b border-slate-200 bg-white">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="space-y-3 mb-12 text-center sm:text-left">
          <div className="text-xs font-semibold uppercase tracking-wider text-sky-600">
            Frequently Asked Questions
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight [text-wrap:balance]">
            Clear, honest answers.
          </h2>
          <p className="text-base text-slate-600">
            Everything you need to know about pricing, timelines, ownership, and maintenance.
          </p>
        </div>

        {/* Accordion List */}
        <div className="divide-y divide-slate-200 border-t border-b border-slate-200">
          {agencyFaqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={index} className="py-5">
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer focus-visible:outline-2 focus-visible:outline-sky-500"
                >
                  <span className="font-display text-base sm:text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {faq.question}
                  </span>
                  <div
                    className={`h-7 w-7 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-slate-500 group-hover:text-slate-900 transition-transform shrink-0 ${
                      isOpen ? 'rotate-180 text-sky-600 border-sky-300 bg-sky-50' : ''
                    }`}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="mt-3.5 pr-8 text-sm text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
