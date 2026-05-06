import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import CarCard from '../components/inventory/CarCard';

const Inventory = ({ inventory = [], API_BASE, setSelectedCar }) => {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-black text-white flex flex-col w-full">
      {/* Header Section */}
      <div className="bg-zinc-950 border-b-4 border-red-600 py-16 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="border-l-4 border-red-600 pl-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic leading-none">
              {t.inventoryTitle}
            </h2>
            <p className="text-zinc-500 mt-4 font-light tracking-wide max-w-xl">
              {t.heroSubtitle}
            </p>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 px-6 py-3 flex items-center gap-3">
            <div className="w-2 h-2 bg-red-600 animate-pulse"></div>
            <p className="font-mono text-xs font-black uppercase tracking-[0.2em] text-white">
              {inventory.length} <span className="text-zinc-500">Units Detected</span>
            </p>
          </div>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-7xl mx-auto py-16 px-6 flex-grow w-full">
        {inventory.length === 0 ? (
          <div className="text-center py-40 border-2 border-dashed border-zinc-900 bg-zinc-950/50">
            <p className="text-zinc-700 font-mono tracking-[0.4em] uppercase animate-pulse">
              {t.noCarsFound}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {inventory.map(car => (
              <div key={car.id} className="relative group p-[1px] bg-zinc-800 transition-all hover:bg-red-600">
                <div className="bg-black h-full">
                  <CarCard 
                    car={car} 
                    API_BASE={API_BASE} 
                    setSelectedCar={setSelectedCar} 
                  />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Technical Footer */}
        <div className="mt-24 pt-12 border-t border-zinc-900 flex flex-col items-center">
          <div className="flex gap-2 mb-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="w-1 h-1 bg-zinc-800"></div>
            ))}
          </div>
          <p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.5em] text-center">
            Economical Used Cars • Marion Oaks • Ocala • Deployment 2026.04
          </p>
        </div>
      </div>
    </div>
  );
};

export default Inventory;