<template>
  <v-col xs="12" sm="9" md="5">
    <p class="text--primary mb-3">Fill the form below to create an account</p>
    <ErrorAlert></ErrorAlert>
    <v-form class="px-0 py-3" ref="form" lazy-validation @submit="handleSubmit">
      <v-text-field
        label="Email *"
        autofocus
        v-model="email"
        dense
        outlined
        :rules="[required]"
      ></v-text-field>
      <section class="two-field-row">
        <v-text-field
          label="First name *"
          v-model="firstname"
          dense
          outlined
          :rules="[required]"
        ></v-text-field>
        <v-text-field
          label="Last name *"
          v-model="lastname"
          dense
          outlined
          :rules="[required]"
        ></v-text-field>
      </section>
      <PasswordField v-model="password1" label="Password *"></PasswordField>
      <PasswordField
        v-model="password2"
        label="Repeat password *"
      ></PasswordField>
      <v-btn color="primary" type="submit" :loading="processing">Submit</v-btn>
    </v-form>
    <p class="text--secondary mt-5">
      Do you already have an account?
      <router-link to="/login">Login</router-link>
    </p>
  </v-col>
</template>

<script>
import { mapActions, mapMutations } from "vuex";
import ErrorAlert from "@/components/_shared/ErrorAlert.vue";
import PasswordField from "@/components/_shared/PasswordField.vue";
export default {
  data: () => {
    return {
      email: "",
      password1: "",
      password2: "",
      firstname: "",
      lastname: "",
      showPass: false,
      processing: false,
    };
  },
  methods: {
    ...mapActions(["signup"]),
    ...mapMutations(["setError"]),
    async handleSubmit(e) {
      e.preventDefault();
      this.processing = true;
      if (this.$refs.form.validate() && this.password1 === this.password2) {
        await this.signup({
          email: this.email,
          firstname: this.firstname,
          lastname: this.lastname,
          password: this.password1,
        });
      } else if (this.password1 !== this.password2) {
        this.setError("Passwords should match");
      }
      this.processing = false;
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
  components: { ErrorAlert, PasswordField },
};
</script>

<style scopde>
.two-field-row {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}
</style>
