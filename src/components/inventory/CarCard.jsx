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
      className="bg-zinc-950 border border-zinc-900 overflow-hidden transition-all group flex flex-col h-full hover:border-zinc-700"
    >
      {/* Image Section */}
      <div className="relative aspect-[4/3] bg-zinc-900 overflow-hidden">
        <img 
          src={`${API_BASE}/images/${mainImage}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-700 grayscale-[20%] group-hover:grayscale-0" 
          alt={`${car.make} ${car.model}`} 
        />
        
        {/* Admin Controls */}
        {isAdmin && (
          <div className="absolute top-3 w-full px-3 flex justify-between z-20">
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                handleToggleFeatured(car.id, car.is_featured); 
              }} 
              className={`p-3 rounded-none shadow-2xl transition-all ${
                Number(car.is_featured) === 1 
                ? 'bg-red-600 text-white' 
                : 'bg-black/80 text-zinc-500 hover:text-white'
              }`}
            >
              {Number(car.is_featured) === 1 ? '★' : '☆'}
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); 
                handleDelete(car.id); 
              }} 
              className="bg-black/80 hover:bg-red-600 text-white p-3 rounded-none shadow-2xl transition-all"
            >
              ✕
            </button>
          </div>
        )}

        {/* Price Tag Overlay */}
        <div className="absolute bottom-0 right-0 bg-red-600 px-4 py-2 font-black text-xl italic tracking-tighter">
          ${Number(car.price).toLocaleString()}
        </div>
      </div>

      {/* Content Section */}
      <div className="p-5 flex flex-col flex-grow border-t border-zinc-900">
        <div className="mb-4">
          <h3 className="text-lg font-black uppercase tracking-tighter text-white leading-none">
            {car.year} {car.make}
          </h3>
          <p className="text-red-600 font-bold uppercase text-[10px] tracking-[0.2em] mt-1">
            {car.model}
          </p>
        </div>
        
        <p className="text-zinc-400 text-xs mb-6 line-clamp-2 italic h-8 font-mono">
          {car.description || (lang === 'es' ? "Consulte para detalles." : "Inquire for details.")}
        </p>
        
        <div className="flex justify-between items-center mb-6 text-[10px] font-bold text-zinc-500 uppercase tracking-widest border-y border-zinc-900 py-3">
          <span>{Number(car.miles).toLocaleString()} {t.miles}</span>
          <span className="text-zinc-300">
            {t.inStock || "Available"}
          </span>
        </div>

        <button 
          onClick={() => setSelectedCar(car)}
          className="w-full mt-auto bg-white text-black font-black py-3 px-6 hover:bg-red-600 hover:text-white transition-all uppercase tracking-widest text-[10px] active:scale-[0.98]"
        >
          {t.viewDetails}
        </button>
      </div>
    </div>
  );
};

export default CarCard;