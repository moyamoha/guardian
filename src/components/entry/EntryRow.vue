<template>
  <div
    :class="{
      'entry-row': true,
      'entry-row--expired': entry.status === 'expired',
    }"
  >
    <div class="entry-row-data">
      <section class="entry-row-data__title">
        <span :class="`highlightable-title__${entry._id}`">{{
          entry.title
        }}</span>
      </section>

      <section class="entry-row-data__username">
        <span :class="`text-caption highlightable-username__${entry._id}`">{{
          entry.username
        }}</span>
      </section>

      <section class="entry-row-data__category">
        <span>{{ entry.category.name }}</span>
      </section>
    </div>

    <EntryRowActions :entry="entry"></EntryRowActions>
  </div>
</template>

<script setup lang="ts">
import { onMounted, type PropType } from "vue";
import type { Entry } from "../../utils/_types";
import useDataStore from "../../store/data.store";
import Mark from "mark.js";
import EntryRowActions from "./EntryRowActions.vue";

const props = defineProps({
  entry: {
    type: Object as PropType<Entry>,
    required: true,
  },
});

const dataStore = useDataStore();

onMounted(() => {
  const markingOptions = {
    separateWordSearch: true,
    caseSensitive: false,
    className: "highlight",
  };
  const set1 = document.querySelector(
    `.highlightable-title__${props.entry._id}`
  ) as any;
  const set2 = document.querySelector(
    `.highlightable-username__${props.entry._id}`
  ) as any;
  const marker1 = new Mark(set1);
  const marker2 = new Mark(set2);
  if (!dataStore.filter.search) {
    return;
  }
  marker1.mark(dataStore.filter.search, markingOptions);
  marker2.mark(dataStore.filter.search, markingOptions);
});
</script>

<style lang="scss">
.entry-row {
  border-radius: 2px;
  border: 1px solid #222;
  padding: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  border-left: 5px solid rgb(76, 175, 80);

  &--expired {
    border-left: 5px solid rgb(176, 0, 32);
  }

  &-data {
    display: flex;
    align-items: center;
    width: 95%;
    gap: 10px;

    &__title {
      font-size: 0.9rem;
      font-weight: 520;
      width: 40%;
    }

    &__username {
      width: 40%;
    }

    &__category {
      width: 20%;
    }

    &__username,
    &__category {
      font-size: 0.75rem;
    }
  }
}
</style>
