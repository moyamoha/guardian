import axios from "axios";

const state = {
	content: [],
	editingCategory: null,
	editingEntry: null,
};

const getters = {
	content: (state) => state.content,
	editingCategory: (state) => state.editingCategory,
	editingEntry: (state) => state.editingEntry,
};

const mutations = {
	setContent: (state, data) => (state.content = data),
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

	addEntry: async ({ commit, dispatch }, { entry, categId }) => {
		try {
			await axios.post("/entries/?categoryId=" + categId, entry);
			dispatch("fetchContent");
		} catch (e) {}
	},

	editEntry: async ({ commit, dispatch }, entry) => {
		const id = entry._id;
		const copyEntry = { ...entry };
		delete copyEntry._id;
		console.log(copyEntry);
		console.log(id);
		try {
			const resp = await axios.put("/entries/" + id, copyEntry);
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
