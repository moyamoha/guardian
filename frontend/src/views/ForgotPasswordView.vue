<template>
  <v-col xs="7" sm="6" md="5" lg="4">
    <v-form class="forgot-form" ref="forgotForm" @submit="handleSubmit">
      <ErrorAlert></ErrorAlert>
      <p class="mb-3">
        Please type your email address in the field below. We will send a
        temporary password which you can use to login. Make sure to change it
        afterwards
      </p>
      <v-text-field
        label="Your email address"
        v-model="email"
        dense
        outlined
        type="email"
        :rules="[required]"
      ></v-text-field>
      <v-btn color="primary" type="submit" :disabled="processing">{{
        processing ? "Submitting..." : "Submit"
      }}</v-btn>
    </v-form>
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import ErrorAlert from "@/components/ErrorAlert.vue";
export default {
  data() {
    return { email: "", processing: false };
  },
  methods: {
    ...mapActions(["requestTempPassword"]),
    async handleSubmit(e) {
      e.preventDefault();
      this.processing = true;
      if (this.$refs.forgotForm.validate()) {
        await this.requestTempPassword(this.email);
      }
      this.processing = false;
    },
    required(v) {
      return (v && v.length > 0) || "This field is required";
    },
  },
  name: "password-forgotten",
  components: { ErrorAlert },
};
</script>

<style>
.forgot-form {
  width: 100%;
}
</style>
