<template>
  <v-col cols="12" class="mb-5">
    <h3 class="mb-2">{{ $t("labels.profile", { capitalize: true }) }}</h3>
    <p>
      <strong>{{ $t("labels.email") }}: </strong
      ><span class="grey--text text--darken-1">{{ loggedInUser.email }}</span>
    </p>
    <ChangeNameDialog :user="loggedInUser"></ChangeNameDialog>
    <br />
    <ChangePassDialog></ChangePassDialog>
    <v-divider class="my-3"></v-divider>
    <h3 class="mt-3">{{ $t("labels.account") }}</h3>
    <AccountDeactivation class="account-action-box"></AccountDeactivation>
    <MfaToggler class="account-action-box"></MfaToggler>
  </v-col>
</template>

<script>
import { mapGetters } from "vuex";
import MfaToggler from "../components/MfaToggler.vue";
import AccountDeactivation from "@/components/AccountDeactivation.vue";
import ChangeNameDialog from "@/components/ChangeNameDialog.vue";
import ChangePassDialog from "../components/ChangePassDialog.vue";
export default {
  methods: {},
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  components: {
    MfaToggler,
    AccountDeactivation,
    ChangeNameDialog,
    ChangePassDialog,
  },
};
</script>

<style>
.account-action-box {
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
}
</style>
