import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import MainView from "../views/MainView.vue";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		name: "main",
		component: MainView,
	},
	{
		path: "/home",
		name: "home",
		component: HomeView,
	},
	{
		path: "/about",
		name: "about",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
	},

	{
		path: "/login",
		name: "login",
		component: () =>
			import(/* webpackChunkName: "about" */ "../views/LoginView.vue"),
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
];

const router = new VueRouter({
	routes,
});

export default router;
