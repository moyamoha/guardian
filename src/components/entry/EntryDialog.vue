<template>
  <v-dialog
    width="500"
    v-model="dialog"
    transition="dialog-bottom-transition"
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
          {{ entry ? `Edit '${entry.title}'?` : `Create new entry` }}
        </div>
        <v-icon @click="handleClose" color="white">mdi-close-circle</v-icon>
      </v-card-title>
      <v-card-text class="py-2">
        <ErrorAlert v-if="ui.errorHappened" :timeout="4000"></ErrorAlert>
        <v-form
          class="my-3"
          @submit.prevent="handleSubmit"
          v-model="formIsValid"
        >
          <v-text-field
            label="Title *"
            density="compact"
            variant="outlined"
            v-model="item.title"
            :rules="[rules.required]"
            autofocus
          ></v-text-field>
          <v-text-field
            label="Username *"
            density="compact"
            variant="outlined"
            v-model="item.username"
            :rules="[rules.required]"
          ></v-text-field>
          <PasswordField
            v-model="item.password"
            able-to-generate
            v-if="createNew"
          ></PasswordField>
          <UrlField v-model="item.url"></UrlField>
          <v-combobox
            v-model="item.status"
            :items="['active', 'expired']"
            label="Status"
            density="compact"
            variant="outlined"
            v-if="!createNew"
          ></v-combobox>
          <v-combobox
            v-model="category"
            :items="dataStore.categories"
            item-title="name"
            item-value="_id"
            :return-object="false"
            label="Category *"
            density="compact"
            variant="outlined"
            :rules="[rules.required]"
          ></v-combobox>
          <v-btn
            type="submit"
            class="mr-2"
            color="primary"
            variant="outlined"
            :disabled="processing || !formIsValid"
            :loading="processing"
            >Save</v-btn
          >
          <v-btn @click="dialog = !dialog" color="error" variant="outlined"
            >Cancel</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, type PropType } from "vue";
import ErrorAlert from "../_shared/ErrorAlert.vue";
import PasswordField from "../_shared/PasswordField.vue";
import UrlField from "../_shared/UrlField.vue";
import useDataStore from "../../store/data.store";
import type { Entry } from "../../utils/_types";
import { rules } from "../../utils/validation";
import useUiStore from "../../store/ui.store";

const dataStore = useDataStore();
const ui = useUiStore();

const props = defineProps({
  entry: {
    type: Object as PropType<Entry>,
    required: false,
  },
});

const item = ref({
  title: props.entry ? props.entry.title : "",
  username: props.entry ? props.entry.username : "",
  url: props.entry && props.entry.url ? props.entry.url : "",
  password: "",
  status: props.entry && props.entry.status ? props.entry.status : "active",
});
const category = ref(
  props.entry && props.entry.category ? props.entry.category._id : ""
);
const formIsValid = ref(false);

const dialog = ref(false);
const processing = ref(false);

const createNew = computed(() => !Boolean(props.entry));
const categoryChanged = computed(() =>
  Boolean(category.value !== props.entry?.category._id)
);

async function handleSubmit() {
  if (!formIsValid.value) return;
  processing.value = true;
  if (props.entry) await submitEditEntryRequest();
  else await submitAddEntryRequest();
  processing.value = false;
  if (!ui.errorHappened) dialog.value = false;
}

async function submitAddEntryRequest() {
  await dataStore.addEntry(category.value, { ...item.value });
}

async function submitEditEntryRequest() {
  if (!props.entry) return;
  const editPayload = {
    title: item.value.title,
    username: item.value.username,
    url: item.value.url,
    status: item.value.status,
  };
  if (categoryChanged) {
    const categoryChangedPayload = {
      oldCategoryId: props.entry.category._id,
      newCategoryId: category.value,
    };
    await dataStore.editEntry(
      props.entry._id,
      editPayload,
      categoryChangedPayload
    );
  } else {
    await dataStore.editEntry(props.entry._id, editPayload);
  }
}

function handleClose() {
  item.value = {
    title: props.entry ? props.entry.title : "",
    username: props.entry ? props.entry.username : "",
    url: props.entry && props.entry.url ? props.entry.url : "",
    password: "",
    status: props.entry && props.entry.status ? props.entry.status : "active",
  };
  category.value = "";
  dialog.value = false;
}
</script>

<style>
/* .dialog-card {
  position: relative;
} */

.dialog-card-title {
  background-color: #2c3e50;
  color: white;
  border-bottom: 5px solid rgb(255, 177, 32);
}

.close-icon {
  position: absolute;
  top: 10px;
  right: 10px;
}
</style>
