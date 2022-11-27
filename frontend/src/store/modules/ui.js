const state = {
  notification: "",
  error: "",
};

const getters = {
  notification: (state) => state.notification,
  error: (state) => state.error,
};

const mutations = {
  setNotification: (state, notif) => (state.notification = notif),
  setError: (state, msg) => (state.error = msg),
};

const actions = {};

export default {
  actions,
  getters,
  mutations,
  state,
};
