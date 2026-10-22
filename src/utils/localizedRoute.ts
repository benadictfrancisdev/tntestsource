import { useLocation, useParams } from 'react-router-dom';
import { DEFAULT_LANGUAGE, LANGUAGES, SUPPORTED_LANG_CODES } from '../config/languages';

/**
 * Returns clean path without language prefix, plus the detected language code.
 */
export function extractLocaleFromPath(pathname: string): { lang: string; cleanPath: string } {
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0];

  if (firstSegment && SUPPORTED_LANG_CODES.includes(firstSegment) && firstSegment !== DEFAULT_LANGUAGE) {
    const cleanSegments = segments.slice(1);
    const cleanPath = '/' + cleanSegments.join('/');
    return { lang: firstSegment, cleanPath: cleanPath === '' ? '/' : cleanPath };
  }

  return { lang: DEFAULT_LANGUAGE, cleanPath: pathname };
}

/**
 * Formats an internal path with the appropriate language prefix.
 * English remains at root (e.g. /products, /how-it-works).
 * Other languages get /ar/products, /fr/products, etc.
 * Admin and settings paths never get a prefix.
 */
export function formatLocalizedPath(path: string, lang: string): string {
  if (path.startsWith('/admin') || path.startsWith('/settings')) {
    return path;
  }

  // Preserve hash and search query if included in path
  const [baseAndQuery, hash] = path.split('#');
  const [basePath, search] = baseAndQuery.split('?');

  const normalizedBase = basePath.startsWith('/') ? basePath : `/${basePath}`;

  let localizedBase = normalizedBase;
  if (lang && lang !== DEFAULT_LANGUAGE && SUPPORTED_LANG_CODES.includes(lang)) {
    localizedBase = `/${lang}${normalizedBase === '/' ? '' : normalizedBase}`;
    if (localizedBase === '') localizedBase = `/${lang}`;
  }

  const queryPart = search ? `?${search}` : '';
  const hashPart = hash ? `#${hash}` : '';

  return `${localizedBase}${queryPart}${hashPart}`;
}

/**
 * Custom hook to obtain the current active language and localized path generator
 */
export function useActiveLanguage(): {
  currentLang: string;
  isRtl: boolean;
  localizePath: (path: string) => string;
} {
  const location = useLocation();
  const { lang: paramLang } = useParams<{ lang?: string }>();

  let currentLang = DEFAULT_LANGUAGE;
  if (paramLang && SUPPORTED_LANG_CODES.includes(paramLang)) {
    currentLang = paramLang;
  } else {
    currentLang = extractLocaleFromPath(location.pathname).lang;
  }

  const langConfig = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const isRtl = langConfig.dir === 'rtl';

  return {
    currentLang,
    isRtl,
    localizePath: (path: string) => formatLocalizedPath(path, currentLang)
  };
}
