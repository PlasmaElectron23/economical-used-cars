import React, { useState, useEffect, useRef } from 'react';
import { text } from './constants/translations';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DetailModal from './components/DetailModal';

// Import your new page components
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Admin from './pages/Admin';

const API_BASE = "http://127.0.0.1:8787";
const ADMIN_KEY = "eduardo-super-secret-key";

function App() {
  const [view, setView] = useState('home'); 
  const [lang, setLang] = useState('es'); 
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
    const msg = lang === 'es' ? "¿Está seguro de eliminar este vehículo?" : "Are you sure you want to remove this vehicle?";
    if (!window.confirm(msg)) return;
    try {
      const res = await fetch(`${API_BASE}/api/inventory/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': ADMIN_KEY }
      });
      if (res.ok) fetchInventory();
    } catch (err) { alert("Error"); }
  };

  const handleFormSubmit = async (e) => {
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
    if (fileInputRef.current) fileInputRef.current.value = "";
    fetchInventory();
  };

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar view={view} setView={setView} lang={lang} setLang={setLang} text={text} />
      
      <DetailModal 
        selectedCar={selectedCar} 
        setSelectedCar={setSelectedCar} 
        lang={lang} 
        text={text} 
        API_BASE={API_BASE} 
      />

      <main className="flex-grow">
        {view === 'home' && (
          <Home 
            inventory={inventory} 
            setView={setView} 
            lang={lang} 
            text={text} 
            API_BASE={API_BASE} 
            setSelectedCar={setSelectedCar} 
          />
        )}

        {view === 'inventory' && (
          <Inventory 
            inventory={inventory} 
            lang={lang} 
            text={text} 
            API_BASE={API_BASE} 
            setSelectedCar={setSelectedCar} 
          />
        )}

        {view === 'admin' && (
          <Admin 
            inventory={inventory}
            formData={formData}
            setFormData={setFormData}
            handleFormSubmit={handleFormSubmit}
            loading={loading}
            lang={lang}
            text={text}
            API_BASE={API_BASE}
            setSelectedCar={setSelectedCar}
            handleToggleFeatured={handleToggleFeatured}
            handleDelete={handleDelete}
            fileInputRef={fileInputRef}
            setSelectedFiles={setSelectedFiles}
          />
        )}
      </main>

      <Footer lang={lang} text={text} />
    </div>
  );
}

export default App;