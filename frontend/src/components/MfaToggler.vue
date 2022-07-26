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
			:color="loggedInUser.mfaEnabled ? 'error darken-2' : 'success darken-2'"
			:disabled="processing"
			@click="handleToggle"
			>{{ getBtnText }}</v-btn
		>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
	data() {
		return { processing: false };
	},
	methods: {
		...mapActions(["toggleMfa"]),
		async handleToggle() {
			this.processing = true;
			if (
				this.loggedInUser.mfaEnabled &&
				window.confirm("Disable multi-factor authentication?")
			) {
				this.processing = true;
				await this.toggleMfa(false);
				this.processing = false;
			} else if (!this.loggedInUser.mfaEnabled) {
				this.processing = true;
				await this.toggleMfa(true);
				this.processing = false;
			}
		},
	},
	computed: {
		...mapGetters(["loggedInUser"]),
		getBtnText() {
			if (this.loggedInUser.mfaEnabled) {
				return this.processing ? "Disabling MFA..." : "Disable MFA";
			} else {
				return this.processing ? "Enabling MFA..." : "Enable MFA";
			}
		},
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
