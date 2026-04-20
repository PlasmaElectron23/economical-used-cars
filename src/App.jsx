import React from 'react'

function App() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white p-6">
      
      {/* Logo Section */}
      <div className="mb-10">
        <img 
          src="/dealership-logo-2.png" 
          alt="Economical Used Cars Logo" 
          className="w-64 h-auto drop-shadow-[0_0_25px_rgba(220,38,38,0.3)]"
        />
      </div>

      {/* Hero Section */}
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

      {/* Main Action */}
      <main className="mt-16">
        <button 
          className="group relative px-12 py-5 bg-brand-red hover:bg-brand-orange text-white font-black text-2xl uppercase italic transition-all duration-300 rounded-sm shadow-xl hover:shadow-brand-red/50"
          onClick={() => alert('Our inventory is being updated. Check back soon!')}
        >
          View Inventory
          <span className="absolute bottom-2 left-1/2 w-0 h-1 bg-white transition-all group-hover:w-3/4 group-hover:-translate-x-1/2"></span>
        </button>
      </main>

      {/* Footer Section */}
      <footer className="mt-32 w-full max-w-4xl border-t border-slate-900 pt-8 flex flex-col md:flex-row justify-between items-center text-slate-600 font-bold uppercase text-xs tracking-widest gap-4">
        <p>© 2026 Economical Used Cars</p>
        <p>Ocala, Florida</p>
        <p className="text-brand-gray italic">Quality You Can Drive</p>
      </footer>
      
    </div>
  )
}

export default App