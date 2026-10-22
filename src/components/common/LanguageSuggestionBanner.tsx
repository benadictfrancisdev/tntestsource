import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe, X } from 'lucide-react';
import { LANGUAGES, SUPPORTED_LANG_CODES } from '../../config/languages';
import { extractLocaleFromPath, formatLocalizedPath } from '../../utils/localizedRoute';

interface LanguageSuggestionBannerProps {
  currentLang: string;
}

export const LanguageSuggestionBanner: React.FC<LanguageSuggestionBannerProps> = ({ currentLang }) => {
  const [suggestedLang, setSuggestedLang] = useState<string | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem('connecthf_lang_suggestion_dismissed');
      if (dismissed) return;

      const userChoice = localStorage.getItem('i18nextLng');
      if (userChoice && userChoice !== 'en') return;

      const browserLang = (navigator.language || (navigator as any).userLanguage || '').slice(0, 2).toLowerCase();

      if (browserLang && browserLang !== currentLang && SUPPORTED_LANG_CODES.includes(browserLang)) {
        setSuggestedLang(browserLang);
      }
    } catch {
      // ignore
    }
  }, [currentLang]);

  if (!suggestedLang) return null;

  const targetConfig = LANGUAGES.find((l) => l.code === suggestedLang);
  if (!targetConfig) return null;

  const handleSwitch = () => {
    const { cleanPath } = extractLocaleFromPath(location.pathname);
    const newPath = formatLocalizedPath(cleanPath, suggestedLang) + location.search + location.hash;
    try {
      localStorage.setItem('i18nextLng', suggestedLang);
      localStorage.setItem('connecthf_lang_suggestion_dismissed', 'true');
    } catch {
      // ignore
    }
    setSuggestedLang(null);
    navigate(newPath);
  };

  const handleDismiss = () => {
    try {
      localStorage.setItem('connecthf_lang_suggestion_dismissed', 'true');
    } catch {
      // ignore
    }
    setSuggestedLang(null);
  };

  return (
    <aside
      aria-label="Language recommendation"
      className="bg-[#0B2545] text-white text-xs py-2 px-4 border-b border-slate-700/60 transition-all"
    >
      <div className="max-w-[1280px] mx-auto flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-[#0E9F9A] shrink-0" />
          <span>
            We noticed your browser language is <strong>{targetConfig.name}</strong>. Would you like to view Connect HF in <strong>{targetConfig.nativeLabel}</strong>?
          </span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={handleSwitch}
            className="px-2.5 py-1 bg-[#0E9F9A] hover:bg-[#0B8884] text-white font-semibold rounded text-[11px] transition-colors"
          >
            Switch to {targetConfig.nativeLabel}
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="p-1 text-slate-400 hover:text-white rounded"
            aria-label="Dismiss language suggestion"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
};
