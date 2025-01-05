<template>
  <v-text-field
    v-model="localValue"
    :label="label"
    density="compact"
    variant="outlined"
    :type="passwordFieldType"
    :append-icon="passwordFieldAppendIcon"
    @click:append="showPassword = !showPassword"
    :prepend-inner-icon="ableToGenerate ? 'mdi-key' : ''"
    @click:prepend-inner="generate"
    :rules="[rules.required]"
    aria-autocomplete="none"
    :autofocus="autoFocus"
    autocomplete=""
  >
  </v-text-field>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { generatePassword } from "../../utils/generate-password";
import useUiStore from "../../store/ui.store";
import { rules } from "../../utils/validation";

const ui = useUiStore();

const props = defineProps({
  modelValue: { type: String, required: true },
  label: { type: String, required: false },
  ableToGenerate: { type: Boolean, required: false, default: false },
  autoFocus: { type: Boolean, required: false, default: false },
});

const emit = defineEmits<{
  (event: "update:modelValue", value: any): void;
}>();

const showPassword = ref(false);
const localValue = ref(props.modelValue);

watch(localValue, function (_new: string) {
  emit("update:modelValue", _new);
});

function generate() {
  const result = generatePassword(ui.generateOptions);
  emit("update:modelValue", result);
}

const passwordFieldAppendIcon = computed(() =>
  showPassword.value ? "mdi-eye" : "mdi-eye-off"
);
const passwordFieldType = computed(() =>
  showPassword.value ? "text" : "password"
);

watch(
  () => props.modelValue,
  (_new: string) => {
    localValue.value = _new;
  },
  {
    deep: true,
  }
);
</script>
