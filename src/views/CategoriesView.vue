<template>
  <div class="categories-view">
    <div class="d-flex mt-5 mb-3 align-center justify-space-between">
      <span class="mr-4">All your categories</span>
      <CategoryDialog>
        <v-btn
          icon="mdi-plus-outline"
          density="compact"
          elevation="0"
          size="small"
        ></v-btn>
      </CategoryDialog>
    </div>
    <Loading v-if="dataStore.isLoading"></Loading>
    <div
      class="categories-list"
      v-if="dataStore.categories.length > 0 && !dataStore.isLoading"
    >
      <CategoryCard
        v-for="category in dataStore.categories"
        :key="category._id"
        :category="category"
      ></CategoryCard>
    </div>
  </div>
</template>

<script lang="ts" setup>
import useDataStore from "../store/data.store";
import CategoryCard from "../components/category/CategoryCard.vue";
import Loading from "../components/_shared/Loading.vue";
import CategoryDialog from "../components/category/CategoryDialog.vue";
import { onMounted } from "vue";

const dataStore = useDataStore();

onMounted(async () => {
  await dataStore.loadCategories();
});
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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 10px;
  grid-auto-flow: dense;
}
</style>
