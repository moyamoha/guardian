import axios from "axios";

const state = {
  content: [],
  entries: [],
  openedCategories: [],
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
  openedCategories: (state) => state.openedCategories,
  filter: (state) => state.filter,
};

const mutations = {
  startLoading: (state) => (state.loading = true),
  setContent: (state, data) => {
    state.content = data;
    state.categories = data.map((item) => {
      return { name: item.name, id: item._id };
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

  editCategory: async ({ commit, dispatch, getters }, { id, name }) => {
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

  editEntry: async ({ commit, dispatch }, { entry, reload }) => {
    const id = entry._id;
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
};

export default {
  actions,
  getters,
  mutations,
  state,
};
