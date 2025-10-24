import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// The 'assert' syntax is not universally supported, causing errors.
// We will fetch the JSON files instead.
// import en from './locales/en/common.json' assert { type: 'json' };
// import ar from './locales/ar/common.json' assert { type: 'json' };

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    // Resources will be loaded asynchronously below
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['queryString', 'cookie', 'localStorage', 'sessionStorage', 'navigator', 'htmlTag'],
      caches: ['cookie'],
    },
  });

// Asynchronously load translation files and add them to i18next
async function loadTranslations() {
  try {
    const [enResponse, arResponse] = await Promise.all([
      fetch('./i18n/locales/en/common.json'),
      fetch('./i18n/locales/ar/common.json'),
    ]);

    if (!enResponse.ok || !arResponse.ok) {
      throw new Error('Failed to fetch translation files.');
    }

    const en = await enResponse.json();
    const ar = await arResponse.json();

    i18n.addResourceBundle('en', 'translation', en);
    i18n.addResourceBundle('ar', 'translation', ar);

    // This will trigger a re-render in components that are waiting for translations
    i18n.changeLanguage(i18n.language);
  } catch (error) {
    console.error('Error loading translation files:', error);
  }
}

loadTranslations();

export default i18n;
