import axios from "axios";

const state = {
	content: [],
	loading: false,
};

const getters = {
	content: (state) => state.content,
	isLoading: (state) => state.loading,
};

const mutations = {
	startLoading: (state) => (state.loading = true),
	setContent: (state, data) => {
		state.content = data;
		state.loading = false;
	},
	addCateg: (state, category) => {
		state.content.push(category);
	},
	removeCateg: (state, categId) => {
		const categIndex = state.content.findIndex((c) => c._id === categId);
		state.content.splice(categIndex, 1);
	},
	setEditingCategory: (state, category) => (state.editingCategory = category),
	setEditingEntry: (state, entry) => (state.editingEntry = entry),
};

const actions = {
	fetchContent: async ({ commit }) => {
		commit("startLoading");
		try {
			const categories = (await axios.get("/categories/")).data;
			commit("setContent", categories);
		} catch (e) {}
	},

	removeCategory: async ({ commit }, id) => {
		try {
			await axios.delete("/categories/" + id);
			commit("removeCateg", id);
		} catch (e) {}
	},

	addCategory: async ({ commit }, category) => {
		try {
			const response = await axios.post("/categories/", category);
			const createdCateg = response.data;
			commit("addCateg", createdCateg);
		} catch (e) {}
	},

	editCategory: async ({ commit, dispatch }, { id, name }) => {
		try {
			await axios.put("/categories/" + id, { name: name });
			dispatch("fetchContent");
		} catch (e) {}
	},

	addEntry: async ({ commit, dispatch }, { entry, categId }) => {
		try {
			await axios.post("/entries/?categoryId=" + categId, entry);
			dispatch("fetchContent");
		} catch (e) {}
	},

	editEntry: async ({ commit, dispatch }, entry) => {
		const id = entry._id;
		try {
			await axios.put("/entries/" + id, entry);
			dispatch("fetchContent");
		} catch (e) {}
	},

	removeEntry: async ({ commit, dispatch }, id) => {
		try {
			await axios.delete("/entries/" + id);
			dispatch("fetchContent");
		} catch (e) {}
	},
};

export default {
	actions,
	getters,
	mutations,
	state,
};
