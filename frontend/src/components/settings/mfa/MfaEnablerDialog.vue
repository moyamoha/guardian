<template>
  <v-dialog v-model="dialog" width="700" height="700" persistent>
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="indigo darken-1"
        class="white--text mb-2"
        v-on="on"
        v-bind="attrs"
        dense
        small
        :disabled="enabling"
        :loading="enabling"
        >Enable mfa</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
        Enabling Multifactor-authentication
        <v-icon @click="dialog = false" color="brown">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text class="mt-3">
        <ErrorAlert></ErrorAlert>
        <section v-if="step === 0" class="mfa-guides">
          <p>
            Please scan the QR-code below in your authenticator application of
            choice (for example Microsoft Authenticator)
          </p>
          <canvas id="qrcode"></canvas>
          <v-btn
            @click="step = 1"
            color="indigo"
            class="white--text my-2"
            small
            dense
            >Done</v-btn
          >
        </section>
        <section v-else-if="step === 1">
          <p>
            Please enter the code that is currently displayed in your
            authenticator application
          </p>
          <v-text-field
            v-model="code"
            label="Code *"
            outlined
            dense
            small
          ></v-text-field>
          <v-btn
            @click="verify"
            color="indigo"
            class="white--text"
            small
            dense
            :disabled="enabling"
            :loading="enabling"
            >Finish setting up mfa</v-btn
          >
          <v-btn
            @click="step = 0"
            color="indigo"
            class="white--text ml-2"
            small
            dense
            >Back to qrcode</v-btn
          >
        </section>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "axios";
import ErrorAlert from "@/components/_shared/ErrorAlert.vue";
import QRCode from "qrcode";
import { mapActions, mapMutations } from "vuex";

export default {
  name: "mfa-enable-dialog",
  data() {
    return {
      dialog: false,
      step: 0,
      code: "",
      enabling: false,
    };
  },
  methods: {
    ...mapMutations(["setError", "setMfaStatus"]),
    ...mapActions(["enableMfa"]),
    async verify() {
      this.enabling = true;
      try {
        await this.enableMfa(this.code);
        this.code = "";
        this.step = 2;
        this.setMfaStatus(true);
      } catch (e) {
        this.step = 1;
      } finally {
        this.enabling = false;
      }
    },
  },
  watch: {
    async dialog(val) {
      if (val) {
        this.step = 0;
        const resp = await axios.get("/users/mfa-otpauthurl");
        const that = this;
        QRCode.toCanvas(
          document.getElementById("qrcode"),
          resp.data,
          function (error) {
            if (error) that.setError(error);
          }
        );
      }
    },
  },
  components: { ErrorAlert },
};
</script>

<style>
.mfa-guides {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
