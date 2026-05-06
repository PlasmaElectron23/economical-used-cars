import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import LanguageToggle from './LanguageToggle';

const Navbar = () => {
  const { t } = useLanguage();

  // Mechanical "Interface" Link Styles
  const getLinkStyle = ({ isActive }) => {
    const base = "px-3 py-1 text-sm font-black uppercase tracking-widest transition-all italic relative group";
    return isActive 
      ? `${base} text-red-600 drop-shadow-[0_0_8px_rgba(220,38,38,0.8)]` 
      : `${base} text-white hover:text-red-500`;
  };

  return (
    <nav className="bg-black border-b-2 border-red-600 sticky top-0 z-50 shadow-[0_4px_20px_rgba(220,38,38,0.3)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center h-auto md:h-20 py-4 md:py-0 gap-4">
          
          {/* BRANDING - METALLIC LOGO STYLE */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center group">
              <div className="relative">
                <div className="absolute inset-0 bg-red-600 blur-lg opacity-0 group-hover:opacity-40 transition-opacity"></div>
                <span className="text-2xl font-black italic tracking-tighter text-white uppercase transition-transform group-hover:scale-105 inline-block">
                  Economical <span className="text-red-600">Used Cars</span>
                </span>
              </div>
            </Link>
          </div>

          {/* NAVIGATION CONTROLS */}
          <div className="flex items-center space-x-2 md:space-x-8">
            <NavLink to="/" className={getLinkStyle}>
              {({ isActive }) => (
                <>
                  {t.navHome}
                  {isActive && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 shadow-[0_0_5px_red]"></div>}
                </>
              )}
            </NavLink>
            
            <NavLink to="/inventory" className={getLinkStyle}>
              {({ isActive }) => (
                <>
                  {t.navInventory}
                  {isActive && <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-red-600 shadow-[0_0_5px_red]"></div>}
                </>
              )}
            </NavLink>

            {/* MECHANICAL DIVIDER */}
            <div className="h-8 w-[2px] bg-zinc-800 skew-x-[-20deg] hidden sm:block"></div>

            <div className="flex items-center pl-2">
              <LanguageToggle />
            </div>
          </div>

        </div>
      </div>

      {/* LOWER DECORATIVE SCAN-LINE */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-900 to-transparent opacity-20"></div>
    </nav>
  );
};

export default Navbar;