import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainView from "../views/MainView.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: MainView,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },

  {
    path: "/generate-password",
    name: "generate",
    component: () => import("../views/generate-password.vue"),
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

router.beforeEach((to, from, next) => {
  document.title = to.name !== "" ? "Guardian - " + to.name : "Guardian";
  next();

  if (routes.findIndex((r) => r.name === to.name) === -1) {
    next({
      name: "home",
    });
  }
});

export default router;
