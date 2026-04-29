import React from 'react';

const CarCard = ({ 
  car, 
  isAdmin, 
  lang, 
  text, 
  API_BASE, 
  setSelectedCar, 
  handleToggleFeatured, 
  handleDelete 
}) => {
  // Extract images from the comma-separated string provided by the DB
  const carImages = car.images?.split(',') || [];
  const mainImage = carImages[0];

  return (
    <div 
      onClick={() => setSelectedCar(car)} 
      className="bg-white rounded-2xl shadow-sm border overflow-hidden group relative cursor-pointer hover:shadow-md transition"
    >
      {/* Image Section */}
      <div className="relative h-56 bg-slate-200">
        <img 
          src={`${API_BASE}/images/${mainImage}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          alt={`${car.make} ${car.model}`} 
        />
        
        {/* Admin Controls (Only visible if isAdmin prop is true) */}
        {isAdmin && (
          <div className="absolute top-3 w-full px-3 flex justify-between pointer-events-none">
            <button 
              onClick={(e) => { 
                e.stopPropagation(); // Prevents opening the modal when clicking the star
                handleToggleFeatured(car.id, car.is_featured); 
              }} 
              className={`p-2 rounded-full shadow-lg transition pointer-events-auto ${
                car.is_featured ? 'bg-yellow-400 text-white' : 'bg-white/80 text-gray-400 hover:text-yellow-500'
              }`}
            >
              ★
            </button>
            <button 
              onClick={(e) => { 
                e.stopPropagation(); // Prevents opening the modal when clicking delete
                handleDelete(car.id); 
              }} 
              className="bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition pointer-events-auto"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800">
            {car.year} {car.make} {car.model}
          </h3>
          <span className="text-blue-600 font-black text-xl">
            ${Number(car.price).toLocaleString()}
          </span>
        </div>
        
        <p className="text-gray-600 text-sm mb-4 h-10 line-clamp-2 italic">
          {car.description || (lang === 'es' ? "Consulte para detalles." : "Inquire for details.")}
        </p>
        
        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
          <span>{Number(car.miles).toLocaleString()} {text[lang].miles}</span>
          <span className="text-green-500 font-extrabold tracking-widest text-[10px]">
            {text[lang].inStock}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CarCard;