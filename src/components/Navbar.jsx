import React from 'react';
import { NavLink, Link } from 'react-router-dom'; // 1. Import Router components
import { useLanguage } from '../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const { t } = useLanguage();

  // Helper for consistent link styling
  const linkBaseClass = "transition uppercase tracking-widest text-sm font-bold";
  
  // This function tells NavLink how to look when it's active vs inactive
  const getLinkStyle = ({ isActive }) => 
    isActive ? `${linkBaseClass} text-blue-400` : `${linkBaseClass} hover:text-blue-300`;

  return (
    <nav className="bg-slate-900 text-white p-5 shadow-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex-col md:flex-row flex justify-between items-center gap-4">
        
        {/* 2. Use 'Link' for the Logo to jump back to home */}
        <Link 
          to="/" 
          className="text-xl font-black tracking-tighter hover:text-blue-400 transition uppercase"
        >
          Economical Used Cars
        </Link>

        {/* Navigation & Language Toggle */}
        <div className="flex items-center space-x-6">
          
          {/* 3. Use 'NavLink' for automatic active-state detection */}
          <NavLink to="/" className={getLinkStyle}>
            {t.navHome}
          </NavLink>
          
          <NavLink to="/inventory" className={getLinkStyle}>
            {t.navInventory}
          </NavLink>

          <NavLink 
            to="/admin" 
            className={({ isActive }) => 
              `px-4 py-2 rounded-lg transition text-sm font-bold uppercase tracking-widest ${
                isActive 
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20' 
                  : 'bg-slate-800 text-slate-300 hover:bg-blue-600 hover:text-white'
              }`
            }
          >
            {t.navAdmin}
          </NavLink>
          
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;