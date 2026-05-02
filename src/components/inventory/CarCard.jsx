import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const CarCard = ({ 
  car, 
  isAdmin, 
  API_BASE, 
  setSelectedCar, 
  handleToggleFeatured, 
  handleDelete 
}) => {
  const { t, lang } = useLanguage();

  const carImages = car.images?.split(',') || [];
  const mainImage = carImages[0];

  return (
    <div 
      className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-md transition-shadow group flex flex-col h-full"
    >
      {/* Image Section - Fixed aspect ratio for consistency */}
      <div className="relative aspect-[4/3] bg-slate-200 overflow-hidden">
        <img 
          src={`${API_BASE}/images/${mainImage}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          alt={`${car.make} ${car.model}`} 
        />
        
        {/* Admin Controls */}
        {isAdmin && (
          <div className="absolute top-3 w-full px-3 flex justify-between">
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                handleToggleFeatured(car.id, car.is_featured); 
              }} 
              className={`p-3 rounded-full shadow-lg transition ${
                car.is_featured ? 'bg-yellow-400 text-white' : 'bg-white/90 text-gray-400 hover:text-yellow-500'
              }`}
            >
              ★
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                handleDelete(car.id); 
              }} 
              className="bg-red-500/90 hover:bg-red-600 text-white p-3 rounded-full shadow-lg transition"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter text-slate-900 leading-none">
              {car.year} {car.make}
            </h3>
            <p className="text-slate-500 font-bold uppercase text-xs tracking-widest mt-1">
              {car.model}
            </p>
          </div>
          <span className="text-xl font-black text-blue-600">
            ${Number(car.price).toLocaleString()}
          </span>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 italic h-10">
          {car.description || (lang === 'es' ? "Consulte para detalles." : "Inquire for details.")}
        </p>
        
        <div className="flex justify-between items-center mb-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
          <span>{Number(car.miles).toLocaleString()} {t.miles}</span>
          <span className="text-green-500 bg-green-50 px-2 py-1 rounded-md">
            {t.inStock || "In Stock"}
          </span>
        </div>

        {/* Big Touch Target for Mobile */}
        <button 
          onClick={() => setSelectedCar(car)}
          className="w-full mt-auto bg-slate-900 text-white font-bold py-4 px-6 rounded-2xl hover:bg-blue-600 transition uppercase tracking-widest text-xs active:scale-[0.98]"
        >
          {t.viewDetails}
        </button>
      </div>
    </div>
  );
};

export default CarCard;