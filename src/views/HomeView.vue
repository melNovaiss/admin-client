<template>
  <div class="home">
    <Navbar />
    <router-view />
    <!-- <div class="container-fluid">
      <div class="row">
        <div class="col-4">
          <div>Conteúdo da coluna 4</div>
        </div>
        <div class="col-8">Conteúdo da coluna 8</div>
      </div>
      <div class="fixed-bottom">{{ currentDate }} </div>
    </div> -->
  </div>
</template>

<script>
import Navbar from "../components/Navbar.vue";
import ClientView from "../views/ClientView.vue";

export default {
  name: "HomeView",
  components: {
    Navbar,
  },
  data() {
    return {
      currentDate: "",
    };
  },
  mounted() {
    this.updateCurrentDate();
  },
  methods: {
    updateCurrentDate() {
      const now = new Date();
      const formattedDate = now.toLocaleDateString("pt-BR");
      this.currentDate = formattedDate;
    },
  },
};
</script>

<style scoped>
.fixed-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
