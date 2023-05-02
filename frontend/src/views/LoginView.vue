<template>
  <v-col xs="11" sm="8" md="4">
    <p class="text--primary mb-3">
      {{ $t("main.please_login") }}
    </p>
    <ErrorAlert></ErrorAlert>
    <v-form
      class="login-form px-0 py-3"
      ref="form"
      lazy-validation
      @submit="handleSubmit"
    >
      <v-text-field
        :label="$t('labels.inputs.email*')"
        v-model="email"
        dense
        outlined
        type="email"
        :rules="[required]"
      >
      </v-text-field>
      <PasswordField v-model="password"></PasswordField>
      <v-btn color="primary" type="submit" :loading="this.loggingIn">{{
        $t("labels.nav.login")
      }}</v-btn>
      <span class="text--secondary ml-3"
        ><router-link to="/password-forgotten">{{
          $t("main.i_forgot")
        }}</router-link></span
      >
    </v-form>
    <p class="text--secondary mt-5">
      {{ $t("main.dont_have_account?") }}
      <router-link to="/signup">{{ $t("labels.nav.signup") }}</router-link>
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
      try {
        if (this.$refs.form.validate()) {
          await this.login({ email: this.email, password: this.password });
        }
      } catch (error) {
        console.log(error);
      } finally {
        this.loggingIn = false;
      }
    },
    required(v) {
      const errorMsg = this.$t("rules.required_field");
      return v.length > 0 || errorMsg;
    },
  },
  computed: {
    ...mapGetters(["error"]),
  },
  components: { ErrorAlert, PasswordField },
};
</script>

<style></style>
