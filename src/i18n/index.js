import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationsInEng from "../locales/en/translation.json";
import translationsInFrench from "../locales/fr/translation.json";

// the translations
const resources = {
  en: {
    translation: translationsInEng,
  },
  fr: {
    translation: translationsInFrench,
  },
};

const detectionOptions = {
  // Order and from where user language should be detected
  order: ["localStorage", "navigator", "htmlTag"],

  // Where to store the language
  caches: ["localStorage"],

  // Optional: keys or params to lookup language from
  lookupLocalStorage: "lang",
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    detection: detectionOptions, // 👈 add this
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
