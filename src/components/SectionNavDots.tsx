import React, { useState, useEffect, useCallback } from 'react';

interface SectionItem {
  id: string;
  label: string;
}

const SECTIONS: SectionItem[] = [
  { id: 'top', label: 'Home' },
  { id: 'services', label: 'Services' },
  { id: 'work', label: 'Our Work' },
  { id: 'process', label: 'How It Works' },
  { id: 'estimator', label: 'Estimator' },
  { id: 'why-us', label: 'Why NexGrid' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'contact', label: 'Contact' },
];

export const SectionNavDots: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('top');
  const [isVisible, setIsVisible] = useState<boolean>(true);

  const determineActiveSection = useCallback(() => {
    const scrollPosition = window.scrollY + window.innerHeight * 0.35;

    for (let i = SECTIONS.length - 1; i >= 0; i--) {
      const section = SECTIONS[i];
      const element = document.getElementById(section.id);
      if (element) {
        const top = element.offsetTop;
        if (scrollPosition >= top - 100) {
          setActiveSection(section.id);
          return;
        }
      }
    }
    setActiveSection('top');
  }, []);

  useEffect(() => {
    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          determineActiveSection();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    determineActiveSection();

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [determineActiveSection]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(id);
    }
  };

  return (
    <nav
      aria-label="Section navigation"
      className="hidden md:flex fixed right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center"
    >
      <div className="flex flex-col items-center gap-2.5 p-2 rounded-full bg-white/75 backdrop-blur-md border border-slate-200/80 shadow-xs hover:shadow-md transition-all">
        {SECTIONS.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <div key={section.id} className="relative flex items-center group">
              {/* Tooltip on hover */}
              <div
                role="tooltip"
                className="pointer-events-none absolute right-7 px-2.5 py-1 rounded-md bg-slate-900 text-white text-[11px] font-semibold tracking-wide shadow-md opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-150 whitespace-nowrap z-50 flex items-center gap-1.5"
              >
                <span>{section.label}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
              </div>

              {/* Dot Button */}
              <button
                type="button"
                onClick={() => scrollToSection(section.id)}
                aria-label={`Scroll to ${section.label} section`}
                aria-current={isActive ? 'true' : undefined}
                className="relative flex items-center justify-center p-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 rounded-full"
              >
                <span
                  className={`block rounded-full transition-all duration-300 ${
                    isActive
                      ? 'w-2 h-5 bg-linear-to-b from-blue-600 via-sky-500 to-teal-400 shadow-xs'
                      : 'w-2 h-2 bg-slate-300 group-hover:bg-slate-400 group-hover:scale-125'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </nav>
  );
};
