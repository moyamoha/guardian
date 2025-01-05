import CategoriesView from "../views/CategoriesView.vue";
import GeneratePasswordView from "../views/GeneratePasswordView.vue";
import HomeView from "../views/HomeView.vue";
import LandingPage from "../views/LandingPage.vue";

export default [
  {
    path: "/",
    name: "landing",
    component: LandingPage,
  },
  {
    path: "/home",
    name: "home",
    component: HomeView,
  },
  {
    path: "/categories",
    name: "categories",
    component: CategoriesView,
  },
  {
    path: "/generate-password",
    name: "generate-password",
    component: GeneratePasswordView,
  },
];
