<template>
  <div class="per-page">
    <span class="per-page__text">Per page:</span>
    <select class="per-page__select" v-model="dataStore.pagination.perPage">
      <option
        v-for="v in possiblePerPageValues"
        :key="v"
        class="per-page__option"
        :value="v"
      >
        {{ v }}
      </option>
    </select>
  </div>
</template>

<script lang="ts" setup>
import useDataStore from "../../store/data.store";

const dataStore = useDataStore();

const possiblePerPageValues = [9, 12, 15, 18, 21, 24];
</script>

<style scoped lang="scss">
.per-page {
  font-size: 13.33px;
  &__select {
    text-align: center;
    margin-top: 3px;
    padding: 0;
    width: 50px;
    border: 1px solid #ddd;
  }

  &__text {
    margin-right: 10px;
  }

  &__option {
    width: 40px;
  }
}
</style>
