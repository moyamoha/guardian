<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="indigo darken-1"
        class="white--text"
        v-on="on"
        v-bind="attrs"
        dense
        small
        >{{ $t("btns.change_password") }}</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
        {{ $t("main.change_password_dialog_title") }}
        <v-icon @click="dialog = !dialog" color="brown"
          >mdi-close-circle</v-icon
        >
      </v-card-title>
      <v-card-text>
        <p class="secondary--text mt-1">
          {{ $t("rules.long_password") }}
        </p>
        <ErrorAlert></ErrorAlert>
        <v-form class="my-3" ref="passChangeForm" @submit="handleSubmit">
          <PasswordField
            v-model="currentPassword"
            :label="$t('labels.inputs.current_password')"
          />
          <PasswordField
            v-model="newPassword"
            :label="$t('labels.inputs.new_password')"
          />
          <PasswordField
            v-model="newPasswordAgain"
            :label="$t('labels.inputs.confirm_new_password')"
          />
          <v-btn
            type="button"
            color="primary"
            dense
            small
            outlined
            @click="generateRandomPassword"
            class="generate-pass-btn"
            >{{ $t("labels.nav.generate") }}</v-btn
          >
          <v-btn
            type="submit"
            color="success"
            dense
            small
            outlined
            :loading="processing"
            >{{ $t("btns.save") }}</v-btn
          >
        </v-form>
      </v-card-text>
      <v-card-actions> </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ErrorAlert from "./ErrorAlert.vue";
import PasswordField from "./PasswordField.vue";
import { generatePassword } from "@/utils/generate-password";
import i18n from "@/plugins/i18n";
export default {
  data() {
    return {
      dialog: false,
      currentPassword: "",
      newPassword: "",
      newPasswordAgain: "",
      generatedPassword: "",
      processing: false,
    };
  },
  methods: {
    ...mapActions(["changePassword"]),
    ...mapMutations(["setError"]),
    async handleSubmit(e) {
      e.preventDefault();
      if (this.newPassword !== this.newPasswordAgain) {
        this.setError(i18n.t("errors.passwords_dont_match"));
        return;
      }
      this.processing = true;
      if (this.$refs.passChangeForm.validate()) {
        await this.changePassword({
          currentPassword: this.currentPassword,
          newPassword: this.newPassword,
        });
      }
      if (this.error === "") {
        this.dialog = false;
      }
      this.processing = false;
    },
    generateRandomPassword() {
      const password = generatePassword(this.generateOptions);
      this.newPassword = password;
      this.newPasswordAgain = password;
    },
  },
  computed: {
    ...mapGetters(["error", "generateOptions"]),
  },
  components: {
    ErrorAlert,
    PasswordField,
  },
};
</script>

<style scoped>
.generate-pass-btn {
  margin-right: 10px;
}
</style>
