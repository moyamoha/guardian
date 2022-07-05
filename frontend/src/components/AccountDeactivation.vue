<template>
	<div class="deactivation-cont">
		<h5 class="red--text">Deactivate account</h5>
		<p>
			We will delete any deactivated account after one month from start of
			deactivation. Once deleted it can't be recoverd, but you can reactivate
			your account in case you change your mind before it gets deleted
			permanently
		</p>
		<v-btn
			small
			dense
			rounded
			color="error"
			elevation="4"
			:diabled="processing"
			@click="handleDeactivate"
			>{{ processing ? "Deactivating..." : "Deactivate" }}</v-btn
		>
	</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
	data() {
		return { processing: false };
	},
	methods: {
		...mapActions(["deactivate"]),
		async handleDeactivate() {
			this.processing = true;
			if (window.confirm("Deactivate?")) {
				await this.deactivate();
			}
			this.processing = false;
		},
	},
};
</script>

<style scoped>
.deactivation-cont {
	background-color: rgb(254, 214, 214);
	margin-bottom: 2rem;
}
</style>
