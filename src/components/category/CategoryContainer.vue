<template>
  <section>
    <div class="categ-row item category">
      <CategoryDialog
        :category="category"
        :activatorText="category.name"
      ></CategoryDialog>
      <div>
        <EntryDialog :entry="null" :categoryId="category._id"></EntryDialog>
        <v-icon @click="handlechevronClick" v-if="!expand" dense
          >mdi-chevron-down</v-icon
        >
        <v-icon @click="handlechevronClick" v-else dense>mdi-chevron-up</v-icon>
      </div>
    </div>
    <ol v-show="this.expand">
      <li v-for="entry in category.items" :key="entry._id">
        <EntryRow class="item entry" :entry="entry"></EntryRow>
      </li>
    </ol>
  </section>
</template>

<script>
import EntryRow from "../entry/EntryRow.vue";
import EntryDialog from "../entry/EntryDialog.vue";
import CategoryDialog from "./CategoryDialog.vue";
import { mapGetters, mapMutations } from "vuex";
export default {
  components: { EntryRow, EntryDialog, CategoryDialog },
  props: ["category", "expand"],
  computed: {
    ...mapGetters(["expandedOnes"]),
  },
  methods: {
    ...mapMutations(["setExpandedCategories"]),
    handlechevronClick() {
      if (this.expand) {
        this.setExpandedCategories(
          this.expandedOnes.filter(
            (categoryId) => categoryId !== this.category._id
          )
        );
      } else {
        this.setExpandedCategories([...this.expandedOnes, this.category._id]);
      }
    },
  },
};
</script>

<style>
.categ-row {
  display: flex;
  justify-content: space-between !important;
}
</style>
