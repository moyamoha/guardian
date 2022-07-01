<template>
	<div class="entry-row">
		<section class="content">
			<span>Title: {{ entry.title }}</span>
			<span>Username: {{ entry.username }}</span>
			<span>password: {{ getHiddenPass }}</span>
			<span
				>Url: <a :href="entry.url">{{ entry.url }}</a></span
			>
		</section>
		<section class="actions">
			<!-- <v-btn color="accent" elevation="2" outlined dense>Delete</v-btn> -->
			<v-icon aria-hidden="false">mdi-delete-outline</v-icon>
		</section>
	</div>
</template>

<script>
export default {
	props: ["entry"],
	computed: {
		getHiddenPass() {
			return this.entry.password
				.split("")
				.map((c) => "*")
				.join("");
		},
	},
};
</script>

<style>
.entry-row {
	display: flex !important;
	width: 100%;
	justify-content: space-between;
	font-size: 0.9rem;
}

.entry-row .content {
	display: flex;
	align-items: center;
	gap: 15px;
}

.entry-row a {
	color: rgb(37, 90, 73);
}
</style>
