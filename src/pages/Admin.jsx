import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import CarCard from '../components/inventory/CarCard';

const ADMIN_KEY = "kilo-power-5241";

const Admin = ({ inventory, fetchInventory, API_BASE, setSelectedCar }) => {
  const { t, lang } = useLanguage();
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({ 
    make: '', model: '', year: '', price: '', miles: '', description: '' 
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));
    selectedFiles.forEach(f => data.append('images', f));
    
    try {
      const res = await fetch(`${API_BASE}/api/inventory`, { 
        method: 'POST', 
        headers: { 'Authorization': ADMIN_KEY }, 
        body: data 
      });
      if (!res.ok) throw new Error("Upload failed");
      setFormData({ make: '', model: '', year: '', price: '', miles: '', description: '' });
      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchInventory();
    } catch (err) {
      alert(lang === 'es' ? "Error al subir el vehículo" : "Error uploading vehicle");
    } finally {
      setLoading(false);
    }
  };

  const handleToggleFeatured = async (id, currentStatus) => {
    try {
      const newStatus = Number(currentStatus) === 1 ? 0 : 1;
      await fetch(`${API_BASE}/api/inventory/feature/${id}`, {
        method: 'POST',
        headers: { 'Authorization': ADMIN_KEY, 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: newStatus })
      });
      fetchInventory();
    } catch (err) {
      console.error("Feature toggle error:", err);
    }
  };

  const handleDelete = async (id) => {
    const msg = lang === 'es' ? "¿Eliminar vehículo?" : "Remove vehicle?";
    if (!window.confirm(msg)) return;
    try {
      const res = await fetch(`${API_BASE}/api/inventory/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': ADMIN_KEY }
      });
      if (res.ok) fetchInventory();
    } catch (err) { 
      alert(lang === 'es' ? "Error al eliminar" : "Error deleting"); 
    }
  };

  // Base class for inputs
  const inputClass = "w-full p-4 bg-black border border-zinc-800 text-white focus:border-red-600 outline-none transition-all font-mono text-sm uppercase tracking-tight placeholder:text-zinc-600";

  return (
    <div className="min-h-screen bg-black text-white py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-12">
        
        {/* FORM COLUMN */}
        <div className="lg:col-span-1">
          <div className="bg-zinc-950 border-t-4 border-red-600 p-8 shadow-2xl sticky top-24">
            <h2 className="text-2xl font-black mb-8 italic uppercase tracking-tighter border-b border-zinc-800 pb-4">
              {t.adminTitle}
            </h2>
            
            <form onSubmit={handleFormSubmit} className="space-y-4">
              <input placeholder={t.formMake} value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} className={inputClass} required />
              <input placeholder={t.formModel} value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} className={inputClass} required />
              
              {/* DESCRIPTION: Removed 'uppercase' and added 'normal-case' to allow mixed casing */}
              <textarea 
                placeholder={t.formDescription} 
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                className={`${inputClass} h-32 resize-none normal-case tracking-normal`} 
              />
              
              <div className="grid grid-cols-1 gap-4">
                <input type="number" placeholder={t.formYear} value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className={inputClass} required />
                <div className="grid grid-cols-2 gap-4">
                  <input type="number" placeholder={t.formPrice} value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} className={inputClass} required />
                  <input type="number" placeholder={t.formMiles || "Miles"} value={formData.miles} onChange={(e) => setFormData({...formData, miles: e.target.value})} className={inputClass} required />
                </div>
              </div>
              
              <div className="border border-dashed border-zinc-800 p-4 hover:border-red-600 transition-colors bg-zinc-900/50">
                <label className="block text-[10px] font-black text-red-600 uppercase mb-3 tracking-widest">{t.formImages}</label>
                <input type="file" multiple ref={fileInputRef} onChange={(e) => setSelectedFiles(Array.from(e.target.files))} className="text-[10px] text-zinc-500 file:bg-red-600 file:text-white file:border-0 file:px-3 file:py-1 file:mr-4 file:uppercase file:font-black" />
              </div>
              
              <button disabled={loading} className="w-full bg-white text-black py-4 font-black uppercase tracking-widest hover:bg-red-600 hover:text-white transition-all transform active:scale-95 shadow-[4px_4px_0px_0px_rgba(220,38,38,1)]">
                {loading ? t.submiting : t.submitBtn}
              </button>
            </form>
          </div>
        </div>
        
        {/* LIST COLUMN */}
        <div className="lg:col-span-3">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-8 w-2 bg-red-600"></div>
            <h2 className="text-4xl font-black uppercase italic tracking-tighter">{t.inventoryTitle}</h2>
          </div>
          
          {inventory.length === 0 ? (
            <div className="text-center py-24 bg-zinc-950 border border-zinc-900 border-dashed">
              <p className="text-zinc-600 font-mono tracking-widest uppercase">{t.noCarsFound}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {inventory.map(car => (
                <div key={car.id} className="bg-zinc-950 p-[1px] group transition-all hover:bg-red-600">
                  <div className="bg-black p-2 h-full">
                    <CarCard 
                      car={car} 
                      isAdmin={true} 
                      API_BASE={API_BASE} 
                      setSelectedCar={setSelectedCar} 
                      handleToggleFeatured={handleToggleFeatured} 
                      handleDelete={handleDelete} 
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;