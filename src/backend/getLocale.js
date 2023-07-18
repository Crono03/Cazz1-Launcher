import { setLanguage } from "./languageManager";


function getLocaleLanguage() {
  const systemLanguage = navigator.language;
  const language = systemLanguage.substring(0, 2); // Estrai solo i primi due caratteri per ottenere il formato "en"

  setLanguage(language); // Imposta la lingua nel file languageManager.js

  return language;
}

export default getLocaleLanguage;
