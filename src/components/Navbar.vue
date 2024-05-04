<template>
  <div class="container">
    <router-link class="nav-link pe-4" to="/"><h3 class="m-0">Admin Clientes</h3></router-link>
    <button
      class="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul class="navbar-nav me-auto mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link class="nav-link menuItem" to="/client">Clientes</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link menuItem" aria-current="page" href="/cobra"
            >Cobranças</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link menuItem" aria-current="page" href="/gerarChave"
            >Gerador de chaves</router-link
          >
        </li>
        <li class="nav-item">
          <router-link class="nav-link menuItem" aria-current="page" href="/chavesAuto"
            >Chave automática</router-link
          >
        </li>
      </ul>

      <div class="dropdown">
        <a
          class="nav-link nav-profile dropdown-toggle"
          href="#"
          role="button"
          id="navbarDropdown"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-person-circle"></i>
        </a>
        <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
          <li>
            <a class="dropdown-item" @click="removeUser" href="/login"
              ><i class="bi bi-box-arrow-right"></i> Sign Out</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style scoped>
.nav-profile {
  color: white;
}

.bi-person-circle {
  font-size: 1.5em;
}

.nav-link {
  text-decoration: none;
  color: white !important;
  position: relative;
}

.menuItem:hover::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 8px;
  width: 100%;
  height: 2px;
  background-color: white;
}
</style>
