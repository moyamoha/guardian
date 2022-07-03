import router from "@/router";
import axios from "axios";
import jwt_decode from "jwt-decode";

const state = {
	user: null,
	authError: "",
};

const getters = {
	loggedInUser: (state) => state.user,
	authError: (state) => state.authError,
};

const actions = {
	login: async ({ commit }, { email, password }) => {
		try {
			const resp = await axios.post("/auth/login", {
				email: email,
				password: password,
			});
			if (resp.data.accessToken) {
				localStorage.setItem("accessToken", resp.data.accessToken);
				const decoded = jwt_decode(resp.data.accessToken);
				commit("setUser", {
					email: decoded.email,
					firstname: decoded.firstname,
					lastname: decoded.lastname,
					mfaEnabled: decoded.mfaEnabled,
				});
				router.push("/home");
			} else {
				router.push("/verify-code");
			}
		} catch (e) {
			commit("setAuthError", e.response.data.message);
		}
	},
	logout: ({ commit }) => {
		localStorage.removeItem("accessToken");
		commit("setUser", null);
		router.push("/").catch((e) => {});
	},

	verifyCode: async ({ commit }, code) => {
		try {
			const resp = await axios.post("/auth/verify-code", { code: code });
			localStorage.setItem("accessToken", resp.data.accessToken);
			const decoded = jwt_decode(resp.data.accessToken);
			commit("setUser", {
				email: decoded.email,
				firstname: decoded.firstname,
				lastname: decoded.lastname,
				mfaEnabled: decoded.mfaEnabled,
			});
			router.push("/home");
		} catch (e) {
			commit("setAuthError", e.response.data.message);
		}
	},
	signup: async ({ commit }, userObj) => {
		try {
			await axios.post("/auth/signup", userObj);
			router.push("login");
			commit(
				"setNotification",
				"Welcome to Gaurdian! Please confirm your email first 😍"
			);
		} catch (e) {
			commit("setAuthError", e.response.data.message);
		}
	},
};

const mutations = {
	setAuthError: (state, errorMsg) => (state.authError = errorMsg),
	setUser: (state, userObj) => (state.user = userObj),
};

export default {
	state,
	actions,
	mutations,
	getters,
};
