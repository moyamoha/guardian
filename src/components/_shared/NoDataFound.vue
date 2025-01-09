<template>
  <div class="no-data-found">
    <v-icon size="small">mdi-magnify</v-icon>
    <span class="text-caption">{{ text }}</span>
  </div>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const text = computed(() => {
  if (route.name === "home") {
    return "No entries found. Try changing search terms";
  } else if (route.name === "categories") {
    return "You have not created any categories yet";
  }
});
</script>

<style scoped>
.no-data-found {
  display: flex;
  justify-content: center;
  gap: 8px;
  align-items: center;
  height: 150px;
  width: 100%;
}
</style>
