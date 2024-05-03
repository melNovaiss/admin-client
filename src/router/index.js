import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import aaa from "../assets/js/cors"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: function () {
      return import("../views/LoginView.vue");
    },
  },
  {
    path: "/register",
    name: "register",
    component: function () {
      return import("../views/RegisterView.vue");
    },
  },
  {
    path: "/client",
    name: "client",
    component: function () {
      return import("../views/ClientView.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
