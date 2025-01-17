<template>
  <v-app>
    <NavBar></NavBar>
    <main>
      <v-container>
        <v-row class="d-flex justify-center">
          <router-view></router-view>
        </v-row>
      </v-container>
    </main>
  </v-app>
</template>

<script setup lang="ts">
import { watch } from "vue";
import NavBar from "./components/NavBar.vue";
import { useDisplay } from "vuetify";
import useUiStore from "./store/ui.store";
const display = useDisplay();
const ui = useUiStore();
watch(
  () => display.width.value,
  (_new: number) => {
    if (_new <= 450) {
      ui.entryDisplayMode = "grid";
    }
  }
);
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

main {
  min-height: 90vh;
  display: flex;
  justify-content: center;
  margin-top: 65px;
}

@media (max-width: 900px) {
  main {
    padding-top: 2rem;
  }
}
@media (max-width: 700px) {
  main {
    padding-top: 1rem;
  }
}
</style>
