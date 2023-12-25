import socket from "@/plugins/socket";
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
  logout: ({ commit, getters }) => {
    socket.emit("leaveRoom", getters.loggedInUser.email);
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
      if (resp && resp.data.accessToken) {
        localStorage.setItem("accessToken", resp.data.accessToken);
        const decoded = jwt_decode(resp.data.accessToken);
        commit("setUser", {
          email: decoded.email,
          firstname: decoded.firstname,
          lastname: decoded.lastname,
          mfaEnabled: decoded.mfaEnabled,
        });
        router.push("/home");
      }
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

  disableMfa: async ({ commit, getters }) => {
    try {
      await axios.patch("/users/disable-mfa");
      commit("setMfaStatus", false);
      socket.emit("profile-updated", getters.loggedInUser.email);
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  enableMfa: async ({ commit, getters }, token) => {
    try {
      await axios.patch("/users/enable-mfa", { token: token });
      socket.emit("profile-updated", getters.loggedInUser.email);
    } catch (error) {
      commit("setError", error.response.data.message);
    }
  },

  async deactivate({ commit, dispatch, state }, password) {
    try {
      await axios.patch("/users/deactivate", { password });
      socket.emit("user-deactivated", state.user.email);
      socket.emit("leaveRoom", state.user.email);
      dispatch("logout");
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  async changeName({ commit, state }, { firstname, lastname }) {
    try {
      await axios.put("/users/change-name", { firstname, lastname });
      commit("setName", { firstname, lastname });
      socket.emit("profile-updated", state.user.email);
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

  async getProfile({ commit }) {
    try {
      const response = await axios.get("/users/profile");
      const profile = response.data;
      commit("setUser", profile);
    } catch (error) {
      commit("setError", error.response.data.message);
    }
  },
};

const mutations = {
  setUser: (state, userObj) => (state.user = userObj),
  setName: (state, nameObj) => {
    state.user.firstname = nameObj.firstname;
    state.user.lastname = nameObj.lastname;
  },
  setMfaStatus: (state, status) => (state.user.mfaEnabled = status),
};

export default {
  state,
  actions,
  mutations,
  getters,
};
