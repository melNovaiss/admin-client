<template>
  <div class="container">
    <div class="container shadow my-5">
      <div class="row">
        <div class="col-md-6 p-4 cardWelcome d-none d-md-block">
          <h2 class="text-white py-4 text-center">Crie uma conta</h2>
        </div>
        <div class="col-12 col-md-6">
          <div class="p-4" style="background-color: white">
            <h1 class="pt-5 text-center">Registrar</h1>
            <registerForm />
            <div class="py-3 text-center">
              <router-link to="/login"
                ><a>Já é cadastrado? Acesse sua conta</a></router-link
              >
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import registerForm from "../components/RegisterForm.vue";

export default {
  name: "register",
  components: {
    registerForm,
  },
};
</script>

<style scoped>
/* #8758a6 */
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
