import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import axios, { AxiosError } from "axios";
import { BACKEND_BASE_URL } from "./utils/constants";

Vue.config.productionTip = false;

axios.defaults.baseURL = BACKEND_BASE_URL;
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
    if (resp.status >= 200 && resp.status < 300) {
      store.commit("setError", "");
    }
    return resp;
  },
  function (error) {
    if (error instanceof AxiosError && error.response.data.statusCode === 401) {
      store.commit("setError", "You are not logged in or session expired");
      store.commit("setUser", null);
      router.push("/");
    } else {
      return Promise.reject(error);
    }
  }
);

if (process.env.NODE_ENV === "production") {
  console.log = () => {};
  console.warn = () => {};
  console.error = () => {};
  console.debug = () => {};
  console.info = () => {};
}

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
