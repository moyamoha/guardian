const state = {
	notification: "",
};

const getters = {
	notification: (state) => state.notification,
};

const mutations = {
	setNotification: (state, notif) => (state.notification = notif),
};

const actions = {};

export default {
	actions,
	getters,
	mutations,
	state,
};
