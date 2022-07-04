<template>
	<v-col cols="12">
		<h3 class="mb-2">Profile</h3>
		<v-form class="profile-form">
			<v-text-field label="Firstname" dense outlined></v-text-field>
			<v-text-field label="Lastname" dense outlined></v-text-field>
			<v-btn dense small color="success">Update profile</v-btn>
		</v-form>
		<v-divider class="my-3"></v-divider>
		<h3 class="mt-3">Account</h3>
		<AccountDeactivation class="account-action-box"></AccountDeactivation>
		<MfaToggler class="account-action-box"></MfaToggler>
	</v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MfaToggler from "../components/MfaToggler.vue";
import AccountDeactivation from "@/components/AccountDeactivation.vue";
export default {
	methods: {},
	computed: {
		...mapGetters(["loggedInUser"]),
	},
	components: { MfaToggler, AccountDeactivation },
};
</script>

<style>
.profile-form {
	width: 30%;
}

.account-action-box {
	padding: 1rem;
	border-radius: 10px;
	margin-top: 1rem;
}

@media (max-width: 700px) {
	.profile-form {
		width: 50%;
	}
}

@media (max-width: 500px) {
	.profile-form {
		width: 70%;
	}
}
</style>
