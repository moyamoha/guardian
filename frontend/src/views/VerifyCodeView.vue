<template>
  <v-col xs="7" sm="6" md="5" lg="4">
    <v-form class="verify-form" ref="veriform" @submit="handleSubmit">
      <p class="mb-3">
        {{ $t("main.we_sent_verification_code") }}
      </p>
      <ErrorAlert></ErrorAlert>
      <v-text-field
        class="otp-input"
        :label="$t('labels.inputs.verification_code')"
        v-model="code"
        dense
        outlined
        :rules="[atLeastEight]"
      ></v-text-field>
      <v-btn color="primary" type="submit" :disabled="processing">{{
        processing ? $t("btns.verifying") : $t("btns.verify")
      }}</v-btn>
    </v-form>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorAlert from "@/components/ErrorAlert.vue";
import i18n from "@/plugins/i18n";
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
        (v.trim().length === 8 && parseInt(v.trim()) !== NaN) ||
        i18n.t("rules.code_should_be_8_digits")
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
