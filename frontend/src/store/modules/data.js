import axios from "axios";

const state = {
  content: [],
  openedCategories: [],
  loading: false,
  categories: [],
};

const getters = {
  content: (state) => state.content,
  isLoading: (state) => state.loading,
  categories: (state) => state.categories,
};

const mutations = {
  startLoading: (state) => (state.loading = true),
  setContent: (state, data) => {
    state.content = data;
    state.categories = data.map((item) => {
      return { name: item.name, id: item._id };
    });
    state.loading = false;
  },
  addCateg: (state, category) => {
    state.content.push(category);
  },
  removeCateg: (state, categId) => {
    const categIndex = state.content.findIndex((c) => c._id === categId);
    state.content.splice(categIndex, 1);
  },
};

const actions = {
  fetchContent: async ({ commit }) => {
    commit("setContent", []);
    commit("startLoading");
    try {
      const categories = (await axios.get("/categories/")).data;
      commit("setContent", categories);
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  removeCategory: async ({ commit }, id) => {
    try {
      await axios.delete("/categories/" + id);
      commit("removeCateg", id);
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  addCategory: async ({ commit, dispatch }, category) => {
    try {
      await axios.post("/categories/", category);
      dispatch("fetchContent");
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  editCategory: async ({ commit, dispatch }, { id, name }) => {
    try {
      await axios.put("/categories/" + id, { name: name });
      dispatch("fetchContent");
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  addEntry: async ({ commit, dispatch }, { entry, categId }) => {
    try {
      await axios.post("/entries/?categoryId=" + categId, entry);
      dispatch("fetchContent");
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  editEntry: async ({ commit, dispatch }, entry) => {
    const id = entry._id;
    try {
      await axios.put("/entries/" + id, entry);
      dispatch("fetchContent");
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  removeEntry: async ({ commit, dispatch }, id) => {
    try {
      await axios.delete("/entries/" + id);
      dispatch("fetchContent");
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },
};

export default {
  actions,
  getters,
  mutations,
  state,
};
