import React, { useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';
import { Check } from 'lucide-react';
import { Seo } from '../components/common/Seo';
import { MultiStepBuyerForm } from '../components/forms/MultiStepBuyerForm';
import { useTranslation } from 'react-i18next';

export const BuyersPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const categoryParam = searchParams.get('category') || undefined;
  const { t } = useTranslation('buyers');

  useEffect(() => {
    if (location.hash === '#enquiry') {
      const el = document.getElementById('enquiry');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [location]);

  return (
    <>
      <Seo
        title="For International Buyers | Sourcing from Tamil Nadu"
        description="Submit your product brief to identify and connect with suitable Tamil Nadu manufacturers. Structured sourcing support and quotation coordination."
        path="/buyers"
      />

      {/* Header */}
      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
            Buyer Representation
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            Work With Us as a Buyer
          </h1>
          <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
            We help international procurement professionals, brand owners, and distributors explore manufacturing opportunities across Tamil Nadu's industrial clusters.
          </p>
        </div>
      </div>

      <div className="py-14 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-14">
          {/* Section: Who We Work With */}
          <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-[#0B2545]">
              Who we work with
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#F5F7FA] rounded-[8px] border border-slate-200 space-y-1">
                <span className="font-semibold text-xs text-slate-900 block">
                  Importers, Wholesalers & Distributors
                </span>
                <p className="text-xs text-slate-600">
                  Seeking competitive manufacturing alternatives and steady volume container dispatches.
                </p>
              </div>

              <div className="p-4 bg-[#F5F7FA] rounded-[8px] border border-slate-200 space-y-1">
                <span className="font-semibold text-xs text-slate-900 block">
                  Retailers & Private-Label Brands
                </span>
                <p className="text-xs text-slate-600">
                  Looking for custom-manufactured apparel, home textiles, leather accessories or packaging.
                </p>
              </div>

              <div className="p-4 bg-[#F5F7FA] rounded-[8px] border border-slate-200 space-y-1">
                <span className="font-semibold text-xs text-slate-900 block">
                  Procurement & Product-Development Teams
                </span>
                <p className="text-xs text-slate-600">
                  Navigating drawing feasibility, prototyping, lab dips, and technical supplier matching.
                </p>
              </div>
            </div>
          </div>

          {/* Section: What to prepare checklist */}
          <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-4 shadow-xs">
            <h2 className="text-lg font-bold text-[#0B2545]">
              What to prepare
            </h2>
            <p className="text-xs text-slate-600">
              To help us evaluate feasibility and gather informative supplier feedback, please have the following ready:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Product / item name</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Specifications or engineering drawings</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Estimated quantity & target batch size</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Target price and currency (optional)</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Destination country & preferred port</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px]">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Required delivery date & schedule</span>
              </div>
              <div className="flex items-start gap-2.5 p-2.5 bg-[#F5F7FA] rounded-[6px] sm:col-span-2">
                <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                <span>Certification, testing or destination compliance needs</span>
              </div>
            </div>
          </div>

          {/* Short process recap */}
          <div className="bg-[#EBF7F7] border border-[#0E9F9A]/30 p-6 rounded-[8px] space-y-2">
            <h3 className="text-sm font-bold text-[#0B2545]">
              Short Process Recap
            </h3>
            <p className="text-xs text-slate-700 leading-relaxed">
              Once you submit your brief below, we conduct a feasibility review, identify candidate suppliers across regional clusters, coordinate quotation discussions, and support your direct commercial negotiations.
            </p>
          </div>

          {/* Section #enquiry: Submit Your Sourcing Brief (Multi-Step RFQ Wizard) */}
          <section id="enquiry" className="scroll-mt-24 bg-white border border-slate-200 rounded-[8px] p-6 sm:p-8 space-y-6 shadow-xs">
            <div className="border-b border-slate-200 pb-3">
              <h2 className="text-xl font-bold text-[#0B2545]">
                Submit Your Sourcing Brief
              </h2>
              <p className="text-xs text-slate-500 mt-1">
                Share your sourcing requirements. We will review the details and confirm whether we can identify suitable supplier options.
              </p>
            </div>

            <MultiStepBuyerForm initialCategory={categoryParam} />
          </section>
        </div>
      </div>
    </>
  );
};

