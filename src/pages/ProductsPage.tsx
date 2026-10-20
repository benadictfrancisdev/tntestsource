import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MapPin } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/categories';
import { Seo } from '../components/common/Seo';

export const ProductsPage: React.FC = () => {
  return (
    <>
      <Seo
        title="Product Categories | Tamil Nadu Export Sourcing"
        description="Explore the 6 primary manufacturing categories we help international buyers source across Tamil Nadu clusters."
        path="/products"
      />

      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
            Sourcing Portfolio
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            Product Categories
          </h1>
          <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
            Tamil Nadu is a multi-category manufacturing region. Below are the categories we can help source, subject to supplier availability for each requirement.
          </p>
        </div>
      </div>

      <div className="py-14 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PRODUCT_CATEGORIES.map((cat) => (
              <div
                key={cat.slug}
                className="bg-white border border-slate-200 rounded-[8px] p-6 flex flex-col justify-between hover:border-slate-300 transition-colors shadow-xs"
              >
                <div className="space-y-4">
                  <h2 className="text-lg font-bold text-[#0B2545] leading-snug">
                    {cat.name}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {cat.short}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block">
                      Product types include:
                    </span>
                    <ul className="text-xs text-slate-700 space-y-1">
                      {cat.productTypes.slice(0, 4).map((pt, idx) => (
                        <li key={idx} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#0E9F9A]"></span>
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-start gap-1.5 text-xs text-slate-500 pt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                    <span className="line-clamp-2">
                      Sourcing clusters: {cat.clusters.join(', ')}
                    </span>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    to={`/products/${cat.slug}`}
                    className="inline-flex items-center text-xs font-semibold text-[#0E9F9A] hover:text-[#0B8884] transition-colors"
                  >
                    View details
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Link>

                  <Link
                    to={`/buyers?category=${cat.slug}#enquiry`}
                    className="text-xs text-slate-600 hover:text-[#0B2545] font-medium"
                  >
                    Enquire
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <div className="p-4 bg-white rounded-[8px] border border-slate-200 text-xs text-slate-500 leading-relaxed">
            Regions listed are areas we are researching, not a claim that every supplier in a location can meet every requirement.
          </div>
        </div>
      </div>
    </>
  );
};
