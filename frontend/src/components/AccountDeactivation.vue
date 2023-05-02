<template>
  <div class="deactivation-cont">
    <h5 class="red--text">
      {{ $t("labels.account_deactivation_card_title") }}
    </h5>
    <p>
      {{ $t("main.deactivate_warning") }}
    </p>
    <v-btn
      small
      dense
      rounded
      color="error darken-2"
      elevation="4"
      :diabled="processing"
      @click="showDialog = true"
      >{{ processing ? $t("btns.deactivating") : $t("btns.deactivate") }}</v-btn
    >
    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-title
          class="text-h6 grey lighten-2 d-flex justify-space-between"
        >
          {{ $t("main.account_deactivation_dialog_title") }}
          <v-icon @click="showDialog = false" color="brown"
            >mdi-close-circle</v-icon
          >
        </v-card-title>
        <v-card-text class="mt-3">
          {{ $t("main.account_deactivation_dialog_message") }}
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
