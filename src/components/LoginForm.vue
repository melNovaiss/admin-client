<template>
  <form
    class="form"
    @submit.prevent="login"
    :class="{ 'was-validated': formSubmitted && (user === '' || password === '') }"
    novalidate
  >
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control shadow"
        id="user"
        v-model="user"
        placeholder="username"
        required
      />
      <label for="user">Username</label>
    </div>
    <div class="form-floating">
      <input
        type="password"
        class="form-control shadow"
        id="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <label for="password">Password</label>
    </div>
    <div class="pt-4 text-danger" v-show="loginError">
      <i class="bi bi-x-circle"></i> User ou senha incorretos.
    </div>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-purple1 mt-4 rounded-pill px-4">Entrar</button>
    </div>
  </form>
</template>

<script>
import axios from "axios"; // Importa a biblioteca axios para realizar requisições HTTP

export default {
  name: "loginForm", // Define o nome do componente
  data() {
    return {
      user: "", // Armazena o nome de usuário
      password: "", // Armazena a senha
      formSubmitted: false, // Indica se o formulário foi enviado
      loginError: false, // Indica se houve um erro de login
    };
  },
  methods: {
    // Método para realizar o login
    async login() {
      this.formSubmitted = true; // Marca que o formulário foi enviado

      // Verifica se os campos de usuário ou senha estão vazios
      if (this.user === "" || this.password === "") {
        return; // Se estiverem vazios, retorna sem fazer nada
      }

      // Prepara os dados para envio
      const data = {
        username: this.user,
        password: this.password,
      };

      // Realiza a requisição de login
      await axios
        .get("http://localhost:3000/login") // Faz a requisição GET para a URL especificada
        .then((res) => {
          console.log(res); // Exibe a resposta no console
          // Armazena as informações de login no localStorage
          localStorage.setItem("expirateAt", res.data.expirateAt);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("tokenType", res.data.tokenType);

          this.$router.push("/"); // Redireciona para a página inicial
        })
        .catch((err) => {
          console.log(err.response); // Exibe o erro no console
        });

      // Código comentado que poderia ser usado para validação de login com bcrypt
      /*
      try {
        const response = await axios.get(
          `http://3.83.118.45:8080/login`
        );
        const users = response.data;

        if (users.length > 0) {
          const userData = users[0];
          const passwordMatch = await bcrypt.compare(this.password, userData.password);

          if (passwordMatch) {
            localStorage.setItem("user", userData.username);
            localStorage.setItem("token", "ok");
            this.$router.push("/");
          } else {
            console.log("User ou senha incorretos");
            this.showLoginError();
          }
        } else {
          console.log("Usuário não encontrado");
          this.showLoginError();
        }
      } catch (error) {
        console.error(error);
        this.showLoginError();
      }
      */
    },
    // Método para exibir o erro de login
    showLoginError() {
      this.loginError = true; // Define loginError como verdadeiro para mostrar a mensagem de erro
      this.formSubmitted = false; // Redefine formSubmitted como falso
      this.user = ""; // Limpa o campo de usuário
      this.password = ""; // Limpa o campo de senha
      // Define um temporizador para ocultar a mensagem de erro após 2 segundos
      setTimeout(() => {
        this.loginError = false;
      }, 2000);
    },
  },
};
</script>