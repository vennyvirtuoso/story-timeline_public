import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import About from './pages/About';
import Pricing from './pages/PricingPage.jsx';
import GoogleApiDisclosure from './pages/GoogleApiDisclosure';
import './index.css';
import { getTheme }         from './utils/themes';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/privacy"    element={<Privacy />} />
        <Route path="/terms"      element={<Terms />} />
        <Route path="/refund"     element={<Refund />} />
        <Route path="/google-api" element={<GoogleApiDisclosure />} />
        <Route path="/*"          element={<App />} />
        <Route path="/about"      element={<About />} />
        <Route path="/pricing" element={<Pricing theme={getTheme} />} />
        <Route path="/billing/success" element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
