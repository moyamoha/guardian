<template>
  <nav>
    <router-link to="/">Guardian</router-link>
    <router-link v-if="loggedInUser" to="/home">{{
      $t("labels.nav.home")
    }}</router-link>
    <router-link to="/generate-password">{{
      $t("labels.nav.generate")
    }}</router-link>
    <router-link v-if="loggedInUser" to="activities">{{
      $t("labels.nav.activities")
    }}</router-link>
    <v-spacer></v-spacer>
    <ChangeLanguage></ChangeLanguage>
    <router-link v-if="!loggedInUser" to="/login">{{
      $t("labels.nav.login")
    }}</router-link>
    <router-link v-if="!loggedInUser" to="/signup">{{
      $t("labels.nav.signup")
    }}</router-link>
    <router-link v-if="loggedInUser" to="/settings">{{
      $t("labels.nav.settings")
    }}</router-link>
    <span v-if="loggedInUser" @click="handleLogout">{{
      $t("labels.nav.logout")
    }}</span>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import ChangeLanguage from "./ChangeLanguage.vue";

export default {
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      this.logout();
    },
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  components: {
    ChangeLanguage,
    ChangeLanguage,
  },
};
</script>

<style scoped>
nav {
  padding: 10px;
  background-color: #2c3e50;
  display: flex;
  gap: 10px;
  border-bottom: 5px solid rgb(255, 177, 32);
}

nav a,
nav span {
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  cursor: pointer;
}

nav span {
  cursor: pointer;
  margin-left: auto;
}

nav a:nth-child(3) {
  margin-left: auto;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
