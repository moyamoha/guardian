<template>
  <div class="deactivation-cont">
    <h5 class="red--text">Deactivate account</h5>
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
      @click="handleDeactivate"
      >{{ processing ? $t("btns.processing") : $t("btns.deactivate") }}</v-btn
    >
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  data() {
    return { processing: false };
  },
  methods: {
    ...mapActions(["deactivate"]),
    async handleDeactivate() {
      if (window.confirm("Deactivate?")) {
        this.processing = true;
        await this.deactivate();
        this.processing = false;
      }
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
