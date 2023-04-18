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
      <PasswordField v-model="password"></PasswordField>
      <v-btn color="primary" type="submit" :loading="this.loggingIn"
        >Login</v-btn
      >
      <span class="text--secondary ml-3"
        ><router-link to="/password-forgotten"
          >I forgot my password</router-link
        ></span
      >
    </v-form>
    <p class="text--secondary mt-5">
      Don't have an account? <router-link to="/signup">Sign up</router-link>
    </p>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorAlert from "@/components/ErrorAlert.vue";
import PasswordField from "@/components/PasswordField.vue";
export default {
  data: () => {
    return {
      email: "",
      password: "",
      loggingIn: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    async handleSubmit(e) {
      e.preventDefault();
      this.loggingIn = true;
      if (this.$refs.form.validate()) {
        await this.login({ email: this.email, password: this.password });
      }
      this.loggingIn = false;
    },
    required(v) {
      return v.length > 0 || "This field is required";
    },
  },
  computed: {
    ...mapGetters(["error"]),
  },
  components: { ErrorAlert, PasswordField },
};
</script>

<style></style>
