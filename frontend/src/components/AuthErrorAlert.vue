<template>
	<v-alert
		v-show="this.authError !== ''"
		color="red lighten-2"
		dense
		dismissible
		type="error"
		>{{ authError }}
	</v-alert>
</template>

<script>
import { mapGetters } from "vuex";
export default {
	computed: {
		...mapGetters(["authError"]),
	},
};
</script>
