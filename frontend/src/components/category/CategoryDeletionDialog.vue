<template>
  <v-dialog
    width="500"
    v-model="dialog"
    transition="dialog-bottom-transition"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="error"
        outlined
        dense
        small
        v-bind="attrs"
        v-on="on"
        :disabled="deleting"
        :loading="deleting"
        >delete</v-btn
      >
    </template>
    <v-card class="dialog-card">
      <v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
        Delete category {{ category.name }} ?
        <v-icon @click="dialog = false" color="brown">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text class="py-2">
        Deleting a category will delete all the entries in it. Are you sure?
      </v-card-text>
      <v-card-actions>
        <v-btn
          elevation="2"
          small
          dense
          outlined
          @click="handleDelete"
          color="success"
          :disabled="deleting"
          :loading="deleting"
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
  props: ["category", "done"],
  data() {
    return {
      dialog: false,
      deleting: false,
    };
  },
  methods: {
    ...mapActions(["removeCategory"]),
    async handleDelete() {
      this.deleting = true;
      await this.removeCategory(this.category._id);
      this.deleting = false;
      this.dialog = false;
      // this.$emit("update:done", true);
    },
  },
};
</script>
