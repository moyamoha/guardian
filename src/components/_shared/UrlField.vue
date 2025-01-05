<template>
  <v-text-field
    label="URL"
    density="compact"
    variant="outlined"
    v-model="localValue"
    @click:append="openUrl"
    :rules="[rules.isUrl]"
  >
    <template v-slot:append>
      <v-icon @click="openUrl" :disabled="openUrlIconDisabled" dense
        >mdi-open-in-new</v-icon
      >
    </template>
  </v-text-field>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { rules } from "../../utils/validation";

const props = defineProps({
  modelValue: { type: String, required: true },
});
const emit = defineEmits<{
  (event: "update:modelValue", value: any): void;
}>();

const localValue = ref(props.modelValue);

function openUrl() {
  window.open(localValue.value, "_blank");
}

const openUrlIconDisabled = computed(
  () => typeof rules.isUrl(localValue.value) === "string"
);

watch(localValue, (_new: string) => {
  emit("update:modelValue", _new);
});
</script>
