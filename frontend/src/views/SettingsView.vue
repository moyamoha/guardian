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
      the download process and save your data to your computer. It's as simple
      as that!
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
import MfaToggler from "../components/MfaToggler.vue";
import AccountDeactivation from "@/components/AccountDeactivation.vue";
import ChangeNameDialog from "@/components/ChangeNameDialog.vue";
import ChangePassDialog from "../components/ChangePassDialog.vue";
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
    ...mapActions(["fetchContent"]),
    async downloadData() {
      this.downloading = true;
      const activities = (await axios("/users/activity-history")).data;
      const content = (await axios.get("/categories/")).data;
      const simplifiedContent = content.map((c) => {
        return {
          category_name: c.name,
          entries: c.items.map((entry) => {
            const { title, username, password, url, status } = entry;
            return { title, username, password, url, status };
          }),
        };
      });
      const simplifiedActivities = activities.map((a) => {
        const { activityType, timestamp } = a;
        return { activityType, timestamp };
      });
      const data = {
        ...this.loggedInUser,
        content: [...simplifiedContent],
        activities: [...simplifiedActivities],
      };
      const file = new Blob([JSON.stringify(data)], {
        type: "application/json",
      });
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = `${this.loggedInUser.email}-data.json`;
      a.click();
      URL.revokeObjectURL(a.href);
      this.downloading = false;
    },
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
