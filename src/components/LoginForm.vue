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
    <button type="submit" class="btn btn-purple1 mt-4 rounded-pill px-4">Entrar</button>
  </form>
</template>

<script>
import axios from "axios";

export default {
  name: "loginForm",
  data() {
    return {
      user: "",
      password: "",
      formSubmitted: false,
      loginError: false,
    };
  },
  methods: {
    async login() {
      this.formSubmitted = true;

      if (this.user === "" || this.password === "") {
        return;
      }

      const data = {
        username: this.user,
        password: this.password,
      };

      await axios
        .get("http://localhost:3000/login")
        .then((res) => {
          console.log(res);
          localStorage.setItem("expirateAt", res.data.expirateAt);
          localStorage.setItem("token", res.data.token);
          localStorage.setItem("tokenType", res.data.tokenType);

          this.$router.push("/");
        })
        .catch((err) => {
          console.log(err.response);
        });

      // try {
      //   const response = await axios.get(
      //     `http://3.83.118.45:8080/login`
      //   );
      //   const users = response.data;

      //   if (users.length > 0) {
      //     const userData = users[0];
      //     const passwordMatch = await bcrypt.compare(this.password, userData.password);

      //     if (passwordMatch) {
      //       localStorage.setItem("user", userData.username);
      //       localStorage.setItem("token", "ok");
      //       this.$router.push("/");
      //     } else {
      //       console.log("User ou senha incorretos");
      //       this.showLoginError();
      //     }
      //   } else {
      //     console.log("Usuário não encontrado");
      //     this.showLoginError();
      //   }
      // } catch (error) {
      //   console.error(error);
      //   this.showLoginError();
      // }
    },
    showLoginError() {
      this.loginError = true;
      this.formSubmitted = false;
      this.user = "";
      this.password = "";
      setTimeout(() => {
        this.loginError = false;
      }, 2000);
    },
  },
};
</script>
