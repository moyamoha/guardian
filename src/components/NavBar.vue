<template>
  <nav>
    <router-link to="/">Guardian</router-link>
    <router-link v-if="auth.userIsLoggedIn" to="/home">Home</router-link>
    <router-link v-if="auth.userIsLoggedIn" to="/categories"
      >Categories</router-link
    >
    <router-link to="/generate-password">Generate</router-link>
    <v-spacer></v-spacer>
    <v-menu
      offset-y
      offset-x
      class="settings"
      close-on-content-click
      v-if="auth.userIsLoggedIn"
    >
      <template v-slot:activator="{ props }">
        <span v-bind="props" class="mr-2">Settings</span>
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
        <div class="settings-item" @click="auth.logout()">
          <span>Logout</span>
          <v-icon small dense>mdi-logout</v-icon>
        </div>
      </v-list>
    </v-menu>
  </nav>
</template>

<script lang="ts" setup>
import useAuthStore from "../store/auth.store";
import { AUTH_UI_URL, SITE_URL } from "../utils/constants";
import MasterPasswordDialog from "./settings/MasterPasswordDialog.vue";

const auth = useAuthStore();

function goToAccountSettingsPage() {
  const token = window.localStorage.getItem("accessToken");
  window.location.href = `${AUTH_UI_URL}/?redirect=${SITE_URL}/home&token=${token}`;
}
</script>

<style scoped lang="scss">
nav {
  padding: 10px;
  background-color: #2c3e50;
  display: flex;
  gap: 10px;
  border-bottom: 5px solid rgb(255, 177, 32);

  position: fixed;
  top: 0;
  width: 100%; /* Ensures it spans the entire width */
  z-index: 1000;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);

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
