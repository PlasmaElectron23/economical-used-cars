import React from 'react'
import { Link } from 'react-router-dom'
import { carData } from '../cars' 

function Home() {
  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans">
      
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6 border-b border-slate-900">
        <div className="mb-10">
          <img 
            src="/dealership-logo-2.png" 
            alt="Economical Used Cars Logo" 
            className="w-64 h-auto drop-shadow-[0_0_25px_rgba(220,38,38,0.3)]"
          />
        </div>

        <header className="text-center space-y-4">
          <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
            Economical <span className="text-brand-red">Used Cars</span>
          </h1>
          
          <div className="flex items-center justify-center gap-4">
            <div className="h-px w-8 md:w-12 bg-brand-orange"></div>
            <p className="text-sm md:text-xl text-slate-400 font-bold uppercase tracking-[0.4em]">
              Reliable <span className="text-brand-orange">•</span> Affordable <span className="text-brand-orange">•</span> Trusted
            </p>
            <div className="h-px w-8 md:w-12 bg-brand-orange"></div>
          </div>
        </header>
      </section>

      {/* Featured Inventory (Dynamic Filter) */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <h2 className="text-3xl font-black italic uppercase text-white">Featured Deals</h2>
            <div className="h-1 w-20 bg-brand-red mt-2"></div>
          </div>
          <Link to="/inventory" className="text-brand-orange font-black uppercase tracking-widest hover:text-white transition-colors flex items-center gap-2">
            View All Inventory <span>→</span>
          </Link>
        </div>

        {/* The Dynamic Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {carData.filter(car => car.featured).map((car) => (
            <div key={car.id} className="bg-slate-900 border border-slate-800 rounded-sm overflow-hidden group hover:border-brand-red/50 transition-all">
              {/* Image Container */}
              <div className="aspect-video bg-slate-800 relative overflow-hidden">
                <img 
                  src={car.image} 
                  alt={`${car.year} ${car.make}`} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 bg-brand-red text-white text-[10px] font-black px-2 py-1 uppercase italic tracking-widest shadow-lg">
                  Top Choice
                </div>
              </div>

              {/* Details Content */}
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-black uppercase italic leading-tight">
                    {car.year} {car.make} <br />
                    <span className="text-slate-400">{car.model}</span>
                  </h3>
                  <p className="text-brand-orange font-black text-2xl">${car.price.toLocaleString()}</p>
                </div>
                
                <div className="flex justify-between text-slate-500 text-xs mt-6 font-bold uppercase tracking-widest border-t border-slate-800 pt-4">
                  <span>{car.miles} Miles</span>
                  <span>{car.transmission}</span>
                </div>

                <Link 
                  to="/inventory" 
                  className="block w-full mt-6 py-3 text-center border border-brand-red text-brand-red font-black uppercase italic hover:bg-brand-red hover:text-white transition-all duration-300"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="bg-slate-900 py-20 px-6 border-t border-slate-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-4xl font-black italic uppercase mb-6">
              Visit Us in <span className="text-brand-red">Ocala</span>
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed max-w-md">
              Reliable transportation shouldn't break the bank. Stop by our Ocala lot today to test drive your next vehicle.
            </p>
            
            <div className="space-y-8">
              {/* Phone Card */}
              <a 
                href="tel:+16892829355" 
                className="flex items-center gap-6 group bg-slate-950 p-4 border border-slate-800 hover:border-brand-orange transition-colors"
              >
                <span className="text-brand-orange text-3xl group-hover:scale-110 transition-transform">📞</span>
                <div>
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Call or Text</p>
                  <p className="text-white text-xl font-black tracking-tighter">+1 (689) 282-9355</p>
                </div>
              </a>

              {/* Location Card */}
              <div className="flex items-center gap-6 bg-slate-950 p-4 border border-slate-800">
                <span className="text-brand-red text-3xl">📍</span>
                <div>
                  <p className="text-slate-500 font-bold uppercase text-xs tracking-widest">Our Location</p>
                  <p className="text-white text-xl font-black tracking-tighter">Ocala, Florida</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Visual Map/Brand Box */}
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-brand-red to-brand-orange rounded-sm blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative bg-slate-950 border border-slate-800 h-80 rounded-sm flex flex-col items-center justify-center text-center p-8">
              <h3 className="text-brand-red font-black italic text-3xl uppercase mb-2">Economical</h3>
              <p className="text-white font-black italic text-xl uppercase tracking-widest border-b-2 border-brand-orange pb-2">Used Cars</p>
              <p className="text-slate-500 mt-6 font-bold uppercase text-sm tracking-[0.3em]">Ocala's Trusted Dealer</p>
              <div className="mt-8 px-6 py-2 bg-slate-900 border border-slate-700 text-slate-400 text-[10px] font-black uppercase tracking-[0.5em]">
                Marion County
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-900 text-center">
        <p className="text-slate-600 font-bold uppercase text-[10px] tracking-[0.5em]">
          © 2026 Economical Used Cars | Quality You Can Drive
        </p>
      </footer>
      
    </div>
  )
}

export default Home