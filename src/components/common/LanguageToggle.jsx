import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center bg-slate-800 rounded-full p-1 border border-slate-700 shadow-inner">
      
      {/* Spanish - Left Side */}
      <button
        onClick={() => setLang('es')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 text-[11px] font-black uppercase tracking-widest ${
          lang === 'es' 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'text-slate-400 hover:text-white'
        }`}
      >
        {/* Spanish Flag SVG */}
        <img 
          src="https://flagcdn.com/w40/es.png" 
          alt="Spanish" 
          className="w-4 h-4 rounded-full object-cover border border-white/20"
        />
        <span>ESP</span>
      </button>

      {/* English - Right Side */}
      <button
        onClick={() => setLang('en')}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all duration-300 text-[11px] font-black uppercase tracking-widest ${
          lang === 'en' 
          ? 'bg-blue-600 text-white shadow-lg' 
          : 'text-slate-400 hover:text-white'
        }`}
      >
        <span>ENG</span>
        {/* UK Flag SVG */}
        <img 
          src="https://flagcdn.com/w40/gb.png" 
          alt="English" 
          className="w-4 h-4 rounded-full object-cover border border-white/20"
        />
      </button>
    </div>
  );
};

export default LanguageToggle;