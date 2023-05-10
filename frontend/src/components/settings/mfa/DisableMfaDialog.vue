<template>
  <v-dialog v-model="showDialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="indigo darken-1"
        class="white--text"
        v-on="on"
        v-bind="attrs"
        dense
        small
        >Disable MFA</v-btn
      >
    </template>
    <v-card>
      <v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
        Disabling multifactor authentication
        <v-icon @click="showDialog = false" color="brown"
          >mdi-close-circle</v-icon
        >
      </v-card-title>
      <v-card-text class="mt-3">
        Disabling mfa will affect the security of your data negatively! are you
        sure?
      </v-card-text>
      <v-card-actions>
        <v-btn
          elevation="2"
          small
          dense
          outlined
          @click="handleOkResponse"
          color="success"
          :disabled="disabling"
          :loading="disabling"
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
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "disable-mfa-dialog",
  data() {
    return {
      showDialog: false,
      disabling: false,
    };
  },
  methods: {
    ...mapActions(["disableMfa"]),
    async handleOkResponse() {
      this.disabling = true;
      await this.disableMfa();
      this.disabling = false;
    },
  },
};
</script>
