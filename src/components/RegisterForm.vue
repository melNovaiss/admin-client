<template>
  <form
    class="form"
    method="POST"
    @submit.prevent="createUser"
    :class="{
      'was-validated':
        formSubmitted && (username === '' || password === '' || role === ''),
    }"
    novalidate
  >
    <div class="form-floating mb-3">
      <input
        type="text"
        class="form-control shadow"
        id="username"
        name="username"
        v-model="username"
        placeholder="User"
        required
      />
      <label for="username">Nome</label>
    </div>
    <div class="form-floating mb-3">
      <input
        type="password"
        class="form-control shadow"
        id="password"
        name="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <label for="password">Password</label>
    </div>

    <div class="my-3">
      <select
        class="form-select shadow"
        aria-label="Default select example"
        v-model="role"
        required
      >
        <option disabled value="">Selecione um</option>
        <option value="ADMIN">ADMIN</option>
        <option value="SUPPORT">SUPORTE</option>
        <option value="BOT">BOT</option>
      </select>
    </div>
    <div class="d-flex justify-content-center">
      <button type="submit" class="btn btn-purple1 rounded-pill px-4 mb-3">Salvar</button>
    </div>
  </form>
</template>

<script>
import axios from "axios"; // Importa a biblioteca axios para realizar requisições HTTP

export default {
  name: "registerForm", // Define o nome do componente
  data() {
    return {
      username: "", // Armazena o nome de usuário
      password: "", // Armazena a senha
      role: "", // Armazena o papel do usuário
      formSubmitted: false, // Indica se o formulário foi enviado
    };
  },
  methods: {
    // Método para criar um novo usuário
    async createUser() {
      this.formSubmitted = true; // Marca que o formulário foi enviado

      // Verifica se os campos de usuário, senha ou papel estão vazios
      if (this.username === "" || this.password === "" || this.role === "") {
        return; // Se estiverem vazios, retorna sem fazer nada
      }

      // Prepara os dados para envio
      const data = {
        username: this.username,
        password: this.password,
        role: this.role,
      };

      // Realiza a requisição de registro de usuário
      await axios
        .post("http://localhost:3000/register", data) // Faz a requisição POST para a URL especificada
        .then((res) => {
          // Se a requisição for bem-sucedida
          this.username = ""; // Limpa o campo de usuário
          this.password = ""; // Limpa o campo de senha
          this.role = ""; // Limpa o campo de papel
          this.$router.push("/login"); // Redireciona para a página de login
          console.log(res); // Exibe a resposta no console
        })
        .catch((err) => {
          console.log(err.response); // Se houver um erro, exibe-o no console
        });
    },
  },
};
</script>
