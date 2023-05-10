<template>
  <div
    :class="{
      'mfa-on-cont': loggedInUser.mfaEnabled,
      'mfa-off-cont': !loggedInUser.mfaEnabled,
    }"
  >
    <h5 class="green--text">2-Factor authtentication</h5>
    <p>
      {{
        loggedInUser.mfaEnabled
          ? "Congratulations! Your have added extra layer of security to your account."
          : "We highly recommend you to turn it on. It will boost your account's security and keeps it safe from possible vulnerabilities"
      }}
    </p>
    <DisableMfaDialog v-if="mfaIsEnabled"></DisableMfaDialog>
    <MfaEnablerDialog v-else></MfaEnablerDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import DisableMfaDialog from "./DisableMfaDialog.vue";
import MfaEnablerDialog from "./MfaEnablerDialog.vue";
export default {
  data() {
    return { disabling: false, showDialog: false };
  },
  methods: {
    ...mapActions(["disableMfa"]),
    async handleOkResponse() {
      if (this.loggedInUser.mfaEnabled) {
        this.disabling = true;
        await this.disableMfa();
        this.disabling = false;
      } else {
        this.disabling = true;
        await this.toggleMfa(true);
        this.disabling = false;
      }
      this.showDialog = false;
    },
    handleBtnClick() {},
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
    mfaIsEnabled() {
      return this.loggedInUser.mfaEnabled;
    },
  },
  components: { DisableMfaDialog, MfaEnablerDialog },
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
