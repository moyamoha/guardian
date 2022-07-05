<template>
	<v-col cols="12" class="mb-5">
		<h3 class="mb-2">Profile</h3>
		<p>
			<strong>Email: </strong
			><span class="grey--text text--darken-1">{{ loggedInUser.email }}</span>
		</p>
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
export default {
	methods: {},
	computed: {
		...mapGetters(["loggedInUser"]),
	},
	components: { MfaToggler, AccountDeactivation, ProfileForm },
};
</script>

<style>
.account-action-box {
	padding: 1rem;
	border-radius: 10px;
	margin-top: 1rem;
}
</style>
