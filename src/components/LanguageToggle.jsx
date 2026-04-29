import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center bg-slate-100 rounded-full p-1 border border-slate-200">
      {/* Spanish - Left Side */}
      <button
        onClick={() => setLang('es')}
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 text-[10px] font-black uppercase tracking-widest ${
          lang === 'es' 
          ? 'bg-white text-blue-600 shadow-sm' 
          : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        <span className="text-sm">🇪🇸</span> ESP
      </button>

      {/* English - Right Side */}
      <button
        onClick={() => setLang('en')}
        className={`flex items-center gap-2 px-3 py-1 rounded-full transition-all duration-300 text-[10px] font-black uppercase tracking-widest ${
          lang === 'en' 
          ? 'bg-white text-blue-600 shadow-sm' 
          : 'text-slate-400 hover:text-slate-600'
        }`}
      >
        ENG <span className="text-sm">🇬🇧</span>
      </button>
    </div>
  );
};

export default LanguageToggle;