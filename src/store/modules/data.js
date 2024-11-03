import axios from "axios";

const state = {
  content: [],
  entries: [],
  loading: false,
  categories: [],
  filter: {
    search: "",
    category: "",
    status: "",
  },
};

const getters = {
  content: (state) => state.content,
  allEntries: (state) => state.entries,
  isLoading: (state) => state.loading,
  categories: (state) => state.categories,
  filter: (state) => state.filter,
};

const mutations = {
  startLoading: (state) => (state.loading = true),
  setContent: (state, data) => {
    state.content = data;
    state.categories = data.map((item) => {
      return { name: item.name, id: item._id, entryCount: item.items.length };
    });
    let e = [];
    data.forEach((citem) => {
      e = e.concat(citem.items);
    });
    state.entries = e;
    state.loading = false;
  },
  setEntries: (state, entries) => {
    state.entries = entries;
  },
  setFilter: (state, filter) => {
    state.filter = filter;
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

  searchEntries: async ({ commit }, queryObj) => {
    const queryItems = [];
    for (const key of Object.keys(queryObj)) {
      queryItems.push(`${key}=${queryObj[key]}`);
    }
    const queryString = queryItems.join("&");
    try {
      const entries = (await axios.get("/entries/?" + queryString)).data;
      commit("setEntries", entries);
      commit("setFilter", queryObj);
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  removeCategory: async ({ commit, dispatch }, id) => {
    try {
      await axios.delete("/categories/" + id);
      dispatch("fetchContent");
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
      await axios.put("/categories/" + id, { newName: name });
      dispatch("fetchContent");
    } catch (e) {
      console.log(e);
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

  editEntry: async ({ commit, dispatch }, { id, entry, reload }) => {
    try {
      await axios.put("/entries/" + id, entry);
      if (reload) dispatch("fetchContent");
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  changeCategoryForEntry: async (
    { commit, dispatch },
    { entryId, payload }
  ) => {
    try {
      await axios.patch(`/entries/${entryId}/change-category`, payload);
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

  requestEntryPasswordReveal: async ({ commit, dispatch }, payload) => {
    const { id, masterPassword } = payload;

    if (!id || !masterPassword) return;
    try {
      const resp = await axios.get(
        `/entries/${id}/reveal-password?masterPassword=${masterPassword}`
      );
      return resp.data;
    } catch (e) {
      commit("setError", e.response.data.message);
    }
  },

  editEntryPassword: async ({ commit }, payload) => {
    const { id, newPassword } = payload;
    try {
      await axios.patch(`/entries/${id}/change-password`, {
        password: newPassword,
      });
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
