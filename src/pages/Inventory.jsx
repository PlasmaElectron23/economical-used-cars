import React from 'react'
import { Link } from 'react-router-dom'
import { carData } from '../cars'

function Inventory() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      
      {/* 1. Navigation Header */}
      <nav className="p-6 border-b border-slate-900 flex justify-between items-center max-w-7xl mx-auto w-full">
        <Link to="/" className="hover:opacity-80 transition-opacity">
          <img src="/dealership-logo-2.png" alt="Logo" className="h-10 w-auto" />
        </Link>
        <Link to="/" className="text-brand-gray font-black uppercase italic text-sm hover:text-brand-red transition-colors">
          ← Back to Home
        </Link>
      </nav>

      {/* 2. Page Title Area */}
      <header className="py-16 px-6 text-center bg-slate-900/50">
        <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">
          Our <span className="text-brand-red">Full Inventory</span>
        </h1>
        <p className="text-slate-400 mt-4 font-bold uppercase tracking-widest text-sm">
          Quality pre-owned vehicles in Ocala, FL
        </p>
      </header>

      {/* 3. The Inventory Grid */}
      <main className="py-16 px-6 max-w-7xl mx-auto">
        {/* Results Counter */}
        <div className="mb-8 flex items-center gap-4">
          <span className="text-brand-orange font-black italic uppercase text-lg">
            {carData.length} Vehicles Available
          </span>
          <div className="h-px flex-1 bg-slate-900"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {carData.map((car) => (
            <div key={car.id} className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden flex flex-col">
              {/* Image with Price Overlay */}
              <div className="aspect-video bg-slate-800 relative group overflow-hidden">
                <img 
                  src={car.image} 
                  alt={`${car.year} ${car.make}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-0 right-0 bg-brand-red text-white font-black italic px-4 py-2 text-xl shadow-xl">
                  ${car.price.toLocaleString()}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-grow flex flex-col">
                <h2 className="text-2xl font-black uppercase italic leading-tight">
                  {car.year} {car.make}
                </h2>
                <p className="text-slate-400 font-bold uppercase tracking-wider mb-4">{car.model}</p>
                
                <div className="grid grid-cols-2 gap-4 border-t border-slate-800 pt-4 mt-auto">
                  <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none">
                    Mileage
                    <p className="text-white text-sm mt-1">{car.miles}</p>
                  </div>
                  <div className="text-[10px] font-black uppercase text-slate-500 tracking-widest leading-none text-right">
                    Transmission
                    <p className="text-white text-sm mt-1">{car.transmission}</p>
                  </div>
                </div>

                <a 
                  href={`tel:3525550123`} // Using a phone link for easy contact
                  className="block w-full mt-6 py-4 bg-transparent border-2 border-slate-800 text-center font-black uppercase italic hover:border-brand-orange hover:text-brand-orange transition-all duration-300"
                >
                  Call for Availability
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* 4. Contact Footer */}
      <footer className="bg-slate-900 py-12 px-6 text-center border-t border-slate-800">
        <div className="mb-6">
          <p className="text-brand-orange font-black italic uppercase mb-2">Need a test drive?</p>
          <p className="text-2xl font-black">Visit us in Ocala today.</p>
        </div>
        <p className="text-slate-600 font-bold uppercase text-[10px] tracking-[0.5em]">
          © 2026 Economical Used Cars
        </p>
      </footer>

    </div>
  )
}

export default Inventory