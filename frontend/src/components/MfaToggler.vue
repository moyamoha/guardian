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
          {{ dialogTitle }}
          <v-icon @click="showDialog = false" color="brown"
            >mdi-close-circle</v-icon
          >
        </v-card-title>
        <v-card-text class="mt-3">
          {{ dialogMessageText }}
        </v-card-text>
        <v-card-actions>
          <v-btn
            elevation="2"
            small
            dense
            outlined
            @click="handleOkResponse"
            color="success"
            :disabled="processing"
            >Yes</v-btn
          >
          <v-btn
            elevation="2"
            small
            dense
            outlined
            color="red"
            @click="showDialog = false"
            >No</v-btn
          >
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
    async handleOkResponse() {
      if (this.loggedInUser.mfaEnabled) {
        this.processing = true;
        await this.toggleMfa(false);
        this.processing = false;
      } else {
        this.processing = true;
        await this.toggleMfa(true);
        this.processing = false;
      }
      this.showDialog = false;
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
    dialogMessageText() {
      if (this.loggedInUser.mfaEnabled) {
        return "Disabling mfa will affect the security of your data negatively! are you sure?";
      } else {
        return "Good choice, You are about to add extra layer of security to your data ✅, Proceed?";
      }
    },
    dialogTitle() {
      if (this.loggedInUser.mfaEnabled) {
        return "Disable multi-factor authentication?";
      } else {
        return "Enable multi-factor authentication?";
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
