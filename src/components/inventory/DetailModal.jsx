import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const DetailModal = ({ 
  selectedCar, 
  setSelectedCar, 
  API_BASE 
}) => {
  const { t, lang } = useLanguage();

  if (!selectedCar) return null;

  const images = selectedCar.images ? selectedCar.images.split(',') : [];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 md:p-4 bg-black/95 backdrop-blur-md">
      <div className="bg-zinc-950 w-full max-w-5xl h-full md:h-auto md:max-h-[90vh] border border-zinc-800 shadow-2xl relative flex flex-col overflow-hidden">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={() => setSelectedCar(null)} 
          className="absolute top-6 right-6 z-[120] w-12 h-12 bg-red-600 hover:bg-white hover:text-black text-white flex items-center justify-center transition-all duration-300 group"
        >
          <span className="text-xl font-bold">✕</span>
        </button>

        <div className="overflow-y-auto h-full w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 min-h-full">
            
            {/* Image Gallery */}
            <div className="bg-black p-4 space-y-4 border-r border-zinc-900">
              {images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={`${API_BASE}/images/${img}`} 
                  className="w-full border border-zinc-800 grayscale-[30%] hover:grayscale-0 transition-all duration-500" 
                  alt={`${selectedCar.make} detail ${idx + 1}`} 
                />
              ))}
            </div>

            {/* Details Section */}
            <div className="p-8 md:p-12 flex flex-col">
              <div className="mb-auto">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-4 w-1 bg-red-600"></div>
                  <span className="text-zinc-500 font-black uppercase tracking-widest text-[10px]">
                    {t.modalStatus || "Available for Sale"}
                  </span>
                </div>

                <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter leading-none uppercase italic">
                  {selectedCar.year} <br/>
                  <span className="text-red-600">{selectedCar.make}</span> {selectedCar.model}
                </h2>
                
                <div className="flex items-center gap-6 mt-8 py-6 border-y border-zinc-900">
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-1">{t.formPrice}</p>
                    <p className="text-3xl font-black text-white italic">
                      ${Number(selectedCar.price).toLocaleString()}
                    </p>
                  </div>
                  <div className="w-px h-10 bg-zinc-800"></div>
                  <div>
                    <p className="text-zinc-500 text-[10px] uppercase font-black tracking-widest mb-1">{t.miles}</p>
                    <p className="text-3xl font-black text-white italic">
                      {Number(selectedCar.miles).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="mt-10">
                  <h4 className="font-black text-red-600 uppercase text-[10px] tracking-[0.3em] mb-4">
                    {t.formDescription}
                  </h4>
                  <p className="text-zinc-300 leading-relaxed font-mono text-sm whitespace-pre-wrap">
                    {selectedCar.description || (lang === 'es' ? "Contáctenos para más información." : "Contact us for info.")}
                  </p>
                </div>
              </div>

              {/* Action Box */}
              <div className="mt-12 p-8 bg-zinc-900 border-t-4 border-red-600">
                <p className="font-black text-white mb-2 uppercase text-xs tracking-widest italic">{t.modalInterest}</p>
                <p className="text-xs text-zinc-500 mb-6 font-mono uppercase">{t.modalCall}</p>
                <a 
                  href="tel:6892829355" 
                  className="inline-block w-full text-center bg-white text-black px-6 py-5 font-black hover:bg-red-600 hover:text-white transition-all duration-300 uppercase tracking-[0.2em] text-sm shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]"
                >
                  (689) 282-9355
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;