import React from 'react';

const DetailModal = ({ 
  selectedCar, 
  setSelectedCar, 
  lang, 
  text, 
  API_BASE 
}) => {
  // If no car is selected, don't render anything
  if (!selectedCar) return null;

  // Split the images string into an array
  const images = selectedCar.images ? selectedCar.images.split(',') : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200 my-auto">
        
        {/* Close Button */}
        <button 
          onClick={() => setSelectedCar(null)} 
          className="absolute top-4 right-4 z-10 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-black transition text-sm font-bold"
        >
          {text[lang].modalClose}
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Image Gallery Column */}
          <div className="bg-slate-100 p-2 space-y-2 max-h-[80vh] overflow-y-auto">
            {images.map((img, idx) => (
              <img 
                key={idx} 
                src={`${API_BASE}/images/${img}`} 
                className="w-full rounded-xl shadow-sm" 
                alt={`${selectedCar.make} detail view ${idx + 1}`} 
              />
            ))}
          </div>

          {/* Details Column */}
          <div className="p-8 flex flex-col justify-between">
            <div>
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">
                {text[lang].modalStatus}
              </span>
              <h2 className="text-3xl font-black text-slate-900 mt-2">
                {selectedCar.year} {selectedCar.make} {selectedCar.model}
              </h2>
              
              <div className="flex items-center gap-4 mt-4">
                <p className="text-3xl font-black text-slate-800">
                  ${Number(selectedCar.price).toLocaleString()}
                </p>
                <div className="h-6 w-px bg-slate-300"></div>
                <p className="text-slate-500 font-bold">
                  {Number(selectedCar.miles).toLocaleString()} {text[lang].miles}
                </p>
              </div>

              <div className="mt-8">
                <h4 className="font-bold text-slate-400 uppercase text-xs tracking-wider mb-2">
                  {text[lang].desc}
                </h4>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">
                  {selectedCar.description || (lang === 'es' ? "Contáctenos para más información." : "Contact us for info.")}
                </p>
              </div>
            </div>

            {/* Call to Action Box */}
            <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
              <p className="font-bold text-slate-800 mb-1">{text[lang].modalInterest}</p>
              <p className="text-sm text-slate-500 mb-4">{text[lang].modalCall}</p>
              <a 
                href="tel:6892829355" 
                className="inline-block w-full text-center bg-blue-600 text-white px-6 py-4 rounded-full font-bold shadow-lg hover:bg-blue-700 transition"
              >
                (689) 282-9355
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;