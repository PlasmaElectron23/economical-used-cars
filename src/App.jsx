import React, { useState, useEffect } from 'react';

const API_BASE = "http://127.0.0.1:8787";
const ADMIN_KEY = "eduardo-super-secret-key";

function App() {
  const [view, setView] = useState('home'); 
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({ 
    make: '', model: '', year: '', price: '', miles: '', description: '' 
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchInventory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/inventory`);
      const data = await res.json();
      setInventory(data);
    } catch (err) {
      console.error("Connection error:", err);
    }
  };

  useEffect(() => { fetchInventory(); }, []);

  const handleToggleFeatured = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    await fetch(`${API_BASE}/api/inventory/feature/${id}`, {
      method: 'POST',
      headers: { 
        'Authorization': ADMIN_KEY, 
        'Content-Type': 'application/json' 
      },
      body: JSON.stringify({ featured: newStatus })
    });
    fetchInventory();
  };

  // --- UI COMPONENTS ---

  const Navbar = () => (
    <nav className="bg-slate-900 text-white p-5 shadow-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter cursor-pointer" onClick={() => setView('home')}>
          ECONOMICAL USED CARS
        </h1>
        <div className="space-x-6 text-sm font-bold uppercase tracking-widest">
          <button onClick={() => setView('home')} className={view === 'home' ? 'text-blue-400' : ''}>Home</button>
          <button onClick={() => setView('inventory')} className={view === 'inventory' ? 'text-blue-400' : ''}>Inventory</button>
          <button onClick={() => setView('admin')} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition">Admin</button>
        </div>
      </div>
    </nav>
  );

  const CarCard = ({ car, isAdmin }) => (
    <div className="bg-white rounded-2xl shadow-sm border overflow-hidden group">
      <div className="relative h-56 bg-slate-200">
        <img 
          src={`${API_BASE}/images/${car.images?.split(',')[0]}`} 
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500" 
          alt={car.model}
        />
        {isAdmin && (
          <button 
            onClick={() => handleToggleFeatured(car.id, car.is_featured)}
            className={`absolute top-3 left-3 p-2 rounded-full shadow-lg transition ${car.is_featured ? 'bg-yellow-400 text-white' : 'bg-white/80 text-gray-400'}`}
          >
            ★
          </button>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold">{car.year} {car.make} {car.model}</h3>
          <span className="text-blue-600 font-black text-xl">${Number(car.price).toLocaleString()}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 h-10 line-clamp-2 italic">
          {car.description || "No description provided."}
        </p>
        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
          <span>{Number(car.miles).toLocaleString()} Miles</span>
          <span className="text-green-500">Available</span>
        </div>
      </div>
    </div>
  );

  // --- PAGE VIEWS ---

  if (view === 'home') return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <header className="py-24 px-4 text-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <h2 className="text-5xl font-black mb-6 text-balance">Quality Rides, Ocala Prices.</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          Welcome to Economical Used Cars. We specialize in reliable, high-quality pre-owned 
          vehicles for the Ocala community. Quality you can trust, prices you can afford.
        </p>
      </header>
      
      <section className="max-w-6xl mx-auto py-20 px-4">
        <h3 className="text-center text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-12">Featured Picks</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {inventory.filter(c => c.is_featured).slice(0, 3).map(car => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
        {inventory.filter(c => c.is_featured).length === 0 && (
            <p className="text-center text-slate-400 italic">No featured vehicles currently selected.</p>
        )}
        <div className="text-center mt-16">
          <button onClick={() => setView('inventory')} className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-700 transition shadow-xl">
            Browse Full Inventory
          </button>
        </div>
      </section>

      <footer className="bg-white border-t py-16 px-4 mt-auto">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <h4 className="font-black text-xl mb-4">Economical Used Cars</h4>
            <p className="text-gray-500 italic">"Providing reliable transportation to Marion County."</p>
          </div>
          <div className="md:text-right">
            <h4 className="font-bold text-gray-800 mb-2">Contact Eduardo</h4>
            <p className="text-gray-500">13804 SW 42nd Court Rd, Ocala, FL, 34473</p>
            <p className="text-blue-600 font-bold text-lg">(689) 282-9355</p>
          </div>
        </div>
      </footer>
    </div>
  );

  if (view === 'inventory') return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <div className="max-w-6xl mx-auto py-16 px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-4xl font-black text-slate-900">Current Stock</h2>
            <p className="text-slate-500">Reliable vehicles ready for the Ocala roads.</p>
          </div>
          <p className="text-slate-400 font-bold uppercase text-xs">{inventory.length} Vehicles found</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {inventory.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-xl border sticky top-24">
            <h2 className="text-xl font-bold mb-6">Manager Portal</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setLoading(true);
              const data = new FormData();
              Object.keys(formData).forEach(k => data.append(k, formData[k]));
              selectedFiles.forEach(f => data.append('images', f));

              await fetch(`${API_BASE}/api/inventory`, { 
                method: 'POST', 
                headers: { 'Authorization': ADMIN_KEY }, 
                body: data 
              });
              
              setLoading(false);
              setFormData({ make: '', model: '', year: '', price: '', miles: '', description: '' });
              setSelectedFiles([]);
              fetchInventory();
            }} className="space-y-4">
              <input name="make" placeholder="Make" value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} className="w-full p-3 border rounded-xl" required />
              <input name="model" placeholder="Model" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} className="w-full p-3 border rounded-xl" required />
              <textarea name="description" placeholder="Car History/Description" value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 border rounded-xl h-28" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" name="year" placeholder="Year" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="w-full p-3 border rounded-xl" />
                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-3 border rounded-xl" />
              </div>
              <input type="file" multiple onChange={(e) => setSelectedFiles(Array.from(e.target.files))} className="text-xs" />
              <button className="w-full bg-blue-600 text-white p-4 rounded-xl font-bold hover:bg-blue-700 shadow-lg transition">
                {loading ? 'Uploading...' : 'Add Vehicle'}
              </button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-8">
          {inventory.map(car => <CarCard key={car.id} car={car} isAdmin={true} />)}
        </div>
      </div>
    </div>
  );
}

export default App;