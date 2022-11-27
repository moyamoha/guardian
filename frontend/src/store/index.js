import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";

import userModule from "./modules/auth";
import dataModule from "./modules/data";
import uiModule from "./modules/ui";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
  modules: ["user", "ui"],
});

export default new Vuex.Store({
  modules: {
    user: userModule,
    data: dataModule,
    ui: uiModule,
  },
  plugins: [vuexLocal.plugin],
});
