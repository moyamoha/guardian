<template>
  <v-dialog
    width="500"
    v-model="dialog"
    transition="dialog-bottom-transition"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot></slot>
      </div>
    </template>
    <v-card class="dialog-card">
      <v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
        Reveal password for entry {{ entry.title }}
        <v-icon @click="dialog = false" color="brown">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text class="pt-3">
        <ErrorAlert></ErrorAlert>
        <p>
          For security reasons, we don't display entries' passwords in the user
          interface. You can request revelation by typing in your master
          password and clicking Reveal
        </p>
        <p>
          The password for
          <strong>{{ entry.title }}</strong> is
          <span>{{ revealedPassword ? revealedPassword : "********" }}</span>
          <v-icon
            v-if="revealedPassword !== ''"
            class="ml-2"
            small
            dense
            @click="copyPassword"
            >mdi-content-copy</v-icon
          >
        </p>
        <v-form class="my-3" @submit="handleSubmit">
          <v-text-field
            label="Master password *"
            dense
            outlined
            v-model="masterPassword"
            autofocus
          ></v-text-field>
          <div class="btn-cont">
            <v-btn
              type="submit"
              color="primary"
              outlined
              dense
              small
              :disabled="processing"
              :loading="processing"
              >Reveal</v-btn
            >
            <v-btn @click="handleCancel" color="warn" outlined dense small
              >Close</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="copied" timeout="1500">
      Password copied to clipboard
    </v-snackbar>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import ErrorAlert from "../_shared/ErrorAlert.vue";
export default {
  props: ["entry"],
  components: { ErrorAlert },
  data() {
    return {
      dialog: false,
      processing: false,
      revealedPassword: "",
      masterPassword: "",
      copied: false,
    };
  },
  methods: {
    ...mapActions(["requestEntryPasswordReveal"]),
    ...mapMutations(["setError"]),
    async handleSubmit(e) {
      e.preventDefault();
      this.processing = true;
      const revealPassObject = await this.requestEntryPasswordReveal({
        id: this.entry._id,
        masterPassword: this.masterPassword,
      });
      this.revealedPassword = revealPassObject?.password ?? "";
      if (this.error === "") {
        this.processing = false;
        this.masterPassword = "";
      } else {
        this.processing = false;
      }
    },
    handleCancel() {
      this.masterPassword = "";
      this.revealedPassword = "";
      this.copied = false;
      this.processing = false;
      this.dialog = false;
      this.setError("");
    },
    async copyPassword() {
      await window.navigator.clipboard.writeText(this.revealedPassword);
      this.copied = true;
      this.revealedPassword = "";
    },
  },
  computed: {
    ...mapGetters(["loggedInUser", "error"]),
  },
};
</script>
