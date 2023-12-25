<template>
  <v-col xs="7" sm="6" md="5" lg="4">
    <v-form class="verify-form" ref="veriform">
      <p class="mb-3">
        Please enter the verification code that is currently displayed in your
        authenticator application
      </p>
      <ErrorAlert></ErrorAlert>
      <v-otp-input
        :rules="[atMostSixDigits]"
        v-model="code"
        :loading="processing"
      ></v-otp-input>
    </v-form>
  </v-col>
</template>

<script>
import { mapActions } from "vuex";
import ErrorAlert from "@/components/_shared/ErrorAlert.vue";

export default {
  name: "verify-code",
  data() {
    return { code: "", processing: false };
  },
  methods: {
    ...mapActions(["verifyCode"]),
    atMostSixDigits(v) {
      if (!v) return true;
      const trimmed = v.trim();
      const isAllDigits = /^\d*$/.test(trimmed);
      if (trimmed.length <= 6 && isAllDigits) {
        return true;
      }
      if (!isAllDigits) return "Only digits are allowed";
    },

    async submitCode(code) {
      this.processing = true;
      if (this.$refs.veriform.validate()) {
        try {
          const resp = await this.verifyCode({
            code: code,
            email: localStorage.getItem("email"),
          });
          if (resp) {
            localStorage.removeItem("email");
          }
        } catch {
        } finally {
          this.code = "";
        }
      }
      this.processing = false;
    },
  },
  watch: {
    code: async function (newCode, _) {
      if (newCode.length === 6) {
        await this.submitCode(newCode);
      }
    },
  },
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
