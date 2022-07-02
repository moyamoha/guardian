<template>
	<div class="entry-row">
		<section class="content">
			<span>Title: {{ entry.title }}</span>
			<span>Username: {{ entry.username }}</span>
			<span>password: {{ getHiddenPass }}</span>
			<span v-show="entry.url !== undefined"
				>Url: <a :href="entry.url">{{ entry.url }}</a></span
			>
		</section>
		<section class="actions">
			<EntryDialog :entry="entry"></EntryDialog>
			<v-icon dense @click="handleDelete">mdi-delete-outline</v-icon>
		</section>
	</div>
</template>

<script>
import { mapActions } from "vuex";
import EntryDialog from "./EntryDialog.vue";
export default {
	props: ["entry"],
	methods: {
		...mapActions(["removeEntry"]),
		handleDelete() {
			if (
				window.confirm(
					`Do you really want to delete ${this.entry.title}? Action is not reversable!`
				)
			) {
				this.removeEntry(this.entry._id);
			}
		},
	},
	computed: {
		getHiddenPass() {
			return this.entry.password
				.split("")
				.map((c) => "*")
				.join("");
		},
	},
	components: { EntryDialog },
};
</script>

<style>
.entry-row {
	display: flex !important;
	width: 100%;
	justify-content: space-between;
}

.entry-row .content {
	display: flex;
	align-items: center;
	gap: 15px;
}

.entry-row a {
	color: rgb(37, 90, 73);
}

.entry-row .actions {
	display: flex;
	gap: 15px;
}
</style>
