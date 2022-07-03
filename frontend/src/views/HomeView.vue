<template>
	<div class="home">
		<p v-if="this.isLoading">Loading ...</p>
		<p v-else-if="this.content.length > 0">
			All your passwords with their categories
			<br />
			<CategoryDialog
				:category="null"
				activatorText="Create category"
			></CategoryDialog>
		</p>
		<p v-else>
			You have not created anything yet.
			<CategoryDialog
				:category="null"
				activatorText="Create category"
			></CategoryDialog>
		</p>
		<DataTree></DataTree>
		<CategoryDialog></CategoryDialog>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DataTree from "@/components/DataTree.vue";
import EntryDialog from "@/components/EntryDialog.vue";
import CategoryDialog from "@/components/CategoryDialog.vue";
import router from "@/router";
// @ is an alias to /src

export default {
	name: "HomeView",
	components: { DataTree, EntryDialog, CategoryDialog },
	methods: {
		...mapActions(["fetchContent"]),
	},
	mounted() {
		if (this.loggedInUser) this.fetchContent();
		else router.replace("/");
	},
	computed: {
		...mapGetters(["content", "isLoading", "loggedInUser"]),
	},
};
</script>

<style>
.home {
	width: 60%;
}
@media (max-width: 700px) {
	.home {
		width: 90%;
	}
}

.action-link {
	cursor: pointer;
	color: rgb(127, 17, 129);
	font-style: italic;
}
.action-link:hover {
	text-decoration: underline;
}
</style>
