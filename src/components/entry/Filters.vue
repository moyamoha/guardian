<template>
  <div>
    <v-text-field
      placeholder="Search by title and/or username"
      v-model="dataStore.filter.search"
      density="compact"
      variant="outlined"
      clearable
      :append-icon="ui.showMoreFilters ? 'mdi-chevron-down' : 'mdi-chevron-up'"
      @click:append="ui.toggleShowMoreFilters()"
    ></v-text-field>

    <div v-if="ui.showMoreFilters" class="show-more-filters">
      <v-combobox
        v-model="dataStore.filter.category"
        :items="dataStore.categories"
        item-value="_id"
        item-title="name"
        :return-object="false"
        label="Category"
        density="compact"
        variant="outlined"
        clearable
      ></v-combobox>
      <v-combobox
        v-model="dataStore.filter.status"
        :items="['active', 'expired']"
        label="Status"
        density="compact"
        variant="outlined"
        clearable
      ></v-combobox>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDataStore from "../../store/data.store";
import useUiStore from "../../store/ui.store";

const dataStore = useDataStore();
const ui = useUiStore();
</script>

<style scoped>
.show-more-filters {
  display: flex;
  gap: 20px;
  width: 80%;
}
</style>
