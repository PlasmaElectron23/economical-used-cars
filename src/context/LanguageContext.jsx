import React, { createContext, useState, useContext, useEffect } from 'react';
import { text } from '../constants/translations';

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Use a function to initialize state so it only checks localStorage once on load
  const [lang, setLang] = useState(() => {
    return localStorage.getItem('silver-cell-lang') || 'es';
  });

  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('silver-cell-lang', newLang);
  };

  return (
    <LanguageContext.Provider value={{ 
      lang, 
      setLang: changeLanguage, 
      t: text[lang] 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};