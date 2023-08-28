<template>
  <ol class="wtree">
    <div class="d-flex flex-row-reverse">
      <v-icon @click="collapseOrExpandAll" dense>{{
        collapseOrExpandIcon
      }}</v-icon>
    </div>
    <li v-for="category in content" :key="category._id">
      <CategoryContainer
        :expand="isExpanded(category._id)"
        :category="category"
      ></CategoryContainer>
    </li>
  </ol>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import CategoryContainer from "./category/CategoryContainer.vue";
import EntryRow from "./entry/EntryRow.vue";
export default {
  methods: {
    ...mapMutations(["setExpandedCategories"]),
    isExpanded(categoryId) {
      return this.expandedOnes.includes(categoryId);
    },
    collapseOrExpandAll() {
      if (this.expandedOnes.length > 0) this.setExpandedCategories([]);
      else this.setExpandedCategories(this.content.map((c) => c._id));
    },
  },
  computed: {
    ...mapGetters(["content", "expandedOnes"]),
    collapseOrExpandIcon() {
      return this.expandedOnes.length > 0
        ? "mdi-arrow-expand"
        : "mdi-arrow-collapse";
    },
  },
  components: {
    EntryRow,
    CategoryContainer,
  },
};
</script>

<style>
.wtree {
  margin-top: 0px;
  position: relative;
  min-width: 30vw;
  width: 80%;
}
.wtree li {
  list-style-type: none;
  margin: 10px 0 10px 10px;
  position: relative;
}
.wtree li:before {
  content: "";
  position: absolute;
  top: -10px;
  left: -30px;
  border-left: 1px solid #ddd;
  border-bottom: 1px solid #ddd;
  width: 30px;
  height: 15px;
}
.wtree li:after {
  position: absolute;
  content: "";
  top: 4px;
  left: -30px;
  border-left: 1px solid #ddd;
  border-top: 1px solid #ddd;
  width: 30px;
  height: 100%;
}
.wtree li:last-child:after {
  display: none;
}
.item {
  border: 1px solid #ddd;
  padding: 10px;
  color: #666666;
  text-decoration: none;
  text-align: left;
  border-radius: 5px;
  font-size: 0.9rem;
}

.category {
  background-color: #ddf3fe;
}

.entry {
  background-color: #ddebc8;
  padding: 8px;
}

.entry:hover,
.entry:focus {
  border-color: #8ca763;
}

@media (max-width: 900px) {
  .wtree {
    width: 100%;
  }
}
</style>
