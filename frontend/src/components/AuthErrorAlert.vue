<template>
	<v-alert
		v-show="this.authError !== ''"
		color="red lighten-2"
		dense
		dismissible
		type="error"
	>
		<template v-slot:close="{ toggle }">
			<v-icon @click="handleClose(toggle)"
				>mdi-close-circle-outline</v-icon
			> </template
		>{{ this.authError }}
	</v-alert>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
export default {
	methods: {
		...mapMutations(["setAuthError"]),
		handleClose() {
			// toggle();
			this.setAuthError("");
		},
	},
	computed: {
		...mapGetters(["authError"]),
	},
};
</script>
