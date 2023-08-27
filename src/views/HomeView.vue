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
      <section :class="{'action-row': true, 'action-row--cardview': this.isCardView}">
        <CategoryDialog
        :category="null"
        activatorText="Create category"
        ></CategoryDialog>
        <EntryDialog :entry="null" :categoryId="null" v-if="this.isCardView">
          <v-btn outlined small dense>Create entry <v-icon right dark>mdi-plus</v-icon></v-btn>
        </EntryDialog>
        
      </section>
      <v-btn class="view-toggle-btn" dense small outlined @click="changeView">{{ toggleViewBtnText }}</v-btn>
      <SearchField v-if="this.isCardView"></SearchField>
    </p>
    <p v-else>
      You have not created anything yet.
      <CategoryDialog
        :category="null"
        activatorText="Create category"
      ></CategoryDialog>
    </p>
    <DataTree v-if="!this.isCardView"></DataTree>
    <EntryContainer v-else></EntryContainer>
    <CategoryDialog></CategoryDialog>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import DataTree from "@/components/DataTree.vue";
import EntryDialog from "@/components/entry/EntryDialog.vue";
import CategoryDialog from "@/components/category/CategoryDialog.vue";
import router from "@/router";
import Loading from "@/components/_shared/Loading.vue";
import EntryContainer from "@/components/entry/EntryContainer.vue";
import SearchField from "@/components/SearchField.vue";
// @ is an alias to /src

export default {
  name: "HomeView",
  components: { DataTree, CategoryDialog, Loading, EntryContainer, SearchField, EntryDialog },
  methods: {
    ...mapActions(["fetchContent"]),
    ...mapMutations(["setExpandedCategories", "setContentAlreadyFetched", "toggleCardView"]),
    collapseOrExpandAll() {
      if (this.expandedOnes.length > 0) this.setExpandedCategories([])
      else this.setExpandedCategories(this.content.map(c => c._id))
    },
    changeView() {
      this.toggleCardView()
    }
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
    ...mapGetters(["content", "isLoading", "loggedInUser", "expandedOnes", "contentAlreadyFetched", "isCardView", "isTreeView"]),
    collapseOrExpandText() {
      return this.expandedOnes.length > 0 ? "Collapse all" : "Expand all";
    },
    toggleViewBtnText() {
      return this.isCardView ? 'Show tree view' : 'Show card view'
    }

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
  width: 80%;
  justify-content: space-between;
  align-items: center;
}

.action-row--cardview {
  width: 100%;
}

.view-toggle-btn {
  margin: 1.2rem 0;
  color: rgb(127, 17, 129) !important;
}
</style>
