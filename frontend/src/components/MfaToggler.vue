<template>
  <div
    :class="{
      'mfa-on-cont': loggedInUser.mfaEnabled,
      'mfa-off-cont': !loggedInUser.mfaEnabled,
    }"
  >
    <h5 class="green--text">2-factor authentication using email</h5>
    <p>
      {{
        loggedInUser.mfaEnabled
          ? "Congratulations! Your have added extra layer of security to your account."
          : "We highly recommend you to turn it on. It will boost your account's security and keeps it safe from possible vulnerabilities"
      }}
    </p>
    <v-btn
      small
      dense
      rounded
      elevation="4"
      :color="loggedInUser.mfaEnabled ? 'error darken-2' : 'success darken-2'"
      :disabled="processing"
      @click="showDialog = true"
      >{{ getBtnText }}</v-btn
    >
    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-title
          class="text-h6 grey lighten-2 d-flex justify-space-between"
        >
          Disable multi-factor authentication?
          <v-icon @click="showDialog = false" color="brown"
            >mdi-close-circle</v-icon
          >
        </v-card-title>
        <v-card-text class="mt-3">
          Disabling mfa will affect the security of your data negatively! are
          you sure?
        </v-card-text>
        <v-card-actions>
          <button>Yes</button>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return { processing: false, showDialog: false };
  },
  methods: {
    ...mapActions(["toggleMfa"]),
    async handleToggle() {
      if (
        this.loggedInUser.mfaEnabled &&
        window.confirm("Disable multi-factor authentication?")
      ) {
        this.processing = true;
        await this.toggleMfa(false);
        this.processing = false;
      } else if (!this.loggedInUser.mfaEnabled) {
        this.processing = true;
        await this.toggleMfa(true);
        this.processing = false;
      }
    },
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
    getBtnText() {
      if (this.loggedInUser.mfaEnabled) {
        return this.processing ? "Disabling MFA..." : "Disable MFA";
      } else {
        return this.processing ? "Enabling MFA..." : "Enable MFA";
      }
    },
  },
};
</script>

<style>
.mfa-on-cont {
  background-color: rgb(226, 253, 221);
}

.mfa-off-cont {
  background-color: rgb(254, 214, 214);
}
</style>
