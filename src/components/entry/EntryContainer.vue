<template>
  <div>
    <div class="mb-2 d-sm-flex align-center justify-space-between w-100">
      <ViewTypeSelector v-if="showViewTypeSelector"></ViewTypeSelector>
      <div class="d-flex align-center">
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
    <div class="entry-container--grid" v-if="ui.showEntriesInGrid">
      <EntryCard
        v-for="entry in dataStore.entries"
        :key="entry._id"
        :entry="entry"
        v-if="dataStore.entries.length > 0"
      >
      </EntryCard>
      <NoDataFound v-else></NoDataFound>
    </div>
    <div class="entry-container--table" v-else>
      <EntryRow
        v-for="entry in dataStore.entries"
        :key="entry._id"
        :entry="entry"
        v-if="dataStore.entries.length > 0"
      ></EntryRow>
      <NoDataFound v-else></NoDataFound>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useDataStore from "../../store/data.store";
import EntryCard from "./EntryCard.vue";
import PerPage from "./PerPage.vue";
import NoDataFound from "../_shared/NoDataFound.vue";
import EntryRow from "./EntryRow.vue";
import useUiStore from "../../store/ui.store";
import ViewTypeSelector from "./ViewTypeSelector.vue";
import { useDisplay } from "vuetify";

const dataStore = useDataStore();
const ui = useUiStore();
const display = useDisplay();

const showViewTypeSelector = computed(() => {
  return display.width.value > 450;
});

const maxPage = computed(() =>
  Math.ceil(dataStore.entriesCount / dataStore.pagination.perPage)
);
</script>

<style>
.entry-container--grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 15px;
  grid-auto-flow: dense;
}

.entry-container--table {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.highlight {
  color: black;
  background-color: yellow;
}
</style>
