<template>
  <PasswordField v-model="localValue" able-to-generate></PasswordField>
</template>
<script lang="ts" setup>
import { ref, watch } from "vue";
import PasswordField from "../../_shared/PasswordField.vue";

const props = defineProps({
  modelValue: {
    type: String,
    required: true,
  },
});

const localValue = ref(props.modelValue);

const emit = defineEmits<{
  (event: "update:modelValue", value: string): void;
}>();

watch(localValue, function (_newValue: string) {
  emit("update:modelValue", _newValue);
});
</script>
