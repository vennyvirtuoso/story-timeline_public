import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import App from '../App';
import Privacy from '../pages/Privacy';
import Terms from '../pages/Terms';
import Refund from '../pages/Refund';
import About from '../pages/About';
import Pricing from '../pages/PricingPage.jsx';
import GoogleApiDisclosure from '../pages/GoogleApiDisclosure';
import NotFound from '../pages/NotFound';
import { getTheme } from '../utils/themes';

export default function RouteShell() {
  const location = useLocation();
  const isStandalonePage = location.pathname !== '/' && location.pathname !== '/billing/success';

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [location.pathname]);

  return (
    <>
      {isStandalonePage && <div className="scroll-progress-bar" aria-hidden="true" />}
      <div key={location.pathname} className={isStandalonePage ? 'page-glide-in' : undefined}>
        <Routes location={location}>
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/google-api" element={<GoogleApiDisclosure />} />
          <Route path="/" element={<App />} />
          <Route path="/about" element={<About />} />
          <Route path="/pricing" element={<Pricing theme={getTheme()} />} />
          <Route path="/billing/success" element={<App />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}
