<template>
	<div style="width: '100%'">
		<v-btn
			@click="showForm = !showForm"
			color="indigo darken-1"
			dense
			small
			class="mb-2 white--text"
			v-show="!showForm"
			>Change name</v-btn
		>
		<v-form
			class="profile-form px-3 py-7 pr-7"
			@submit="handleSubmit"
			ref="profileForm"
			v-show="showForm"
		>
			<ErrorAlert></ErrorAlert>
			<v-text-field
				label="Firstname"
				dense
				outlined
				v-model="profile.firstname"
				:rules="[required]"
			></v-text-field>
			<v-text-field
				label="Lastname"
				dense
				outlined
				v-model="profile.lastname"
				:rules="[required]"
			></v-text-field>
			<v-btn dense small color="success" type="submit" :loading="processing"
				>Update</v-btn
			>
			<v-icon class="close-icon top-right" dense small @click="handleClose"
				>mdi-close-circle</v-icon
			>
		</v-form>
		<br />
		<PasswordChangeDialog></PasswordChangeDialog>
	</div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import PasswordChangeDialog from "./PasswordChangeDialog.vue";
import ErrorAlert from "./ErrorAlert.vue";
export default {
	props: ["user"],
	data() {
		return {
			profile: {
				firstname: this.user ? this.user.firstname : "",
				lastname: this.user ? this.user.lastname : "",
			},
			showForm: true,
			processing: false,
		};
	},
	methods: {
		...mapActions(["changeName"]),
		...mapMutations(["setNotification"]),
		async handleSubmit(e) {
			e.preventDefault();
			this.processing = true;
			if (this.$refs.profileForm.validate()) {
				await this.changeName({ ...this.profile });
				this.processing = false;
				this.showForm = false;
				this.setNotification(
					`Hello ${this.loggedInUser.firstname} ${this.loggedInUser.lastname} 😊`
				);
				setTimeout(() => {
					this.setNotification("");
				}, 5000);
			}
			this.processing = false;
			if (this.error === "") this.showForm = false;
		},
		handleClose() {
			this.profile = {
				firstname: this.user ? this.user.firstname : "",
				lastname: this.user ? this.user.lastname : "",
			};
			this.showForm = false;
		},
		required: (v) => (v && v.length > 0) || "This field can not be empty",
	},
	computed: {
		...mapGetters(["error", "loggedInUser"]),
	},
	components: { PasswordChangeDialog, ErrorAlert },
};
</script>

<style scoped>
.profile-form {
	width: 40%;
	background-color: rgb(242, 238, 253);
	position: relative;
	padding: 3rem;
}
@media (max-width: 700px) {
	.profile-form {
		width: 60%;
	}
}

.top-right {
	position: absolute;
	top: 6px;
	right: 6px;
}

@media (max-width: 500px) {
	.profile-form {
		width: 80%;
	}
}
</style>
