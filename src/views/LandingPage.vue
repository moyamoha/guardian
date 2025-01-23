<template>
  <v-col xs="11" sm="8" md="6">
    <ErrorAlert :timeout="1600" v-if="ui.errorHappened"></ErrorAlert>
    <p class="text-justify">
      Welcome to Guardian :) We are commited to make people feel safe about
      their credentials. We know it is hard. The applications out their are
      complicated and often expensive to use. That is why we came up with this
      password management application. Why choose Guardian? The answer is
    </p>
    <div class="mb-6 mt-2">
      <p class="appear">IT IS SIMPLE</p>
      <p class="appear two">IT IS SECURE</p>
      <p class="appear three">IT IS MADE WITH LOVE ❤️</p>
      <p class="appear four">IT IS FREE</p>
    </div>
    <v-btn
      :class="{ left: toggle, right: !toggle }"
      outlined
      large
      color="primary"
      @click="handleClick"
      @mouseenter="toggle = !toggle"
      >Get started</v-btn
    >
  </v-col>
</template>

<script lang="ts" setup>
import { AUTH_UI_URL, SITE_URL } from "../utils/constants";
import { onMounted, ref } from "vue";
import useAuthStore from "../store/auth.store";
import { useRoute, useRouter } from "vue-router";
import { getTokenFromQuery } from "../router/utils";
import ErrorAlert from "../components/_shared/ErrorAlert.vue";
import useUiStore from "../store/ui.store";

const toggle = ref(false);
const auth = useAuthStore();
const ui = useUiStore();
const router = useRouter();
const route = useRoute();

function handleClick() {
  if (auth.userIsLoggedIn) {
    router.push("/home");
  } else {
    const url = `${AUTH_UI_URL}/login?redirect=${SITE_URL}`;
    window.location.href = url;
  }
}

onMounted(async () => {
  const tokenFromQuery = getTokenFromQuery(route);
  if (tokenFromQuery) {
    await auth.login(tokenFromQuery);
  }
});
</script>

<style scoped>
.guardian {
  text-decoration: wavy;
  letter-spacing: 1.2px;
  color: orange;
}
.left,
.right {
  transition: border-radius 0.3s linear;
}
.left:hover {
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
}

.right:hover {
  border-top-left-radius: 25px;
  border-bottom-right-radius: 25px;
}
.appear {
  font-weight: 500;
}
@keyframes appear {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.appear {
  animation: appear 2s;
  list-style-type: none;
  position: relative;
  margin-left: 25px;
}

.appear::before {
  content: "";
  border: 1px solid blueviolet;
  background-color: blueviolet;
  width: 10px;
  height: 10px;
  position: absolute;
  left: -23px;
  margin-right: 100px;
  top: 6px;
  transform: rotate(45deg);
  animation: rotate 1s 1 ease-in-out;
}

.two::before {
  animation-delay: 1s;
}

.three::before {
  animation-delay: 2s;
}
.four::before {
  animation-delay: 3s;
}

.appear::after {
  content: "";
  border: 1px solid blueviolet;
  width: 15px;
  height: 15px;
  position: absolute;
  left: -17.8px;
  top: 11px;
  border-right: none;
  border-bottom: none;
}

@keyframes rotate {
  from {
    transform: rotate(45deg);
  }
  to {
    transform: rotate(405deg);
  }
}
</style>
