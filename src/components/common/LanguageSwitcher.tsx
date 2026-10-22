import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { LANGUAGES, LanguageConfig } from '../../config/languages';
import { extractLocaleFromPath, formatLocalizedPath, useActiveLanguage } from '../../utils/localizedRoute';

interface LanguageSwitcherProps {
  variant?: 'header' | 'footer' | 'mobile';
  className?: string;
}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = ({
  variant = 'header',
  className = ''
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { currentLang } = useActiveLanguage();

  const currentConfig = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLanguageChange = (targetCode: string) => {
    if (targetCode === currentLang) {
      setDropdownOpen(false);
      return;
    }

    const { cleanPath } = extractLocaleFromPath(location.pathname);
    const newPath = formatLocalizedPath(cleanPath, targetCode) + location.search + location.hash;

    try {
      localStorage.setItem('i18nextLng', targetCode);
    } catch {
      // ignore
    }

    setDropdownOpen(false);
    navigate(newPath);
  };

  if (variant === 'footer') {
    return (
      <div className={`flex flex-wrap items-center gap-2 text-xs ${className}`}>
        <span className="text-slate-400 flex items-center gap-1.5">
          <Globe className="w-3.5 h-3.5" />
          <span>Language:</span>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className={`px-2 py-0.5 rounded transition-colors ${
                currentLang === lang.code
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {lang.nativeLabel}
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (variant === 'mobile') {
    return (
      <div className={`space-y-2 p-3 bg-slate-50 rounded-lg border border-slate-200 ${className}`}>
        <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700">
          <Globe className="w-4 h-4 text-[#0E9F9A]" />
          <span>Select Language / اللغة / மொழி</span>
        </div>
        <div className="grid grid-cols-3 gap-1.5 pt-1">
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className={`px-2.5 py-1.5 text-xs rounded-md text-center transition-colors ${
                currentLang === lang.code
                  ? 'bg-[#0B2545] text-white font-bold'
                  : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {lang.nativeLabel}
            </button>
          ))}
        </div>
      </div>
    );
  }

  // Header Dropdown Variant
  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:text-[#0B2545] bg-slate-100 hover:bg-slate-200 rounded-[8px] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0E9F9A]"
        aria-label="Select language"
        aria-expanded={dropdownOpen}
      >
        <Globe className="w-3.5 h-3.5 text-slate-600" />
        <span className="font-medium">{currentConfig.nativeLabel}</span>
        <ChevronDown className={`w-3 h-3 text-slate-400 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`} />
      </button>

      {dropdownOpen && (
        <div className="absolute end-0 mt-2 w-44 bg-white rounded-[8px] border border-slate-200 shadow-xl py-1.5 z-50 animate-in fade-in zoom-in-95 duration-100">
          <div className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-slate-400 border-b border-slate-100">
            Languages
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center justify-between px-3 py-2 text-xs transition-colors ${
                currentLang === lang.code
                  ? 'bg-slate-50 font-bold text-[#b91c1c]'
                  : 'text-slate-700 hover:bg-slate-50 hover:text-[#0B2545]'
              }`}
            >
              <span>{lang.nativeLabel}</span>
              {currentLang === lang.code && <Check className="w-3.5 h-3.5 text-[#b91c1c]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
