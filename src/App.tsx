import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { HowItWorksPage } from './pages/HowItWorksPage';
import { BuyersPage } from './pages/BuyersPage';
import { ManufacturersPage } from './pages/ManufacturersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';
import { TermsPage } from './pages/TermsPage';
import { AdminPage } from './pages/AdminPage';
import { SettingsPage } from './pages/SettingsPage';
import { NotFoundPage } from './pages/NotFoundPage';

// Scroll to top and record UTM & attribution tracking on initial visit
function PageTracker() {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    // 1. Scroll handling: only scroll to top if there is no hash
    if (!hash) {
      window.scrollTo(0, 0);
    }

    // 2. Capture utm_* params + document.referrer + landing path into sessionStorage
    try {
      const urlParams = new URLSearchParams(search);
      const utmSource = urlParams.get('utm_source');
      const utmMedium = urlParams.get('utm_medium');
      const utmCampaign = urlParams.get('utm_campaign');

      if (utmSource && !sessionStorage.getItem('utm_source')) {
        sessionStorage.setItem('utm_source', utmSource);
      }
      if (utmMedium && !sessionStorage.getItem('utm_medium')) {
        sessionStorage.setItem('utm_medium', utmMedium);
      }
      if (utmCampaign && !sessionStorage.getItem('utm_campaign')) {
        sessionStorage.setItem('utm_campaign', utmCampaign);
      }
      if (!sessionStorage.getItem('referrer') && document.referrer) {
        sessionStorage.setItem('referrer', document.referrer);
      }
      if (!sessionStorage.getItem('landing_path')) {
        sessionStorage.setItem('landing_path', pathname);
      }
    } catch {
      // Ignore storage errors in restricted private contexts
    }
  }, [pathname, search, hash]);

  return null;
}

import { LocaleLayout } from './components/layout/LocaleLayout';

export default function App() {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <PageTracker />
        <div className="min-h-screen flex flex-col bg-white text-[#1F2937]">
          <Navbar />
          <main className="flex-1">
            <Routes>
              {/* Unprefixed root English routes wrapped in LocaleLayout forceLang="en" */}
              <Route element={<LocaleLayout forceLang="en" />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/products" element={<ProductsPage />} />
                <Route path="/products/:slug" element={<ProductDetailPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
                <Route path="/buyers" element={<BuyersPage />} />
                <Route path="/manufacturers" element={<ManufacturersPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="/terms" element={<TermsPage />} />
              </Route>

              {/* Prefixed language routes (ar, fr, de, es, ta) */}
              <Route path="/:lang" element={<LocaleLayout />}>
                <Route index element={<HomePage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="products/:slug" element={<ProductDetailPage />} />
                <Route path="how-it-works" element={<HowItWorksPage />} />
                <Route path="buyers" element={<BuyersPage />} />
                <Route path="manufacturers" element={<ManufacturersPage />} />
                <Route path="about" element={<AboutPage />} />
                <Route path="contact" element={<ContactPage />} />
                <Route path="privacy-policy" element={<PrivacyPolicyPage />} />
                <Route path="terms" element={<TermsPage />} />
              </Route>

              {/* Admin Portal (Strictly English, no lang prefix, noindex) */}
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/settings" element={<SettingsPage />} />

              {/* 404 Fallback */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </HelmetProvider>
  );
}
