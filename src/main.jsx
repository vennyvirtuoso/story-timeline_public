import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Refund from './pages/Refund';
import GoogleApiDisclosure from './pages/GoogleApiDisclosure';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/privacy"    element={<Privacy />} />
        <Route path="/terms"      element={<Terms />} />
        <Route path="/refund"     element={<Refund />} />
        <Route path="/google-api" element={<GoogleApiDisclosure />} />
        <Route path="/*"          element={<App />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
