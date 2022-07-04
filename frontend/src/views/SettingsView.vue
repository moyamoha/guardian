<template>
	<v-col cols="12">
		<h3 class="mb-2">Profile</h3>
		<ErrorAlert></ErrorAlert>
		<p><strong>Email: </strong>{{ loggedInUser.email }}</p>
		<ProfileForm :user="this.loggedInUser"></ProfileForm>
		<v-divider class="my-3"></v-divider>
		<h3 class="mt-3">Account</h3>
		<AccountDeactivation class="account-action-box"></AccountDeactivation>
		<MfaToggler class="account-action-box"></MfaToggler>
	</v-col>
</template>

<script>
import { mapGetters } from "vuex";
import MfaToggler from "../components/MfaToggler.vue";
import AccountDeactivation from "@/components/AccountDeactivation.vue";
import ProfileForm from "@/components/ProfileForm.vue";
import ErrorAlert from "@/components/ErrorAlert.vue";
export default {
	methods: {},
	computed: {
		...mapGetters(["loggedInUser"]),
	},
	components: { MfaToggler, AccountDeactivation, ProfileForm, ErrorAlert },
};
</script>

<style>
.account-action-box {
	padding: 1rem;
	border-radius: 10px;
	margin-top: 1rem;
}
</style>
