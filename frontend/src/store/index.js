import Vue from "vue";
import Vuex from "vuex";

import userModule from "./modules/user";
import dataModule from "./modules/data";

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		user: userModule,
		data: dataModule,
	},
});
