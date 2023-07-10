import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Store from 'electron-store';
import path from 'path';

// Importa i file di traduzione per le diverse lingue
import translationEN from './locales/en.json';
import translationIT from './locales/it.json';

const store = new Store();

const defaultLanguageFilePath = path.join(store.path, 'cazz1-launcher', 'config.json');
const defaultLanguageFile = store.get('defaultLanguageFile', defaultLanguageFilePath);
const defaultLanguage = window.require(defaultLanguageFile).language;

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    it: {
      translation: translationIT,
    },
  },
  lng: defaultLanguage, // Imposta la lingua predefinita
  fallbackLng: 'en', // Lingua di fallback in caso di mancanza di traduzioni
  interpolation: {
    escapeValue: false, // Permette l'uso di HTML nei testi tradotti
  },
});

export default i18n;
