<template>
	<div class="home">
		<p>All your passwords with their categories</p>
		<span>Add entry</span><EntryDialog></EntryDialog>
		<DataTree></DataTree>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import DataTree from "@/components/DataTree.vue";
import EntryDialog from "@/components/EntryDialog.vue";
// @ is an alias to /src

export default {
	name: "HomeView",
	components: { DataTree, EntryDialog },
	methods: {
		...mapActions(["fetchContent"]),
	},
	mounted() {
		this.fetchContent();
	},
};
</script>
