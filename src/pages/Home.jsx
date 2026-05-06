import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import CarCard from '../components/inventory/CarCard';

const Home = ({ inventory, setSelectedCar, API_BASE }) => {
  const { t } = useLanguage();

  const featuredCars = inventory.filter(car => Number(car.featured) === 1).slice(0, 3);

  return (
    <div className="flex-grow bg-black text-white">
      {/* HERO SECTION - SHARP & SLICK */}
      <header className="relative py-20 md:py-32 px-6 overflow-hidden border-b-4 border-red-600 bg-zinc-950">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-px h-full bg-white transform skew-x-12"></div>
          <div className="absolute top-0 right-1/4 w-px h-full bg-white transform -skew-x-12"></div>
        </div>

        <div className="max-w-5xl mx-auto flex flex-col items-center relative z-10">
          <div className="relative mb-10">
             <div className="absolute inset-0 bg-red-600 blur-3xl opacity-20"></div>
             <img 
              src="/euc-logo.png" 
              alt="EUC Logo" 
              className="w-32 h-32 md:w-44 md:h-44 object-contain relative z-10 drop-shadow-[0_0_15px_rgba(220,38,38,0.5)]"
            />
          </div>

          <h2 className="text-5xl md:text-8xl font-black mb-6 italic tracking-tighter uppercase leading-none text-center">
            {t.heroTitle?.split(' ').map((word, i) => (
              <span key={i} className={i % 2 === 0 ? "text-white" : "text-red-600"}>
                {word}{' '}
              </span>
            ))}
          </h2>

          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl font-light tracking-wide mb-12 border-l-4 border-red-600 pl-6">
            {t.heroSubtitle}
          </p>

          <a 
            href="/inventory" 
            className="group relative inline-block overflow-hidden bg-white text-black font-black py-5 px-12 transition-all transform hover:-skew-x-12 active:scale-95 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]"
          >
            <span className="relative z-10 uppercase tracking-tighter text-lg">{t.navInventory}</span>
          </a>
        </div>
      </header>

      {/* FEATURED SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-16">
          <div className="h-10 w-3 bg-red-600"></div>
          <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
            {t.featuredTitle || "Prime Selection"}
          </h2>
          <div className="flex-grow h-px bg-gradient-to-r from-red-600 to-transparent"></div>
        </div>
        
        {featuredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {featuredCars.map(car => (
              <div key={car.id} className="relative group p-[2px] bg-zinc-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative bg-black h-full">
                  <CarCard 
                    car={car} 
                    setSelectedCar={setSelectedCar} 
                    API_BASE={API_BASE}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-zinc-800">
            <p className="text-zinc-500 font-mono tracking-widest uppercase">{t.noCarsFound}</p>
          </div>
        )}
      </section>

      {/* CONTACT SECTION - TRANSLATED HEADERS */}
      <section id="contact" className="py-24 bg-zinc-950 border-t-8 border-zinc-900">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="text-4xl font-black uppercase italic mb-16 text-white tracking-[0.2em]">
             {t.contactTitle}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Phone Item */}
            <div className="p-10 bg-black border border-zinc-800 hover:border-red-600 transition-all group relative">
              <div className="absolute top-0 left-0 w-2 h-2 bg-red-600"></div>
              <div className="text-red-600 mb-6 flex justify-center group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">{t.phoneLabel}</p>
              <a href="tel:6892829355" className="text-3xl font-black text-white hover:text-red-600 transition-colors">
                689.282.9355
              </a>
            </div>

            {/* Hours Item */}
            <div className="p-10 bg-black border border-zinc-800 hover:border-red-600 transition-all group relative">
              <div className="absolute top-0 right-0 w-2 h-2 bg-red-600"></div>
              <div className="text-red-600 mb-6 flex justify-center group-hover:scale-110 transition-transform">
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="square" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-zinc-500 font-bold uppercase tracking-widest text-xs mb-4">{t.hoursLabel}</p>
              <div className="text-xl font-black text-white">
                <p className="mb-1">{t.daysOpen}</p>
                <p className="text-red-600 uppercase">07:00 AM — 11:00 PM</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;