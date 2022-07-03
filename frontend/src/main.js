import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;
axios.defaults.baseURL = "https://passwordgaurdian.herokuapp.com";
axios.interceptors.request.use((config) => {
	const accessToken = localStorage.getItem("accessToken");
	if (accessToken) {
		config.headers = {
			Authorization: `Bearer ${accessToken}`,
		};
	}
	return config;
});

axios.interceptors.response.use((resp) => {
	if (resp.status === 401) {
		router.replace("/");
		store.dispatch("logout");
	}
	return resp;
});

new Vue({
	router,
	store,
	vuetify,
	render: (h) => h(App),
}).$mount("#app");
