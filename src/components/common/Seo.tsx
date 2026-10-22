import React from 'react';
import { Helmet } from 'react-helmet-async';
import { BRAND_NAME, SITE_URL } from '../../config/site';
import { LANGUAGES, DEFAULT_LANGUAGE } from '../../config/languages';
import { extractLocaleFromPath, formatLocalizedPath, useActiveLanguage } from '../../utils/localizedRoute';

interface SeoProps {
  title?: string;
  description?: string;
  path?: string;
  noindex?: boolean;
  jsonLd?: Record<string, any>;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description = 'Connect with potential manufacturers and suppliers across Tamil Nadu, India. Submit your product requirements for sourcing support, supplier research and quotation coordination.',
  path = '',
  noindex = false,
  jsonLd
}) => {
  const { currentLang } = useActiveLanguage();
  const fullTitle = title || BRAND_NAME;

  // Derive base clean path without language prefix
  const { cleanPath } = extractLocaleFromPath(path.startsWith('/') ? path : `/${path}`);

  // Canonical for the currently rendered language
  const canonicalPath = formatLocalizedPath(cleanPath, currentLang);
  const canonicalUrl = `${SITE_URL}${canonicalPath === '/' ? '' : canonicalPath}`;

  // Map language to OpenGraph locale
  const ogLocaleMap: Record<string, string> = {
    en: 'en_US',
    ar: 'ar_AR',
    fr: 'fr_FR',
    de: 'de_DE',
    es: 'es_ES',
    ta: 'ta_IN'
  };

  const ogLocale = ogLocaleMap[currentLang] || 'en_US';

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <>
          <link rel="canonical" href={canonicalUrl} />

          {/* Hreflang alternates for all 6 languages */}
          {LANGUAGES.map((lang) => {
            const localizedPath = formatLocalizedPath(cleanPath, lang.code);
            const alternateUrl = `${SITE_URL}${localizedPath === '/' ? '' : localizedPath}`;
            return (
              <link
                key={lang.code}
                rel="alternate"
                hrefLang={lang.code}
                href={alternateUrl}
              />
            );
          })}

          {/* x-default points to default English route */}
          <link
            rel="alternate"
            hrefLang="x-default"
            href={`${SITE_URL}${cleanPath === '/' ? '' : cleanPath}`}
          />
        </>
      )}

      {/* OpenGraph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:locale" content={ogLocale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Structured Data (JSON-LD) */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
};
