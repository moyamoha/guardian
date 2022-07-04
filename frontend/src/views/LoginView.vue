<template>
	<v-col xs="11" sm="8" md="4">
		<p class="text--primary mb-3">
			Please login to your account using your email and password
		</p>
		<ErrorAlert></ErrorAlert>
		<v-form
			class="login-form px-0 py-3"
			ref="form"
			lazy-validation
			@submit="handleSubmit"
		>
			<v-text-field
				label="Email"
				v-model="email"
				dense
				outlined
				type="email"
				:rules="[required]"
			>
			</v-text-field>
			<v-text-field
				label="Password"
				:type="typeOfPassField"
				v-model="password"
				dense
				outlined
				:rules="[required]"
				:append-icon="eyeIcon"
				@click:append="showPass = !showPass"
			>
			</v-text-field>
			<v-btn color="primary" type="submit">Login</v-btn>
		</v-form>
		<p class="text--secondary mt-5">
			Don't have an account? <router-link to="/signup">Sign up</router-link>
		</p>
	</v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorAlert from "@/components/ErrorAlert.vue";
export default {
	data: () => {
		return {
			email: "",
			password: "",
			showPass: false,
		};
	},
	methods: {
		...mapActions(["login"]),
		handleSubmit(e) {
			e.preventDefault();
			if (this.$refs.form.validate()) {
				this.login({ email: this.email, password: this.password });
			}
		},
		required(v) {
			return v.length > 0 || "This field is required";
		},
	},
	computed: {
		...mapGetters(["error"]),
		eyeIcon() {
			return this.showPass ? "mdi-eye" : "mdi-eye-off";
		},
		typeOfPassField() {
			return this.showPass ? "text" : "password";
		},
	},
	components: { ErrorAlert },
};
</script>

<style></style>
