import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-black text-white py-16 px-6 border-t-4 border-red-600 relative overflow-hidden">
      {/* Background Subtle Grid Effect */}
      <div className="absolute inset-0 bg-mechanical-pattern opacity-10 pointer-events-none"></div>

      <div className="max-w-6xl mx-auto text-center relative z-10">
        
        {/* Brand Section - High Contrast */}
        <h2 className="text-3xl font-black uppercase italic tracking-tighter mb-4">
          Economical <span className="text-red-600">Used Cars</span>
        </h2>
        
        <p className="text-zinc-500 italic mb-10 tracking-wide uppercase text-xs font-bold">
          {t.footerMotto || "Reliable transportation for the families of Ocala"}
        </p>
        
        {/* Technical Data Bar */}
        <div className="pt-10 border-t border-zinc-900">
          <div className="flex flex-col md:flex-row justify-center items-center gap-6">
            
            {/* Location Data */}
            <div className="flex gap-4 text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em]">
              <span>Ocala</span>
              <span className="text-red-600">/</span>
              <span>Marion County</span>
              <span className="text-red-600">/</span>
              <span>Florida</span>
            </div>

            {/* Visual Divider for Desktop */}
            <div className="hidden md:block h-4 w-px bg-zinc-800 skew-x-[-20deg]"></div>

            {/* Copyright & Credit */}
            <div className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">
              <span className="mr-4">© 2026</span>
              <span className="text-zinc-600">
                Engineered by <span className="text-white hover:text-red-600 transition-colors cursor-default">Silver Cell Technologies</span>
              </span>
            </div>
          </div>
        </div>

        {/* Bottom "Exhaust" Detail */}
        <div className="mt-8 flex justify-center gap-1">
          <div className="h-1 w-8 bg-red-900"></div>
          <div className="h-1 w-24 bg-red-600"></div>
          <div className="h-1 w-8 bg-red-900"></div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;