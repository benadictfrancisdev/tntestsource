import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ShieldCheck } from 'lucide-react';

export const CookieBanner: React.FC = () => {
  const [acknowledged, setAcknowledged] = useState(true);
  const { t } = useTranslation('common');

  useEffect(() => {
    try {
      const stored = localStorage.getItem('connecthf_cookie_ack');
      if (!stored) {
        setAcknowledged(false);
      }
    } catch {
      // ignore
    }
  }, []);

  const handleAcknowledge = () => {
    try {
      localStorage.setItem('connecthf_cookie_ack', 'true');
    } catch {
      // ignore
    }
    setAcknowledged(true);
  };

  if (acknowledged) return null;

  return (
    <div
      role="region"
      aria-label="Cookie consent banner"
      className="fixed bottom-3 inset-x-3 sm:start-auto sm:end-4 sm:max-w-md z-40 bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl rounded-xl p-4 text-xs text-slate-700 space-y-3"
    >
      <div className="flex items-start gap-2.5">
        <ShieldCheck className="w-5 h-5 text-[#0E9F9A] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          {t('cookieBanner.message', 'We use minimal technical cookies necessary for secure form submission and language preferences. We do not use third-party tracking cookies.')}
        </p>
      </div>
      <div className="flex justify-end">
        <button
          type="button"
          onClick={handleAcknowledge}
          className="px-4 py-1.5 bg-[#0B2545] hover:bg-[#183C6C] text-white font-semibold rounded-lg text-xs transition-colors"
        >
          {t('cookieBanner.accept', 'Acknowledge')}
        </button>
      </div>
    </div>
  );
};
