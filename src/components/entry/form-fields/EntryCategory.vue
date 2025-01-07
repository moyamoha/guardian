<template>
  <v-combobox
    v-model="localValue"
    :items="dataStore.categories"
    item-title="name"
    item-value="_id"
    :return-object="false"
    label="Category *"
    density="compact"
    variant="outlined"
    :rules="[rules.required]"
  ></v-combobox>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import useDataStore from "../../../store/data.store";
import { rules } from "../../../utils/validation";

const dataStore = useDataStore();

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

const localValue = ref(props.modelValue);

watch(localValue, (_newValue: string) => {
  emit("update:modelValue", _newValue);
});
</script>
