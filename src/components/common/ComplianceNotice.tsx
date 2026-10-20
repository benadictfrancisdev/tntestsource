import React from 'react';
import { ShieldCheck, Info } from 'lucide-react';

export const ComplianceNotice: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
  if (compact) {
    return (
      <div className="bg-[#F5F7FA] border border-slate-200 rounded-[8px] p-4 text-xs text-slate-600 leading-relaxed">
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 text-[#0E9F9A] shrink-0 mt-0.5" />
          <p>
            <strong className="text-slate-800 font-semibold">Intermediary Transparency Note:</strong> When we refer to a verified supplier, we mean an independent manufacturer whose operational status, facilities, and statutory export licenses we have reviewed firsthand through on-site or documented checks, subject to supplier confirmation. All pricing and production terms remain subject to final supplier confirmation.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[8px] p-6 shadow-xs">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-[8px] bg-[#EBF7F7] text-[#0E9F9A] flex items-center justify-center shrink-0">
          <ShieldCheck className="w-5 h-5" />
        </div>
        <div className="space-y-2">
          <h3 className="text-base font-semibold text-[#0B2545]">
            Our Sourcing & Verification Standard
          </h3>
          <p className="text-sm text-slate-600 leading-relaxed">
            When we refer to a verified supplier, we mean an independent manufacturer whose operational status, facilities, and statutory export licenses we have reviewed firsthand through on-site or documented checks, subject to supplier confirmation.
          </p>
          <p className="text-xs text-slate-500 leading-relaxed">
            As a commission-based sourcing and coordination intermediary, we help identify regional manufacturing partners, coordinate request for quotations, and assist with communication. We do not own manufacturing facilities, and all orders are contracted directly between buyers and vetted independent suppliers.
          </p>
        </div>
      </div>
    </div>
  );
};
