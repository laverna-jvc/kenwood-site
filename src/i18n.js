// src/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Локализации - перемещаем их внутрь src
const enTranslation = {
  "nav": {
    "home": "Home",
    "stores": "Stores",
    "marketplaces": "Online Stores",
    "about": "About Us"
  },
  "contact": {
    "address": "Address",
    "email": "Email",
    "phone": "Phone",
    "social": "Social"
  },
  "home": {
    "title": "Laverna company",
	"subTitle": "in Lithuania and Latvia",
	"subTitle2": "Official KENWOOD Distributor",
    "welcome": "Welcome to the official website of KENWOOD distributor"
  },
  "stores": {
    "title": "Our Stores",
    "address": "Address",
    "phone": "Phone",
    "viewOnMap": "View on Map"
  },
  "marketplaces": {
    "title": "Online Stores",
    "visitStore": "Visit Store"
  },
  "about": {
    "paragraph1": "We are the official distributor of KENWOOD products in Lithuania and Latvia, providing the full range of KENWOOD audio and video equipment to customers in the Baltic region.",
    "paragraph2": "With years of experience and dedication to quality service, we ensure that customers have access to the latest KENWOOD products with full warranty and support.",
    "paragraph3": "Our stores across Lithuania and Latvia offer professional advice and demonstrations of KENWOOD products, helping customers find the perfect solution for their needs.",
    "paragraph4": "KENWOOD has been a pioneer in the audio-visual industry since 1927, continually innovating and developing cutting-edge technologies. As the official distributor, we are proud to bring this legacy of quality and innovation to the Baltic markets."
  },
  "footer": {
    "products": "Products",
    "contacts": "Contacts",
    "copyright": "All rights reserved."
  }
};

const ltTranslation = {
  "nav": {
    "home": "Pagrindinis",
    "stores": "Parduotuvės",
    "marketplaces": "El. parduotuvės",
    "about": "Apie mus"
  },
  "contact": {
    "address": "Adresas",
    "email": "Email",
    "phone": "Telefonas",
    "social": "Social"
  },
  "home": {
    "title": "Firma Laverna",
	"subTitle": "Lietuvoje ir Latvijoje",
	"subTitle2": "Oficialus KENWOOD distributorius",
    "welcome": "Sveiki atvykę į oficialią KENWOOD distributoriaus svetainę"
  },
  "stores": {
    "title": "Mūsų parduotuvės",
    "address": "Adresas",
    "phone": "Telefonas",
	"viewOnMap": "Peržiūrėti žemėlapyje"
  },
  "marketplaces": {
    "title": "El. parduotuvės",
    "visitStore": "Aplankyti parduotuvę"
  },
  "about": {
    "paragraph1": "Mes esame oficialus KENWOOD produktų platintojas Lietuvoje ir Latvijoje, teikiantis visą KENWOOD garso ir vaizdo įrangos asortimentą Baltijos regiono klientams.",
    "paragraph2": "Su ilgamete patirtimi ir atsidavimu kokybiškai paslaugai, mes užtikriname, kad klientai turėtų prieigą prie naujausių KENWOOD produktų su pilna garantija ir aptarnavimu.",
    "paragraph3": "Mūsų parduotuvės Lietuvoje ir Latvijoje siūlo profesionalias konsultacijas ir KENWOOD produktų demonstracijas, padedančias klientams rasti tobulą sprendimą jų poreikiams.",
    "paragraph4": "KENWOOD yra garso ir vaizdo pramonės pionierius nuo 1927 m., nuolat diegiantis inovacijas ir kuriantis pažangiausias technologijas. Kaip oficialus platintojas, didžiuojamės galėdami pristatyti šį kokybės ir inovacijų paveldą Baltijos rinkoms."
  },
  "footer": {
    "products": "Produktai",
    "contacts": "Kontaktai",
    "copyright": "Visos teisės saugomos."
  }
};

const lvTranslation = {
  "nav": {
    "home": "Sākums",
    "stores": "Veikali",
    "marketplaces": "Tiešsaistes veikali",
    "about": "Par mums"
  },
  "contact": {
    "address": "Adrese",
    "email": "Email",
    "phone": "Telefoni",
    "social": "Social"
  },
  "home": {
    "title": "Laverna uzņēmums",
	"subTitle": "Lietuvā un Latvijā",
	"subTitle2": "Oficiālais KENWOOD izplatītājs",
    "welcome": "Laipni lūdzam KENWOOD izplatītāja oficiālajā vietnē"
  },
  "stores": {
    "title": "Mūsu veikali",
    "address": "Adrese",
    "phone": "Tālrunis",
	"viewOnMap": "Skatīt kartē"
  },
  "marketplaces": {
    "title": "Tiešsaistes veikali",
    "visitStore": "Apmeklēt veikalu"
  },
  "about": {
    "paragraph1": "Mēs esam oficiāls KENWOOD produktu izplatītājs Lietuvā un Latvijā, nodrošinot pilnu KENWOOD audio un video aprīkojuma klāstu klientiem Baltijas reģionā.",
    "paragraph2": "Ar ilggadēju pieredzi un uzticību kvalitatīvam servisam, mēs nodrošinām, ka klientiem ir pieeja jaunākajiem KENWOOD produktiem ar pilnu garantiju un atbalstu.",
    "paragraph3": "Mūsu veikali Lietuvā un Latvijā piedāvā profesionālas konsultācijas un KENWOOD produktu demonstrācijas, palīdzot klientiem atrast ideālu risinājumu viņu vajadzībām.",
    "paragraph4": "KENWOOD ir audio-vizuālās industrijas pionieris kopš 1927. gada, nepārtraukti ieviešot inovācijas un attīstot modernākās tehnoloģijas. Kā oficiālais izplatītājs, mēs lepojamies, ka varam ienest šo kvalitātes un inovāciju mantojumu Baltijas tirgos."
  },
  "footer": {
    "products": "Produkti",
    "contacts": "Kontakti",
    "copyright": "Visas tiesības aizsargātas."
  }
};

const resources = {
  en: {
    translation: enTranslation
  },
  lt: {
    translation: ltTranslation
  },
  lv: {
    translation: lvTranslation
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'lt',
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;