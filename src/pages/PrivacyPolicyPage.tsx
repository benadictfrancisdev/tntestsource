// TODO: legal review before launch
import React from 'react';
import { BRAND_NAME, CONTACT_EMAIL } from '../config/site';
import { Seo } from '../components/common/Seo';

export const PrivacyPolicyPage: React.FC = () => {
  return (
    <>
      <Seo
        title={`Privacy Policy | ${BRAND_NAME}`}
        description="Learn how we collect, store, and process business enquiry details and uploaded technical files."
        path="/privacy-policy"
      />

      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
            Legal & Data Protection
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-slate-500">
            Last updated: October 2026 · Plain-language B2B enquiry policy
          </p>
        </div>
      </div>

      <div className="py-14 bg-[#F5F7FA]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 space-y-8 text-xs text-slate-700 leading-relaxed bg-white p-6 sm:p-10 rounded-[8px] border border-slate-200 shadow-xs">
          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">1. Overview & Scope</h2>
            <p>
              {BRAND_NAME} ("we", "us", or "our") operates as a B2B sourcing and export coordination agency based in Tamil Nadu, India. This Privacy Policy explains how we collect, use, store, and protect information submitted by international buyers, manufacturers, and general website visitors.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">2. What Data We Collect</h2>
            <p>
              We collect information provided directly through our website forms and technical interaction:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-slate-600">
              <li><strong>Buyer Sourcing Enquiries:</strong> Full name, business email address, company name, destination country, product category, product specifications, estimated order quantities, target pricing, delivery timelines, and required testing/compliance standards.</li>
              <li><strong>Manufacturer Applications:</strong> Legal business/factory name, contact person name, role, business email, telephone number, factory location, product categories, capability details, machinery notes, and export experience.</li>
              <li><strong>Contact Messages:</strong> Name, business email, company name, enquiry category, and message text.</li>
              <li><strong>Uploaded Files:</strong> Technical specifications, drawings, CAD references, factory catalogues, or capability sheets uploaded via our submission interfaces.</li>
              <li><strong>Technical Metadata & Analytics:</strong> Referring URL, UTM campaign parameters (source, medium, campaign), landing page path, and standard server-side rate-limiting identifiers (anonymised IP hashes).</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">3. Purpose of Processing</h2>
            <p>
              We process submitted data exclusively for legitimate B2B sourcing purposes:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-slate-600">
              <li>To evaluate the feasibility of requested sourcing briefs.</li>
              <li>To identify and shortlist potential Tamil Nadu manufacturing candidates.</li>
              <li>To coordinate supplier questions, indicative quotations, and sample reviews.</li>
              <li>To maintain records of active sourcing negotiations and follow-ups.</li>
            </ul>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">4. Storage & Security</h2>
            <p>
              Submitted records and uploaded documents are stored in secure cloud database infrastructure (Supabase) with encrypted transport (TLS/SSL) and role-based access controls. We enforce strict private storage policies to prevent unauthorized public access.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">5. Data Retention</h2>
            <p>
              We retain business enquiry data and uploaded documents only for as long as needed to evaluate, coordinate, and fulfill the sourcing requirement, or until the submitter requests deletion.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">6. Sharing With Third Parties</h2>
            <p>
              We do not sell, rent, or trade your personal or business data. We share technical specifications only with relevant manufacturing candidates or prospective international buyers strictly with the submitter's prior knowledge and as necessary to obtain quotations.
            </p>
          </section>

          <section className="space-y-2">
            <h2 className="text-base font-bold text-[#0B2545]">7. Your Rights & Contact</h2>
            <p>
              You have the right to request access to the data we hold regarding your business, request corrections, or request deletion of your information at any time. To exercise these rights, please contact our data desk at:
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
