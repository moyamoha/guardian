<template>
  <div class="category-card">
    <section class="category-card__title">
      <span>{{ this.category.name }}</span>
    </section>
    <section class="category-card__entry-count">
      <span class="entry-card__label">Entry count: </span>
      <span>{{ this.category.entryCount }}</span>
    </section>
    <section class="category-card__actions">
      <CategoryDeletionDialog :category="this.category">
        <v-icon dense>mdi-delete-outline</v-icon>
      </CategoryDeletionDialog>
      <CategoryDialog :category="this.category">
        <v-icon dense>mdi-square-edit-outline</v-icon>
      </CategoryDialog>
    </section>
  </div>
</template>

<script>
import CategoryDeletionDialog from "./CategoryDeletionDialog.vue";
import CategoryDialog from "./CategoryDialog.vue";

export default {
  name: "category-card",
  props: ["category"],
  components: { CategoryDialog, CategoryDeletionDialog },
};
</script>

<style scoped lang="scss">
.category-card {
  width: 200px;
  // height: 280px;
  border-radius: 2px;
  border: 1px solid #222;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 0px;
  flex-grow: 1;

  section {
    margin-bottom: 8px;
  }

  &__title {
    font-weight: 520;
  }

  &__entry-count {
    font-size: 0.8rem;
  }

  &__label {
    font-size: 1rem;
  }

  &__actions {
    display: flex;
    flex-direction: row;
    justify-self: flex-end;
    justify-content: flex-end;
    gap: 8px;
    margin-bottom: -20px;

    &__icon {
      cursor: pointer;
    }
  }
}

@media (max-width: 1150px) {
  .category-card {
    width: 40%;
  }
}

@media (max-width: 750px) {
  .category-card {
    width: 48%;
  }
}

@media (max-width: 450px) {
  .category-card {
    width: 100%;
  }
}
</style>
