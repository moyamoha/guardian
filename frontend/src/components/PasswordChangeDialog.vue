<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn color="red lighten-3" v-on="on" v-bind="attrs"></v-btn>
		</template>
		<v-card>
			<v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
				Changing password
				<v-icon @click="dialog = !dialog" color="brown"
					>mdi-close-circle</v-icon
				>
			</v-card-title>
		</v-card>
	</v-dialog>
</template>

<script>
export default {
	data() {
		return {
			dialog: false,
		};
	},
};
</script>

<style></style>
