<template>
  <div class="view-selector">
    <v-icon
      :class="gridSelectedClass"
      size="x-small"
      @click="ui.entryDisplayMode = 'grid'"
      >mdi-view-grid-outline</v-icon
    >
    <v-icon
      :class="listSelectedClass"
      size="x-small"
      @click="ui.entryDisplayMode = 'table'"
      >mdi-list-box-outline</v-icon
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import useUiStore from "../../store/ui.store";

const ui = useUiStore();

const gridSelectedClass = computed(() => {
  return ui.showEntriesInGrid ? "selected-view-type" : "";
});

const listSelectedClass = computed(() => {
  return !ui.showEntriesInGrid ? "selected-view-type" : "";
});
</script>

<style lang="scss" scoped>
.view-selector {
  display: flex;
  gap: 6px;
}

.selected-view-type {
  border-bottom: 1px solid black;
}
</style>
