<template>
  <div class="entry-container">
    <div v-if="this.allEntries.length === 0">No Entries Yet</div>
    <EntryCard v-for="entry in this.allEntries" :key="entry._id" :entry="entry">
    </EntryCard>
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
