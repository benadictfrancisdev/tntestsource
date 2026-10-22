import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Import all namespaces for all languages
import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enProducts from './locales/en/products.json';
import enCategories from './locales/en/categories.json';
import enHowItWorks from './locales/en/howItWorks.json';
import enBuyers from './locales/en/buyers.json';
import enManufacturers from './locales/en/manufacturers.json';
import enAbout from './locales/en/about.json';
import enContact from './locales/en/contact.json';
import enForms from './locales/en/forms.json';
import enLegal from './locales/en/legal.json';

import arCommon from './locales/ar/common.json';
import arHome from './locales/ar/home.json';
import arProducts from './locales/ar/products.json';
import arCategories from './locales/ar/categories.json';
import arHowItWorks from './locales/ar/howItWorks.json';
import arBuyers from './locales/ar/buyers.json';
import arManufacturers from './locales/ar/manufacturers.json';
import arAbout from './locales/ar/about.json';
import arContact from './locales/ar/contact.json';
import arForms from './locales/ar/forms.json';
import arLegal from './locales/ar/legal.json';

import frCommon from './locales/fr/common.json';
import frHome from './locales/fr/home.json';
import frProducts from './locales/fr/products.json';
import frCategories from './locales/fr/categories.json';
import frHowItWorks from './locales/fr/howItWorks.json';
import frBuyers from './locales/fr/buyers.json';
import frManufacturers from './locales/fr/manufacturers.json';
import frAbout from './locales/fr/about.json';
import frContact from './locales/fr/contact.json';
import frForms from './locales/fr/forms.json';
import frLegal from './locales/fr/legal.json';

import deCommon from './locales/de/common.json';
import deHome from './locales/de/home.json';
import deProducts from './locales/de/products.json';
import deCategories from './locales/de/categories.json';
import deHowItWorks from './locales/de/howItWorks.json';
import deBuyers from './locales/de/buyers.json';
import deManufacturers from './locales/de/manufacturers.json';
import deAbout from './locales/de/about.json';
import deContact from './locales/de/contact.json';
import deForms from './locales/de/forms.json';
import deLegal from './locales/de/legal.json';

import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esProducts from './locales/es/products.json';
import esCategories from './locales/es/categories.json';
import esHowItWorks from './locales/es/howItWorks.json';
import esBuyers from './locales/es/buyers.json';
import esManufacturers from './locales/es/manufacturers.json';
import esAbout from './locales/es/about.json';
import esContact from './locales/es/contact.json';
import esForms from './locales/es/forms.json';
import esLegal from './locales/es/legal.json';

import taCommon from './locales/ta/common.json';
import taHome from './locales/ta/home.json';
import taProducts from './locales/ta/products.json';
import taCategories from './locales/ta/categories.json';
import taHowItWorks from './locales/ta/howItWorks.json';
import taBuyers from './locales/ta/buyers.json';
import taManufacturers from './locales/ta/manufacturers.json';
import taAbout from './locales/ta/about.json';
import taContact from './locales/ta/contact.json';
import taForms from './locales/ta/forms.json';
import taLegal from './locales/ta/legal.json';

export const resources = {
  en: {
    common: enCommon,
    home: enHome,
    products: enProducts,
    categories: enCategories,
    howItWorks: enHowItWorks,
    buyers: enBuyers,
    manufacturers: enManufacturers,
    about: enAbout,
    contact: enContact,
    forms: enForms,
    legal: enLegal
  },
  ar: {
    common: arCommon,
    home: arHome,
    products: arProducts,
    categories: arCategories,
    howItWorks: arHowItWorks,
    buyers: arBuyers,
    manufacturers: arManufacturers,
    about: arAbout,
    contact: arContact,
    forms: arForms,
    legal: arLegal
  },
  fr: {
    common: frCommon,
    home: frHome,
    products: frProducts,
    categories: frCategories,
    howItWorks: frHowItWorks,
    buyers: frBuyers,
    manufacturers: frManufacturers,
    about: frAbout,
    contact: frContact,
    forms: frForms,
    legal: frLegal
  },
  de: {
    common: deCommon,
    home: deHome,
    products: deProducts,
    categories: deCategories,
    howItWorks: deHowItWorks,
    buyers: deBuyers,
    manufacturers: deManufacturers,
    about: deAbout,
    contact: deContact,
    forms: deForms,
    legal: deLegal
  },
  es: {
    common: esCommon,
    home: esHome,
    products: esProducts,
    categories: esCategories,
    howItWorks: esHowItWorks,
    buyers: esBuyers,
    manufacturers: esManufacturers,
    about: esAbout,
    contact: esContact,
    forms: esForms,
    legal: esLegal
  },
  ta: {
    common: taCommon,
    home: taHome,
    products: taProducts,
    categories: taCategories,
    howItWorks: taHowItWorks,
    buyers: taBuyers,
    manufacturers: taManufacturers,
    about: taAbout,
    contact: taContact,
    forms: taForms,
    legal: taLegal
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    },
    detection: {
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage']
    }
  });

export default i18n;
