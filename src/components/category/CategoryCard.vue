<template>
  <div class="category-card">
    <section class="category-card__title">
      <span>{{ category.name }}</span>
    </section>
    <section class="category-card__entry-count">
      <span class="entry-card__label">Entry count: </span>
      <span>{{ category.entryCount }}</span>
    </section>
    <section class="category-card__actions">
      <CategoryDeletionDialog :category="category" />
      <CategoryDialog :category="category">
        <template v-slot:default>
          <v-btn
            icon="mdi-square-edit-outline"
            density="compact"
            size="small"
            elevation="0"
          ></v-btn>
        </template>
      </CategoryDialog>
    </section>
  </div>
</template>

<script lang="ts" setup>
import type { PropType } from "vue";
import CategoryDeletionDialog from "./CategoryDeletionDialog.vue";
import CategoryDialog from "./CategoryDialog.vue";
import type { Category } from "../../utils/_types";

defineProps({
  category: {
    type: Object as PropType<Category>,
    required: true,
  },
});
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
