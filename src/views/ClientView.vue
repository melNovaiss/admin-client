<template>
  <div class="container-fluid">
    <div class="row py-4">
      <div class="col-md-4 pe-0">
        <CliList @client-selected="handleClientSelected" ref="cliList" />
      </div>
      <div class="col-md-8">
        <div class="card border-light shadow-sm">
          <div class="card-body">
            <CliForm
              :selectedClient="selectedClient"
              @clienteCriado="handleClienteCriado"
              @clienteDeletado="handleClienteDeletado"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CliForm from "../components/client/ClientForm.vue";
import CliList from "../components/client/Client.vue";

export default {
  name: "ClientView",
  components: {
    CliForm,
    CliList,
  },
  data() {
    return {
      selectedClient: null,
    };
  },
  methods: {
    handleClienteCriado() {
      // Atualize a lista de clientes aqui
      this.$refs.cliList.getClientes();
    },
    handleClienteDeletado() {
      // Atualize a lista de clientes aqui
      this.$refs.cliList.getClientes();
    },
    handleClientSelected(client) {
      console.log(client);
      // Atualize a variável selectedClient com os dados do cliente selecionado
      this.selectedClient = client;
    },
  },
};
</script>
