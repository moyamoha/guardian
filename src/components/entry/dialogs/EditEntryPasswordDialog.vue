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
          Edit password for <strong>{{ entry.title }}</strong>
        </div>
        <v-icon @click="handleCancel" color="white">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text>
        <v-form class="my-3" @submit.prevent="handleSubmit" ref="entryPassForm">
          <ErrorAlert v-if="ui.errorHappened" :timeout="3500"></ErrorAlert>
          <PasswordField
            v-model="password"
            able-to-generate
            label="New password *"
          >
          </PasswordField>
          <div class="btn-cont">
            <v-btn
              type="submit"
              color="primary"
              variant="outlined"
              :disabled="processing"
              :loading="processing"
              prepend-icon="mdi-content-save-check-outline"
              >Save</v-btn
            >
            <v-btn
              @click="handleCancel"
              color="error"
              prepend-icon="mdi-close"
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
import PasswordField from "../../_shared/PasswordField.vue";
import ErrorAlert from "../../_shared/ErrorAlert.vue";
import { ref, type PropType } from "vue";
import type { Entry } from "../../../utils/_types";
import useDataStore from "../../../store/data.store";
import useUiStore from "../../../store/ui.store";

const props = defineProps({
  entry: {
    type: Object as PropType<Entry>,
    required: true,
  },
});

const dataStore = useDataStore();
const ui = useUiStore();

const dialog = ref(false);
const processing = ref(false);
const password = ref("");

async function handleSubmit() {
  processing.value = true;
  await dataStore.editEntryPassword(props.entry._id, password.value);
  processing.value = false;
  if (!ui.errorHappened) {
    dialog.value = false;
  }
}

function handleCancel() {
  password.value = "";
  dialog.value = false;
}
</script>

<style>
.btn-cont {
  display: flex;
  gap: 10px;
}
</style>
