<template>
  <v-col xs="7" sm="6" md="5" lg="4">
    <v-form class="verify-form" ref="veriform" @submit="handleSubmit">
      <p class="mb-3">
        We sent an 8-digit verification code to your email address, please use
        it to complete logging in
      </p>
      <ErrorAlert></ErrorAlert>
      <v-text-field
        class="otp-input"
        label="Verification code"
        v-model="code"
        dense
        outlined
        :rules="[atLeastEight]"
      ></v-text-field>
      <v-btn color="primary" type="submit" :disabled="processing">{{
        processing ? "Verifying..." : "Verify"
      }}</v-btn>
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
        await this.verifyCode(parseInt(this.code));
      }
      this.processing = false;
    },
    atLeastEight(v) {
      return (
        (v.trim().length === 8 && parseInt(v.trim()) !== NaN) || "The code must be 8 digits"
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
