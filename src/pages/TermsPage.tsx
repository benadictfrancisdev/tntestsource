// TODO: legal review before launch
import React from 'react';
import { BRAND_NAME, CONTACT_EMAIL } from '../config/site';
import { Seo } from '../components/common/Seo';

export const TermsPage: React.FC = () => {
  return (
    <>
      <Seo
        title={`Terms of Service | ${BRAND_NAME}`}
        description="Terms governing the use of our sourcing agency website and business coordination services."
        path="/terms"
      />

      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
            Commercial Terms
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: October 2026 · Plain-language B2B terms
          </p>
        </div>
      </div>

      <div className="py-14 bg-[#F5F7FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 text-xs text-slate-700 leading-relaxed bg-white p-6 sm:p-10 rounded-[8px] border border-slate-200 shadow-xs">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">1. Informational Site & Intermediary Role</h2>
            <p>
              This website is operated by {BRAND_NAME}. We operate strictly as an independent sourcing agency and coordination intermediary connecting international buyers with potential manufacturing partners in Tamil Nadu, India. We do not manufacture products directly, nor do we act as a principal seller unless expressly agreed in a formal written contract.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">2. No Guarantee of Supplier Availability or Pricing</h2>
            <p>
              All product information, manufacturing categories, regional clusters, indicative prices, lead times, and capacity figures shown on this website or discussed during preliminary consultations are for informational purposes only. We provide no guarantee that any shortlisted supplier will be available for a specific project, accept proposed order terms, or maintain past pricing. All supplier availability, technical tolerances, prices, and schedules must be verified and confirmed on a case-by-case basis.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">3. No Binding Offer Until Confirmed in Writing</h2>
            <p>
              Submitting an enquiry through our forms or receiving an indicative briefing from us does not constitute a legally binding commercial contract or offer to sell. A binding contract only arises when buyer and manufacturer (or buyer and agency, where a custom commercial representation agreement is executed) finalize and sign formal commercial documentation specifying quantities, technical specifications, payment terms, and delivery schedules.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">4. Limitation of Liability</h2>
            <p>
              To the fullest extent permitted by applicable law, {BRAND_NAME} shall not be liable for any indirect, incidental, consequential, or punitive damages arising from the use of this website, delays in supplier communication, manufacturing variances, or commercial disputes between independent buyers and independent suppliers. Buyers remain responsible for conducting their own quality audits, laboratory testing, and contract verification prior to authorizing production or releasing payments.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">5. Governing Law</h2>
            <p>
              These terms and any disputes arising out of the use of this website shall be governed by and construed in accordance with the laws of [Governing law to be confirmed].
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">6. Inquiries</h2>
            <p>
              If you have questions regarding these terms, please contact:
            </p>
            <p className="font-semibold text-slate-900 pt-1">
              Email: <a href={`mailto:${CONTACT_EMAIL}`} className="text-[#0E9F9A] underline">{CONTACT_EMAIL}</a>
            </p>
          </section>
        </div>
      </div>
    </>
  );
};
