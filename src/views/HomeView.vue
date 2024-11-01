<template>
  <div class="home">
    <p v-show="loggedInUser !== null">
      Hello
      <strong>{{ loggedInUser.firstname }} {{ loggedInUser.lastname }}</strong
      >!
    </p>
    <div class="d-flex mb-5 align-center">
      <span class="mr-4">All your credentials</span>
      <EntryDialog :entry="null" :categoryId="null">
        <v-icon dense>mdi-plus-outline</v-icon>
      </EntryDialog>
    </div>
    <Loading v-if="this.isLoading"></Loading>
    <div v-if="this.content.length > 0">
      <SearchField></SearchField>
    </div>
    <div v-if="this.content.length === 0 && !this.isLoading">
      You have not created anything yet.
      <CategoryDialog :category="null">
        <v-btn dense small>Create category</v-btn>
      </CategoryDialog>
    </div>
    <EntryContainer></EntryContainer>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import EntryDialog from "@/components/entry/EntryDialog.vue";
import CategoryDialog from "@/components/category/CategoryDialog.vue";
import router from "@/router";
import Loading from "@/components/_shared/Loading.vue";
import EntryContainer from "@/components/entry/EntryContainer.vue";
import SearchField from "@/components/SearchField.vue";

export default {
  name: "HomeView",
  components: {
    CategoryDialog,
    Loading,
    EntryContainer,
    SearchField,
    EntryDialog,
  },
  methods: {
    ...mapActions(["fetchContent", "fetchProfile", "logout"]),
    ...mapMutations(["setExpandedCategories"]),
  },
  async mounted() {
    const q = this.$route.query;
    if (q["logout"] === "true") {
      this.logout();
    } else if (q["fetch_profile"] === "true") {
      await this.fetchProfile();
      this.$router.push("/home");
    }
    if (this.loggedInUser) {
      await this.fetchContent();
    } else router.replace("/");
  },
  computed: {
    ...mapGetters(["content", "isLoading", "loggedInUser", "expandedOnes"]),
  },
};
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
