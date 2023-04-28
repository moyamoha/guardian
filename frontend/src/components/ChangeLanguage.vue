<template>
  <div class="lang-select" @click="showOptions = !showOptions">
    <span
      >{{ lang.toUpperCase() }}
      <v-icon v-if="showOptions" color="white">mdi-chevron-down</v-icon>
      <v-icon v-else color="white">mdi-chevron-up</v-icon>
    </span>
    <div v-if="showOptions" class="options-cont">
      <div
        class="option"
        v-for="option in ['en', 'fi']"
        @click="() => changeLang(option)"
      >
        <span>{{ option }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "change-language",
  data() {
    return {
      lang: navigator.language.split("-")[0],
      showOptions: false,
    };
  },
  methods: {
    changeLang(v) {
      this.lang = v;
      this.$i18n.locale = v;
    },
  },
};
</script>

<style>
.lang-select {
  color: white;
  cursor: pointer;
  position: relative;
}

.options-cont {
  position: absolute;
  top: 30px;
  right: 10px;
  color: darkblue;
  display: flex;
  flex-direction: column;
  background-color: white;
  padding: 5px;
  border-radius: 6px;
  box-shadow: -6px 6px 6px #343434;
}

.option {
  min-width: 120px;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.option:hover {
  background-color: #e2ecf7;
}
</style>
