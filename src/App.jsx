import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

// Component Imports
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import DetailModal from './components/inventory/DetailModal';

// Page Imports
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Admin from './pages/Admin';

/**
 * API_BASE: Production Cloudflare Worker URL
 */
const API_BASE = "https://economical-used-cars-backend.silchris7.workers.dev";

function App() {
  const [inventory, setInventory] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

  const fetchInventory = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/inventory`);
      if (!res.ok) throw new Error("Failed to fetch inventory from Cloudflare");
      const data = await res.json();
      setInventory(data);
    } catch (err) { 
      console.error("Cloudflare Connection error:", err); 
    }
  };

  useEffect(() => { 
    fetchInventory(); 
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={
            <Home 
              inventory={inventory} 
              setSelectedCar={setSelectedCar} 
              API_BASE={API_BASE} 
            />
          } />

          <Route path="/inventory" element={
            <Inventory 
              inventory={inventory} 
              setSelectedCar={setSelectedCar} 
              API_BASE={API_BASE} 
            />
          } />

          {/* 
            STEP 7.3: Secret Admin URL 
            Access at: https://economical-used-cars.pages.dev/admin-29amsk30sdf5
          */}
          <Route path="/admin-29amsk30sdf5" element={
            <Admin 
              inventory={inventory}
              fetchInventory={fetchInventory}
              API_BASE={API_BASE}
              setSelectedCar={setSelectedCar}
            />
          } />
        </Routes>
      </main>

      <Footer />

      {selectedCar && (
        <DetailModal 
          selectedCar={selectedCar} 
          setSelectedCar={setSelectedCar} 
          API_BASE={API_BASE} 
        />
      )}
    </div>
  );
}

export default App;