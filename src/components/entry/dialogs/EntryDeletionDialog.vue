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
      <v-card-title
        class="text-h6 d-flex justify-space-between dialog-card-title"
      >
        Delete entry
        <v-icon @click="dialog = false" color="white">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text class="py-2">
        <p>Are your sure you want to delete {{ entry.title }}?</p>
        <v-sheet class="d-flex my-4">
          <v-btn
            elevation="2"
            variant="outlined"
            prepend-icon="mdi-delete-outline"
            @click="handleDelete"
            color="error"
            :disabled="processing"
            :loading="processing"
            >Yes</v-btn
          >
          <v-btn
            elevation="2"
            prepend-icon="mdi-close"
            variant="outlined"
            color="secondary"
            class="ml-3"
            @click="dialog = false"
            >No</v-btn
          >
        </v-sheet>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, type PropType } from "vue";
import type { Entry } from "../../../utils/_types";
import useDataStore from "../../../store/data.store";

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
