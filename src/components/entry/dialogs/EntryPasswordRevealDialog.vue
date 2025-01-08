<template>
  <v-dialog
    width="600"
    v-model="dialog"
    transition="dialog-bottom-transition"
    persistent
  >
    <template v-slot:activator="{ props }">
      <div v-bind="props">
        <v-btn
          icon="mdi-eye-outline"
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
        Reveal password for entry {{ entry.title }}
        <v-icon @click="dialog = false" color="white">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text class="pt-3">
        <ErrorAlert v-if="ui.errorHappened"></ErrorAlert>
        <p class="text-justify mb-2">
          For security reasons, we don't display entries' passwords in the user
          interface. You can request revelation by typing in your master
          password and clicking Reveal
        </p>
        <p>
          The password for
          <strong>{{ entry.title }}</strong> is
          <span>{{ revealedPassword ? revealedPassword : "********" }}</span>
          <v-icon
            v-if="revealedPassword !== ''"
            class="ml-2"
            size="small"
            density="compact"
            @click="copyPassword"
            >mdi-content-copy</v-icon
          >
        </p>
        <v-form class="my-3" @submit.prevent="handleSubmit">
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
              prepend-icon="mdi-eye-outline"
              variant="outlined"
              :disabled="processing || masterPassword === ''"
              :loading="processing"
              >Reveal</v-btn
            >
            <v-btn
              @click="handleCancel"
              color="error"
              prepend-icon="mdi-close"
              variant="outlined"
              >Close</v-btn
            >
          </div>
        </v-form>
      </v-card-text>
    </v-card>
    <v-snackbar v-model="copied" timeout="1500">
      Password copied to clipboard
    </v-snackbar>
  </v-dialog>
</template>

<script setup lang="ts">
import ErrorAlert from "../../_shared/ErrorAlert.vue";
import { ref, watch, type PropType } from "vue";
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
const revealedPassword = ref("");
const masterPassword = ref("");
const copied = ref(false);

watch(dialog, (_new: boolean) => {
  if (_new) {
    revealedPassword.value = "";
    masterPassword.value = "";
    copied.value = false;
  }
});

async function handleSubmit() {
  processing.value = true;
  const revealPassObject = await dataStore.requestEntryPasswordReveal(
    props.entry._id,
    masterPassword.value
  );
  revealedPassword.value = revealPassObject?.password ?? "";
  processing.value = false;
  if (!ui.errorHappened) {
    masterPassword.value = "";
  }
}

function handleCancel() {
  masterPassword.value = "";
  revealedPassword.value = "";
  copied.value = false;
  processing.value = false;
  dialog.value = false;
  ui.setError("");
}

async function copyPassword() {
  await window.navigator.clipboard.writeText(revealedPassword.value);
  copied.value = true;
  revealedPassword.value = "";
}
</script>
