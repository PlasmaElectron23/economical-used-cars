import React from 'react';
import CarCard from '../components/CarCard';

const Admin = ({ 
  inventory, 
  formData, 
  setFormData, 
  handleFormSubmit, 
  loading, 
  lang, 
  text, 
  API_BASE, 
  setSelectedCar, 
  handleToggleFeatured, 
  handleDelete, 
  fileInputRef, 
  setSelectedFiles 
}) => {
  return (
    <div className="max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 lg:grid-cols-4 gap-12 w-full">
      
      {/* LEFT COLUMN: The Add/Edit Form */}
      <div className="lg:col-span-1">
        <div className="bg-white p-6 rounded-2xl shadow-xl border border-slate-200 sticky top-24">
          <h2 className="text-xl font-bold mb-6 text-slate-800 border-b pb-4">
            {text[lang].adminTitle}
          </h2>
          
          <form onSubmit={handleFormSubmit} className="space-y-4">
            <input 
              name="make" 
              placeholder={text[lang].make} 
              value={formData.make} 
              onChange={(e) => setFormData({...formData, make: e.target.value})} 
              className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              required 
            />
            
            <input 
              name="model" 
              placeholder={text[lang].model} 
              value={formData.model} 
              onChange={(e) => setFormData({...formData, model: e.target.value})} 
              className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              required 
            />
            
            <textarea 
              name="description" 
              placeholder={text[lang].desc} 
              value={formData.description} 
              onChange={(e) => setFormData({...formData, description: e.target.value})} 
              className="w-full p-3 border rounded-xl bg-slate-50 h-28 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
            
            <div className="grid grid-cols-2 gap-3">
              <input 
                type="number" 
                name="year" 
                placeholder={text[lang].year} 
                value={formData.year} 
                onChange={(e) => setFormData({...formData, year: e.target.value})} 
                className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              />
              <input 
                type="number" 
                name="price" 
                placeholder={text[lang].price} 
                value={formData.price} 
                onChange={(e) => setFormData({...formData, price: e.target.value})} 
                className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" 
              />
            </div>
            
            <input 
              type="number" 
              name="miles" 
              placeholder={text[lang].miles} 
              value={formData.miles} 
              onChange={(e) => setFormData({...formData, miles: e.target.value})} 
              className="w-full p-3 border rounded-xl bg-slate-50 focus:ring-2 focus:ring-blue-500 outline-none transition" 
            />
            
            <div className="border-2 border-dashed border-blue-200 bg-blue-50/50 p-4 rounded-xl text-center">
              <label className="block text-xs font-bold text-blue-600 uppercase mb-2">
                {text[lang].upload}
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
              className="w-full bg-slate-900 text-white p-4 rounded-xl font-bold hover:bg-slate-700 disabled:bg-slate-400 transition shadow-lg"
            >
              {loading ? text[lang].adding : text[lang].saveBtn}
            </button>
          </form>
        </div>
      </div>
      
      {/* RIGHT COLUMN: Fleet Management */}
      <div className="lg:col-span-3">
        <h2 className="text-2xl font-bold mb-6 text-slate-800">
          {text[lang].fleetTitle}
        </h2>
        
        {inventory.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <p className="text-slate-400 font-medium">No vehicles in database.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {inventory.map(car => (
              <CarCard 
                key={car.id} 
                car={car} 
                isAdmin={true} 
                lang={lang} 
                text={text} 
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