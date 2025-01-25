<template>
  <v-menu offset-y offset-x class="settings" open-on-hover>
    <template v-slot:activator="{ props }">
      <span v-bind="props" class="mr-2 settings__text">Settings</span>
    </template>
    <v-list width="200" class="settings__dropdown">
      <div class="settings__dropdown__item" @click="goToAccountSettingsPage">
        <span>Account</span>
        <v-icon small dense>mdi-account-circle-outline</v-icon>
      </div>
      <MasterPasswordDialog>
        <div class="settings__dropdown__item">
          <span>Master password</span>
          <v-icon small dense>mdi-lock-outline</v-icon>
        </div>
      </MasterPasswordDialog>
      <DownloadDataDialog>
        <div class="settings__dropdown__item">
          <span>Download your data</span>
          <v-icon small dense>mdi-download-outline</v-icon>
        </div>
      </DownloadDataDialog>
      <div class="settings__dropdown__item" @click="auth.logout()">
        <span>Logout</span>
        <v-icon small dense>mdi-logout</v-icon>
      </div>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import useAuthStore from "../../store/auth.store";
import { AUTH_UI_URL, SITE_URL } from "../../utils/constants";
import MasterPasswordDialog from "./MasterPasswordDialog.vue";
import DownloadDataDialog from "./DownloadDataDialog.vue";

const auth = useAuthStore();

function goToAccountSettingsPage() {
  const token = window.localStorage.getItem("accessToken");
  window.location.href = `${AUTH_UI_URL}/?redirect=${SITE_URL}/home&token=${token}`;
}
</script>

<style lang="scss" scoped>
.settings {
  &__text {
    font-weight: 500;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
  }

  &__dropdown {
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    font-size: 0.8rem;

    &__item {
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
}
</style>
