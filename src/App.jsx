import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom'; // 1. Add this import
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import DetailModal from './components/DetailModal';

// Pages
import Home from './pages/Home';
import Inventory from './pages/Inventory';
import Admin from './pages/Admin';

const API_BASE = "http://127.0.0.1:8787";

function App() {
  // 2. We DELETED the 'view' state! React Router handles the URL now.
  const [inventory, setInventory] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);

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

  return (
    <div className="bg-slate-50 min-h-screen flex flex-col">
      {/* 3. Navbar no longer needs setView! */}
      <Navbar />
      
      <main className="flex-grow">
        {/* 4. The Switchboard logic starts here */}
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

          <Route path="/admin" element={
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