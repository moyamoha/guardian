<template>
  <v-dialog
    width="500"
    v-model="dialog"
    transition="dialog-bottom-transition"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-icon v-bind="attrs" v-on="on" dense>mdi-delete-outline</v-icon>
    </template>
    <v-card class="dialog-card">
      <v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
        Delete entry
        <v-icon @click="dialog = false" color="brown">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text class="py-2">
        Are your sure you want to delete {{ entry.title }}?
      </v-card-text>
      <v-card-actions>
        <v-btn
          elevation="2"
          small
          dense
          outlined
          @click="handleDelete"
          color="success"
          :disabled="processing"
          :loading="processing"
          >Yes</v-btn
        >
        <v-btn
          elevation="2"
          small
          dense
          outlined
          color="red"
          @click="dialog = false"
          >No</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["entry"],
  data() {
    return {
      dialog: false,
      processing: false,
    };
  },
  methods: {
    ...mapActions(["removeEntry"]),
    async handleDelete() {
      this.processing = true;
      await this.removeEntry(this.entry._id);
      this.processing = false;
    },
  },
};
</script>
