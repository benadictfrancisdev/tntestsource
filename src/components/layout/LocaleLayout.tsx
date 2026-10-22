import React, { useEffect } from 'react';
import { useParams, Outlet, Navigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { DEFAULT_LANGUAGE, LANGUAGES, SUPPORTED_LANG_CODES } from '../../config/languages';
import { LanguageSuggestionBanner } from '../common/LanguageSuggestionBanner';
import { CookieBanner } from '../common/CookieBanner';

interface LocaleLayoutProps {
  forceLang?: string;
}

export const LocaleLayout: React.FC<LocaleLayoutProps> = ({ forceLang }) => {
  const { lang: paramLang } = useParams<{ lang?: string }>();
  const { i18n } = useTranslation();

  const activeLang = forceLang || paramLang || DEFAULT_LANGUAGE;

  // Validate language code; if invalid, redirect to 404
  if (paramLang && !SUPPORTED_LANG_CODES.includes(paramLang)) {
    return <Navigate to="/404" replace />;
  }

  const langConfig = LANGUAGES.find((l) => l.code === activeLang) || LANGUAGES[0];

  useEffect(() => {
    if (i18n.language !== activeLang) {
      i18n.changeLanguage(activeLang);
    }

    // Set HTML lang and dir attributes
    document.documentElement.lang = activeLang;
    document.documentElement.dir = langConfig.dir;

    if (langConfig.dir === 'rtl') {
      document.documentElement.classList.add('rtl');
    } else {
      document.documentElement.classList.remove('rtl');
    }

    // Font family adjustment for Arabic / Tamil
    if (langConfig.fontFamily) {
      document.body.style.fontFamily = langConfig.fontFamily;
    } else {
      document.body.style.fontFamily = "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
    }

    // Persist choice to localStorage
    try {
      localStorage.setItem('i18nextLng', activeLang);
    } catch {
      // ignore
    }
  }, [activeLang, langConfig, i18n]);

  return (
    <>
      <LanguageSuggestionBanner currentLang={activeLang} />
      <Outlet />
      <CookieBanner />
    </>
  );
};
