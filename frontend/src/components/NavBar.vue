<template>
  <nav>
    <router-link to="/">Guardian</router-link>
    <router-link v-if="loggedInUser" to="/home">Home</router-link>
    <router-link to="/generate-password">Generate</router-link>
    <router-link v-if="loggedInUser" to="activities">Activities</router-link>
    <v-spacer></v-spacer>
    <router-link v-if="!loggedInUser" to="/login">Login</router-link>
    <router-link v-if="!loggedInUser" to="/signup">Sign up</router-link>
    <router-link v-if="loggedInUser" to="/settings">Settings</router-link>
    <span v-if="loggedInUser" @click="handleLogout">Log out</span>
  </nav>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

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
