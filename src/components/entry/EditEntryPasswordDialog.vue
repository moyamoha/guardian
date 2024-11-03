<template>
  <v-dialog
    width="500"
    v-model="dialog"
    transition="dialog-top-transition"
    persistent
  >
    <template v-slot:activator="{ on, attrs }">
      <div v-bind="attrs" v-on="on">
        <slot></slot>
      </div>
    </template>
    <v-card class="dialog-card">
      <v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
        <div>
          Edit password for <strong>{{ entry.title }}</strong>
        </div>
        <v-icon @click="handleCancel" color="brown">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text>
        <v-form class="my-3" @submit="handleSubmit" ref="entryPassForm">
          <ErrorAlert></ErrorAlert>
          <PasswordField
            v-model="password"
            able-to-generate
            label="New password *"
          >
          </PasswordField>
          <div class="btn-cont">
            <v-btn
              type="submit"
              color="primary"
              outlined
              dense
              small
              :disabled="processing"
              :loading="processing"
              >Save</v-btn
            >
            <v-btn @click="handleCancel" color="warn" outlined dense small
              >Cancel</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import PasswordField from "../_shared/PasswordField.vue";
import ErrorAlert from "../_shared/ErrorAlert.vue";
export default {
  props: ["entry"],
  data() {
    return {
      dialog: false,
      processing: false,
      password: "",
    };
  },
  methods: {
    ...mapActions(["editEntryPassword"]),
    async handleSubmit(e) {
      e.preventDefault();
      if (this.$refs.entryPassForm.validate()) {
        this.processing = true;
        await this.editEntryPassword({
          id: this.entry._id,
          newPassword: this.password,
        });
        this.processing = false;
        if (this.error === "") this.dialog = false;
      }
    },
    handleCancel() {
      this.password = "";
      this.dialog = false;
    },
    required(v) {
      return (v && v.length > 0) || "This field cannot be empty";
    },
  },
  computed: {
    ...mapGetters(["error", "loggedInUser"]),
  },
  components: { ErrorAlert, PasswordField },
};
</script>

<style>
.btn-cont {
  display: flex;
  gap: 10px;
}
</style>
