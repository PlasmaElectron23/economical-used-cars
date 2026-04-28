import React, { useState, useEffect, useRef } from 'react';

const API_BASE = "http://127.0.0.1:8787";
const ADMIN_KEY = "eduardo-super-secret-key";

// u1-8: UI Text Dictionary
const text = {
  es: {
    navHome: "Inicio",
    navInventory: "Inventario",
    navAdmin: "Gestión",
    heroTitle: "Autos de Calidad, Precios de Ocala.",
    heroSub: "Bienvenidos a Economical Used Cars. Nos especializamos en vehículos usados confiables y de alta calidad para la comunidad de Ocala.",
    featuredTitle: "Selecciones Destacadas",
    emptyFeatured: "Nuestra selección destacada se está actualizando. ¡Vuelva pronto!",
    browseBtn: "Ver Todo el Inventario",
    stockTitle: "Inventario Actual",
    stockSub: "Vehículos confiables listos para los caminos de Ocala.",
    found: "Vehículos encontrados",
    footerQuote: "Brindando transporte confiable al Condado de Marion.",
    contact: "Contáctenos",
    adminTitle: "Gestor de Vehículos",
    fleetTitle: "Flota Actual",
    saveBtn: "Guardar Vehículo",
    adding: "Agregando...",
    miles: "Millas",
    price: "Precio",
    year: "Año",
    make: "Marca",
    model: "Modelo",
    desc: "Descripción",
    upload: "Subir Fotos",
    modalClose: "✕ Cerrar",
    modalStatus: "Disponible Ahora",
    modalInterest: "¿Interesado en este auto?",
    modalCall: "Llame a nuestra oficina de Ocala para programar una prueba de manejo.",
    inStock: "En Inventario"
  },
  en: {
    navHome: "Home",
    navInventory: "Inventory",
    navAdmin: "Management",
    heroTitle: "Quality Rides, Ocala Prices.",
    heroSub: "Welcome to Economical Used Cars. We specialize in reliable, high-quality pre-owned vehicles for the Ocala community.",
    featuredTitle: "Featured Picks",
    emptyFeatured: "Our featured selection is currently being updated. Check back soon!",
    browseBtn: "Browse Full Inventory",
    stockTitle: "Current Stock",
    stockSub: "Reliable vehicles ready for the Ocala roads.",
    found: "Vehicles found",
    footerQuote: "Providing reliable transportation to Marion County.",
    contact: "Contact Us",
    adminTitle: "Vehicle Manager",
    fleetTitle: "Current Fleet",
    saveBtn: "Save Vehicle",
    adding: "Adding...",
    miles: "Miles",
    price: "Price",
    year: "Year",
    make: "Make",
    model: "Model",
    desc: "Description",
    upload: "Upload Photos",
    modalClose: "✕ Close",
    modalStatus: "Available Now",
    modalInterest: "Interested in this car?",
    modalCall: "Call our Ocala office to schedule a test drive.",
    inStock: "In Stock"
  }
};

