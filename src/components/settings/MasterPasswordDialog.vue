<template>
  <v-dialog
    width="500"
    v-model="dialog"
    transition="dialog-top-transition"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot></slot>
      </div>
    </template>
    <v-card class="dialog-card">
      <v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
        <div>
          {{
            createNew ? "Set up Maste password" : `Change your master password`
          }}
        </div>
        <v-icon @click="handleCancel" color="brown">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text>
        <p>
          Your master password is the key to all your sensitive data, so it's
          crucial to make it strong and secure. This password is the only one
          you’ll need to remember, as it will be used to reveal entry's
          password. Choose a master password that is unique, long, and complex,
          incorporating a mix of letters, numbers, and symbols. Avoid using
          easily guessed information, like birthdays or common words. Your
          master password is never stored directly, and only you will know it.
          Remember, if you forget it, your entry data will be inaccessible, as
          this password is used to securely encrypt and decrypt entries'
          passwords.
        </p>
        <v-form class="my-3" @submit="handleSubmit" ref="maspasForm">
          <ErrorAlert></ErrorAlert>
          <PasswordField
            v-model="item.oldMasterPassword"
            label="Old master password *"
            auto-focus
            v-if="this.userHasMasterPassword"
          ></PasswordField>
          <PasswordField
            v-model="item.masterPassword"
            label="Master password *"
            auto-focus
          ></PasswordField>
          <PasswordField
            v-model="item.repeatMasterPassword"
            label="Repeat Master password *"
            auto-focus
          ></PasswordField>
          <div class="btn-cont">
            <v-btn
              type="submit"
              color="primary"
              outlined
              dense
              small
              :disabled="processing"
              :loading="processing"
              >Save</v-btn
            >
            <v-btn @click="handleCancel" color="warn" outlined dense small
              >Cancel</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import PasswordField from "../_shared/PasswordField.vue";
import ErrorAlert from "../_shared/ErrorAlert.vue";
export default {
  data() {
    return {
      item: {
        oldMasterPassword: "",
        masterPassword: "",
        repeatMasterPassword: "",
      },
      dialog: false,
      processing: false,
    };
  },
  methods: {
    ...mapActions(["setupMasterPassword", "changeMasterPassword"]),
    ...mapMutations(["setError"]),
    async handleSubmit(e) {
      e.preventDefault();
      if (this.item.masterPassword !== this.item.repeatMasterPassword) {
        this.setError("Master passwords should match");
        return;
      }
      if (this.$refs.maspasForm.validate()) {
        this.processing = true;
        if (this.userHasMasterPassword) {
          await this.changeMasterPassword({
            oldMasterPassword: this.item.oldMasterPassword,
            newMasterPassword: this.item.masterPassword,
          });
        } else {
          await this.setupMasterPassword({
            masterPassword: this.item.masterPassword,
          });
        }
        this.processing = false;
        if (this.error === "") this.dialog = false;
      }
    },
    handleCancel() {
      this.item.masterPassword = "";
      this.item.repeatMasterPassword = "";
      this.dialog = false;
    },
  },
  computed: {
    ...mapGetters(["error", "loggedInUser", "userHasMasterPassword"]),
    createNew() {
      return Boolean(!this.userHasMasterPassword);
    },
  },
  components: { PasswordField, ErrorAlert },
};
</script>

<style>
.btn-cont {
  display: flex;
  gap: 10px;
}
</style>
