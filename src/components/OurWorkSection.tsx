import React, { useState } from 'react';
import { portfolioProjects } from '../data/agencyData';
import { ProjectWork } from '../types';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ExternalLink,
  Layers,
  Clock,
  ShieldCheck,
  Eye,
  X,
  Code2,
  Zap,
} from 'lucide-react';

interface OurWorkSectionProps {
  onSelectProjectForEstimate?: (projectCategory: string, projectName: string) => void;
  onOpenContactWithProject?: (projectName: string) => void;
}

export const OurWorkSection: React.FC<OurWorkSectionProps> = ({
  onSelectProjectForEstimate,
  onOpenContactWithProject,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedProject, setSelectedProject] = useState<ProjectWork | null>(null);

  const filteredProjects =
    activeCategory === 'all'
      ? portfolioProjects
      : portfolioProjects.filter((p) => p.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Projects', count: portfolioProjects.length },
    { id: 'marketing', label: 'Corporate & Marketing', count: 1 },
    { id: 'ecommerce', label: 'E-Commerce Stores', count: 1 },
    { id: 'webapp', label: 'Client Portals & Web Apps', count: 1 },
    { id: 'redesign', label: 'Speed Redesigns', count: 1 },
  ];

  return (
    <section id="work" className="py-20 lg:py-28 border-b border-slate-200 bg-white relative">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-50 border border-sky-200/80 text-sky-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5 text-sky-600" />
            <span>Our Work &amp; Case Studies</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
            Real Results. Proven Performance. Work We&apos;ve Built.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            From lightning-fast corporate websites to high-converting online stores, automated customer portals, and full speed overhauls.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-6 border-b border-slate-100 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer flex items-center gap-1.5 ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
              }`}
            >
              <span>{cat.label}</span>
              <span
                className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  activeCategory === cat.id ? 'bg-slate-700 text-slate-200' : 'bg-slate-200 text-slate-600'
                }`}
              >
                {cat.count}
              </span>
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="rounded-2xl border border-slate-200 bg-white hover:border-slate-300 hover:shadow-lg transition-all flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 sm:p-8 space-y-4">
                
                {/* Header Tag & Badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                    {project.categoryLabel}
                  </span>
                  {project.highlightBadge && (
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-sky-50 text-sky-700 border border-sky-200">
                      {project.highlightBadge}
                    </span>
                  )}
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
                    {project.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {project.description}
                </p>

                {/* Metrics Highlight Pills */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 border-t border-slate-100">
                  {project.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 text-center sm:text-left">
                      <div className="text-sm font-extrabold text-slate-900">
                        {m.value}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate">
                        {m.label}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tech Stack Pills */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-medium"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="text-xs font-bold text-slate-700 hover:text-slate-950 flex items-center gap-1 cursor-pointer"
                >
                  <Eye className="h-3.5 w-3.5 text-slate-500" />
                  <span>Case Study Details</span>
                </button>

                <button
                  onClick={() => {
                    if (onOpenContactWithProject) {
                      onOpenContactWithProject(project.title);
                    }
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-sky-600 hover:text-sky-700 cursor-pointer"
                >
                  <span>Request Similar Project</span>
                  <ArrowRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-8 rounded-2xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-6 shadow-md">
          <div className="space-y-1.5 text-center sm:text-left">
            <div className="text-xs font-bold uppercase tracking-wider text-sky-400 flex items-center justify-center sm:justify-start gap-1.5">
              <ShieldCheck className="h-4 w-4" />
              <span>Full Code &amp; Asset Ownership Guaranteed</span>
            </div>
            <h3 className="font-display text-lg sm:text-xl font-bold">
              Ready to build a high-performance website for your business?
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              Get an itemized quote with an exact launch timeline within 4 business hours.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href="#estimator"
              className="px-5 py-2.5 text-xs font-bold text-slate-900 bg-white hover:bg-slate-100 rounded-lg transition-colors shadow-xs"
            >
              Calculate Quote
            </a>
            <a
              href="#contact"
              className="px-5 py-2.5 text-xs font-bold text-white bg-sky-600 hover:bg-sky-500 rounded-lg transition-colors shadow-xs"
            >
              Request Consultation
            </a>
          </div>
        </div>

      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl rounded-2xl bg-white border border-slate-200 shadow-2xl p-6 sm:p-8 overflow-y-auto max-h-[92vh]">
            
            <button
              onClick={() => setSelectedProject(null)}
              aria-label="Close dialog"
              className="absolute top-4 right-4 h-8 w-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {/* Modal Header */}
            <div className="space-y-2 mb-6 pr-8">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">
                  {selectedProject.categoryLabel}
                </span>
                {selectedProject.highlightBadge && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-50 text-sky-700 border border-sky-200">
                    {selectedProject.highlightBadge}
                  </span>
                )}
              </div>
              <h3 className="font-display text-2xl font-bold text-slate-900">
                {selectedProject.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {selectedProject.headline}
              </p>
            </div>

            {/* Highlight Quote if Available */}
            {selectedProject.featuredQuote && (
              <div className="mb-6 p-4 rounded-xl bg-sky-50/70 border border-sky-200 text-xs sm:text-sm text-slate-800 italic">
                &ldquo;{selectedProject.featuredQuote}&rdquo;
              </div>
            )}

            {/* Metrics */}
            <div className="mb-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
              {selectedProject.metrics.map((m, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-center">
                  <div className="text-lg font-extrabold text-slate-900 font-display">
                    {m.value}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-medium">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>

            {/* Deep Description */}
            <div className="space-y-4 mb-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
              <h4 className="font-bold text-slate-900 text-sm">
                Project Overview &amp; Engineering Solution
              </h4>
              <p>{selectedProject.description}</p>
            </div>

            {/* Deliverables */}
            <div className="space-y-3 mb-6">
              <h4 className="font-bold text-slate-900 text-sm">
                Key Deliverables &amp; Inclusions:
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                {selectedProject.deliverables.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tech Stack */}
            <div className="mb-6">
              <h4 className="font-bold text-slate-900 text-xs mb-2">
                Technology &amp; Infrastructure Used:
              </h4>
              <div className="flex flex-wrap gap-2">
                {selectedProject.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-mono font-medium border border-slate-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                className="px-4 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const title = selectedProject.title;
                  setSelectedProject(null);
                  if (onOpenContactWithProject) {
                    onOpenContactWithProject(title);
                  }
                }}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold hover:bg-slate-800 transition-colors shadow-xs cursor-pointer"
              >
                <span>Request a Project Like This</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </button>
            </div>

          </div>
        </div>
      )}
    </section>
  );
};
