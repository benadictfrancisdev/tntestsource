import React from 'react';
import { Link } from 'react-router-dom';
import {
  FileText,
  Search,
  Users,
  MessageSquare,
  Handshake,
  CheckCircle2,
  Info,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';
import { Seo } from '../components/common/Seo';

export const HowItWorksPage: React.FC = () => {
  const stages = [
    {
      num: '1',
      title: 'Buyer brief',
      desc: 'Product, specifications, quantity, destination, budget/target price, required date.'
    },
    {
      num: '2',
      title: 'Feasibility review',
      desc: 'We review whether the requirement fits our current sourcing capabilities and ask follow-up questions.'
    },
    {
      num: '3',
      title: 'Supplier identification',
      desc: 'Potential suppliers are researched and shortlisted; we explain honestly how deeply each supplier has been checked.'
    },
    {
      num: '4',
      title: 'Quote and sample coordination',
      desc: 'Quotations and sample options are requested; firm prices and delivery dates are subject to supplier confirmation.'
    },
    {
      num: '5',
      title: 'Buyer–manufacturer discussion',
      desc: 'Buyer and manufacturer review specifications, price, payment, quality, shipping and contract terms.'
    },
    {
      num: '6',
      title: 'Order coordination',
      desc: 'We can coordinate communications and follow-ups within the scope agreed with the parties.'
    }
  ];

  return (
    <>
      <Seo
        title="How It Works | Sourcing Coordination Process"
        description="A clear 6-stage sourcing process from enquiry to supplier discussion. Learn how we coordinate supplier matching and quotations across Tamil Nadu."
        path="/how-it-works"
      />

      {/* Header */}
      <div className="py-12 lg:py-16 bg-white border-b border-slate-200">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-4">
          <div className="text-xs font-semibold uppercase tracking-wider text-[#0E9F9A]">
            Coordination Methodology
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0B2545] tracking-tight">
            A Clear Sourcing Process, From Enquiry to Supplier Discussion
          </h1>
          <p className="text-base text-slate-600 max-w-3xl leading-relaxed">
            We guide international buyers through a transparent 6-stage coordination sequence to connect with suitable manufacturers in Tamil Nadu.
          </p>
        </div>
      </div>

      <div className="py-14 bg-[#F5F7FA]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 space-y-14">
          {/* Vertical 6-stage timeline */}
          <div className="max-w-3xl mx-auto space-y-6">
            {stages.map((stage) => (
              <div
                key={stage.num}
                className="bg-white border border-slate-200 rounded-[8px] p-6 flex items-start gap-5 shadow-xs"
              >
                <div className="w-9 h-9 rounded-[8px] bg-[#0B2545] text-white flex items-center justify-center font-bold text-sm shrink-0">
                  {stage.num}
                </div>
                <div className="space-y-1">
                  <h2 className="text-base font-bold text-[#0B2545]">
                    {stage.title}
                  </h2>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Section: What 'verified supplier' means */}
          <div className="max-w-3xl mx-auto bg-white border border-slate-200 rounded-[8px] p-6 sm:p-8 space-y-3 shadow-xs">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#0E9F9A]" />
              <h2 className="text-lg font-bold text-[#0B2545]">
                What 'verified supplier' means
              </h2>
            </div>
            <p className="text-xs text-slate-700 leading-relaxed">
              We use this phrase only when we have completed and recorded a defined check. Depending on the supplier and product, checks may include business identity, operating address, product capability, references, sample review, export experience and relevant test reports or certifications. We will tell you which checks were completed for each supplier.
            </p>
          </div>

          {/* "Our role" box */}
          <div className="max-w-3xl mx-auto bg-[#EBF7F7] border border-[#0E9F9A]/30 rounded-[8px] p-6 space-y-2">
            <h3 className="text-sm font-bold text-[#0B2545] uppercase tracking-wider">
              Our role
            </h3>
            <p className="text-xs text-slate-800 leading-relaxed font-medium">
              We are a sourcing and coordination intermediary. We do not manufacture the products we present.
            </p>
          </div>

          {/* CTA band to /buyers#enquiry */}
          <div className="max-w-3xl mx-auto text-center pt-2">
            <Link
              to="/buyers#enquiry"
              className="inline-flex items-center justify-center px-6 py-3.5 text-sm font-semibold text-white bg-[#0E9F9A] hover:bg-[#0B8884] rounded-[8px] transition-colors shadow-xs"
            >
              Submit Your Sourcing Brief
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
