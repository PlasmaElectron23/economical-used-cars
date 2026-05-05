import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import CarCard from '../components/inventory/CarCard';

const Home = ({ inventory, setSelectedCar, API_BASE }) => {
  const { t } = useLanguage();

  // Filter to show only the 3 featured cars
  const featuredCars = inventory.filter(car => Number(car.featured) === 1).slice(0, 3);

  return (
    <div className="flex-grow">
      {/* HERO SECTION - Responsive text and padding */}
      <header className="py-16 md:py-24 px-6 text-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight tracking-tighter">
            {t.heroTitle}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base md:text-xl leading-relaxed mb-10">
            {t.heroSubtitle}
          </p>
          <a 
            href="/inventory" 
            className="inline-block w-full md:w-auto bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-full transition shadow-lg uppercase tracking-widest text-sm"
          >
            {t.navInventory}
          </a>
        </div>
      </header>

      {/* Featured Cars Section - responsive gap and padding */}
      <section className="py-12 md:py-20 px-6 max-w-7xl mx-auto w-full">
        <h2 className="text-2xl md:text-3xl font-black uppercase mb-8 md:mb-12 text-slate-900 tracking-tighter border-l-8 border-blue-600 pl-4">
          {t.featuredTitle || "Featured Vehicles"}
        </h2>
        
        {featuredCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {featuredCars.map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                setSelectedCar={setSelectedCar} 
                API_BASE={API_BASE}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-10 bg-slate-50 rounded-3xl border border-dashed border-slate-300">
            <p className="text-slate-500">{t.noCarsFound}</p>
          </div>
        )}
      </section>

      {/* CONTACT US SECTION - Responsive grid stacking */}
      <section id="contact" className="py-12 md:py-20 bg-slate-100 px-6 border-t border-slate-200">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-12 items-center">
          
          {/* Contact Details */}
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase mb-8 tracking-tighter text-slate-900">
              {t.navContact || "Contact Us"}
            </h2>
            <div className="space-y-6 text-base md:text-lg text-slate-700">
              <div className="flex items-start gap-4">
                <span className="bg-blue-600 text-white p-2 rounded-lg mt-1 shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </span>
              </div>

              <div className="flex items-start gap-4">
                <span className="bg-blue-600 text-white p-2 rounded-lg mt-1 shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </span>
                <div>
                  <p className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-1">
                    {t.formPhone || "Phone"}
                  </p>
                  <p>(689) 282-9355</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <span className="bg-blue-600 text-white p-2 rounded-lg mt-1 shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </span>
                <div>
                  <p className="font-bold text-slate-900 uppercase text-xs tracking-widest mb-1">
                    {t.formHours || "Hours"}
                  </p>
                  <p>Mon - Sat: 9:00 AM - 6:00 PM</p>
                  <p>{t.closed || "Sunday: Closed"}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};

export default Home;