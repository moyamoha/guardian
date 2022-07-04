<template>
	<v-col xs="12" sm="9" md="5">
		<p class="text--primary mb-3">Please fill in the form</p>
		<ErrorAlert></ErrorAlert>
		<v-form class="px-0 py-3" ref="form" lazy-validation @submit="handleSubmit">
			<v-text-field
				label="Email *"
				v-model="email"
				dense
				outlined
				:rules="[required]"
			></v-text-field>
			<section class="two-field-row">
				<v-text-field
					label="Firstname *"
					v-model="firstname"
					dense
					outlined
					:rules="[required]"
				></v-text-field>
				<v-text-field
					label="Lastname *"
					v-model="lastname"
					dense
					outlined
					:rules="[required]"
				></v-text-field>
			</section>
			<v-text-field
				label="Password *"
				:type="typeOfPassField"
				v-model="password1"
				dense
				outlined
				:rules="[required]"
				:append-icon="eyeIcon"
				@click:append="showPass = !showPass"
			>
			</v-text-field>

			<v-text-field
				label="Repeat password *"
				:type="typeOfPassField"
				v-model="password2"
				dense
				outlined
				:rules="[required]"
				:append-icon="eyeIcon"
				@click:append="showPass = !showPass"
			>
			</v-text-field>
			<v-btn color="primary" type="submit">Signup</v-btn>
		</v-form>
		<p class="text--secondary mt-5">
			Already have an account? <router-link to="/login">Login</router-link>
		</p>
	</v-col>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import ErrorAlert from "@/components/ErrorAlert.vue";
export default {
	data: () => {
		return {
			email: "",
			password1: "",
			password2: "",
			firstname: "",
			lastname: "",
			showPass: false,
		};
	},
	methods: {
		...mapActions(["signup"]),
		...mapMutations(["setError"]),
		handleSubmit(e) {
			e.preventDefault();
			if (this.$refs.form.validate() && this.password1 === this.password2) {
				this.signup({
					email: this.email,
					firstname: this.firstname,
					lastname: this.lastname,
					password: this.password1,
				});
			} else if (this.password1 !== this.password2) {
				this.setError("Passwords should match");
			}
		},
		required(v) {
			return v.length > 0 || "This field is required";
		},
	},
	computed: {
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

<style scopde>
.two-field-row {
	display: flex;
	justify-content: space-between;
	gap: 10px;
}
</style>
