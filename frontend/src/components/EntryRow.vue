<template>
	<div class="entry-row">
		<section class="content">
			<strong class="font-weight-black">{{ entry.title }}</strong>
			<span><i>Username:</i> {{ entry.username }}</span>
			<span
				><i>Password:</i> {{ reveal ? entry.password : getHiddenPass }}
				<i class="reveal-pass" @click="reveal = !reveal">{{
					reveal ? "hide" : "reveal"
				}}</i></span
			>
			<span v-show="entry.url !== undefined"
				><i>Url:</i> <a :href="entry.url">{{ entry.url }}</a></span
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
	data: () => {
		return {
			reveal: false,
		};
	},
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
	position: relative;
}

.entry-row .content {
	display: flex;
	flex-direction: column;
	gap: 15px;
}

.entry-row a {
	color: rgb(37, 90, 73);
}

.entry-row .actions {
	display: flex;
	position: absolute;
	top: 8px;
	right: 8px;
	gap: 8px;
}

.reveal-pass {
	font-size: 0.85rem;
	cursor: pointer;
	color: rgb(38, 38, 175);
	margin-left: 10px;
}

.reveal-pass:hover {
	text-decoration: underline;
}
</style>
