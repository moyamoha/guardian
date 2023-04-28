import Vue from "vue";
import VueI18n from "vue-i18n";
import en from "@/locales/en.json";
import fi from "@/locales/fi.json";

Vue.use(VueI18n);

export default new VueI18n({
  locale: navigator.language.split("-")[0],
  messages: {
    en,
    fi,
  },
});
