import {
  createRouter,
  createWebHistory,
  type NavigationGuardNext,
  type RouteLocationNormalized,
  type RouteLocationNormalizedLoaded,
} from "vue-router";
import routes from "./routes";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

router.beforeEach(
  (
    to: RouteLocationNormalized,
    _: RouteLocationNormalizedLoaded,
    next: NavigationGuardNext
  ) => {
    document.title =
      to.name?.toString() !== ""
        ? "Guardian - " + to.name?.toString()
        : "Guardian";
    if (to.name?.toString() === "landing") {
      document.title = "Guardian";
    }
    next();

    if (routes.findIndex((r) => r.name === to.name?.toString()) === -1) {
      next({
        name: "home",
      });
    }
  }
);

export default router;
