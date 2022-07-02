<template>
	<section>
		<div class="categ-row item category">
			<span>{{ category.name }}</span>
			<div>
				<EntryDialog :entry="null" :categoryId="category._id"></EntryDialog>
				<v-icon @click="expand = !expand" v-if="expand" dense
					>mdi-chevron-down</v-icon
				>
				<v-icon @click="expand = !expand" v-else dense>mdi-chevron-up</v-icon>
			</div>
		</div>
		<ol v-show="expand">
			<li v-for="entry in category.items" :key="entry._id">
				<EntryRow class="item entry" :entry="entry"></EntryRow>
			</li>
		</ol>
	</section>
</template>

<script>
import EntryRow from "./EntryRow.vue";
import EntryDialog from "./EntryDialog.vue";
export default {
	components: { EntryRow, EntryDialog },
	props: ["category"],
	data: () => {
		return {
			expand: true,
		};
	},
};
</script>

<style>
.categ-row {
	display: flex;
	justify-content: space-between !important;
}
</style>
