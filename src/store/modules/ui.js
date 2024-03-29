export const autoGenerateDefaultOptions = {
  length: 12,
  includesDigits: true,
  includesUpperCase: true,
  includesSpecialChars: false,
};

const state = {
  notification: "",
  error: "",
  expandedCategories: [],
  autoGenerateOptions: autoGenerateDefaultOptions,
  contentFetchedForTheFirstTime: false,
  showMoreFilters: false,
};

const getters = {
  notification: (state) => state.notification,
  error: (state) => state.error,
  expandedOnes: (state) => state.expandedCategories,
  generateOptions: (state) => state.autoGenerateOptions,
  contentAlreadyFetched: (state) => state.contentFetchedForTheFirstTime,
  showMoreFilters: (state) => state.showMoreFilters,
};

const mutations = {
  setNotification: (state, notif) => (state.notification = notif),
  setError: (state, msg) => (state.error = msg),
  setExpandedCategories: (state, ec) => {
    state.expandedCategories = ec;
  },
  setAutoGenerateOptions: (state, options) => {
    state.autoGenerateOptions = { ...state.autoGenerateOptions, ...options };
  },
  setContentAlreadyFetched: (state, fetched) => {
    state.contentFetchedForTheFirstTime = fetched;
  },
  setShowMoreFilters: (state, showMore) => {
    state.showMoreFilters = showMore;
  },
};

const actions = {};

export default {
  actions,
  getters,
  mutations,
  state,
};
