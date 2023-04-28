<template>
  <v-col xs="11" sm="8" md="6">
    <p class="text-justify">
      {{ $t("main.intro") }}
    </p>
    <ul class="mb-6">
      <li class="appear">{{ $t("main.why.simple") }}</li>
      <li class="appear two">{{ $t("main.why.secure") }}</li>
      <li class="appear three">{{ $t("main.why.made_with_love") }}</li>
    </ul>
    <v-btn
      :class="{ left: toggle, right: !toggle }"
      outlined
      large
      color="primary"
      @click="handleClick"
      @mouseenter="toggle = !toggle"
      >{{ $t("btns.get_started") }}</v-btn
    >
  </v-col>
</template>

<script>
import router from "@/router";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    handleClick() {
      router.push(this.loggedInUser ? "/home" : "/login");
    },
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
};
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
}

.appear::before {
  content: "";
  border: 1px solid blueviolet;
  background-color: blueviolet;
  width: 10px;
  height: 10px;
  position: absolute;
  left: -23px;
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
