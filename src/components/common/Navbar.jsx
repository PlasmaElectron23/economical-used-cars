import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const { t } = useLanguage();

  const linkBaseClass = "transition uppercase tracking-widest text-sm font-bold";
  
  const getLinkStyle = ({ isActive }) => 
    isActive ? `${linkBaseClass} text-blue-400` : `${linkBaseClass} hover:text-blue-300`;

  return (
    <nav className="bg-slate-900 text-white p-5 shadow-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex-col md:flex-row flex justify-between items-center gap-4">
        
        <Link 
          to="/" 
          className="text-xl font-black tracking-tighter hover:text-blue-400 transition uppercase"
        >
          Economical Used Cars
        </Link>

        <div className="flex items-center space-x-6">
          <NavLink to="/" className={getLinkStyle}>
            {t.navHome}
          </NavLink>
          
          <NavLink to="/inventory" className={getLinkStyle}>
            {t.navInventory}
          </NavLink>
          
          <LanguageToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;