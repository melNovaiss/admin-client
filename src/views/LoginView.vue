<template>
  <div class="container">
    <div class="container shadow my-5">
      <div class="row">
        <div class="col-md-6 p-4 cardWelcome d-none d-md-block">
          <h2 class="text-white py-4 text-center">Bem vindo de volta!</h2>
        </div>
        <div class="col-12 col-md-6">
          <div class="p-4" style="background-color: white">
            <h1 class="pt-5 text-center">Login</h1>
            <loginForm />
            <div class="py-3 text-center">
              <router-link to="/register"
                ><a>Não é registrado? Crie uma conta</a></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import loginForm from "../components/LoginForm.vue";

export default {
  name: "loginPage",
  components: {
    loginForm,
  },
};
</script>

<style scoped>
.cardWelcome {
  display: flex;
  background-color: #5f4a8c;
  flex-direction: column;
  justify-content: center;
}

a {
  color: #5f4a8c;
  text-decoration: none;
}

a:hover {
  color: #5f4a8c;
  text-decoration: none;
}

.form {
  padding: 1.5rem;
}

@media (min-width: 768px) {
  .form {
    padding: 5rem 2rem 0 2rem;
  }
}
</style>
