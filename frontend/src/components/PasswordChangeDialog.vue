<template>
	<v-dialog v-model="dialog" width="500">
		<template v-slot:activator="{ on, attrs }">
			<v-btn
				color="rgb(20, 110, 78"
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
				<p>Your new password must be at least 8 characters long</p>
				<v-form class="my-3" ref="passChangeForm" @submit="handleSubmit">
					<v-text-field
						outlined
						dense
						label="Current password"
						v-model="form.currentPassword"
					></v-text-field>
					<v-text-field
						outlined
						dense
						label="New password"
						v-model="form.newPassword"
					></v-text-field>
					<v-text-field
						outlined
						dense
						label="Repeat new password"
						v-model="form.newpasswordAgain"
					></v-text-field>
					<v-btn type="submit" color="success" dense small outlined>Save</v-btn>
				</v-form>
			</v-card-text>
		</v-card>
	</v-dialog>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
export default {
	data() {
		return {
			dialog: false,
			form: {
				currentPassword: "",
				newPassword: "",
				newPasswordAgain: "",
			},
		};
	},
	methods: {
		...mapActions(["changePassword"]),
		...mapMutations(["setError"]),
		handleSubmit(e) {
			e.preventDefault();
			if (
				this.$refs.changePassForm.validate() &&
				form.newPassword === form.newPasswordAgain
			) {
				this.changePassword({ currentPassword, newPassword });
			} else if (form.newPassword !== form.newPasswordAgain) {
				this.setError("Passwords should match");
			}
			this.$refs.passChangeForm.reset();
			this.dialog = false;
		},
	},
};
</script>

<style></style>
