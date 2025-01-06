<template>
  <div class="category-card">
    <section class="category-card__title">
      <span @click="handleTitleClick">{{ category.name }}</span>
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
import useDataStore from "../../store/data.store";
import { useRouter } from "vue-router";

const props = defineProps({
  category: {
    type: Object as PropType<Category>,
    required: true,
  },
});

const dataStore = useDataStore();
const router = useRouter();

function handleTitleClick() {
  dataStore.filter = { ...dataStore.filter, category: props.category._id };
  router.push("/home");
}
</script>

<style scoped lang="scss">
.category-card {
  border-radius: 2px;
  position: relative;
  border: 1px solid #222;
  padding: 8px 10px;
  padding-bottom: 0px;
  flex-grow: 1;
  font-size: 0.9rem;

  section {
    margin-bottom: 8px;
  }

  &__title {
    font-weight: 520;

    &:hover {
      text-decoration: underline;
      cursor: default;
    }
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
</style>
