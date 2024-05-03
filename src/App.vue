<template>
  <nav
    v-if="$route && $route.name !== 'login' && $route.name !== 'register'"
    class="navbar navbar-expand-lg navbar-dark bg-body-purple shadow py-2"
  >
    <Navbar />
  </nav>
  <router-view />
</template>

<script>
import Navbar from "./components/Navbar.vue";

export default {
  name: "ClientView",
  components: {
    Navbar,
  },
};
</script>

<style>
/* .nav-link:hover {
  color: #d9d7d7d2 !important;
} */

.dropdown-item:hover {
  color: #5f4a8c !important;
}

.dropdown-item:focus {
  color: #5f4a8c !important;
}

.bg-body-purple {
  background-color: #5f4a8c;
}

.bi-person-circle {
  font-size: 1.5em;
}

#app {
  font-family: "Roboto", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
}

.btn-purple1 {
  background-color: #5f4a8c;
  color: white;
}

.btn-purple1:hover {
  background-color: #795eb4;
  color: white;
}

/* a {
  text-decoration: none;
} */

/* .card {
  border: 0;
} */
</style>
