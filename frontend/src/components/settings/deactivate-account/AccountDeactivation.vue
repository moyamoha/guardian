<template>
  <div class="deactivation-cont">
    <h5 class="red--text">Account deactivation</h5>
    <p>
      We will delete all deactivated accounts after one month from start of
      deactivation. Once deleted it can't be recovered, but you can always
      reactivate your account by logging in, in case you change your mind before
      it gets deleted permanently
    </p>
    <v-btn
      small
      dense
      rounded
      color="error darken-2"
      elevation="4"
      :diabled="processing"
      @click="showDialog = true"
      :loading="processing"
      >Deactivate</v-btn
    >
    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-title
          class="text-h6 grey lighten-2 d-flex justify-space-between"
        >
          Deactivate account?
          <v-icon @click="showDialog = false" color="brown"
            >mdi-close-circle</v-icon
          >
        </v-card-title>
        <v-card-text class="mt-3">
          Are you sure you want to deactivate your account? You can reactivate
          it by logging in again within one month from now, otherwise it will be
          deleted permanently
        </v-card-text>
        <v-card-actions>
          <v-btn
            elevation="2"
            small
            dense
            outlined
            @click="handleDeactivate"
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
            @click="showDialog = false"
            >No</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return { processing: false, showDialog: false };
  },
  methods: {
    ...mapActions(["deactivate"]),
    async handleDeactivate() {
      this.processing = true;
      await this.deactivate();
      this.processing = false;
    },
  },
};
</script>

<style scoped>
.deactivation-cont {
  background-color: rgb(254, 214, 214);
  margin-bottom: 2rem;
}
</style>
