import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

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
  {
    path: "/billings",
    name: "billings",
    component: function () {
      return import("../views/BillingsView.vue");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
