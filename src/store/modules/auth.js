import router from "@/router";
import axios from "axios";
import jwt_decode from "jwt-decode";

const state = {
  user: null,
  userHasMasterPassword: false,
};

const getters = {
  loggedInUser: (state) => state.user,
  userHasMasterPassword: (state) => state.userHasMasterPassword,
};

const actions = {
  login: async ({ commit }, token) => {
    try {
      if (token) {
        localStorage.setItem("accessToken", token);
        const decoded = jwt_decode(token);

        // Determine if user has vartija profile
        const resp = await axios.get("/vartija-profiles/has-vartija-profile");
        commit("setUserHasMasterPassword", resp.data.hasVartijaProfile);
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
    localStorage.clear();
    commit("setUser", null);
    commit("setError", "");
    router.push("/").catch((e) => {});
  },
  fetchProfile: async ({ commit }) => {
    try {
      const resp = await axios.get("/users/profile");
      if (resp.data) {
        commit("setUser", {
          email: resp.data.email,
          firstname: resp.data.firstname,
          lastname: resp.data.lastname,
        });
      }
    } catch (error) {
      commit("setError", error.response.data.message);
    }
  },

  setupMasterPassword: async ({ commit }, payload) => {
    try {
      await axios.post("/vartija-profiles/", payload);
      commit("setUserHasMasterPassword", true);
    } catch (error) {
      commit("setError", error.response.data.message);
    }
  },

  changeMasterPassword: async ({ commit }, payload) => {
    try {
      await axios.patch("/vartija-profiles/change-master-password", payload);
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
  setUserHasMasterPassword: (state, has) => (state.userHasMasterPassword = has),
};

export default {
  state,
  actions,
  mutations,
  getters,
};
