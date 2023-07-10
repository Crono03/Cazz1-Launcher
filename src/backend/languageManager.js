import enTranslations from "../../locales/en.json" assert { type: 'json' }
import itTranslations from "../../locales/it.json" assert { type: 'json' }
const translations = {
  en: enTranslations,
  it: itTranslations,
};

export let currentLanguage;
currentLanguage="en";

export function setLanguage(lang) {
  currentLanguage = lang;
}

export function getTranslation(key) {
  return translations[currentLanguage][key] || '';
}
