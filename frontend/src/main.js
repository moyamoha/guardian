import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import i18n from "./plugins/i18n";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

axios.defaults.baseURL = "https://vartija-backend.onrender.com";
axios.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  }
  return config;
});
axios.interceptors.response.use(
  function (resp) {
    if (resp.status === 401) {
      router.push("/login");
    }
    if (resp.status >= 200 && resp.status < 300) {
      store.commit("setError", "");
    }
    return resp;
  },
  function (error) {
    if (error.name === "AxiosError" && error.response.data.statusCode === 401) {
      store.commit("setError", "You are not logged in or session expired");
      store.commit("setUser", null);
      router.push("/login");
    }
  }
);

new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
