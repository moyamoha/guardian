<template>
  <v-col xs="11" sm="8" md="6">
    <p class="text-justify">
      Welcome to Guardian :) We are commited to make people feel safe about
      their credintials. We know it is hard. The applications out their are
      complicated and often expensive to use. That is why we came up with this
      password management application. Why choose Guardian? The answer is
    </p>
    <ul class="mb-6">
      <li class="appear">IT IS SIMPLE</li>
      <li class="appear two">IT IS SECURE</li>
      <li class="appear three">IT IS MADE WITH LOVE ❤️</li>
    </ul>
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

<script>
import { getTokenFromQuery } from "@/router/utils";
import { AUTH_UI_URL, SITE_URL } from "@/utils/constants";
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      toggle: false,
    };
  },
  methods: {
    ...mapActions(["login"]),
    handleClick() {
      if (this.loggedInUser) {
        this.$router.push("/home")
      } else {
        const url = `${AUTH_UI_URL}/login?redirect=${SITE_URL}`
        window.location.href = url
      }
    },
  },
  computed: {
    ...mapGetters(["loggedInUser"]),
  },
  mounted() {
    const tokenFromQuery = getTokenFromQuery(this.$route)
    if (tokenFromQuery) {
      this.login(tokenFromQuery)
    }
  }
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
