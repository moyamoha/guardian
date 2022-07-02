<template>
	<v-form class="verify-form" ref="veriform" @submit="handleSubmit">
		<p class="mb-3">
			We sent an 8-digit verification code to your email address, please use it
			to complete logging in
		</p>
		<v-text-field
			class="otp-input"
			label="Verification code"
			v-model="code"
			dense
			outlined
			:rules="[atLeastEight]"
		></v-text-field>
		<v-btn color="primary" type="submit">Verify</v-btn>
	</v-form>
</template>

<script>
import { mapActions } from "vuex";
export default {
	data() {
		return { code: "" };
	},
	methods: {
		...mapActions(["verifyCode"]),
		handleSubmit(e) {
			e.preventDefault();
			if (this.$refs.veriform.validate()) {
				this.verifyCode(parseInt(this.code));
			}
		},
		atLeastEight(v) {
			return (
				(v.length === 8 && parseInt(v) !== NaN) || "The code must be 8 digits"
			);
		},
	},
	name: "verify-code",
};
</script>

<style>
.verify-form {
	width: 30%;
}

.otp-input {
	letter-spacing: 2px !important;
}
</style>
