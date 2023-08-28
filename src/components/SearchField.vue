<template>
  <div>
    <v-text-field
      placeholder="Search by title, username, status and category"
      v-model="search"
      outlined
      small
      dense
      clearable
      @input="searchForEntries"
      :append-outer-icon="showMore ? 'mdi-chevron-down' : 'mdi-chevron-up'"
      @click:append-outer="setShowMore"
    ></v-text-field>

    <div v-if="showMore" class="show-more-filters">
      <v-combobox
        v-model="category"
        :items="this.categories"
        item-text="name"
        item-value="id"
        label="Category"
        dense
        outlined
        @change="searchForEntries"
      ></v-combobox>
      <v-combobox
        v-model="status"
        :items="['active', 'expired']"
        label="Status"
        dense
        outlined
        @change="searchForEntries"
      ></v-combobox>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";

export default {
  name: "search-field",
  data() {
    return {
      search: "",
      category: "",
      status: "",
      showMore: false,
    };
  },
  methods: {
    ...mapActions(["searchEntries"]),
    ...mapMutations(["setShowMoreFilters"]),
    setShowMore() {
      this.showMore = !this.showMore;
      this.setShowMoreFilters(this.showMore);
    },
    async searchForEntries() {
      const query = {};
      if (this.category) query.category = this.category.id;
      if (this.status) query.status = this.status;
      if (this.search && this.search.length > 0) query.search = this.search;
      await this.searchEntries(query);
    },
  },
  computed: {
    ...mapGetters(["categories", "filter", "showMoreFilters"]),
  },
  mounted() {
    this.search = this.filter.search;
    this.status = this.filter.status;
    this.showMore = this.showMoreFilters;
    if (this.filter.category !== "") {
      const categoryName = this.categories.find(
        (c) => c.id === this.filter.category
      ).name;
      this.category = {
        name: categoryName,
        id: this.filter.category,
      };
    }
  },
};
</script>

<style scoped>
.show-more-filters {
  display: flex;
  gap: 20px;
  width: 80%;
}
</style>
