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
        class="text-h6 grey lighten-2 d-flex justify-space-between dialog-card-title"
      >
        Delete category {{ category.name }} ?
        <v-icon @click="dialog = false" color="white">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text class="py-2">
        <p>
          Deleting a category will delete all the entries in it. Are you sure?
        </p>

        <div class="d-flex my-3">
          <v-btn
            color="error"
            variant="outlined"
            prepend-icon="mdi-delete-outline"
            @click="handleDelete"
            class="mr-3"
          >
            Yes
          </v-btn>
          <v-btn
            color="secondary"
            variant="outlined"
            prepend-icon="mdi-close"
            @click="dialog = false"
          >
            No
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { ref, type PropType } from "vue";
import type { Category } from "../../utils/_types";
import useDataStore from "../../store/data.store";

const dataStore = useDataStore();

const dialog = ref(false);
const deleting = ref(false);

const props = defineProps({
  category: {
    type: Object as PropType<Category>,
    required: true,
  },
});

async function handleDelete() {
  deleting.value = true;
  await dataStore.removeCategory(props.category._id);
  deleting.value = false;
  dialog.value = false;
}
</script>
