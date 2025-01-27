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
        <div>Download your data</div>
        <v-icon @click="handleCancel" color="white">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text>
        <p class="mb-7 text-justify">
          You need your master password to be able to download your data
        </p>
        <ErrorAlert v-if="ui.errorHappened" :timeout="3500"></ErrorAlert>
        <v-form class="mt-4" @submit.prevent="handleSubmit" v-model="isValid">
          <v-text-field
            label="Master password *"
            density="compact"
            variant="outlined"
            v-model="masterPassword"
            hide-details
            autofocus
          ></v-text-field>
          <div class="btn-cont">
            <v-btn
              type="submit"
              color="primary"
              variant="outlined"
              :disabled="processing"
              :loading="processing"
              >Save</v-btn
            >
            <v-btn @click="handleCancel" variant="outlined" color="secondary"
              >Cancel</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import ErrorAlert from "../_shared/ErrorAlert.vue";
import { ref } from "vue";
import useUiStore from "../../store/ui.store";
import useDataStore from "../../store/data.store";

const ui = useUiStore();
const dataStore = useDataStore();

const isValid = ref(false);
const dialog = ref(false);
const processing = ref(false);
const masterPassword = ref("");

async function handleSubmit() {
  if (!isValid) return;
  processing.value = true;

  await dataStore.downloadData(masterPassword.value);
  processing.value = false;
  if (!ui.errorHappened) dialog.value = false;
}

function handleCancel() {
  masterPassword.value = "";
  dialog.value = false;
}
</script>

<style>
.btn-cont {
  display: flex;
  gap: 10px;
  margin-top: 20px;
}
</style>
