import router from "@/router";
import axios from "axios";
import jwt_decode from "jwt-decode";

const state = {
  user: null,
};

const getters = {
  loggedInUser: (state) => state.user,
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
        localStorage.setItem("email", email);
        router.push("/verify-code");
      }
      commit("setError", "");
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },
  logout: ({ commit }) => {
    localStorage.clear();
    commit("setUser", null);
    commit("setError", "");
    router.push("/").catch((e) => {});
  },

  verifyCode: async ({ commit }, { email, code }) => {
    try {
      const resp = await axios.post("/auth/verify-totp", {
        token: code,
        email: email,
      });
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
      commit("setError", e.response.data.message);
    }
  },

  signup: async ({ commit }, userObj) => {
    try {
      await axios.post("/auth/signup", userObj);
      router.push("login");
      commit(
        "setNotification",
        "Welcome to Guardian! Please confirm your email first 😍"
      );
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  disbleMfa: async ({ commit, state }) => {
    try {
      await axios.patch("/users/disable-mfa");
      commit("setUser", { ...state.user, mfaEnabled: false });
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  enableMfa: async ({ commit, state }, token) => {
    try {
      await axios.patch("/users/enable-mfa", { token: token });
      commit("setUser", { ...state.user, mfaEnabled: true });
    } catch (error) {
      commit("setError", error.response.data.message);
    }
  },

  async deactivate({ commit, dispatch }) {
    try {
      await axios.patch("/users/deactivate");
      dispatch("logout");
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  async changeName({ commit }, { firstname, lastname }) {
    try {
      await axios.put("/users/change-name", { firstname, lastname });
      commit("setName", { firstname, lastname });
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  async changePassword({ commit, dispatch }, { currentPassword, newPassword }) {
    try {
      await axios.patch("/users/change-password", {
        currentPassword,
        newPassword,
      });
      commit(
        "setNotification",
        "You will be logged out soon. Please log in again :)"
      );
      setTimeout(() => {
        dispatch("logout");
        commit("setNotification", "");
        router.push("/login");
      }, 4000);
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  async requestTempPassword({ commit, dispatch }, email) {
    try {
      await axios.patch("/auth/forgot-password", { email: email });
      router.replace("/login");
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },
};

const mutations = {
  setUser: (state, userObj) => (state.user = userObj),
  setName: (state, nameObj) => {
    state.user.firstname = nameObj.firstname;
    state.user.lastname = nameObj.lastname;
  },
};

export default {
  state,
  actions,
  mutations,
  getters,
};
