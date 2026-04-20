import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Inventory from './pages/Inventory'

function App() {
  return (
    <Routes>
      {/* This is your "Main Entrance" (Home Page) */}
      <Route path="/" element={<Home />} />

      {/* This is your "Car Lot" (Full Inventory Page) */}
      <Route path="/inventory" element={<Inventory />} />
    </Routes>
  )
}

export default App