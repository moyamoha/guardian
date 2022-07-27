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
		path: "/login",
		name: "login",
		component: () => import("../views/LoginView.vue"),
	},

	{
		path: "/verify-code",
		name: "verify-code",
		component: () => import("../views/VerifyCodeView.vue"),
	},
	{
		path: "/signup",
		name: "signup",
		component: () => import("../views/SignupView.vue"),
	},
	{
		path: "/settings",
		name: "settings",
		component: () => import("../views/SettingsView.vue"),
	},
	{
		path: "/password-forgotten",
		name: "password-forgotten",
		component: () => import("../views/ForgotPasswordView.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	routes,
});

router.beforeEach((to, from, next) => {
	document.title = to.name !== "" ? "Guardian - " + to.name : "Guardian";
	next();
});

export default router;
