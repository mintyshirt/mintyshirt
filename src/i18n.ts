import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  fr: {
    translation: {
      welcome: 'Success is shared',
      explore: 'Explorer les produits',
      sell: 'Vendre un produit',
    },
  },
  en: {
    translation: {
      welcome: 'Success is shared',
      explore: 'Browse products',
      sell: 'Sell a product',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'fr',
  fallbackLng: 'en',
  interpolation: { escapeValue: false },
});

export default i18n;
