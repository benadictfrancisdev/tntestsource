import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import {
  ChevronDown,
  Check,
  X,
  Target,
  FileSearch,
  MessageSquare,
  ShieldCheck,
  MapPin,
  ArrowRight,
  Info
} from 'lucide-react';
import { BRAND_NAME, TEAM, SITE_URL } from '../config/site';
import { Seo } from '../components/common/Seo';
import { LocalizedLink } from '../components/common/LocalizedLink';
import { useTranslation } from 'react-i18next';

export const AboutPage: React.FC = () => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const { t } = useTranslation('about');

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

  const clusters = [
    { name: 'Tirupur', spec: 'Knitwear & apparel' },
    { name: 'Coimbatore', spec: 'Pumps, motors, castings & engineering' },
    { name: 'Karur', spec: 'Home textiles & made-ups' },
    { name: 'Ranipet & Ambur', spec: 'Finished leather & footwear' },
    { name: 'Chennai & Oragadam', spec: 'Auto components, precision parts & electronics' },
    { name: 'Pollachi', spec: 'Coir, coco pith & coconut derivatives' },
    { name: 'Salem & Madurai', spec: 'Stainless steel, agro-commodities & stone' }
  ];

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

      {/* 1. HERO */}
      <div className="py-14 lg:py-20 bg-gradient-to-br from-[#0B2545] to-[#133A6B] text-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-xs font-medium text-[#0E9F9A] border border-white/10">
            About Our Agency
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight max-w-3xl">
            Bridging International Buyers & Tamil Nadu Manufacturing
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl leading-relaxed">
            We are a commission-based sourcing coordination intermediary dedicated to connecting global businesses with dependable manufacturers across regional industrial clusters.
          </p>
        </div>
      </div>

      <div className="py-14 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-16">
          
          {/* 2. WHO WE ARE */}
          <section className="bg-white p-6 sm:p-10 rounded-[8px] border border-slate-200 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
                  Who We Are
                </span>
                <h2 className="text-2xl font-bold text-[#0B2545]">
                  A dedicated coordination desk on the ground
                </h2>
                <p className="text-sm text-slate-700 leading-relaxed">
                  We are building a Tamil Nadu-focused sourcing and export coordination agency that helps international buyers explore suitable products and manufacturing partners across the state. Our role is to understand buyer requirements, research potential suppliers, coordinate product information and quotations, and support clear communication between buyers and manufacturers. We aim to build relationships through accurate information, practical follow-up and transparent expectations.
                </p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  As a sourcing intermediary, we do not claim to manufacture every product we present. Supplier capability, product availability, pricing, certifications, production timelines and export suitability are checked for each requirement and confirmed with the relevant supplier before a firm offer is made.
                </p>
              </div>

              {/* Intermediary Role SVG Diagram */}
              <div className="lg:col-span-5 bg-[#F5F7FA] p-6 rounded-[8px] border border-slate-200 flex flex-col items-center justify-center">
                <div className="w-full max-w-[320px]">
                  <svg viewBox="0 0 320 220" className="w-full h-auto" role="img" aria-label="Coordination diagram">
                    <rect x="20" y="30" width="80" height="60" rx="8" fill="#0B2545" />
                    <circle cx="60" cy="50" r="10" fill="#0E9F9A" />
                    <rect x="35" y="66" width="50" height="6" rx="3" fill="#ffffff" opacity="0.8" />
                    
                    <rect x="220" y="30" width="80" height="60" rx="8" fill="#0B2545" />
                    <rect x="235" y="45" width="50" height="15" rx="3" fill="#D98E04" opacity="0.9" />
                    <rect x="235" y="66" width="50" height="6" rx="3" fill="#ffffff" opacity="0.8" />

                    <rect x="95" y="140" width="130" height="65" rx="8" fill="#0E9F9A" />
                    <circle cx="160" cy="163" r="10" fill="#0B2545" />
                    <rect x="120" y="180" width="80" height="6" rx="3" fill="#ffffff" />

                    {/* Connecting arrows */}
                    <path d="M 60 90 L 120 145" stroke="#0E9F9A" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
                    <path d="M 260 90 L 200 145" stroke="#0E9F9A" strokeWidth="2.5" strokeDasharray="4 4" fill="none" />
                    
                    {/* Floating nodes */}
                    <circle cx="90" cy="118" r="4" fill="#D98E04" />
                    <circle cx="230" cy="118" r="4" fill="#D98E04" />
                  </svg>
                </div>
                <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-center mt-3">
                  International Buyer &larr; Connect HF Coordination &rarr; TN Manufacturer
                </div>
                <span className="mt-1 text-[10px] text-slate-400">Illustrative Intermediary Model</span>
              </div>
            </div>
          </section>

          {/* 3. WHAT WE DO vs WHAT WE DON'T DO */}
          <section className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
                Clear Scope of Service
              </span>
              <h2 className="text-2xl font-bold text-[#0B2545] mt-1">
                What We Do vs. What We Don't Do
              </h2>
              <p className="text-xs text-slate-600 mt-1">
                Transparency from the start ensures straightforward collaboration and manageable expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* What We Do */}
              <div className="bg-white p-6 sm:p-7 rounded-[8px] border-t-4 border-t-[#0E9F9A] border-x border-b border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-[#EBF7F7] text-[#0E9F9A] flex items-center justify-center">
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-[#0B2545] text-base">What We Do</h3>
                </div>
                <ul className="space-y-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                    <span>Clarify specifications, packaging, volume, and target requirements with buyers.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                    <span>Research and shortlist capable suppliers in matching regional Tamil Nadu clusters.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                    <span>Coordinate quotation requests, technical clarifications, and specification feedback.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                    <span>Facilitate sample coordination, lab dip dispatch, and communication tracking.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <Check className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                    <span>Support structured buyer-supplier introductions for final commercial agreements.</span>
                  </li>
                </ul>
              </div>

              {/* What We Don't Do */}
              <div className="bg-white p-6 sm:p-7 rounded-[8px] border-t-4 border-t-slate-400 border-x border-b border-slate-200 space-y-4 shadow-xs">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center">
                    <X className="w-4 h-4" />
                  </div>
                  <h3 className="font-bold text-[#0B2545] text-base">What We Do Not Do</h3>
                </div>
                <ul className="space-y-3 text-xs text-slate-700">
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>We do not own factories or maintain proprietary manufacturing facilities.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>We do not take title to goods or act as the principal seller on purchase contracts.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>We do not issue unilateral pricing, volume, or delivery guarantees without supplier confirmation.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>We do not replace accredited third-party pre-shipment inspection agencies (e.g., SGS, Bureau Veritas).</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <X className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <span>We do not broker transactions without disclosed commissions and agreed scope.</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* 4. HOW WE WORK (4 Principles) */}
          <section className="space-y-6">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
                Our Philosophy
              </span>
              <h2 className="text-2xl font-bold text-[#0B2545] mt-1">
                How We Work
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-5 rounded-[8px] border border-slate-200 space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-[6px] bg-[#EBF7F7] text-[#0E9F9A] flex items-center justify-center">
                  <Target className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0B2545]">Feasibility-First</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We check supplier fit before making commitments, assessing technical capacity, order volume requirements, and lead times honestly.
                </p>
              </div>

              <div className="bg-white p-5 rounded-[8px] border border-slate-200 space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-[6px] bg-[#EBF7F7] text-[#0E9F9A] flex items-center justify-center">
                  <FileSearch className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0B2545]">Factual Information</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Every product specification, capability, and price indication is subject to direct supplier verification. No inflated claims.
                </p>
              </div>

              <div className="bg-white p-5 rounded-[8px] border border-slate-200 space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-[6px] bg-[#EBF7F7] text-[#0E9F9A] flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0B2545]">Structured Communication</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  We translate international buyer expectations into clear actionable briefs for regional production floors and management.
                </p>
              </div>

              <div className="bg-white p-5 rounded-[8px] border border-slate-200 space-y-2 shadow-xs">
                <div className="w-8 h-8 rounded-[6px] bg-[#EBF7F7] text-[#0E9F9A] flex items-center justify-center">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-sm font-bold text-[#0B2545]">Commercial Transparency</h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transparent commission and service terms agreed upfront before supplier introductions and negotiations proceed.
                </p>
              </div>
            </div>
          </section>

          {/* 5. WHY TAMIL NADU */}
          <section className="bg-white p-6 sm:p-8 rounded-[8px] border border-slate-200 space-y-5 shadow-xs">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
                Manufacturing Hub
              </span>
              <h2 className="text-2xl font-bold text-[#0B2545] mt-1">
                Why Tamil Nadu?
              </h2>
              <p className="text-xs text-slate-600 mt-1 max-w-3xl leading-relaxed">
                Tamil Nadu is one of India's most industrialised states with world-renowned geographic clusters, deep supply chains, skilled technical labour, and multiple modern container ports (Chennai, Ennore, VO Chidambaranar Port in Thoothukudi).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {clusters.map((c, idx) => (
                <div key={idx} className="p-3.5 bg-[#F5F7FA] rounded-[6px] border border-slate-200 flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-xs font-bold text-[#0B2545] block">{c.name}</span>
                    <span className="text-[11px] text-slate-600">{c.spec}</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 6. WHERE WE ARE TODAY */}
          <section className="bg-[#EBF7F7] border border-[#0E9F9A]/30 p-6 sm:p-8 rounded-[8px] space-y-3">
            <div className="flex items-center gap-2">
              <Info className="w-5 h-5 text-[#0E9F9A]" />
              <h3 className="text-base font-bold text-[#0B2545]">
                Where We Are Today (Honest Status)
              </h3>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              We are actively developing our supplier network and expanding regional cluster relationships across Tamil Nadu. As an emerging coordination desk, we handle enquiries on a selective basis, prioritizing categories where supplier feasibility and clear communications can be assured.
            </p>
          </section>

          {/* 7. TEAM (Render only if TEAM is non-empty) */}
          {TEAM.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl font-bold text-[#0B2545]">
                Our Team
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {TEAM.map((member, idx) => (
                  <div key={idx} className="bg-white p-5 rounded-[8px] border border-slate-200 space-y-1">
                    <h3 className="font-bold text-slate-900 text-sm">{member.name}</h3>
                    <div className="text-xs text-[#0E9F9A] font-medium">{member.role}</div>
                    {member.bio && <p className="text-xs text-slate-600 pt-1">{member.bio}</p>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* 8. FAQ ACCORDION SECTION */}
          <section className="space-y-6">
            <div className="space-y-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
                Common Inquiries
              </span>
              <h2 className="text-2xl font-bold text-[#0B2545]">
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
          </section>

          {/* 9. CTA BAND */}
          <section className="bg-gradient-to-r from-[#0B2545] to-[#133A6B] text-white p-8 sm:p-10 rounded-[8px] shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h2 className="text-xl sm:text-2xl font-bold">Ready to explore sourcing from Tamil Nadu?</h2>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
                Submit your product specifications or join our manufacturer network to get started.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 shrink-0">
              <LocalizedLink
                to="/buyers#enquiry"
                className="px-5 py-2.5 text-xs font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] rounded-[8px] transition-colors flex items-center gap-1.5"
              >
                Submit Sourcing Enquiry
                <ArrowRight className="w-3.5 h-3.5" />
              </LocalizedLink>
              <LocalizedLink
                to="/contact"
                className="px-5 py-2.5 text-xs font-semibold text-white border border-white/30 hover:bg-white/10 rounded-[8px] transition-colors"
              >
                Contact Us
              </LocalizedLink>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

