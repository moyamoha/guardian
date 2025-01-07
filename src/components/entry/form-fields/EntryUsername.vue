<template>
  <v-text-field
    label="Username *"
    density="compact"
    variant="outlined"
    v-model="localValue"
    :rules="[rules.required]"
  ></v-text-field>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { rules } from "../../../utils/validation";

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
