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

    <button type="submit" class="btn btn-purple1 rounded-pill px-4 mb-3">Salvar</button>
  </form>
</template>

<script>
import axios from "axios";
import bcrypt from "bcryptjs";

export default {
  name: "registerForm",
  data() {
    return {
      username: "",
      password: "",
      role: "",
      formSubmitted: false,
    };
  },
  methods: {
    async createUser() {
      this.formSubmitted = true;

      if (this.username === "" || this.password === "" || this.role === "") {
        return;
      }

      const data = {
        username: this.username,
        password: this.password,
        role: this.role,
      };

      await axios
        .post("http://localhost:3000/register", data)
        .then((res) => {
          this.username = "";
          this.password = "";
          this.role = "";
          this.$router.push("/login");
          console.log(res);
        })
        .catch((err) => {
          console.log(err.response);
        });
    },
  },
};
</script>
