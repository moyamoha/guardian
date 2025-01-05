import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import "./plugins/axios";
import router from "./router";
import { createPinia } from "pinia";
import piniaPluginPersistedState from "pinia-plugin-persistedstate";

import "@mdi/font/css/materialdesignicons.css";
import vuetify from "./plugins/vuetify";

const pinia = createPinia();
pinia.use(piniaPluginPersistedState);

createApp(App).use(pinia).use(vuetify).use(router).mount("#app");
