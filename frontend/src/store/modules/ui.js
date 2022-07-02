const state = {
	showEntryModal: false,
	showCategModal: false,
};

const getters = {
	showEntryForm: (state) => state.showEntryModal,
	showCategForm: (state) => state.showCategModal,
};

const actions = {};

const mutations = {
	setShowEntryForm: (state, next) => (state.showEntryModal = next),
	setShowCategoryForm: (state, next) => (state.showCategModal = next),
};

export default {
	state,
	getters,
	actions,
	mutations,
};
