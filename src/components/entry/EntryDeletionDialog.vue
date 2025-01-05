<template>
  <v-dialog
    width="500"
    v-model="dialog"
    transition="dialog-bottom-transition"
    persistent
  >
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <v-btn
          icon="mdi-delete-outline"
          density="compact"
          size="small"
          elevation="0"
        ></v-btn>
      </div>
    </template>
    <v-card class="dialog-card">
      <v-card-title class="text-h6 grey lighten-2 d-flex justify-space-between">
        Delete entry
        <v-icon @click="dialog = false" color="brown">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text class="py-2">
        Are your sure you want to delete {{ entry.title }}?
      </v-card-text>
      <v-card-actions>
        <v-btn
          elevation="2"
          density="compact"
          variant="outlined"
          @click="handleDelete"
          color="success"
          :disabled="processing"
          :loading="processing"
          >Yes</v-btn
        >
        <v-btn
          elevation="2"
          density="compact"
          variant="outlined"
          color="red"
          @click="dialog = false"
          >No</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import type { Entry } from "../../utils/_types";
import useDataStore from "../../store/data.store";

const dataStore = useDataStore();

const props = defineProps({
  entry: {
    type: Object as PropType<Entry>,
    required: true,
  },
});

const dialog = ref(false);
const processing = ref(false);

async function handleDelete() {
  processing.value = true;
  await dataStore.removeEntry(props.entry._id);
  processing.value = false;
}
</script>
