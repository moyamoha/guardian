<template>
	<v-alert
		v-show="this.error !== ''"
		color="red lighten-2"
		dense
		dismissible
		type="error"
	>
		<template v-slot:close="{ toggle }">
			<v-icon @click="handleClose(toggle)"
				>mdi-close-circle-outline</v-icon
			> </template
		>{{ this.error }}
	</v-alert>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
	methods: {
		...mapMutations(["setError"]),
		handleClose() {
			// toggle();
			this.setError("");
		},
	},
	computed: {
		...mapGetters(["error"]),
	},
};
</script>
