import React, { useState } from 'react';

const API_BASE = "http://127.0.0.1:8787";
const ADMIN_KEY = "eduardo-super-secret-key";

function App() {
  const [formData, setFormData] = useState({ make: '', model: '', year: '', price: '', miles: '' });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  // Handle Text Inputs
  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  // Handle Image Selection & Previews
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedFiles(files);

    // Create temporary URLs for the UI to show the photos before upload
    const filePreviews = files.map(file => URL.createObjectURL(file));
    setPreviews(filePreviews);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: 'Uploading to Eduardo\'s Inventory...', type: 'info' });

    const data = new FormData();
    Object.keys(formData).forEach(key => data.append(key, formData[key]));
    selectedFiles.forEach(file => data.append('images', file));

    try {
      const res = await fetch(`${API_BASE}/api/inventory`, {
        method: 'POST',
        headers: { 'Authorization': ADMIN_KEY },
        body: data
      });

      if (res.ok) {
        setMessage({ text: '✅ Success! Car and photos added.', type: 'success' });
        setFormData({ make: '', model: '', year: '', price: '', miles: '' });
        setSelectedFiles([]);
        setPreviews([]);
      } else {
        setMessage({ text: '❌ Upload failed. Check API Key.', type: 'error' });
      }
    } catch (err) {
      setMessage({ text: '❌ Connection Error. Is Wrangler running?', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-10 font-sans">
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8">
        <header className="mb-8 border-b pb-4">
          <h1 className="text-3xl font-extrabold text-slate-800">Inventory Manager</h1>
          <p className="text-slate-500">Add new vehicles to the Economical Used Cars database.</p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2">Make</label>
              <input name="make" value={formData.make} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Toyota" required />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2">Model</label>
              <input name="model" value={formData.model} onChange={handleChange} className="w-full border p-3 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Corolla" required />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <input type="number" name="year" value={formData.year} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Year" required />
            <input type="number" name="price" value={formData.price} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Price ($)" required />
            <input type="number" name="miles" value={formData.miles} onChange={handleChange} className="border p-3 rounded-lg" placeholder="Miles" />
          </div>

          {/* Image Upload Area */}
          <div className="bg-slate-50 border-2 border-dashed border-slate-200 p-6 rounded-xl text-center">
            <input type="file" multiple onChange={handleFileChange} className="mb-4 block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" accept="image/*" />
            
            {/* Image Preview Grid */}
            <div className="grid grid-cols-3 gap-4 mt-4">
              {previews.map((url, i) => (
                <img key={i} src={url} className="h-24 w-full object-cover rounded-lg shadow-sm border" alt="Preview" />
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading} className={`w-full py-4 rounded-xl font-bold text-white transition-all ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700 active:scale-95 shadow-lg shadow-blue-200'}`}>
            {loading ? 'Uploading...' : 'Save Vehicle to Inventory'}
          </button>
        </form>

        {message.text && (
          <div className={`mt-6 p-4 rounded-lg text-center font-medium ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
            {message.text}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;