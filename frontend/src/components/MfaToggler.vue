<template>
	<div
		:class="{
			'mfa-on-cont': loggedInUser.mfaEnabled,
			'mfa-off-cont': !loggedInUser.mfaEnabled,
		}"
	>
		<h5 class="green--text">2-factor authentication using email</h5>
		<p>
			{{
				loggedInUser.mfaEnabled
					? "Congratulations! Your have added extra layer of security to your account."
					: "We highly recommend you to turn it on. It will boost your account's security and keeps it safe from possible vulnerabilities"
			}}
		</p>
		<v-btn
			small
			dense
			rounded
			elevation="4"
			:color="loggedInUser.mfaEnabled ? 'error' : 'success'"
			@click="handleToggle"
			>{{ loggedInUser.mfaEnabled ? "Disable MFA" : "Enable MFA" }}</v-btn
		>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	methods: {
		...mapActions(["toggleMfa"]),
		handleToggle() {
			if (
				this.loggedInUser.mfaEnabled &&
				window.confirm("Disable multi-factor authentication?")
			) {
				this.toggleMfa(false);
			} else if (!this.loggedInUser.mfaEnabled) {
				this.toggleMfa(true);
			} else return;
		},
	},
	computed: {
		...mapGetters(["loggedInUser"]),
	},
};
</script>

<style>
.mfa-on-cont {
	background-color: rgb(226, 253, 221);
}

.mfa-off-cont {
	background-color: rgb(254, 214, 214);
}
</style>
