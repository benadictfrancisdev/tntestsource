import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ChevronDown } from 'lucide-react';
import { BRAND_NAME, TEAM, SITE_URL } from '../config/site';
import { Seo } from '../components/common/Seo';

export const AboutPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const faqs = [
    {
      q: 'What products can you help source?',
      a: 'We focus on selected product categories available through suppliers across Tamil Nadu. Availability depends on the exact requirement and supplier fit.'
    },
    {
      q: 'Do you manufacture products yourselves?',
      a: 'We operate as a sourcing and coordination agency and connect buyers with relevant manufacturers or suppliers.'
    },
    {
      q: 'Can you source custom products?',
      a: 'Share the specification, quantity and intended use. Customisation depends on supplier capability and confirmation.'
    },
    {
      q: 'Do you provide prices immediately?',
      a: 'We request supplier quotations after clarifying the specification, quantity and delivery requirements.'
    },
    {
      q: 'Who handles the purchase contract and shipment?',
      a: 'In the standard model, buyer and manufacturer agree their sales contract and determine the responsible parties for payment, shipping, customs and compliance. Any alternative arrangement must be expressly agreed.'
    },
    {
      q: 'Do you charge a sourcing fee?',
      a: 'The commercial arrangement depends on the project. We explain the agreed fee or commission model before work proceeds.'
    },
    {
      q: 'Can manufacturers join your network?',
      a: 'Manufacturers can submit their details for review. Submission does not guarantee listing or buyer enquiries.'
    }
  ];

  // FAQPage JSON-LD schema
  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a
      }
    }))
  };

  return (
    <>
      <Seo
        title={`About Us | ${BRAND_NAME}`}
        description="We are building a Tamil Nadu-focused sourcing and export coordination agency connecting international buyers with regional manufacturing partners."
        path="/about"
      />

      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>

      {/* Header */}
      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
            Agency Overview
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            About Us
          </h1>
        </div>
      </div>

      <div className="py-14 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-12">
          {/* Main Body Copy (Exact wording from prompt) */}
          <div className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-6 max-w-3xl shadow-xs">
            <p className="text-sm text-slate-700 leading-relaxed">
              We are building a Tamil Nadu-focused sourcing and export coordination agency that helps international buyers explore suitable products and manufacturing partners across the state. Our role is to understand buyer requirements, research potential suppliers, coordinate product information and quotations, and support clear communication between buyers and manufacturers. We aim to build relationships through accurate information, practical follow-up and transparent expectations.
            </p>

            <p className="text-sm text-slate-700 leading-relaxed">
              As a sourcing intermediary, we do not claim to manufacture every product we present. Supplier capability, product availability, pricing, certifications, production timelines and export suitability are checked for each requirement and confirmed with the relevant supplier before a firm offer is made.
            </p>
          </div>

          {/* Team Section (Only renders if TEAM is non-empty) */}
          {TEAM.length > 0 && (
            <div className="space-y-4 max-w-3xl">
              <h2 className="text-xl font-bold text-[#0B2545]">
                Our Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {TEAM.map((member, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-[8px] border border-slate-200 space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                    <div className="text-xs text-[#0E9F9A] font-medium">{member.role}</div>
                    {member.bio && <p className="text-xs text-slate-600 pt-1">{member.bio}</p>}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* FAQ Accordion Section */}
          <div className="max-w-3xl space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-[#0B2545]">
                Frequently Asked Questions
              </h2>
              <p className="text-xs text-slate-500">
                Key questions regarding our sourcing scope, intermediary model, and quotations.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="bg-white border border-slate-200 rounded-[8px] overflow-hidden shadow-xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 font-semibold text-xs sm:text-sm text-[#0B2545] hover:text-[#0E9F9A] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E9F9A]"
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-[#0E9F9A]' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-4 pb-5 sm:px-5 sm:pb-6 text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
