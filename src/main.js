import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import bcrypt from "bcryptjs";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// Configuração global do Axios
axios.defaults.headers.common["Authorization"] =
  localStorage.getItem("token");

axios.interceptors.response.use(
  (response) => {
    console.log("a");
    return response;
  },
  (error) => {
    if (error.response) {
      console.log("b");
      if (error.response.status === 403) {
        console.log("c");
        alert("Acesso negado. \nPor segurança, faça login novamente.");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

createApp(App).use(router).mount("#app");
