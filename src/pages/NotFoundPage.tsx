import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home, Package } from 'lucide-react';
import { Seo } from '../components/common/Seo';

export const NotFoundPage: React.FC = () => {
  return (
    <>
      <Seo title="404 Page Not Found | Tamil Nadu Export Sourcing" noindex path="/404" />

      <div className="py-24 bg-[#F5F7FA] min-h-[70vh] flex items-center justify-center">
        <div className="max-w-md mx-auto px-4 text-center space-y-6">
          <div className="w-16 h-16 rounded-[8px] bg-[#0B2545] text-white flex items-center justify-center font-bold text-2xl mx-auto border-t-2 border-[#0E9F9A]">
            404
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-bold text-[#0B2545]">
              Page Not Found
            </h1>
            <p className="text-xs text-slate-600 leading-relaxed">
              The page you requested could not be located. It may have moved or the link address might be incorrect.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] rounded-[8px] transition-colors"
            >
              <Home className="w-3.5 h-3.5 mr-1.5" />
              Return Home
            </Link>

            <Link
              to="/products"
              className="inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-[8px] transition-colors"
            >
              <Package className="w-3.5 h-3.5 mr-1.5" />
              Product Categories
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
