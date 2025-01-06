<template>
  <div class="home">
    <p v-show="auth.userIsLoggedIn">
      Hello
      <strong>{{ auth.userFullName }}</strong
      >!
    </p>
    <v-alert
      colored-border
      type="warning"
      variant="outlined"
      border="start"
      elevation="2"
      class="mt-4"
      icon="mdi-alert-outline"
      v-if="!auth.userHasMasterPassword"
    >
      <p class="mb-3">
        You have not set up master password. Creating entries will thus fail.
        Please set up a master password to proceed
      </p>
      <MasterPasswordDialog>
        <v-btn variant="tonal">Setup master password</v-btn>
      </MasterPasswordDialog>
    </v-alert>
    <div v-else>
      <div class="d-flex mb-5 align-center">
        <span class="mr-4">All your credentials</span>
      </div>
      <Filters></Filters>
      <Loading v-if="dataStore.isLoading" />
      <EntryContainer v-else></EntryContainer>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDataStore from "../store/data.store";
import useAuthStore from "../store/auth.store";
import { useRoute, useRouter } from "vue-router";
import { onMounted } from "vue";
import MasterPasswordDialog from "../components/settings/MasterPasswordDialog.vue";
import EntryContainer from "../components/entry/EntryContainer.vue";
import Loading from "../components/_shared/Loading.vue";
import Filters from "../components/entry/Filters.vue";

const dataStore = useDataStore();
const auth = useAuthStore();

const router = useRouter();
const route = useRoute();

onMounted(async () => {
  const q = route.query;
  if (q["logout"] === "true") {
    auth.logout();
  } else if (q["fetch_profile"] === "true") {
    await auth.fetchProfile();
    router.push("/home");
  }
  if (auth.userIsLoggedIn) {
    await dataStore.searchEntries();
    await dataStore.loadCategories();
  } else router.replace("/");
});
</script>

<style>
.home {
  width: 60%;
  padding-bottom: 1rem;
}
@media (max-width: 700px) {
  .home {
    width: 90%;
  }
}

.action-link {
  cursor: pointer;
  color: rgb(127, 17, 129);
  font-style: italic;
}
.action-link:hover {
  text-decoration: underline;
}

.action-row {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
}
</style>
