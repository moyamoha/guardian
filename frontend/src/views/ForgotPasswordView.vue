<template>
  <v-col xs="7" sm="6" md="5" lg="4">
    <v-form class="forgot-form" ref="forgotForm" @submit="handleSubmit">
      <ErrorAlert></ErrorAlert>
      <p class="mb-3">
        {{ $t("main.forgot_password_guide_text") }}
      </p>
      <v-text-field
        :label="getEmailLabel"
        v-model="email"
        dense
        outlined
        type="email"
        :rules="[required]"
      ></v-text-field>
      <v-btn
        color="primary"
        type="submit"
        :disabled="processing"
        :loading="processing"
        >{{ $t("btns.submit") }}</v-btn
      >
    </v-form>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorAlert from "@/components/ErrorAlert.vue";
import i18n from "@/plugins/i18n";
export default {
  data() {
    return { email: "", processing: false };
  },
  methods: {
    ...mapActions(["requestTempPassword"]),
    async handleSubmit(e) {
      e.preventDefault();
      this.processing = true;
      if (this.$refs.forgotForm.validate()) {
        await this.requestTempPassword(this.email);
      }
      this.processing = false;
    },
    required(v) {
      return (v && v.length > 0) || i18n.t("rules.required_field");
    },
  },
  computed: {
    getEmailLabel() {
      return this.$t("labels.inputs.your_email");
    },
  },
  name: "password-forgotten",
  components: { ErrorAlert },
};
</script>

<style>
.forgot-form {
  width: 100%;
}
</style>
