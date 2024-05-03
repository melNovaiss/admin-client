import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "bootstrap/dist/js/bootstrap.js";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import axios from "axios";

// // Configuração global do Axios
// axios.defaults.headers.common["Authorization"] =
//   localStorage.getItem("token");

// // Interceptor de resposta para lidar com erros
// axios.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   (error) => {
//     if (error.response && error.response.status === 403) {
//       alert("Acesso negado. \nPor segurança, faça login novamente.");
//       window.location.href = "/login";
//     }
//     return Promise.reject(error);
//   }
// );

// export default axios;

createApp(App).use(router).mount("#app");
