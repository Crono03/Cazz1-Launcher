import enTranslations from "../../locales/en.json" assert { type: 'json' }
import itTranslations from "../../locales/it.json" assert { type: 'json' }
import getLocaleLanguage from "./getLocale";

const supportedLanguages = ['en', 'it']; // Elenco delle lingue supportate

let currentLanguage;
currentLanguage = getLocaleLanguage(); // Chiamata a una funzione getLocaleLanguage() che restituisce la lingua ottenuta da getLocale.js

if (!supportedLanguages.includes(currentLanguage)) {
  currentLanguage = 'en'; // Imposta su "en" solo se la lingua non è supportata
}

const translations = {
  en: enTranslations,
  it: itTranslations,
};

export function setLanguage(lang) {
  currentLanguage = lang;
}

export function getTranslation(key) {
  return translations[currentLanguage][key] || '';
}