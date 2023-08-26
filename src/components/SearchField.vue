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
      @click:append-outer="showMore = !showMore"
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
import { mapActions, mapGetters } from "vuex";

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
    async searchForEntries() {
      const query = {};
      if (this.category) query.category = this.category.id;
      if (this.status) query.status = this.status;
      if (this.search && this.search.length > 0) query.search = this.search;
      await this.searchEntries(query);
    },
  },
  computed: {
    ...mapGetters(["categories"]),
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
