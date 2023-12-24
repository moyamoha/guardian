<template>
  <div class="home">
    <p v-show="loggedInUser !== null">
      Hello
      <strong>{{ loggedInUser.firstname }} {{ loggedInUser.lastname }}</strong
      >!
    </p>
    <Loading v-if="this.isLoading"></Loading>
    <p v-else-if="this.content.length > 0">
      All your credentials
      <br />
      <section class="action-row mb-4">
        <CategoryDialog
        :category="null"
        activatorText="Create category"
        ></CategoryDialog>
        <EntryDialog :entry="null" :categoryId="null">
          <v-btn outlined small dense>Create entry <v-icon right dark>mdi-plus</v-icon></v-btn>
        </EntryDialog>
        
      </section>
      <SearchField></SearchField>
    </p>
    <p v-else>
      You have not created anything yet.
      <CategoryDialog
        :category="null"
        activatorText="Create category"
      ></CategoryDialog>
    </p>
    <EntryContainer></EntryContainer>
    <CategoryDialog></CategoryDialog>
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
  components: { CategoryDialog, Loading, EntryContainer, SearchField, EntryDialog },
  methods: {
    ...mapActions(["fetchContent"]),
    ...mapMutations(["setExpandedCategories", "setContentAlreadyFetched"]),
  },
  mounted() {
    if (this.loggedInUser && !this.contentAlreadyFetched) {
      this.fetchContent();
      this.setContentAlreadyFetched(true)
    } else if (this.loggedInUser && this.contentAlreadyFetched) {
      return
    }
    else router.replace("/");
  },
  computed: {
    ...mapGetters(["content", "isLoading", "loggedInUser", "expandedOnes", "contentAlreadyFetched"]),
  }
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