function App() {
  const [view, setView] = useState('home'); 
  const [lang, setLang] = useState('es'); // Spanish as default
  const [inventory, setInventory] = useState([]);
  const [formData, setFormData] = useState({ make: '', model: '', year: '', price: '', miles: '', description: '' });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedCar, setSelectedCar] = useState(null);
  const fileInputRef = useRef(null);

  const fetchInventory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/inventory`);
      const data = await res.json();
      setInventory(data);
    } catch (err) { console.error("Connection error:", err); }
  };

  useEffect(() => { fetchInventory(); }, []);

  const handleToggleFeatured = async (id, currentStatus) => {
    const newStatus = currentStatus === 1 ? 0 : 1;
    await fetch(`${API_BASE}/api/inventory/feature/${id}`, {
      method: 'POST',
      headers: { 'Authorization': ADMIN_KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({ featured: newStatus })
    });
    fetchInventory();
  };

  const handleDelete = async (id) => {
    if (!window.confirm(lang === 'es' ? "¿Está seguro de eliminar este vehículo?" : "Are you sure you want to remove this vehicle?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/inventory/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': ADMIN_KEY }
      });
      if (res.ok) fetchInventory();
    } catch (err) { alert("Error"); }
  };

  const Navbar = () => (
    <nav className="bg-slate-900 text-white p-5 shadow-xl sticky top-0 z-50">
      <div className="max-w-6xl mx-auto flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter cursor-pointer" onClick={() => setView('home')}>
          ECONOMICAL USED CARS
        </h1>
        <div className="flex items-center space-x-6 text-sm font-bold uppercase tracking-widest">
          <button onClick={() => setView('home')} className={view === 'home' ? 'text-blue-400' : ''}>{text[lang].navHome}</button>
          <button onClick={() => setView('inventory')} className={view === 'inventory' ? 'text-blue-400' : ''}>{text[lang].navInventory}</button>
          <button onClick={() => setView('admin')} className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-500 transition">{text[lang].navAdmin}</button>
          
          <button 
            onClick={() => setLang(lang === 'es' ? 'en' : 'es')}
            className="ml-4 border border-slate-700 px-3 py-1 rounded-full text-[10px] hover:bg-slate-800 transition bg-slate-800/50"
          >
            {lang === 'es' ? 'EN' : 'ES'}
          </button>
        </div>
      </div>
    </nav>
  );

  const CarCard = ({ car, isAdmin }) => (
    <div onClick={() => setSelectedCar(car)} className="bg-white rounded-2xl shadow-sm border overflow-hidden group relative cursor-pointer hover:shadow-md transition">
      <div className="relative h-56 bg-slate-200">
        <img src={`${API_BASE}/images/${car.images?.split(',')[0]}`} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt={car.model} />
        {isAdmin && (
          <div className="absolute top-3 w-full px-3 flex justify-between pointer-events-none">
            <button onClick={(e) => { e.stopPropagation(); handleToggleFeatured(car.id, car.is_featured); }} className={`p-2 rounded-full shadow-lg transition pointer-events-auto ${car.is_featured ? 'bg-yellow-400 text-white' : 'bg-white/80 text-gray-400 hover:text-yellow-500'}`}>★</button>
            <button onClick={(e) => { e.stopPropagation(); handleDelete(car.id); }} className="bg-red-500/90 hover:bg-red-600 text-white p-2 rounded-full shadow-lg transition pointer-events-auto">✕</button>
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-slate-800">{car.year} {car.make} {car.model}</h3>
          <span className="text-blue-600 font-black text-xl">${Number(car.price).toLocaleString()}</span>
        </div>
        <p className="text-gray-600 text-sm mb-4 h-10 line-clamp-2 italic">{car.description || (lang === 'es' ? "Consulte para detalles." : "Inquire for details.")}</p>
        <div className="flex justify-between text-xs font-bold text-gray-400 uppercase">
          <span>{Number(car.miles).toLocaleString()} {text[lang].miles}</span>
          <span className="text-green-500 font-extrabold tracking-widest text-[10px]">{text[lang].inStock}</span>
        </div>
      </div>
    </div>
  );

  const DetailModal = () => {
    if (!selectedCar) return null;
    const images = selectedCar.images ? selectedCar.images.split(',') : [];
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-sm overflow-y-auto">
        <div className="bg-white w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200 my-auto">
          <button onClick={() => setSelectedCar(null)} className="absolute top-4 right-4 z-10 bg-black/50 text-white px-4 py-2 rounded-full hover:bg-black transition text-sm font-bold">{text[lang].modalClose}</button>
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="bg-slate-100 p-2 space-y-2 max-h-[70vh] overflow-y-auto">
              {images.map((img, idx) => (<img key={idx} src={`${API_BASE}/images/${img}`} className="w-full rounded-xl shadow-sm" alt="vehicle view" />))}
            </div>
            <div className="p-8">
              <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">{text[lang].modalStatus}</span>
              <h2 className="text-3xl font-black text-slate-900 mt-2">{selectedCar.year} {selectedCar.make} {selectedCar.model}</h2>
              <div className="flex items-center gap-4 mt-4">
                <p className="text-3xl font-black text-slate-800">${Number(selectedCar.price).toLocaleString()}</p>
                <div className="h-6 w-px bg-slate-300"></div>
                <p className="text-slate-500 font-bold">{Number(selectedCar.miles).toLocaleString()} {text[lang].miles}</p>
              </div>
              <div className="mt-8">
                <h4 className="font-bold text-slate-400 uppercase text-xs tracking-wider mb-2">{text[lang].desc}</h4>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedCar.description || (lang === 'es' ? "Contáctenos para más información." : "Contact us for info.")}</p>
              </div>
              <div className="mt-12 p-6 bg-slate-50 rounded-2xl border border-slate-200">
                <p className="font-bold text-slate-800 mb-1">{text[lang].modalInterest}</p>
                <p className="text-sm text-slate-500 mb-4">{text[lang].modalCall}</p>
                <a href="tel:6892829355" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:bg-blue-700 transition">(689) 282-9355</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (view === 'home') return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar />
      <DetailModal />
      <header className="py-24 px-4 text-center bg-gradient-to-b from-slate-900 to-slate-800 text-white">
        <h2 className="text-5xl font-black mb-6">{text[lang].heroTitle}</h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">{text[lang].heroSub}</p>
      </header>
      <section className="max-w-6xl mx-auto py-20 px-4 flex-grow">
        <h3 className="text-center text-sm font-black uppercase tracking-[0.3em] text-blue-600 mb-12">{text[lang].featuredTitle}</h3>
        {inventory.filter(c => c.is_featured).length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 italic">{text[lang].emptyFeatured}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {inventory.filter(c => c.is_featured).slice(0, 3).map(car => (<CarCard key={car.id} car={car} />))}
          </div>
        )}
        <div className="text-center mt-16">
          <button onClick={() => setView('inventory')} className="bg-slate-900 text-white px-10 py-4 rounded-full font-bold hover:bg-slate-700 transition shadow-xl">{text[lang].browseBtn}</button>
        </div>
      </section>
      <footer className="bg-white border-t py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
          <div><h4 className="font-black text-xl mb-4 text-slate-900">Economical Used Cars</h4><p className="text-gray-500 italic">"{text[lang].footerQuote}"</p></div>
          <div className="md:text-right text-slate-900"><h4 className="font-bold mb-2">{text[lang].contact}</h4><p className="text-gray-500 text-sm">13804 SW 42nd Court Rd, Ocala, FL, 34473</p><p className="text-blue-600 font-black text-lg">(689) 282-9355</p></div>
        </div>
      </footer>
    </div>
  );

  if (view === 'inventory') return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar />
      <DetailModal />
      <div className="max-w-6xl mx-auto py-16 px-4 flex-grow">
        <div className="flex justify-between items-end mb-12">
          <div><h2 className="text-4xl font-black text-slate-900">{text[lang].stockTitle}</h2><p className="text-slate-500">{text[lang].stockSub}</p></div>
          <p className="text-slate-400 font-bold uppercase text-xs">{inventory.length} {text[lang].found}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">{inventory.map(car => <CarCard key={car.id} car={car} />)}</div>
      </div>
      <footer className="bg-white border-t py-8 px-4 mt-12 text-center text-gray-400 text-sm font-bold uppercase tracking-widest"><p>Ocala, FL | (689) 282-9355</p></footer>
    </div>
  );

  return (
    <div className="bg-slate-50 min-h-screen">
      <Navbar />
      <DetailModal />
      <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 lg:grid-cols-4 gap-12">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 sticky top-24">
            <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-4">{text[lang].adminTitle}</h2>
            <form onSubmit={async (e) => {
              e.preventDefault(); setLoading(true);
              const data = new FormData();
              Object.keys(formData).forEach(k => data.append(k, formData[k]));
              selectedFiles.forEach(f => data.append('images', f));
              await fetch(`${API_BASE}/api/inventory`, { method: 'POST', headers: { 'Authorization': ADMIN_KEY }, body: data });
              setLoading(false); setFormData({ make: '', model: '', year: '', price: '', miles: '', description: '' });
              setSelectedFiles([]); if (fileInputRef.current) fileInputRef.current.value = "";
              fetchInventory();
            }} className="space-y-4">
              <input name="make" placeholder={text[lang].make} value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} className="w-full p-3 border rounded-xl bg-slate-50" required />
              <input name="model" placeholder={text[lang].model} value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} className="w-full p-3 border rounded-xl bg-slate-50" required />
              <textarea name="description" placeholder={text[lang].desc} value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} className="w-full p-3 border rounded-xl bg-slate-50 h-28" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" name="year" placeholder={text[lang].year} value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="w-full p-3 border rounded-xl bg-slate-50" />
                <input type="number" name="price" placeholder={text[lang].price} value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className="w-full p-3 border rounded-xl bg-slate-50" />
              </div>
              <input type="number" name="miles" placeholder={text[lang].miles} value={formData.miles} onChange={(e) => setFormData({...formData, miles: e.target.value})} className="w-full p-3 border rounded-xl bg-slate-50" />
              <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 p-4 rounded-xl text-center">
                <label className="block text-xs font-bold text-blue-600 uppercase mb-2">{text[lang].upload}</label>
                <input type="file" multiple ref={fileInputRef} onChange={(e) => setSelectedFiles(Array.from(e.target.files))} className="text-xs file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-full" />
              </div>
              <button className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-slate-700 transition">{loading ? text[lang].adding : text[lang].saveBtn}</button>
            </form>
          </div>
        </div>
        <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold mb-6 text-slate-800">{text[lang].fleetTitle}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">{inventory.map(car => <CarCard key={car.id} car={car} isAdmin={true} />)}</div>
        </div>
      </div>
    </div>
  );
}

export default App;