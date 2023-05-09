<template>
  <v-col xs="7" sm="6" md="5" lg="4">
    <v-form class="verify-form" ref="veriform" @submit="handleSubmit">
      <p class="mb-3">
        Please enter the verification code that is currently displayed in your
        authenticator application
      </p>
      <ErrorAlert></ErrorAlert>
      <v-text-field
        class="otp-input"
        label="Verification Code *"
        v-model="code"
        dense
        outlined
        :rules="[atLeastSix]"
      ></v-text-field>
      <v-btn
        color="primary"
        type="submit"
        :disabled="processing"
        :loading="processing"
        >Verify</v-btn
      >
    </v-form>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorAlert from "@/components/ErrorAlert.vue";

export default {
  data() {
    return { code: "", processing: false };
  },
  methods: {
    ...mapActions(["verifyCode"]),
    async handleSubmit(e) {
      e.preventDefault();
      this.processing = true;
      if (this.$refs.veriform.validate()) {
        await this.verifyCode({
          code: this.code,
          email: localStorage.getItem("email"),
        });
        localStorage.removeItem("email");
      }
      this.processing = false;
    },
    atLeastSix(v) {
      return (
        (v.trim().length === 6 && parseInt(v.trim()) !== NaN) ||
        "Code must be 6 digits long"
      );
    },
  },
  name: "verify-code",
  components: { ErrorAlert },
};
</script>

<style>
.verify-form {
  width: 100%;
}

.otp-input {
  letter-spacing: 2px !important;
}
</style>
