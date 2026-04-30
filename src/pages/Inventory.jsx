import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import CarCard from '../components/inventory/CarCard';

const Inventory = ({ 
  inventory = [], 
  API_BASE, 
  setSelectedCar 
}) => {
  // Pulling the translations from the global brain
  const { t } = useLanguage();

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 flex-grow w-full">
      
      {/* Header & Results Counter */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-4">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight uppercase">
            {t.inventoryTitle}
          </h2>
          <p className="text-slate-500 mt-2">
            {/* Using heroSubtitle or a similar descriptive key from your translations */}
            {t.heroSubtitle}
          </p>
        </div>
        
        <div className="bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
          <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">
            {inventory.length} {t.navInventory}
          </p>
        </div>
      </div>

      {/* Inventory Grid */}
      {inventory.length === 0 ? (
        <div className="text-center py-32 bg-white rounded-3xl border border-dashed border-slate-200 shadow-inner">
          <p className="text-slate-400 italic font-medium">
            {t.noCarsFound}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {inventory.map(car => (
            <CarCard 
              key={car.id} 
              car={car} 
              API_BASE={API_BASE} 
              setSelectedCar={setSelectedCar} 
            />
          ))}
        </div>
      )}

      {/* SEO/Trust Footer for Ocala */}
      <div className="mt-20 pt-10 border-t border-slate-200 text-center">
        <p className="text-slate-400 text-[10px] font-black uppercase tracking-[0.3em]">
          Economical Used Cars • Marion Oaks • Ocala • Florida
        </p>
      </div>
    </div>
  );
};

export default Inventory;