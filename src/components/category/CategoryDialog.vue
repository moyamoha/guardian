<template>
  <v-dialog
    width="500"
    v-model="dialog"
    transition="dialog-top-transition"
    persistent
  >
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <slot></slot>
      </div>
    </template>
    <v-card class="dialog-card">
      <v-card-title
        class="text-h6 d-flex justify-space-between dialog-card-title"
      >
        <div>
          {{ createNew ? "New category" : `Editing ${category?.name}` }}
        </div>
        <v-icon @click="handleCancel" color="white">mdi-close-circle</v-icon>
      </v-card-title>

      <v-card-text>
        <ErrorAlert v-if="ui.errorHappened" :timeout="3500"></ErrorAlert>
        <v-form class="my-3" @submit.prevent="handleSubmit" ref="catform">
          <v-text-field
            label="Name *"
            density="compact"
            variant="outlined"
            :rules="[required]"
            v-model="item.name"
            autofocus
          ></v-text-field>
          <div class="btn-cont">
            <v-btn
              type="submit"
              color="primary"
              density="compact"
              variant="outlined"
              :disabled="processing"
              :loading="processing"
              >Save</v-btn
            >
            <v-btn
              @click="handleCancel"
              color="warn"
              density="compact"
              variant="outlined"
              >Cancel</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import useDataStore from "../../store/data.store";
import type { Category } from "../../utils/_types";
import { computed, ref, type PropType } from "vue";
import useUiStore from "../../store/ui.store";
import ErrorAlert from "../_shared/ErrorAlert.vue";

const dataStore = useDataStore();
const ui = useUiStore();

const props = defineProps({
  category: {
    type: Object as PropType<Category>,
    required: false,
  },
});

const item = ref({
  name: props.category ? props.category.name : "",
});
const dialog = ref(false);
const processing = ref(false);

async function handleSubmit() {
  processing.value = true;
  if (props.category) {
    await dataStore.editCategory(props.category?._id, {
      name: item.value.name,
    });
  } else {
    await dataStore.addCategory({ name: item.value.name });
  }
  processing.value = false;
  if (!ui.errorHappened) dialog.value = false;
}

function handleCancel() {
  item.value.name = props.category ? props.category.name : "";
  dialog.value = false;
}

const required = function (v: string) {
  return (v && v.length > 0) || "Category should have a name";
};

const createNew = computed(() => !Boolean(props.category));
</script>

<style>
.btn-cont {
  display: flex;
  gap: 10px;
}
</style>
