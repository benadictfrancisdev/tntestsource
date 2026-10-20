import React from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowRight, Check, MapPin, ClipboardList, Info } from 'lucide-react';
import { PRODUCT_CATEGORIES } from '../data/categories';
import { Seo } from '../components/common/Seo';

export const ProductDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const category = PRODUCT_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    return <Navigate to="/404" replace />;
  }

  return (
    <>
      <Seo
        title={`${category.name} | Sourcing from Tamil Nadu`}
        description={`Explore sourcing options for ${category.short}. Submit specifications for quotation coordination.`}
        path={`/products/${category.slug}`}
      />

      {/* Header & Intro */}
      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Link to="/products" className="hover:text-[#0E9F9A]">
              Product Categories
            </Link>
            <span>/</span>
            <span className="text-slate-800 font-medium">{category.name}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            {category.name}
          </h1>

          <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
            {category.short}
          </p>

          <div className="pt-2">
            <Link
              to={`/buyers?category=${category.slug}#enquiry`}
              className="inline-flex items-center px-5 py-2.5 text-xs font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] rounded-[8px] transition-colors shadow-xs"
            >
              Request a Quote
              <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Link>
          </div>
        </div>
      </div>

      <div className="py-14 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Product types + Sourcing areas + Customisation */}
            <div className="lg:col-span-7 space-y-8">
              {/* Product types we can help source */}
              <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-4 shadow-xs">
                <h2 className="text-base font-bold text-[#0B2545]">
                  Product types we can help source
                </h2>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-700">
                  {category.productTypes.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-2 p-2 bg-[#F5F7FA] rounded-[6px] border border-slate-100">
                      <Check className="w-3.5 h-3.5 text-[#0E9F9A] shrink-0 mt-0.5" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Sourcing areas we are exploring */}
              <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-3 shadow-xs">
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#0E9F9A]" />
                  <h2 className="text-base font-bold text-[#0B2545]">
                    Sourcing areas we are exploring
                  </h2>
                </div>
                <p className="text-xs text-slate-500">
                  Labelled as starting points for supplier research across Tamil Nadu clusters:
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {category.clusters.map((cl, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-[#F5F7FA] border border-slate-200 rounded-[6px] text-xs font-medium text-slate-800"
                    >
                      {cl}
                    </span>
                  ))}
                </div>
              </div>

              {/* Customisation */}
              <div className="bg-white p-6 rounded-[8px] border border-slate-200 space-y-2 shadow-xs">
                <h2 className="text-sm font-bold text-[#0B2545]">
                  Customisation
                </h2>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Customisation is offered only where supplier capability is confirmed.
                </p>
              </div>
            </div>

            {/* Right Column: What we need to quote + Disclaimer */}
            <div className="lg:col-span-5 space-y-6">
              {/* What we need to quote */}
              <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center gap-2">
                  <ClipboardList className="w-4 h-4 text-[#0E9F9A]" />
                  <h2 className="text-base font-bold text-[#0B2545]">
                    What we need to quote
                  </h2>
                </div>
                <ul className="space-y-2 text-xs text-slate-700">
                  {category.quoteInfo.map((info, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0E9F9A] mt-1.5"></span>
                      <span>{info}</span>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-slate-100">
                  <Link
                    to={`/buyers?category=${category.slug}#enquiry`}
                    className="w-full inline-flex items-center justify-center px-4 py-2.5 text-xs font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] rounded-[8px] transition-colors"
                  >
                    Request a Quote
                  </Link>
                </div>
              </div>

              {/* Mandatory Disclaimer */}
              <div className="bg-white p-5 rounded-[8px] border border-slate-200 flex items-start gap-3 text-xs text-slate-600 leading-relaxed shadow-xs">
                <Info className="w-4 h-4 text-[#D98E04] shrink-0 mt-0.5" />
                <p>
                  Supplier availability, compliance and prices are confirmed case by case.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
