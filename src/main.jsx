import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 1. Import the Router for clean URLs
import App from './App.jsx'
import './index.css'
import { LanguageProvider } from './context/LanguageContext' // 2. Verified path in src/context/

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* 3. Wrap everything in BrowserRouter to enable Section 7 routing changes */}
    <BrowserRouter>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </BrowserRouter>
  </React.StrictMode>,
)