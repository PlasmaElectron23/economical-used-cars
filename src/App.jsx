import React from 'react'

function App() {
  return (
    /* This main div creates the dark background and centers everything */
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center text-white p-4">
      
      {/* Header Section */}
      <header className="text-center">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-400 drop-shadow-md mb-4 tracking-tight">
          Economical Used Cars
        </h1>
        <p className="text-xl text-slate-400 max-w-md mx-auto">
          Providing reliable transportation to the community with honesty and integrity.
        </p>
      </header>

      {/* Action Section */}
      <main className="mt-10">
        <button 
          className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-lg shadow-lg transform transition-all hover:scale-105 active:scale-95"
          onClick={() => alert('Inventory coming soon!')}
        >
          Browse Inventory
        </button>
      </main>

      {/* Footer / Contact Preview */}
      <footer className="mt-20 text-slate-500 text-sm border-t border-slate-800 pt-8 w-full max-w-2xl text-center">
        <p>© 2026 Economical Used Cars | Local Service You Can Trust</p>
      </footer>
      
    </div>
  )
}

export default App