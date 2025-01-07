<template>
  <v-combobox
    v-model="localValue"
    :items="['active', 'expired']"
    label="Status"
    density="compact"
    variant="outlined"
  ></v-combobox>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";

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
