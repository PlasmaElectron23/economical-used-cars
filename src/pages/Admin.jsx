import React, { useState, useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import CarCard from '../components/CarCard';

const ADMIN_KEY = "kilo-power-5241"; // We will move this to an .env in step 7

const Admin = ({ inventory, fetchInventory, API_BASE, setSelectedCar }) => {
  const { t, lang } = useLanguage();
  const fileInputRef = useRef(null);

  // --- INTERNAL STATE ---
  const [loading, setLoading] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [formData, setFormData] = useState({ 
    make: '', model: '', year: '', price: '', miles: '', description: '' 
  });

  // --- HANDLERS ---
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const data = new FormData();
    Object.keys(formData).forEach(k => data.append(k, formData[k]));
    selectedFiles.forEach(f => data.append('images', f));
    
    try {
      await fetch(`${API_BASE}/api/inventory`, { 
        method: 'POST', 
        headers: { 'Authorization': ADMIN_KEY }, 
        body: data 
      });
      
      // Reset form on success
      setFormData({ make: '', model: '', year: '', price: '', miles: '', description: '' });
      setSelectedFiles([]);
      if (fileInputRef.current) fileInputRef.current.value = "";
      fetchInventory();
    } catch (err) {
      alert("Error uploading vehicle");
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async (id) => {
    const msg = lang === 'es' 
      ? "¿Está seguro de eliminar este vehículo?" 
      : "Are you sure you want to remove this vehicle?";
    
    if (!window.confirm(msg)) return;
    
    try {
      const res = await fetch(`${API_BASE}/api/inventory/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': ADMIN_KEY }
      });
      if (res.ok) fetchInventory();
    } catch (err) { 
      alert("Error deleting vehicle"); 
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 lg:grid-cols-4 gap-12 w-full">
      
      {/* LEFT COLUMN: The Add Form */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 sticky top-24">
          <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-4">
            {t.adminTitle}
          </h2>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input 
              placeholder={t.formMake} 
              value={formData.make} 
              onChange={(e) => setFormData({...formData, make: e.target.value})} 
              className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              required 
            />
            
            <input 
              placeholder={t.formModel} 
              value={formData.model} 
              onChange={(e) => setFormData({...formData, model: e.target.value})} 
              className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              required 
            />
            
            <textarea 
              placeholder={t.formDescription} 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              className="w-full p-3 border rounded-xl bg-slate-50 h-28 focus:ring-2 focus:ring-blue-500 outline-none transition text-sm" 
            />
            
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="number" 
                placeholder={t.formYear} 
                value={formData.year} 
                onChange={(e) => setFormData({...formData, year: e.target.value})} 
                className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                required
              />
              <input 
                type="number" 
                placeholder={t.formPrice} 
                value={formData.price} 
                onChange={(e) => setFormData({...formData, price: e.target.value})} 
                className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" 
                required
              />
            </div>
            
            <input 
              type="number" 
              placeholder={t.formMiles} 
              value={formData.miles} 
              onChange={(e) => setFormData({...formData, miles: e.target.value})} 
              className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
            
            <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 p-4 rounded-xl text-center">
              <label className="block text-[10px] font-black text-blue-600 uppercase mb-2 tracking-widest">
                {t.formImages}
              </label>
              <input 
                type="file" 
                multiple 
                ref={fileInputRef} 
                onChange={(e) => setSelectedFiles(Array.from(e.target.files))} 
                className="text-xs file:bg-blue-600 file:text-white file:border-0 file:px-4 file:py-2 file:rounded-full file:cursor-pointer" 
              />
            </div>
            
            <button 
              disabled={loading}
              className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-blue-600 disabled:bg-slate-400 transition shadow-lg uppercase text-sm tracking-widest"
            >
              {loading ? t.submiting : t.submitBtn}
            </button>
          </form>
        </div>
      </div>
      
      {/* RIGHT COLUMN: Fleet Management */}
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-black mb-6 text-slate-800 tracking-tighter">
          {t.inventoryTitle}
        </h2>
        
        {inventory.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200 shadow-inner">
            <p className="text-slate-400 font-medium">{t.noCarsFound}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inventory.map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                isAdmin={true} 
                API_BASE={API_BASE} 
                setSelectedCar={setSelectedCar} 
                handleToggleFeatured={handleToggleFeatured} 
                handleDelete={handleDelete} 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;