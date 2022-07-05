<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				color="indigo darken-1"
				class="white--text"
				v-on="on"
				v-bind="attrs"
				dense
				small
				>Change password</v-btn
			>
		</template>
		<v-card>
			<v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
				Changing password
				<v-icon @click="dialog = !dialog" color="brown"
					>mdi-close-circle</v-icon
				>
			</v-card-title>
			<v-card-text>
				<p class="secondary--text mt-1">
					Your new password must be at least 10 characters long
				</p>
				<ErrorAlert></ErrorAlert>
				<v-form class="my-3" ref="passChangeForm" @submit="handleSubmit">
					<v-text-field
						outlined
						dense
						type="password"
						label="Current password"
						v-model="currentPassword"
					></v-text-field>
					<v-text-field
						outlined
						dense
						type="password"
						label="New password"
						v-model="newPassword"
					></v-text-field>
					<v-text-field
						outlined
						dense
						type="password"
						label="Repeat new password"
						v-model="newPasswordAgain"
					></v-text-field>
					<v-btn
						type="submit"
						color="success"
						dense
						small
						outlined
						:loading="processing"
						>Save</v-btn
					>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ErrorAlert from "./ErrorAlert.vue";
export default {
	data() {
		return {
			dialog: false,
			currentPassword: "",
			newPassword: "",
			newPasswordAgain: "",
			processing: false,
		};
	},
	methods: {
		...mapActions(["changePassword"]),
		...mapMutations(["setError"]),
		async handleSubmit(e) {
			e.preventDefault();
			this.processing = true;
			if (
				this.$refs.passChangeForm.validate() &&
				this.newPassword === this.newPasswordAgain
			) {
				await this.changePassword({
					currentPassword: this.currentPassword,
					newPassword: this.newPassword,
				});
			} else if (this.newPassword !== this.newPasswordAgain) {
				this.setError("Passwords should match");
			}
			if (this.error === "") {
				this.$refs.passChangeForm.reset();
				this.dialog = false;
			}
			this.processing = false;
		},
		required(v) {
			return (v && v.length > 0) || "This field can not be empty";
		},
	},
	computed: {
		...mapGetters(["error"]),
	},
	components: {
		ErrorAlert,
	},
};
</script>

<style></style>
