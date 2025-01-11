<template>
  <v-menu location="start" offset-y offset-x>
    <template v-slot:activator="{ props }">
      <v-icon v-bind="props" size="small">mdi-dots-horizontal</v-icon>
    </template>

    <div class="entry-actions-menu">
      <EntryPasswordRevealDialog :entry="entry">
        <template v-slot:default>
          <div class="entry-actions-menu__item">
            <span>Reveal password</span>
            <v-icon size="small">mdi-eye-outline</v-icon>
          </div>
        </template>
      </EntryPasswordRevealDialog>

      <EntryDialog :entry="entry">
        <template v-slot:default>
          <div class="entry-actions-menu__item">
            <span>Edit entry</span>
            <v-icon size="small">mdi-square-edit-outline</v-icon>
          </div>
        </template>
      </EntryDialog>

      <EditEntryPasswordDialog :entry="entry">
        <template v-slot:default>
          <div class="entry-actions-menu__item">
            <span>Edit password</span>
            <div class="d-flex align-center">
              <v-icon size="small" class="mr-1">mdi-lock-outline</v-icon>
              <v-icon size="small">mdi-square-edit-outline</v-icon>
            </div>
          </div>
        </template>
      </EditEntryPasswordDialog>

      <EntryDeletionDialog :entry="entry">
        <template v-slot:default>
          <div class="entry-actions-menu__item">
            <span>Delete entry</span>
            <v-icon size="small">mdi-delete-outline</v-icon>
          </div>
        </template>
      </EntryDeletionDialog>

      <div v-if="entry.url" class="entry-actions-menu__item">
        <a :href="entry.url" target="_blank" class="open-in-new-tab">
          <span>Open in new tab</span>
          <v-icon size="small">mdi-open-in-new</v-icon>
        </a>
      </div>
    </div>
  </v-menu>
</template>

<script lang="ts" setup>
import { type PropType } from "vue";
import type { Entry } from "../../utils/_types";
import EntryDialog from "./dialogs/EntryDialog.vue";
import EntryPasswordRevealDialog from "./dialogs/EntryPasswordRevealDialog.vue";
import EntryDeletionDialog from "./dialogs/EntryDeletionDialog.vue";
import EditEntryPasswordDialog from "./dialogs/EditEntryPasswordDialog.vue";

defineProps({
  entry: {
    type: Object as PropType<Entry>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.entry-actions-menu {
  width: 180px;
  box-shadow: 10px 10px 10px black;
  background-color: white;
  -webkit-box-shadow: 0px 0px 5px 4px rgba(89, 89, 89, 1);
  -moz-box-shadow: 0px 0px 5px 4px rgba(89, 89, 89, 1);
  box-shadow: 0px 0px 5px 4px rgba(89, 89, 89, 1);

  &__item {
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 12px;
    font-size: smaller;

    &:hover {
      background-color: rgb(238, 238, 238);
    }
  }

  .open-in-new-tab {
    text-decoration: none;
    color: black;
    display: flex;
    width: 100%;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
