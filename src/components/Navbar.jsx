import React from 'react';

const Navbar = ({ view, setView, lang, setLang, text }) => (
  <nav className="bg-slate-900 text-white p-5 shadow-xl sticky top-0 z-50">
    <div className="max-w-6xl mx-auto flex-col md:flex-row flex justify-between items-center gap-4">
      {/* Branding / Logo */}
      <h1 
        className="text-xl font-black tracking-tighter cursor-pointer hover:text-blue-400 transition" 
        onClick={() => setView('home')}
      >
        ECONOMICAL USED CARS
      </h1>

      {/* Navigation & Language Toggle */}
      <div className="flex items-center space-x-6 text-sm font-bold uppercase tracking-widest">
        <button 
          onClick={() => setView('home')} 
          className={`transition ${view === 'home' ? 'text-blue-400' : 'hover:text-blue-300'}`}
        >
          {text[lang].navHome}
        </button>
        
        <button 
          onClick={() => setView('inventory')} 
          className={`transition ${view === 'inventory' ? 'text-blue-400' : 'hover:text-blue-300'}`}
        >
          {text[lang].navInventory}
        </button>

        <button 
          onClick={() => setView('admin')} 
          className={`px-4 py-2 rounded-lg transition ${
            view === 'admin' 
              ? 'bg-blue-500 text-white' 
              : 'bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white'
          }`}
        >
          {text[lang].navAdmin}
        </button>
        
        {/* Language Switcher */}
        <button 
          onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
          className="ml-4 border border-slate-700 px-3 py-1 rounded-full text-[10px] hover:bg-slate-800 transition bg-slate-800/50 text-blue-400 font-black"
        >
          {lang === 'es' ? 'ENGLISH' : 'ESPAÑOL'}
        </button>
      </div>
    </div>
  </nav>
);

export default Navbar;