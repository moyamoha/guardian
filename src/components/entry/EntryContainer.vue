<template>
  <div>
    <div class="mb-3 d-sm-flex align-center justify-space-between w-100">
      <EntryDialog>
        <template v-slot:default>
          <v-btn
            icon="mdi-plus-outline"
            density="compact"
            size="small"
            elevation="0"
            v-tooltip:end="'Create new entry'"
          ></v-btn>
        </template>
      </EntryDialog>
      <div class="d-md-flex align-center">
        <PerPage></PerPage>
        <v-pagination
          v-model="dataStore.pagination.page"
          :length="maxPage"
          total-visible="3"
          size="small"
          density="compact"
        ></v-pagination>
      </div>
    </div>
    <div class="entry-container">
      <EntryCard
        v-for="entry in dataStore.entries"
        :key="entry._id"
        :entry="entry"
        v-if="dataStore.entries.length > 0"
      >
      </EntryCard>
      <NoDataFound v-else></NoDataFound>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useDataStore from "../../store/data.store";
import EntryCard from "./EntryCard.vue";
import EntryDialog from "./dialogs/EntryDialog.vue";
import PerPage from "./PerPage.vue";
import NoDataFound from "../_shared/NoDataFound.vue";

const dataStore = useDataStore();

const maxPage = computed(() =>
  Math.ceil(dataStore.entriesCount / dataStore.pagination.perPage)
);
</script>

<style>
.entry-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
  grid-auto-flow: dense;
}

.highlight {
  color: black;
  background-color: yellow;
}
</style>
