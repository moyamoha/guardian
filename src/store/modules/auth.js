import socket from "@/plugins/socket";
import router from "@/router";
import jwt_decode from "jwt-decode";

const state = {
  user: null,
};

const getters = {
  loggedInUser: (state) => state.user,
};

const actions = {
  login: async ({ commit }, token) => {
    try {
      if (token) {
        localStorage.setItem("accessToken", token);
        const decoded = jwt_decode(token);
        commit("setUser", {
          email: decoded.email,
          firstname: decoded.firstname,
          lastname: decoded.lastname,
        });
        commit("setError", "");
        router.push("/home");
      }
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
