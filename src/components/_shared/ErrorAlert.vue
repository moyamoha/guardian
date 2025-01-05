<template>
  <v-alert
    density="compact"
    :text="ui.error"
    type="error"
    variant="outlined"
    class="mb-4"
    icon="mdi-alert-circle-outline"
    border="start"
    closable
    @click:close="handleClose"
  >
  </v-alert>
</template>

<script lang="ts" setup>
import { onMounted } from "vue";
import useUiStore from "../../store/ui.store";

const ui = useUiStore();

const props = defineProps({
  timeout: {
    type: Number,
    required: false,
  },
});

function handleClose() {
  ui.setError("");
}

onMounted(() => {
  if (ui.errorHappened && props.timeout) {
    setTimeout(() => ui.setError(""), props.timeout);
  }
});
</script>
