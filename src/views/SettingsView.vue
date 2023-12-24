<template>
  <v-col cols="12" class="mb-5">
    <h3 class="mb-2">Profile</h3>
    <p>
      <strong>Email: </strong
      ><span class="grey--text text--darken-1">{{ loggedInUser.email }}</span>
    </p>
    <ChangeNameDialog :user="loggedInUser"></ChangeNameDialog>
    <br />
    <ChangePassDialog></ChangePassDialog>
    <v-divider class="my-3"></v-divider>
    <h3 class="mt-3">Account</h3>
    <AccountDeactivation class="account-action-box"></AccountDeactivation>
    <MfaToggler class="account-action-box"></MfaToggler>
    <h3 class="mt-3">Data</h3>
    <p>
      To download your data, simply click the button below. This will initiate
      the download process and save your data to your computer as an excel file.
      It's as simple as that!
    </p>
    <v-btn
      dense
      small
      color="indigo darken-1"
      class="white--text"
      :loading="downloading"
      @click="downloadData"
      >download</v-btn
    >
  </v-col>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import MfaToggler from "@/components/settings/mfa/MfaToggler.vue";
import AccountDeactivation from "@/components/settings/deactivate-account/AccountDeactivation.vue";
import ChangeNameDialog from "@/components/settings/change-name/ChangeNameDialog.vue";
import ChangePassDialog from "@/components/settings/change-password/ChangePassDialog.vue";
import axios from "axios";
export default {
  data() {
    return {
      downloading: false,
    };
  },
  computed: {
    ...mapGetters(["loggedInUser", "content"]),
  },
  components: {
    MfaToggler,
    AccountDeactivation,
    ChangeNameDialog,
    ChangePassDialog,
  },
  methods: {
    ...mapActions(["fetchContent", "getProfile"]),
    async downloadData() {
      this.downloading = true;
      const response = await axios.get("/users/download-data", {
        responseType: "blob",
      });
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const blobUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = `user_data.xlsx`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      this.downloading = false;
    },
  },
  async mounted() {
    await this.getProfile();
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
