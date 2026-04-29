import React from 'react';
import CarCard from '../components/CarCard';

const Home = ({ 
  inventory, 
  setView, 
  lang, 
  text, 
  API_BASE, 
  setSelectedCar 
}) => {
  // Filter the inventory to show only featured cars on the landing page
  const featuredCars = inventory.filter(c => c.is_featured);

  return (
    <div className="flex-grow">
      {/* HERO SECTION */}
      <header className="py-24 px-4 text-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-black mb-6 leading-tight">
            {text[lang].heroTitle}
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            {text[lang].heroSub}
          </p>
        </div>
      </header>

      {/* FEATURED SECTION */}
      <section className="max-w-6xl mx-auto py-20 px-4">
        <div className="flex items-center justify-center gap-4 mb-12">
          <div className="h-px bg-slate-200 flex-grow max-w-[100px]"></div>
          <h3 className="text-center text-sm font-black uppercase tracking-[0.3em] text-blue-600">
            {text[lang].featuredTitle}
          </h3>
          <div className="h-px bg-slate-200 flex-grow max-w-[100px]"></div>
        </div>

        {featuredCars.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-inner">
            <p className="text-slate-400 italic text-lg">
              {text[lang].emptyFeatured}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Show only the first 3 featured cars on home */}
            {featuredCars.slice(0, 3).map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                lang={lang} 
                text={text} 
                API_BASE={API_BASE} 
                setSelectedCar={setSelectedCar} 
              />
            ))}
          </div>
        )}

        {/* Call to Action */}
        <div className="text-center mt-20">
          <button 
            onClick={() => setView('inventory')} 
            className="group relative inline-flex items-center gap-3 bg-slate-900 text-white px-12 py-5 rounded-full font-bold hover:bg-blue-600 transition-all duration-300 shadow-2xl hover:-translate-y-1"
          >
            {text[lang].browseBtn}
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;