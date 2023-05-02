<template>
  <div
    :class="{
      'mfa-on-cont': loggedInUser.mfaEnabled,
      'mfa-off-cont': !loggedInUser.mfaEnabled,
    }"
  >
    <h5 class="green--text">{{ $t("labels.mfa_card_title") }}</h5>
    <p>
      {{
        loggedInUser.mfaEnabled
          ? $t("main.2fa_congratulations")
          : $t("main.recommend_2fa")
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
      :loading="processing"
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
            :loading="processing"
            >{{ $t("main.yes") }}</v-btn
          >
          <v-btn
            elevation="2"
            small
            dense
            outlined
            color="red"
            @click="showDialog = false"
            >{{ $t("main.no") }}</v-btn
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
        return this.$t("btns.disable_mfa");
      } else {
        return this.$t("btns.enable_mfa");
      }
    },
    dialogMessageText() {
      if (this.loggedInUser.mfaEnabled) {
        return this.$t("main.remove_mfa_question");
      } else {
        return this.$t("main.mfa_enable_confirmation");
      }
    },
    dialogTitle() {
      return this.$t("main.mfa_dialog_title");
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
