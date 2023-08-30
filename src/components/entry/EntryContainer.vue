<template>
  <div>
    <div class="mb-4">
      {{ this.allEntries.length }}
      {{ this.allEntries.length === 1 ? "entry" : "entries" }} found
    </div>
    <div class="entry-container">
      <EntryCard
        v-for="entry in this.allEntries"
        :key="entry._id"
        :entry="entry"
      >
      </EntryCard>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import EntryCard from "./EntryCard.vue";

export default {
  name: "entry-container",
  computed: {
    ...mapGetters(["allEntries", "content"]),
  },
  components: { EntryCard },
  mounted() {
    if (
      this.content &&
      this.content.length > 0 &&
      this.allEntries.length === 0
    ) {
    }
  },
};
</script>

<style>
.entry-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
