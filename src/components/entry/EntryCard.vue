<template>
  <div class="entry-card">
    <div
      size="small"
      :color="entry.status === 'active' ? 'success' : 'error'"
      :class="{
        'entry-card__status': true,
        'entry-card__status--expired': entry.status === 'expired',
        'entry-card__status--active': entry.status === 'active',
      }"
    >
      {{ entry.status }}
    </div>

    <section class="entry-card__title">
      <span :class="`highlightable-title__${entry._id}`">{{
        entry.title
      }}</span>
    </section>
    <section class="entry-card__username">
      <span class="entry-card__label">Username: </span>
      <span :class="`highlightable-username__${entry._id}`">{{
        entry.username
      }}</span>
    </section>
    <section class="entry-card__password">
      <span class="entry-card__label">Password: </span>
      <span>*******</span>
      <EditEntryPasswordDialog :entry="entry" />
      <EntryPasswordRevealDialog :entry="entry" />
    </section>
    <section class="entry-card__category">
      <span class="entry-card__label">Category: </span>
      <span>{{ entry.category.name }}</span>
    </section>
    <section class="entry-card__actions">
      <a v-if="entry.url" :href="entry.url" target="_blank">
        <v-btn
          icon="mdi-open-in-new"
          elevation="0"
          size="small"
          density="compact"
        ></v-btn>
      </a>
      <EntryDeletionDialog :entry="entry" />
      <EntryDialog :entry="entry">
        <template v-slot:default>
          <v-btn
            v-bind="props"
            icon="mdi-square-edit-outline"
            size="small"
            density="compact"
            elevation="0"
          ></v-btn
        ></template>
      </EntryDialog>
    </section>
    <v-snackbar v-model="passwordCopied" timeout="1500"
      >Password was copied to the clipboard</v-snackbar
    >
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, type PropType } from "vue";
import type { Entry } from "../../utils/_types";
import EntryPasswordRevealDialog from "./dialogs/EntryPasswordRevealDialog.vue";
import EditEntryPasswordDialog from "./dialogs/EditEntryPasswordDialog.vue";
import EntryDeletionDialog from "./dialogs/EntryDeletionDialog.vue";
import EntryDialog from "./dialogs/EntryDialog.vue";
import useDataStore from "../../store/data.store";
import Mark from "mark.js";

const props = defineProps({
  entry: {
    type: Object as PropType<Entry>,
    required: true,
  },
});

const dataStore = useDataStore();
const passwordCopied = ref(false);

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
.entry-card {
  position: relative;
  border-radius: 2px;
  border: 1px solid #222;
  padding: 8px 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 0px;
  flex-grow: 1;
  border-radius: 5px;

  section {
    margin-bottom: 8px;
  }

  &__title {
    font-size: 0.9rem;
    font-weight: 520;
  }

  &__username,
  &__password,
  &__category,
  &__status {
    font-size: 0.75rem;
  }

  &__status {
    position: absolute;
    bottom: 8px;
    left: 10px;
    height: 20px;
    justify-content: center;
    align-items: center;
    display: flex;
    border-radius: 40px;
    padding: 12px;

    background-color: #e8f5e9;
    color: rgb(76, 175, 80);

    &--expired {
      background-color: #f5dfe3;
      color: rgb(176, 0, 32);
    }
  }

  &__password {
    display: flex;
    gap: 10px;
  }

  &__label {
    font-size: 0.85rem;
  }

  &__actions {
    display: flex;
    flex-direction: row;
    justify-self: flex-end;
    justify-content: flex-end;
    gap: 8px;
    margin-bottom: -20px;

    &__icon {
      cursor: pointer;
    }
  }
}

@media (max-width: 450px) {
  .entry-card {
    width: 100%;
  }
}
</style>
