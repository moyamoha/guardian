<template>
  <v-menu offset-y offset-x class="create-entity">
    <template v-slot:activator="{ props }">
      <span v-bind="props" class="mr-2 create-entity__text">Create</span>
    </template>
    <v-list width="200" class="create-entity__dropdown">
      <EntryDialog>
        <template v-slot:default>
          <div class="create-entity__dropdown__item">
            <span>Create entry</span>
            <v-icon size="x-small">mdi-plus-outline</v-icon>
          </div>
        </template>
      </EntryDialog>

      <CategoryDialog>
        <div class="create-entity__dropdown__item">
          <span>Create category</span>
          <div>
            <v-icon size="x-small">mdi-shape-outline</v-icon>
            <v-icon size="x-small">mdi-plus-outline</v-icon>
          </div>
        </div>
      </CategoryDialog>
    </v-list>
  </v-menu>
</template>

<script lang="ts" setup>
import CategoryDialog from "./category/CategoryDialog.vue";
import EntryDialog from "./entry/dialogs/EntryDialog.vue";
</script>

<style lang="scss" scoped>
.create-entity {
  &__text {
    font-weight: 500;
    color: #ffffff;
    text-decoration: none;
    cursor: pointer;
  }

  &__dropdown {
    padding: 6px 12px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    &__item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 5px 10px;
      border-radius: 5px;
      cursor: pointer;
      font-size: 0.8rem;

      &:hover {
        background-color: #cdcdcd;
      }
    }
  }
}
</style>
