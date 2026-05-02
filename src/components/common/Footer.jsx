import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-slate-900 text-white py-12 px-5 border-t border-slate-800">
      <div className="max-w-6xl mx-auto text-center">
        {/* Brand Section */}
        <h2 className="text-2xl font-black uppercase tracking-tighter mb-2">
          Economical Used Cars
        </h2>
        <p className="text-slate-400 italic mb-8">
          "Brindando transporte confiable a las familias de Ocala"
        </p>
        
        {/* Bottom Bar: Location & Agency Credit */}
        <div className="pt-8 border-t border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4">
            <div className="flex gap-2 md:gap-4">
              <span>Ocala</span>
              <span>•</span>
              <span>Marion County</span>
              <span>•</span>
              <span>Florida</span>
            </div>
            <span className="hidden md:inline">© 2026</span>
            <div className="text-slate-600">
              Built by <span className="text-slate-400 font-black">Silver Cell Technologies</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;