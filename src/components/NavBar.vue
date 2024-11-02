<template>
  <nav>
    <router-link to="/">Guardian</router-link>
    <router-link v-if="loggedInUser" to="/home">Home</router-link>
    <router-link v-if="loggedInUser" to="/categories">Categories</router-link>
    <router-link to="/generate-password">Generate</router-link>
    <v-spacer></v-spacer>
    <v-menu
      offset-y
      offset-x
      class="settings"
      close-on-content-click
      v-if="loggedInUser"
    >
      <template v-slot:activator="{ on, attrs }">
        <span v-bind="attrs" v-on="on" class="mr-2">Settings</span>
      </template>
      <v-list width="200" class="settings-dropdown">
        <div class="settings-item" @click="goToAccountSettingsPage">
          <span>Account</span>
          <v-icon small dense>mdi-account-circle-outline</v-icon>
        </div>
        <MasterPasswordDialog>
          <div class="settings-item">
            <span>Master password</span>
            <v-icon small dense>mdi-lock-outline</v-icon>
          </div>
        </MasterPasswordDialog>
        <div class="settings-item" @click="handleLogout">
          <span>Logout</span>
          <v-icon small dense>mdi-logout</v-icon>
        </div>
      </v-list>
    </v-menu>
  </nav>
</template>

<script>
import { AUTH_UI_URL, SITE_URL } from "@/utils/constants";
import { mapGetters, mapActions } from "vuex";
import MasterPasswordDialog from "./settings/MasterPasswordDialog.vue";
import axios from "axios";

export default {
  components: { MasterPasswordDialog },
  data() {
    return {
      downloading: false,
    };
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
    },
    goToAccountSettingsPage() {
      const token = window.localStorage.getItem("accessToken");
      window.location.href = `${AUTH_UI_URL}/?redirect=${SITE_URL}/home&token=${token}`;
    },
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
};
</script>

<style scoped lang="scss">
nav {
  padding: 10px;
  background-color: #2c3e50;
  display: flex;
  gap: 10px;
  border-bottom: 5px solid rgb(255, 177, 32);

  a,
  span {
    font-weight: 500;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
  }

  a {
    &:nth-child(3) {
      margin-left: auto;
    }

    .router-link-exact-active {
      color: #42b983;
    }
  }

  span {
    cursor: pointer;
    margin-left: auto;
  }
}

.settings-dropdown {
  padding: 6px 12px;
  display: flex;
  flex-direction: column;
  gap: 10px;

  .settings-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
      background-color: #cdcdcd;
    }
  }
}
</style>
