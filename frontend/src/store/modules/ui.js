const state = {
  notification: "",
  error: "",
  expandedCategories: [],
};

const getters = {
  notification: (state) => state.notification,
  error: (state) => state.error,
  expandedOnes: (state) => state.expandedCategories,
};

const mutations = {
  setNotification: (state, notif) => (state.notification = notif),
  setError: (state, msg) => (state.error = msg),
  setExpandedCategories: (state, ec) => {
    state.expandedCategories = ec;
  },
};

const actions = {};

export default {
  actions,
  getters,
  mutations,
  state,
};
