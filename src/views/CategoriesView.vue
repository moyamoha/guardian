<template>
  <div class="categories-view">
    <div class="d-flex my-5 align-center">
      <span class="mr-4">All your categories</span>
      <CategoryDialog :category="null">
          <v-icon dense>mdi-plus-outline</v-icon>
      </CategoryDialog>
    </div>
    <Loading v-if="this.isLoading"></Loading>
    <div class="categories-list" v-if="this.categories.length > 0">
        <CategoryCard 
            v-for="category in this.categories"
            :key="category.id"
            :category="category"
        ></CategoryCard>
    </div>
    <div v-else>No Categories</div>
  </div>
</template>

<script>
import Loading from "@/components/_shared/Loading.vue";
import CategoryCard from "@/components/category/CategoryCard.vue";
import CategoryDialog from "@/components/category/CategoryDialog.vue";
import { mapGetters } from "vuex";

export default {
  name: "CategoriesView",
  components: { CategoryDialog, CategoryCard, Loading },
  computed: {
    ...mapGetters(["categories", "isLoading"]),
  },
  mounted() {
    this.$store.dispatch("fetchContent")
  }
};
</script>

<style scoped>
.categories-view {
  width: 60%;
  padding-bottom: 1rem;
}
@media (max-width: 700px) {
  .categories-view {
    width: 90%;
  }
}

.categories-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}
</style>
