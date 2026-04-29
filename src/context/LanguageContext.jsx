import React, { createContext, useState, useContext, useEffect } from 'react';
import { text } from '../constants/translations';

// 1. Create the Context
const LanguageContext = createContext();

// 2. Create the Provider Component
export const LanguageProvider = ({ children }) => {
  // Default to Spanish ('es')
  const [lang, setLang] = useState('es');

  // 3. Persistence Logic
  // When the app first loads, check if the user previously selected a language
  useEffect(() => {
    const savedLang = localStorage.getItem('silver-cell-lang');
    if (savedLang) {
      setLang(savedLang);
    }
  }, []);

  // 4. Update Function
  const changeLanguage = (newLang) => {
    setLang(newLang);
    localStorage.setItem('silver-cell-lang', newLang);
  };

  // 5. Provide the Values
  // We provide 'lang' (the code), 'setLang' (the function), 
  // and 't' (the actual dictionary for the current language)
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

// 6. Custom Hook for easy access
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};