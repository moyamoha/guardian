<template>
  <nav>
    <router-link to="/">Guardian</router-link>
    <router-link v-if="auth.userIsLoggedIn" to="/home">Home</router-link>
    <router-link v-if="auth.userIsLoggedIn" to="/categories"
      >Categories</router-link
    >
    <CreateEntityMenu v-if="auth.userIsLoggedIn"></CreateEntityMenu>
    <router-link to="/generate-password">Generate</router-link>
    <v-spacer></v-spacer>
    <SettingsMenu v-if="auth.userIsLoggedIn"></SettingsMenu>
  </nav>
</template>

<script lang="ts" setup>
import useAuthStore from "../store/auth.store";
import SettingsMenu from "./settings/SettingsMenu.vue";
import CreateEntityMenu from "./CreateEntityMenu.vue";

const auth = useAuthStore();
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
</style>
