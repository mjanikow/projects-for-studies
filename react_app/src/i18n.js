// Contains translations definitions
import transEnglish from "./locales/en";
import transPolish from "./locales/pl";
import i18n from "i18next";
import { initReactI18next as initI18 } from "react-i18next";

const resources = {
    en: {
        translation: transEnglish
    },
    pl: {
        translation: transPolish
    }
};

i18n.use(initI18).init({
    resources,
    lng: "pl",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;