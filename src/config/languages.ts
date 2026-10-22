export interface LanguageConfig {
  code: string;
  name: string;
  nativeLabel: string;
  dir: 'ltr' | 'rtl';
  fontFamily?: string;
}

export const LANGUAGES: LanguageConfig[] = [
  {
    code: 'en',
    name: 'English',
    nativeLabel: 'English',
    dir: 'ltr'
  },
  {
    code: 'ar',
    name: 'Arabic',
    nativeLabel: 'العربية',
    dir: 'rtl',
    fontFamily: "'Noto Sans Arabic', sans-serif"
  },
  {
    code: 'fr',
    name: 'French',
    nativeLabel: 'Français',
    dir: 'ltr'
  },
  {
    code: 'de',
    name: 'German',
    nativeLabel: 'Deutsch',
    dir: 'ltr'
  },
  {
    code: 'es',
    name: 'Spanish',
    nativeLabel: 'Español',
    dir: 'ltr'
  },
  {
    code: 'ta',
    name: 'Tamil',
    nativeLabel: 'தமிழ்',
    dir: 'ltr',
    fontFamily: "'Noto Sans Tamil', sans-serif"
  }
];

export const DEFAULT_LANGUAGE = 'en';

export const SUPPORTED_LANG_CODES = LANGUAGES.map((l) => l.code);
export const NON_DEFAULT_LANG_CODES = LANGUAGES.filter((l) => l.code !== DEFAULT_LANGUAGE).map((l) => l.code);

export const getLanguageConfig = (code: string): LanguageConfig => {
  return LANGUAGES.find((l) => l.code === code) || LANGUAGES[0];
};
