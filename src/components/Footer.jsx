import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  // Pulling translations directly from the context
  const { t } = useLanguage();

  return (
    <footer className="bg-white border-t py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          
          {/* Brand Section */}
          <div>
            <h4 className="font-black text-xl mb-4 text-slate-900 uppercase tracking-tighter">
              Economical Used Cars
            </h4>
            <p className="text-gray-500 italic leading-relaxed text-sm">
              "{t.footerQuote}"
            </p>
          </div>

          {/* Contact Section */}
          <div className="md:text-right text-slate-900">
            <h4 className="font-black mb-2 uppercase tracking-[0.2em] text-[10px] text-blue-600">
              {t.contactTitle || "Contact"}
            </h4>
            <p className="text-gray-500 text-sm mb-1">
              13804 SW 42nd Court Rd, Ocala, FL, 34473
            </p>
            <a 
              href="tel:6892829355" 
              className="text-slate-900 font-black text-xl hover:text-blue-600 transition"
            >
              (689) 282-9355
            </a>
          </div>
        </div>

        {/* Bottom Bar: Location & Agency Credit */}
        <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <div className="flex gap-4">
            <span>Ocala</span>
            <span>•</span>
            <span>Marion County</span>
            <span>•</span>
            <span>Florida</span>
          </div>
          
          {/* Silver Cell Technologies Signature */}
          <div className="text-slate-300 hover:text-blue-500 transition cursor-default">
            © 2026 Built by <span className="text-slate-400 font-black">Silver Cell Technologies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;